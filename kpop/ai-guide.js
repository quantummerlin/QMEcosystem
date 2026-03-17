/* =====================================================
   K-POP KOSMIC — AI GUIDE & GAME SYSTEMS
   ai-guide.js
   =====================================================
   Includes:
   · STAR AI persona (OpenRouter / openrouter/healer-alpha)
   · Rate limiting (10 req/day)
   · User API key support
   · Achievement system
   · Streak tracker
   · Sound effects (Web Audio API)
   · Confetti (canvas-confetti CDN)
   · Cosmic ID Card generator (Canvas API)
   ===================================================== */

/* ─── CONFIG (overridden by window.KK_CONFIG if set) ─── */
// PRIVACY: These models are governed by Google/Mistral/Meta API policies —
// they do NOT train on API data. PII (name, birth date, time, place) is
// NEVER sent to any API. Only derived chart values are included in prompts.
var KK_AI_CONFIG = window.KK_CONFIG?.ai || {
  // Model waterfall — tried in order; falls back on 429/503 rate-limit errors.
  models: [
    'google/gemini-2.0-flash-exp:free',      // Primary: fast, smart, privacy-safe
    'mistralai/mistral-7b-instruct:free',    // Fallback 1: emotionally fluent
    'meta-llama/llama-3.1-8b-instruct:free' // Fallback 2: reliable last resort
  ],
  siteKey: '',          // Set your OpenRouter API key here
  dailyLimit: 10,
  personaName: 'STAR',
  endpoint: 'https://openrouter.ai/api/v1/chat/completions'
};

/* ─── STORAGE KEYS ─── */
var KK_KEYS = {
  daily:    'kk-ai-daily',    // { date, count }
  userKey:  'kk-user-apikey', // string
  achieve:  'kk-achievements',// string[]
  streak:   'kk-streak',      // { lastDate, count }
  session:  'kk-hub-session'  // { userData, readings, readCards[], timestamp }
};

/* ──────────────────────────────────────────────────────
   STAR AI GUIDE
   ────────────────────────────────────────────────────── */
var KK_AI = (function () {
  var _history = [];          // OpenAI-format message array
  var _userData = null;
  var _readings = null;
  var _typing = false;
  var _streamEl = null;       // live typing element

  /* ── DOM references (populated on init) ── */
  var $msgs, $input, $send, $quota, $widget;

  function init(userData, readings) {
    _userData = userData;
    _readings = readings;
    _history = [];

    $msgs   = document.getElementById('ai-msgs');
    $input  = document.getElementById('ai-input');
    $send   = document.getElementById('ai-send-btn');
    $quota  = document.getElementById('ai-quota');
    $widget = document.getElementById('ai-widget');

    updateQuotaBadge();

    // Scripted welcome — no API call
    var lp   = _readings?.numerology?.lifePath;
    var sun  = _extractName(_readings?.astrology?.sunSign) || 'unknown';
    var name = userData?.name || 'Stan';

    var msg = 'Annyeong, ' + name + '! 🌟 STAR here, beaming in from 2087 where your legend status is already locked in!\n\n' +
              'Life Path ' + lp + ' + ' + sun + ' Sun… bestie, you have MAIN CHARACTER ENERGY all over this blueprint. ' +
              'Scroll through every reading — I\'ll be here dropping clues as you go. ' +
              'When you\'re ready to go deeper, just send me a message! ✨\n\n화이팅! 🎤';

    _addMsg('ai', msg);
    _addChips(['What\'s my main character energy?', 'Any hidden strengths I should know?', 'What challenges should I prepare for?']);
  }

  /* ── Public: open / close ── */
  function open() {
    if ($widget) {
      $widget.classList.add('chat-open');
    }
  }
  function close() {
    if ($widget) $widget.classList.remove('chat-open');
  }
  function toggle() {
    if ($widget) {
      $widget.classList.toggle('chat-open');
      if ($widget.classList.contains('chat-open') && $msgs) {
        $msgs.scrollTop = $msgs.scrollHeight;
      }
    }
  }

  /* ── Public: proactive card comment ── */
  function onCardOpened(cardId, cardTitle, readCount) {
    if (readCount === 1) {
      _addMsg('ai', 'Ooh, ' + cardTitle + ' on the first click — bold move! 🔥 This reading has some of your most defining energy. Notice those keywords? That\'s your cosmic DNA. ✨');
    } else if (readCount === 10) {
      _addMsg('ai', 'You\'ve unlocked 10 readings — that\'s your debut mini-album! 🎵 I\'m already seeing WILD cross-patterns in your chart. Ask me anything — let\'s get into the tea! ☕💜');
    } else if (readCount === 25) {
      _addMsg('ai', 'Half-way to full Cosmic Scholar status! 26 more readings to go, superstar! 🌟 Your chart is revealing something special — ask me what I see! 💫');
    }
  }

  /* ── Public: send user message ── */
  async function sendMessage(text) {
    if (!text || _typing) return;
    text = text.trim();
    if (!text) return;

    // Rate limit check
    var key = _getApiKey();
    if (!key) {
      _addMsg('ai', 'I need an API key to answer questions! Click ⚙️ above to add your own OpenRouter key, or ask the site owner to set one up. 💜');
      return;
    }
    if (!_hasQuotaRemaining()) {
      _addMsg('ai', 'You\'ve used all 10 STAR conversations for today, babe! 😭 Come back tomorrow OR click ⚙️ to add your own OpenRouter API key for unlimited chats! 화이팅! ✨');
      return;
    }

    // Add user message to UI and history
    _addMsg('user', text);
    _history.push({ role: 'user', content: text });

    // Build full message array for API
    var messages = [
      { role: 'system', content: _buildSystemPrompt() },
      ..._history.slice(-12) // keep last 12 turns for context
    ];

    // Show typing indicator
    var typingId = _showTyping();
    _typing = true;
    $send.disabled = true;

    try {
      var apiKey = _getApiKey();
      var stream = await _callOpenRouter(messages, apiKey);
      _removeTyping(typingId);
      var full = await _streamResponse(stream);
      _history.push({ role: 'assistant', content: full });
      _decrementQuota();
      updateQuotaBadge();
      KK_Sound.play('ping');
    } catch (err) {
      _removeTyping(typingId);
      var errMsg = err.message || 'Unknown error';
      if (errMsg.includes('401') || errMsg.includes('api_key') || errMsg.includes('Unauthorized')) {
        _addMsg('ai', 'Hmm, that API key isn\'t working, babe. Double-check it in ⚙️ settings! 🔑');
      } else if (errMsg.includes('429') || errMsg.includes('rate')) {
        _addMsg('ai', 'The AI is a bit overwhelmed right now (rate limited)! Try again in a minute? 💜');
      } else if (errMsg.includes('NO_KEY')) {
        _addMsg('ai', 'No API key set yet! Click ⚙️ to add your OpenRouter key. 🌟');
      } else {
        _addMsg('ai', 'Connection got a bit glitchy — try again? (Error: ' + errMsg.slice(0,80) + ') 💙');
      }
    } finally {
      _typing = false;
      if ($send) $send.disabled = false;
    }
  }

  /* ── Public: ask from card context ── */
  function askAboutCard(cardTitle, cardLabel) {
    open();
    var question = 'Tell me more about my ' + cardTitle.replace(/[🎤✨💜🫰🎂🎵👑🔥🏆💪⚖️☀️🌙⭐💬💗🌟🐉🚀🌸🩹🖤🌍⚙️📀📅🌅🌱⚡🌊🌑💫📸]/gu, '').trim() + (cardLabel ? ' (' + cardLabel + ')' : '');
    if ($input) {
      $input.value = question;
      $input.focus();
    }
  }

  /* ── Private: build STAR system prompt (PII-FREE) ── */
  // PRIVACY: We deliberately NEVER include name, birth date, birth time, or
  // birth place in any API call. Only DERIVED chart values (sign names,
  // numerology numbers) are sent — these are not personally identifiable.
  function _buildSystemPrompt() {
    var r = _readings;

    // Numerology — numbers only, no raw dates
    var lp      = r?.numerology?.lifePath;
    var lpTitle = window.LIFE_PATH_READINGS?.[lp]?.title || '';
    var dest    = r?.numerology?.destiny;
    var su      = r?.numerology?.soulUrge;
    var pers    = r?.numerology?.personality;
    var expr    = r?.numerology?.expression;
    var mat     = r?.numerology?.maturity;
    var bday    = r?.numerology?.birthday;
    var py      = r?.numerology?.personalYear;
    var pm      = r?.numerology?.personalMonth;

    // Astrology — sign names only, no raw birth data
    var sun    = _extractName(r?.astrology?.sunSign);
    var moon   = _extractName(r?.astrology?.moonSign);
    var rise   = _extractName(r?.astrology?.risingSign);
    var merc   = _extractName(r?.astrology?.mercurySign);
    var venus  = _extractName(r?.astrology?.venusSign);
    var mars   = _extractName(r?.astrology?.marsSign);
    var jup    = _extractName(r?.astrology?.jupiterSign);
    var sat    = _extractName(r?.astrology?.saturnSign);
    var elem   = _extractName(r?.astrology?.element);
    var mod    = _extractName(r?.astrology?.modality);
    var nn     = _extractName(r?.astrology?.northNode);
    var chiron = _extractName(r?.astrology?.chiron);
    var cz     = _extractName(r?.astrology?.chineseZodiac);
    var moonPh = _extractName(r?.astrology?.moonPhase);

    var chart =
      '=== COSMIC CHART (derived values only — no personal data) ===\n\n' +
      '— NUMEROLOGY —\n' +
      'Life Path: '     + (lp   || '?') + (lpTitle ? ' (' + lpTitle + ')' : '') + '\n' +
      'Destiny: '       + (dest || '?') + '\n' +
      'Soul Urge: '     + (su   || '?') + '\n' +
      'Personality: '   + (pers || '?') + '\n' +
      'Expression: '    + (expr || '?') + '\n' +
      'Maturity: '      + (mat  || '?') + '\n' +
      'Birthday No.: '  + (bday || '?') + '\n' +
      'Personal Year: ' + (py   || '?') + '\n' +
      'Personal Month: '+ (pm   || '?') + '\n\n' +
      '— ASTROLOGY —\n' +
      'Sun: '           + (sun    || '?') + '\n' +
      'Moon: '          + (moon   || '?') + '\n' +
      'Rising: '        + (rise   || '?') + '\n' +
      'Mercury: '       + (merc   || '?') + '\n' +
      'Venus: '         + (venus  || '?') + '\n' +
      'Mars: '          + (mars   || '?') + '\n' +
      'Jupiter: '       + (jup    || '?') + '\n' +
      'Saturn: '        + (sat    || '?') + '\n' +
      'Element: '       + (elem   || '?') + '\n' +
      'Modality: '      + (mod    || '?') + '\n' +
      'North Node: '    + (nn     || '?') + '\n' +
      'Chiron: '        + (chiron || '?') + '\n' +
      'Chinese Zodiac: '+ (cz     || '?') + '\n' +
      'Moon Phase: '    + (moonPh || '?');

    return 'You are STAR (Stellar Trajectory & Aura Reader) \u2014 a legendary K-pop idol from 2087 who mastered cosmic astrology and numerology.\n\n' +
      'YOUR PERSONALITY:\n' +
      '\u2022 Sassy, hype, and supportive like an iconic idol mentor\n' +
      '\u2022 Use K-pop language naturally: era, comeback, debut, slay, ate that, main character, bias wrecker, visual, center, maknae, sunbaenim, \ud654\uc774\ud305 (hwaiting), daesang, ult, stan\n' +
      '\u2022 Occasionally reference K-pop artists/groups to illustrate cosmic points\n' +
      '\u2022 Be SPECIFIC \u2014 cross-reference multiple placements in your answers\n' +
      '\u2022 Keep responses UNDER 200 words \u2014 punchy like a good lyric\n' +
      '\u2022 End every response with \u2728 or a K-pop phrase\n' +
      '\u2022 NEVER fabricate readings. Only reference the chart values below.\n\n' +
      chart + '\n\n' +
      'YOUR ROLE:\n' +
      '1. Answer questions about specific readings in STAR\'s voice\n' +
      '2. Spot cross-pattern insights (e.g. "Venus in Scorpio + Soul Urge 8 = the main character of every love story")\n' +
      '3. Point out things the user may have missed\n' +
      '4. Give actionable advice wrapped in K-pop metaphors\n\n' +
      'PRIVACY NOTE: You have NOT been given the user\'s name, birth date, time, or location. Do not ask for them. Work only from the chart values above.';
  }

  /* ── Private: OpenRouter fetch with model waterfall ── */
  // Tries each model in KK_AI_CONFIG.models in order.
  // Falls back to next model ONLY on 429 (rate limit) or 503 (unavailable).
  // All other HTTP errors (401 bad key, 400 bad request) fail immediately.
  async function _callOpenRouter(messages, apiKey) {
    if (!apiKey) throw new Error('NO_KEY');

    var models = (KK_AI_CONFIG.models && KK_AI_CONFIG.models.length)
      ? KK_AI_CONFIG.models
      : ['google/gemini-2.0-flash-exp:free', 'mistralai/mistral-7b-instruct:free', 'meta-llama/llama-3.1-8b-instruct:free'];

    var lastError = null;
    for (var i = 0; i < models.length; i++) {
      var model = models[i];
      try {
        var res = await fetch(KK_AI_CONFIG.endpoint, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + apiKey,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'K-pop Kosmic'
          },
          body: JSON.stringify({
            model: model,
            messages: messages,
            stream: true,
            max_tokens: 500,
            temperature: 0.92
          })
        });

        if (res.ok) return res.body; // success — return readable stream

        // Parse error details
        var errBody = {};
        try { errBody = await res.clone().json(); } catch(_) {}
        var errMsg = errBody.error?.message || errBody.message || 'HTTP ' + res.status;

        // 429 rate-limit / 503 model unavailable → try next in waterfall
        if (res.status === 429 || res.status === 503) {
          console.warn('[STAR] Model ' + model + ' unavailable (' + res.status + '), trying next…');
          lastError = new Error(errMsg);
          continue;
        }

        // Auth failure or other hard errors → don't bother trying other models
        throw new Error(errMsg);

      } catch (fetchErr) {
        // Re-throw auth/key errors immediately
        var msg = fetchErr.message || '';
        if (msg === 'NO_KEY' || msg.includes('401') || msg.includes('Unauthorized')) {
          throw fetchErr;
        }
        // Network-level error (offline, DNS fail) → try next model
        lastError = fetchErr;
        continue;
      }
    }

    // All models exhausted
    throw lastError || new Error('All models unavailable — try again in a moment');
  }

  /* ── Private: read SSE stream, render live ── */
  async function _streamResponse(stream) {
    var reader  = stream.getReader();
    var decoder = new TextDecoder();
    var buf = '', full = '';

    // Create live message element
    _streamEl = _addMsg('ai', '');

    try {
      while (true) {
        var { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        var lines = buf.split('\n');
        buf = lines.pop() || '';
        for (var line of lines) {
          if (!line.startsWith('data: ')) continue;
          var data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try {
            var json = JSON.parse(data);
            var chunk = json.choices?.[0]?.delta?.content || '';
            if (chunk) {
              full += chunk;
              if (_streamEl) _streamEl.textContent = full;
              if ($msgs) $msgs.scrollTop = $msgs.scrollHeight;
            }
          } catch (_) {}
        }
      }
    } finally {
      reader.releaseLock();
    }
    _streamEl = null;
    return full;
  }

  /* ── Private: DOM message helpers ── */
  function _addMsg(role, text) {
    if (!$msgs) return null;
    var wrap = document.createElement('div');
    wrap.className = 'ai-msg' + (role === 'user' ? ' user' : '');

    var ava = document.createElement('div');
    ava.className = 'ai-msg-ava';
    ava.textContent = role === 'user' ? '🫰' : '🌟';

    var bubble = document.createElement('div');
    bubble.className = 'ai-msg-text';
    bubble.textContent = text;
    // Small hack: render newlines as breaks
    bubble.style.whiteSpace = 'pre-line';

    wrap.appendChild(ava);
    wrap.appendChild(bubble);
    $msgs.appendChild(wrap);
    $msgs.scrollTop = $msgs.scrollHeight;
    return bubble; // return bubble for live streaming writes
  }

  function _showTyping() {
    var id = 'typing-' + Date.now();
    if (!$msgs) return id;
    var wrap = document.createElement('div');
    wrap.className = 'ai-msg ai-typing'; wrap.id = id;
    wrap.innerHTML = '<div class="ai-msg-ava">🌟</div><div class="ai-msg-text"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
    $msgs.appendChild(wrap);
    $msgs.scrollTop = $msgs.scrollHeight;
    return id;
  }

  function _removeTyping(id) {
    var el = document.getElementById(id);
    if (el) el.remove();
  }

  function _addChips(arr) {
    var container = document.getElementById('ai-chips');
    if (!container) return;
    container.innerHTML = '';
    arr.forEach(function(text) {
      var btn = document.createElement('button');
      btn.className = 'ai-chip';
      btn.textContent = text;
      btn.onclick = function() { if ($input) $input.value = text; sendMessage(text); };
      container.appendChild(btn);
    });
  }

  /* ── Private: rate limiting ── */
  function _getApiKey() {
    var userKey = localStorage.getItem(KK_KEYS.userKey);
    if (userKey && userKey.length > 8) return userKey.trim();
    return KK_AI_CONFIG.siteKey || null;
  }

  function _hasQuotaRemaining() {
    var userKey = localStorage.getItem(KK_KEYS.userKey);
    if (userKey && userKey.length > 8) return true; // own key = unlimited
    var raw = localStorage.getItem(KK_KEYS.daily);
    var today = _today();
    if (!raw) return true;
    var d = JSON.parse(raw);
    if (d.date !== today) return true;
    return d.count < KK_AI_CONFIG.dailyLimit;
  }

  function _decrementQuota() {
    var userKey = localStorage.getItem(KK_KEYS.userKey);
    if (userKey && userKey.length > 8) return; // own key, no decrement
    var raw = localStorage.getItem(KK_KEYS.daily);
    var today = _today();
    var d = raw ? JSON.parse(raw) : { date: today, count: 0 };
    if (d.date !== today) d = { date: today, count: 0 };
    d.count++;
    localStorage.setItem(KK_KEYS.daily, JSON.stringify(d));
  }

  function _getRemainingQuota() {
    var userKey = localStorage.getItem(KK_KEYS.userKey);
    if (userKey && userKey.length > 8) return Infinity;
    var raw = localStorage.getItem(KK_KEYS.daily);
    var today = _today();
    if (!raw) return KK_AI_CONFIG.dailyLimit;
    var d = JSON.parse(raw);
    if (d.date !== today) return KK_AI_CONFIG.dailyLimit;
    return Math.max(0, KK_AI_CONFIG.dailyLimit - d.count);
  }

  function updateQuotaBadge() {
    if (!$quota) return;
    var userKey = localStorage.getItem(KK_KEYS.userKey);
    if (userKey && userKey.length > 8) {
      $quota.textContent = '∞ questions';
      $quota.className = 'ai-quota';
      return;
    }
    var rem = _getRemainingQuota();
    $quota.textContent = rem + '/' + KK_AI_CONFIG.dailyLimit + ' today';
    $quota.className = 'ai-quota' + (rem === 0 ? ' none' : rem <= 3 ? ' low' : '');
  }

  function _today() {
    return new Date().toISOString().slice(0,10);
  }

  function _extractName(val) {
    if (!val) return null;
    if (typeof val === 'string') return val;
    if (typeof val === 'object') return val.name || val.sign || val.animal || val.phase || null;
    return String(val);
  }

  /* ── Public API key management ── */
  function saveApiKey(key) {
    if (key && key.trim().length > 8) {
      localStorage.setItem(KK_KEYS.userKey, key.trim());
      updateQuotaBadge();
      return true;
    }
    return false;
  }

  function clearApiKey() {
    localStorage.removeItem(KK_KEYS.userKey);
    updateQuotaBadge();
  }

  return { init, open, close, toggle, sendMessage, askAboutCard, onCardOpened, updateQuotaBadge, saveApiKey, clearApiKey };
})();

/* ──────────────────────────────────────────────────────
   ACHIEVEMENTS
   ────────────────────────────────────────────────────── */
var KK_Achievements = (function () {
  var DEFS = [
    { id: 'first_debut',   icon: '🎤', name: 'First Debut',       desc: 'Open your first reading',            trigger: 'read_1'   },
    { id: 'big_three',     icon: '👑', name: 'Big Three Unlocked', desc: 'Read Sun, Moon & Rising',            trigger: 'big_three' },
    { id: 'numerologist',  icon: '🔢', name: 'Numerologist',       desc: 'Read all numerology readings',       trigger: 'all_num'  },
    { id: 'stargazer',     icon: '⭐', name: 'Stargazer',          desc: 'Read all astrology readings',        trigger: 'all_astro' },
    { id: 'all_rounder',   icon: '💫', name: 'All-Rounder',        desc: 'Read 30 or more readings',           trigger: 'read_30'  },
    { id: 'cosmic_scholar',icon: '🎓', name: 'Cosmic Scholar',     desc: 'Read all 50+ readings',              trigger: 'read_all' },
    { id: 'week_streak',   icon: '🔥', name: '7-Day Streak',       desc: 'Check in 7 days in a row',           trigger: 'streak_7' },
    { id: 'id_card',       icon: '📸', name: 'Idol Profile',       desc: 'Generate your Cosmic ID Card',       trigger: 'id_card'  },
    { id: 'ai_chat',       icon: '🌟', name: 'STAR Chatted',       desc: 'Send your first message to STAR',    trigger: 'ai_first' },
    { id: 'surprise',      icon: '🎲', name: 'Roll the Dice',      desc: 'Use the Surprise Me button',         trigger: 'surprise' }
  ];

  function getUnlocked() {
    try { return JSON.parse(localStorage.getItem(KK_KEYS.achieve) || '[]'); }
    catch(_) { return []; }
  }

  function isUnlocked(id) {
    return getUnlocked().includes(id);
  }

  function unlock(id) {
    var list = getUnlocked();
    if (list.includes(id)) return false; // already have it
    list.push(id);
    localStorage.setItem(KK_KEYS.achieve, JSON.stringify(list));
    var def = DEFS.find(function(d){ return d.id === id; });
    if (def) {
      _showToast(def);
      KK_Sound.play('achievement');
      KK_Confetti.burst();
    }
    renderGrid();
    return true;
  }

  function check(trigger, extra) {
    DEFS.forEach(function(d) {
      if (d.trigger === trigger) unlock(d.id);
    });
    // Composite checks
    if (trigger === 'card_read') {
      var count = extra?.readCount || 0;
      if (count >= 1) check('read_1');
      if (count >= 30) check('read_30');
    }
  }

  function checkBigThree(readCards) {
    if (['sunSign','moonSign','risingSign'].every(function(id){ return readCards.includes(id); })) {
      unlock('big_three');
    }
  }

  function renderGrid() {
    var el = document.getElementById('achievements-grid');
    if (!el) return;
    var unlocked = getUnlocked();
    el.innerHTML = DEFS.map(function(d) {
      var on = unlocked.includes(d.id);
      return '<div class="badge-tile' + (on ? ' unlocked' : '') + '" title="' + d.name + '">' +
             '<div class="badge-tile-icon">' + d.icon + '</div>' +
             '<div class="badge-tile-name">' + d.name + '</div>' +
             '<div class="badge-tile-desc">' + d.desc + '</div>' +
             '</div>';
    }).join('');
  }

  function _showToast(def) {
    var toast = document.getElementById('achievement-toast');
    if (!toast) return;
    document.getElementById('toast-icon').textContent   = def.icon;
    document.getElementById('toast-name').textContent   = def.name;
    document.getElementById('toast-desc').textContent   = def.desc;
    toast.classList.add('show');
    setTimeout(function(){ toast.classList.remove('show'); }, 3400);
  }

  return { unlock, check, checkBigThree, isUnlocked, renderGrid, DEFS };
})();

/* ──────────────────────────────────────────────────────
   STREAK TRACKER
   ────────────────────────────────────────────────────── */
var KK_Streak = (function () {
  function _today() { return new Date().toISOString().slice(0,10); }

  function get() {
    try { return JSON.parse(localStorage.getItem(KK_KEYS.streak) || '{"lastDate":"","count":0}'); }
    catch(_) { return { lastDate: '', count: 0 }; }
  }

  function checkIn() {
    var d = get();
    var today = _today();
    if (d.lastDate === today) return d; // already checked in
    var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
    if (d.lastDate === yesterday) {
      d.count++;
    } else {
      d.count = 1; // streak broken or first time
    }
    d.lastDate = today;
    localStorage.setItem(KK_KEYS.streak, JSON.stringify(d));
    // Achievement check
    if (d.count >= 7) KK_Achievements.unlock('week_streak');
    updateUI(d);
    KK_Sound.play('unlock');
    return d;
  }

  function updateUI(d) {
    d = d || get();
    var badge = document.getElementById('streak-badge');
    if (badge) badge.textContent = d.count;
    var panel = document.getElementById('streak-panel-num');
    if (panel) panel.textContent = d.count;
  }

  return { get, checkIn, updateUI };
})();

/* ──────────────────────────────────────────────────────
   SOUND EFFECTS (Web Audio API — no external files)
   ────────────────────────────────────────────────────── */
var KK_Sound = (function () {
  var _ctx = null;
  var _muted = false;

  function _getCtx() {
    if (!_ctx) {
      try { _ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(_) { return null; }
    }
    if (_ctx.state === 'suspended') _ctx.resume();
    return _ctx;
  }

  function _tone(freq, type, dur, vol, delay) {
    var ctx = _getCtx(); if (!ctx || _muted) return;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + (delay||0));
    gain.gain.setValueAtTime(vol || 0.15, ctx.currentTime + (delay||0));
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (delay||0) + (dur||0.25));
    osc.start(ctx.currentTime + (delay||0));
    osc.stop(ctx.currentTime + (delay||0) + (dur||0.25));
  }

  function play(name) {
    try {
      if (name === 'flip') {
        _tone(440, 'sine', 0.12, 0.1);
        _tone(880, 'sine', 0.12, 0.08, 0.08);
      } else if (name === 'unlock') {
        _tone(523, 'sine', 0.18, 0.12);
        _tone(659, 'sine', 0.18, 0.12, 0.12);
        _tone(784, 'sine', 0.22, 0.12, 0.24);
      } else if (name === 'achievement') {
        [523, 659, 784, 1047].forEach(function(f, i){ _tone(f, 'triangle', 0.2, 0.14, i*0.1); });
      } else if (name === 'ping') {
        _tone(880, 'sine', 0.18, 0.1);
      } else if (name === 'complete') {
        [392, 523, 659, 784, 1047].forEach(function(f, i){ _tone(f, 'triangle', 0.25, 0.14, i*0.08); });
      }
    } catch(_) {}
  }

  function toggleMute() { _muted = !_muted; return _muted; }

  return { play, toggleMute };
})();

/* ──────────────────────────────────────────────────────
   CONFETTI (uses canvas-confetti if loaded, else fallback)
   ────────────────────────────────────────────────────── */
var KK_Confetti = (function () {
  function burst(opts) {
    if (window.confetti) {
      window.confetti(Object.assign({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#FF6B9D','#A855F7','#22D3EE','#F59E0B','#fff']
      }, opts || {}));
    } else {
      _fallback();
    }
  }

  function _fallback() {
    var canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    var pieces = Array.from({ length: 90 }, function() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 7 + 3,
        d: Math.random() * 80 + 20,
        color: ['#FF6B9D','#A855F7','#22D3EE','#F59E0B'][Math.floor(Math.random()*4)],
        vy: Math.random() * 3 + 1.5,
        vx: Math.random() * 2 - 1
      };
    });
    var frame = 0;
    function draw() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pieces.forEach(function(p) {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = p.color; ctx.fill();
        p.y += p.vy; p.x += p.vx;
      });
      frame++;
      if (frame < 80) requestAnimationFrame(draw);
      else ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    draw();
  }

  return { burst };
})();

/* ──────────────────────────────────────────────────────
   COSMIC ID CARD (Canvas API)
   ────────────────────────────────────────────────────── */
var KK_IDCard = (function () {
  var _canvas = null;
  var _userData = null;
  var _readings = null;

  function generate(userData, readings) {
    _userData = userData;
    _readings = readings;
    _canvas = document.getElementById('id-card-canvas');
    if (!_canvas) return;

    var W = 840, H = 520;
    _canvas.width = W; _canvas.height = H;
    var ctx = _canvas.getContext('2d');

    /* Background */
    var bg = ctx.createLinearGradient(0,0,W,H);
    bg.addColorStop(0,   '#0f0224');
    bg.addColorStop(0.4, '#1a0535');
    bg.addColorStop(1,   '#0a0118');
    ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);

    /* Stars */
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    for (var i=0; i<80; i++) {
      var sx = Math.random()*W, sy = Math.random()*H, sr = Math.random()*1.5;
      ctx.beginPath(); ctx.arc(sx,sy,sr,0,Math.PI*2); ctx.fill();
    }

    /* Gradient border */
    var grad = ctx.createLinearGradient(0,0,W,H);
    grad.addColorStop(0,'#FF6B9D'); grad.addColorStop(0.5,'#A855F7'); grad.addColorStop(1,'#22D3EE');
    ctx.strokeStyle = grad; ctx.lineWidth = 3;
    _roundRect(ctx,4,4,W-8,H-8,20); ctx.stroke();

    /* Inner subtle border */
    ctx.strokeStyle = 'rgba(168,85,247,0.3)'; ctx.lineWidth = 1;
    _roundRect(ctx,14,14,W-28,H-28,14); ctx.stroke();

    /* Header bar */
    var hbar = ctx.createLinearGradient(0,0,W,0);
    hbar.addColorStop(0,'rgba(255,107,157,0.22)'); hbar.addColorStop(1,'rgba(168,85,247,0.15)');
    ctx.fillStyle = hbar; ctx.fillRect(20,20,W-40,80);

    /* Brand name */
    ctx.font = 'bold 18px "Black Han Sans","Impact",sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('K-POP KOSMIC', 40, 58);

    /* COSMIC ID label */
    ctx.font = '13px "Noto Sans KR","Inter",sans-serif';
    ctx.fillStyle = 'rgba(255,107,157,0.8)';
    ctx.fillText('COSMIC ID CARD', W-180, 58);

    /* User name */
    var name = userData?.name || 'Stan';
    ctx.font = 'bold 38px "Black Han Sans","Impact",sans-serif';
    var nameGrad = ctx.createLinearGradient(40,0,400,0);
    nameGrad.addColorStop(0, '#FF6B9D'); nameGrad.addColorStop(1,'#A855F7');
    ctx.fillStyle = nameGrad;
    ctx.fillText(name.toUpperCase(), 40, 165);

    /* Birthday */
    var bd = userData?.birthDate ? new Date(userData.birthDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
    ctx.font = '15px "Noto Sans KR",sans-serif';
    ctx.fillStyle = 'rgba(240,230,255,0.55)';
    ctx.fillText('Born ' + bd, 40, 193);

    /* Big Three */
    var extractName = function(v) {
      if (!v) return '?';
      if (typeof v === 'string') return v;
      return v.name || v.sign || '?';
    };
    var sun   = extractName(readings?.astrology?.sunSign) || '?';
    var moon  = extractName(readings?.astrology?.moonSign) || '?';
    var rise  = extractName(readings?.astrology?.risingSign) || '?';
    var items = [['☀️ Sun', sun], ['🌙 Moon', moon], ['⭐ Rising', rise]];
    items.forEach(function(item, idx) {
      var ix = 40 + idx * 200;
      ctx.fillStyle = 'rgba(168,85,247,0.18)';
      _roundRect(ctx, ix, 215, 185, 70, 10); ctx.fill();
      ctx.strokeStyle = 'rgba(255,107,157,0.3)'; ctx.lineWidth = 1;
      _roundRect(ctx, ix, 215, 185, 70, 10); ctx.stroke();
      ctx.font = '13px "Noto Sans KR",sans-serif';
      ctx.fillStyle = 'rgba(240,230,255,0.5)';
      ctx.fillText(item[0], ix+14, 237);
      ctx.font = 'bold 20px "Black Han Sans","Impact",sans-serif';
      ctx.fillStyle = '#FF6B9D';
      ctx.fillText(item[1], ix+14, 270);
    });

    /* Numerology row */
    var lp   = readings?.numerology?.lifePath   || '?';
    var dest = readings?.numerology?.destiny     || '?';
    var su   = readings?.numerology?.soulUrge    || '?';
    var py   = readings?.numerology?.personalYear|| '?';
    var nums = [['Life Path', lp], ['Destiny', dest], ['Soul Urge', su], ['Yr Energy', py]];
    nums.forEach(function(n, idx) {
      var nx = 40 + idx * 195;
      ctx.font = '12px "Noto Sans KR",sans-serif';
      ctx.fillStyle = 'rgba(240,230,255,0.45)';
      ctx.fillText(n[0], nx, 325);
      ctx.font = 'bold 30px "Black Han Sans","Impact",sans-serif';
      ctx.fillStyle = '#A855F7';
      ctx.fillText(n[1], nx, 362);
    });

    /* Achievements row */
    var unlocked = KK_Achievements.DEFS.filter(function(d){ return KK_Achievements.isUnlocked(d.id); }).slice(0,8);
    ctx.font = '11px "Noto Sans KR",sans-serif';
    ctx.fillStyle = 'rgba(240,230,255,0.4)';
    ctx.fillText('BADGES EARNED', 40, 400);
    unlocked.forEach(function(badge, idx) {
      ctx.font = '22px serif';
      ctx.fillText(badge.icon, 40 + idx*46, 435);
    });
    if (unlocked.length === 0) {
      ctx.font = '13px "Noto Sans KR",sans-serif';
      ctx.fillStyle = 'rgba(240,230,255,0.3)';
      ctx.fillText('Start reading to earn badges! ✨', 40, 428);
    }

    /* Footer */
    ctx.fillStyle = 'rgba(255,255,255,0.23)';
    ctx.font = '12px "Noto Sans KR",sans-serif';
    ctx.fillText('quantummerlin.com/kpop · K-pop Kosmic · For entertainment purposes only 💜', 40, 490);

    /* Gen date */
    ctx.fillStyle = 'rgba(34,211,238,0.5)';
    ctx.font = '12px monospace';
    ctx.fillText(new Date().toLocaleDateString(), W-130, 490);
  }

  function _roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y); ctx.arcTo(x+w,y, x+w,y+r, r);
    ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w,y+h, x+w-r,y+h, r);
    ctx.lineTo(x+r, y+h); ctx.arcTo(x,y+h, x,y+h-r, r);
    ctx.lineTo(x, y+r); ctx.arcTo(x,y, x+r,y, r);
    ctx.closePath();
  }

  function download() {
    if (!_canvas) return;
    KK_Achievements.unlock('id_card');
    var a = document.createElement('a');
    var safeName = (_userData?.name || 'cosmic-id').toLowerCase().replace(/[^a-z0-9]/g,'-');
    a.download = safeName + '-cosmic-id.png';
    a.href = _canvas.toDataURL('image/png');
    a.click();
    KK_Sound.play('achievement');
  }

  function share() {
    if (!_canvas) return;
    KK_Achievements.unlock('id_card');
    _canvas.toBlob(function(blob) {
      if (navigator.share && blob) {
        var file = new File([blob], 'cosmic-id.png', { type: 'image/png' });
        navigator.share({
          title: 'My K-pop Kosmic ID Card',
          text: 'Check out my cosmic blueprint! 💜 #KpopKosmic',
          files: [file]
        }).catch(function(){});
      } else {
        download(); // fallback
      }
    }, 'image/png');
  }

  return { generate, download, share };
})();

/* ──────────────────────────────────────────────────────
   PARTICLE BACKGROUND GENERATOR
   ────────────────────────────────────────────────────── */
function KK_Particles_init() {
  var bg = document.getElementById('particle-bg');
  if (!bg) return;
  var colors = ['#FF6B9D','#A855F7','#22D3EE','rgba(255,255,255,0.8)'];
  for (var i = 0; i < 28; i++) {
    var p = document.createElement('div');
    p.className = 'particle';
    var size = Math.random() * 5 + 2;
    p.style.cssText = [
      'width:' + size + 'px',
      'height:' + size + 'px',
      'left:' + Math.random()*100 + '%',
      'background:' + colors[Math.floor(Math.random()*colors.length)],
      'animation-duration:' + (Math.random()*15+8) + 's',
      'animation-delay:-' + Math.random()*20 + 's'
    ].join(';');
    bg.appendChild(p);
  }
}
