// ============================================================
// LOVE BLUEPRINT — synastry labels: drop escaped emoji
// synastry.js stores labels as ESCAPED text ("\uD83D\uDD25"),
// so these must be matched as backslash-u source text, not as
// the decoded characters. The UI maps dim.key -> custom SVG.
// Run once: node tests/icons-synastry.cjs
// ============================================================
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'synastry.js');
let syn = fs.readFileSync(FILE, 'utf8');
let n = 0;
const B = '\\'; // one literal backslash
[
    ["label: '" + B + "uD83D" + B + "uDD25 Chemistry'",               "label: 'Chemistry'"],
    ["label: '" + B + "uD83D" + B + "uDEE1" + B + "uFE0F Emotional safety'", "label: 'Emotional safety'"],
    ["label: '" + B + "uD83D" + B + "uDCAC Communication'",           "label: 'Communication'"],
    ["label: '" + B + "u23F3 Staying power'",                          "label: 'Staying power'"]
].forEach(p => {
    if (syn.includes(p[0])) { syn = syn.split(p[0]).join(p[1]); n++; }
    else console.log('  MISS: ' + p[0]);
});
fs.writeFileSync(FILE, syn, 'utf8');
console.log('  synastry labels cleaned: ' + n + '/4');
