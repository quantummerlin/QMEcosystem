// ============================================================
// LOVE BLUEPRINT — icon migration, final exact-byte cleanup
// Targets taken verbatim from tests/_verify-glyphs.cjs output.
// Plain string replacement only (no replace-callbacks).
// Run once: node tests/icons-final.cjs
// ============================================================
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'index.html');
let src = fs.readFileSync(FILE, 'utf8');
let ok = 0; const misses = [];
function rep(from, to, label) {
    const n = src.split(from).length - 1;
    if (!n) { misses.push(label || from.slice(0, 64)); return; }
    src = src.split(from).join(to); ok += n;
}
const S = (i, st) => '<span data-icon="' + i + '"' + (st ? ' style="' + st + '"' : '') + '></span>';

/* moves bio link pill (static) */
rep('\u270E Built by your Bio Writer \u270E</a>', S('pen') + ' Built by your Bio Writer ' + S('pen') + '</a>', 'movesBioLink');

/* locked explainer in the why-box prose */
rep('<b>\uD83D\uDD12 locked</b>', '<b>' + S('lock') + ' locked</b>', 'why-box lock');

/* flags rendered for the partner view (flagCol titles) */
rep("flagCol('g','<span style=\"color:var(--green)\">\u25CF</span> Their green flags'", "flagCol('g','<span style=\"color:var(--green)\" data-icon=\"dot\"></span> Their green flags'", 'pv green');
rep("flagCol('y','<span style=\"color:var(--yellow)\">\u25CF</span> Watch-points'", "flagCol('y','<span style=\"color:var(--yellow)\" data-icon=\"dot\"></span> Watch-points'", 'pv yellow');
rep("flagCol('r','<span style=\"color:var(--red)\">\u25CF</span> Their leave-ifs'", "flagCol('r','<span style=\"color:var(--red)\" data-icon=\"dot\"></span> Their leave-ifs'", 'pv red');

/* compare header heart between names */
rep("'<span class=\"beat\" style=\"font-size:1.4rem;color:var(--rose)\">\u2665</span>'+", "'<span style=\"font-size:1.4rem;color:var(--rose)\">' + LBIcon('heart') + '</span>'+", 'compare heart');

/* intent note: same-intention tick */
rep('border-color:rgba(123,196,138,.3)">\u2713 <b>Same intention:', 'border-color:rgba(123,196,138,.3)">\' + LBIcon(\'check\') + \' <b>Same intention:', 'same intent lead');
rep('more than the percentage above. \u2713</p>', "more than the percentage above. ' + LBIcon('check') + '</p>", 'same intent trail');

/* bio-writer filter box ticks written in JS */
rep("t.querySelector('.box').textContent = on ? '\\u2713' : '';", "t.querySelector('.box').innerHTML = on ? LBIcon('check') : '';", 'bio filter box');

/* lib rows: second heart used in a mirrored library icon */
rep("'<span class=\"lib-ico beat\" aria-hidden=\"true\">\u2665</span>';", "'<span class=\"lib-ico\" aria-hidden=\"true\">' + LBIcon('heart') + '</span>';", 'lib mirror');

/* regenerate button */
rep("btn.textContent = '\u2665 Regenerate \u2665';", "btn.innerHTML = LBIcon('heart') + ' Regenerate ' + LBIcon('heart');", 'regenerate');
rep("btn.textContent = '\\u2665 Regenerate \\u2665';", "btn.innerHTML = LBIcon('heart') + ' Regenerate ' + LBIcon('heart');", 'regenerate esc');

/* synastry axes */
rep("'<div class=\"ax-label\">\\u26A1 Contact</div>'", "'<div class=\"ax-label\">' + LBIcon('bolt') + ' Contact</div>'", 'ax contact');
rep("'<div class=\"ax-label\">\uD83D\uDD4A Ease</div>'", "'<div class=\"ax-label\">' + LBIcon('sparkle') + ' Ease</div>'", 'ax ease');

/* card back drawer chevron (JS string) */
rep("<span class=\"chev\">\u25B6</span> Why the stars say this", "<span class=\"chev\" data-icon=\"chevron\"></span> Why the stars say this", 'chev card');

/* particle star array: harmless (CSS-hidden) but remove the glyph source */
rep("var g = ['\u2726','\u2727','\u2605','\u00B7'];", "var g = ['\\u00B7','\\u00B7','\\u00B7','\\u00B7'];", 'soc stars');

fs.writeFileSync(FILE, src, 'utf8');
console.log('  final replacements: ' + ok);
console.log('  MISSES (' + misses.length + '):'); misses.forEach(m => console.log('    - ' + m));
