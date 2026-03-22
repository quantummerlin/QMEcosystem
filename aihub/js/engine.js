/* ============================================
   CHAT ENGINE
   OpenRouter API, Context Weave, Guardrails, Streaming
   ============================================ */

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const PROXY_URL          = '/api/aihub/chat'; // Cloudflare Worker — keys never leave the server

/* --- System Prompt with Guardrails --- */
function buildSystemPrompt(skills, memory) {
  const parts = [
    '## Core Instructions',
    'You are a helpful AI assistant accessed through Quantum Merlin AI Hub.',
    'Respond naturally and helpfully. Use clean, well-formatted text.',
    'Never output sequences of special characters, decorative symbols, or repeated punctuation.',
    'Do not use box-drawing characters, ASCII art borders, or decorative separators.',
    'If you need to emphasise text, use standard markdown: **bold**, *italic*, or headings.',
    'Keep your output clean, readable, and professional.',
    ''
  ];

  const skillsBlock = SkillsManager.buildSkillsBlock(skills);
  if (skillsBlock) {
    parts.push(skillsBlock);
    parts.push('');
  }

  const memoryBlock = MemoryManager.buildMemoryBlock(memory);
  if (memoryBlock) {
    parts.push(memoryBlock);
    parts.push('');
  }

  return parts.join('\n');
}

/* --- Context Weave: 6-Layer Handoff --- */
function buildContextWeave(thread, newModelId, skills, memory) {
  /*
   * Layer 1: System prompt (with active skills + memory)
   * Layer 2: Topic summary of the thread
   * Layer 3: Key decisions / conclusions reached
   * Layer 4: Last 6 exchanges (user+assistant pairs)
   * Layer 5: Active skills reminder
   * Layer 6: User memory injection
   *
   * This is assembled as a system message that primes the new model.
   */

  const messages = thread.messages || [];
  if (messages.length === 0) return [];

  const newModel = getModelById(newModelId);
  const modelName = newModel ? newModel.name : 'this model';

  // --- Layer 2: Topic Summary ---
  let topicSummary = '';
  if (messages.length > 0) {
    const firstUserMsg = messages.find(m => m.role === 'user');
    if (firstUserMsg) {
      const content = typeof firstUserMsg.content === 'string' ? firstUserMsg.content : '';
      topicSummary = content.substring(0, 300);
      if (content.length > 300) topicSummary += '...';
    }
  }

  // --- Layer 3: Key decisions (extract from assistant messages) ---
  const assistantMsgs = messages.filter(m => m.role === 'assistant');
  let keyPoints = '';
  if (assistantMsgs.length > 2) {
    const lastFewAssistant = assistantMsgs.slice(-3);
    const summaryBits = lastFewAssistant.map(m => {
      const text = typeof m.content === 'string' ? m.content : '';
      const firstSentences = text.split(/[.!?]/).slice(0, 2).join('. ');
      return firstSentences.substring(0, 150);
    }).filter(Boolean);
    if (summaryBits.length > 0) {
      keyPoints = summaryBits.join(' | ');
    }
  }

  // --- Layer 4: Last 6 exchanges ---
  const recentMessages = [];
  let exchangeCount = 0;
  for (let i = messages.length - 1; i >= 0 && exchangeCount < 6; i--) {
    recentMessages.unshift({
      role: messages[i].role,
      content: typeof messages[i].content === 'string'
        ? messages[i].content.substring(0, 800)
        : messages[i].content
    });
    if (messages[i].role === 'user') exchangeCount++;
  }

  // --- Build the handoff system prompt ---
  const handoffParts = [
    '## Context Handoff',
    `You are continuing a conversation that was started with a different model. You are now ${modelName}.`,
    ''
  ];

  if (topicSummary) {
    handoffParts.push('## Topic');
    handoffParts.push(topicSummary);
    handoffParts.push('');
  }

  if (keyPoints) {
    handoffParts.push('## Key Points So Far');
    handoffParts.push(keyPoints);
    handoffParts.push('');
  }

  // Layers 5 & 6 are already in the system prompt via skills/memory
  handoffParts.push('Continue the conversation naturally. Do not announce yourself or mention the model switch unless the user asks.');

  const systemContent = buildSystemPrompt(skills, memory) + '\n\n' + handoffParts.join('\n');

  const apiMessages = [{ role: 'system', content: systemContent }];
  recentMessages.forEach(m => apiMessages.push(m));

  return apiMessages;
}

/* --- Build Messages for API (normal, no model switch) --- */
function buildMessagesForAPI(thread, skills, memory) {
  const systemContent = buildSystemPrompt(skills, memory);
  const apiMessages = [{ role: 'system', content: systemContent }];

  const msgs = thread.messages || [];
  msgs.forEach(m => {
    apiMessages.push({
      role: m.role,
      content: m.content
    });
  });

  return apiMessages;
}

/* --- Post-Processing Guardrails --- */
function cleanOutput(text) {
  if (!text) return text;

  // Remove sequences of 3+ repeated special characters
  text = text.replace(/([^\w\s.,!?;:'"()\-\n])\1{2,}/g, '');

  // Remove box-drawing and decorative Unicode blocks
  text = text.replace(/[\u2500-\u257F]+/g, ''); // Box drawing
  text = text.replace(/[\u2580-\u259F]+/g, ''); // Block elements
  text = text.replace(/[\u25A0-\u25FF]{3,}/g, ''); // Geometric shapes (3+)
  text = text.replace(/[\u2700-\u27BF]{3,}/g, ''); // Dingbats (3+)

  // Remove lines that are purely special characters / decoration
  text = text.replace(/^[=\-~_*#<>|+]{4,}$/gm, '');

  // Clean up excessive blank lines
  text = text.replace(/\n{4,}/g, '\n\n\n');

  // Trim trailing whitespace on each line
  text = text.replace(/[ \t]+$/gm, '');

  return text.trim();
}

/* --- Token Estimation --- */
function estimateTokens(text) {
  if (!text) return 0;
  const str = typeof text === 'string' ? text : JSON.stringify(text);
  return Math.ceil(str.length / 4);
}

function estimateThreadTokens(thread) {
  let total = 0;
  (thread.messages || []).forEach(m => {
    total += estimateTokens(m.content);
  });
  // Add rough system prompt overhead
  total += 200;
  return total;
}

/* --- Streaming Chat Completion --- */
// When apiKey is null/empty the request is routed through the Cloudflare
// Worker proxy (/api/aihub/chat) so keys never appear in client code.
// When the user supplies their own BYO key it goes directly to OpenRouter.
async function streamChatCompletion(apiKey, modelId, messages, onChunk, onDone, onError) {
  if (!apiKey) {
    return _streamViaProxy(modelId, messages, onChunk, onDone, onError);
  }
  return _streamDirect(apiKey, modelId, messages, onChunk, onDone, onError);
}

/* Internal: call Cloudflare Worker proxy (free tier / no key) */
async function _streamViaProxy(modelId, messages, onChunk, onDone, onError) {
  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: modelId, messages }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      let errMsg = `Error ${response.status}`;
      try {
        const parsed = JSON.parse(errBody);
        errMsg = parsed.error || parsed.message || errMsg;
      } catch { errMsg = errBody.substring(0, 200) || errMsg; }

      if (response.status === 429) {
        errMsg = errMsg.includes('daily limit')
          ? errMsg
          : 'Daily free limit reached. Add your own OpenRouter API key in Settings to continue.';
      }
      onError(errMsg);
      return null;
    }

    return await _readStream(response, onChunk, onDone, onError);
  } catch (err) {
    onError(err.message || 'Network error. Please check your connection.');
    return null;
  }
}

/* Internal: call OpenRouter directly (BYO key) */
async function _streamDirect(apiKey, modelId, messages, onChunk, onDone, onError) {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
        'HTTP-Referer':  window.location.origin,
        'X-Title':       'Quantum Merlin AI Hub',
      },
      body: JSON.stringify({ model: modelId, messages, stream: true }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      let errorMsg = `API Error ${response.status}`;
      try {
        const parsed = JSON.parse(errorBody);
        errorMsg = parsed.error?.message || parsed.message || errorMsg;
      } catch (e) {
        errorMsg = errorBody.substring(0, 200) || errorMsg;
      }

      if (response.status === 429) {
        errorMsg = 'Rate limited. Please wait a moment and try again.';
      } else if (response.status === 401 || response.status === 403) {
        errorMsg = 'Invalid API key. Please check your OpenRouter API key in Settings.';
      } else if (response.status === 502 || response.status === 503) {
        errorMsg = `This model appears to be temporarily unavailable. Try a different model or report it at brokenmodel@quantummerlin.com`;
      }

      onError(errorMsg);
      return null;
    }

    return await _readStream(response, onChunk, onDone, onError);
  } catch (err) {
    if (err.name === 'AbortError') { onDone(cleanOutput('')); return ''; }
    onError(err.message || 'Network error. Please check your connection.');
    return null;
  }
}

/* Internal: read an SSE stream and fire callbacks */
async function _readStream(response, onChunk, onDone, onError) {
  try {
    const reader  = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    let buffer   = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;

        const data = trimmed.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const delta  = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            fullText += delta;
            onChunk(delta, fullText);
          }
        } catch (e) {
          // Skip malformed chunks
        }
      }
    }

    const cleaned = cleanOutput(fullText);
    onDone(cleaned);
    return cleaned;
  } catch (err) {
    if (err.name === 'AbortError') { onDone(cleanOutput('')); return ''; }
    onError(err.message || 'Network error. Please check your connection.');
    return null;
  }
}

/* --- Summarise Thread for New Thread --- */
function buildSummarisePrompt(thread) {
  const msgs = thread.messages || [];
  if (msgs.length === 0) return null;

  const conversationText = msgs.map(m => {
    const role = m.role === 'user' ? 'User' : 'Assistant';
    const content = typeof m.content === 'string' ? m.content : JSON.stringify(m.content);
    return `${role}: ${content.substring(0, 500)}`;
  }).join('\n\n');

  return [
    {
      role: 'system',
      content: 'Summarise the following conversation in a concise paragraph. Capture the main topic, key decisions, important details, and any unresolved questions. This summary will be used to continue the conversation in a new thread.'
    },
    {
      role: 'user',
      content: conversationText.substring(0, 8000)
    }
  ];
}

/* --- PDF Text Extraction (client-side) --- */
async function extractTextFromPDF(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async function (e) {
      try {
        // Basic text extraction from PDF
        // For full extraction, we'd use pdf.js, but for simplicity:
        const text = await basicPDFTextExtract(e.target.result);
        resolve(text);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

async function basicPDFTextExtract(arrayBuffer) {
  // Simple text extraction by scanning for text streams in PDF
  const uint8 = new Uint8Array(arrayBuffer);
  const text = new TextDecoder('utf-8', { fatal: false }).decode(uint8);

  // Extract text between BT and ET markers (basic approach)
  const textParts = [];
  const regex = /\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const part = match[1].replace(/\\n/g, '\n').replace(/\\r/g, '').replace(/\\\\/g, '\\');
    if (part.trim().length > 1 && !/^[\x00-\x1F]+$/.test(part)) {
      textParts.push(part);
    }
  }

  const extracted = textParts.join(' ').replace(/\s+/g, ' ').trim();

  if (extracted.length < 50) {
    return '[PDF text extraction produced limited results. The PDF may contain primarily images or scanned content. Consider using a model with native PDF support such as Gemini 2.0 Flash.]';
  }

  return extracted;
}

/* --- Convert file to base64 data URL --- */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}