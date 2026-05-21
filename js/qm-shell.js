/**
 * qm-shell.js v3 — QM Universal Navigation Shell
 *
 * Depends on: qm-profiles.js (must load before this script)
 *
 * Features:
 *  - Desktop (≥1024px): PERSISTENT sidebar always visible (240px)
 *  - Mobile (<1024px):  Slide-in drawer via hamburger
 *  - Fixed topbar with profile button (opens QMProfilesUI panel)
 *  - Scrollable tool cards in sidebar, filtered by category
 *  - "More Tools" section at bottom of every page
 *  - Fixed ticker bar (42px, bottom)
 *  - Auto-prefill integration via QMProfilesUI
 */
(function () {
  'use strict';

  var SIDEBAR_W = 240;

  /* ─── Brand tokens ─────────────────────────────────────────── */
  var C = {
    cyan:   '#00f5ff',
    gold:   '#ffd700',
    mag:    '#ff00ff',
    purple: '#9d00ff',
    pink:   '#ff6b9d',
    bg:     '#0a0a0f',
    surf:   '#0f0f1a',
    surf2:  '#141428',
    text:   '#f0e6ff',
    muted:  'rgba(240,230,255,.55)',
  };

  /* ─── Tool catalogue ──────────────────────────────────────── */
  var TOOLS = [
    // Numerology
    { n:'Life Path Calculator',     h:'/life-path-calculator.html',      c:'Numerology',    e:'🔢', hot:true },
    { n:'Birth Sigil Generator',    h:'/birth-sigil.html',               c:'Numerology',    e:'🔯' },
    { n:'Business Numerology',      h:'/business-numerology.html',       c:'Numerology',    e:'💼' },
    { n:'Personal Day',             h:'/personal-day.html',              c:'Numerology',    e:'📅' },
    { n:'Personal Year 2026',       h:'/personal-year-2026.html',        c:'Numerology',    e:'🗓️' },
    { n:'Forecasts',                h:'/forecasts.html',                 c:'Numerology',    e:'🔭' },
    { n:'Quantum Sigil Generator',  h:'/quantum-sigil-generator.html',   c:'Numerology',    e:'✡️' },
    { n:'Quantum Sigil Gallery',    h:'/quantum-sigil-gallery.html',     c:'Numerology',    e:'🖼️' },
    // Angel Numbers
    { n:'Angel Number Calculator',  h:'/angel-number-calculator.html',   c:'Angel Numbers', e:'👼', hot:true },
    { n:'Angel Number Full Reading',h:'/angel-number-full-reading.html', c:'Angel Numbers', e:'📜' },
    { n:'Angel Numbers Guide',      h:'/angel-numbers/index.html',       c:'Angel Numbers', e:'📖' },
    // Manifestation
    { n:'Unconscious Contract',     h:'/contract.html',                  c:'Manifestation', e:'📋', hot:true },
    { n:'Contract Deep Dive',       h:'/contractfull.html',              c:'Manifestation', e:'🔍' },
    { n:'Energy Leak Detector',     h:'/energyleak.html',                c:'Manifestation', e:'⚡', hot:true },
    { n:'Energy Leak Deep Dive',    h:'/energyleakfull.html',            c:'Manifestation', e:'🔍' },
    { n:'Hidden Strengths',         h:'/hidden-strengths-revealer.html', c:'Manifestation', e:'💪' },
    { n:'Identity Split Detector',  h:'/identity-split-detector.html',   c:'Manifestation', e:'🪞' },
    { n:'Power Avoidance Pattern',  h:'/power-avoidance-pattern.html',   c:'Manifestation', e:'🚧' },
    { n:'Manifest',                 h:'/manifest.html',                  c:'Manifestation', e:'✨' },
    { n:'Manifest Deep Dive',       h:'/manifestfull.html',              c:'Manifestation', e:'🔍' },
    { n:'Trust Radar',              h:'/trust-radar.html',               c:'Manifestation', e:'🎯' },
    { n:'Reality Codes',            h:'/Reality codes/index.html',       c:'Manifestation', e:'🌀' },
    // Soul Blueprint
    { n:'Soul Blueprint',           h:'/soulblueprint/index.html',       c:'Soul Blueprint',e:'🌟', hot:true },
    { n:'Soul Card',                h:'/soulcard.html',                  c:'Soul Blueprint',e:'🃏' },
    { n:'Quantum Rose',             h:'/quantum-rose.html',              c:'Soul Blueprint',e:'🌹' },
    { n:'Reading Generator',        h:'/reading-generator.html',         c:'Soul Blueprint',e:'📿' },
    { n:'Readings',                 h:'/readings/index.html',            c:'Soul Blueprint',e:'📚' },
    // Frequency
    { n:'Frequency Generator',      h:'/Frequency Generator/index.html', c:'Frequency',     e:'🎵', hot:true },
    { n:'40hz Frequency',           h:'/40hz/index.html',                c:'Frequency',     e:'🔊' },
    { n:'Frequency Generator Alt',  h:'/frequencygenerator/index.html',  c:'Frequency',     e:'🎶' },
    // Zodiac
    { n:'Chinese Zodiac',           h:'/chinesezodiac/index.html',       c:'Zodiac',        e:'♋', hot:true },
    // Compatibility
    { n:'Compatibility',            h:'/compatibility.html',             c:'Compatibility', e:'💞', hot:true },
    // Tools & Guides
    { n:'Workshop',                 h:'/workshop.html',                  c:'Guides',        e:'🛠️' },
    { n:'Library',                  h:'/library.html',                   c:'Guides',        e:'📚' },
    { n:'Guides',                   h:'/guides/index.html',              c:'Guides',        e:'📖' },
    { n:'Expand',                   h:'/Expand/index.html',              c:'Guides',        e:'🔭' },
  ];

  /* ─── Category config ─────────────────────────────────────── */
  var CATS = [
    { id:'All',           e:'⬡',  col: C.cyan   },
    { id:'Numerology',    e:'🔢', col: C.cyan   },
    { id:'Angel Numbers', e:'👼', col: C.gold   },
    { id:'Manifestation', e:'✨', col: C.mag    },
    { id:'Soul Blueprint',e:'🌟', col: C.purple },
    { id:'Frequency',     e:'🎵', col: C.pink   },
    { id:'Zodiac',        e:'♋', col: C.gold   },
    { id:'Compatibility', e:'💞', col: C.pink   },
    { id:'Guides',        e:'📖', col: C.muted  },
  ];

  /* ─── Tickers ─────────────────────────────────────────────── */
  var TICKERS = [
    '🔢 Life Path Calculator — decode your destiny number',
    '👼 Angel Numbers — 111 · 222 · 333 · 444 · 555',
    '🔯 Birth Sigil — your unique quantum signature',
    '📋 Unconscious Contracts — reveal hidden life rules',
    '🎵 Frequency Generator — tune to sacred healing sound',
    '♋ Chinese Zodiac — navigate by the stars',
    '✨ 35 tools across 8 categories — explore the Ecosystem',
    '🔮 Quantum Merlin — where mysticism meets mathematics',
    '💞 Compatibility — quantum relationship mapping',
    '🌟 Soul Blueprint — read your soul contract and purpose',
  ];

  /* ─── Helpers ─────────────────────────────────────────────── */
  function currentPath() {
    return window.location.pathname.replace(/\/+$/, '') || '/';
  }
  function getToolName() {
    var t = document.title || '';
    return t.replace(/\s*[|—–-].*$/, '').replace(/Quantum Merlin\s*/i, '').trim() || 'Quantum Tool';
  }
  function getCat() {
    var path = currentPath();
    for (var i = 0; i < TOOLS.length; i++) {
      var th = TOOLS[i].h.split('?')[0].replace(/\/$/, '');
      if (path === th || path === th.replace('/index.html','')) return TOOLS[i].c;
    }
    if (/angel/i.test(path))           return 'Angel Numbers';
    if (/numerology|life.path|sigil|business.num|forecast|personal/i.test(path)) return 'Numerology';
    if (/contract|manifest|energy.?leak|hidden|identity|power|trust|reality/i.test(path)) return 'Manifestation';
    if (/soul|reading|rose/i.test(path))   return 'Soul Blueprint';
    if (/frequency|40hz/i.test(path))      return 'Frequency';
    if (/zodiac|chinese/i.test(path))      return 'Zodiac';
    if (/compat/i.test(path))              return 'Compatibility';
    return null;
  }
  function catColor(cat) {
    for (var i=0;i<CATS.length;i++) if(CATS[i].id===cat) return CATS[i].col;
    return C.cyan;
  }
  function isDesktop() { return window.innerWidth >= 1024; }

  function relatedTools(activeCat) {
    var path = currentPath();
    var same = [], other = [];
    TOOLS.forEach(function (t) {
      var th = t.h.split('?')[0].replace(/\/$/, '');
      if (th === path || th === path.replace('/index.html','')) return;
      if (t.c === activeCat) same.push(t);
      else if (t.hot) other.push(t);
    });
    other.sort(function () { return Math.random() - .5; });
    return same.slice(0,4).concat(other.slice(0,4));
  }

  /* ─── CSS ─────────────────────────────────────────────────── */
  function injectCSS() {
    if (document.getElementById('qms-styles')) return;
    var s = `
*, .qms-topbar *, .qms-sidebar *, .qms-ticker *, .qms-more * { box-sizing:border-box; }

/* ── TOPBAR ── */
.qms-topbar {
  position:fixed;top:0;right:0;z-index:9999;
  left:0;
  height:60px;
  background:rgba(10,10,15,.97);
  border-bottom:1px solid rgba(0,245,255,.12);
  display:flex;align-items:center;gap:10px;padding:0 16px;
  backdrop-filter:blur(16px);
  transition:left .3s cubic-bezier(.4,0,.2,1);
}
.qms-topbar::after {
  content:"";position:absolute;bottom:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,${C.cyan} 30%,${C.mag} 70%,transparent);
  opacity:.4;pointer-events:none;
}
body.qms-desktop .qms-topbar { left:${SIDEBAR_W}px; }

.qms-ham {
  background:none;border:none;cursor:pointer;
  padding:8px 4px;display:flex;flex-direction:column;gap:5px;flex-shrink:0;
}
.qms-ham span {
  display:block;width:20px;height:2px;
  background:${C.cyan};border-radius:2px;
  transition:transform .25s,opacity .25s;
}
.qms-ham.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.qms-ham.open span:nth-child(2){opacity:0;}
.qms-ham.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
body.qms-desktop .qms-ham { display:none; }

.qms-logo {
  display:flex;align-items:center;gap:8px;text-decoration:none;flex-shrink:0;
}
.qms-logo-icon {font-size:1.2rem;}
.qms-logo-text {
  font-family:"Cinzel Decorative","Cinzel",serif;
  font-size:.62rem;color:${C.gold};letter-spacing:.04em;white-space:nowrap;
}
.qms-toolname {
  flex:1;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
  font-family:"Orbitron","Exo 2",sans-serif;
  font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;
  color:rgba(240,230,255,.55);padding:0 8px;
}
.qms-topbar-actions {display:flex;align-items:center;gap:8px;flex-shrink:0;}
.qms-hub-btn {
  background:rgba(0,245,255,.08);border:1px solid rgba(0,245,255,.2);
  border-radius:6px;color:${C.cyan};padding:5px 12px;
  font-family:"Orbitron",sans-serif;font-size:.58rem;
  letter-spacing:.08em;text-transform:uppercase;text-decoration:none;
  white-space:nowrap;transition:all .2s;
}
.qms-hub-btn:hover {background:rgba(0,245,255,.16);border-color:${C.cyan};color:#fff;}
/* Profile button */
#qmpTopBtn {
  width:36px;height:36px;border-radius:50%;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.15);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:1.1rem;
  transition:all .2s;flex-shrink:0;
}
#qmpTopBtn:hover {border-color:${C.cyan};background:rgba(0,245,255,.1);box-shadow:0 0 12px rgba(0,245,255,.2);}

/* ── OVERLAY ── */
.qms-overlay {
  display:none;position:fixed;inset:0;z-index:9998;
  background:rgba(0,0,0,.6);backdrop-filter:blur(4px);
}
.qms-overlay.open{display:block;}
body.qms-desktop .qms-overlay{display:none!important;}

/* ── SIDEBAR ── */
.qms-sidebar {
  position:fixed;top:0;left:0;bottom:0;z-index:10000;
  width:${SIDEBAR_W}px;
  background:linear-gradient(180deg,${C.bg} 0%,${C.surf} 100%);
  border-right:1px solid rgba(0,245,255,.1);
  display:flex;flex-direction:column;overflow:hidden;
  /* Mobile: hidden by default */
  transform:translateX(-100%);
  transition:transform .3s cubic-bezier(.4,0,.2,1);
}
.qms-sidebar.open { transform:translateX(0); }
body.qms-desktop .qms-sidebar {
  transform:translateX(0)!important;
  transition:none;
  z-index:9996;
}

/* Sidebar header */
.qms-sb-header {
  padding:16px 14px 12px;flex-shrink:0;
  background:linear-gradient(135deg,rgba(0,245,255,.05),rgba(157,0,255,.05));
  border-bottom:1px solid rgba(0,245,255,.08);
}
.qms-sb-logo {
  display:flex;align-items:center;gap:8px;text-decoration:none;margin-bottom:10px;
}
.qms-sb-logo-icon {font-size:1.5rem;}
.qms-sb-logo-name {
  font-family:"Cinzel Decorative","Cinzel",serif;
  font-size:.72rem;color:${C.gold};letter-spacing:.03em;
}
.qms-sb-logo-sub {
  font-family:"Orbitron",sans-serif;
  font-size:.48rem;letter-spacing:.14em;text-transform:uppercase;
  color:rgba(240,230,255,.35);margin-top:1px;
}
.qms-sb-hub {
  display:flex;align-items:center;gap:6px;
  background:rgba(0,245,255,.07);border:1px solid rgba(0,245,255,.18);
  border-radius:7px;padding:7px 10px;text-decoration:none;
  font-family:"Orbitron",sans-serif;font-size:.58rem;
  letter-spacing:.08em;text-transform:uppercase;color:${C.cyan};
  transition:all .2s;
}
.qms-sb-hub:hover{background:rgba(0,245,255,.14);box-shadow:0 0 12px rgba(0,245,255,.15);}

/* Category filter tabs */
.qms-cat-tabs {
  display:flex;gap:5px;padding:8px 10px;overflow-x:auto;flex-shrink:0;
  border-bottom:1px solid rgba(0,245,255,.06);
  scrollbar-width:none;
}
.qms-cat-tabs::-webkit-scrollbar{display:none;}
.qms-cat-tab {
  flex-shrink:0;
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);
  border-radius:16px;padding:3px 9px;
  font-family:"Orbitron",sans-serif;font-size:.5rem;
  letter-spacing:.06em;text-transform:uppercase;
  color:rgba(240,230,255,.5);cursor:pointer;transition:all .18s;white-space:nowrap;
}
.qms-cat-tab:hover{background:rgba(0,245,255,.08);border-color:rgba(0,245,255,.25);color:${C.cyan};}
.qms-cat-tab.active{background:rgba(0,245,255,.1);border-color:${C.cyan};color:${C.cyan};}

/* Tool card list */
.qms-sb-scroll {
  flex:1;overflow-y:auto;padding:6px 8px 70px;
}
.qms-sb-scroll::-webkit-scrollbar{width:3px;}
.qms-sb-scroll::-webkit-scrollbar-track{background:transparent;}
.qms-sb-scroll::-webkit-scrollbar-thumb{background:rgba(0,245,255,.15);border-radius:2px;}
.qms-tool-mini {
  display:flex;align-items:center;gap:8px;
  padding:8px 9px;border-radius:8px;margin-bottom:2px;
  text-decoration:none;border:1px solid transparent;
  transition:all .16s;position:relative;
}
.qms-tool-mini:hover{
  background:rgba(0,245,255,.05);border-color:rgba(0,245,255,.15);
}
.qms-tool-mini.current{
  background:rgba(0,245,255,.08);border-color:rgba(0,245,255,.25);
}
.qms-tool-mini::before{
  content:"";position:absolute;left:0;top:50%;transform:translateY(-50%);
  width:2px;height:0;background:${C.cyan};border-radius:0 2px 2px 0;
  transition:height .16s;
}
.qms-tool-mini:hover::before,.qms-tool-mini.current::before{height:55%;}
.qms-mini-icon{
  font-size:1.05rem;width:28px;height:28px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  background:rgba(255,255,255,.04);border-radius:7px;
}
.qms-mini-info{flex:1;min-width:0;}
.qms-mini-name{
  font-family:"Exo 2",sans-serif;font-size:.7rem;
  color:rgba(240,230,255,.8);font-weight:500;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.qms-mini-cat{
  font-family:"Orbitron",sans-serif;font-size:.46rem;
  letter-spacing:.07em;text-transform:uppercase;margin-top:1px;
}
.qms-mini-hot{
  font-size:.55rem;flex-shrink:0;
}

/* ── MORE TOOLS SECTION ── */
.qms-more {
  padding:56px 22px 36px;position:relative;
  background:linear-gradient(180deg,transparent,rgba(0,245,255,.02) 40%,rgba(157,0,255,.02) 100%);
}
.qms-more::before{
  content:"";position:absolute;top:0;left:8%;right:8%;height:1px;
  background:linear-gradient(90deg,transparent,rgba(0,245,255,.2),rgba(255,0,255,.15),transparent);
}
.qms-more-title{
  font-family:"Cinzel Decorative","Cinzel",serif;
  font-size:1.3rem;color:${C.gold};text-align:center;margin:0 0 6px;
}
.qms-more-sub{
  font-family:"Exo 2",sans-serif;font-size:.82rem;
  color:rgba(240,230,255,.45);text-align:center;margin:0 0 28px;
}
.qms-more-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(180px,1fr));
  gap:12px;max-width:900px;margin:0 auto 28px;
}
.qms-more-card{
  background:linear-gradient(135deg,${C.surf},${C.surf2});
  border:1px solid rgba(255,255,255,.06);border-radius:12px;
  padding:16px 14px;text-decoration:none;
  display:flex;flex-direction:column;gap:6px;
  transition:all .22s;position:relative;overflow:hidden;
}
.qms-more-card::after{
  content:"";position:absolute;inset:0;border-radius:12px;
  background:linear-gradient(135deg,rgba(0,245,255,.06),rgba(157,0,255,.04));
  opacity:0;transition:opacity .22s;
}
.qms-more-card:hover{
  transform:translateY(-4px);border-color:rgba(0,245,255,.22);
  box-shadow:0 8px 28px rgba(0,245,255,.1),0 2px 8px rgba(0,0,0,.4);
}
.qms-more-card:hover::after{opacity:1;}
.qms-more-icon{font-size:1.8rem;line-height:1;}
.qms-more-name{
  font-family:"Exo 2",sans-serif;font-size:.82rem;
  font-weight:600;color:rgba(240,230,255,.9);line-height:1.3;
}
.qms-more-cat{
  font-family:"Orbitron",sans-serif;font-size:.48rem;
  letter-spacing:.1em;text-transform:uppercase;
  padding:2px 6px;border-radius:10px;
  background:rgba(255,255,255,.06);display:inline-block;align-self:flex-start;
}
.qms-more-cta{
  font-family:"Orbitron",sans-serif;font-size:.55rem;
  letter-spacing:.08em;text-transform:uppercase;
  color:${C.cyan};margin-top:auto;padding-top:4px;
  display:flex;align-items:center;gap:4px;transition:gap .18s;
}
.qms-more-card:hover .qms-more-cta{gap:8px;}
.qms-more-hub-row{display:flex;justify-content:center;}
.qms-more-hub-btn{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(0,245,255,.08);border:1px solid rgba(0,245,255,.25);
  border-radius:10px;padding:11px 26px;text-decoration:none;
  font-family:"Orbitron",sans-serif;font-size:.66rem;
  letter-spacing:.1em;text-transform:uppercase;color:${C.cyan};
  transition:all .22s;
}
.qms-more-hub-btn:hover{background:rgba(0,245,255,.16);box-shadow:0 0 20px rgba(0,245,255,.2);color:#fff;}

/* ── TICKER ── */
.qms-ticker{
  position:fixed;bottom:0;left:0;right:0;z-index:9997;
  height:42px;overflow:hidden;
  background:rgba(10,10,15,.98);border-top:1px solid rgba(0,245,255,.1);
  display:flex;align-items:center;
}
body.qms-desktop .qms-ticker{ left:${SIDEBAR_W}px; }
.qms-ticker-label{
  flex-shrink:0;padding:0 13px;
  font-family:"Orbitron",sans-serif;font-size:.5rem;
  letter-spacing:.14em;text-transform:uppercase;color:${C.cyan};
  border-right:1px solid rgba(0,245,255,.1);height:100%;
  display:flex;align-items:center;
}
.qms-ticker-track{flex:1;overflow:hidden;}
.qms-ticker-inner{
  display:flex;white-space:nowrap;
  animation:qms-scroll 40s linear infinite;
}
.qms-ticker-inner:hover{animation-play-state:paused;}
.qms-ticker-item{
  display:inline-flex;align-items:center;padding:0 26px;
  font-family:"Exo 2",sans-serif;font-size:.64rem;
  letter-spacing:.04em;color:rgba(240,230,255,.52);
  border-right:1px solid rgba(0,245,255,.06);
}
@keyframes qms-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ── BODY LAYOUT ── */
body.qms-active{
  padding-top:60px!important;
  padding-bottom:42px!important;
}
body.qms-desktop.qms-active{
  margin-left:${SIDEBAR_W}px!important;
}
@media(max-width:1023px){
  .qms-logo-text{display:none;}
  .qms-more-grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;}
}
`;
    var el = document.createElement('style');
    el.id = 'qms-styles';
    el.textContent = s;
    document.head.appendChild(el);
  }

  /* ─── Build topbar ──────────────────────────────────────────── */
  function buildTopbar() {
    var div = document.createElement('div');
    div.className = 'qms-topbar';
    div.id = 'qmsTopbar';
    div.innerHTML =
      '<button class="qms-ham" id="qmsHam" aria-label="Menu">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
      '<a href="/index.html" class="qms-logo">' +
        '<span class="qms-logo-icon">🧙‍♂️</span>' +
        '<span class="qms-logo-text">Quantum Merlin</span>' +
      '</a>' +
      '<div class="qms-toolname">' + getToolName() + '</div>' +
      '<div class="qms-topbar-actions">' +
        '<a href="/index.html" class="qms-hub-btn">⬡ Hub</a>' +
        '<button id="qmpTopBtn" title="Your Profile" aria-label="Profile">👤</button>' +
      '</div>';
    return div;
  }

  /* ─── Build overlay ─────────────────────────────────────────── */
  function buildOverlay() {
    var div = document.createElement('div');
    div.className = 'qms-overlay';
    div.id = 'qmsOverlay';
    return div;
  }

  /* ─── Build sidebar ─────────────────────────────────────────── */
  function buildSidebar() {
    var activeCat = getCat();
    var path = currentPath();

    var tabsHtml = CATS.map(function (cat) {
      var isActive = (cat.id === 'All' && !activeCat) || cat.id === activeCat;
      return '<button class="qms-cat-tab' + (isActive?' active':'') + '" data-cat="' + cat.id + '">' +
        cat.e + ' ' + cat.id + '</button>';
    }).join('');

    var toolsHtml = TOOLS.map(function (t) {
      var th = t.h.split('?')[0].replace(/\/$/, '');
      var isCur = path === th || path === th.replace('/index.html','');
      var col = catColor(t.c);
      return '<a href="' + t.h + '" class="qms-tool-mini' + (isCur?' current':'') + '"' +
        ' data-cat="' + t.c + '">' +
        '<span class="qms-mini-icon">' + t.e + '</span>' +
        '<span class="qms-mini-info">' +
          '<div class="qms-mini-name">' + t.n + '</div>' +
          '<div class="qms-mini-cat" style="color:' + col + '">' + t.c + '</div>' +
        '</span>' +
        (t.hot ? '<span class="qms-mini-hot">🔥</span>' : '') +
      '</a>';
    }).join('');

    var div = document.createElement('div');
    div.className = 'qms-sidebar';
    div.id = 'qmsSidebar';
    div.innerHTML =
      '<div class="qms-sb-header">' +
        '<a href="/index.html" class="qms-sb-logo">' +
          '<span class="qms-sb-logo-icon">🧙‍♂️</span>' +
          '<div>' +
            '<div class="qms-sb-logo-name">Quantum Merlin</div>' +
            '<div class="qms-sb-logo-sub">35 Tools · Growing</div>' +
          '</div>' +
        '</a>' +
        '<a href="/index.html" class="qms-sb-hub">⬡ &nbsp;All Tools Hub</a>' +
      '</div>' +
      '<div class="qms-cat-tabs" id="qmsCatTabs">' + tabsHtml + '</div>' +
      '<div class="qms-sb-scroll" id="qmsSbScroll">' + toolsHtml + '</div>';

    return div;
  }

  /* ─── Build More Tools section ──────────────────────────────── */
  function buildMore() {
    var activeCat = getCat();
    var related   = relatedTools(activeCat);
    if (!related.length) return null;

    var cardsHtml = related.map(function (t) {
      return '<a href="' + t.h + '" class="qms-more-card">' +
        '<div class="qms-more-icon">' + t.e + '</div>' +
        '<div class="qms-more-name">' + t.n + '</div>' +
        '<div class="qms-more-cat" style="color:' + catColor(t.c) + '">' + t.c + '</div>' +
        '<div class="qms-more-cta">Open <span>→</span></div>' +
      '</a>';
    }).join('');

    var label = activeCat ? 'More ' + activeCat + ' Tools' : 'Explore More Tools';

    var sec = document.createElement('section');
    sec.className = 'qms-more';
    sec.id = 'qmsMore';
    sec.innerHTML =
      '<h2 class="qms-more-title">✨ ' + label + '</h2>' +
      '<p class="qms-more-sub">35 quantum tools and growing</p>' +
      '<div class="qms-more-grid">' + cardsHtml + '</div>' +
      '<div class="qms-more-hub-row">' +
        '<a href="/index.html" class="qms-more-hub-btn">⬡ &nbsp; Browse all tools →</a>' +
      '</div>';
    return sec;
  }

  /* ─── Build ticker ──────────────────────────────────────────── */
  function buildTicker() {
    var items = TICKERS.concat(TICKERS);
    var div = document.createElement('div');
    div.className = 'qms-ticker';
    div.innerHTML =
      '<div class="qms-ticker-label">LIVE</div>' +
      '<div class="qms-ticker-track"><div class="qms-ticker-inner">' +
        items.map(function(t){ return '<span class="qms-ticker-item">'+t+'</span>'; }).join('') +
      '</div></div>';
    return div;
  }

  /* ─── Hide old header ───────────────────────────────────────── */
  function hideOld() {
    ['header.qm-header','#qmTopbar','.qm-header'].forEach(function(s){
      var el = document.querySelector(s);
      if (el) el.style.cssText = 'display:none!important';
    });
  }

  /* ─── Category filter ───────────────────────────────────────── */
  function wireCatFilter(sidebar) {
    var tabs  = sidebar.querySelectorAll('.qms-cat-tab');
    var cards = sidebar.querySelectorAll('.qms-tool-mini');
    var activeCat = getCat();

    // Init: filter to active category
    if (activeCat) {
      cards.forEach(function (c) { c.style.display = c.dataset.cat === activeCat ? '' : 'none'; });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function(t){ t.classList.remove('active'); });
        tab.classList.add('active');
        var cat = tab.dataset.cat;
        cards.forEach(function (c) {
          c.style.display = (cat === 'All' || c.dataset.cat === cat) ? '' : 'none';
        });
        var scroll = sidebar.querySelector('#qmsSbScroll');
        if (scroll) scroll.scrollTop = 0;
      });
    });
  }

  /* ─── Responsive sidebar handling ──────────────────────────── */
  function applyLayout() {
    if (isDesktop()) {
      document.body.classList.add('qms-desktop');
    } else {
      document.body.classList.remove('qms-desktop');
    }
  }

  /* ─── Wire all interactions ─────────────────────────────────── */
  function wire(sidebar, overlay) {
    var ham = document.getElementById('qmsHam');

    function open()  { sidebar.classList.add('open'); overlay.classList.add('open'); if(ham) ham.classList.add('open'); }
    function close() { sidebar.classList.remove('open'); overlay.classList.remove('open'); if(ham) ham.classList.remove('open'); }

    if (ham) ham.addEventListener('click', function(e) {
      e.stopPropagation();
      sidebar.classList.contains('open') ? close() : open();
    });
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
    sidebar.querySelectorAll('.qms-tool-mini').forEach(function(el){
      el.addEventListener('click', function(){ if(!isDesktop()) close(); });
    });

    // Profile button
    var profBtn = document.getElementById('qmpTopBtn');
    if (profBtn && window.QMProfilesUI) {
      profBtn.addEventListener('click', function(e){
        e.stopPropagation();
        window.QMProfilesUI.openPanel();
      });
    }

    // Responsive
    window.addEventListener('resize', applyLayout);
  }

  /* ─── Mount ─────────────────────────────────────────────────── */
  function mount() {
    // Profiles CSS (if module loaded)
    if (window.QMProfilesUI) window.QMProfilesUI.injectCSS();

    injectCSS();
    hideOld();
    applyLayout();

    var topbar  = buildTopbar();
    var overlay = buildOverlay();
    var sidebar = buildSidebar();
    var more    = buildMore();
    var ticker  = buildTicker();

    document.body.insertBefore(ticker,  document.body.firstChild);
    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(sidebar, document.body.firstChild);
    document.body.insertBefore(topbar,  document.body.firstChild);
    if (more) document.body.insertBefore(more, ticker);

    document.body.classList.add('qms-active');

    wireCatFilter(sidebar);
    wire(sidebar, overlay);

    // Profiles integration
    if (window.QMProfilesUI) {
      window.QMProfilesUI.updateTopbarBtn();
      window.QMProfiles && window.QMProfiles.onChange(function(){
        window.QMProfilesUI.updateTopbarBtn();
      });
      // Check if this page has reading inputs → offer pre-fill
      window.QMProfilesUI.checkForPrefill();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

})();
