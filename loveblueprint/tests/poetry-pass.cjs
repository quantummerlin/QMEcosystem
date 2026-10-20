// ============================================================
// LOVE BLUEPRINT — poetry pass (local build tool)
// ------------------------------------------------------------
// User feedback: "clinical, nothing centre-aligned, lone emoji
// look unbalanced — mirror every emoji on both sides of the
// writing." This pass:
//   1. centres the poetic surfaces (section heads, card backs,
//      stanzas, pull, align, bio card, social cards, panels)
//   2. mirrors every decorative emoji on a line (markup spans,
//      CSS ::before/::after pairs, JS textContent strings)
//   3. warms the clinical sub-headlines and labels
// NEVER touches: IDs, data-* values, INTENT_DRIVES keys, classes.
// Run: node tests/poetry-pass.cjs          (apply + report)
// ============================================================
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'index.html');
let src = fs.readFileSync(FILE, 'utf8');

let ok = 0;
const misses = [];
function rep(from, to, label) {
    const n = src.split(from).length - 1;
    if (n === 0) { misses.push((label || from).slice(0, 70)); return; }
    src = src.split(from).join(to);
    ok += n;
}
function reAdd(re, suffix, label) {
    if (!re.test(src)) { misses.push('regex: ' + label); return; }
    src = src.replace(re, '$1' + suffix + '}');
    ok++;
}

/* ---------- 1. CSS: centre + mirror ---------- */
rep('.section-head{display:flex;align-items:center;gap:12px;margin-bottom:8px}',
    '.section-head{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:8px;text-align:center}');

rep('.face.back h4{font-size:1.05rem;color:var(--rose-deep);margin-bottom:4px;display:flex;align-items:center;gap:8px}',
    '.face.back h4{font-size:1.05rem;color:var(--rose-deep);margin-bottom:4px;display:flex;align-items:center;justify-content:center;gap:8px;text-align:center}');

rep('  margin:10px 0 12px;line-height:1.75;text-align:left;max-width:46ch;',
    '  margin:10px auto 12px;line-height:1.8;text-align:center;max-width:44ch;');

rep('details.why summary{\n  cursor:pointer;list-style:none;font-weight:700;font-size:.82rem;color:var(--rose-deep);\n  display:flex;align-items:center;gap:8px;user-select:none;\n}',
    'details.why summary{\n  cursor:pointer;list-style:none;font-weight:700;font-size:.82rem;color:var(--rose-deep);\n  display:flex;align-items:center;justify-content:center;gap:8px;user-select:none;text-align:center;\n}');

rep('.why-box summary{cursor:pointer;font-weight:700;font-size:.84rem;color:var(--rose-deep);padding:10px 0;list-style:none;display:flex;gap:8px;align-items:center;user-select:none}',
    '.why-box summary{cursor:pointer;font-weight:700;font-size:.84rem;color:var(--rose-deep);padding:10px 0;list-style:none;display:flex;gap:8px;align-items:center;justify-content:center;user-select:none;text-align:center}');

rep('details.why .why-body{font-size:.82rem;color:var(--muted);margin-top:8px;padding-left:2px}',
    'details.why .why-body{font-size:.82rem;color:var(--muted);margin-top:8px;padding-left:2px;text-align:center}');

rep('.why-box .why-in{font-size:.84rem;color:var(--muted);padding:0 0 12px}',
    '.why-box .why-in{font-size:.84rem;color:var(--muted);padding:0 0 12px;text-align:center}');

rep('.flag h4{display:flex;align-items:center;gap:8px;font-size:1rem;margin-bottom:10px}',
    '.flag h4{display:flex;align-items:center;justify-content:center;gap:8px;font-size:1rem;margin-bottom:10px;text-align:center}');

rep('.flag ul{list-style:none} .flag li{padding:5px 0 5px 22px;position:relative;font-size:.87rem;color:var(--text)}',
    '.flag ul{list-style:none} .flag li{display:flex;align-items:baseline;gap:9px;padding:5px 0;font-size:.87rem;color:var(--text)}');
rep('.flag.g li::before{content:"✓";position:absolute;left:0;color:var(--green);font-weight:800}',
    '.flag.g li::before{content:"✓";color:var(--green);font-weight:800;flex:none}\n.flag.g li::after{content:"✓";color:var(--green);font-weight:800;flex:none;margin-left:auto}');
rep('.flag.y li::before{content:"!";position:absolute;left:0;color:var(--yellow);font-weight:800}',
    '.flag.y li::before{content:"!";color:var(--yellow);font-weight:800;flex:none}\n.flag.y li::after{content:"!";color:var(--yellow);font-weight:800;flex:none;margin-left:auto}');
rep('.flag.r li::before{content:"✗";position:absolute;left:0;color:var(--red);font-weight:800}',
    '.flag.r li::before{content:"✗";color:var(--red);font-weight:800;flex:none}\n.flag.r li::after{content:"✗";color:var(--red);font-weight:800;flex:none;margin-left:auto}');

rep('.traps h3{color:#FFB3C0;margin-bottom:10px;display:flex;gap:8px;align-items:center}',
    '.traps h3{color:#FFB3C0;margin-bottom:10px;display:flex;gap:8px;align-items:center;justify-content:center;text-align:center}');
rep('.traps li{padding:6px 0 6px 24px;position:relative;font-size:.89rem;color:#F3C6D0}',
    '.traps li{display:flex;align-items:baseline;gap:9px;padding:6px 0;font-size:.89rem;color:#F3C6D0}');
rep('.traps li::before{content:"✗";position:absolute;left:0;color:var(--rose-soft);font-weight:800}',
    '.traps li::before{content:"✗";color:var(--rose-soft);font-weight:800;flex:none}\n.traps li::after{content:"✗";color:var(--rose-soft);font-weight:800;flex:none;margin-left:auto}');

rep('.promise li{padding:2px 0 2px 20px;position:relative}',
    '.promise li{padding:2px 0;display:flex;align-items:baseline;gap:9px}');
rep('.promise.yes li::before{content:"✓";position:absolute;left:0;color:var(--green);font-weight:800}',
    '.promise.yes li::before{content:"✓";color:var(--green);font-weight:800;flex:none}\n.promise.yes li::after{content:"✓";color:var(--green);font-weight:800;flex:none;margin-left:auto}');
rep('.promise.no li::before{content:"✗";position:absolute;left:0;color:var(--red);font-weight:800}',
    '.promise.no li::before{content:"✗";color:var(--red);font-weight:800;flex:none}\n.promise.no li::after{content:"✗";color:var(--red);font-weight:800;flex:none;margin-left:auto}');

rep('.move .mtitle{font-weight:700;font-size:1.02rem;color:var(--rose-deep)}',
    '.move .mtitle{font-weight:700;font-size:1.02rem;color:var(--rose-deep);text-align:center}');
rep('.move .mdesc{font-size:.85rem;color:var(--muted);margin:4px 0 12px}',
    '.move .mdesc{font-size:.85rem;color:var(--muted);margin:4px 0 12px;text-align:center}');

rep('.pull-synth h4{color:var(--rose-deep);font-size:1rem;margin-bottom:8px;display:flex;gap:8px;align-items:center}',
    '.pull-synth h4{color:var(--rose-deep);font-size:1rem;margin-bottom:8px;display:flex;gap:8px;align-items:center;justify-content:center;text-align:center}');
rep('.pull-synth p{font-size:.91rem;line-height:1.75}',
    '.pull-synth p{font-size:.91rem;line-height:1.75;text-align:center}');
rep('.pull-body{font-size:.9rem;line-height:1.72}',
    '.pull-body{font-size:.9rem;line-height:1.72;text-align:center}');

rep('.align-msg{font-size:.93rem;line-height:1.7}',
    '.align-msg{font-size:.93rem;line-height:1.7;text-align:center}');
rep('.align-msg em{color:var(--gold);font-style:italic}',
    '.align-msg em{color:var(--gold);font-style:italic}\n#alignSection{text-align:center}\n.align-elems .el-row,.align-elems .el-row span{text-align:left}');
rep('.intent-note{font-size:.86rem;margin-top:10px;background:rgba(232,185,106,.12);border:1px solid rgba(232,185,106,.35);border-radius:12px;padding:10px 14px;line-height:1.55}',
    '.intent-note{font-size:.86rem;margin-top:10px;background:rgba(232,185,106,.12);border:1px solid rgba(232,185,106,.35);border-radius:12px;padding:10px 14px;line-height:1.55;text-align:center}');

rep('.panel h3{color:var(--rose-deep);font-size:1.15rem;margin-bottom:4px}',
    '.panel h3{color:var(--rose-deep);font-size:1.15rem;margin-bottom:4px;text-align:center}');
rep('.panel .phint{font-size:.82rem;color:var(--muted);margin-bottom:14px}',
    '.panel .phint{font-size:.82rem;color:var(--muted);margin-bottom:14px;text-align:center}');
rep('.share-btns{display:flex;gap:10px;flex-wrap:wrap}',
    '.share-btns{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}');

rep('.lib-head{margin-top:30px;text-align:left}',
    '.lib-head{margin-top:30px;text-align:center}');
rep('.lib-h{display:flex;align-items:baseline;gap:10px;margin:26px 0 12px}',
    '.lib-h{display:flex;align-items:baseline;justify-content:center;gap:10px;margin:26px 0 12px}');

rep('.syn-head{display:flex;align-items:center;gap:10px;margin-bottom:6px}',
    '.syn-head{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:6px;text-align:center}');
reAdd(/(\.syn-phint\{[^}]*?);?\}/, ';text-align:center', '.syn-phint');

rep('.bio::before{content:"♥";position:absolute;top:-30px;right:-10px;font-size:180px;opacity:.10}',
    '.bio::before{content:"♥";position:absolute;top:-30px;right:-10px;font-size:180px;opacity:.10}\n.bio::after{content:"♥";position:absolute;bottom:-40px;left:-14px;font-size:180px;opacity:.10;pointer-events:none}');
reAdd(/(\.bio\{[^}]*?);?\n?\}/, '\ntext-align:center', '.bio');
rep('.bio .bqr{margin-top:16px;display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.14);border-radius:14px;padding:10px 12px;backdrop-filter:blur(4px)}',
    '.bio .bqr{margin-top:16px;display:flex;align-items:center;justify-content:center;gap:12px;background:rgba(255,255,255,.14);border-radius:14px;padding:10px 12px;backdrop-filter:blur(4px)}');
rep('.bio .bqr-txt{display:flex;flex-direction:column;gap:3px}',
    '.bio .bqr-txt{display:flex;flex-direction:column;gap:3px;text-align:left}');

reAdd(/(\.spark-badge\{[^}]*?);\n\}/, ';\n  justify-content:center;text-align:center\n', '.spark-badge');

rep('.soc-label{\n  font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;font-weight:800;\n  color:var(--gold);display:flex;align-items:center;gap:5px;\n}',
    '.soc-label{\n  font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;font-weight:800;\n  color:var(--gold);display:flex;align-items:center;justify-content:center;gap:5px;text-align:center;\n}');
reAdd(/(\.soc-title\{[^}]*?);?\n\}/, ';\n  text-align:center\n', '.soc-title');
rep('.soc-sub{color:var(--rose-deep);font-weight:700;font-size:.8rem;margin-bottom:auto}',
    '.soc-sub{color:var(--rose-deep);font-weight:700;font-size:.8rem;margin-bottom:auto;text-align:center}');
rep('.soc-points li{\n  color:#EEDDE4;font-size:.68rem;line-height:1.45;margin-bottom:5px;\n  padding-left:14px;position:relative;overflow:hidden;\n}',
    '.soc-points li{\n  color:#EEDDE4;font-size:.68rem;line-height:1.45;margin-bottom:5px;overflow:hidden;\n  display:flex;align-items:baseline;justify-content:center;gap:6px;text-align:center;\n}');
rep('.soc-points li::before{content:"\\2665";position:absolute;left:0;color:var(--rose);font-size:.6rem}',
    '.soc-points li::before{content:"\\2665";color:var(--rose);font-size:.6rem;flex:none}\n.soc-points li::after{content:"\\2665";color:var(--rose);font-size:.6rem;flex:none}');
rep('.soc.clamped .soc-points li{\n  display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;\n}',
    '.soc.clamped .soc-points li{\n  display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;text-align:center;\n}');
rep('.soc-flagbox p{color:#EEDDE4;font-size:.66rem;line-height:1.45;margin:0 0 3px 0;padding-left:12px;position:relative}',
    '.soc-flagbox p{color:#EEDDE4;font-size:.66rem;line-height:1.45;margin:0 0 3px 0;display:flex;align-items:baseline;justify-content:center;gap:6px;text-align:center}');
rep('.soc-flagbox p::before{position:absolute;left:0;font-weight:800}',
    '.soc-flagbox p::before{font-weight:800;flex:none}\n.soc-flagbox p::after{font-weight:800;flex:none}');
rep('.soc-flagbox.g p::before{content:"\\2713";color:var(--green)}',
    '.soc-flagbox.g p::before{content:"\\2713";color:var(--green)}\n.soc-flagbox.g p::after{content:"\\2713";color:var(--green)}');
rep('.soc-flagbox.y p::before{content:"!";color:var(--yellow)}',
    '.soc-flagbox.y p::before{content:"!";color:var(--yellow)}\n.soc-flagbox.y p::after{content:"!";color:var(--yellow)}');
rep('.soc-flagbox.r p::before{content:"\\2715";color:var(--rose-soft)}',
    '.soc-flagbox.r p::before{content:"\\2715";color:var(--rose-soft)}\n.soc-flagbox.r p::after{content:"\\2715";color:var(--rose-soft)}');

rep('.onboard-card h3{font-size:1.35rem;margin-bottom:6px}',
    '.onboard-card h3{font-size:1.35rem;margin-bottom:6px;text-align:center}');
rep('.onboard-card p{color:var(--muted);font-size:.88rem;line-height:1.6;margin-bottom:14px}',
    '.onboard-card p{color:var(--muted);font-size:.88rem;line-height:1.6;margin-bottom:14px;text-align:center}');
rep('.onboard-list li{padding:7px 0 7px 26px;position:relative;font-size:.86rem;color:var(--text)}',
    '.onboard-list li{padding:7px 0;font-size:.86rem;color:var(--text);text-align:center}');
rep('.onboard-list li::before{content:"\\2665";position:absolute;left:2px;color:var(--rose);font-size:.7rem;top:10px}',
    '.onboard-list li::before{content:"\\2665 ";color:var(--rose);font-size:.7rem}\n.onboard-list li::after{content:" \\2665";color:var(--rose);font-size:.7rem}');

rep('.sheet h4{font-family:var(--font-head);color:var(--rose-deep);font-size:1.05rem;margin-bottom:4px}',
    '.sheet h4{font-family:var(--font-head);color:var(--rose-deep);font-size:1.05rem;margin-bottom:4px;text-align:center}');
rep('.best-draft .bd-text{font-size:.92rem;line-height:1.7;color:var(--text);font-style:italic}',
    '.best-draft .bd-text{font-size:.92rem;line-height:1.7;color:var(--text);font-style:italic;text-align:center}');
reAdd(/(\.draft-text\{[^}]*?);?\n?\}/, '\ntext-align:center', '.draft-text');
reAdd(/(\.bd-acts\{[^}]*?);?\}/, ';justify-content:center', '.bd-acts');
rep('.draft-acts{display:flex;gap:8px;margin-top:14px}',
    '.draft-acts{display:flex;gap:8px;margin-top:14px;justify-content:center}');
rep('.face.front .hint{margin-top:auto;font-size:.74rem;color:var(--muted);display:flex;align-items:center;gap:6px}',
    '.face.front .hint{margin-top:auto;font-size:.74rem;color:var(--muted);display:flex;align-items:center;justify-content:center;gap:6px}');

/* ---------- 2. Section heads: mirror the dot via markup ---------- */
src = src.replace(
    /<div class="section-head">\s*<span class="dot">([^<]*)<\/span>(\s*<div><h2>[\s\S]*?<\/p><\/div>)\s*<\/div>/g,
    function (m, emo, inner) {
        ok++;
        return '<div class="section-head">\n        <span class="dot">' + emo + '</span>' + inner +
            '\n        <span class="dot" aria-hidden="true">' + emo + '</span>\n      </div>';
    });

/* ---------- 3. HTML: mirror emoji + warm copy ---------- */
rep('<h1>Your Cosmic Dating Decoder</h1>',
    '<h1>Your love story, read from the real sky</h1>');
rep('content="Love Blueprint — Your Cosmic Dating Decoder"',
    'content="Love Blueprint — Your Love Story, Read From the Real Sky"'); // og + twitter (2)

rep('content="Love Blueprint: Your Love Story, Read From the Real Sky"',
    'content="Love Blueprint: Your Love Story, Read From the Real Sky"'); // no-op guard

rep('<p class="tag">Flip a card, read your blueprint. Astrology + numerology turned into your real dating playbook: how you love, how you text and who you actually need.</p>',
    '<p class="tag">Seven sealed letters about your heart. Flip them one by one: how you love, how you flirt, what feels like home, and who your chart keeps pointing to.</p>');

rep('<div><h2>Your Love Signature</h2><p>Tap any card to flip it over.</p></div>',
    '<div><h2>Your Love Signature</h2><p>Seven sealed letters from the sky. Tap one open.</p></div>');
rep("<div><h2>Your Words vs Your Chart</h2><p>What you say you're here for, and what your love signature actually pulls toward. Neither is wrong.</p></div>",
    '<div><h2>Your Words vs Your Chart</h2><p>What you tell the apps, and what your heart quietly leans toward. Neither of them is wrong.</p></div>');
rep("<div><h2>The Deeper Pull</h2><p>What you want isn't always what stretches you, and your chart keeps those two in different places.</p></div>",
    '<div><h2>The Deeper Pull</h2><p>What you chase and what changes you rarely sit in the same place. Your chart keeps both coordinates, honestly.</p></div>');
rep('<div><h2>Your Dating Flags</h2><p>What you bring, what to watch, what to leave.</p></div>',
    '<div><h2>Your Dating Flags</h2><p>The love you give freely, the pattern to catch yourself in, and the thing worth walking away from.</p></div>');
rep('<div><h2>Your 3 Best Moves This Week</h2><p>Pick the option that feels most like you. It highlights.</p></div>',
    '<div><h2>Your 3 Best Moves This Week</h2><p>Don\'t overthink it. Pick what makes you smile and it lights up.</p></div>');
rep("<div><h2>Dating Traps to Avoid</h2><p>Your chart's honest shadow side.</p></div>",
    '<div><h2>Dating Traps to Avoid</h2><p>Every sign casts a shadow. Yours is named here kindly, which is how it loses power.</p></div>');
rep('<div><h2>Your Profile Bio Writer</h2><p>Real, copy-paste bios built from your exact chart, not templates everyone gets.</p></div>',
    '<div><h2>Your Profile Bio Writer</h2><p>Three real bios written from your sky, not a template everyone else gets. Copy them, edit them, make them yours.</p></div>');
rep('<div><h2>Share Without Spilling</h2><p>Show a date part, or all, of your blueprint. They never see your birth data.</p></div>',
    '<div><h2>Share Without Spilling</h2><p>Share a taste or the whole reading. Your birth data never travels with it.</p></div>');
rep('<div><h2>Your Shareable Bio Card</h2><p>Screenshot it straight into your dating profile.</p></div>',
    '<div><h2>Your Shareable Bio Card</h2><p>Made for your profile. Screenshot it and let it flirt for you.</p></div>');
rep('<div><h2>Your Social Cards</h2><p>Eight screenshot-ready cards built from your real chart. Swipe through on your story, or drop one into your profile.</p></div>',
    '<div><h2>Your Social Cards</h2><p>Eight cards made from your real chart, sized for stories. Post one, hint with one, or hand someone your whole sky.</p></div>');
rep('<div><h2>What they chose to show you</h2><p>No birth data was shared: just their finished readings.</p></div>',
    '<div><h2>What they chose to show you</h2><p>No birth data crossed over. Just the reading they chose to trust you with.</p></div>');

rep('<summary><span class="beat">♥</span> Why time &amp; place matter to <em>you</em> <span style="margin-left:auto">▸</span></summary>',
    '<summary><span class="beat">♥</span> Why time &amp; place matter to <em>you</em> <span class="beat" aria-hidden="true">♥</span> <span style="margin-left:auto">▸</span></summary>');
rep('<button class="btn" id="genBtn">Reveal My Blueprint <span class="beat">♥</span></button>',
    '<button class="btn" id="genBtn"><span class="beat">♥</span> Reveal My Blueprint <span class="beat">♥</span></button>');
rep('<div class="cap" id="accText" style="margin-top:6px;font-size:.8rem"></div>\n        </div>\n      </div>',
    '<div class="cap" id="accText" style="margin-top:6px;font-size:.8rem"></div>\n        </div>\n        <span class="glyph beat" aria-hidden="true">❤</span>\n      </div>');
rep('<div class="cap" id="pvIntent" style="margin-top:8px;display:none"><span class="pill intent"></span></div>\n        </div>\n      </div>',
    '<div class="cap" id="pvIntent" style="margin-top:8px;display:none"><span class="pill intent"></span></div>\n        </div>\n        <span class="glyph beat" aria-hidden="true">♥</span>\n      </div>');
rep('aria-pressed="false">♥ A long-term partner</button>',
    'aria-pressed="false">♥ A long-term partner ♥</button>');
rep('>♥ Add my blueprint &amp; compare</button>', '>♥ Add my blueprint &amp; compare ♥</button>');
rep('>♥ Save to my potential matches</button>', '>♥ Save to my potential matches ♥</button>');
rep('>♥ Save this match to my library</button>', '>♥ Save this match to my library ♥</button>');
rep('<h3>3 · Full degree compatibility</h3>',
    '<h3>3 · Full degree compatibility</h3>\n          <span class="dot" style="font-size:1.3rem" aria-hidden="true">✨</span>');
rep('<h4><span class="beat">♥</span> So what does this actually mean?</h4>',
    '<h4><span class="beat">♥</span> So what does this actually mean? <span class="beat" aria-hidden="true">♥</span></h4>');
rep('<h4>🟢 Green flags you give</h4>', '<h4>🟢 Green flags you give 🟢</h4>');
rep('<h4>🟡 Watch-points</h4>', '<h4>🟡 Watch-points 🟡</h4>');
rep('(universal: about them, not you)</span></h4>', '(universal: about them, not you)</span> 🔴</h4>');
rep("<h3>🕳️ Don't fall for these <span id=\"trapsSub\" style=\"font-size:.72em;font-weight:500;opacity:.7\"></span></h3>",
    "<h3>🕳️ Don't fall for these <span id=\"trapsSub\" style=\"font-size:.72em;font-weight:500;opacity:.7\"></span> 🕳️</h3>");
rep('>✍️ Built by your Bio Writer</a>', '>✍️ Built by your Bio Writer ✍️</a>');
rep('>📋 Copy bio</button>', '>📋 Copy bio 📋</button>');
rep('>More versions ✍️</button>', '>✍️ More versions ✍️</button>');
rep('>⚡ Punchy</button>', '>⚡ Punchy ⚡</button>');
rep('>😄 Playful</button>', '>😄 Playful 😄</button>');
rep('>💗 Sincere</button>', '>💗 Sincere 💗</button>');
rep('>🔥 Bold</button>', '>🔥 Bold 🔥</button>');
rep("<summary>👀 What they'll see", "<summary>👀 What they'll see 👀");
rep('>Compare ♥</button>', '>♥ Compare ♥</button>');
rep('>Run full synastry ♥</button>', '>♥ Run full synastry ♥</button>');
rep('>✎ Organize this match</h4>', '>✎ Organize this match ✎</h4>');
rep('data-flipbtn>Flip ♥</button>', 'data-flipbtn>♥ Flip ♥</button>');
rep('<span class="est">🔒 exact details needed</span>', '<span class="est">🔒 exact details needed 🔒</span>');
rep('>🔒 withheld</span>', '>🔒 withheld 🔒</span>');
rep('<div class="resume-s" id="resumeSub">—</div>\n    </div>\n    <button class="resume-go"',
    '<div class="resume-s" id="resumeSub">—</div>\n    </div>\n    <span class="resume-ico beat" aria-hidden="true">♥</span>\n    <button class="resume-go"');

/* ---------- 4. JS strings: mirror + warm ---------- */
rep("(p.n || 'Someone') + ' shared their blueprint with you ♥';",
    "'♥ ' + (p.n || 'Someone') + ' shared their blueprint with you ♥';");
rep("accEl.textContent = '⛔ Not computed';", "accEl.textContent = '⛔ Not computed ⛔';");
rep("accEl.textContent = '🎯 Exact chart';", "accEl.textContent = '🎯 Exact chart 🎯';");
rep("accEl.textContent = '🔓 Partial  ' + locked + ' locked';",
    "accEl.textContent = '🔓 Partial, ' + locked + ' locked 🔓';");
rep("accEl.textContent = '🎯 Exact (date only)';", "accEl.textContent = '🎯 Exact (date only) 🎯';");
rep("toast('Reopened ' + (rec.name || 'blueprint') + ' ♥');",
    "toast('♥ Reopened ' + (rec.name || 'blueprint') + ' ♥');");
rep("toast('Your spark compare is ready ♥');", "toast('♥ Your compare is ready ♥');");
rep("toast('Saved to Potential matches ♥');", "toast('♥ Saved to your potential matches ♥');");
rep("'Share link copied: send it to your spark ♥'", "'♥ Share link copied: send it to your spark ♥'");
rep("toast(\"That code doesn't look quite right ♥\");", "toast(\"♥ That code doesn't look quite right ♥\");");
rep("this.textContent = 'Fill in the form above: the compare happens automatically ♥';",
    "this.textContent = '♥ Fill in the form above, and the compare happens automatically ♥';");
rep("smb.textContent = '♥ Save ' + ((snap.n) || 'match') + ' to my library';",
    "smb.textContent = '♥ Save ' + ((snap.n) || 'match') + ' to my library ♥';");
rep("bt.push('♥ Venus ' + chart.placements.venus.name);",
    "bt.push('♥ Venus ' + chart.placements.venus.name + ' ♥');");
rep("bt.push('☾ Moon ' + chart.placements.moon.name);",
    "bt.push('☾ Moon ' + chart.placements.moon.name + ' ☾');");
rep("bt.push('♂ Mars ' + chart.placements.mars.name);",
    "bt.push('♂ Mars ' + chart.placements.mars.name + ' ♂');");
rep("verdict.textContent = '○ Left open';", "verdict.textContent = '○ Left open ○';");
rep("verdict.textContent = '✓ Aligned';", "verdict.textContent = '✓ Aligned ✓';");
rep("verdict.textContent = '◐ Mostly aligned';", "verdict.textContent = '◐ Mostly aligned ◐';");
rep("verdict.textContent = '◆ Two directions';", "verdict.textContent = '◆ Two directions ◆';");
rep('label:\'♥ Love Signature\', nav:', 'label:\'♥ Love Signature ♥\', nav:');
rep("label:'⚖️ Your Words'", "label:'⚖️ Your Words ⚖️'");
rep("label:'🧭 Deeper Pull'", "label:'🧭 Deeper Pull 🧭'");
rep("label:'🚦 Flags'", "label:'🚦 Flags 🚦'");
rep("label:'✨ Moves'", "label:'✨ Moves ✨'");
rep("label:'⚠️ Traps'", "label:'⚠️ Traps ⚠️'");
rep("label:'✍️ Bio Writer'", "label:'✍️ Bio Writer ✍️'");
rep("label:'🔐 Share'", "label:'🔐 Share 🔐'");
rep("label:'📸 Bio Card'", "label:'📸 Bio Card 📸'");
rep("label:'🖼️ Social Cards'", "label:'🖼️ Social Cards 🖼️'");
rep("'<span class=\"soc-url\">quantummerlin.com/loveblueprint</span>' +\n       '<span class=\"soc-footrow\"><span class=\"soc-h\">' + '\\u2665' + '</span>' +\n       '<span class=\"soc-cta\">decode yours</span></span></div>';",
    "'<span class=\"soc-url\">quantummerlin.com/loveblueprint</span>' +\n       '<span class=\"soc-footrow\"><span class=\"soc-h\">' + '\\u2665' + '</span>' +\n       '<span class=\"soc-cta\">decode yours</span><span class=\"soc-h\">' + '\\u2665' + '</span></span></div>';");
rep("h += '<div class=\"soc-label\">' + (opts.glyph ? opts.glyph + ' ' : '') + esc(opts.label) + '</div>';",
    "h += '<div class=\"soc-label\">' + (opts.glyph ? opts.glyph + ' ' : '') + esc(opts.label) + (opts.glyph ? ' ' + opts.glyph : '') + '</div>';");
rep("sub:'Emotional Needs'", "sub:'What makes you feel safe'");
rep("sub:'Communication'", "sub:'How you talk and text'");
rep("sub:'My ideal partner'", "sub:'Who your heart looks for'");
rep('\'<p class="intent-note" style="border-color:rgba(232,185,106,.4)">🔍 <b>Honest scope:</b>',
    '\'<p class="intent-note" style="border-color:rgba(232,185,106,.4)">🔍 <b>Honest scope:</b>');
rep('Nothing was padded with a made-up average.</p>\';',
    'Nothing was padded with a made-up average. 🔍</p>\';');
rep('instead of discovering it in month three.</p>\';',
    'instead of discovering it in month three. ⚖️</p>\';');
rep('That alignment is worth more than the percentage above.</p>\';',
    'That alignment is worth more than the percentage above. ✓</p>\';');
rep('Asking directly beats any score on this page.</p>\';',
    'Asking directly beats any score on this page. 💬</p>\';');
rep('treat this as a spark, not a sentence.</p></div>\';',
    'treat this as a spark, not a sentence. 🔒</p></div>\';');
rep('Clear your browser data and everything here is gone: nothing lives on a server.</p>',
    'Clear your browser data and everything here is gone: nothing lives on a server. 🔒</p>');
rep("<div class=\"soc-hint\">💛 Screenshot any card. They're sized for stories (9:16) and legible at feed-thumbnail size.</div>",
    "<div class=\"soc-hint\">💛 Screenshot any card. They're sized for stories and legible at thumbnail size. 💛</div>");
rep('Your Love Blueprint is ready ♥</h3>', '♥ Your Love Blueprint is ready ♥</h3>');
rep('>Begin the tour ♥</button>', '>♥ Begin the tour ♥</button>');
rep("'<h3>You have read your blueprint \\u2665</h3>'", "'<h3>\\u2665 You have read your blueprint \\u2665</h3>'");
rep('>\\u270D\\uFE0F Write my bio</button>', '>\\u270D\\uFE0F Write my bio \\u270D\\uFE0F</button>');
rep('>\\uD83D\\uDCF8 Grab a card</button>', '>\\uD83D\\uDCF8 Grab a card \\uD83D\\uDCF8</button>');
rep('>\\uD83D\\uDD10 Share privately</button>', '>\\uD83D\\uDD10 Share privately \\uD83D\\uDD10</button>');
rep("b2.textContent = 'Now use it \\u2192 Bio Writer done? Share it \\u2665';",
    "b2.textContent = '\\u2665 You have read your sky, now share it \\u2665';");
rep("data-act=\"edit\" type=\"button\">✎ Edit</button>'",
    "data-act=\"edit\" type=\"button\">✎ Edit ✎</button>'");
rep("this.textContent = on ? '✓ Done' : '✎ Edit';",
    "this.textContent = on ? '✓ Done ✓' : '✎ Edit ✎';");
rep("'<span class=\"lib-ico beat\">♥</span>' +",
    "'<span class=\"lib-ico beat\">♥</span>' +");
rep("(r.birthTime ? ' · exact chart' : ' · date only') + '</div></div>';",
    "(r.birthTime ? ' · exact chart' : ' · date only') + '</div></div>' +\n        '<span class=\"lib-ico beat\" aria-hidden=\"true\">♥</span>';");

fs.writeFileSync(FILE, src, 'utf8');
console.log('  replacements applied: ' + ok);
if (misses.length) {
    console.log('  MISSES (' + misses.length + '):');
    misses.forEach(m => console.log('    - ' + m));
} else {
    console.log('  MISSES: none');
}
