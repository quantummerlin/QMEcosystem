// ============================================================
// LOVE BLUEPRINT — collapse the " : " artifacts left by the
// de-AI pass (R3/R5 turned em dashes into " : "). Collapses to
// a normal colon while protecting ternaries (? a : b) via a
// variable-length lookbehind: skip when a "?" precedes on the
// same line with no colon between.
// Run: node tests/fix-colons.cjs
// ============================================================
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const FILES = [
    'index.html', 'dating-content.js', 'spark-runtime.js', 'synastry.js',
    'articles/index.html',
    'articles/venus-sign-dating-style/index.html',
    'articles/astrology-compatibility-guide/index.html',
    'articles/dating-app-bio-ideas/index.html'
];

// not preceded by "?" with no colon between (ternary guard)
const RE = /(?<!\?[^\n:]{0,200})([A-Za-z0-9)\]']) : ([a-z0-9(])/g;

FILES.forEach(f => {
    const full = path.join(ROOT, f);
    const src = fs.readFileSync(full, 'utf8');
    const n = (src.match(RE) || []).length;
    const out = src.replace(RE, '$1: $2');
    if (out !== src) fs.writeFileSync(full, out, 'utf8');
    console.log('  ' + f + ': collapsed ' + n);
});
