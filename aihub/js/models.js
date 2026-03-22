/* ============================================
   MODEL REGISTRY
   All free OpenRouter models with capability matrix
   ============================================ */

const MODEL_REGISTRY = [
  // --- Meta Llama ---
  {
    id: 'meta-llama/llama-3.3-8b-instruct:free',
    name: 'Llama 3.3 8B',
    provider: 'Meta',
    contextLength: 131072,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'Fast, capable 8B parameter model from Meta.'
  },
  {
    id: 'meta-llama/llama-4-maverick:free',
    name: 'Llama 4 Maverick',
    provider: 'Meta',
    contextLength: 1048576,
    caps: { text: true, image: true, pdfNative: false, pdfText: true, audio: false },
    desc: 'Multimodal Llama 4 with 1M context and vision.'
  },
  {
    id: 'meta-llama/llama-4-scout:free',
    name: 'Llama 4 Scout',
    provider: 'Meta',
    contextLength: 512000,
    caps: { text: true, image: true, pdfNative: false, pdfText: true, audio: false },
    desc: 'Efficient multimodal Llama 4 variant with vision.'
  },
  // --- Google ---
  {
    id: 'google/gemma-3-4b-it:free',
    name: 'Gemma 3 4B',
    provider: 'Google',
    contextLength: 131072,
    caps: { text: true, image: true, pdfNative: false, pdfText: true, audio: false },
    desc: 'Compact Google model with vision support.'
  },
  {
    id: 'google/gemma-3-12b-it:free',
    name: 'Gemma 3 12B',
    provider: 'Google',
    contextLength: 131072,
    caps: { text: true, image: true, pdfNative: false, pdfText: true, audio: false },
    desc: 'Mid-size Google Gemma with vision capabilities.'
  },
  {
    id: 'google/gemma-3-27b-it:free',
    name: 'Gemma 3 27B',
    provider: 'Google',
    contextLength: 131072,
    caps: { text: true, image: true, pdfNative: false, pdfText: true, audio: false },
    desc: 'Largest Gemma 3 with strong reasoning and vision.'
  },
  {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    contextLength: 1048576,
    caps: { text: true, image: true, pdfNative: true, pdfText: true, audio: true },
    desc: 'Google Gemini with native multimodal support.'
  },
  // --- Qwen ---
  {
    id: 'qwen/qwen3-235b-a22b:free',
    name: 'Qwen3 235B',
    provider: 'Qwen',
    contextLength: 131072,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'Massive 235B parameter model from Alibaba.'
  },
  {
    id: 'qwen/qwen3-32b:free',
    name: 'Qwen3 32B',
    provider: 'Qwen',
    contextLength: 131072,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'Strong 32B model for complex reasoning tasks.'
  },
  {
    id: 'qwen/qwen3-30b-a3b:free',
    name: 'Qwen3 30B-A3B',
    provider: 'Qwen',
    contextLength: 131072,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'Efficient mixture-of-experts Qwen3 variant.'
  },
  {
    id: 'qwen/qwen3-14b:free',
    name: 'Qwen3 14B',
    provider: 'Qwen',
    contextLength: 131072,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'Balanced Qwen3 for speed and quality.'
  },
  {
    id: 'qwen/qwen3-8b:free',
    name: 'Qwen3 8B',
    provider: 'Qwen',
    contextLength: 131072,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'Compact Qwen3 good for most tasks.'
  },
  {
    id: 'qwen/qwen-2.5-vl-72b-instruct:free',
    name: 'Qwen 2.5 VL 72B',
    provider: 'Qwen',
    contextLength: 131072,
    caps: { text: true, image: true, pdfNative: false, pdfText: true, audio: false },
    desc: 'Large vision-language model from Qwen.'
  },
  {
    id: 'qwen/qwen-2.5-vl-32b-instruct:free',
    name: 'Qwen 2.5 VL 32B',
    provider: 'Qwen',
    contextLength: 131072,
    caps: { text: true, image: true, pdfNative: false, pdfText: true, audio: false },
    desc: 'Mid-size vision-language Qwen model.'
  },
  // --- DeepSeek ---
  {
    id: 'deepseek/deepseek-r1-0528:free',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    contextLength: 163840,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'Strong reasoning model from DeepSeek.'
  },
  {
    id: 'deepseek/deepseek-chat-v3-0324:free',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    contextLength: 163840,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'Latest DeepSeek conversational model.'
  },
  // --- Microsoft ---
  {
    id: 'microsoft/phi-4-reasoning-plus:free',
    name: 'Phi-4 Reasoning+',
    provider: 'Microsoft',
    contextLength: 32768,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'Microsoft reasoning-enhanced compact model.'
  },
  {
    id: 'microsoft/mai-ds-r1:free',
    name: 'MAI DS-R1',
    provider: 'Microsoft',
    contextLength: 131072,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'Microsoft AI reasoning model.'
  },
  // --- Mistral ---
  {
    id: 'mistralai/devstral-small:free',
    name: 'Devstral Small',
    provider: 'Mistral',
    contextLength: 131072,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'Mistral developer-focused coding model.'
  },
  // --- NVIDIA ---
  {
    id: 'nvidia/llama-3.1-nemotron-ultra-253b-v1:free',
    name: 'Nemotron Ultra 253B',
    provider: 'NVIDIA',
    contextLength: 131072,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'NVIDIA massive parameter model for complex tasks.'
  },
  // --- Nous ---
  {
    id: 'nousresearch/deephermes-3-llama-3-8b-preview:free',
    name: 'DeepHermes 3 8B',
    provider: 'Nous',
    contextLength: 131072,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'Nous Research instruction-tuned model.'
  },
  // --- Moonshotai ---
  {
    id: 'moonshotai/kimi-vl-a3b-thinking:free',
    name: 'Kimi VL A3B',
    provider: 'Moonshot',
    contextLength: 131072,
    caps: { text: true, image: true, pdfNative: false, pdfText: true, audio: false },
    desc: 'Moonshot vision-language thinking model.'
  },
  // --- Open source ---
  {
    id: 'open-r1/olympiccoder-32b:free',
    name: 'OlympicCoder 32B',
    provider: 'Open-R1',
    contextLength: 131072,
    caps: { text: true, image: false, pdfNative: false, pdfText: true, audio: false },
    desc: 'Competition-grade coding model.'
  },
  {
    id: 'rekaai/reka-flash-3:free',
    name: 'Reka Flash 3',
    provider: 'Reka',
    contextLength: 131072,
    caps: { text: true, image: true, pdfNative: false, pdfText: true, audio: false },
    desc: 'Fast multimodal model from Reka AI.'
  },
  {
    id: 'bytedance-research/ui-tars-72b:free',
    name: 'UI-TARS 72B',
    provider: 'ByteDance',
    contextLength: 32768,
    caps: { text: true, image: true, pdfNative: false, pdfText: true, audio: false },
    desc: 'ByteDance UI understanding model with vision.'
  }
];

/**
 * Get model by ID
 */
function getModelById(modelId) {
  return MODEL_REGISTRY.find(m => m.id === modelId) || null;
}

/**
 * Format context length for display
 */
function formatContextLength(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

/**
 * Get capability badges HTML for a model
 */
function getCapBadgesHTML(model) {
  const badges = [];
  if (model.caps.text) badges.push('<span class="model-cap-badge">TXT</span>');
  if (model.caps.image) badges.push('<span class="model-cap-badge">IMG</span>');
  if (model.caps.pdfNative) badges.push('<span class="model-cap-badge">PDF</span>');
  if (model.caps.audio) badges.push('<span class="model-cap-badge">AUD</span>');
  return badges.join('');
}