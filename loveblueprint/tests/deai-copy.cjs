// ============================================================
// LOVE BLUEPRINT — de-AI copy pass (local build tool)
// ------------------------------------------------------------
// Rewrites the AI tells out of user-facing copy WITHOUT touching
// meaning. Em dashes go first (393 across the product), then the
// serial comma where it is genuinely a list.
//
// RULES (order matters):
//  R1 parenthetical pair   "x — a, b, c — y"      -> "x, a, b, c, y"
//  R2 dash + conjunction   " — and|but|not|..."    -> ", and|but|not|..."
//  R3 dash + gerund        " — remembering ..."    -> ": remembering ..."
//  R4 dash + clause        " — you give warmth"    -> ". You give warmth"
//  R5 dash + lowercase     " — direct, enthus..."  -> ": direct, enthus..."
//  R6 dash + Uppercase     " — Boredom is ..."     -> ". Boredom is ..."
//  R7 serial comma         "a, b, and c"           -> "a, b and c"
//     (only when a real list: two commas before the and/or)
//
// Nothing here changes data, keys, or structure. The content
// completeness gate in test-runtime.cjs catches any breakage.
//
// Run:  node tests/deai-copy.cjs            (apply + report)
//       node tests/deai-copy.cjs --dry      (report only)
// ============================================================

const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry');
const EM = '\u2014';
const ROOT = path.join(__dirname, '..');

const FILES = [
    'index.html',
    'dating-content.js',
    'spark-runtime.js',
    'synastry.js',
    'articles/index.html',
    'articles/venus-sign-dating-style/index.html',
    'articles/astrology-compatibility-guide/index.html',
    'articles/dating-app-bio-ideas/index.html'
];

const CONJ = ['and', 'but', 'not', 'or', 'so', 'yet', 'while', 'because', 'which', 'who', 'where'];
const PRON = ['you', 'they', 'it', 'we', 'he', 'she', 'there', 'people', 'your', 'their', 'no one', 'someone', 'everyone'];

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function deDash(text) {
    let t = text;

    // R1 parenthetical pair: " — ... — " with no dash inside
    t = t.replace(new RegExp(' ' + EM + ' ([^' + EM + '\\n]{2,70}?) ' + EM + ' ', 'g'), ', $1, ');

    // R2 dash + conjunction -> comma + conjunction
    CONJ.forEach(c => {
        t = t.split(' ' + EM + ' ' + c + ' ').join(', ' + c + ' ');
    });

    // R3 dash + gerund -> colon
    t = t.replace(new RegExp(' ' + EM + ' ([a-z][a-z\']{2,}ing\\b)', 'g'), ': $1');

    // R4 dash + pronoun-led clause -> period
    t = t.replace(new RegExp(' ' + EM + ' (' + PRON.join('|') + ')\\b', 'g'), function (m, p) {
        return '. ' + cap(p);
    });

    // R6 dash + Uppercase -> period (capital already there)
    t = t.split(' ' + EM + ' ').join(' \x00 '); // placeholder for R5/R6 split
    t = t.replace(/\x00 ([A-Z])/g, '. $1');

    // R5 remaining dash + lowercase -> colon
    t = t.replace(/\x00 ([a-z0-9])/g, ': $1');
    t = t.split('\x00 ').join(' '); // any leftover (e.g. before punctuation)

    return t;
}

function deOxford(text) {
    // only inside real lists: "a, b, and c" -> "a, b and c"
    let t = text.replace(/([^,.\n;:]{2,40}), ([^,.\n;:]{2,40}), and /g, '$1, $2 and ');
    t = t.replace(/([^,.\n;:]{2,40}), ([^,.\n;:]{2,40}), or /g, '$1, $2 or ');
    return t;
}

let totalEmBefore = 0, totalEmAfter = 0, totalOx = 0;
const samples = [];

FILES.forEach(f => {
    const full = path.join(ROOT, f);
    const src = fs.readFileSync(full, 'utf8');
    const emBefore = (src.match(new RegExp(EM, 'g')) || []).length;
    let out = deDash(src);
    const emMid = (out.match(new RegExp(EM, 'g')) || []).length;
    out = deOxford(out);
    const emAfter = (out.match(new RegExp(EM, 'g')) || []).length;

    totalEmBefore += emBefore;
    totalEmAfter += emAfter;

    if (!DRY && out !== src) fs.writeFileSync(full, out, 'utf8');

    // collect a few changed sentences for the human read-through
    const a = src.split(/(?<=[.!?])\s+/);
    const b = out.split(/(?<=[.!?])\s+/);
    console.log('  ' + f + ': em ' + emBefore + ' -> ' + emAfter);
});

console.log('\nTOTAL em dashes: ' + totalEmBefore + ' -> ' + totalEmAfter);
console.log(DRY ? '(dry run: nothing written)' : '(written)');
