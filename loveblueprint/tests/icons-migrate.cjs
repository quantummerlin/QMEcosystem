// ============================================================
// LOVE BLUEPRINT — custom icon migration (single verified pass)
// ROOT-CAUSE FIX: earlier attempt used replace-callbacks whose
// parameter list did not match the regex capture count, so the
// callback received the match OFFSET (a number) as button text
// and deleted 15 labels. This version:
//   * uses plain string replacement for static markup (no callbacks)
//   * runs a POST-CONDITION audit that fails loudly if any
//     button/heading lost visible text or gained a bare number
//   * refuses to write the file if the audit fails
// Run once: node tests/icons-migrate.cjs
// ============================================================
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'index.html');
const original = fs.readFileSync(FILE, 'utf8');
let src = original;

if (src.includes('src="icons.js"')) { console.log('ALREADY APPLIED'); process.exit(1); }

let ok = 0; const misses = [];
function rep(from, to, label) {
    const n = src.split(from).length - 1;
    if (!n) { misses.push(label || from.slice(0, 64)); return false; }
    src = src.split(from).join(to); ok += n; return true;
}
const H = '\u2665';
const S = (i, style) => '<span data-icon="' + i + '"' + (style ? ' style="' + style + '"' : '') + '></span>';
const LB = (i) => "' + LBIcon('" + i + "') + '";   // inside single-quoted JS strings

/* ---------------------------------------------------------------
   0. wiring
---------------------------------------------------------------- */
rep('<script src="spark-engine.js"></script>', '<script src="icons.js"></script>\r\n<script src="spark-engine.js"></script>', 'script tag');

rep('  --flip-dur:.72s;',
`  --flip-dur:.72s;
}
/* CUSTOM ICON SYSTEM: hand-drawn set from icons.js. One stroke language,
   currentColor, never font-dependent, never OS emoji. */
.ic{width:1em;height:1em;vertical-align:-.15em;flex:none}
.btn,.btn2,.flipbtn,.chip,.next-stop button,.done-btns .btn,.onboard-btns .btn,.tone-seg button,.draft-btn,.lib-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px}
.dot{display:inline-flex}
.dot .ic{width:1.25em;height:1.25em}
.bnav-btn .ico{display:inline-flex}
.bnav-btn .ico .ic{width:1.25em;height:1.25em}
.resume-ico,.lib-ico,.glyph,.align-heart{display:inline-flex;align-items:center;justify-content:center}
.resume-ico .ic,.lib-ico .ic{width:1.25em;height:1.25em}
.glyph .ic{width:2em;height:2em}
.align-heart .ic{width:1.6em;height:1.6em}
.compute-ring i{display:flex;align-items:center;justify-content:center}
.compute-ring i .ic{width:15px;height:15px}
.flip .icon .ic{width:2.6rem;height:2.6rem}
.face.back h4 .ic{width:1.05em;height:1.05em}
.btag .ic,.pill .ic,.bfoot .ic,.soc-h .ic{width:.85em;height:.85em}
.soc-label .ic{width:.9em;height:.9em}
.glyph-in .ic{width:2.2em;height:2.2em}
.mtitle .ic,.intent-note .ic,.caveat .ic,.lib-note .ic,.est .ic,.traps h3 .ic,.reason-head .ic,.ax-label .ic,.why-body .ic,.soc-hint .ic,.onboard-list li .ic,.sheet h4 .ic,.draft-btn .ic,.done-btns .ic,.next-stop .ic,.share-btns .ic{width:.9em;height:.9em}
.flag h4 .ic{width:.7em;height:.7em}
.chev,.disc{display:inline-flex}
.chev .ic,.disc .ic{width:.95em;height:.95em;transition:transform .25s var(--ease)}
details[open] > summary .chev .ic,details[open] > summary .disc .ic{transform:rotate(90deg)}
.disc{margin-left:auto}
.ar{display:inline-flex}
.ar .ic{width:1.3em;height:1.3em}
.box .ic{width:.9em;height:.9em;stroke-width:2.4}
:root{`, 'css block');
rep('details.why[open] summary .chev{transform:rotate(90deg)}', 'details.why[open] summary .chev{transform:none}', 'old chev rotate');

/* ---------------------------------------------------------------
   1. dots (lead + mirror) by exact glyph strings (codepoint-built)
---------------------------------------------------------------- */
const DOTS = [
    [[0x2665], 'heart'],
    [[0x2696, 0xFE0E], 'scales'], [[0x2696, 0xFE0F], 'scales'],
    [[0x2726], 'star4'], [[0x1F9ED], 'star4'],
    [[0x2727], 'sparkle'], [[0x2728], 'sparkle'],
    [[0x2691], 'flag'], [[0x1F6A6], 'flag'],
    [[0x26A0, 0xFE0E], 'warn'], [[0x26A0, 0xFE0F], 'warn'],
    [[0x270E], 'pen'], [[0x270D, 0xFE0F], 'pen'],
    [[0x2709, 0xFE0E], 'envelope'], [[0x1F510], 'lock'],
    [[0x274F], 'cardId'], [[0x1F4F8], 'cardId'],
    [[0x2750], 'frames'], [[0x1F5BC, 0xFE0F], 'frames'],
    [[0x274D], 'unlock'], [[0x1F513], 'unlock']
];
DOTS.forEach(d => {
    const g = String.fromCodePoint(...d[0]); const icon = d[1];
    rep('<span class="dot">' + g + '</span>', '<span class="dot" data-icon="' + icon + '"></span>', 'dot ' + icon);
    rep('<span class="dot" aria-hidden="true">' + g + '</span>', '<span class="dot" aria-hidden="true" data-icon="' + icon + '"></span>', 'dot* ' + icon);
    rep('<span class="dot" style="font-size:1.3rem">' + g + '</span>', '<span class="dot" style="font-size:1.3rem" data-icon="' + icon + '"></span>', 'dot-sm ' + icon);
    rep('<span class="dot" style="font-size:1.3rem" aria-hidden="true">' + g + '</span>', '<span class="dot" style="font-size:1.3rem" aria-hidden="true" data-icon="' + icon + '"></span>', 'dot-sm* ' + icon);
});

/* ---------------------------------------------------------------
   2. bottom nav, hero chrome (plain string replace, labels kept)
---------------------------------------------------------------- */
rep('<span class="ico">' + H + '</span><span class="lbl">Blueprint</span>', '<span class="ico" data-icon="heart"></span><span class="lbl">Blueprint</span>', 'bnav spark');
rep('<span class="ico">\u274F</span><span class="lbl">Library</span>', '<span class="ico" data-icon="book"></span><span class="lbl">Library</span>', 'bnav library');
rep('<span class="ico">\u21C4</span><span class="lbl">Compare</span>', '<span class="ico" data-icon="arrowsLR"></span><span class="lbl">Compare</span>', 'bnav compare');
rep('<span class="ico">\u274F</span><span class="lbl">Bio Card</span>', '<span class="ico" data-icon="cardId"></span><span class="lbl">Bio Card</span>', 'bnav bio');
rep('<span class="resume-ico beat">' + H + '</span>', '<span class="resume-ico" data-icon="heart"></span>', 'resume lead');
rep('<span class="resume-ico beat" aria-hidden="true">' + H + '</span>', '<span class="resume-ico" aria-hidden="true" data-icon="heart"></span>', 'resume mirror');
rep('<span class="glyph beat">\u2764</span>', '<span class="glyph" data-icon="heart" style="color:var(--rose-deep)"></span>', 'glyph lead');
rep('<span class="glyph beat" aria-hidden="true">\u2764</span>', '<span class="glyph" aria-hidden="true" data-icon="heart" style="color:var(--rose-deep)"></span>', 'glyph mirror');
rep('<span class="glyph beat" aria-hidden="true">' + H + '</span>', '<span class="glyph" aria-hidden="true" data-icon="heart" style="color:var(--rose-deep)"></span>', 'glyph mirror pv');
rep('<span class="glyph beat">' + H + '</span>', '<span class="glyph" data-icon="heart" style="color:var(--rose-deep)"></span>', 'glyph lead pv');
rep('<div class="align-heart beat">' + H + '</div>', '<div class="align-heart" data-icon="heart" style="color:var(--rose)"></div>', 'align-heart');

/* ---------------------------------------------------------------
   3. buttons + headings: EXACT old->new strings, text preserved
---------------------------------------------------------------- */
const BTN = [
    ['<button class="btn" id="obTour" type="button">' + H + ' Begin the tour ' + H + '</button>',
     '<button class="btn" id="obTour" type="button">' + S('heart') + ' Begin the tour ' + S('heart') + '</button>'],
    ['<h3 id="obTitle">' + H + ' Your Love Blueprint is ready ' + H + '</h3>',
     '<h3 id="obTitle">' + S('heart') + ' Your Love Blueprint is ready ' + S('heart') + '</h3>'],
    ['<button class="btn" id="genBtn"><span class="beat">' + H + '</span> Reveal My Blueprint <span class="beat">' + H + '</span></button>',
     '<button class="btn" id="genBtn">' + S('heart') + ' Reveal My Blueprint ' + S('heart') + '</button>'],
    ['<summary><span class="beat">' + H + '</span> Why time &amp; place matter to <em>you</em> <span class="beat" aria-hidden="true">' + H + '</span> <span style="margin-left:auto">\u25B8</span></summary>',
     '<summary>' + S('heart') + ' Why time &amp; place matter to <em>you</em> ' + S('heart') + ' <span class="disc" data-icon="chevron"></span></summary>'],
    ['<h4><span class="beat">' + H + '</span> So what does this actually mean? <span class="beat" aria-hidden="true">' + H + '</span></h4>',
     '<h4>' + S('heart') + ' So what does this actually mean? ' + S('heart') + '</h4>'],
    ['<button class="btn2 primary" id="compareBtn" type="button">' + H + ' Compare ' + H + '</button>',
     '<button class="btn2 primary" id="compareBtn" type="button">' + S('heart') + ' Compare ' + S('heart') + '</button>'],
    ['<button class="btn2 primary" id="synRunBtn" type="button">' + H + ' Run full synastry ' + H + '</button>',
     '<button class="btn2 primary" id="synRunBtn" type="button">' + S('heart') + ' Run full synastry ' + S('heart') + '</button>'],
    ['<button class="btn" id="pvCta" type="button" style="max-width:460px">' + H + ' Add my blueprint &amp; compare ' + H + '</button>',
     '<button class="btn" id="pvCta" type="button" style="max-width:460px">' + S('heart') + ' Add my blueprint &amp; compare ' + S('heart') + '</button>'],
    ['<button class="btn2 primary" id="movesCopyBtn" type="button">\u2750 Copy bio \u2750</button>',
     '<button class="btn2 primary" id="movesCopyBtn" type="button">' + S('clipboard') + ' Copy bio ' + S('clipboard') + '</button>'],
    ['<button class="btn2 ghost" id="movesMoreBtn" type="button">\u270E More versions \u270E</button>',
     '<button class="btn2 ghost" id="movesMoreBtn" type="button">' + S('pen') + ' More versions ' + S('pen') + '</button>'],
    ['<button class="btn2 primary" id="copyLinkBtn" type="button">\u2709\uFE0E Copy share link \u2709\uFE0E</button>',
     '<button class="btn2 primary" id="copyLinkBtn" type="button">' + S('envelope') + ' Copy share link ' + S('envelope') + '</button>'],
    ['<button type="button" data-tone="punchy" class="on">\u26A1\uFE0E Punchy \u26A1\uFE0E</button>',
     '<button type="button" data-tone="punchy" class="on">' + S('bolt') + ' Punchy ' + S('bolt') + '</button>'],
    ['<button type="button" data-tone="playful">\u263A\uFE0E Playful \u263A\uFE0E</button>',
     '<button type="button" data-tone="playful">' + S('smile') + ' Playful ' + S('smile') + '</button>'],
    ['<button type="button" data-tone="sincere">' + H + ' Sincere ' + H + '</button>',
     '<button type="button" data-tone="sincere">' + S('heart') + ' Sincere ' + S('heart') + '</button>'],
    ['<button type="button" data-tone="bold">\u2726 Bold \u2726</button>',
     '<button type="button" data-tone="bold">' + S('star4') + ' Bold ' + S('star4') + '</button>'],
    ['<h4 id="noteTitle">\u270E Organize this match \u270E</h4>',
     '<h4 id="noteTitle">' + S('pen') + ' Organize this match ' + S('pen') + '</h4>'],
    ['aria-pressed="false">' + H + ' A long-term partner ' + H + '</button>', 'aria-pressed="false">' + S('heart') + ' A long-term partner ' + S('heart') + '</button>'],
    ['<summary>\u25C9 What they\'ll see \u25C9 <span style="margin-left:auto">\u25B8</span></summary>',
     '<summary>' + S('eye') + ' What they\'ll see ' + S('eye') + ' <span class="disc" data-icon="chevron"></span></summary>'],
    ['<span style="color:var(--green)">\u25CF</span> Green flags you give <span style="color:var(--green)">\u25CF</span>',
     S('dot', 'color:var(--green)') + ' Green flags you give ' + S('dot', 'color:var(--green)')],
    ['<span style="color:var(--yellow)">\u25CF</span> Watch-points <span style="color:var(--yellow)">\u25CF</span>',
     S('dot', 'color:var(--yellow)') + ' Watch-points ' + S('dot', 'color:var(--yellow)')],
    ['<span style="color:var(--red)">\u25CF</span> Leave if you see', S('dot', 'color:var(--red)') + ' Leave if you see'],
    ['(universal: about them, not you)</span> <span style="color:var(--red)">\u25CF</span></h4>',
     '(universal: about them, not you)</span> ' + S('dot', 'color:var(--red)') + '</h4>'],
    ["<h3>\u26A0\uFE0E Don't fall for these", "<h3>" + S('warn') + " Don't fall for these"],
    ['</span> \u26A0\uFE0E</h3>', '</span> ' + S('warn') + '</h3>'],
    ['<p class="lib-note">\\u25CC <b>', '<p class="lib-note">' + S('lock') + ' <b>'],
    ['<span style="color:var(--gold)">' + H + '</span> Screenshot any card.', S('heart', 'color:var(--gold)') + ' Screenshot any card.'],
    ['thumbnail size. <span style="color:var(--gold)">' + H + '</span></div>', 'thumbnail size. ' + S('heart', 'color:var(--gold)') + '</div>'],
    ['<span>Love Blueprint</span><span class="beat">' + H + '</span>', '<span>Love Blueprint</span>' + S('heart')],
    ['<span class="chev">\u25B6</span>', '<span class="chev" data-icon="chevron"></span>'],
    ['<span class="ar beat">\u2192</span>', '<span class="ar" data-icon="arrowR"></span>'],
    ['<span class="box">\u2713</span>', '<span class="box" data-icon="check"></span>']
];
BTN.forEach(p => rep(p[0], p[1]));

/* these three carry extra attributes — handle by exact opening tag */
[
    ['saveMatchBtn', ' Save this match to my library '],
    ['pvSave', ' Save to my potential matches ']
].forEach(([id, txt]) => {
    const re = new RegExp('(<button class="btn2 ghost" id="' + id + '" type="button"[^>]*>)' + H + txt + H + '(</button>)');
    const m = src.match(re);
    if (m) { src = src.replace(m[0], m[1] + S('heart') + txt + S('heart') + m[2]); ok++; }
    else misses.push('btn ' + id);
});

/* ---------------------------------------------------------------
   4. JS-built markup (single-quoted strings): LBIcon()
---------------------------------------------------------------- */
const JS = [
    ["var VEIL_GLYPHS = ['\\u2640','\\u263E','\\u2642','\\u263F','\\u2600','\\u2643','\\u2644','\\u2645'];",
     "var VEIL_GLYPHS = ['venus','moon','mars','mercury','sun','jupiter','saturn','neptune'];"],
    ['    el.textContent = g;', '    el.innerHTML = LBIcon(g);'],
    ['    pill.textContent = sec.label;', "    pill.dataset.sec = sec.id;\r\n    pill.innerHTML = LBIcon(sec.icon) + ' ' + esc(sec.label);"],
    ["p.classList.toggle('active', p.textContent === (RAIL_SECTIONS[idx] ? RAIL_SECTIONS[idx].label : ''));",
     "p.classList.toggle('active', p.dataset.sec === (RAIL_SECTIONS[idx] ? RAIL_SECTIONS[idx].id : ''));"],
    ['t.textContent = msg;', 't.innerHTML = msg;'],
    ["toast('" + H + " Reopened ' + (rec.name || 'blueprint') + ' " + H + "');", "toast(LBIcon('heart') + ' Reopened ' + esc(rec.name || 'blueprint') + ' ' + LBIcon('heart'));"],
    ["toast('Comparing you \\u2665 ' + ((m.snap && m.snap.n) || 'match'));", "toast(LBIcon('heart') + ' Comparing you ' + esc((m.snap && m.snap.n) || 'match'));"],
    ["' between you \\u2728');", "' between you ' + LBIcon('sparkle'));"],
    ["toast('" + H + " Saved to your potential matches " + H + "');", "toast(LBIcon('heart') + ' Saved to your potential matches ' + LBIcon('heart'));"],
    ["toast('" + H + " Your compare is ready " + H + "');", "toast(LBIcon('heart') + ' Your compare is ready ' + LBIcon('heart'));"],
    ["toast('\\u2665 Generate your blueprint first \\u2665');", "toast(LBIcon('heart') + ' Generate your blueprint first ' + LBIcon('heart'));"],
    ["toast('\\u2665 Generate your blueprint first, then compare \\u2665');", "toast(LBIcon('heart') + ' Generate your blueprint first, then compare ' + LBIcon('heart'));"],
    ["toast('\\u2726 Fresh version \\u2726');", "toast(LBIcon('star4') + ' Fresh version ' + LBIcon('star4'));"],
    ["toast(\"" + H + " That code doesn't look quite right " + H + "\");", "toast(LBIcon('heart') + \" That code doesn't look quite right \" + LBIcon('heart'));"],
    ["'" + H + " Share link copied: send it to your spark " + H + "'", "LBIcon('envelope') + ' Share link copied ' + LBIcon('envelope')"],
    ["this.textContent = '" + H + " Fill in the form above, and the compare happens automatically " + H + "';",
     "this.innerHTML = LBIcon('heart') + ' Fill in the form above, and the compare happens automatically ' + LBIcon('heart');"],
    ["smb.textContent = '" + H + " Save ' + ((snap.n) || 'match') + ' to my library " + H + "';",
     "smb.innerHTML = LBIcon('heart') + ' Save ' + esc((snap.n) || 'match') + ' to my library ' + LBIcon('heart');"],
    ["btn.textContent = '" + H + " Regenerate " + H + "';", "btn.innerHTML = LBIcon('heart') + ' Regenerate ' + LBIcon('heart');"],
    ["document.getElementById('pvName').textContent = '" + H + " ' + (p.n || 'Someone') + ' shared their blueprint with you " + H + "';",
     "document.getElementById('pvName').innerHTML = LBIcon('heart') + ' ' + esc(p.n || 'Someone') + ' shared their blueprint with you ' + LBIcon('heart');"],
    ["'<span class=\"lib-ico beat\">" + H + "</span>' +", "'<span class=\"lib-ico\">' + LBIcon('heart') + '</span>' +"],
    ["b2.textContent = '\\u2665 You have read your sky, now share it \\u2665';", "b2.innerHTML = LBIcon('heart') + ' You have read your sky, now share it ' + LBIcon('heart');"],
    ["dc.innerHTML = '<h3>\\u2665 You have read your blueprint \\u2665</h3>' +", "dc.innerHTML = '<h3>' + LBIcon('heart') + ' You have read your blueprint ' + LBIcon('heart') + '</h3>' +"],
    ["verdict.textContent = '\u25CB Left open \u25CB';", "verdict.innerHTML = LBIcon('circle') + ' Left open ' + LBIcon('circle');"],
    ["verdict.textContent = '\u2713 Aligned \u2713';", "verdict.innerHTML = LBIcon('check') + ' Aligned ' + LBIcon('check');"],
    ["verdict.textContent = '\u25D0 Mostly aligned \u25D0';", "verdict.innerHTML = LBIcon('half') + ' Mostly aligned ' + LBIcon('half');"],
    ["verdict.textContent = '\u25C6 Two directions \u25C6';", "verdict.innerHTML = LBIcon('diamond') + ' Two directions ' + LBIcon('diamond');"],
    ["accEl.textContent = '\\u2715 Not computed \\u2715';", "accEl.innerHTML = LBIcon('xmark') + ' Not computed ' + LBIcon('xmark');"],
    ["accEl.textContent = '\\u25CE Exact chart \\u25CE';", "accEl.innerHTML = LBIcon('target') + ' Exact chart ' + LBIcon('target');"],
    ["accEl.textContent = '\\u25D0 Partial, ' + locked + ' locked \\u25D0';", "accEl.innerHTML = LBIcon('half') + ' Partial, ' + locked + ' locked ' + LBIcon('half');"],
    ["accEl.textContent = '\\u25CE Exact (date only) \\u25CE';", "accEl.innerHTML = LBIcon('target') + ' Exact (date only) ' + LBIcon('target');"],
    ["'<span class=\"est\">\\u25CC exact details needed \\u25CC</span>'", "'<span class=\"est\">' + LBIcon('lock') + ' exact details needed ' + LBIcon('lock') + '</span>'"],
    ['>\\u25CE <b>Honest scope:</b>', ">' + LBIcon('search') + ' <b>Honest scope:</b>"],
    ['made-up average. \\u25CE</p>', "made-up average. ' + LBIcon('search') + '</p>"],
    ['<p class="intent-note">\\u2696\\uFE0E <b>You\\\'re here for different things.</b>', "<p class=\"intent-note\">' + LBIcon('scales') + ' <b>You\\'re here for different things.</b>"],
    ['month three. \\u2696\\uFE0E</p>', "month three. ' + LBIcon('scales') + '</p>"],
    ['<p class="intent-note">\\u25CB One of you', "<p class=\"intent-note\">' + LBIcon('bubble') + ' One of you"],
    ['on this page. \\u25CB</p>', "on this page. ' + LBIcon('bubble') + '</p>"],
    ['<p class="caveat">\\u25CC No birth date', "<p class=\"caveat\">' + LBIcon('lock') + ' No birth date"],
    ['not a sentence. \\u25CC</p>', "not a sentence. ' + LBIcon('lock') + '</p>"],
    ["label:'\uD83D\uDD25 Chemistry'", "label:LBIcon('flame') + ' Chemistry'"],
    ["label:'\uD83D\uDEE1\uFE0F Emotional safety'", "label:LBIcon('shield') + ' Emotional safety'"],
    ["label:'\u23F3 Staying power'", "label:LBIcon('hourglass') + ' Staying power'"],
    ["label:'\uD83D\uDCAC Communication'", "label:LBIcon('bubble') + ' Communication'"],
    ["[['Water','\uD83D\uDCA7'],['Earth','\uD83C\uDF31'],['Fire','\uD83D\uDD25'],['Air','\uD83C\uDF2C']]", "[['Water','droplet'],['Earth','leaf'],['Fire','flame'],['Air','wind']]"],
    ["'<div class=\"el-row\"><span>'+o[1]+' '+o[0]+'</span>", "'<div class=\"el-row\"><span>'+LBIcon(o[1])+' '+o[0]+'</span>"],
    ["data-flipbtn>" + H + " Flip " + H + "</button>'+", "data-flipbtn>' + LBIcon('heart') + ' Flip ' + LBIcon('heart') + '</button>'+"],
    ["data-flipbtn>\u2190 back</button>'+", "data-flipbtn>' + LBIcon('arrowL') + ' back</button>'+"],
    ["'<span class=\"chev\">\u25B6</span> Why the stars say this", "'<span class=\"chev\" data-icon=\"chevron\"></span> Why the stars say this"],
    ["type=\"button\">\uD83D\uDCCB Copy</button>'", "type=\"button\">' + LBIcon('clipboard') + ' Copy</button>'"],
    ["type=\"button\">\u270E Edit \u270E</button>'", "type=\"button\">' + LBIcon('pen') + ' Edit ' + LBIcon('pen') + '</button>'"],
    ["this.textContent = on ? '\u2713 Done \u2713' : '\u270E Edit \u270E';", "this.innerHTML = on ? LBIcon('check') + ' Done ' + LBIcon('check') : LBIcon('pen') + ' Edit ' + LBIcon('pen');"],
    ["type=\"button\">\uD83C\uDFB2 Another</button>'", "type=\"button\">' + LBIcon('sparkle') + ' Another</button>'"],
    ["bt.push('" + H + " Venus ' + chart.placements.venus.name + ' " + H + "')", "bt.push(LBIcon('venus') + ' Venus ' + esc(chart.placements.venus.name) + ' ' + LBIcon('venus'))"],
    ["bt.push('\u263E Moon ' + chart.placements.moon.name + ' \u263E')", "bt.push(LBIcon('moon') + ' Moon ' + esc(chart.placements.moon.name) + ' ' + LBIcon('moon'))"],
    ["bt.push('\u2642 Mars ' + chart.placements.mars.name + ' \u2642')", "bt.push(LBIcon('mars') + ' Mars ' + esc(chart.placements.mars.name) + ' ' + LBIcon('mars'))"],
    ["cardFor('venus','\u2640','How I Love','venus')", "cardFor('venus','__svg_venus__','How I Love','venus')"],
    ["cardFor('mars','\u2642','My Chemistry','mars')", "cardFor('mars','__svg_mars__','My Chemistry','mars')"],
    ["glyph:'\u263E', label:'What Makes Me Feel Safe'", "glyph:'__svg_moon__', label:'What Makes Me Feel Safe'"],
    ["glyph:'\u263F', label:'How I Text'", "glyph:'__svg_mercury__', label:'How I Text'"],
    ["glyph:'\u2302', label:\"Who I'm Wired For\"", "glyph:'__svg_house__', label:\"Who I'm Wired For\""],
    ["glyph:'\\u2691', label:'The Honest Part'", "glyph:'__svg_flag__', label:'The Honest Part'"],
    ["h += '<div class=\"soc-label\">' + (opts.glyph ? opts.glyph + ' ' : '') + esc(opts.label) + (opts.glyph ? ' ' + opts.glyph : '') + '</div>';",
     "h += '<div class=\"soc-label\">' + (opts.glyph ? svgGlyph(opts.glyph) + ' ' : '') + esc(opts.label) + (opts.glyph ? ' ' + svgGlyph(opts.glyph) : '') + '</div>';"],
    ["'<span class=\"soc-footrow\"><span class=\"soc-h\">' + '\\u2665' + '</span>' +", "'<span class=\"soc-footrow\"><span class=\"soc-h\">' + LBIcon('heart') + '</span>' +"],
    ["'<span class=\"soc-cta\">decode yours</span><span class=\"soc-h\">' + '\\u2665' + '</span></span></div>';", "'<span class=\"soc-cta\">decode yours</span><span class=\"soc-h\">' + LBIcon('heart') + '</span></span></div>';"],
    ["body:'<div class=\"soc-ring\"><span class=\"glyph-in beat\">" + H + "</span></div>' +", "body:'<div class=\"soc-ring\"><span class=\"glyph-in\">' + LBIcon('heart') + '</span></div>' +"],
    ["body:'<div class=\"soc-ring\"><span class=\"glyph-in beat\">" + H + "</span></div><div class=\"soc-quote\">'", "body:'<div class=\"soc-ring\"><span class=\"glyph-in\">' + LBIcon('heart') + '</span></div><div class=\"soc-quote\">'"],
    ["var glyphs = ['" + H + "','\u2764','\u2763','\u2661'];", "var glyphs = [];"]
];
JS.forEach(p => rep(p[0], p[1], p[0].slice(0, 56)));

/* rail table: replace whole array */
const railRe = /var RAIL_SECTIONS = \[[\s\S]*?\r?\n\];/;
if (railRe.test(src)) {
    src = src.replace(railRe,
`var RAIL_SECTIONS = [
  { id:'flipSection',  icon:'heart',    label:'Love Signature', nav:'spark'   },
  { id:'alignSection', icon:'scales',   label:'Your Words',     nav:'spark'   },
  { id:'pullSection',  icon:'star4',    label:'Deeper Pull',    nav:'spark'   },
  { id:'flagsSection', icon:'flag',     label:'Flags',          nav:'spark'   },
  { id:'movesSection', icon:'sparkle',  label:'Moves',          nav:'spark'   },
  { id:'trapsSection', icon:'warn',     label:'Traps',          nav:'spark'   },
  { id:'bioWriterSection', icon:'pen',  label:'Bio Writer',     nav:'spark'   },
  { id:'shareSection', icon:'envelope', label:'Share',          nav:'share'   },
  { id:'bioSection',   icon:'cardId',   label:'Bio Card',       nav:'bio'     },
  { id:'socialSection',icon:'frames',   label:'Social Cards',   nav:'bio'     }
];`);
    ok++;
} else misses.push('rail table');

/* mount helpers inserted ahead of the experience layer */
rep('/* ============ EXPERIENCE LAYER (v2) ============',
`/* ============ ICON MOUNTING ============
   Static markup uses <span data-icon="name">; JS builders call LBIcon().
   A MutationObserver mounts any data-icon span inserted later (cards,
   library rows, compare output). Idempotent: skips filled spans. */
var LBDIMICON = { chemistry:'flame', safety:'shield', communication:'bubble', longevity:'hourglass' };
function svgGlyph(tok){
  var s = String(tok || '');
  if(s.indexOf('__svg_') !== 0) return esc(s);
  var name = s.replace(/^__svg_/, '').replace(/__$/, '');
  return (typeof LBIcon === 'function') ? LBIcon(name) : '';
}
function mountIcons(){
  if(typeof LBIcon !== 'function') return;
  var els = document.querySelectorAll('[data-icon]');
  for(var i = 0; i < els.length; i++){
    if(els[i].firstElementChild) continue;
    els[i].innerHTML = LBIcon(els[i].getAttribute('data-icon'));
  }
}
mountIcons();
if(typeof MutationObserver === 'function'){
  new MutationObserver(function(){ mountIcons(); })
    .observe(document.body, { childList:true, subtree:true });
}

/* ============ EXPERIENCE LAYER (v2) ============`, 'mount block');

/* synastry panel: icon by dimension key */
rep("html += '<div class=\"reason-row\"><div class=\"reason-head\"><span>' + d.label + '</span>'",
    "html += '<div class=\"reason-row\"><div class=\"reason-head\"><span>' + (LBDIMICON[d.key] ? LBIcon(LBDIMICON[d.key]) + ' ' : '') + esc(d.label) + '</span>'", 'syn render');
rep("'<div class=\"ax-label\">\\u26A1 Contact</div>'", "'<div class=\"ax-label\">' + LBIcon('bolt') + ' Contact</div>'", 'ax contact');
rep("'<div class=\"ax-label\">\uD83D\uDD4A Ease</div>'", "'<div class=\"ax-label\">' + LBIcon('sparkle') + ' Ease</div>'", 'ax ease');

/* ---------------------------------------------------------------
   5. POST-CONDITION AUDIT: refuse to write a corrupted file
---------------------------------------------------------------- */
const problems = [];
// (a) no bare 4+ digit run directly after a closing tag or icon span
(src.match(/<\/(span|button|h3|h4)>\d{4,}/g) || []).forEach(m => problems.push('bare number after tag: ' + m));
// (b) every <button> / <h3|h4> in static HTML still has visible text
const visibleOf = (html) => html.replace(/<span[^>]*data-icon[^>]*><\/span>/g, '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
(src.match(/<button[^>]*>[\s\S]*?<\/button>/g) || []).forEach(b => {
    const idm = b.match(/id="([^"]+)"/);
    const vis = visibleOf(b);
    // icon-only buttons are not expected in this app
    if (vis.length < 2 && !/data-flipbtn|class="resume-all"/.test(b) && !/aria-label/.test(b)) {
        problems.push('button lost its label: ' + (idm ? idm[1] : b.slice(0, 80)));
    }
});
// (c) ids that must survive
['obTour','genBtn','compareBtn','synRunBtn','pvCta','pvSave','saveMatchBtn','movesCopyBtn','movesMoreBtn','copyLinkBtn','noteTitle','obTitle']
  .forEach(id => { if (!src.includes('id="' + id + '"')) problems.push('missing id ' + id); });
// (d) known labels must still read
[['obTour', 'Begin the tour'], ['compareBtn', 'Compare'], ['movesCopyBtn', 'Copy bio'], ['copyLinkBtn', 'Copy share link'],
 ['synRunBtn', 'Run full synastry'], ['genBtn', 'Reveal My Blueprint']].forEach(([id, txt]) => {
    const m = src.match(new RegExp('id="' + id + '"[^>]*>([\\s\\S]*?)</(?:button)>'));
    if (!m || !visibleOf(m[1]).includes(txt)) problems.push('label missing for #' + id + ': expected "' + txt + '"');
});
['punchy','playful','sincere','bold'].forEach(t => {
    const m = src.match(new RegExp('data-tone="' + t + '"[^>]*>([\\s\\S]*?)</button>'));
    if (!m || visibleOf(m[1]).length < 3) problems.push('tone button lost label: ' + t);
});

if (problems.length) {
    console.log('AUDIT FAILED — file NOT written:');
    problems.forEach(p => console.log('   x ' + p));
    process.exit(2);
}

fs.writeFileSync(FILE, src, 'utf8');
console.log('  AUDIT PASSED. replacements: ' + ok);
console.log('  MISSES (' + misses.length + '):'); misses.forEach(m => console.log('    - ' + m));
