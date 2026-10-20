// ============================================================
// LOVE BLUEPRINT — de-slop pass, part 2 (miss repairs)
// Regex-robust fixes for the 16 patterns part 1 missed.
// Run: node tests/deslop2.cjs
// ============================================================
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'index.html');
let src = fs.readFileSync(FILE, 'utf8');
let ok = 0; const misses = [];
function repRe(re, to, label) {
    if (!re.test(src)) { misses.push(label); return; }
    src = src.replace(re, to); ok++;
}

/* flat buttons */
repRe(/\.btn2\.primary\{background:linear-gradient\(135deg,#FF4D6D,#8E0E2E\);color:#fff;box-shadow:0 6px 18px rgba\(255,77,109,\.\d+\)\}/,
    '.btn2.primary{background:var(--ink-rose);color:#fff}', 'btn2.primary');
repRe(/\.tone-seg button\.on\{background:linear-gradient\(135deg,#FF4D6D,#8E0E2E\);border-color:transparent;color:#fff;box-shadow:[^}]*\}/,
    '.tone-seg button.on{background:var(--ink-rose);border-color:transparent;color:#fff}', 'tone-seg');
repRe(/background:linear-gradient\(135deg,#E8384F,#B3123A\);color:#fff;padding:12px 24px;border-radius:999px;font-weight:700;font-size:\.88rem;box-shadow:0 10px 30px rgba\(179,18,58,\.4\)/,
    'background:#8E0E2E;border:1px solid rgba(232,185,106,.4);color:#fff;padding:12px 24px;border-radius:4px;font-weight:700;font-size:.88rem;box-shadow:none', 'toast css');

/* rail labels -> monochrome dingbats */
repRe(/label:'🚦 Flags 🚦'/, "label:'\\u2691 Flags \\u2691'", 'rail flags');
repRe(/label:'📸 Bio Card 📸'/, "label:'\\u274F Bio Card \\u274F'", 'rail bio');

/* bnav ico with stray space */
repRe(/<span class="ico">\s*📸<\/span>/, '<span class="ico">❏</span>', 'bnav bio ico');

/* flags headings (exact, no trailing space) */
repRe(/<h4>🟡 Watch-points 🟡<\/h4>/, '<h4><span style="color:var(--yellow)">●</span> Watch-points <span style="color:var(--yellow)">●</span></h4>', 'h4 yellow');
repRe(/>🔥 Bold 🔥<\/button>/, '>✦ Bold ✦</button>', 'btn bold');
repRe(/>⚡ Punchy ⚡<\/button>/, '>⚡︎ Punchy ⚡︎</button>', 'btn punchy');

/* flags card JS labels (call sites pass the title string) */
repRe(/flagCol\('g','🟢 /, "flagCol('g','<span style=\"color:var(--green)\">\u25CF</span> ", 'flagCol g');
repRe(/flagCol\('y','🟡 /, "flagCol('y','<span style=\"color:var(--yellow)\">\u25CF</span> ", 'flagCol y');
repRe(/flagCol\('r','🔴 /, "flagCol('r','<span style=\"color:var(--red)\">\u25CF</span> ", 'flagCol r');

/* accuracy badges -> monochrome */
repRe(/accEl\.textContent = '⛔ Not computed ⛔';/, "accEl.textContent = '\\u2715 Not computed \\u2715';", 'acc not');
repRe(/accEl\.textContent = '🎯 Exact chart 🎯';/, "accEl.textContent = '\\u25CE Exact chart \\u25CE';", 'acc exact');
repRe(/accEl\.textContent = '🎯 Exact \(date only\) 🎯';/, "accEl.textContent = '\\u25CE Exact (date only) \\u25CE';", 'acc dateonly');
repRe(/accEl\.textContent = '🔓 Partial, ' \+ locked \+ ' locked 🔓';/, "accEl.textContent = '\\u25D0 Partial, ' + locked + ' locked \\u25D0';", 'acc partial');

/* withheld badge */
repRe(/>🔒 withheld 🔒<\/span>/, '>\\u25CC withheld \\u25CC</span>', 'withheld');
repRe(/'<span class="est">🔒 exact details needed 🔒<\/span>'/, "'<span class=\"est\">\\u25CC exact details needed \\u25CC</span>'", 'est badge');

/* synastry axis labels */
repRe(/<div class="ax-label">\\u26A1 Contact<\/div>/, '<div class="ax-label">\\u26A1\\uFE0E Contact</div>', 'ax contact');
repRe(/<div class="ax-label">🕊 Ease<\/div>/, '<div class="ax-label">\\u2727 Ease</div>', 'ax ease');

/* fresh version toast */
repRe(/toast\('\\u2728 Fresh version \\u2728'\);/, "toast('\\u2726 Fresh version \\u2726');", 'fresh toast');

/* social flags card glyph */
repRe(/glyph:'🚦', label:'The Honest Part'/, "glyph:'\\u2691', label:'The Honest Part'", 'soc flags glyph');

fs.writeFileSync(FILE, src, 'utf8');
console.log('  part-2 replacements: ' + ok);
if (misses.length) { console.log('  MISSES:'); misses.forEach(m => console.log('    - ' + m)); }
else console.log('  MISSES: none');
