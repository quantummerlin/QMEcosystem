// ============================================================
// LOVE BLUEPRINT — de-slop pass (anti-AI-aesthetic)
// Replaces the default "AI dashboard" look with an editorial
// love-letter system: flat ink, hairlines, monochrome dingbats,
// no glow, no gradient text, no particles, no glass blur.
//   - gradients on chrome  -> flat deep rose / flat tints
//   - glow shadows         -> neutral or none
//   - OS colour emoji      -> monochrome dingbats (+VS15)
//   - heart particles      -> removed
//   - infinite beat pulse  -> static
//   - hero gradient text   -> solid ink + hand-drawn flourish
// Run: node tests/deslop.cjs
// ============================================================
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'index.html');
let src = fs.readFileSync(FILE, 'utf8');
let ok = 0; const misses = [];
function rep(from, to, label) {
    const n = src.split(from).length - 1;
    if (!n) { misses.push(label || from.slice(0, 60)); return; }
    src = src.split(from).join(to); ok += n;
}
function repRe(re, to, label) {
    if (!re.test(src)) { misses.push('re: ' + label); return; }
    src = src.replace(re, to); ok++;
}

/* ---------- tokens ---------- */
rep('  --t-fast:.18s; --t-base:.32s; --t-slow:.62s;',
    '  --ink-rose:#C22A4A;      /* flat editorial rose (buttons, active) */\r\n  --ink-rose-dk:#A21F3C;\r\n  --t-fast:.18s; --t-base:.32s; --t-slow:.62s;');

/* ---------- hero: flat ink + flourish ---------- */
repRe(/\.brand-chip\{\r?\n\s*display:inline-flex;align-items:center;gap:8px;\r?\n\s*background:linear-gradient\(135deg,#8E0E2E,var\(--rose\)\);\r?\n\s*color:#fff;font-weight:700;font-size:\.78rem;letter-spacing:\.14em;\r?\n\s*text-transform:uppercase;padding:7px 16px;border-radius:999px;\r?\n\s*box-shadow:0 6px 18px rgba\(255,77,109,\.35\);\r?\n\}/,
    '.brand-chip{\r\n  display:inline-flex;align-items:center;gap:8px;\r\n  background:transparent;border:1px solid rgba(232,185,106,.45);\r\n  color:var(--gold);font-weight:700;font-size:.72rem;letter-spacing:.22em;\r\n  text-transform:uppercase;padding:7px 18px;border-radius:2px;\r\n}', 'brand-chip');
repRe(/\.hero h1\{\r?\n\s*font-size:clamp\(2\.6rem,8vw,4\.4rem\);font-weight:800;margin:18px 0 6px;\r?\n\s*background:linear-gradient\(135deg,#FF8FA3,#FF4D6D 45%,#E8B96A\);\r?\n\s*-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;\r?\n\}/,
    '.hero h1{\r\n  font-size:clamp(2.3rem,7vw,3.8rem);font-weight:600;margin:20px 0 0;color:var(--text);\r\n  letter-spacing:-.015em;line-height:1.08;\r\n}\r\n.flourish{display:block;margin:6px auto 12px;width:min(300px,64vw);height:24px;color:var(--gold);opacity:.8}', 'hero h1');
rep('<h1>Your love story, read from the real sky</h1>',
    '<h1>Your love story, read from the real sky</h1>\r\n    <svg class="flourish" viewBox="0 0 300 24" fill="none" aria-hidden="true"><path d="M8 16 C 52 4, 96 22, 148 12 C 196 3, 236 20, 274 10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M274 10 c 3 -5, 10 -4, 10 1 c 0 5, -7 8, -10 10 c -3 -2, -10 -5, -10 -10 c 0 -5, 7 -6, 10 -1 z" fill="currentColor" opacity=".9"/><path d="M26 19 c 8 3, 18 3, 26 0" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".55"/></svg>');

/* ---------- kill particles + infinite beat ---------- */
rep('.beat{display:inline-block;animation:beat 1.6s ease-in-out infinite}', '.beat{display:inline-block}');
rep('.heart-field{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}',
    '.heart-field{display:none}');

/* ---------- buttons: flat ink, no glow ---------- */
rep('  background:linear-gradient(135deg,#FF4D6D,#8E0E2E);\r\n  box-shadow:0 8px 22px rgba(255,77,109,.34);transition:transform .2s var(--ease),box-shadow .2s;',
    '  background:var(--ink-rose);\r\n  box-shadow:none;transition:background .2s var(--ease),transform .2s var(--ease);');
rep('.btn:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(255,77,109,.45)}',
    '.btn:hover{background:var(--ink-rose-dk)}');
rep('.chip.sel{background:linear-gradient(135deg,#FF4D6D,#8E0E2E);border-color:transparent;color:#fff;box-shadow:0 6px 16px rgba(255,77,109,.3)}',
    '.chip.sel{background:var(--ink-rose);border-color:transparent;color:#fff}');
rep('.btn2.primary{background:linear-gradient(135deg,#FF4D6D,#8E0E2E);color:#fff;box-shadow:0 6px 18px rgba(255,77,109,.28)}',
    '.btn2.primary{background:var(--ink-rose);color:#fff}');
rep('.seg button.on{background:linear-gradient(135deg,#FF4D6D,#8E0E2E);color:#fff}',
    '.seg button.on{background:var(--ink-rose);color:#fff}');
rep('.tone-seg button.on{background:linear-gradient(135deg,#FF4D6D,#8E0E2E);border-color:transparent;color:#fff}',
    '.tone-seg button.on{background:var(--ink-rose);border-color:transparent;color:#fff}');
rep('.flipbtn:hover{background:var(--rose);color:#fff}', '.flipbtn:hover{background:var(--ink-rose);color:#fff}');
rep('.lib-btn.solid{background:linear-gradient(135deg,#FF4D6D,#8E0E2E);border-color:transparent;color:#fff}',
    '.lib-btn.solid{background:var(--ink-rose);border-color:transparent;color:#fff}');
rep('.resume-go{background:linear-gradient(135deg,#FF4D6D,#8E0E2E);color:#fff;border:none;border-radius:999px;',
    '.resume-go{background:var(--ink-rose);color:#fff;border:none;border-radius:999px;');
rep('.resume-ico{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#FF4D6D,#8E0E2E);',
    '.resume-ico{width:44px;height:44px;border-radius:12px;background:var(--ink-rose);');
rep('.bar-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,#FF8FA3,#8E0E2E);width:0;transi',
    '.bar-fill{height:100%;border-radius:99px;background:var(--ink-rose);width:0;transi');
rep('.opt.sel{border-color:var(--rose);background:linear-gradient(135deg,rgba(255,77,109,.18),var(--card-2));b',
    '.opt.sel{border-color:var(--rose);background:rgba(255,77,109,.12);b');

/* ---------- chrome: solid, no glass blur ---------- */
rep('  background:linear-gradient(rgba(20,11,21,.92),rgba(20,11,21,.78));\r\n  backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);',
    '  background:rgba(18,10,19,.98);');
rep('  background:linear-gradient(135deg,#FF4D6D,#8E0E2E);\r\n  display:flex;align-items:center;justify-content:center;\r\n  font-size:1.3rem;color:#fff;box-shadow:0 4px 14px rgba(255,77,109,.4);',
    '  background:var(--ink-rose);\r\n  display:flex;align-items:center;justify-content:center;\r\n  font-size:1.3rem;color:#fff;');
rep('  background:linear-gradient(135deg,#FF4D6D,#8E0E2E);border-color:transparent;color:#fff;\r\n  box-shadow:0 4px 14px rgba(255,77,109,.35);',
    '  background:var(--ink-rose);border-color:transparent;color:#fff;');
rep('  display:flex;width:100%;background:rgba(20,11,21,.94);\r\n  backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);',
    '  display:flex;width:100%;background:rgba(18,10,19,.99);');
rep('.sheet-mask{display:none;position:fixed;inset:0;background:rgba(10,4,12,.66);backdrop-filter:blur(4px);-w',
    '.sheet-mask{display:none;position:fixed;inset:0;background:rgba(10,4,12,.72);-w');
rep('  background:rgba(10,5,12,.66);backdrop-filter:blur(3px);', '  background:rgba(10,5,12,.78);');

/* ---------- surfaces: flat ink ---------- */
rep('  background:linear-gradient(135deg,var(--card),var(--card-2));border:1px solid var(--line);\r\n  border-left:5px solid var(--rose);border-radius:14px;padding:18px 20px;box-shadow:var(--shadow);',
    '  background:var(--card);border:1px solid var(--line);\r\n  border-left:3px solid var(--ink-rose);border-radius:6px;padding:18px 20px;box-shadow:none;');
rep('  background:linear-gradient(150deg,var(--card-2) 0%,#2B1A2E 100%);', '  background:var(--card-2);');
rep('.traps{background:linear-gradient(135deg,#2E0A14,#3D0E1C);color:#F7D7DE;border:1px solid rgba(255,107,133',
    '.traps{background:#240910;color:#F7D7DE;border:1px solid rgba(255,107,133');
rep('  background:linear-gradient(155deg,var(--rose-deep),var(--rose) 55%,var(--gold));color:#fff;padding:30px 2',
    '  background:#8E0E2E;border:1px solid rgba(232,185,106,.5);color:#fff;padding:30px 2');
rep('.bio .btag{background:rgba(255,255,255,.16);backdrop-filter:blur(4px);padding:6px 12px;border-radius:999p',
    '.bio .btag{background:rgba(255,255,255,.14);padding:6px 12px;border-radius:999p');
rep('  margin-top:16px;background:linear-gradient(135deg,rgba(255,77,109,.10),rgba(232,185,106,.07));',
    '  margin-top:16px;background:rgba(255,77,109,.07);');
rep('  background:linear-gradient(150deg,rgba(255,77,109,.10),rgba(232,185,106,.06));',
    '  background:rgba(255,77,109,.07);');
rep('.syn{margin-top:20px;background:linear-gradient(135deg,rgba(255,77,109,.06),rgba(232,185,106,.05));border',
    '.syn{margin-top:20px;background:rgba(255,77,109,.05);border');
rep('.best-draft{background:linear-gradient(135deg,rgba(255,77,109,.08),rgba(232,185,106,.06));border:1.5px so',
    '.best-draft{background:rgba(255,77,109,.06);border:1.5px so');
rep('    radial-gradient(120% 80% at 50% -10%, rgba(255,77,109,.22), transparent 55%),\r\n    radial-gradient(90% 60% at 90% 110%, rgba(232,185,106,.12), transparent 55%),\r\n    linear-gradient(170deg,#1B0F1F 0%,#140B15 60%,#190D1A 100%);',
    '    linear-gradient(178deg,#1A0E1D 0%,#150B16 100%);');
rep('  background:radial-gradient(700px 420px at 50% 42%, rgba(255,77,109,.16), rgba(20,11,21,.97) 70%);',
    '  background:rgba(16,9,17,.97);');
rep("background:linear-gradient(135deg,#E8384F,#B3123A);color:#fff;padding:12px 24px;border-radius:999px;font-weight:700;font-size:.88rem;box-shadow:0 10px 30px rgba(179,18,58,.4)",
    "background:#8E0E2E;border:1px solid rgba(232,185,106,.4);color:#fff;padding:12px 24px;border-radius:4px;font-weight:700;font-size:.88rem;box-shadow:none");
rep('.face.front .icon{font-size:3rem;margin-bottom:14px;filter:drop-shadow(0 4px 14px rgba(255,77,109,.5))}',
    '.face.front .icon{font-size:2.6rem;margin-bottom:14px;color:var(--rose-deep)}');
rep('.face.front::after{content:"";position:absolute;inset:0;background:\r\n  radial-gradient(340px 180px at 100% 0%,rgba(255,77,109,.16),transparent 60%);pointer-events:none}',
    '.face.front::after{content:"";position:absolute;left:14px;right:14px;bottom:12px;height:1px;background:rgba(232,185,106,.25);pointer-events:none}');
rep('.soc-art svg{width:64px;height:64px;filter:drop-shadow(0 6px 18px rgba(255,77,109,.45))}',
    '.soc-art svg{width:64px;height:64px}');
rep('.soc-medal{\r\n  margin:8px auto 12px;width:72px;height:72px;border-radius:50%;\r\n  border:1px solid rgba(232,185,106,.45);display:flex;align-items:center;justify-content:center;\r\n  font-size:1.9rem;color:var(--gold);line-height:1;\r\n  background:radial-gradient(circle at 50% 35%, rgba(255,77,109,.20), rgba(255,77,109,0) 72%);\r\n}',
    '.soc-medal{\r\n  margin:8px auto 12px;width:72px;height:72px;border-radius:50%;\r\n  border:1px solid rgba(232,185,106,.45);display:flex;align-items:center;justify-content:center;\r\n  font-size:1.9rem;color:var(--gold);line-height:1;background:transparent;\r\n}');

/* ---------- monochrome dingbat system ---------- */
const G = [
    ["'⚖️ Your Words ⚖️'", "'\\u2696\\uFE0E Your Words \\u2696\\uFE0E'"],
    ["'🧭 Deeper Pull 🧭'", "'\\u2726 Deeper Pull \\u2726'"],
    ["'🚦 Flags '", "'\\u2691 Flags \\u2691'"],
    ["'✨ Moves ✨'", "'\\u2727 Moves \\u2727'"],
    ["'⚠️ Traps ⚠️'", "'\\u26A0\\uFE0E Traps \\u26A0\\uFE0E'"],
    ["'✍️ Bio Writer ✍️'", "'\\u270E Bio Writer \\u270E'"],
    ["'🔐 Share 🔐'", "'\\u2709\\uFE0E Share \\u2709\\uFE0E'"],
    ["'📸 Bio Card '", "'\\u274F Bio Card \\u274F'"],
    ["'🖼️ Social Cards 🖼️'", "'\\u2750 Social Cards \\u2750'"],
    ['<span class="dot">⚖️</span>', '<span class="dot">\\u2696\\uFE0E</span>'.replace('\\u2696\\uFE0E','⚖︎')],
    ['<span class="dot">🧭</span>', '<span class="dot">✦</span>'],
    ['<span class="dot">🚦</span>', '<span class="dot">⚑</span>'],
    ['<span class="dot">✨</span>', '<span class="dot">✧</span>'],
    ['<span class="dot">⚠️</span>', '<span class="dot">⚠︎</span>'],
    ['<span class="dot">✍️</span>', '<span class="dot">✎</span>'],
    ['<span class="dot">🔐</span>', '<span class="dot">✉︎</span>'],
    ['<span class="dot">📸</span>', '<span class="dot">❏</span>'],
    ['<span class="dot">🖼️</span>', '<span class="dot">❐</span>'],
    ['<span class="dot">🔓</span>', '<span class="dot">❍</span>'],
    ['<span class="dot" style="font-size:1.3rem">✨</span>', '<span class="dot" style="font-size:1.3rem">✧</span>'],
    ['<span class="ico">📚</span>', '<span class="ico">❏</span>'],
    ['<span class="ico"> 📸</span>', '<span class="ico">❏</span>'],
    ['<h4>🟢 Green flags you give 🟢</h4>', '<h4><span style="color:var(--green)">●</span> Green flags you give <span style="color:var(--green)">●</span></h4>'],
    ['<h4>🟡 Watch-points </h4>', '<h4><span style="color:var(--yellow)">●</span> Watch-points <span style="color:var(--yellow)">●</span></h4>'],
    ['(universal: about them, not you)</span> 🔴</h4>', '(universal: about them, not you)</span> <span style="color:var(--red)">●</span></h4>'],
    ['<h4>🔴 Leave if you see', '<h4><span style="color:var(--red)">●</span> Leave if you see'],
    ["<h3>🕳️ Don't fall for these", "<h3>⚠︎ Don't fall for these"],
    ['</span> 🕳️</h3>', '</span> ⚠︎</h3>'],
    ['>📋 Copy bio 📋</button>', '>❐ Copy bio ❐</button>'],
    ['>✍️ More versions ✍️</button>', '>✎ More versions ✎</button>'],
    ['>✍️ Built by your Bio Writer ✍️</a>', '>✎ Built by your Bio Writer ✎</a>'],
    ['>⚡ Punchy </button>', '>⚡︎ Punchy ⚡︎</button>'],
    ['>😄 Playful 😄</button>', '>☺︎ Playful ☺︎</button>'],
    ['>💗 Sincere 💗</button>', '>♥ Sincere ♥</button>'],
    ['>🔥 Bold </button>', '>✦ Bold ✦</button>'],
    ["<summary>👀 What they'll see 👀", "<summary>◉ What they'll see ◉"],
    ['>🔗 Copy share link</button>', '>✉︎ Copy share link ✉︎</button>'],
    ["accEl.textContent = '⛔ Not computed ';", "accEl.textContent = '\\u2715 Not computed \\u2715';"],
    ["accEl.textContent = '🎯 Exact chart ';", "accEl.textContent = '\\u25CE Exact chart \\u25CE';"],
    ["accEl.textContent = '🔓 Partial, ' + locked + ' locked 🔓';", "accEl.textContent = '\\u25D0 Partial, ' + locked + ' locked \\u25D0';"],
    ["accEl.textContent = '🎯 Exact (date only) 🎯';", "accEl.textContent = '\\u25CE Exact (date only) \\u25CE';"],
    ["'<span class=\"est\">🔒 exact details needed 🔒</span>'", "'<span class=\"est\">\\u25CC exact details needed \\u25CC</span>'"],
    ['>🔒 withheld </span>', '>\\u25CC withheld \\u25CC</span>'],
    ['>🔍 <b>Honest scope:</b>', '>\\u25CE <b>Honest scope:</b>'],
    ['made-up average. 🔍</p>', 'made-up average. \\u25CE</p>'],
    ['<p class="intent-note">⚖️ <b>', '<p class="intent-note">\\u2696\\uFE0E <b>'],
    ['month three. ⚖️</p>', 'month three. \\u2696\\uFE0E</p>'],
    ['<p class="intent-note">💬 One of you', '<p class="intent-note">\\u25CB One of you'],
    ['on this page. 💬</p>', 'on this page. \\u25CB</p>'],
    ['<p class="caveat">🔒 No birth date', '<p class="caveat">\\u25CC No birth date'],
    ['not a sentence. 🔒</p>', 'not a sentence. \\u25CC</p>'],
    ['<p class="lib-note">🔒 <b>On-device only', '<p class="lib-note">\\u25CC <b>On-device only'],
    ['lives on a server. 🔒</p>', 'lives on a server. \\u25CC</p>'],
    ["'<div class=\"ax-label\">\\u26A1 Contact</div>'", "'<div class=\"ax-label\">\\u26A1\\uFE0E Contact</div>'"],
    ["'<div class=\"ax-label\">🕊 Ease</div>'", "'<div class=\"ax-label\">\\u2727 Ease</div>'"],
    ["toast('Fresh version \\u2728');", "toast('\\u2726 Fresh version \\u2726');"],
    ["cardFor('flags'", "cardFor('flags'"],
    ["glyph:'🚦', label:'The Honest Part'", "glyph:'\\u2691', label:'The Honest Part'"],
    ['<div class="soc-hint">💛 Screenshot any card.', '<div class="soc-hint"><span style="color:var(--gold)">♥</span> Screenshot any card.'],
    ['legible at thumbnail size. 💛</div>', 'legible at thumbnail size. <span style="color:var(--gold)">♥</span></div>'],
    ['>\\u270D\\uFE0F Write my bio \\u270D\\uFE0F</button>', '>\\u270E Write my bio \\u270E</button>'],
    ['>\\uD83D\\uDCF8 Grab a card \\uD83D\\uDCF8</button>', '>\\u274F Grab a card \\u274F</button>'],
    ['>\\uD83D\\uDD10 Share privately \\uD83D\\uDD10</button>', '>\\u2709\\uFE0E Share privately \\u2709\\uFE0E</button>'],
    ['<b>Venus</b> (how you love)', '<b>Venus</b> (how you love)']
];
G.forEach(p => rep(p[0], p[1], p[0]));

fs.writeFileSync(FILE, src, 'utf8');
console.log('  de-slop replacements: ' + ok);
if (misses.length) { console.log('  MISSES (' + misses.length + '):'); misses.forEach(m => console.log('    - ' + m)); }
else console.log('  MISSES: none');
