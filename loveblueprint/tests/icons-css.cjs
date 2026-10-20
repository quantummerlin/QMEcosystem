// ============================================================
// LOVE BLUEPRINT — CSS-pseudo glyphs -> custom SVG data-URIs
// content:"✓" etc. render in whatever OS font. CSS can't embed
// inline <svg>, but content:url(data:image/svg+xml,...) can, so
// every list marker uses the SAME hand-drawn strokes as icons.js.
// Colour is baked per use (data-URI cannot inherit currentColor).
// Run once: node tests/icons-css.cjs
// ============================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const FILE = path.join(__dirname, '..', 'index.html');
let src = fs.readFileSync(FILE, 'utf8');

// pull the real path data from icons.js so CSS and JS never drift
const sb = { window: {} }; sb.globalThis = sb.window; vm.createContext(sb);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'icons.js'), 'utf8'), sb);
const I = sb.window.LBIcons;

const COLORS = {
    green: '%237BC48A', yellow: '%23E0B64A', red: '%23FF7B6B', rose: '%23FF4D6D',
    roseSoft: '%23FF6B85', gold: '%23E8B96A', muted: '%23B79AA5'
};
function uri(name, colorKey, sw) {
    const body = I[name].replace(/"/g, "'").replace(/#/g, '%23').replace(/</g, '%3C').replace(/>/g, '%3E');
    return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'' +
        COLORS[colorKey] + '\' stroke-width=\'' + (sw || 2) + '\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E' + body + '%3C/svg%3E")';
}
// exclamation (yellow watch-point) is not in icons.js: draw it here
const BANG = "%3Cpath d='M12 5v8.2'/%3E%3Ccircle cx='12' cy='18.2' r='1' fill='%23E0B64A' stroke='none'/%3E";
const bangUri = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23E0B64A\' stroke-width=\'2.4\' stroke-linecap=\'round\'%3E' + BANG + '%3C/svg%3E")';

let ok = 0; const misses = [];
function rep(from, to, label) {
    const n = src.split(from).length - 1;
    if (!n) { misses.push(label); return; }
    src = src.split(from).join(to); ok += n;
}
const MARK = 'width:.95em;height:.95em;display:inline-block;flex:none';
const cssMark = (sel, pseudo, u, extra) => sel + '::' + pseudo + '{content:' + u + ';' + MARK + (extra || '') + '}';

// flag lists
[['before', ''], ['after', ';margin-left:auto']].forEach(([p, x]) => {
    rep('.flag.g li::' + p + '{content:"\u2713";color:var(--green);font-weight:800;flex:none' + (p === 'after' ? ';margin-left:auto' : '') + '}',
        cssMark('.flag.g li', p, uri('check', 'green', 2.4), x), 'flag g ' + p);
    rep('.flag.y li::' + p + '{content:"!";color:var(--yellow);font-weight:800;flex:none' + (p === 'after' ? ';margin-left:auto' : '') + '}',
        cssMark('.flag.y li', p, bangUri, x), 'flag y ' + p);
    rep('.flag.r li::' + p + '{content:"\u2717";color:var(--red);font-weight:800;flex:none' + (p === 'after' ? ';margin-left:auto' : '') + '}',
        cssMark('.flag.r li', p, uri('xmark', 'red', 2.4), x), 'flag r ' + p);
    rep('.traps li::' + p + '{content:"\u2717";color:var(--rose-soft);font-weight:800;flex:none' + (p === 'after' ? ';margin-left:auto' : '') + '}',
        cssMark('.traps li', p, uri('xmark', 'roseSoft', 2.4), x), 'traps ' + p);
    rep('.promise.yes li::' + p + '{content:"\u2713";color:var(--green);font-weight:800;flex:none' + (p === 'after' ? ';margin-left:auto' : '') + '}',
        cssMark('.promise.yes li', p, uri('check', 'green', 2.4), x), 'promise yes ' + p);
    rep('.promise.no li::' + p + '{content:"\u2717";color:var(--red);font-weight:800;flex:none' + (p === 'after' ? ';margin-left:auto' : '') + '}',
        cssMark('.promise.no li', p, uri('xmark', 'red', 2.4), x), 'promise no ' + p);
});

// social card bullets + flagboxes
rep('.soc-points li::before{content:"\\2665";color:var(--rose);font-size:.6rem;flex:none}',
    '.soc-points li::before{content:' + uri('heart', 'rose', 2) + ';width:.62rem;height:.62rem;flex:none;display:inline-block;transform:translateY(.12em)}', 'soc bullets before');
rep('.soc-points li::after{content:"\\2665";color:var(--rose);font-size:.6rem;flex:none}',
    '.soc-points li::after{content:' + uri('heart', 'rose', 2) + ';width:.62rem;height:.62rem;flex:none;display:inline-block;transform:translateY(.12em)}', 'soc bullets after');
[['g', 'check', 'green'], ['r', 'xmark', 'roseSoft']].forEach(([k, n, c]) => {
    const old = k === 'g' ? '\\2713' : '\\2715';
    ['before', 'after'].forEach(p => {
        rep('.soc-flagbox.' + k + ' p::' + p + '{content:"' + old + '";color:var(--' + (k === 'g' ? 'green' : 'rose-soft') + ')}',
            '.soc-flagbox.' + k + ' p::' + p + '{content:' + uri(n, c, 2.4) + ';width:.6rem;height:.6rem;flex:none;display:inline-block}', 'soc flagbox ' + k + p);
    });
});
['before', 'after'].forEach(p => {
    rep('.soc-flagbox.y p::' + p + '{content:"!";color:var(--yellow)}',
        '.soc-flagbox.y p::' + p + '{content:' + bangUri + ';width:.6rem;height:.6rem;flex:none;display:inline-block}', 'soc flagbox y ' + p);
});

// big watermark hearts on the bio card + ring hearts on social cards
rep('.bio::before{content:"\u2665";position:absolute;top:-30px;right:-10px;font-size:180px;opacity:.10}',
    '.bio::before{content:' + uri('heart', 'rose', 1.2).replace(/%237BC48A|%23FF4D6D/, '%23FFFFFF') + ';position:absolute;top:-30px;right:-10px;width:180px;height:180px;opacity:.10}', 'bio watermark a');
rep('.bio::after{content:"\u2665";position:absolute;bottom:-40px;left:-14px;font-size:180px;opacity:.10;pointer-events:none}',
    '.bio::after{content:' + uri('heart', 'rose', 1.2).replace('%23FF4D6D', '%23FFFFFF') + ';position:absolute;bottom:-40px;left:-14px;width:180px;height:180px;opacity:.10;pointer-events:none}', 'bio watermark b');
rep('.soc-ring::before,.soc-ring::after{content:"\\2665";position:absolute;color:var(--rose);font-size:.7rem}',
    '.soc-ring::before,.soc-ring::after{content:' + uri('heart', 'rose', 2) + ';position:absolute;width:.7rem;height:.7rem}', 'soc ring');

// stanza divider ornament: replace the ❦ font glyph with a drawn flourish
const ORN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 12' fill='none' stroke='%23E8B96A' stroke-width='1.2' stroke-linecap='round'%3E%3Cpath d='M2 6h13M25 6h13'/%3E%3Cpath d='M20 9.6C16.6 7.2 15 5.6 15 4c0-1.2.9-2 2-2 1.1 0 2.2.7 3 1.7.8-1 1.9-1.7 3-1.7 1.1 0 2 .8 2 2 0 1.6-1.6 3.2-5 5.6Z' fill='%23E8B96A' stroke='none'/%3E%3C/svg%3E\")";
rep('content:"\\2766";position:absolute;top:-5px;left:50%;transform:translateX(-50%);\r\n  color:var(--gold);opacity:.45;font-size:.72rem;',
    'content:' + ORN + ';position:absolute;top:-6px;left:50%;transform:translateX(-50%);\r\n  width:40px;height:12px;opacity:.7;', 'stanza ornament');

fs.writeFileSync(FILE, src, 'utf8');
console.log('  css marker replacements: ' + ok);
console.log('  MISSES (' + misses.length + '):'); misses.forEach(m => console.log('    - ' + m));
