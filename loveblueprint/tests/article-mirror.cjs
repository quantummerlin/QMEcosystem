// ============================================================
// LOVE BLUEPRINT — article headings polish pass
// 1. h2/h3/h4 with a leading-only emoji get it mirrored at the end.
// 2. " . " separator artifact from the de-AI pass inside headings
//    becomes a clean ": ".
// Skips prose paragraphs; only touches heading + CTA button text.
// Run: node tests/article-mirror.cjs
// ============================================================
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const FILES = [
    'articles/index.html',
    'articles/venus-sign-dating-style/index.html',
    'articles/astrology-compatibility-guide/index.html',
    'articles/dating-app-bio-ideas/index.html'
];

const EMOJI_RE = '(?:[\u2600-\u27BF]|[\uD83C-\uDBFF][\uDC00-\uDFFF]|\uFE0F)';

let total = 0;
FILES.forEach(f => {
    const full = path.join(ROOT, f);
    let src = fs.readFileSync(full, 'utf8');
    let n = 0;

    // headings: replace " . " artifact and mirror a leading-only emoji
    src = src.replace(/<h([234])>([\s\S]*?)<\/h\1>/g, (m, lvl, inner) => {
        let out = inner;
        // " . " separator artifact -> ": "
        out = out.replace(/ \. /g, ': ');
        // count emojis outside tags
        const stripTags = out.replace(/<[^>]*>/g, '');
        const emojis = stripTags.match(new RegExp(EMOJI_RE, 'g')) || [];
        const lead = stripTags.match(new RegExp('^\\s*(' + EMOJI_RE + '+)'));
        const trail = stripTags.match(new RegExp('(' + EMOJI_RE + '+)\\s*$'));
        if (emojis.length && lead && !trail) {
            // leading emoji only -> mirror at the end (before closing tag)
            out = out.replace(/(<[^>]+>\s*)?$/, '') ; // no-op guard
            out = out + ' ' + lead[1];
            n++;
        }
        return '<h' + lvl + '>' + out + '</h' + lvl + '>';
    });

    // CTA buttons: mirror lone hearts/sparkles in btn text
    src = src.replace(/(class="(?:btn-primary|header-cta)"[^>]*>)([^<]+)(<\/[ab]>)/g, (m, a, txt, c) => {
        const emojis = txt.match(new RegExp(EMOJI_RE, 'g')) || [];
        const lead = txt.match(new RegExp('^\\s*(' + EMOJI_RE + '+)'));
        const trail = txt.match(new RegExp('(' + EMOJI_RE + '+)\\s*(?:\u2192)?\\s*$'));
        if (emojis.length && lead && !trail) { n++; return a + txt + ' ' + lead[1] + c; }
        if (emojis.length && trail && !lead) { n++; return a + trail[1] + ' ' + txt + c; }
        return m;
    });

    if (n) { fs.writeFileSync(full, src, 'utf8'); }
    total += n;
    console.log('  ' + f + ': ' + n + ' headings/CTAs mirrored');
});
console.log('total: ' + total);
