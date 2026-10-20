// ============================================================
// LOVE BLUEPRINT — done card + onboarding list + synastry caveat
// Source text uses ESCAPED sequences, so these are matched as
// backslash-u text. CSS ::before/::after cannot hold SVG, so the
// onboarding list hearts become real <span data-icon> elements.
// Run once: node tests/icons-last.cjs
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
const B = '\\';
const LBJ = (n) => "' + LBIcon('" + n + "') + '";

// done card (JS string, single-quoted)
rep('data-done="bioWriterSection">' + B + 'u270E Write my bio ' + B + 'u270E</button>',
    'data-done="bioWriterSection">' + LBJ('pen') + ' Write my bio ' + LBJ('pen') + '</button>', 'done bio');
rep('data-done="socialSection">' + B + 'u274F Grab a card ' + B + 'u274F</button>',
    'data-done="socialSection">' + LBJ('cardId') + ' Grab a card ' + LBJ('cardId') + '</button>', 'done card');
rep('data-done="shareSection">' + B + 'u2709' + B + 'uFE0E Share privately ' + B + 'u2709' + B + 'uFE0E</button>',
    'data-done="shareSection">' + LBJ('envelope') + ' Share privately ' + LBJ('envelope') + '</button>', 'done share');

// synastry caveat: escaped lock + scales emoji mid-sentence
rep(B + 'uD83D' + B + 'uDD12 Their birth details were used', LBJ('lock') + ' Their birth details were used', 'caveat lock');
rep('in any link. ' + B + 'u2696' + B + 'uFE0F Two humans are more than their degrees',
    'in any link. ' + LBJ('scales') + ' Two humans are more than their degrees', 'caveat scales');
rep('Not stored, not in any link. ' + B + 'u2696' + B + 'uFE0F Two humans', 'Not stored, not in any link. ' + LBJ('scales') + ' Two humans', 'caveat scales b');

// onboarding list: CSS pseudo hearts -> real icon elements
rep('.onboard-list li::before{content:"' + B + '2665 ";color:var(--rose);font-size:.7rem}\r\n', '', 'css before');
rep('.onboard-list li::after{content:" ' + B + '2665";color:var(--rose);font-size:.7rem}\r\n', '', 'css after');
const items = [
    ['<b>Love Signature.</b>'], ['<b>Your Words vs Your Chart.</b>'], ['<b>The Deeper Pull.</b>'],
    ['<b>Flags, Moves, Traps.</b>'], ['<b>Bio Writer + cards.</b>']
];
items.forEach(([lead]) => {
    rep('<li>' + lead, '<li><span class="ob-h" data-icon="heart"></span>' + lead, 'ob li ' + lead);
});
// trailing heart after each item's closing text
src = src.replace(/(<li><span class="ob-h" data-icon="heart"><\/span><b>[^<]+<\/b>[^<]*)<\/li>/g,
    (m, inner) => inner + ' <span class="ob-h" data-icon="heart"></span></li>');
rep('.onboard-list li b{color:var(--rose-deep)}',
    '.onboard-list li b{color:var(--rose-deep)}\r\n.onboard-list .ob-h{display:inline-flex;color:var(--rose);vertical-align:middle}\r\n.onboard-list .ob-h .ic{width:.8em;height:.8em}', 'ob css');

fs.writeFileSync(FILE, src, 'utf8');
console.log('  replacements: ' + ok);
console.log('  MISSES (' + misses.length + '):'); misses.forEach(m => console.log('    - ' + m));
