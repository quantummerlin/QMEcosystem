// ============================================================
// BLUEPRINT PROMPT BUILDER — Structured Data Access Layer
// ============================================================
// Reads from sb-saved-readings in localStorage.
// Provides:
//   - Reading selector dropdown
//   - Token-based insert buttons
//   - Pre-built prompt templates with variable substitution
//   - Works on the standalone prompt-builder.html page
//     AND as an inline widget inside article/guide pages.
// ============================================================

(function () {
    'use strict';

    // ── STORAGE KEY (matches index.html multi-reading system) ──
    const STORAGE_KEY = 'sb-saved-readings';

    // ── STATE ──
    let currentBlueprint = null;   // { userData, readings }

    // ── HELPERS ──
    function signName(obj) {
        if (!obj) return '?';
        if (typeof obj === 'string') return obj;
        if (typeof obj === 'number') return String(obj);
        return obj.name || obj.sign || obj.animal || obj.phase || obj.element || '?';
    }

    function signDesc(obj) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        if (typeof obj === 'number') return String(obj);
        var parts = [];
        if (obj.name || obj.sign) parts.push(obj.name || obj.sign);
        if (obj.element) parts.push('Element: ' + obj.element);
        if (obj.quality) parts.push('Quality: ' + obj.quality);
        if (obj.ruler) parts.push('Ruler: ' + obj.ruler);
        if (obj.animal) parts.push('Animal: ' + obj.animal);
        if (obj.yinYang) parts.push(obj.yinYang);
        if (obj.phase) parts.push('Phase: ' + obj.phase);
        if (obj.illumination !== undefined) parts.push('Illumination: ' + obj.illumination + '%');
        if (obj.degree !== undefined) parts.push('Degree: ' + obj.degree + '°');
        return parts.join(' · ');
    }

    function esc(s) {
        var d = document.createElement('div');
        d.appendChild(document.createTextNode(s));
        return d.innerHTML;
    }

    // ── GET ALL SAVED READINGS ──
    function getAllReadings() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
        catch (e) { return {}; }
    }

    // ── BUILD STRUCTURED VARIABLES FROM A READING ──
    function extractVariables(reading) {
        if (!reading || !reading.readings) return null;
        var r = reading.readings;
        var u = reading.userData || {};
        var v = { _name: u.name || '', _birthDate: u.birthDate || '', _birthTime: u.birthTime || '', _birthPlace: u.birthPlace || '' };

        // Astrology
        if (r.astrology) {
            var a = r.astrology;
            v.sunSign       = signName(a.sunSign);
            v.moonSign      = signName(a.moonSign);
            v.risingSign    = signName(a.risingSign);
            v.mercurySign   = signName(a.mercurySign);
            v.venusSign     = signName(a.venusSign);
            v.marsSign      = signName(a.marsSign);
            v.jupiterSign   = signName(a.jupiterSign);
            v.saturnSign    = signName(a.saturnSign);
            v.uranusSign    = signName(a.uranusSign);
            v.neptuneSign   = signName(a.neptuneSign);
            v.plutoSign     = signName(a.plutoSign);
            v.chineseZodiac = signName(a.chineseZodiac);
            v.element       = signName(a.element);
            v.modality      = signName(a.modality);
            v.moonPhase     = signName(a.moonPhase);
            v.chiron        = signName(a.chiron);
            v.northNode     = signName(a.northNode);
            v.southNode     = signName(a.southNode);
            v.lilith        = signName(a.lilith);
            v.midheaven     = signName(a.midheaven);
            v.descendant    = signName(a.descendant);

            // Full descriptions
            v._sunDesc      = signDesc(a.sunSign);
            v._moonDesc     = signDesc(a.moonSign);
            v._risingDesc   = signDesc(a.risingSign);
            v._chineseDesc  = signDesc(a.chineseZodiac);
            v._moonPhaseDesc = signDesc(a.moonPhase);
        }

        // Numerology
        if (r.numerology) {
            var n = r.numerology;
            v.lifePath      = n.lifePath;
            v.destiny       = n.destiny;
            v.soulUrge      = n.soulUrge;
            v.personality   = n.personality;
            v.expression    = n.expression;
            v.birthday      = n.birthday;
            v.maturity      = n.maturity;
            v.personalYear  = n.personalYear;
            v.personalMonth = n.personalMonth;
            v.personalDay   = n.personalDay;
            v.hiddenPassion = n.hiddenPassion;
            v.karmicDebt    = (n.karmicDebt && n.karmicDebt.length) ? n.karmicDebt.join(', ') : 'None';
            v.masterNumbers = (n.masterNumbers && n.masterNumbers.length) ? n.masterNumbers.join(', ') : 'None';
        }

        // Life cycles
        if (r.lifeCycles) {
            v.age       = r.lifeCycles.age;
            v.lifeStage = signName(r.lifeCycles.lifeStage);
        }

        return v;
    }

    // ── FORMAT HELPERS ──
    function buildIdentitySummary(v) {
        var lines = [];
        lines.push('=== COSMIC IDENTITY: ' + (v._name || 'Unknown').toUpperCase() + ' ===');
        if (v._birthDate) lines.push('Born: ' + v._birthDate + (v._birthTime ? ' at ' + v._birthTime : '') + (v._birthPlace ? ' in ' + v._birthPlace : ''));
        lines.push('');
        lines.push(' Sun Sign: ' + (v._sunDesc || v.sunSign));
        lines.push(' Moon Sign: ' + (v._moonDesc || v.moonSign));
        lines.push('⬆ Rising Sign: ' + (v._risingDesc || v.risingSign));
        lines.push(' Element: ' + v.element);
        lines.push('');
        lines.push(' Life Path: ' + v.lifePath);
        lines.push(' Destiny: ' + v.destiny);
        lines.push(' Soul Urge: ' + v.soulUrge);
        if (v.chineseZodiac && v.chineseZodiac !== '?') {
            lines.push('');
            lines.push(' Chinese Zodiac: ' + (v._chineseDesc || v.chineseZodiac));
        }
        return lines.join('\n');
    }

    function buildFullBlueprint(v) {
        var lines = [];
        lines.push('╔══════════════════════════════════════╗');
        lines.push('║  COMPLETE SOUL BLUEPRINT             ║');
        lines.push('║  ' + (v._name || 'Unknown').toUpperCase().padEnd(35) + '║');
        lines.push('╚══════════════════════════════════════╝');
        if (v._birthDate) lines.push('Born: ' + v._birthDate + (v._birthTime ? ' at ' + v._birthTime : '') + (v._birthPlace ? ' in ' + v._birthPlace : ''));
        lines.push('');

        lines.push('── ASTROLOGY ──');
        [['Sun', 'sunSign'], ['Moon', 'moonSign'], ['Rising', 'risingSign'],
         ['Mercury', 'mercurySign'], ['Venus', 'venusSign'], ['Mars', 'marsSign'],
         ['Jupiter', 'jupiterSign'], ['Saturn', 'saturnSign'],
         ['Uranus', 'uranusSign'], ['Neptune', 'neptuneSign'], ['Pluto', 'plutoSign'],
         ['Element', 'element'], ['Modality', 'modality'], ['Moon Phase', 'moonPhase'],
         ['Chiron', 'chiron'], ['North Node', 'northNode'], ['South Node', 'southNode'],
         ['Lilith', 'lilith'], ['Midheaven', 'midheaven'], ['Descendant', 'descendant'],
         ['Chinese Zodiac', 'chineseZodiac']
        ].forEach(function (p) { if (v[p[1]] && v[p[1]] !== '?') lines.push(p[0] + ': ' + v[p[1]]); });
        lines.push('');

        lines.push('── NUMEROLOGY ──');
        [['Life Path', 'lifePath'], ['Destiny', 'destiny'], ['Soul Urge', 'soulUrge'],
         ['Personality', 'personality'], ['Expression', 'expression'], ['Birthday', 'birthday'],
         ['Maturity', 'maturity'], ['Personal Year', 'personalYear'],
         ['Hidden Passion', 'hiddenPassion']
        ].forEach(function (p) { if (v[p[1]] !== undefined) lines.push(p[0] + ': ' + v[p[1]]); });
        if (v.masterNumbers && v.masterNumbers !== 'None') lines.push('Master Numbers: ' + v.masterNumbers);
        if (v.karmicDebt && v.karmicDebt !== 'None') lines.push('Karmic Debt: ' + v.karmicDebt);
        lines.push('');

        if (v.age !== undefined) {
            lines.push('── LIFE CYCLES ──');
            lines.push('Current Age: ' + v.age);
            if (v.lifeStage) lines.push('Life Stage: ' + v.lifeStage);
        }

        return lines.join('\n');
    }

    // ── TOKEN DEFINITIONS ──
    // Each token: { key, label, icon, group, getValue(v) }
    var TOKENS = [
        // --- Quick composites ---
        { key: 'identity',  label: 'Full Identity',      icon: '', group: 'composite', getValue: function(v){ return buildIdentitySummary(v); } },
        { key: 'all',       label: 'Insert All Data',     icon: '', group: 'composite', getValue: function(v){ return buildFullBlueprint(v); } },
        // --- Astrology ---
        { key: 'sun',       label: 'Sun Sign',            icon: '', group: 'astrology',  getValue: function(v){ return 'Sun Sign: ' + (v._sunDesc || v.sunSign); } },
        { key: 'moon',      label: 'Moon Sign',           icon: '', group: 'astrology',  getValue: function(v){ return 'Moon Sign: ' + (v._moonDesc || v.moonSign); } },
        { key: 'rising',    label: 'Rising Sign',         icon: '⬆', group: 'astrology',  getValue: function(v){ return 'Rising Sign: ' + (v._risingDesc || v.risingSign); } },
        { key: 'mercury',   label: 'Mercury',             icon: '',  group: 'astrology',  getValue: function(v){ return 'Mercury: ' + v.mercurySign; } },
        { key: 'venus',     label: 'Venus',               icon: '',  group: 'astrology',  getValue: function(v){ return 'Venus: ' + v.venusSign; } },
        { key: 'mars',      label: 'Mars',                icon: '',  group: 'astrology',  getValue: function(v){ return 'Mars: ' + v.marsSign; } },
        { key: 'chinese',   label: 'Chinese Zodiac',      icon: '', group: 'astrology',  getValue: function(v){ return 'Chinese Zodiac: ' + (v._chineseDesc || v.chineseZodiac); } },
        { key: 'element',   label: 'Element',             icon: '', group: 'astrology',  getValue: function(v){ return 'Dominant Element: ' + v.element; } },
        { key: 'moonphase', label: 'Moon Phase',          icon: '', group: 'astrology',  getValue: function(v){ return 'Moon Phase at Birth: ' + (v._moonPhaseDesc || v.moonPhase); } },
        { key: 'chiron',    label: 'Chiron',              icon: '',  group: 'astrology',  getValue: function(v){ return 'Chiron (Wound/Healing): ' + v.chiron; } },
        { key: 'northnode', label: 'North Node',          icon: '',  group: 'astrology',  getValue: function(v){ return 'North Node (Life Direction): ' + v.northNode; } },
        { key: 'lilith',    label: 'Lilith',              icon: '',  group: 'astrology',  getValue: function(v){ return 'Black Moon Lilith: ' + v.lilith; } },
        // --- Numerology ---
        { key: 'lifepath',  label: 'Life Path',           icon: '', group: 'numerology', getValue: function(v){ return 'Life Path Number: ' + v.lifePath; } },
        { key: 'destiny',   label: 'Destiny',             icon: '', group: 'numerology', getValue: function(v){ return 'Destiny Number: ' + v.destiny; } },
        { key: 'soulurge',  label: 'Soul Urge',           icon: '', group: 'numerology', getValue: function(v){ return 'Soul Urge Number: ' + v.soulUrge; } },
        { key: 'personality', label: 'Personality #',     icon: '', group: 'numerology', getValue: function(v){ return 'Personality Number: ' + v.personality; } },
        { key: 'expression',  label: 'Expression #',     icon: '', group: 'numerology', getValue: function(v){ return 'Expression Number: ' + v.expression; } },
        { key: 'personalyear',label: 'Personal Year',    icon: '', group: 'numerology', getValue: function(v){ return 'Personal Year: ' + v.personalYear; } },
    ];

    // ── PROMPT TEMPLATES ──
    // Context-based pre-built prompts that auto-fill with blueprint data
    var PROMPT_TEMPLATES = [
        {
            id: 'self-awareness',
            name: ' Self-Awareness Deep Dive',
            category: 'Self-Discovery',
            template: 'I am a {sunSign} Sun, {moonSign} Moon, {risingSign} Rising with Life Path {lifePath}. My dominant element is {element} and my Chinese zodiac is {chineseZodiac}.\n\nBased on this cosmic blueprint, give me a deep personality analysis: 1) How I present to the world vs. who I am internally, 2) My biggest blind spots, 3) My greatest untapped strengths.'
        },
        {
            id: 'career-guidance',
            name: ' Career Alignment',
            category: 'Practical',
            template: 'My cosmic blueprint:\n- Sun: {sunSign} (core identity)\n- Midheaven: {midheaven} (public role)\n- Mercury: {mercurySign} (thinking style)\n- Mars: {marsSign} (drive & energy)\n- Life Path: {lifePath}\n- Destiny Number: {destiny}\n- Personal Year: {personalYear}\n\nBased on this profile, what career paths align with my natural energy? What work environments would I thrive in? What should I avoid?'
        },
        {
            id: 'relationship-insights',
            name: ' Relationship Blueprint',
            category: 'Relationships',
            template: 'My relationship blueprint:\n- Venus: {venusSign} (love style)\n- Mars: {marsSign} (passion & desire)\n- Moon: {moonSign} (emotional needs)\n- Descendant: {descendant} (partner archetype)\n- Soul Urge: {soulUrge}\n- Chiron: {chiron} (relationship wound)\n\nAnalyse my love language, attachment patterns, ideal partner qualities, and biggest relationship growth areas. Be honest about my shadow patterns in love.'
        },
        {
            id: 'shadow-work',
            name: ' Shadow Work',
            category: 'Self-Discovery',
            template: 'Cosmic shadow profile:\n- Sun: {sunSign} / Moon: {moonSign} (conscious vs unconscious)\n- Lilith: {lilith} (suppressed power)\n- Chiron: {chiron} (core wound)\n- South Node: {southNode} (past patterns)\n- Karmic Debt: {karmicDebt}\n\nWhat are my shadow patterns? What am I avoiding? What triggers me most, and why? Give me a gentle but honest shadow work guide based on this data.'
        },
        {
            id: 'parenting',
            name: ' Parenting Insights',
            category: 'Practical',
            template: 'My child\'s cosmic blueprint:\n- Sun: {sunSign} (core personality)\n- Moon: {moonSign} (emotional needs)\n- Mercury: {mercurySign} (learning style)\n- Mars: {marsSign} (energy & assertion)\n- Life Path: {lifePath}\n- Element: {element}\n\nHow does this child learn best? What emotional support do they need? What parenting approaches would be most effective? What should I be careful NOT to do with this personality type?'
        },
        {
            id: 'manifestation',
            name: ' Manifestation Strategy',
            category: 'Spiritual',
            template: 'Blueprint for manifestation:\n- Sun: {sunSign} (identity power)\n- Jupiter: {jupiterSign} (abundance & luck)\n- North Node: {northNode} (soul direction)\n- Personal Year: {personalYear}\n- Life Path: {lifePath}\n- Element: {element}\n\nDesign a manifestation strategy that aligns with my cosmic blueprint. What techniques suit my energy? What blocks am I likely to face? What is the best timing for action vs. reception?'
        },
        {
            id: 'daily-routine',
            name: ' Blueprint-Aligned Routine',
            category: 'Practical',
            template: 'My energetic profile:\n- Sun: {sunSign} (vitality)\n- Moon: {moonSign} (emotional rhythm)\n- Mars: {marsSign} (physical energy)\n- Saturn: {saturnSign} (discipline style)\n- Element: {element}\n- Life Path: {lifePath}\n- Moon Phase at birth: {moonPhase}\n\nCreate a daily routine (morning, midday, evening) that is specifically aligned with my cosmic energy type. Include ideal times for deep work, creative tasks, rest, and social interaction.'
        },
        {
            id: 'communication',
            name: ' Communication Style',
            category: 'Practical',
            template: 'Communication blueprint:\n- Mercury: {mercurySign} (thinking & speaking)\n- Sun: {sunSign} (identity)\n- Moon: {moonSign} (emotional processing)\n- Rising: {risingSign} (first impression)\n- Personality Number: {personality}\n\nHow do I naturally communicate? What are my strengths and blind spots in conversation? How can I communicate more effectively in professional settings, romantic relationships, and friendships?'
        },
    ];

    // ── VARIABLE SUBSTITUTION ──
    function fillTemplate(template, vars) {
        return template.replace(/\{(\w+)\}/g, function (m, key) {
            return vars[key] !== undefined ? vars[key] : '{' + key + '}';
        });
    }

    // ── TOAST ──
    function showToast(msg) {
        var toast = document.getElementById('sb-prompt-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'sb-prompt-toast';
            toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);background:#1a1a2e;color:#fff;padding:12px 24px;border-radius:999px;font-size:.9rem;font-weight:500;z-index:99999;opacity:0;transition:opacity .3s,transform .3s;box-shadow:0 8px 30px rgba(0,0,0,.25);';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
        clearTimeout(toast._t);
        toast._t = setTimeout(function () {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
        }, 2500);
    }

    // ================================================================
    // WIDGET: Inline reading selector + insert buttons for ANY page
    // ================================================================
    // Call SBPromptBuilder.injectWidget(containerEl, targetTextarea)
    // to mount the widget inside a specific DOM element.
    // If targetTextarea is null, buttons copy to clipboard instead.
    // ================================================================

    function injectWidget(container, targetTextarea) {
        if (!container) return;

        var readings = getAllReadings();
        var keys = Object.keys(readings);

        // --- Build HTML ---
        var html = '';

        // Status banner
        html += '<div class="sb-pb-status" id="sbPbStatus"></div>';

        if (!keys.length) {
            html += '<div class="sb-pb-empty">';
            html += '<p><strong>No saved readings found.</strong></p>';
            html += '<p>Generate a reading first, then come back here to build prompts from your real data.</p>';
            html += '<a href="/soulblueprint/" class="sb-pb-cta">Generate Your Reading →</a>';
            html += '</div>';
            container.innerHTML = html;
            return;
        }

        // Reading selector
        html += '<div class="sb-pb-selector">';
        html += '<label for="sbPbReadingSelect">Load your blueprint:</label>';
        html += '<select id="sbPbReadingSelect" class="sb-pb-select">';
        html += '<option value="">— Select a saved reading —</option>';
        keys.sort(function (a, b) {
            return (readings[b].createdAt || 0) - (readings[a].createdAt || 0);
        });
        keys.forEach(function (key) {
            var r = readings[key];
            var name = r.userData ? r.userData.name : key;
            var date = r.userData ? r.userData.birthDate : '';
            html += '<option value="' + esc(key) + '">' + esc(name) + (date ? ' (' + date + ')' : '') + '</option>';
        });
        html += '</select>';
        html += '</div>';

        // Insert buttons container
        html += '<div class="sb-pb-buttons" id="sbPbButtons" style="display:none;"></div>';

        // Template prompts container
        html += '<div class="sb-pb-templates" id="sbPbTemplates" style="display:none;"></div>';

        container.innerHTML = html;

        // --- Event: reading selected ---
        var select = document.getElementById('sbPbReadingSelect');
        select.addEventListener('change', function () {
            var readingId = select.value;
            var btnContainer = document.getElementById('sbPbButtons');
            var tplContainer = document.getElementById('sbPbTemplates');
            var statusEl = document.getElementById('sbPbStatus');

            if (!readingId) {
                btnContainer.style.display = 'none';
                tplContainer.style.display = 'none';
                statusEl.innerHTML = '';
                currentBlueprint = null;
                return;
            }

            var reading = readings[readingId];
            if (!reading || !reading.readings) return;

            currentBlueprint = reading;
            var vars = extractVariables(reading);

            // Status
            statusEl.innerHTML = '<span class="sb-pb-linked"> Linked to <strong>' + esc(vars._name || 'Unknown') + '</strong>\'s blueprint</span>';

            // Build insert buttons
            var btnsHtml = '<div class="sb-pb-btn-group"><span class="sb-pb-group-label">Quick Insert</span>';
            TOKENS.forEach(function (token) {
                var val = token.getValue(vars);
                if (!val || val.indexOf('?') > -1) return;
                var cls = 'sb-pb-btn';
                if (token.group === 'composite') cls += ' sb-pb-btn-' + token.key;
                var displayLabel = token.icon + ' ' + token.label;
                // Show current value for non-composites
                if (token.group !== 'composite') {
                    var shortVal = vars[token.key === 'lifepath' ? 'lifePath' :
                                        token.key === 'soulurge' ? 'soulUrge' :
                                        token.key === 'personalyear' ? 'personalYear' :
                                        token.key] || '';
                    if (shortVal && shortVal !== '?') displayLabel += ': ' + shortVal;
                }
                btnsHtml += '<button class="' + cls + '" data-token="' + token.key + '" title="' + esc(val.substring(0, 100)) + '">' + displayLabel + '</button>';
            });
            btnsHtml += '</div>';
            btnContainer.innerHTML = btnsHtml;
            btnContainer.style.display = 'block';

            // Build template prompts
            var tplHtml = '<div class="sb-pb-tpl-group"><span class="sb-pb-group-label">Blueprint-Aligned Prompts (auto-filled with your data)</span>';
            PROMPT_TEMPLATES.forEach(function (tpl) {
                var filled = fillTemplate(tpl.template, vars);
                tplHtml += '<div class="sb-pb-tpl">';
                tplHtml += '<div class="sb-pb-tpl-header">';
                tplHtml += '<span class="sb-pb-tpl-name">' + tpl.name + '</span>';
                tplHtml += '<span class="sb-pb-tpl-cat">' + tpl.category + '</span>';
                tplHtml += '</div>';
                tplHtml += '<pre class="sb-pb-tpl-text" contenteditable="true" spellcheck="false">' + esc(filled) + '</pre>';
                tplHtml += '<div class="sb-pb-tpl-actions">';
                tplHtml += '<button class="sb-pb-tpl-copy" data-prompt="' + esc(filled) + '"> Copy</button>';
                tplHtml += '<button class="sb-pb-tpl-insert" data-prompt="' + esc(filled) + '"> Insert into prompt box</button>';
                tplHtml += '</div>';
                tplHtml += '</div>';
            });
            tplHtml += '</div>';
            tplContainer.innerHTML = tplHtml;
            tplContainer.style.display = 'block';
        });

        // --- Event: token button click ---
        container.addEventListener('click', function (e) {
            var btn = e.target.closest('.sb-pb-btn');
            if (btn) {
                var tokenKey = btn.getAttribute('data-token');
                var token = TOKENS.find(function (t) { return t.key === tokenKey; });
                if (!token || !currentBlueprint) return;
                var vars = extractVariables(currentBlueprint);
                var text = token.getValue(vars);

                if (targetTextarea) {
                    insertAtCursor(targetTextarea, text);
                    showToast('Inserted: ' + token.label);
                } else {
                    navigator.clipboard.writeText(text).then(function () {
                        showToast('Copied: ' + token.label);
                    }).catch(function () {
                        fallbackCopy(text);
                        showToast('Copied: ' + token.label);
                    });
                }
                return;
            }

            // Template copy
            var copyBtn = e.target.closest('.sb-pb-tpl-copy');
            if (copyBtn) {
                // Read from the editable <pre> (user may have edited)
                var tplBox = copyBtn.closest('.sb-pb-tpl');
                var pre = tplBox ? tplBox.querySelector('.sb-pb-tpl-text') : null;
                var text = pre ? pre.textContent : copyBtn.getAttribute('data-prompt');
                navigator.clipboard.writeText(text).then(function () {
                    showToast('Prompt copied!');
                }).catch(function () {
                    fallbackCopy(text);
                    showToast('Prompt copied!');
                });
                return;
            }

            // Template insert
            var insertBtn = e.target.closest('.sb-pb-tpl-insert');
            if (insertBtn) {
                var tplBox = insertBtn.closest('.sb-pb-tpl');
                var pre = tplBox ? tplBox.querySelector('.sb-pb-tpl-text') : null;
                var text = pre ? pre.textContent : insertBtn.getAttribute('data-prompt');
                if (targetTextarea) {
                    targetTextarea.value = text;
                    targetTextarea.dispatchEvent(new Event('input'));
                    showToast('Prompt loaded!');
                } else {
                    navigator.clipboard.writeText(text).then(function () {
                        showToast('Prompt copied!');
                    }).catch(function () {
                        fallbackCopy(text);
                        showToast('Prompt copied!');
                    });
                }
                return;
            }
        });
    }

    function insertAtCursor(textarea, text) {
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        var current = textarea.value;
        var sep = current.length > 0 && start > 0 ? '\n\n' : '';
        textarea.value = current.substring(0, start) + sep + text + current.substring(end);
        textarea.focus();
        var newPos = start + sep.length + text.length;
        textarea.setSelectionRange(newPos, newPos);
        textarea.dispatchEvent(new Event('input'));
    }

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
    }

    // ================================================================
    // AUTO-INJECT: Find any element with [data-sb-prompt-builder]
    //   and mount the widget automatically on DOMContentLoaded.
    //   Optional: data-sb-prompt-target="selectorForTextarea"
    // ================================================================
    function autoInit() {
        var containers = document.querySelectorAll('[data-sb-prompt-builder]');
        containers.forEach(function (el) {
            var targetSel = el.getAttribute('data-sb-prompt-target');
            var textarea = targetSel ? document.querySelector(targetSel) : null;
            injectWidget(el, textarea);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInit);
    } else {
        autoInit();
    }

    // ── PUBLIC API ──
    window.SBPromptBuilder = {
        injectWidget: injectWidget,
        extractVariables: extractVariables,
        getAllReadings: getAllReadings,
        fillTemplate: fillTemplate,
        TOKENS: TOKENS,
        PROMPT_TEMPLATES: PROMPT_TEMPLATES
    };

})();
