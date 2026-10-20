// ============================================================
// LOVE BLUEPRINT — poetry pass, part 2 (CRLF-tolerant fixes)
// The first pass missed 11 multi-line patterns because the file
// uses CRLF. This repairs them with regex that tolerates any EOL.
// Run: node tests/poetry-pass2.cjs
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

/* details.why summary: centre + keep wrapping */
repRe(/details\.why summary\{\r?\n[^\r\n]*\r?\n[^\r\n]*gap:8px;user-select:none;\r?\n\}/g,
    'details.why summary{\r\n  cursor:pointer;list-style:none;font-weight:700;font-size:.82rem;color:var(--rose-deep);\r\n  display:flex;align-items:center;justify-content:center;gap:8px;user-select:none;text-align:center;\r\n}',
    'details.why summary');

/* spark-badge: centre it (flex row -> centred) */
repRe(/\.spark-badge\{\r?\n\s*display:flex;flex-wrap:wrap;align-items:center;gap:14px;/,
    '.spark-badge{\r\n  display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:14px;text-align:center;',
    'spark-badge');

/* soc-label: CRLF-tolerant */
repRe(/\.soc-label\{\r?\n\s*font-size:\.58rem;letter-spacing:\.14em;text-transform:uppercase;font-weight:800;\r?\n\s*color:var\(--gold\);display:flex;align-items:center;gap:5px;\r?\n\}/,
    '.soc-label{\r\n  font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;font-weight:800;\r\n  color:var(--gold);display:flex;align-items:center;justify-content:center;gap:5px;text-align:center;\r\n}',
    'soc-label');

/* soc-points li: centred flex with mirrored hearts */
repRe(/\.soc-points li\{\r?\n\s*color:#EEDDE4;font-size:\.68rem;line-height:1\.45;margin-bottom:5px;\r?\n\s*padding-left:14px;position:relative;overflow:hidden;\r?\n\}/,
    '.soc-points li{\r\n  color:#EEDDE4;font-size:.68rem;line-height:1.45;margin-bottom:5px;overflow:hidden;\r\n  display:flex;align-items:baseline;justify-content:center;gap:6px;text-align:center;\r\n}',
    'soc-points li');

/* soc.clamped li keeps its webkit box but centred */
repRe(/\.soc\.clamped \.soc-points li\{\r?\n\s*display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;\r?\n\}/,
    '.soc.clamped .soc-points li{\r\n  display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;text-align:center;\r\n}',
    'soc.clamped li');

/* soc-points li heart pseudo mirror */
repRe(/\.soc-points li::before\{content:"\\2665";position:absolute;left:0;color:var\(--rose\);font-size:\.6rem\}/,
    '.soc-points li::before{content:"\\2665";color:var(--rose);font-size:.6rem;flex:none}\r\n.soc-points li::after{content:"\\2665";color:var(--rose);font-size:.6rem;flex:none}',
    'soc hearts mirror');

/* OG + Twitter meta titles: the em-dash variant */
repRe(/content="Love Blueprint \u2014 Your Cosmic Dating Decoder"/g,
    'content="Love Blueprint \u2014 Your Love Story, Read From the Real Sky"',
    'meta titles');

/* hero H1 tagline (first pass may have replaced description only) */
repRe(/<h1>Your Cosmic Dating Decoder<\/h1>/,
    '<h1>Your love story, read from the real sky</h1>',
    'h1');

/* spark badge trailing mirror glyph (accText sibling close in badge) */
repRe(/<div class="cap" id="accText" style="margin-top:6px;font-size:\.8rem"><\/div>\r?\n(\s*)<\/div>\r?\n(\s*)<\/div>\r?\n(\s*)<\/div>\r?\n\r?\n(\s*)<!-- FLIP CARDS -->/,
    '<div class="cap" id="accText" style="margin-top:6px;font-size:.8rem"></div>\r\n$1</div>\r\n$2<span class="glyph beat" aria-hidden="true">\u2764</span>\r\n$3</div>\r\n\r\n$4<!-- FLIP CARDS -->',
    'spark badge mirror glyph');

/* partner-view badge mirror glyph */
repRe(/<div class="cap" id="pvIntent" style="margin-top:8px;display:none"><span class="pill intent"><\/span><\/div>\r?\n(\s*)<\/div>\r?\n(\s*)<\/div>/,
    '<div class="cap" id="pvIntent" style="margin-top:8px;display:none"><span class="pill intent"></span></div>\r\n$1</div>\r\n$2<span class="glyph beat" aria-hidden="true">\u2665</span>\r\n$2</div>',
    'pv badge mirror glyph');

/* resume bar mirror heart */
repRe(/<div class="resume-s" id="resumeSub">\u2014<\/div>\r?\n(\s*)<\/div>\r?\n(\s*)<button class="resume-go"/,
    '<div class="resume-s" id="resumeSub">\u2014</div>\r\n$1</div>\r\n$1<span class="resume-ico beat" aria-hidden="true">\u2665</span>\r\n$2<button class="resume-go"',
    'resume mirror heart');

/* social card footer: mirror the heart around the CTA (JS string lives in index) */
repRe(/'<span class="soc-footrow"><span class="soc-h">' \+ '\\u2665' \+ '<\/span>' \+\r?\n(\s*)'<span class="soc-cta">decode yours<\/span><\/span><\/div>';/,
    '\'<span class="soc-footrow"><span class="soc-h">\' + \'\\u2665\' + \'</span>\' +\r\n$1\'<span class="soc-cta">decode yours</span><span class="soc-h">\' + \'\\u2665\' + \'</span></span></div>\';',
    'soc footer mirror');

fs.writeFileSync(FILE, src, 'utf8');
console.log('  part-2 replacements applied: ' + ok);
if (misses.length) { console.log('  MISSES:'); misses.forEach(m => console.log('    - ' + m)); }
else console.log('  MISSES: none');
