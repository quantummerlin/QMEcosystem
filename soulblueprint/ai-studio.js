/**
 * Soul Blueprint — AI Studio
 *
 * Injected into every generated reading via fulfill.js.
 * Lets the recipient plug in their own AI API key and generate
 * 18 personalised text creations + 6 cosmic images, all client-side.
 *
 * Served from quantummerlin.com/soulblueprint/ai-studio.js
 * Update here → all existing readings automatically get the update on next load.
 *
 * Providers: OpenAI · Google Gemini · Anthropic Claude · OpenRouter · Qwen · Generic (Ollama, Groq, etc.)
 * Text-to-speech: OpenAI TTS · OpenRouter TTS
 * Security: keys stored only in localStorage, never sent anywhere except the AI provider.
 */
(function () {
    'use strict';

    var LS = 'sb-ai-';
    var OUTPUTS_KEY = 'sb-ai-outputs';

    // ─── DOM DATA EXTRACTION ───────────────────────────────────────────────────
    function extractReadingData() {
        var name = '';
        var nameEl = document.querySelector('.subject-name');
        if (nameEl) name = nameEl.textContent.trim();
        if (!name) {
            var h1 = document.querySelector('h1');
            if (h1) name = h1.textContent.replace(/soul blueprint/gi, '').trim();
        }
        if (!name) name = 'You';

        var birthInfo = '';
        var biEl = document.querySelector('.birth-info');
        if (biEl) birthInfo = biEl.textContent.trim();

        var sunSign    = '';
        var moonSign   = '';
        var risingSign = '';
        var sunEl  = document.getElementById('bigThreeSun');
        var moonEl = document.getElementById('bigThreeMoon');
        var riseEl = document.getElementById('bigThreeRising');
        if (sunEl)  sunSign    = sunEl.textContent.trim();
        if (moonEl) moonSign   = moonEl.textContent.trim();
        if (riseEl) risingSign = riseEl.textContent.trim();

        var theme = 'purple';
        if (document.body.classList.contains('theme-girl')) theme = 'girl';
        else if (document.body.classList.contains('theme-boy')) theme = 'boy';

        var themeColors = {
            girl:   { palette: 'soft pink, rose gold, blush, cream, dusty rose', mood: 'romantic, feminine, soft and warm' },
            boy:    { palette: 'sky blue, navy, gold, silver, cloud white', mood: 'calm, strong, clear and grounded' },
            purple: { palette: 'deep purple, violet, gold, midnight blue, lavender', mood: 'mystical, spiritual, cosmic and deep' }
        };
        var colors = themeColors[theme] || themeColors.purple;

        // Collect card texts for AI context (title + first 200 chars of body)
        var cardEls = document.querySelectorAll('.reading-card');
        var cardTexts = [];
        for (var i = 0; i < Math.min(cardEls.length, 30); i++) {
            var card = cardEls[i];
            var titleEl = card.querySelector('h3') || card.querySelector('h4') || card.querySelector('[class*="title"]');
            var bodyEl  = card.querySelector('p') || card.querySelector('[class*="content"]') || card.querySelector('[class*="body"]');
            var t = titleEl ? titleEl.textContent.trim() : '';
            var b = bodyEl  ? bodyEl.textContent.trim().slice(0, 200) : '';
            if (t || b) cardTexts.push(t ? t + ': ' + b : b);
        }

        return {
            name:          name,
            birthInfo:     birthInfo,
            sunSign:       sunSign    || 'their Sun sign',
            moonSign:      moonSign   || 'their Moon sign',
            risingSign:    risingSign || 'their Rising sign',
            theme:         theme,
            colors:        colors,
            contextSnippet: cardTexts.join('\n'),
            totalCards:    cardEls.length
        };
    }

    // ─── STORED CONFIG ─────────────────────────────────────────────────────────
    function getConfig() {
        try {
            return {
                provider: localStorage.getItem(LS + 'provider') || '',
                key:      localStorage.getItem(LS + 'key')      || '',
                endpoint: localStorage.getItem(LS + 'endpoint') || '',
                model:    localStorage.getItem(LS + 'model')    || '',
                caps:     JSON.parse(localStorage.getItem(LS + 'caps') || 'null')
            };
        } catch (e) { return { provider: '', key: '', endpoint: '', model: '', caps: null }; }
    }
    function saveConfig(cfg) {
        try {
            localStorage.setItem(LS + 'provider', cfg.provider || '');
            localStorage.setItem(LS + 'key',      cfg.key      || '');
            localStorage.setItem(LS + 'endpoint', cfg.endpoint || '');
            localStorage.setItem(LS + 'model',    cfg.model    || '');
            if (cfg.caps) localStorage.setItem(LS + 'caps', JSON.stringify(cfg.caps));
        } catch (e) {}
    }

    // ─── SAVED OUTPUTS ─────────────────────────────────────────────────────────
    function getSavedOutputs() {
        try { return JSON.parse(localStorage.getItem(OUTPUTS_KEY) || '{}'); }
        catch (e) { return {}; }
    }

    // ─── PROVIDER DEFAULTS ─────────────────────────────────────────────────────
    var DEFAULTS = {
        openai:    { text: 'gpt-4o',                          image: 'dall-e-3',                    base: 'https://api.openai.com' },
        gemini:    { text: 'gemini-1.5-flash',                image: 'imagen-3.0-generate-001',     base: 'https://generativelanguage.googleapis.com' },
        anthropic: { text: 'claude-3-5-sonnet-20241022',      image: null,                          base: 'https://api.anthropic.com' },
        generic:   { text: 'gpt-4o',                          image: null,                          base: '' }
    };

    // ─── CAPABILITY DETECTION ──────────────────────────────────────────────────
    async function detectCapabilities(provider, key, endpoint) {
        var caps = { text: false, images: false, tts: false, imageModels: [], textModel: '', error: '' };
        try {
            if (provider === 'openai') {
                var res = await fetch('https://api.openai.com/v1/models', {
                    headers: { 'Authorization': 'Bearer ' + key }
                });
                if (!res.ok) { caps.error = 'API key rejected (HTTP ' + res.status + ')'; return caps; }
                var data = await res.json();
                caps.text = true;
                caps.textModel = 'gpt-4o';
                caps.tts = true;
                var imageIds = ['dall-e-3', 'dall-e-2', 'gpt-image-1'];
                var found = (data.data || []).filter(function (m) { return imageIds.indexOf(m.id) !== -1; });
                if (found.length) { caps.images = true; caps.imageModels = found.map(function (m) { return m.id; }); }

            } else if (provider === 'gemini') {
                var res = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + key);
                if (!res.ok) { caps.error = 'API key rejected (HTTP ' + res.status + ')'; return caps; }
                var data = await res.json();
                caps.text = true;
                caps.textModel = 'gemini-1.5-flash';
                var imgModel = (data.models || []).find(function (m) { return (m.name || '').indexOf('imagen') !== -1; });
                if (imgModel) { caps.images = true; caps.imageModels = [imgModel.name.replace('models/', '')]; }

            } else if (provider === 'anthropic') {
                try {
                    var res = await fetch('https://api.anthropic.com/v1/models', {
                        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01' }
                    });
                    if (res.ok) {
                        caps.text = true;
                        caps.textModel = 'claude-3-5-sonnet-20241022';
                    } else {
                        caps.error = 'Key rejected (HTTP ' + res.status + '). Note: Claude may block direct browser requests — try OpenAI or Gemini if generation fails.';
                    }
                } catch (corsErr) {
                    caps.error = 'Anthropic blocks direct browser requests (CORS policy). Text generation will be attempted anyway, but may fail. OpenAI or Gemini are more reliable for browser use.';
                    caps.text = true;
                    caps.textModel = 'claude-3-5-sonnet-20241022';
                }

            } else if (provider === 'openrouter') {
                var res = await fetch('https://openrouter.ai/api/v1/models', {
                    headers: { 'Authorization': 'Bearer ' + key, 'HTTP-Referer': 'https://quantummerlin.com', 'X-Title': 'Soul Blueprint AI Studio' }
                });
                if (!res.ok) { caps.error = 'API key rejected (HTTP ' + res.status + ')'; return caps; }
                var data = await res.json();
                caps.text = true;
                caps.textModel = 'openai/gpt-4o';
                caps.tts = true; // OpenRouter proxies OpenAI TTS
                var imgIds = ['openai/dall-e-3', 'openai/dall-e-2', 'stability/stable-diffusion'];
                var found = (data.data || []).filter(function (m) { return imgIds.some(function (id) { return (m.id || '').indexOf('dall-e') !== -1 || (m.id || '').indexOf('stable-diffusion') !== -1; }); });
                if (found.length) { caps.images = true; caps.imageModels = [found[0].id]; }

            } else if (provider === 'qwen') {
                var res = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/models', {
                    headers: { 'Authorization': 'Bearer ' + key }
                });
                if (res.ok) {
                    var data = await res.json();
                    caps.text = true;
                    caps.textModel = 'qwen-max';
                    // Check for image-capable models
                    var imgModel = (data.data || []).find(function (m) { return (m.id || '').indexOf('wanx') !== -1 || (m.id || '').indexOf('flux') !== -1; });
                    if (imgModel) { caps.images = true; caps.imageModels = [imgModel.id]; }
                } else {
                    // DashScope may return 404 for /models — assume text works if key format looks valid
                    caps.text = true;
                    caps.textModel = 'qwen-max';
                    caps.error = 'Could not verify Qwen models list — text generation will be attempted. Ensure your DashScope API key is active.';
                }

            } else if (provider === 'generic') {
                var base = (endpoint || '').replace(/\/$/, '');
                try {
                    var res = await fetch(base + '/v1/models', {
                        headers: { 'Authorization': 'Bearer ' + (key || 'none') }
                    });
                    if (res.ok) {
                        var data = await res.json();
                        caps.text = true;
                        caps.textModel = (data.data && data.data[0]) ? data.data[0].id : 'gpt-4o';
                        // Detect TTS support (Ollama, LM Studio etc. don't have it — OpenAI-compat services may)
                        var hasTts = (data.data || []).some(function (m) { return (m.id || '').indexOf('tts') !== -1; });
                        if (hasTts) caps.tts = true;
                    } else {
                        caps.text = true; caps.textModel = 'gpt-4o';
                        caps.error = 'Could not verify models — text generation will still be attempted.';
                    }
                } catch (e) {
                    caps.text = true; caps.textModel = 'gpt-4o';
                    caps.error = 'Models endpoint unreachable — text generation will still be attempted.';
                }
            }
        } catch (e) { caps.error = 'Connection error: ' + e.message; }
        return caps;
    }

    // ─── TEXT GENERATION ──────────────────────────────────────────────────────
    async function generateText(systemPrompt, userPrompt, cfg) {
        var provider = cfg.provider;
        var key = cfg.key;
        var caps = cfg.caps || {};
        var model = cfg.model || caps.textModel || (DEFAULTS[provider] || {}).text || 'gpt-4o';
        var base = ((provider === 'generic' ? cfg.endpoint : '') || (DEFAULTS[provider] || {}).base || '').replace(/\/$/, '');

        // OpenAI-compatible providers (OpenAI, OpenRouter, Qwen/DashScope, Generic)
        if (provider === 'openai' || provider === 'generic' || provider === 'openrouter' || provider === 'qwen') {
            var headers = { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' };
            // OpenRouter requires referrer headers
            if (provider === 'openrouter') {
                headers['HTTP-Referer'] = 'https://quantummerlin.com';
                headers['X-Title'] = 'Soul Blueprint AI Studio';
            }
            var res = await fetch(base + '/v1/chat/completions', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    model: model,
                    messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
                    max_tokens: 2500,
                    temperature: 0.8
                })
            });
            if (!res.ok) {
                var e = await res.json().catch(function () { return {}; });
                throw new Error((e.error && e.error.message) || 'API error HTTP ' + res.status);
            }
            var d = await res.json();
            return d.choices[0].message.content;

        } else if (provider === 'gemini') {
            var m = model || 'gemini-1.5-flash';
            var res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + m + ':generateContent?key=' + key, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: systemPrompt + '\n\n' + userPrompt }] }],
                    generationConfig: { maxOutputTokens: 2500, temperature: 0.8 }
                })
            });
            if (!res.ok) {
                var e = await res.json().catch(function () { return {}; });
                throw new Error((e.error && e.error.message) || 'API error HTTP ' + res.status);
            }
            var d = await res.json();
            return d.candidates[0].content.parts[0].text;

        } else if (provider === 'anthropic') {
            var res = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
                body: JSON.stringify({
                    model: model || 'claude-3-5-sonnet-20241022',
                    max_tokens: 2500,
                    system: systemPrompt,
                    messages: [{ role: 'user', content: userPrompt }]
                })
            });
            if (!res.ok) {
                var e = await res.json().catch(function () { return {}; });
                var msg = (e.error && e.error.message) || 'API error HTTP ' + res.status;
                if (res.status === 0 || msg.indexOf('CORS') !== -1) {
                    throw new Error('Anthropic blocks browser requests. Please use OpenAI or Gemini instead.');
                }
                throw new Error(msg);
            }
            var d = await res.json();
            return d.content[0].text;
        }
        throw new Error('Unknown provider: ' + provider);
    }

    // ─── IMAGE GENERATION ─────────────────────────────────────────────────────
    async function generateImage(prompt, cfg) {
        var provider = cfg.provider;
        var key = cfg.key;
        var caps = cfg.caps || {};

        if (provider === 'openai') {
            var imgModel = (caps.imageModels && caps.imageModels[0]) || 'dall-e-3';
            var res = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: imgModel, prompt: prompt, n: 1, size: '1024x1024', response_format: 'b64_json' })
            });
            if (!res.ok) {
                var e = await res.json().catch(function () { return {}; });
                throw new Error((e.error && e.error.message) || 'Image API error HTTP ' + res.status);
            }
            var d = await res.json();
            return { b64: d.data[0].b64_json, model: imgModel };

        } else if (provider === 'openrouter') {
            // OpenRouter proxies DALL-E via OpenAI-compatible endpoint
            var imgModel = (caps.imageModels && caps.imageModels[0]) || 'openai/dall-e-3';
            var res = await fetch('https://openrouter.ai/api/v1/images/generations', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json', 'HTTP-Referer': 'https://quantummerlin.com', 'X-Title': 'Soul Blueprint AI Studio' },
                body: JSON.stringify({ model: imgModel, prompt: prompt, n: 1, size: '1024x1024', response_format: 'b64_json' })
            });
            if (!res.ok) {
                var e = await res.json().catch(function () { return {}; });
                throw new Error((e.error && e.error.message) || 'Image API error HTTP ' + res.status);
            }
            var d = await res.json();
            return { b64: d.data[0].b64_json, model: imgModel };

        } else if (provider === 'qwen') {
            // Qwen image generation via DashScope compatible mode
            var imgModel = (caps.imageModels && caps.imageModels[0]) || 'wanx-v1-t2i-v2';
            var res = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/images/generations', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: imgModel, prompt: prompt, n: 1, size: '1024x1024', response_format: 'b64_json' })
            });
            if (!res.ok) {
                var e = await res.json().catch(function () { return {}; });
                throw new Error((e.error && e.error.message) || 'Qwen image API error HTTP ' + res.status);
            }
            var d = await res.json();
            return { b64: d.data[0].b64_json, model: imgModel };

        } else if (provider === 'gemini') {
            var imgModel = (caps.imageModels && caps.imageModels[0]) || 'imagen-3.0-generate-001';
            var res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + imgModel + ':predict?key=' + key, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ instances: [{ prompt: prompt }], parameters: { sampleCount: 1 } })
            });
            if (!res.ok) {
                var e = await res.json().catch(function () { return {}; });
                throw new Error((e.error && e.error.message) || 'Image API error HTTP ' + res.status);
            }
            var d = await res.json();
            return { b64: d.predictions[0].bytesBase64Encoded, model: imgModel };
        }
        throw new Error('Image generation is not supported by this provider or key.');
    }

    // ─── TEXT-TO-SPEECH ──────────────────────────────────────────────────────
    // Returns a blob URL (session only — not persisted to localStorage)
    var _ttsUrls = {}; // in-memory store for blob URLs this session

    async function generateSpeech(text, voice, cfg) {
        var provider = cfg.provider;
        var key = cfg.key;
        if (provider !== 'openai' && provider !== 'openrouter' && provider !== 'generic') {
            throw new Error('Text-to-speech is available with OpenAI and OpenRouter keys. Gemini, Claude, and Qwen do not currently support browser-based TTS.');
        }
        var base = ((provider === 'generic' ? cfg.endpoint : '') || (DEFAULTS[provider] || {}).base || '').replace(/\/$/, '');
        var headers = { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' };
        if (provider === 'openrouter') {
            headers['HTTP-Referer'] = 'https://quantummerlin.com';
            headers['X-Title'] = 'Soul Blueprint AI Studio';
        }
        // TTS has a 4096 char input limit — truncate cleanly at a sentence boundary
        var input = text.length > 4000 ? text.slice(0, 4000).replace(/[^.!?]*$/, '').trim() || text.slice(0, 4000) : text;
        var ttsModel = provider === 'openrouter' ? 'openai/tts-1' : 'tts-1';
        var res = await fetch(base + '/v1/audio/speech', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ model: ttsModel, input: input, voice: voice || 'nova', response_format: 'mp3' })
        });
        if (!res.ok) {
            var e = await res.json().catch(function () { return {}; });
            throw new Error((e.error && e.error.message) || 'TTS API error HTTP ' + res.status);
        }
        var blob = await res.blob();
        var url = URL.createObjectURL(blob);
        return url;
    }

    var TTS_VOICES = [
        { id: 'nova',    label: 'Nova — warm, natural' },
        { id: 'alloy',   label: 'Alloy — clear, balanced' },
        { id: 'echo',    label: 'Echo — smooth, male' },
        { id: 'fable',   label: 'Fable — expressive' },
        { id: 'onyx',    label: 'Onyx — deep, authoritative' },
        { id: 'shimmer', label: 'Shimmer — soft, breathy' }
    ];

    // ─── TEXT PROMPT TEMPLATES ─────────────────────────────────────────────────
    function getTextPrompts(id, d) {
        var name  = d.name;
        var sun   = d.sunSign;
        var moon  = d.moonSign;
        var rise  = d.risingSign;
        var birth = d.birthInfo || '';
        var ctx   = d.contextSnippet
            ? 'Here are excerpts from their Soul Blueprint reading:\n\n' + d.contextSnippet + '\n\n'
            : '';

        var base = 'You are a warm, insightful astrologer and life coach. The person you are helping is ' +
            name + (birth ? ' (' + birth + ')' : '') + '. ' +
            'Sun: ' + sun + ', Moon: ' + moon + ', Rising: ' + rise + '.\n' + ctx +
            'Be specific to them using their actual signs — not generic astrology content.';

        var ttsPrompts = {
            'tts-affirmations': {
                system: base,
                user: 'Write 30 daily affirmations for ' + name + ' to listen to each morning. Write them as natural spoken sentences — warm, direct, personal. Each affirmation should name their actual Sun or Moon sign and feel true, not hollow. Number them. Keep each under 25 words. Spoken tone throughout — no bullet headers, no categories, just 30 flowing numbered affirmations.'
            },
            'tts-meditation': {
                system: base,
                user: 'Write a 10-minute guided morning meditation for ' + name + ' to record or listen to. Write as a narrated, spoken script. Slow, warm, meditative pacing. Include: opening breath (30 sec), body scan with elemental imagery for ' + sun + ' energy (2 min), a visualisation unique to their ' + sun + '/' + moon + ' combination (3 min), a release passage (2 min), a spoken intention for the day (1 min), a gratitude close (1 min). Write naturally as if speaking directly to them. Avoid any heading labels in the output — just the full flowing script.'
            },
            'tts-mantra': {
                system: base,
                user: 'Write a personalised morning mantra for ' + name + ' to speak aloud daily. It should be 5–8 sentences long — short enough to memorise. Reference their Sun sign ' + sun + ' and their life purpose. Make it feel like a genuine declaration of who they are, not a generic affirmation. Speak directly to ' + name + ' in second person. End with a single powerful closing line they will remember all day.'
            },
            'tts-intro': {
                system: base,
                user: 'Write a 2-minute spoken cosmic introduction for ' + name + ' — as if narrating the opening of a documentary about their life. Begin with the exact moment of their birth (' + birth + ') and the cosmic conditions. Describe their fundamental nature through ' + sun + ' Sun, ' + moon + ' Moon, ' + rise + ' Rising. Name their unique gifts, their quiet depths, and the thread that runs through everything they do. Warm, poetic, and deeply personal. Write as a continuous spoken narrative — no headers or labels.'
            },
            'tts-shadow': {
                system: base,
                user: 'Write 10 deep shadow work prompts for ' + name + ' based on their ' + sun + ' Sun, ' + moon + ' Moon profile. These will be listened to, not read — so write them as warm spoken questions with a brief (1-sentence) context before each. Each prompt should require genuine honesty about a pattern, fear, or wound. Number them. Pause naturally between each. The tone is a trusted therapist asking a caring question.'
            },
            'tts-career': {
                system: base,
                user: 'Write a 3-minute spoken career narrative for ' + name + ' — as if a wise mentor is describing the professional life this person was made for. Through their ' + sun + ' Sun, ' + moon + ' Moon, and rising ' + rise + ': the environments where they thrive, the roles aligned with their nature, the work that would feel like home. Then their one career shadow — the pattern to watch. Spoken/narrative format. No bullet lists, no headers. Conversational and warm.'
            }
        };
        if (ttsPrompts[id]) return ttsPrompts[id];

        var map = {
            'deep-personality': {
                system: base,
                user: 'Write a deep personality analysis for ' + name + '. Cover: (1) How they present to the world vs who they are inside — the gap between their outer mask and inner self, (2) Their 5 greatest natural strengths with specific examples of how each shows up in their daily life, (3) Their 3 blind spots they are probably unaware of, (4) What makes them genuinely unique and irreplaceable. Be warm, honest, and around 600 words. Use subheadings.'
            },
            'strengths-blindspots': {
                system: base,
                user: 'Create a Strengths & Blind Spots report for ' + name + '.\n\nSTRENGTHS: List 8 natural strengths. For each: name it, describe it in 1-2 sentences, and give one real-world example of how it shows up.\n\nBLIND SPOTS: List 4 blind spots. For each: name it, explain compassionately why it exists in their cosmic profile, and give one practical way to work with it.\n\nFormat clearly with bold headings. Be specific to their signs.'
            },
            'shadow-work': {
                system: base,
                user: 'Create a Shadow Work package for ' + name + '.\n\n1. SHADOW PROFILE (200 words): What shadow patterns are likely for a ' + sun + ' Sun, ' + moon + ' Moon? What do they suppress, avoid, or project onto others?\n\n2. CORE WOUND: What is their likely deepest wound based on this combination? Be specific, not generic.\n\n3. TRIGGER MAP: 3 things most likely to trigger them and why.\n\n4. JOURNAL PROMPTS: Write 10 deep reflective prompts specific to their signs. Each should require real honesty — not surface-level. Number them 1–10.'
            },
            'communication-style': {
                system: base,
                user: 'Write a Communication Style Guide for ' + name + '.\n\nCover: (1) How they naturally speak and express themselves, (2) Their communication superpowers — what they do brilliantly, (3) Where they go quiet or struggle — what shuts them down, (4) How they behave in conflict, (5) Tips for professional communication, (6) Tips for romantic communication, (7) What someone needs to know to really reach ' + name + ' — how to speak TO them effectively. Be practical and specific.'
            },
            'relationship-blueprint': {
                system: base,
                user: 'Write a complete Relationship Blueprint for ' + name + '.\n\nCover: (1) How they love — what their love style actually looks like in practice day to day, (2) What they need to feel truly loved — their non-negotiable emotional needs, (3) Where they repeatedly struggle in relationships, (4) The recurring pattern that shows up in their connections, (5) What a soul-aligned relationship looks like for them at their best, (6) Green flags they should look for in partners, (7) Red flags that are particularly toxic FOR THIS profile. Be honest. Around 600 words.'
            },
            'love-language': {
                system: base,
                user: 'Analyse the Love Languages of ' + name + ' through their cosmic profile.\n\nFor each of the 5 Love Languages (Words of Affirmation, Acts of Service, Receiving Gifts, Quality Time, Physical Touch): rate how important it is for ' + name + ' from 1–10 with a 2-sentence explanation of why.\n\nThen write:\n- How ' + name + ' naturally GIVES love\n- How ' + name + ' most wants to RECEIVE love\n- What happens emotionally when their love language is consistently ignored\n- How their love language profile might clash with common partner profiles'
            },
            'compatibility': {
                system: base,
                user: 'Write a Compatibility Insights guide for ' + name + '.\n\nSection 1 — Natural Harmonies: 4–5 Sun signs they naturally flow with. For each, explain specifically WHY this pairing works for their combination.\n\nSection 2 — Growth Through Tension: 2–3 signs that challenge them in ways that lead to real growth. Explain the tension honestly.\n\nSection 3 — What They Bring: What does ' + name + ' consistently bring to any partnership?\n\nSection 4 — What They Unconsciously Seek: What do they look for in a partner, even if they wouldn\'t say it out loud?\n\nSection 5 — Non-Negotiables: 3–4 things this cosmic profile MUST have in a relationship to thrive.'
            },
            'career-report': {
                system: base,
                user: 'Write a Career Alignment Report for ' + name + '.\n\n(1) NATURAL GIFTS IN WORK: Their top 4–5 professional strengths and how they show up at work.\n(2) ALIGNED CAREERS: 6–7 specific roles, industries, or types of work that suit this profile. Be specific — not just "creative fields".\n(3) IDEAL ENVIRONMENT: Describe the physical, cultural, and relational work environment where they\'d thrive.\n(4) WHAT DRAINS THEM: Specific environments, management styles, or tasks that are particularly toxic for this profile.\n(5) AUTHORITY & COLLEAGUES: How they relate to bosses, peers, and those they lead.\n(6) CAREER SABOTAGE: The one or two things most likely to derail their career, based on their shadow.\n(7) SUCCESS REDEFINED: What does genuine career fulfilment look like for THIS person — it may not match conventional markers.'
            },
            'growth-plan': {
                system: base,
                user: 'Create a personalised 30-Day Growth Plan for ' + name + ' based on their Soul Blueprint.\n\nWEEK 1 — FOUNDATION (Days 1–7): Daily micro-practices to reconnect with their core energy. Give 3 specific practices tailored to ' + sun + ' Sun + ' + moon + ' Moon.\n\nWEEK 2 — CLARITY (Days 8–14): Exercises to identify and interrupt recurring patterns. 3 practices.\n\nWEEK 3 — ACTION (Days 15–21): Aligned external steps. Pick one life area (career/relationships/creativity) that suits this profile and give 3 specific actions.\n\nWEEK 4 — INTEGRATION (Days 22–30): Rituals to cement what was learned. 3 practices.\n\nFor every practice, explain in one sentence WHY it is specifically suited to this cosmic profile. No generic content.'
            },
            'daily-routine': {
                system: base,
                user: 'Design a Blueprint-Aligned Daily Routine for ' + name + '.\n\nFor each time block, give specific activities AND explain why they suit this cosmic profile:\n\n⭐ MORNING RITUAL (wake – 9am): How to start the day aligned with their energy\n⭐ DEEP WORK WINDOW: When and how they focus best\n⭐ MIDDAY RESET: How they recharge mid-day (critical for their Moon sign)\n⭐ AFTERNOON: Creative or social energy — what to schedule here\n⭐ EVENING WIND-DOWN: Transition ritual suited to their emotional nature\n⭐ NIGHT: How to close the day for their particular Moon energy\n\nAlso include: (1) one morning practice unique to their element, (2) one thing to avoid in their schedule, (3) ideal day length for peak performance.'
            },
            'manifestation': {
                system: base,
                user: 'Design a Personalised Manifestation Strategy for ' + name + '.\n\n(1) HOW THEY MANIFEST: Explain their natural manifestation style — are they better at receiving, creating, moving, or holding energy?\n(2) MOST EFFECTIVE TECHNIQUES: 4 specific manifestation methods best suited to their cosmic profile. Explain why each works for them.\n(3) MANIFESTATION BLOCKS: What specific beliefs, patterns or energies in their chart work against their intentions?\n(4) TIMING: What lunar phases, numerological cycles, or seasonal energies favour major manifestations for this profile?\n(5) THE RITUAL: Write a step-by-step 7-step personalised manifestation ritual for ' + name + '.\n(6) STOP DOING: 2 things they are probably doing that are actively blocking their manifestation.'
            },
            'affirmations': {
                system: base,
                user: 'Write 30 deeply personalised daily affirmations for ' + name + '.\n\nRules:\n— Every affirmation must contain their actual Sun, Moon, or Rising sign — not just implied\n— They must feel true and achievable, not hollow or performative\n— Cover themes across: identity, power, love, career, healing, purpose, emotions\n— Vary the structure — not every one starts with "I am"\n— Number all 30\n\nExample of a BAD (generic) affirmation: "I am worthy of love."\nExample of a GOOD (specific) affirmation: "My ' + sun + ' heart was made to love with full presence — and the right person will recognise that."\n\nWrite all 30 now.'
            },
            'meditation': {
                system: base,
                user: 'Write a personalised 10-minute Morning Meditation Script for ' + name + '.\n\nFormat as a narrated script they read or record for themselves. Include:\n\n— OPENING (1 min): Breath pattern specifically suited to their element (' + sun + ')\n— BODY SCAN (2 min): Grounding into the body, linked to their elemental nature\n— VISUALISATION (3 min): A specific inner landscape or journey tied to their Sun and Moon combination\n— RELEASE (2 min): Letting go of the specific fears and shadows of their profile\n— INTENTION (1 min): A statement of purpose for the day as ' + name + '\n— CLOSING (1 min): Gratitude specific to their gifts\n\nWrite it as if narrating directly to ' + name + '. Personal, cosmic, and grounded.'
            },
            'parenting': {
                system: base,
                user: 'Write a Parenting Insights report based on the cosmic profile of ' + name + ' as the child.\n\n(1) THIS CHILD\'S WORLD: How they experience and process the world — what feels natural vs overwhelming\n(2) LEARNING STYLE: How they learn best, what teaching methods suit them, what blocks their learning\n(3) EMOTIONAL NEEDS: What they need to feel safe, seen, and loved. What emotional environment they require\n(4) TRIGGERS & TANTRUMS: What specifically overwhelms or upsets them and the cosmic WHY\n(5) DISCIPLINE APPROACH: What works and what will backfire — be specific\n(6) HIDDEN GIFTS: The less obvious gifts parents need to actively nurture\n(7) 5 PRACTICAL RECOMMENDATIONS: Specific, actionable parenting guidance for this profile\n\nTone: warm, supportive, written as a gift for a loving parent.'
            },
            'instagram-carousel': {
                system: base,
                user: 'Write a 5-slide Instagram Carousel that ' + name + ' would personally share about their Soul Blueprint experience.\n\nSLIDE 1 — HOOK: One bold, specific statement about their astrological identity. Make it stop-the-scroll.\nSLIDE 2 — STRENGTHS: Their 3 biggest cosmic strengths in short punchy bullets\nSLIDE 3 — SHADOW: One honest thing from their shadow side — relatable and vulnerable\nSLIDE 4 — AHA MOMENT: A specific insight from their reading that shifted how they see themselves\nSLIDE 5 — CTA: A reflection question to spark comments from the audience\n\nFormat each slide clearly. Keep under 80 words per slide. Make it feel authentic to a real person, not a generic astrology account.'
            },
            'social-captions': {
                system: base,
                user: 'Write 30 social media captions for ' + name + ' based on their Soul Blueprint.\n\nSTYLE MIX:\n— 10 Short & Punchy (under 30 words): Bold identity statements, cosmic one-liners\n— 10 Medium Storytelling (50–80 words): Personal reflections from specific parts of their reading\n— 10 Conversation Starters (question-based, under 40 words): Questions that invite followers to share their own experiences\n\nAll captions should feel authentic to a ' + sun + ' Sun person sharing their cosmic journey, not a generic astrology account. Add 3–5 relevant hashtags to each. Number all 30.'
            },
            'tiktok-script': {
                system: base,
                user: 'Write a 60-second TikTok script for ' + name + ' sharing something from their Soul Blueprint.\n\nHOOK (0–3 sec): One sentence that stops the scroll — a specific truth about their ' + sun + ' / ' + moon + ' combination that feels shocking or deeply validating.\n\nCONTENT (4–50 sec): A personal insight from their reading told conversationally. 3–4 clear "points" that keep the viewer watching. Include [TEXT OVERLAY: ...] instructions where relevant.\n\nCALL TO ACTION (51–60 sec): A specific question to drive comments. Something that makes viewers feel seen.\n\nWrite as natural speech. Include [TEXT OVERLAY] notes. Keep it authentic, not scripted-sounding.'
            },
            'podcast-intro': {
                system: base,
                user: 'Write a Podcast Episode package for ' + name + ' sharing their Soul Blueprint experience.\n\n(1) EPISODE TITLE: Something specific and compelling — not generic astrology clickbait\n(2) HOOK (30 sec): An opening statement that makes a listener stop and lean in\n(3) INTRO SCRIPT (2 min read): ' + name + ' introduces what they discovered in their reading, one thing that confirmed what they already knew, and one thing that genuinely surprised them\n(4) 4 CHAPTER TITLES: Natural breakpoints for a 45-minute episode exploring the reading\n(5) CLOSING QUESTION: The one question to leave the audience sitting with\n\nTone: personal, curious, cosmic but highly accessible to people who know nothing about astrology.'
            }
        };

        return map[id] || null;
    }

    // ─── IMAGE PROMPT TEMPLATES ───────────────────────────────────────────────
    function getImagePrompt(id, d) {
        var sun  = d.sunSign  || 'Scorpio';
        var moon = d.moonSign || 'Pisces';
        var pal  = d.colors.palette;
        var mood = d.colors.mood;

        var prompts = {
            'cosmic-portrait':
                'A mystical, dreamlike cosmic portrait. An abstract silhouette of a human figure composed entirely of constellation lines, star clusters, and nebula light — no facial features. ' +
                sun + ' sun energy expressed as warm golden light, ' + moon + ' moon energy as a soft silver aura. Deep space background with Milky Way texture. ' +
                'Colour palette: ' + pal + '. Mood: ' + mood + '. Style: digital fine art, ultra-detailed, ethereal. No text. Cinematic lighting.',

            'mood-board':
                'A beautiful editorial mood board collage for a ' + sun + ' soul. A flat-lay arrangement of: symbolic natural objects (flowers, crystals, leaves), colour swatches in this palette — ' + pal + ', textured fabrics, a single burning candle, a small open book, dried botanicals, and a piece of celestial map. Everything carefully arranged on a neutral surface. Studio photography quality, overhead shot, negative space. No text. No faces.',

            'soul-element':
                'A powerful, meditative fine art piece representing the dominant element of a ' + sun + '. The element (fire, earth, air, or water — choose the one that matches ' + sun + ') shown as a living, breathing force at the centre. Surrounded by sacred geometry, constellation lines, and ' + sun + ' zodiac symbolism. Moody and expansive. Palette: ' + pal + '. Style: mystical fine art print, suitable for framing. No text. Ultra-detailed.',

            'quote-card':
                'A stunning luxury quote card design for a ' + sun + ' person. Dark background with subtle cosmic texture. Central golden serif typography placeholder (placeholder lines, not real words). Elegant constellation border. The ' + sun + ' zodiac symbol rendered in gold foil in one corner. Atmospheric star field behind the glass-like central panel. Gold foil texture effects. Square 1:1 format. Luxury stationery design aesthetic. No actual readable text.',

            'vision-board':
                'A dreamy editorial vision board collage representing the highest, most aligned life of a ' + sun + ' sun, ' + moon + ' moon person. Include symbolic images of: a peaceful creative workspace, meaningful connection, natural beauty, personal freedom, quiet strength, and spiritual depth. Colours throughout: ' + pal + '. Style: soft-focus magazine editorial, inspirational, painterly yet photographic. No text labels. No faces. Seamless collage of moods, textures and symbols.',

            'zodiac-art':
                'A stunning original fine art interpretation of the ' + sun + ' zodiac. Not a literal generic symbol — reimagined as a living, mythological scene. Intricate sacred geometry, constellation mapping, and elemental energy woven into the composition. Scale: epic, like a cathedral ceiling painting reduced to a square canvas. Palette: ' + pal + '. Dark background with luminous gold and ' + pal.split(',')[0].trim() + ' light. No text. No borders. Ultra-detailed. Wall-art quality.'
        };

        return prompts[id] || '';
    }

    // ─── CREATION DEFINITIONS ─────────────────────────────────────────────────
    var TEXT_CREATIONS = [
        { id: 'deep-personality',      cat: 'Know Yourself',        icon: '🔍', title: 'Deep Personality Analysis',      desc: 'How you present vs who you really are, blind spots & untapped strengths' },
        { id: 'strengths-blindspots',  cat: 'Know Yourself',        icon: '⚡', title: 'Strengths & Blind Spots',         desc: '8 natural strengths and 4 blind spots explained through your cosmic profile' },
        { id: 'shadow-work',           cat: 'Know Yourself',        icon: '🌑', title: 'Shadow Work + Journal Prompts',   desc: 'Shadow profile, core wound, trigger map and 10 deep journal prompts' },
        { id: 'communication-style',   cat: 'Know Yourself',        icon: '💬', title: 'Communication Style Guide',       desc: 'How you speak, listen, conflict and connect — at work and in love' },
        { id: 'relationship-blueprint',cat: 'Love & Relationships', icon: '💞', title: 'Relationship Blueprint',          desc: 'How you love, what you need, and the patterns that keep showing up' },
        { id: 'love-language',         cat: 'Love & Relationships', icon: '❤️', title: 'Love Language Analysis',          desc: 'How you give and receive love through your specific cosmic lens' },
        { id: 'compatibility',         cat: 'Love & Relationships', icon: '✨', title: 'Compatibility Insights',          desc: 'Signs that harmonise with you, challenge you, and what you seek in a partner' },
        { id: 'career-report',         cat: 'Life & Career',        icon: '🌿', title: 'Career Alignment Report',         desc: 'The roles, environments and paths aligned with your cosmic gifts' },
        { id: 'growth-plan',           cat: 'Life & Career',        icon: '📈', title: '30-Day Growth Plan',              desc: 'Week-by-week personalised practices and aligned actions' },
        { id: 'daily-routine',         cat: 'Life & Career',        icon: '🌅', title: 'Blueprint-Aligned Daily Routine', desc: 'Morning to night — designed for your energy type, not a generic template' },
        { id: 'manifestation',         cat: 'Life & Career',        icon: '🌠', title: 'Manifestation Strategy',          desc: 'How your profile manifests, what blocks you and your personalised ritual' },
        { id: 'affirmations',          cat: 'Wellness & Spirit',    icon: '🌟', title: '30 Daily Affirmations',           desc: 'Every affirmation contains your actual signs — nothing generic' },
        { id: 'meditation',            cat: 'Wellness & Spirit',    icon: '🧘', title: 'Morning Meditation Script',       desc: 'A guided 10-minute spoken meditation aligned with your cosmic energy' },
        { id: 'parenting',             cat: 'Wellness & Spirit',    icon: '🌸', title: 'Parenting Insights',              desc: 'How this child learns, what they need, 5 specific parenting recommendations' },
        { id: 'instagram-carousel',    cat: 'Content & Creative',   icon: '📱', title: 'Instagram Carousel',              desc: '5-slide personal post about your cosmic profile — ready to share' },
        { id: 'social-captions',       cat: 'Content & Creative',   icon: '✍️', title: '30 Social Media Captions',        desc: 'Short, storytelling and conversation-starter captions from your reading' },
        { id: 'tiktok-script',         cat: 'Content & Creative',   icon: '🎬', title: 'TikTok Script',                   desc: '60-second video script with hook, overlays and call to action' },
        { id: 'podcast-intro',         cat: 'Content & Creative',   icon: '🎙️', title: 'Podcast Episode Intro',           desc: 'Title, 2-min intro script, chapter titles and closing question' }
    ];

    var IMAGE_CREATIONS = [
        { id: 'cosmic-portrait', icon: '🌌', title: 'Cosmic Portrait',      desc: 'Abstract figure made of your constellation and nebula energy' },
        { id: 'mood-board',      icon: '🎨', title: 'Mood Board Collage',   desc: 'Objects, textures and colours that resonate with your soul' },
        { id: 'soul-element',    icon: '🔥', title: 'Soul Element Visual',  desc: 'Your dominant element expressed as sacred, living art' },
        { id: 'quote-card',      icon: '📜', title: 'Quote Card Design',    desc: 'A luxury typographic card layout with your zodiac symbol' },
        { id: 'vision-board',    icon: '🌈', title: 'Vision Board',         desc: 'Symbolic collage of your highest life through your cosmic lens' },
        { id: 'zodiac-art',      icon: '⭐', title: 'Zodiac Symbol Art',    desc: 'Fine art interpretation of your Sun sign — wall-art quality' }
    ];

    var TTS_CREATIONS = [
        { id: 'tts-affirmations', icon: '🔊', title: 'Affirmations Audio',    desc: '30 personalised affirmations read aloud — listen daily or save as MP3' },
        { id: 'tts-meditation',   icon: '🎧', title: 'Meditation Audio',       desc: 'Your personalised 10-minute morning meditation, spoken aloud' },
        { id: 'tts-mantra',       icon: '🌀', title: 'Daily Mantra',           desc: 'A short, powerful personal mantra to repeat each morning' },
        { id: 'tts-intro',        icon: '🌟', title: 'Cosmic Introduction',    desc: 'A spoken portrait of who you are — beautiful to listen to or share' },
        { id: 'tts-shadow',       icon: '🌑', title: 'Shadow Work Prompts',    desc: 'Ten deep journal prompts read aloud, for reflection and healing' },
        { id: 'tts-career',       icon: '🎙️', title: 'Career Narrative',       desc: 'Your career alignment report read to you — great for commutes' }
    ];

    // ─── STATE ────────────────────────────────────────────────────────────────
    var state = {
        open:           false,
        view:           'home',   // home | config | grid | generating | output
        activeCategory: 'Know Yourself',
        activeItem:     null,
        output:         null,
        outputType:     'text',   // text | image | audio
        ttsVoice:       'nova',
        readingData:    null
    };

    // ─── STYLE INJECTION ──────────────────────────────────────────────────────
    function injectStyles() {
        if (document.getElementById('sbai-styles')) return;
        var s = document.createElement('style');
        s.id = 'sbai-styles';
        s.textContent = [
            /* Floating trigger button */
            '#sbai-btn{position:fixed;bottom:24px;right:24px;z-index:8900;background:linear-gradient(135deg,var(--primary,#9b59b6),var(--accent,#8e44ad));color:#fff;border:none;border-radius:50px;padding:12px 20px;font-family:var(--font-body,"Nunito",sans-serif);font-size:.9rem;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,.25);transition:transform .2s,box-shadow .2s;display:flex;align-items:center;gap:8px;white-space:nowrap}',
            '#sbai-btn:hover{transform:translateY(-2px);box-shadow:0 6px 28px rgba(0,0,0,.3)}',
            /* Overlay */
            '#sbai-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:9000;display:none;align-items:flex-end;justify-content:center;font-family:var(--font-body,"Nunito",sans-serif)}',
            '#sbai-overlay.sbai-open{display:flex}',
            /* Panel */
            '#sbai-panel{background:var(--card-bg,#fff);width:100%;max-width:680px;max-height:92vh;border-radius:24px 24px 0 0;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 -8px 60px rgba(0,0,0,.2);animation:sbai-up .3s ease-out}',
            '@keyframes sbai-up{from{transform:translateY(100%)}to{transform:translateY(0)}}',
            /* Header */
            '.sbai-hdr{display:flex;align-items:center;gap:12px;padding:20px 24px 16px;border-bottom:1px solid var(--card-border,#eee);flex-shrink:0}',
            '.sbai-hdr-title{font-family:var(--font-heading,"Playfair Display",serif);font-size:1.2rem;color:var(--text,#333);margin:0;flex:1}',
            '.sbai-hdr-sub{font-size:.8rem;color:var(--text,#333);opacity:.5;margin:2px 0 0}',
            '.sbai-close,.sbai-back{background:none;border:none;cursor:pointer;color:var(--text,#333);opacity:.5;font-size:1.4rem;line-height:1;padding:4px;transition:opacity .15s}',
            '.sbai-close:hover,.sbai-back:hover{opacity:1}',
            /* Body scroll area */
            '.sbai-body{overflow-y:auto;flex:1;padding:20px 24px}',
            /* Provider tabs */
            '.sbai-ptabs{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap}',
            '.sbai-ptab{padding:8px 16px;border-radius:20px;border:2px solid var(--card-border,#eee);background:none;cursor:pointer;font-size:.85rem;font-weight:600;color:var(--text,#333);transition:all .15s;font-family:inherit}',
            '.sbai-ptab.on{background:var(--primary,#9b59b6);color:#fff;border-color:var(--primary,#9b59b6)}',
            /* Form fields */
            '.sbai-fld{margin-bottom:16px}',
            '.sbai-fld label{display:block;font-size:.85rem;font-weight:600;color:var(--text,#333);margin-bottom:6px}',
            '.sbai-fld input{width:100%;padding:10px 14px;border:2px solid var(--card-border,#eee);border-radius:10px;font-size:.95rem;font-family:inherit;background:transparent;color:var(--text,#333);box-sizing:border-box;transition:border-color .2s}',
            '.sbai-fld input:focus{outline:none;border-color:var(--primary,#9b59b6)}',
            /* Security note */
            '.sbai-sec{background:rgba(255,193,7,.1);border:1px solid rgba(255,193,7,.3);border-radius:10px;padding:12px 14px;font-size:.8rem;color:var(--text,#333);opacity:.85;margin-bottom:20px;line-height:1.5}',
            /* Connect button */
            '.sbai-connect{width:100%;padding:14px;border:none;border-radius:12px;background:linear-gradient(135deg,var(--primary,#9b59b6),var(--accent,#8e44ad));color:#fff;font-size:1rem;font-weight:700;cursor:pointer;transition:transform .15s,opacity .15s;font-family:inherit}',
            '.sbai-connect:hover{transform:translateY(-1px)}.sbai-connect:disabled{opacity:.6;cursor:not-allowed;transform:none}',
            /* Status badges */
            '.sbai-status{margin-top:12px;padding:10px 14px;border-radius:10px;font-size:.85rem;line-height:1.5;display:none}',
            '.sbai-status.ok{display:block;background:rgba(46,213,115,.1);border:1px solid rgba(46,213,115,.3);color:var(--text,#333)}',
            '.sbai-status.err{display:block;background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.3);color:var(--text,#333)}',
            '.sbai-status.warn{display:block;background:rgba(255,193,7,.1);border:1px solid rgba(255,193,7,.3);color:var(--text,#333)}',
            /* Home hero */
            '.sbai-hero{text-align:center;padding:8px 0 24px}',
            '.sbai-hero h3{font-family:var(--font-heading,serif);font-size:1.1rem;color:var(--text,#333);margin:0 0 8px}',
            '.sbai-hero p{font-size:.85rem;color:var(--text,#333);opacity:.6;margin:0;line-height:1.5}',
            /* Caps bar */
            '.sbai-caps{display:flex;gap:8px;justify-content:center;margin:16px 0;flex-wrap:wrap}',
            '.sbai-cap{padding:4px 12px;border-radius:20px;font-size:.78rem;font-weight:700;background:rgba(46,213,115,.15);color:var(--text,#333);border:1px solid rgba(46,213,115,.3)}',
            '.sbai-cap.no{background:rgba(255,107,107,.1);border-color:rgba(255,107,107,.3)}',
            /* Home action grid */
            '.sbai-acts{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px}',
            '.sbai-act{padding:18px 16px;border-radius:14px;border:2px solid var(--card-border,#eee);cursor:pointer;transition:all .2s;text-align:center;background:transparent;font-family:inherit;width:100%}',
            '.sbai-act:hover{border-color:var(--primary,#9b59b6);transform:translateY(-2px)}',
            '.sbai-act-icon{font-size:1.8rem;display:block;margin-bottom:8px}',
            '.sbai-act-title{font-size:.9rem;font-weight:700;color:var(--text,#333);display:block}',
            '.sbai-act-desc{font-size:.75rem;color:var(--text,#333);opacity:.6;margin-top:4px;display:block}',
            /* Setup button */
            '.sbai-setup{width:100%;padding:13px;border:2px dashed var(--primary,#9b59b6);border-radius:12px;background:transparent;cursor:pointer;font-family:inherit;font-size:.9rem;font-weight:600;color:var(--primary,#9b59b6);transition:all .2s}',
            '.sbai-setup:hover{background:rgba(155,89,182,.05)}',
            /* Category tabs */
            '.sbai-ctabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}',
            '.sbai-ctabs::-webkit-scrollbar{display:none}',
            '.sbai-ctab{padding:6px 14px;border-radius:16px;border:1.5px solid var(--card-border,#eee);background:none;cursor:pointer;font-size:.8rem;font-weight:600;white-space:nowrap;color:var(--text,#333);transition:all .15s;font-family:inherit}',
            '.sbai-ctab.on{background:var(--primary,#9b59b6);color:#fff;border-color:var(--primary,#9b59b6)}',
            /* Creation cards */
            '.sbai-grid{display:flex;flex-direction:column;gap:10px}',
            '.sbai-card{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:14px;border:1.5px solid var(--card-border,#eee);cursor:pointer;transition:all .2s;background:transparent;width:100%;text-align:left;font-family:inherit}',
            '.sbai-card:hover{border-color:var(--primary,#9b59b6);background:rgba(155,89,182,.03)}',
            '.sbai-card-icon{font-size:1.5rem;flex-shrink:0}',
            '.sbai-card-info{flex:1;min-width:0}',
            '.sbai-card-title{font-size:.92rem;font-weight:700;color:var(--text,#333);margin:0 0 3px;display:block}',
            '.sbai-card-desc{font-size:.78rem;color:var(--text,#333);opacity:.6;margin:0;line-height:1.4}',
            '.sbai-card-saved{font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:10px;background:rgba(46,213,115,.15);color:#2ed573;flex-shrink:0}',
            /* Generating */
            '.sbai-gen{text-align:center;padding:40px 20px}',
            '.sbai-spin{width:40px;height:40px;border:3px solid var(--card-border,#eee);border-top-color:var(--primary,#9b59b6);border-radius:50%;animation:sbai-rot .8s linear infinite;margin:0 auto 16px}',
            '@keyframes sbai-rot{to{transform:rotate(360deg)}}',
            '.sbai-gen h3{font-family:var(--font-heading,serif);color:var(--text,#333);margin:0 0 8px}',
            '.sbai-gen p{font-size:.85rem;color:var(--text,#333);opacity:.6;margin:0}',
            /* Output */
            '.sbai-out-title{font-family:var(--font-heading,serif);font-size:1rem;color:var(--text,#333);margin:0 0 16px}',
            '.sbai-out-text{white-space:pre-wrap;font-size:.88rem;line-height:1.7;color:var(--text,#333);background:rgba(0,0,0,.03);border:1px solid var(--card-border,#eee);border-radius:12px;padding:16px;max-height:45vh;overflow-y:auto;margin-bottom:16px}',
            '.sbai-out-img{width:100%;border-radius:12px;margin-bottom:16px;display:block}',
            '.sbai-out-btns{display:flex;gap:10px;flex-wrap:wrap}',
            '.sbai-obtn{flex:1;min-width:120px;padding:10px 16px;border-radius:10px;font-size:.85rem;font-weight:700;cursor:pointer;transition:all .15s;font-family:inherit;border:none}',
            '.sbai-obtn.p{background:var(--primary,#9b59b6);color:#fff}',
            '.sbai-obtn.s{background:transparent;border:1.5px solid var(--card-border,#eee);color:var(--text,#333)}',
            '.sbai-obtn:hover{opacity:.85;transform:translateY(-1px)}',
            '.sbai-saved-tick{font-size:.78rem;color:#2ed573;text-align:center;margin-top:8px;display:none}',
            /* Saved section */
            '.sbai-saved-sec{margin-top:24px}',
            '.sbai-saved-hdr{font-size:.8rem;font-weight:700;color:var(--text,#333);opacity:.5;margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em}',
            '.sbai-saved-row{padding:10px 14px;border:1px solid var(--card-border,#eee);border-radius:10px;margin-bottom:8px;cursor:pointer;transition:border-color .15s}',
            '.sbai-saved-row:hover{border-color:var(--primary,#9b59b6)}',
            '.sbai-saved-name{font-size:.85rem;font-weight:600;color:var(--text,#333)}',
            '.sbai-saved-date{font-size:.75rem;color:var(--text,#333);opacity:.5;margin-top:2px}',
            /* Audio player */
            '.sbai-audio-wrap{margin-bottom:16px}.sbai-audio-wrap audio{width:100%;border-radius:10px;outline:none}.sbai-voice-sel{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}.sbai-voice-sel label{font-size:.8rem;font-weight:600;color:var(--text,#333);opacity:.6;width:100%}.sbai-voice-btn{padding:6px 14px;border-radius:16px;border:1.5px solid var(--card-border,#eee);background:none;cursor:pointer;font-size:.8rem;font-family:inherit;color:var(--text,#333);transition:all .15s}.sbai-voice-btn.on{background:var(--primary,#9b59b6);color:#fff;border-color:var(--primary,#9b59b6)}',
            /* Mobile */
            '@media(max-width:500px){#sbai-panel{border-radius:20px 20px 0 0}#sbai-btn{bottom:16px;right:16px;padding:10px 16px;font-size:.85rem}.sbai-acts{grid-template-columns:1fr}.sbai-body{padding:16px 18px}.sbai-out-btns{flex-direction:column}.sbai-obtn{min-width:unset}}'
        ].join('\n');
        document.head.appendChild(s);
    }

    // ─── HTML HELPERS ─────────────────────────────────────────────────────────
    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function hdr(title, sub, back, close) {
        return '<div class="sbai-hdr">' +
            (back  ? '<button class="sbai-back" id="sbai-back">←</button>' : '') +
            '<div><div class="sbai-hdr-title">' + esc(title) + '</div>' +
            (sub   ? '<div class="sbai-hdr-sub">' + esc(sub) + '</div>' : '') + '</div>' +
            (close ? '<button class="sbai-close" id="sbai-close">✕</button>' : '') +
            '</div>';
    }

    // ─── VIEWS ────────────────────────────────────────────────────────────────
    function viewHome(cfg) {
        var isReady = !!(cfg.key && cfg.provider && cfg.caps);
        var caps    = cfg.caps || {};
        var d       = state.readingData || {};
        var saved   = getSavedOutputs();
        var savedKeys = Object.keys(saved);
        var ALL     = TEXT_CREATIONS.concat(IMAGE_CREATIONS).concat(TTS_CREATIONS);

        var capsHtml = '';
        if (isReady) {
            capsHtml = '<div class="sbai-caps">' +
                '<span class="sbai-cap">✓ Text</span>' +
                (caps.images ? '<span class="sbai-cap">✓ Images</span>' : '<span class="sbai-cap no">✗ Images</span>') +
                (caps.tts    ? '<span class="sbai-cap">✓ Speech</span>' : '<span class="sbai-cap no">✗ Speech</span>') +
                '</div>';
        }

        var actHtml = '';
        if (isReady) {
            actHtml = '<div class="sbai-acts">' +
                '<button class="sbai-act" id="sbai-open-text">' +
                    '<span class="sbai-act-icon">✍️</span>' +
                    '<span class="sbai-act-title">Create Content</span>' +
                    '<span class="sbai-act-desc">18 AI creations from your reading</span>' +
                '</button>' +
                (caps.images
                    ? '<button class="sbai-act" id="sbai-open-img">' +
                        '<span class="sbai-act-icon">🎨</span>' +
                        '<span class="sbai-act-title">Generate Images</span>' +
                        '<span class="sbai-act-desc">6 cosmic visuals from your chart</span>' +
                    '</button>'
                    : '') +
                (caps.tts
                    ? '<button class="sbai-act" id="sbai-open-tts">' +
                        '<span class="sbai-act-icon">🔊</span>' +
                        '<span class="sbai-act-title">Text-to-Speech</span>' +
                        '<span class="sbai-act-desc">6 audio creations from your reading</span>' +
                    '</button>'
                    : '') +
                '</div>';
        }

        var savedHtml = '';
        if (savedKeys.length > 0) {
            savedHtml = '<div class="sbai-saved-sec"><div class="sbai-saved-hdr">Your Saved Creations</div>';
            savedKeys.slice(-5).reverse().forEach(function (k) {
                var item = ALL.filter(function (c) { return c.id === k; })[0];
                var label = item ? item.title : k;
                var dt = saved[k].savedAt ? new Date(saved[k].savedAt).toLocaleDateString() : '';
                savedHtml += '<div class="sbai-saved-row" data-sid="' + esc(k) + '">' +
                    '<div class="sbai-saved-name">' + esc(label) + '</div>' +
                    '<div class="sbai-saved-date">' + esc(dt) + '</div>' +
                    '</div>';
            });
            savedHtml += '</div>';
        }

        return hdr('⚡ AI Studio', d.name ? 'Creations from ' + d.name + '\'s reading' : 'Powered by your Soul Blueprint', false, true) +
            '<div class="sbai-body">' +
            (isReady
                ? capsHtml + actHtml
                : '<div class="sbai-hero"><h3>Unlock AI-Powered Creations</h3><p>Connect your own API key to generate 18 personalised content pieces and 6 custom images — all from your reading data.</p></div>') +
            '<button class="sbai-setup" id="sbai-open-cfg">' +
                (isReady ? '⚙ Change AI Settings' : '⚡ Connect Your AI Key') +
            '</button>' +
            savedHtml +
            '</div>';
    }

    function viewConfig(cfg) {
        var provider = cfg.provider || 'openai';
        var tabs = [
            { id: 'openai',     label: 'OpenAI' },
            { id: 'gemini',     label: 'Gemini' },
            { id: 'anthropic',  label: 'Claude' },
            { id: 'openrouter', label: 'OpenRouter' },
            { id: 'qwen',       label: 'Qwen' },
            { id: 'generic',    label: 'Other / Local' }
        ];
        var tabsHtml = '<div class="sbai-ptabs">' +
            tabs.map(function (t) {
                return '<button class="sbai-ptab' + (t.id === provider ? ' on' : '') + '" data-prov="' + t.id + '">' + t.label + '</button>';
            }).join('') + '</div>';

        var keyLab = provider === 'gemini'     ? 'Gemini API Key (console.cloud.google.com)' :
                     provider === 'anthropic'  ? 'Anthropic API Key (console.anthropic.com)' :
                     provider === 'openrouter' ? 'OpenRouter API Key (openrouter.ai/keys)' :
                     provider === 'qwen'       ? 'Alibaba DashScope API Key (dashscope.aliyuncs.com)' :
                     provider === 'generic'    ? 'API Key (leave blank for local Ollama)' :
                                                 'OpenAI API Key (platform.openai.com/api-keys)';
        var keyPh  = provider === 'gemini'     ? 'AIza...' :
                     provider === 'anthropic'  ? 'sk-ant-...' :
                     provider === 'openrouter' ? 'sk-or-v1-...' :
                     provider === 'qwen'       ? 'sk-...' : 'sk-...';
        var defModel = (DEFAULTS[provider] || {}).text || '';

        var noteHtml = '';
        if (provider === 'openrouter') noteHtml = '<div class="sbai-sec" style="background:rgba(99,179,237,.1);border-color:rgba(99,179,237,.3)">ℹ OpenRouter gives you access to 200+ models (GPT-4o, Claude, Llama, Gemma and more) with a single key. Free tier available at openrouter.ai</div>';
        if (provider === 'qwen')       noteHtml = '<div class="sbai-sec" style="background:rgba(99,179,237,.1);border-color:rgba(99,179,237,.3)">ℹ Qwen is Alibaba\'s AI. Get a free DashScope API key at dashscope.aliyuncs.com. Qwen-Max is comparable to GPT-4. No TTS support.</div>';

        return hdr('Connect Your AI', '', true, true) +
            '<div class="sbai-body">' +
            tabsHtml +
            noteHtml +
            '<div class="sbai-sec">🔒 Your key is stored only in this browser and sent only to the AI provider. Set a spending limit on your provider\'s dashboard before connecting.</div>' +
            '<div class="sbai-fld"><label>' + keyLab + '</label>' +
                '<input type="password" id="sbai-key" placeholder="' + keyPh + '" value="' + esc(cfg.key || '') + '" autocomplete="off"></div>' +
            (provider === 'generic'
                ? '<div class="sbai-fld"><label>Base URL (e.g. http://localhost:11434 for Ollama, https://api.groq.com for Groq, https://api.together.xyz)</label>' +
                    '<input type="text" id="sbai-ep" placeholder="https://..." value="' + esc(cfg.endpoint || '') + '"></div>'
                : '') +
            '<div class="sbai-fld"><label>Model <span style="opacity:.5;font-weight:400;font-size:.8rem">(auto-filled — edit to use a specific model)</span></label>' +
                '<input type="text" id="sbai-model" placeholder="' + defModel + '" value="' + esc(cfg.model || defModel) + '"></div>' +
            '<button class="sbai-connect" id="sbai-connect">Connect ✦</button>' +
            '<div class="sbai-status" id="sbai-status"></div>' +
            '</div>';
    }

    function viewGenerating() {
        var item = state.activeItem;
        return hdr('Generating\u2026', item ? item.title : '', false, false) +
            '<div class="sbai-body"><div class="sbai-gen">' +
            '<div class="sbai-spin"></div>' +
            '<h3>Creating your ' + esc(item ? item.title : 'content') + '</h3>' +
            '<p>Weaving your cosmic data into something personal\u2026</p>' +
            '</div></div>';
    }

    function viewOutput() {
        var item    = state.activeItem;
        var isImg   = state.outputType === 'image';
        var isAudio = state.outputType === 'audio';

        var voiceSel = '';
        if (isAudio) {
            voiceSel = '<div class="sbai-voice-sel"><label>Voice</label>' +
                TTS_VOICES.map(function (v) {
                    return '<button class="sbai-voice-btn' + (v.id === state.ttsVoice ? ' on' : '') + '" data-voice="' + v.id + '">' + v.label + '</button>';
                }).join('') +
                '</div>';
        }

        var outEl = isImg
            ? '<img class="sbai-out-img" id="sbai-img" src="data:image/png;base64,' + state.output + '" alt="Generated image">'
            : isAudio
                ? ('<div class="sbai-audio-wrap"><audio controls src="' + esc(state.output) + '"></audio></div>')
                : '<div class="sbai-out-text" id="sbai-txt">' + esc(state.output) + '</div>';

        var btns = isImg
            ? '<button class="sbai-obtn p" id="sbai-copy">⬇ Download PNG</button>' +
              '<button class="sbai-obtn s" id="sbai-dl">⬇ Save PNG</button>' +
              '<button class="sbai-obtn s" id="sbai-save">💾 Save to Reading</button>'
            : isAudio
                ? '<button class="sbai-obtn p" id="sbai-dl">⬇ Download MP3</button>' +
                  '<button class="sbai-obtn s" id="sbai-regen">🔄 Regenerate</button>'
                : '<button class="sbai-obtn p" id="sbai-copy">📋 Copy</button>' +
                  '<button class="sbai-obtn s" id="sbai-dl">⬇ Download .txt</button>' +
                  '<button class="sbai-obtn s" id="sbai-save">💾 Save to Reading</button>' +
                  '<button class="sbai-obtn s" id="sbai-print">🖨 Printable View</button>';

        return hdr(item ? item.title : 'Your Creation', '', true, true) +
            '<div class="sbai-body">' +
            (isAudio ? voiceSel : '') +
            outEl +
            '<div class="sbai-out-btns">' + btns + '</div>' +
            '<div class="sbai-saved-tick" id="sbai-tick">✓ Saved to your reading</div>' +
            '</div>';
    }

    function viewGrid(cfg) {
        var isTts = state.activeCategory === 'Audio & Voice';
        var isImg = state.activeCategory === 'Images';
        var cats  = ['Know Yourself', 'Love & Relationships', 'Life & Career', 'Wellness & Spirit', 'Content & Creative'];
        if (cfg.caps && cfg.caps.images) cats.push('Images');
        if (cfg.caps && cfg.caps.tts)    cats.push('Audio & Voice');

        var tabsHtml = '<div class="sbai-ctabs">' +
            cats.map(function (c) {
                return '<button class="sbai-ctab' + (c === state.activeCategory ? ' on' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
            }).join('') + '</div>';

        var items = isImg ? IMAGE_CREATIONS
                  : isTts ? TTS_CREATIONS
                  : TEXT_CREATIONS.filter(function (c) { return c.cat === state.activeCategory; });
        var saved = getSavedOutputs();

        var gridHtml = '<div class="sbai-grid">' +
            items.map(function (item) {
                var hasSaved = !!saved[item.id];
                return '<button class="sbai-card" data-iid="' + esc(item.id) + '">' +
                    '<span class="sbai-card-icon">' + item.icon + '</span>' +
                    '<div class="sbai-card-info"><span class="sbai-card-title">' + esc(item.title) + '</span>' +
                        '<div class="sbai-card-desc">' + esc(item.desc) + '</div></div>' +
                    (hasSaved ? '<span class="sbai-card-saved">✓ Saved</span>' : '') +
                    '</button>';
            }).join('') +
            '</div>';

        var d = state.readingData || {};
        var sub = d.name ? d.name + ' \u00b7 ' + (d.totalCards || '?') + ' readings loaded' : '';
        return hdr('Create', sub, true, true) +
            '<div class="sbai-body">' + tabsHtml + gridHtml + '</div>';
    }

    // ─── RENDER ───────────────────────────────────────────────────────────────
    function render() {
        var panel = document.getElementById('sbai-panel');
        if (!panel) return;
        var cfg = getConfig();
        var html = '';
        if      (state.view === 'config')     html = viewConfig(cfg);
        else if (state.view === 'generating') html = viewGenerating();
        else if (state.view === 'output')     html = viewOutput();
        else if (state.view === 'grid')       html = viewGrid(cfg);
        else                                  html = viewHome(cfg);

        panel.innerHTML = html;
        bindEvents();
    }

    // ─── EVENTS ───────────────────────────────────────────────────────────────
    function bindEvents() {
        var el;

        el = document.getElementById('sbai-close');
        if (el) el.addEventListener('click', closeStudio);

        el = document.getElementById('sbai-back');
        if (el) el.addEventListener('click', function () {
            state.view = state.view === 'output' ? 'grid'
                       : state.view === 'grid'   ? 'home'
                       : 'home';
            render();
        });

        // Home
        el = document.getElementById('sbai-open-cfg');
        if (el) el.addEventListener('click', function () { state.view = 'config'; render(); });

        el = document.getElementById('sbai-open-text');
        if (el) el.addEventListener('click', function () { state.activeCategory = 'Know Yourself'; state.view = 'grid'; render(); });

        el = document.getElementById('sbai-open-img');
        if (el) el.addEventListener('click', function () { state.activeCategory = 'Images'; state.view = 'grid'; render(); });

        el = document.getElementById('sbai-open-tts');
        if (el) el.addEventListener('click', function () { state.activeCategory = 'Audio & Voice'; state.view = 'grid'; render(); });

        // Saved rows
        document.querySelectorAll('.sbai-saved-row').forEach(function (row) {
            row.addEventListener('click', function () {
                var id   = row.getAttribute('data-sid');
                var saved = getSavedOutputs();
                if (!saved[id]) return;
                var ALL  = TEXT_CREATIONS.concat(IMAGE_CREATIONS).concat(TTS_CREATIONS);
                state.activeItem  = ALL.find(function (c) { return c.id === id; }) || { id: id, title: id, icon: '' };
                state.output      = saved[id].text;
                state.outputType  = saved[id].type || 'text';
                state.view        = 'output';
                render();
            });
        });

        // Provider tabs
        document.querySelectorAll('.sbai-ptab').forEach(function (tab) {
            tab.addEventListener('click', function () {
                var prov = tab.getAttribute('data-prov');
                var cfg  = getConfig();
                cfg.provider = prov;
                cfg.model    = (DEFAULTS[prov] || {}).text || '';
                saveConfig(cfg);
                render();
            });
        });

        // Connect
        el = document.getElementById('sbai-connect');
        if (el) el.addEventListener('click', handleConnect);

        // Category tabs
        document.querySelectorAll('.sbai-ctab').forEach(function (tab) {
            tab.addEventListener('click', function () { state.activeCategory = tab.getAttribute('data-cat'); render(); });
        });

        // Creation cards
        document.querySelectorAll('.sbai-card').forEach(function (card) {
            card.addEventListener('click', function () {
                var id  = card.getAttribute('data-iid');
                var ALL = TEXT_CREATIONS.concat(IMAGE_CREATIONS).concat(TTS_CREATIONS);
                var item = ALL.find(function (c) { return c.id === id; });
                if (item) handleGenerate(item);
            });
        });

        // Voice selector buttons
        document.querySelectorAll('.sbai-voice-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                state.ttsVoice = btn.getAttribute('data-voice');
                // Re-render just the voice selector highlight
                document.querySelectorAll('.sbai-voice-btn').forEach(function (b) { b.classList.remove('on'); });
                btn.classList.add('on');
            });
        });

        // Output actions
        el = document.getElementById('sbai-copy');  if (el) el.addEventListener('click', handleCopy);
        el = document.getElementById('sbai-dl');    if (el) el.addEventListener('click', handleDownload);
        el = document.getElementById('sbai-save');  if (el) el.addEventListener('click', handleSave);
        el = document.getElementById('sbai-print'); if (el) el.addEventListener('click', handlePrint);
        el = document.getElementById('sbai-regen'); if (el) el.addEventListener('click', function () { if (state.activeItem) handleGenerate(state.activeItem); });
    }

    // ─── HANDLERS ────────────────────────────────────────────────────────────
    async function handleConnect() {
        var btn    = document.getElementById('sbai-connect');
        var status = document.getElementById('sbai-status');
        var keyEl  = document.getElementById('sbai-key');
        var epEl   = document.getElementById('sbai-ep');
        var mdEl   = document.getElementById('sbai-model');
        var cfg    = getConfig();

        var key      = (keyEl  && keyEl.value.trim())  || '';
        var endpoint = (epEl   && epEl.value.trim())   || cfg.endpoint || '';
        var model    = (mdEl   && mdEl.value.trim())   || cfg.model    || '';

        if (!key && cfg.provider !== 'generic') {
            status.className = 'sbai-status err';
            status.textContent = 'Please enter your API key.';
            return;
        }

        btn.disabled = true;
        btn.textContent = 'Connecting\u2026';
        status.className = 'sbai-status';
        status.textContent = '';

        var caps = await detectCapabilities(cfg.provider, key, endpoint);
        saveConfig({ provider: cfg.provider, key: key, model: model, endpoint: endpoint, caps: caps });

        btn.disabled = false;
        btn.textContent = 'Connect \u2726';

        if (caps.error && !caps.text) {
            status.className = 'sbai-status err';
            status.textContent = '\u2717 ' + caps.error;
            return;
        }

        var lines = ['\u2713 Text generation ready'];
        if (caps.images) lines.push('\u2713 Image generation ready (' + caps.imageModels.join(', ') + ')');
        else             lines.push('\u2717 Image generation not available with this key');
        if (caps.error)  lines.push('Note: ' + caps.error);

        status.className = 'sbai-status ' + (caps.error ? 'warn' : 'ok');
        status.innerHTML = lines.join('<br>');

        setTimeout(function () { state.activeCategory = 'Know Yourself'; state.view = 'grid'; render(); }, 1600);
    }

    async function handleGenerate(item) {
        var cfg = getConfig();
        if (!cfg.key && cfg.provider !== 'generic') { state.view = 'config'; render(); return; }

        state.activeItem  = item;
        state.view        = 'generating';
        state.output      = null;
        render();

        try {
            var d         = state.readingData || {};
            var isImgItem = IMAGE_CREATIONS.find(function (c) { return c.id === item.id; });
            var isTtsItem = TTS_CREATIONS.find(function (c) { return c.id === item.id; });

            if (isTtsItem) {
                var prompts = getTextPrompts(item.id, d);
                if (!prompts) throw new Error('TTS prompt not found for: ' + item.id);
                // Generate text first, then convert to speech
                var text = await generateText(prompts.system, prompts.user, cfg);
                var audioUrl = await generateSpeech(text, state.ttsVoice, cfg);
                state.output     = audioUrl;
                state.outputType = 'audio';
            } else if (isImgItem) {
                var prompt = getImagePrompt(item.id, d);
                if (!prompt) throw new Error('Image prompt not found for: ' + item.id);
                var result = await generateImage(prompt, cfg);
                state.output     = result.b64;
                state.outputType = 'image';
            } else {
                var prompts = getTextPrompts(item.id, d);
                if (!prompts) throw new Error('Prompt template not found for: ' + item.id);
                var text = await generateText(prompts.system, prompts.user, cfg);
                state.output     = text;
                state.outputType = 'text';
            }
            state.view = 'output';
            render();
        } catch (err) {
            var hint = '';
            if (err.message.indexOf('Anthropic') !== -1 || err.message.indexOf('CORS') !== -1) hint = '\n\nSwitch to OpenAI or OpenRouter for browser-based generation.';
            else if (err.message.indexOf('TTS') !== -1 || err.message.indexOf('speech') !== -1) hint = '\n\nText-to-speech requires an OpenAI or OpenRouter key.';
            else if (err.message.indexOf('Ollama') !== -1 || err.message.indexOf('localhost') !== -1) hint = '\n\nMake sure Ollama is running: open a terminal and run `ollama serve`.';
            state.output     = 'Error: ' + err.message + hint;
            state.outputType = 'text';
            state.view       = 'output';
            render();
        }
    }

    function handleCopy() {
        if (state.outputType === 'image') { handleDownload(); return; }
        var text = state.output || '';
        var btn  = document.getElementById('sbai-copy');
        var done = function () { if (btn) { btn.textContent = '\u2713 Copied!'; setTimeout(function () { btn.textContent = '\ud83d\udccb Copy'; }, 2000); } };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done);
        } else {
            var ta = document.createElement('textarea');
            ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
            document.body.appendChild(ta); ta.select(); document.execCommand('copy');
            document.body.removeChild(ta); done();
        }
    }

    function handleDownload() {
        var item     = state.activeItem;
        var filename = (item ? item.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase() : 'creation') +
                       (state.readingData ? '-' + state.readingData.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase() : '');
        var a = document.createElement('a');
        if (state.outputType === 'image' && state.output) {
            a.href = 'data:image/png;base64,' + state.output;
            a.download = filename + '.png';
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
        } else if (state.outputType === 'audio' && state.output) {
            // Blob URL — just set as href + download
            a.href = state.output;
            a.download = filename + '.mp3';
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
        } else if (state.output) {
            a.href = URL.createObjectURL(new Blob([state.output], { type: 'text/plain' }));
            a.download = filename + '.txt';
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
        }
    }

    function handleSave() {
        if (!state.activeItem || !state.output) return;
        var saved = getSavedOutputs();
        saved[state.activeItem.id] = { text: state.output, type: state.outputType, savedAt: new Date().toISOString() };
        try { localStorage.setItem(OUTPUTS_KEY, JSON.stringify(saved)); } catch (e) {}
        var tick = document.getElementById('sbai-tick');
        if (tick) { tick.style.display = 'block'; setTimeout(function () { tick.style.display = 'none'; }, 2000); }
    }

    function handlePrint() {
        if (!state.output || state.outputType === 'image') return;
        var item  = state.activeItem;
        var d     = state.readingData || {};
        var title = item ? item.title : 'Soul Blueprint Creation';
        var w     = window.open('', '_blank');
        if (!w) return;
        w.document.write(
            '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + esc(title) + '</title>' +
            '<style>body{font-family:Georgia,serif;max-width:700px;margin:40px auto;padding:0 20px;line-height:1.8;color:#333}' +
            'h1{font-size:1.5rem;border-bottom:2px solid #eee;padding-bottom:12px;margin-bottom:8px}' +
            '.meta{font-size:.85rem;color:#888;margin-bottom:32px}' +
            'pre{white-space:pre-wrap;font-family:Georgia,serif;font-size:1rem;line-height:1.8}' +
            '@media print{body{margin:20px}}</style></head><body>' +
            '<h1>' + esc(title) + '</h1>' +
            '<div class="meta">Soul Blueprint \u00b7 ' + esc(d.name || '') + ' \u00b7 ' + new Date().toLocaleDateString() + '</div>' +
            '<pre>' + esc(state.output) + '</pre></body></html>'
        );
        w.document.close();
        w.focus();
        setTimeout(function () { w.print(); }, 400);
    }

    // ─── OPEN / CLOSE ─────────────────────────────────────────────────────────
    function openStudio() {
        state.open = true;
        state.view = 'home';
        var ov = document.getElementById('sbai-overlay');
        if (ov) ov.classList.add('sbai-open');
        render();
    }
    function closeStudio() {
        state.open = false;
        var ov = document.getElementById('sbai-overlay');
        if (ov) ov.classList.remove('sbai-open');
    }

    // ─── INIT ────────────────────────────────────────────────────────────────
    function init() {
        if (document.getElementById('sbai-btn')) return; // prevent double-init

        injectStyles();

        // Floating trigger button
        var btn = document.createElement('button');
        btn.id        = 'sbai-btn';
        btn.innerHTML = '\u26a1 AI Studio';
        btn.addEventListener('click', openStudio);
        document.body.appendChild(btn);

        // Full-screen overlay + panel container
        var ov = document.createElement('div');
        ov.id        = 'sbai-overlay';
        ov.innerHTML = '<div id="sbai-panel"></div>';
        ov.addEventListener('click', function (e) { if (e.target === ov) closeStudio(); });
        document.body.appendChild(ov);

        state.readingData = extractReadingData();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
