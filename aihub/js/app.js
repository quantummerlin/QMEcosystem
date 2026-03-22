/* ============================================
   QUANTUM MERLIN AI HUB - Main Application
   ============================================ */

/* --- State --- */
const State = {
  currentThreadId: null,
  currentModelId: null,
  threads: {},          // { threadId: { id, title, modelId, messages: [], createdAt } }
  apiKey: '',
  theme: 'dark',
  skills: [],
  memory: [],
  isStreaming: false,
  pendingFiles: [],     // Files to attach to next message
  requestCount: 0,      // Today's request count
  requestDate: ''       // Date string for tracking daily reset
};

/* --- Storage Keys --- */
const KEYS = {
  threads: 'qm_threads',
  currentThread: 'qm_current_thread',
  currentModel: 'qm_current_model',
  apiKey: 'qm_api_key',
  theme: 'qm_theme',
  requestCount: 'qm_request_count',
  requestDate: 'qm_request_date'
};

/* --- Request Limits --- */
const REQUEST_LIMITS = {
  FREE: 20,        // No API key (uses shared key)
  BYO: 50,         // User provides their own OpenRouter key
  CREDIT: 1000     // User has $10+ credit (verified via API)
};

// Returns the user's own BYO key, or null for the free tier.
// Null routes through the Cloudflare Worker proxy (keys are server-side secrets).
function getNextApiKey() {
  return State.apiKey || null;
}

/* --- DOM References --- */
const DOM = {};

function cacheDOMRefs() {
  DOM.sidebar = document.getElementById('sidebar');
  DOM.sidebarOverlay = document.getElementById('sidebarOverlay');
  DOM.hamburgerBtn = document.getElementById('hamburgerBtn');
  DOM.modelSelectorBtn = document.getElementById('modelSelectorBtn');
  DOM.modelDropdown = document.getElementById('modelDropdown');
  DOM.modelDropdownList = document.getElementById('modelDropdownList');
  DOM.modelSearchInput = document.getElementById('modelSearchInput');
  DOM.currentModelName = document.getElementById('currentModelName');
  DOM.newChatBtn = document.getElementById('newChatBtn');
  DOM.conversationList = document.getElementById('conversationList');
  DOM.chatArea = document.getElementById('chatArea');
  DOM.chatMessages = document.getElementById('chatMessages');
  DOM.welcomeScreen = document.getElementById('welcomeScreen');
  DOM.messageInput = document.getElementById('messageInput');
  DOM.sendBtn = document.getElementById('sendBtn');
  DOM.attachFileBtn = document.getElementById('attachFileBtn');
  DOM.fileInput = document.getElementById('fileInput');
  DOM.fileCapBar = document.getElementById('fileCapBar');
  DOM.fileAttachmentPreview = document.getElementById('fileAttachmentPreview');
  DOM.tokenCounter = document.getElementById('tokenCounter');
  DOM.threadInfo = document.getElementById('threadInfo');
  DOM.rightMenuBtn = document.getElementById('rightMenuBtn');
  DOM.rightMenuDropdown = document.getElementById('rightMenuDropdown');
  DOM.contextWarning = document.getElementById('contextWarning');
  DOM.summariseBtn = document.getElementById('summariseBtn');
  DOM.skillsModal = document.getElementById('skillsModal');
  DOM.skillsModalBody = document.getElementById('skillsModalBody');
  DOM.memoryModal = document.getElementById('memoryModal');
  DOM.memoryModalBody = document.getElementById('memoryModalBody');
  DOM.settingsModal = document.getElementById('settingsModal');
  DOM.clearDataModal = document.getElementById('clearDataModal');
  DOM.apiKeyInput = document.getElementById('apiKeyInput');
  DOM.saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
  DOM.openSkillsBtn = document.getElementById('openSkillsBtn');
  DOM.openMemoryBtn = document.getElementById('openMemoryBtn');
  DOM.openSettingsBtn = document.getElementById('openSettingsBtn');
  DOM.exportDataBtn = document.getElementById('exportDataBtn');
  DOM.clearAllDataBtn = document.getElementById('clearAllDataBtn');
  DOM.confirmClearBtn = document.getElementById('confirmClearBtn');
  DOM.restoreSkillsBtn = document.getElementById('restoreSkillsBtn');
  DOM.restoreMemoryBtn = document.getElementById('restoreMemoryBtn');
}

/* ============================================
   INITIALIZATION
   ============================================ */

function init() {
  cacheDOMRefs();
  loadState();
  renderModelDropdown();
  renderConversationList();
  renderCurrentThread();
  updateRequestCounter();
  updateFileCapBar();
  updateThemeButtons();
  setupEventListeners();
  autoResizeTextarea();
}

function loadState() {
  try {
    State.apiKey = localStorage.getItem(KEYS.apiKey) || '';
    State.theme = localStorage.getItem(KEYS.theme) || 'dark';
    State.currentModelId = localStorage.getItem(KEYS.currentModel) || MODEL_REGISTRY[0].id;
    State.currentThreadId = localStorage.getItem(KEYS.currentThread) || null;

    const savedThreads = localStorage.getItem(KEYS.threads);
    if (savedThreads) {
      State.threads = JSON.parse(savedThreads);
    }

    State.skills = SkillsManager.load();
    State.memory = MemoryManager.load();

    // Load request tracking
    loadRequestTracking();

    // Apply theme
    document.documentElement.setAttribute('data-theme', State.theme);

    // Validate current model exists
    if (!getModelById(State.currentModelId)) {
      State.currentModelId = MODEL_REGISTRY[0].id;
    }
  } catch (e) {
    console.warn('Error loading state:', e);
  }
}

function saveThreads() {
  try {
    localStorage.setItem(KEYS.threads, JSON.stringify(State.threads));
  } catch (e) {
    console.warn('Failed to save threads:', e);
  }
}

function saveCurrentThread() {
  localStorage.setItem(KEYS.currentThread, State.currentThreadId || '');
}

function saveCurrentModel() {
  localStorage.setItem(KEYS.currentModel, State.currentModelId);
}

/* ============================================
   EVENT LISTENERS
   ============================================ */

function setupEventListeners() {
  // Sidebar toggle (mobile)
  DOM.hamburgerBtn.addEventListener('click', toggleSidebar);
  DOM.sidebarOverlay.addEventListener('click', closeSidebar);

  // Model selector
  DOM.modelSelectorBtn.addEventListener('click', toggleModelDropdown);
  DOM.modelSearchInput.addEventListener('input', filterModels);

  // New chat
  DOM.newChatBtn.addEventListener('click', createNewChat);

  // Send message
  DOM.sendBtn.addEventListener('click', sendMessage);
  DOM.messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  DOM.messageInput.addEventListener('input', () => {
    autoResizeTextarea();
    updateSendButton();
  });

  // File attachment
  DOM.attachFileBtn.addEventListener('click', () => DOM.fileInput.click());
  DOM.fileInput.addEventListener('change', handleFileSelect);

  // Right menu
  DOM.rightMenuBtn.addEventListener('click', toggleRightMenu);

  // Theme switcher
  document.querySelectorAll('[data-theme-choice]').forEach(btn => {
    btn.addEventListener('click', () => switchTheme(btn.dataset.themeChoice));
  });

  // Modals
  DOM.openSkillsBtn.addEventListener('click', () => { closeRightMenu(); openModal('skillsModal'); renderSkillsModal(); });
  DOM.openMemoryBtn.addEventListener('click', () => { closeRightMenu(); openModal('memoryModal'); renderMemoryModal(); });
  DOM.openSettingsBtn.addEventListener('click', () => { closeRightMenu(); openModal('settingsModal'); DOM.apiKeyInput.value = State.apiKey; });
  DOM.exportDataBtn.addEventListener('click', () => { closeRightMenu(); exportAllData(); });
  DOM.clearAllDataBtn.addEventListener('click', () => { closeRightMenu(); openModal('clearDataModal'); });

  // Modal close buttons
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.closeModal));
  });

  // Save API key
  DOM.saveApiKeyBtn.addEventListener('click', saveApiKey);

  // Clear all data
  DOM.confirmClearBtn.addEventListener('click', clearAllData);

  // Restore defaults
  DOM.restoreSkillsBtn.addEventListener('click', () => {
    State.skills = SkillsManager.restoreDefaults();
    renderSkillsModal();
  });
  DOM.restoreMemoryBtn.addEventListener('click', () => {
    State.memory = MemoryManager.restoreDefaults();
    renderMemoryModal();
  });

  // Summarise
  DOM.summariseBtn.addEventListener('click', summariseAndContinue);

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!DOM.modelSelectorBtn.contains(e.target) && !DOM.modelDropdown.contains(e.target)) {
      closeModelDropdown();
    }
    if (!DOM.rightMenuBtn.contains(e.target) && !DOM.rightMenuDropdown.contains(e.target)) {
      closeRightMenu();
    }
  });

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });
}

/* ============================================
   SIDEBAR
   ============================================ */

function toggleSidebar() {
  DOM.sidebar.classList.toggle('open');
  DOM.sidebarOverlay.classList.toggle('active');
}

function closeSidebar() {
  DOM.sidebar.classList.remove('open');
  DOM.sidebarOverlay.classList.remove('active');
}

/* ============================================
   MODEL SELECTOR
   ============================================ */

function toggleModelDropdown() {
  const isOpen = DOM.modelDropdown.classList.contains('open');
  if (isOpen) {
    closeModelDropdown();
  } else {
    DOM.modelDropdown.classList.add('open');
    DOM.modelSelectorBtn.classList.add('open');
    DOM.modelSearchInput.value = '';
    DOM.modelSearchInput.focus();
    filterModels();
  }
}

function closeModelDropdown() {
  DOM.modelDropdown.classList.remove('open');
  DOM.modelSelectorBtn.classList.remove('open');
}

function renderModelDropdown(filter = '') {
  const lowerFilter = filter.toLowerCase();
  const filtered = MODEL_REGISTRY.filter(m =>
    m.name.toLowerCase().includes(lowerFilter) ||
    m.provider.toLowerCase().includes(lowerFilter) ||
    m.id.toLowerCase().includes(lowerFilter)
  );

  DOM.modelDropdownList.innerHTML = filtered.map(m => {
    const isActive = m.id === State.currentModelId;
    return `
      <div class="model-option ${isActive ? 'active' : ''}" data-model-id="${m.id}" title="${m.desc}\nContext: ${formatContextLength(m.contextLength)}">
        <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
          <strong>${m.name}</strong> <span style="opacity:0.5; font-size:11px;">${m.provider}</span>
        </span>
        <span class="model-caps">${getCapBadgesHTML(m)}</span>
      </div>
    `;
  }).join('');

  // Attach click handlers
  DOM.modelDropdownList.querySelectorAll('.model-option').forEach(el => {
    el.addEventListener('click', () => selectModel(el.dataset.modelId));
  });

  // Update current name
  const current = getModelById(State.currentModelId);
  DOM.currentModelName.textContent = current ? current.name : 'Select a model...';
}

function filterModels() {
  renderModelDropdown(DOM.modelSearchInput.value);
}

function selectModel(modelId) {
  const oldModelId = State.currentModelId;
  const newModel = getModelById(modelId);
  if (!newModel) return;

  State.currentModelId = modelId;
  saveCurrentModel();
  closeModelDropdown();
  renderModelDropdown();
  updateFileCapBar();

  // Check context limit warning when switching mid-thread
  if (oldModelId !== modelId && State.currentThreadId) {
    const thread = State.threads[State.currentThreadId];
    if (thread && thread.messages.length > 0) {
      const currentTokens = estimateThreadTokens(thread);
      if (currentTokens > newModel.contextLength * 0.8) {
        showContextWarning(
          `Warning: This thread has ~${currentTokens.toLocaleString()} tokens, ` +
          `but ${newModel.name} has a ${formatContextLength(newModel.contextLength)} context limit. ` +
          `Consider using "Summarise & Continue".`
        );
      }
    }
  }

  // Update thread's model reference
  if (State.currentThreadId && State.threads[State.currentThreadId]) {
    State.threads[State.currentThreadId].modelId = modelId;
    saveThreads();
  }

  updateTokenCounter();
  closeSidebar();
}

/* ============================================
   FILE CAPABILITY BAR
   ============================================ */

function updateFileCapBar() {
  const model = getModelById(State.currentModelId);
  if (!model) {
    DOM.fileCapBar.innerHTML = '';
    return;
  }

  const caps = [
    { key: 'image', label: 'Image', supported: model.caps.image },
    { key: 'pdfNative', label: 'PDF', supported: model.caps.pdfNative, partial: model.caps.pdfText && !model.caps.pdfNative },
    { key: 'audio', label: 'Audio', supported: model.caps.audio }
  ];

  DOM.fileCapBar.innerHTML = caps.map(c => {
    if (c.supported) {
      return `<span class="file-cap-chip supported">${c.label}</span>`;
    } else if (c.partial) {
      return `<span class="file-cap-chip supported" style="opacity:0.65;" title="Text extraction only">${c.label} (text)</span>`;
    } else {
      const tip = getSuggestedModelForCap(c.key);
      return `<span class="file-cap-chip unsupported" title="${tip}">${c.label}</span>`;
    }
  }).join('');
}

function getSuggestedModelForCap(capKey) {
  const suggestions = {
    image: MODEL_REGISTRY.filter(m => m.caps.image).slice(0, 3).map(m => m.name).join(', '),
    pdfNative: MODEL_REGISTRY.filter(m => m.caps.pdfNative).slice(0, 3).map(m => m.name).join(', '),
    audio: MODEL_REGISTRY.filter(m => m.caps.audio).slice(0, 3).map(m => m.name).join(', ')
  };
  const models = suggestions[capKey] || '';
  return models ? `Not supported. Try: ${models}` : 'Not supported by this model.';
}

/* ============================================
   CONVERSATIONS
   ============================================ */

function createNewChat() {
  const threadId = 'thread_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  State.threads[threadId] = {
    id: threadId,
    title: 'New Chat',
    modelId: State.currentModelId,
    messages: [],
    createdAt: Date.now()
  };

  State.currentThreadId = threadId;
  saveThreads();
  saveCurrentThread();
  renderConversationList();
  renderCurrentThread();
  updateTokenCounter();
  DOM.messageInput.focus();
  closeSidebar();
}

function switchThread(threadId) {
  if (!State.threads[threadId]) return;
  State.currentThreadId = threadId;

  // Restore thread's model
  const thread = State.threads[threadId];
  if (thread.modelId && getModelById(thread.modelId)) {
    State.currentModelId = thread.modelId;
    saveCurrentModel();
    renderModelDropdown();
    updateFileCapBar();
  }

  saveCurrentThread();
  renderConversationList();
  renderCurrentThread();
  updateTokenCounter();
  closeSidebar();
}

function deleteThread(threadId) {
  delete State.threads[threadId];
  if (State.currentThreadId === threadId) {
    const threadIds = Object.keys(State.threads);
    State.currentThreadId = threadIds.length > 0 ? threadIds[threadIds.length - 1] : null;
  }
  saveThreads();
  saveCurrentThread();
  renderConversationList();
  renderCurrentThread();
  updateTokenCounter();
}

function renderConversationList() {
  const threadIds = Object.keys(State.threads).sort((a, b) => {
    return (State.threads[b].createdAt || 0) - (State.threads[a].createdAt || 0);
  });

  if (threadIds.length === 0) {
    DOM.conversationList.innerHTML = '<div style="padding:20px 12px; font-size:12px; opacity:0.4; text-align:center;">No conversations yet</div>';
    return;
  }

  // Group by time
  const now = Date.now();
  const day = 86400000;
  const groups = { today: [], yesterday: [], week: [], older: [] };

  threadIds.forEach(id => {
    const t = State.threads[id];
    const age = now - (t.createdAt || 0);
    if (age < day) groups.today.push(t);
    else if (age < 2 * day) groups.yesterday.push(t);
    else if (age < 7 * day) groups.week.push(t);
    else groups.older.push(t);
  });

  let html = '';
  const renderGroup = (label, items) => {
    if (items.length === 0) return '';
    let h = `<div class="conversation-group-label">${label}</div>`;
    items.forEach(t => {
      const isActive = t.id === State.currentThreadId;
      h += `
        <div class="conversation-item ${isActive ? 'active' : ''}" data-thread-id="${t.id}">
          <span class="conv-title">${escapeHTML(t.title)}</span>
          <button class="conv-delete" data-delete-thread="${t.id}" title="Delete">&times;</button>
        </div>
      `;
    });
    return h;
  };

  html += renderGroup('Today', groups.today);
  html += renderGroup('Yesterday', groups.yesterday);
  html += renderGroup('This Week', groups.week);
  html += renderGroup('Older', groups.older);

  DOM.conversationList.innerHTML = html;

  // Attach handlers
  DOM.conversationList.querySelectorAll('.conversation-item').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.conv-delete')) return;
      switchThread(el.dataset.threadId);
    });
  });

  DOM.conversationList.querySelectorAll('.conv-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteThread(btn.dataset.deleteThread);
    });
  });
}

/* ============================================
   CHAT RENDERING
   ============================================ */

function renderCurrentThread() {
  const thread = State.currentThreadId ? State.threads[State.currentThreadId] : null;

  if (!thread || thread.messages.length === 0) {
    DOM.welcomeScreen.style.display = 'flex';
    DOM.chatMessages.style.display = 'none';
    DOM.summariseBtn.classList.remove('visible');
    DOM.threadInfo.textContent = '';
    return;
  }

  DOM.welcomeScreen.style.display = 'none';
  DOM.chatMessages.style.display = 'flex';
  DOM.threadInfo.textContent = thread.title;

  let html = '';
  thread.messages.forEach(m => {
    html += renderMessage(m);
  });

  DOM.chatMessages.innerHTML = html;
  scrollToBottom();

  // Show summarise button if thread is getting long
  const tokens = estimateThreadTokens(thread);
  const model = getModelById(State.currentModelId);
  if (model && tokens > model.contextLength * 0.6) {
    DOM.summariseBtn.classList.add('visible');
  } else {
    DOM.summariseBtn.classList.remove('visible');
  }
}

function renderMessage(msg) {
  const isUser = msg.role === 'user';
  const avatarText = isUser ? 'U' : 'AI';
  const modelLabel = !isUser && msg.modelName ? msg.modelName : '';
  const content = typeof msg.content === 'string' ? msg.content : '';

  return `
    <div class="message-row ${msg.role}">
      <div class="message-avatar">${avatarText}</div>
      <div class="message-content">
        ${modelLabel ? `<div class="message-model-label">${escapeHTML(modelLabel)}</div>` : ''}
        <div class="message-bubble">${formatMessageContent(content)}</div>
      </div>
    </div>
  `;
}

function formatMessageContent(text) {
  if (!text) return '';

  // Basic markdown rendering
  let html = escapeHTML(text);

  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="language-${lang}">${code}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Numbered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>\s*(<h[123]>)/g, '$1');
  html = html.replace(/(<\/h[123]>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<pre>)/g, '$1');
  html = html.replace(/(<\/pre>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<blockquote>)/g, '$1');
  html = html.replace(/(<\/blockquote>)\s*<\/p>/g, '$1');

  return html;
}

function addTypingIndicator() {
  const indicator = document.createElement('div');
  indicator.id = 'typingIndicator';
  indicator.className = 'message-row assistant';
  indicator.innerHTML = `
    <div class="message-avatar">AI</div>
    <div class="message-content">
      <div class="message-bubble">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    </div>
  `;
  DOM.chatMessages.appendChild(indicator);
  scrollToBottom();
}

function removeTypingIndicator() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function addStreamingMessage(modelName) {
  const row = document.createElement('div');
  row.id = 'streamingMessage';
  row.className = 'message-row assistant';
  row.innerHTML = `
    <div class="message-avatar">AI</div>
    <div class="message-content">
      ${modelName ? `<div class="message-model-label">${escapeHTML(modelName)}</div>` : ''}
      <div class="message-bubble" id="streamingBubble"></div>
    </div>
  `;
  DOM.chatMessages.appendChild(row);
  scrollToBottom();
}

function updateStreamingMessage(text) {
  const bubble = document.getElementById('streamingBubble');
  if (bubble) {
    bubble.innerHTML = formatMessageContent(text);
    scrollToBottom();
  }
}

function finaliseStreamingMessage() {
  const el = document.getElementById('streamingMessage');
  if (el) el.removeAttribute('id');
  const bubble = document.getElementById('streamingBubble');
  if (bubble) bubble.removeAttribute('id');
}

function scrollToBottom() {
  DOM.chatArea.scrollTop = DOM.chatArea.scrollHeight;
}

/* ============================================
   SEND MESSAGE
   ============================================ */

async function sendMessage() {
  if (State.isStreaming) return;

  const text = DOM.messageInput.value.trim();
  if (!text && State.pendingFiles.length === 0) return;

  // Check request limit
  if (isAtRequestLimit()) {
    showLimitReachedModal();
    return;
  }

  // Get API key: null = free tier via proxy, string = user's own BYO key
  const apiKey = getNextApiKey();

  // Create thread if needed
  if (!State.currentThreadId) {
    createNewChat();
  }

  const thread = State.threads[State.currentThreadId];
  if (!thread) return;

  const model = getModelById(State.currentModelId);
  if (!model) return;

  // Build message content
  let messageContent = text;
  const fileContents = [];

  // Process pending files
  for (const file of State.pendingFiles) {
    try {
      if (file.type.startsWith('image/') && model.caps.image) {
        const base64 = await fileToBase64(file);
        fileContents.push({
          type: 'image_url',
          image_url: { url: base64 }
        });
      } else if (file.type === 'application/pdf') {
        if (model.caps.pdfNative) {
          const base64 = await fileToBase64(file);
          fileContents.push({
            type: 'image_url',
            image_url: { url: base64 }
          });
        } else if (model.caps.pdfText) {
          const pdfText = await extractTextFromPDF(file);
          messageContent += `\n\n[PDF Content from ${file.name}]:\n${pdfText}`;
        }
      } else if (file.type.startsWith('audio/') && model.caps.audio) {
        const base64 = await fileToBase64(file);
        fileContents.push({
          type: 'input_audio',
          input_audio: { data: base64.split(',')[1], format: file.name.split('.').pop() }
        });
      }
    } catch (err) {
      console.warn('Error processing file:', err);
      messageContent += `\n\n[Failed to process ${file.name}: ${err.message}]`;
    }
  }

  // Build the user message
  let userContent;
  if (fileContents.length > 0) {
    userContent = [
      { type: 'text', text: messageContent },
      ...fileContents
    ];
  } else {
    userContent = messageContent;
  }

  // Add user message to thread
  const userMsg = {
    role: 'user',
    content: userContent,
    timestamp: Date.now()
  };
  thread.messages.push(userMsg);

  // Update title from first message
  if (thread.messages.filter(m => m.role === 'user').length === 1) {
    thread.title = text.substring(0, 50) + (text.length > 50 ? '...' : '');
  }

  // Update thread model
  thread.modelId = State.currentModelId;

  // Clear input
  DOM.messageInput.value = '';
  State.pendingFiles = [];
  DOM.fileAttachmentPreview.innerHTML = '';
  autoResizeTextarea();
  updateSendButton();

  // Render user message
  DOM.welcomeScreen.style.display = 'none';
  DOM.chatMessages.style.display = 'flex';
  DOM.chatMessages.innerHTML += renderMessage(userMsg);
  scrollToBottom();

  saveThreads();
  renderConversationList();

  // Start streaming response
  State.isStreaming = true;
  updateSendButton();
  addTypingIndicator();

  // Build API messages
  // Check if model changed mid-thread (context weave needed)
  const previousModels = thread.messages
    .filter(m => m.role === 'assistant' && m.modelId)
    .map(m => m.modelId);
  const needsWeave = previousModels.length > 0 && previousModels[previousModels.length - 1] !== State.currentModelId;

  let apiMessages;
  if (needsWeave) {
    apiMessages = buildContextWeave(thread, State.currentModelId, State.skills, State.memory);
    // Add the latest user message
    apiMessages.push({ role: 'user', content: userContent });
  } else {
    apiMessages = buildMessagesForAPI(thread, State.skills, State.memory);
  }

  removeTypingIndicator();
  addStreamingMessage(model.name);

  let finalText = '';

  await streamChatCompletion(
    apiKey,
    State.currentModelId,
    apiMessages,
    // onChunk
    (chunk, fullText) => {
      updateStreamingMessage(fullText);
    },
    // onDone
    (cleaned) => {
      finalText = cleaned;
      finaliseStreamingMessage();

      // Increment request count on successful response
      incrementRequestCount();

      // Save assistant message
      const assistantMsg = {
        role: 'assistant',
        content: cleaned,
        modelId: State.currentModelId,
        modelName: model.name,
        timestamp: Date.now()
      };
      thread.messages.push(assistantMsg);
      saveThreads();

      State.isStreaming = false;
      updateSendButton();
      updateTokenCounter();
      renderConversationList();

      // Check if we need summarise button
      const tokens = estimateThreadTokens(thread);
      if (tokens > model.contextLength * 0.6) {
        DOM.summariseBtn.classList.add('visible');
      }
    },
    // onError
    (errorMsg) => {
      finaliseStreamingMessage();
      const errorBubble = document.getElementById('streamingBubble') ||
        DOM.chatMessages.lastElementChild?.querySelector('.message-bubble');

      if (errorBubble) {
        errorBubble.innerHTML = `<p style="color:#ef4444;">${escapeHTML(errorMsg)}</p>`;
      } else {
        DOM.chatMessages.innerHTML += `
          <div class="message-row assistant">
            <div class="message-avatar">AI</div>
            <div class="message-content">
              <div class="message-bubble"><p style="color:#ef4444;">${escapeHTML(errorMsg)}</p></div>
            </div>
          </div>
        `;
      }

      State.isStreaming = false;
      updateSendButton();
      scrollToBottom();
    }
  );
}

/* ============================================
   FILE HANDLING
   ============================================ */

function handleFileSelect(e) {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  const model = getModelById(State.currentModelId);

  files.forEach(file => {
    // Validate file against model capabilities
    const isImage = file.type.startsWith('image/');
    const isPDF = file.type === 'application/pdf';
    const isAudio = file.type.startsWith('audio/');

    if (isImage && !model?.caps.image) {
      showContextWarning(`${model?.name || 'This model'} does not support image input. Try: ${getSuggestedModelForCap('image')}`);
      return;
    }
    if (isPDF && !model?.caps.pdfNative && !model?.caps.pdfText) {
      showContextWarning(`${model?.name || 'This model'} does not support PDF input.`);
      return;
    }
    if (isAudio && !model?.caps.audio) {
      showContextWarning(`${model?.name || 'This model'} does not support audio input. Try: ${getSuggestedModelForCap('audio')}`);
      return;
    }

    State.pendingFiles.push(file);
  });

  renderFileAttachments();
  updateSendButton();
  DOM.fileInput.value = '';
}

function renderFileAttachments() {
  DOM.fileAttachmentPreview.innerHTML = State.pendingFiles.map((f, i) => {
    const icon = f.type.startsWith('image/') ? '&#128444;' :
                 f.type === 'application/pdf' ? '&#128196;' :
                 f.type.startsWith('audio/') ? '&#127925;' : '&#128196;';
    return `
      <div class="file-attachment-chip">
        <span>${icon}</span>
        <span>${escapeHTML(f.name.substring(0, 20))}${f.name.length > 20 ? '...' : ''}</span>
        <span class="remove-file" data-file-index="${i}">&times;</span>
      </div>
    `;
  }).join('');

  DOM.fileAttachmentPreview.querySelectorAll('.remove-file').forEach(btn => {
    btn.addEventListener('click', () => {
      State.pendingFiles.splice(parseInt(btn.dataset.fileIndex), 1);
      renderFileAttachments();
      updateSendButton();
    });
  });
}

/* ============================================
   THEME
   ============================================ */

function switchTheme(theme) {
  State.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(KEYS.theme, theme);
  updateThemeButtons();
}

function updateThemeButtons() {
  document.querySelectorAll('[data-theme-choice]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.themeChoice === State.theme);
  });
}

/* ============================================
   RIGHT MENU
   ============================================ */

function toggleRightMenu() {
  const isOpen = DOM.rightMenuDropdown.classList.contains('open');
  if (isOpen) {
    closeRightMenu();
  } else {
    DOM.rightMenuDropdown.classList.add('open');
    DOM.rightMenuBtn.setAttribute('aria-expanded', 'true');
  }
}

function closeRightMenu() {
  DOM.rightMenuDropdown.classList.remove('open');
  DOM.rightMenuBtn.setAttribute('aria-expanded', 'false');
}

/* ============================================
   MODALS
   ============================================ */

function openModal(modalId) {
  document.getElementById(modalId)?.classList.add('open');
}

function closeModal(modalId) {
  document.getElementById(modalId)?.classList.remove('open');

  // Save skills/memory on modal close
  if (modalId === 'skillsModal') {
    saveSkillsFromModal();
  } else if (modalId === 'memoryModal') {
    saveMemoryFromModal();
  }
}

/* --- Skills Modal --- */
function renderSkillsModal() {
  DOM.skillsModalBody.innerHTML = State.skills.map((s, i) => `
    <div class="skill-item">
      <input type="checkbox" class="skill-toggle" data-skill-index="${i}" ${s.enabled ? 'checked' : ''}>
      <div class="skill-info">
        <div class="skill-name">${escapeHTML(s.name)}</div>
        <div class="skill-desc">${escapeHTML(s.desc)}</div>
      </div>
    </div>
  `).join('');

  DOM.skillsModalBody.querySelectorAll('.skill-toggle').forEach(cb => {
    cb.addEventListener('change', () => {
      State.skills[parseInt(cb.dataset.skillIndex)].enabled = cb.checked;
    });
  });
}

function saveSkillsFromModal() {
  SkillsManager.save(State.skills);
}

/* --- Memory Modal --- */
function renderMemoryModal() {
  DOM.memoryModalBody.innerHTML = State.memory.map((m, i) => `
    <div class="memory-item">
      <label class="memory-label">${escapeHTML(m.label)}</label>
      <textarea data-memory-index="${i}" placeholder="${escapeHTML(m.placeholder)}">${escapeHTML(m.value)}</textarea>
    </div>
  `).join('');

  DOM.memoryModalBody.querySelectorAll('textarea').forEach(ta => {
    ta.addEventListener('input', () => {
      State.memory[parseInt(ta.dataset.memoryIndex)].value = ta.value;
    });
  });
}

function saveMemoryFromModal() {
  MemoryManager.save(State.memory);
}

/* ============================================
   SETTINGS & DATA
   ============================================ */

function saveApiKey() {
  State.apiKey = DOM.apiKeyInput.value.trim();
  localStorage.setItem(KEYS.apiKey, State.apiKey);
  closeModal('settingsModal');
  updateRequestCounter();
}

function exportAllData() {
  const data = {
    threads: State.threads,
    skills: State.skills,
    memory: State.memory,
    theme: State.theme,
    currentModel: State.currentModelId,
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `quantum-merlin-export-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function clearAllData() {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
  localStorage.removeItem(SkillsManager.STORAGE_KEY);
  localStorage.removeItem(MemoryManager.STORAGE_KEY);

  State.threads = {};
  State.currentThreadId = null;
  State.apiKey = '';
  State.skills = SkillsManager.restoreDefaults();
  State.memory = MemoryManager.restoreDefaults();

  closeModal('clearDataModal');
  renderConversationList();
  renderCurrentThread();
  updateTokenCounter();
}

/* ============================================
   SUMMARISE & CONTINUE
   ============================================ */

async function summariseAndContinue() {
  if (State.isStreaming) return;
  const thread = State.threads[State.currentThreadId];
  if (!thread || thread.messages.length === 0) return;

  const summariseMessages = buildSummarisePrompt(thread);
  if (!summariseMessages) return;

  State.isStreaming = true;
  DOM.summariseBtn.textContent = 'Summarising...';
  DOM.summariseBtn.disabled = true;

  let summary = '';

  const apiKey = getNextApiKey();

  await streamChatCompletion(
    apiKey,
    State.currentModelId,
    summariseMessages,
    (chunk, full) => { /* no visual feedback needed */ },
    (cleaned) => {
      summary = cleaned;
    },
    (err) => {
      summary = '';
      showContextWarning('Failed to summarise: ' + err);
    }
  );

  State.isStreaming = false;
  DOM.summariseBtn.textContent = 'Summarise & Continue in New Thread';
  DOM.summariseBtn.disabled = false;

  if (summary) {
    // Create new thread with summary as first system context
    const newId = 'thread_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    State.threads[newId] = {
      id: newId,
      title: 'Continued: ' + thread.title,
      modelId: State.currentModelId,
      messages: [
        {
          role: 'assistant',
          content: '**Summary of previous conversation:**\n\n' + summary,
          modelName: 'System',
          timestamp: Date.now()
        }
      ],
      createdAt: Date.now()
    };

    State.currentThreadId = newId;
    saveThreads();
    saveCurrentThread();
    renderConversationList();
    renderCurrentThread();
    updateTokenCounter();
  }
}

/* ============================================
   CONTEXT WARNING
   ============================================ */

function showContextWarning(message) {
  DOM.contextWarning.textContent = message;
  DOM.contextWarning.classList.add('visible');
  setTimeout(() => {
    DOM.contextWarning.classList.remove('visible');
  }, 6000);
}

/* ============================================
   UTILITIES
   ============================================ */

function escapeHTML(str) {
  if (!str) return '';
  const text = typeof str === 'string' ? str : JSON.stringify(str);
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function autoResizeTextarea() {
  const ta = DOM.messageInput;
  if (!ta) return;
  ta.style.height = 'auto';
  ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
}

function updateSendButton() {
  const hasContent = DOM.messageInput.value.trim().length > 0 || State.pendingFiles.length > 0;
  const canSend = hasContent && !State.isStreaming && !isAtRequestLimit();
  DOM.sendBtn.classList.toggle('active', canSend);
}

/* ============================================
   REQUEST LIMITS & TIER SYSTEM
   ============================================ */

function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

function initRequestTracking() {
  const today = getTodayString();
  if (State.requestDate !== today) {
    State.requestCount = 0;
    State.requestDate = today;
    saveRequestTracking();
  }
}

function saveRequestTracking() {
  localStorage.setItem(KEYS.requestCount, State.requestCount.toString());
  localStorage.setItem(KEYS.requestDate, State.requestDate);
}

function loadRequestTracking() {
  State.requestCount = parseInt(localStorage.getItem(KEYS.requestCount) || '0', 10);
  State.requestDate = localStorage.getItem(KEYS.requestDate) || '';
  initRequestTracking();
}

function getUserTier() {
  if (State.apiKey) {
    // User has their own key - check if they have credit
    // For now, we assume BYO tier. Credit tier would require API verification.
    // This could be enhanced with a server-side check of OpenRouter balance.
    return 'BYO';
  }
  return 'FREE';
}

function getRequestLimit() {
  const tier = getUserTier();
  return REQUEST_LIMITS[tier] || REQUEST_LIMITS.FREE;
}

function getRemainingRequests() {
  const limit = getRequestLimit();
  return Math.max(0, limit - State.requestCount);
}

function isAtRequestLimit() {
  return getRemainingRequests() <= 0;
}

function incrementRequestCount() {
  State.requestCount++;
  saveRequestTracking();
  updateRequestCounter();
}

function updateRequestCounter() {
  const remaining = getRemainingRequests();
  const limit = getRequestLimit();
  const tier = getUserTier();

  DOM.tokenCounter.textContent = `${remaining} left today`;

  DOM.tokenCounter.className = 'token-counter';
  if (remaining <= 0) {
    DOM.tokenCounter.classList.add('danger');
  } else if (remaining <= 5) {
    DOM.tokenCounter.classList.add('warning');
  }

  // Update settings modal to show tier info
  updateTierDisplay();
}

function updateTierDisplay() {
  const tier = getUserTier();
  const remaining = getRemainingRequests();
  const limit = getRequestLimit();

  const tierInfoEl = document.getElementById('tierInfo');
  if (tierInfoEl) {
    tierInfoEl.innerHTML = `
      <div style="padding: 12px; background: var(--hover); border-radius: 8px; margin-bottom: 12px;">
        <div style="font-size: 12px; font-weight: 600; margin-bottom: 4px;">Current Plan: ${tier === 'FREE' ? 'Free Tier' : 'BYO API'}</div>
        <div style="font-size: 11px; opacity: 0.6;">${remaining} / ${limit} requests remaining today</div>
      </div>
    `;
  }
}

function showLimitReachedModal() {
  const tier = getUserTier();
  let message = '';
  let options = '';

  if (tier === 'FREE') {
    message = 'You have reached your daily limit of 20 free requests.';
    options = `
      <p style="font-size: 13px; margin-bottom: 12px;">Upgrade your experience:</p>
      <ul style="font-size: 12px; line-height: 1.8; padding-left: 16px; list-style: disc;">
        <li><strong>Add your OpenRouter API key</strong> for 50 requests/day</li>
        <li><strong>Add $10+ credit</strong> to your OpenRouter account for 1000 requests/day</li>
      </ul>
    `;
  } else if (tier === 'BYO') {
    message = 'You have reached your daily limit of 50 requests.';
    options = `
      <p style="font-size: 13px; margin-bottom: 12px;">Need more?</p>
      <ul style="font-size: 12px; line-height: 1.8; padding-left: 16px; list-style: disc;">
        <li>Add $10+ credit to your OpenRouter account for 1000 requests/day</li>
      </ul>
    `;
  } else {
    message = 'You have reached your daily limit of 1000 requests.';
  }

  // Create and show modal
  const modalHtml = `
    <div class="modal-overlay open" id="limitModal" style="z-index:800;">
      <div class="modal-box">
        <div class="modal-header">
          <h3>Daily Limit Reached</h3>
        </div>
        <div class="modal-body">
          <p style="font-size: 14px; margin-bottom: 16px;">${message}</p>
          ${options}
        </div>
        <div class="modal-footer">
          <button class="modal-btn" onclick="closeLimitModal()">Close</button>
          <button class="modal-btn primary" onclick="closeLimitModal(); document.getElementById('openSettingsBtn').click();">Settings</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

window.closeLimitModal = function() {
  const modal = document.getElementById('limitModal');
  if (modal) modal.remove();
};

/* --- Start --- */
document.addEventListener('DOMContentLoaded', init);