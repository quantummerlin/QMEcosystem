// ============================================================
// LOVE BLUEPRINT — last four glyph leaks (exact source text)
// Run once: node tests/icons-leaks.cjs
// ============================================================
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'index.html');
let src = fs.readFileSync(FILE, 'utf8');
let ok = 0; const misses = [];
function rep(from, to, label) {
    const n = src.split(from).length - 1;
    if (!n) { misses.push(label); return; }
    src = src.split(from).join(to); ok += n;
}
const B = '\\';   // one literal backslash in the SOURCE text

// 1. synastry button label is re-set by the handler (twice)
rep("btn.textContent = 'Run full synastry " + B + "u2665';",
    "btn.innerHTML = LBIcon('heart') + ' Run full synastry ' + LBIcon('heart');", 'synRunBtn reset');

// 2. synastry axis labels
rep('<div class="ax-label">' + B + 'u26A1' + B + 'uFE0E Contact</div>', '<div class="ax-label">\' + LBIcon(\'bolt\') + \' Contact</div>', 'ax contact');
rep('<div class="ax-label">' + B + 'u2727 Ease</div>', '<div class="ax-label">\' + LBIcon(\'sparkle\') + \' Ease</div>', 'ax ease');

// 3. trailing glyph on the "different things" note
rep("in month three. " + B + "u2696" + B + "uFE0E</p>", "in month three. ' + LBIcon('scales') + '</p>", 'diff note tail');
// the same line may end with a literal scales + VS15 instead
rep("month three. \u2696\uFE0E</p>", "month three. ' + LBIcon('scales') + '</p>", 'diff note tail literal');

fs.writeFileSync(FILE, src, 'utf8');
console.log('  replacements: ' + ok);
console.log('  MISSES (' + misses.length + '):'); misses.forEach(m => console.log('    - ' + m));
