/**
 * qm-shell.js v2 — QM Universal Navigation Shell
 *
 * Injects into any existing QM tool page:
 *   1. Fixed topbar (60px) — hamburger + logo + tool name + hub link
 *   2. Slide-in sidebar drawer — scrollable tool CARDS grouped by category
 *   3. "More Tools" section — cards injected at bottom of page content
 *   4. Fixed ticker bar (42px, bottom)
 *
 * Zero dependencies. All styles scoped to .qms- prefix.
 */
(function () {
  'use strict';

  /* ─── Brand tokens ─────────────────────────────────────────── */
  var C = {
    cyan:    '#00f5ff',
    gold:    '#ffd700',
    mag:     '#ff00ff',
    purple:  '#9d00ff',
    pink:    '#ff6b9d',
    bg:      '#0a0a0f',
    surf:    '#0f0f1a',
    surf2:   '#141428',
    text:    '#f0e6ff',
    muted:   'rgba(240,230,255,.55)',
  };

  /* ─── Tool catalogue (69 tools embedded) ───────────────────── */
  var TOOLS = [{"n":"Frequency Generator","h":"/Frequency Generator/index.html","c":"Frequency","e":"🎵"},{"n":"Angel Number Calculator","h":"/angel-number-calculator.html","c":"Angel Numbers","e":"👼"},{"n":"Angel Number Full Reading","h":"/angel-number-full-reading.html","c":"Angel Numbers","e":"👼"},{"n":"Birth Sigil","h":"/birth-sigil.html","c":"Numerology","e":"🔢"},{"n":"Business Numerology","h":"/business-numerology.html","c":"Numerology","e":"🔢"},{"n":"Compatibility","h":"/compatibility.html","c":"Compatibility","e":"💞"},{"n":"Unconscious Contract","h":"/contract.html","c":"Manifestation","e":"✨"},{"n":"Contract Full","h":"/contractfull.html","c":"Manifestation","e":"✨"},{"n":"Energy Leak Detector","h":"/energyleak.html","c":"Manifestation","e":"✨"},{"n":"Energy Leak Full","h":"/energyleakfull.html","c":"Manifestation","e":"✨"},{"n":"Forecasts","h":"/forecasts.html","c":"Numerology","e":"🔢"},{"n":"Hidden Strengths","h":"/hidden-strengths-revealer.html","c":"Manifestation","e":"✨"},{"n":"Identity Split Detector","h":"/identity-split-detector.html","c":"Manifestation","e":"✨"},{"n":"Library","h":"/library.html","c":"Tools & Guides","e":"📖"},{"n":"Life Path Calculator","h":"/life-path-calculator.html","c":"Numerology","e":"🔢"},{"n":"Manifest","h":"/manifest.html","c":"Manifestation","e":"✨"},{"n":"Manifest Full","h":"/manifestfull.html","c":"Manifestation","e":"✨"},{"n":"Personal Day","h":"/personal-day.html","c":"Numerology","e":"🔢"},{"n":"Personal Year 2026","h":"/personal-year-2026.html","c":"Numerology","e":"🔢"},{"n":"Power Avoidance Pattern","h":"/power-avoidance-pattern.html","c":"Manifestation","e":"✨"},{"n":"Quantum Forum","h":"/quantum-forum.html","c":"Tools & Guides","e":"📖"},{"n":"Quantum Rose","h":"/quantum-rose.html","c":"Soul Blueprint","e":"🌟"},{"n":"Quantum Sigil Gallery","h":"/quantum-sigil-gallery.html","c":"Numerology","e":"🔢"},{"n":"Quantum Sigil Generator","h":"/quantum-sigil-generator.html","c":"Numerology","e":"🔢"},{"n":"Reading Generator","h":"/reading-generator.html","c":"Soul Blueprint","e":"🌟"},{"n":"Readings","h":"/readings/index.html","c":"Soul Blueprint","e":"🌟"},{"n":"Soul Card","h":"/soulcard.html","c":"Soul Blueprint","e":"🌟"},{"n":"Trust Radar","h":"/trust-radar.html","c":"Manifestation","e":"✨"},{"n":"Workshop","h":"/workshop.html","c":"Tools & Guides","e":"📖"},{"n":"40hz Frequency","h":"/40hz/index.html","c":"Frequency","e":"🎵"},{"n":"Chinese Zodiac","h":"/chinesezodiac/index.html","c":"Zodiac","e":"♋"},{"n":"Angel Numbers Guide","h":"/angel-numbers/index.html","c":"Angel Numbers","e":"👼"},{"n":"Guides","h":"/guides/index.html","c":"Tools & Guides","e":"📖"},{"n":"Soul Blueprint","h":"/soulblueprint/index.html","c":"Soul Blueprint","e":"🌟"},{"n":"Reality Codes","h":"/Reality codes/index.html","c":"Manifestation","e":"✨"},{"n":"Expand","h":"/Expand/index.html","c":"Tools & Guides","e":"📖"},{"n":"Genesis","h":"/genesis/index.html","c":"Sub-brands","e":"🌀"},{"n":"Gravity","h":"/gravity/index.html","c":"Sub-brands","e":"🌀"},{"n":"Life Strategy","h":"/lifestrategy/index.html","c":"Sub-brands","e":"🌀"},{"n":"Mocktails & Dreams","h":"/mocktails&dreams/index.html","c":"Sub-brands","e":"🌀"},{"n":"Cosmic Pop","h":"/kosmickpop/index.html","c":"Sub-brands","e":"🌀"},{"n":"Classic","h":"/classic/index.html","c":"Sub-brands","e":"🌀"},{"n":"Stranger","h":"/stranger/index.html","c":"Sub-brands","e":"🌀"},{"n":"K-Pop","h":"/kpop/index.html","c":"Sub-brands","e":"🌀"}];

  /* ─── Categories config ─────────────────────────────────────── */
  var CATS = [
    { id: 'All',           e: '⬡',  color: C.cyan   },
    { id: 'Numerology',    e: '🔢', color: C.cyan   },
    { id: 'Angel Numbers', e: '👼', color: C.gold   },
    { id: 'Manifestation', e: '✨', color: C.mag    },
    { id: 'Soul Blueprint',e: '🌟', color: C.purple },
    { id: 'Frequency',     e: '🎵', color: C.pink   },
    { id: 'Zodiac',        e: '♋', color: C.gold   },
    { id: 'Compatibility', e: '💞', color: C.pink   },
    { id: 'Sub-brands',    e: '🌀', color: C.purple },
    { id: 'Tools & Guides',e: '📖', color: C.muted  },
  ];

  /* ─── Ticker items ──────────────────────────────────────────── */
  var TICKERS = [
    '🔢 Life Path Calculator — decode your destiny number',
    '👼 Angel Numbers — 111 · 222 · 333 · 444 · 555',
    '⭐ Birth Sigil Generator — your unique quantum signature',
    '🌹 Unconscious Contracts — reveal hidden life rules',
    '🎵 Frequency Generator — tune to sacred sound',
    '♋ Chinese Zodiac — read your cosmic blueprint',
    '✨ 44 tools across 8 categories — explore the Ecosystem',
    '🔮 Quantum Merlin — where mysticism meets mathematics',
    '💞 Compatibility Matrix — quantum relationship mapping',
    '🌟 Soul Blueprint — read your soul contract',
  ];

  /* ─── Helpers ───────────────────────────────────────────────── */
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
      var th = TOOLS[i].h.replace(/\/+$/, '').split('?')[0];
      if (path === th || path === th.replace('/index.html','')) return TOOLS[i].c;
    }
    // Fallback: path keywords
    if (/angel/i.test(path))       return 'Angel Numbers';
    if (/numerology|life.path|sigil|business.num|forecast|personal/i.test(path)) return 'Numerology';
    if (/contract|manifest|energy.?leak|hidden.strength|identity|power|trust/i.test(path)) return 'Manifestation';
    if (/soul|reading|rose/i.test(path)) return 'Soul Blueprint';
    if (/frequency|40hz/i.test(path))    return 'Frequency';
    if (/zodiac|chinese/i.test(path))    return 'Zodiac';
    if (/compat/i.test(path))            return 'Compatibility';
    return null;
  }

  function catColor(cat) {
    for (var i = 0; i < CATS.length; i++) {
      if (CATS[i].id === cat) return CATS[i].color;
    }
    return C.cyan;
  }

  function relatedTools(activeCat, limit) {
    var same = [], other = [];
    var path = currentPath();
    TOOLS.forEach(function (t) {
      var th = t.h.replace(/\/+$/, '').split('?')[0];
      if (th === path || th === path.replace('/index.html','')) return; // skip current
      if (t.c === activeCat) same.push(t);
      else other.push(t);
    });
    // shuffle other for variety
    other.sort(function() { return Math.random() - .5; });
    return same.slice(0, limit).concat(other.slice(0, limit));
  }

  /* ─── CSS ───────────────────────────────────────────────────── */
  function injectCSS() {
    var s = `
/* ── qm-shell reset ── */
.qms-topbar,.qms-drawer,.qms-overlay,.qms-ticker,.qms-more,.qms-cat-tabs {
  box-sizing:border-box;
}
.qms-topbar *,.qms-drawer *,.qms-ticker *,.qms-more * {
  box-sizing:border-box;
}

/* ── TOPBAR ── */
.qms-topbar {
  position:fixed;top:0;left:0;right:0;z-index:9999;
  height:60px;
  background:rgba(10,10,15,.97);
  border-bottom:1px solid rgba(0,245,255,.12);
  display:flex;align-items:center;gap:10px;padding:0 16px;
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
}
.qms-topbar::after {
  content:"";position:absolute;bottom:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,${C.cyan} 30%,${C.mag} 70%,transparent);
  opacity:.5;
}
.qms-ham {
  background:none;border:none;cursor:pointer;
  padding:8px 6px;display:flex;flex-direction:column;gap:5px;flex-shrink:0;
}
.qms-ham span {
  display:block;width:20px;height:2px;
  background:${C.cyan};border-radius:2px;
  transition:transform .25s,opacity .25s;
}
.qms-ham.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.qms-ham.open span:nth-child(2){opacity:0;}
.qms-ham.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}

.qms-logo {
  display:flex;align-items:center;gap:8px;text-decoration:none;flex-shrink:0;
}
.qms-logo-icon {font-size:1.25rem;line-height:1;}
.qms-logo-text {
  font-family:"Cinzel Decorative","Cinzel",serif;
  font-size:.62rem;color:${C.gold};letter-spacing:.04em;
  white-space:nowrap;
}
.qms-toolname {
  flex:1;text-align:center;
  font-family:"Orbitron","Exo 2",sans-serif;
  font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;
  color:rgba(240,230,255,.6);
  overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
  padding:0 8px;
}
.qms-hub-btn {
  flex-shrink:0;
  background:linear-gradient(135deg,rgba(0,245,255,.1),rgba(157,0,255,.08));
  border:1px solid rgba(0,245,255,.25);border-radius:6px;
  color:${C.cyan};padding:5px 12px;
  font-family:"Orbitron","Exo 2",sans-serif;
  font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;
  text-decoration:none;white-space:nowrap;
  transition:all .2s;
}
.qms-hub-btn:hover {
  background:rgba(0,245,255,.18);border-color:${C.cyan};
  box-shadow:0 0 14px rgba(0,245,255,.25);color:#fff;
}

/* ── OVERLAY ── */
.qms-overlay {
  display:none;position:fixed;inset:0;z-index:9998;
  background:rgba(0,0,0,.65);backdrop-filter:blur(4px);
}
.qms-overlay.open {display:block;}

/* ── SIDEBAR DRAWER ── */
.qms-drawer {
  position:fixed;top:0;left:0;bottom:0;z-index:10000;
  width:300px;max-width:85vw;
  background:linear-gradient(180deg,${C.bg} 0%,${C.surf} 100%);
  border-right:1px solid rgba(0,245,255,.1);
  transform:translateX(-100%);
  transition:transform .3s cubic-bezier(.4,0,.2,1);
  display:flex;flex-direction:column;overflow:hidden;
}
.qms-drawer.open {transform:translateX(0);}

/* Drawer header */
.qms-dh {
  padding:18px 18px 14px;
  background:linear-gradient(135deg,rgba(0,245,255,.05),rgba(157,0,255,.05));
  border-bottom:1px solid rgba(0,245,255,.08);
  flex-shrink:0;
}
.qms-dh-logo {
  display:flex;align-items:center;gap:10px;
  text-decoration:none;margin-bottom:12px;
}
.qms-dh-logo-icon {font-size:1.6rem;}
.qms-dh-logo-text {
  font-family:"Cinzel Decorative","Cinzel",serif;
  font-size:.8rem;color:${C.gold};
}
.qms-dh-logo-sub {
  font-family:"Orbitron","Exo 2",sans-serif;
  font-size:.5rem;color:rgba(240,230,255,.4);
  letter-spacing:.15em;text-transform:uppercase;margin-top:2px;
}
.qms-dh-hublink {
  display:flex;align-items:center;gap:8px;
  background:rgba(0,245,255,.08);
  border:1px solid rgba(0,245,255,.2);border-radius:8px;
  padding:8px 12px;text-decoration:none;
  font-family:"Orbitron","Exo 2",sans-serif;
  font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;
  color:${C.cyan};transition:all .2s;
}
.qms-dh-hublink:hover {
  background:rgba(0,245,255,.16);
  box-shadow:0 0 14px rgba(0,245,255,.2);
}

/* Category filter tabs */
.qms-cat-tabs {
  display:flex;gap:6px;padding:10px 14px;
  overflow-x:auto;flex-shrink:0;
  border-bottom:1px solid rgba(0,245,255,.06);
  scrollbar-width:none;
}
.qms-cat-tabs::-webkit-scrollbar {display:none;}
.qms-cat-tab {
  flex-shrink:0;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);border-radius:20px;
  color:rgba(240,230,255,.55);
  font-family:"Orbitron","Exo 2",sans-serif;
  font-size:.55rem;letter-spacing:.06em;text-transform:uppercase;
  padding:4px 10px;cursor:pointer;transition:all .18s;
  white-space:nowrap;
}
.qms-cat-tab:hover {
  background:rgba(0,245,255,.08);
  border-color:rgba(0,245,255,.3);color:${C.cyan};
}
.qms-cat-tab.active {
  background:rgba(0,245,255,.12);
  border-color:${C.cyan};color:${C.cyan};
  box-shadow:0 0 8px rgba(0,245,255,.2);
}

/* Tool card list in drawer */
.qms-drawer-scroll {
  flex:1;overflow-y:auto;padding:8px 10px 60px;
}
.qms-drawer-scroll::-webkit-scrollbar {width:3px;}
.qms-drawer-scroll::-webkit-scrollbar-track {background:transparent;}
.qms-drawer-scroll::-webkit-scrollbar-thumb {
  background:rgba(0,245,255,.18);border-radius:2px;
}
.qms-tool-card-mini {
  display:flex;align-items:center;gap:10px;
  padding:9px 10px;border-radius:8px;
  text-decoration:none;
  border:1px solid transparent;
  transition:all .18s;position:relative;overflow:hidden;
  margin-bottom:3px;
}
.qms-tool-card-mini::before {
  content:"";position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(0,245,255,.04),transparent);
  opacity:0;transition:opacity .18s;
}
.qms-tool-card-mini:hover {
  border-color:rgba(0,245,255,.2);
  background:rgba(0,245,255,.05);
}
.qms-tool-card-mini:hover::before {opacity:1;}
.qms-tool-card-mini.current {
  border-color:rgba(0,245,255,.3);
  background:rgba(0,245,255,.08);
}
.qms-mini-icon {
  font-size:1.2rem;flex-shrink:0;
  width:32px;height:32px;display:flex;align-items:center;justify-content:center;
  background:rgba(255,255,255,.04);border-radius:8px;
}
.qms-mini-info {flex:1;min-width:0;}
.qms-mini-name {
  font-family:"Exo 2","Orbitron",sans-serif;
  font-size:.72rem;color:rgba(240,230,255,.85);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  font-weight:500;
}
.qms-mini-cat {
  font-family:"Orbitron",sans-serif;
  font-size:.5rem;letter-spacing:.08em;text-transform:uppercase;
  margin-top:2px;
}
.qms-mini-arrow {
  font-size:.65rem;color:rgba(240,230,255,.2);
  flex-shrink:0;transition:all .18s;
}
.qms-tool-card-mini:hover .qms-mini-arrow {
  color:${C.cyan};transform:translateX(2px);
}

/* ── MORE TOOLS SECTION ── */
.qms-more {
  padding:60px 24px 40px;
  background:linear-gradient(180deg,transparent,rgba(0,245,255,.02) 30%,rgba(157,0,255,.02) 100%);
  position:relative;
}
.qms-more::before {
  content:"";position:absolute;top:0;left:10%;right:10%;height:1px;
  background:linear-gradient(90deg,transparent,rgba(0,245,255,.2),rgba(255,0,255,.2),transparent);
}
.qms-more-title {
  font-family:"Cinzel Decorative","Cinzel",serif;
  font-size:1.4rem;color:${C.gold};
  text-align:center;margin:0 0 8px;
}
.qms-more-sub {
  font-family:"Exo 2",sans-serif;
  font-size:.85rem;color:rgba(240,230,255,.5);
  text-align:center;margin:0 0 32px;
  letter-spacing:.04em;
}
.qms-more-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
  gap:14px;max-width:960px;margin:0 auto 32px;
}
.qms-more-card {
  background:linear-gradient(135deg,${C.surf},${C.surf2});
  border:1px solid rgba(255,255,255,.06);
  border-radius:12px;padding:18px 16px;
  text-decoration:none;
  display:flex;flex-direction:column;gap:8px;
  transition:all .22s;position:relative;overflow:hidden;
}
.qms-more-card::after {
  content:"";position:absolute;inset:0;border-radius:12px;
  background:linear-gradient(135deg,rgba(0,245,255,.06),rgba(157,0,255,.04));
  opacity:0;transition:opacity .22s;
}
.qms-more-card:hover {
  transform:translateY(-4px);
  border-color:rgba(0,245,255,.25);
  box-shadow:0 8px 32px rgba(0,245,255,.12),0 2px 8px rgba(0,0,0,.4);
}
.qms-more-card:hover::after {opacity:1;}
.qms-more-card-icon {
  font-size:2rem;line-height:1;
}
.qms-more-card-name {
  font-family:"Exo 2","Orbitron",sans-serif;
  font-size:.85rem;font-weight:600;
  color:rgba(240,230,255,.9);
  line-height:1.3;
}
.qms-more-card-cat {
  font-family:"Orbitron",sans-serif;
  font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;
  padding:2px 7px;border-radius:10px;
  background:rgba(255,255,255,.06);
  display:inline-block;
  align-self:flex-start;
}
.qms-more-card-cta {
  font-family:"Orbitron",sans-serif;
  font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;
  color:${C.cyan};margin-top:auto;padding-top:4px;
  display:flex;align-items:center;gap:4px;
  transition:gap .18s;
}
.qms-more-card:hover .qms-more-card-cta {gap:8px;}

.qms-more-hub-cta {
  display:flex;justify-content:center;
}
.qms-more-hub-btn {
  display:inline-flex;align-items:center;gap:10px;
  background:linear-gradient(135deg,rgba(0,245,255,.1),rgba(157,0,255,.08));
  border:1px solid rgba(0,245,255,.3);border-radius:10px;
  padding:12px 28px;text-decoration:none;
  font-family:"Orbitron",sans-serif;
  font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;
  color:${C.cyan};transition:all .22s;
}
.qms-more-hub-btn:hover {
  background:rgba(0,245,255,.18);
  box-shadow:0 0 24px rgba(0,245,255,.25);color:#fff;
}

/* ── TICKER ── */
.qms-ticker {
  position:fixed;bottom:0;left:0;right:0;z-index:9997;
  height:42px;overflow:hidden;
  background:rgba(10,10,15,.98);
  border-top:1px solid rgba(0,245,255,.1);
  display:flex;align-items:center;
}
.qms-ticker-label {
  flex-shrink:0;padding:0 14px;
  font-family:"Orbitron",sans-serif;
  font-size:.52rem;letter-spacing:.14em;text-transform:uppercase;
  color:${C.cyan};
  border-right:1px solid rgba(0,245,255,.12);
  height:100%;display:flex;align-items:center;
}
.qms-ticker-track {flex:1;overflow:hidden;}
.qms-ticker-inner {
  display:flex;white-space:nowrap;
  animation:qms-scroll 40s linear infinite;
}
.qms-ticker-inner:hover {animation-play-state:paused;}
.qms-ticker-item {
  display:inline-flex;align-items:center;
  padding:0 28px;
  font-family:"Exo 2",sans-serif;
  font-size:.65rem;letter-spacing:.04em;
  color:rgba(240,230,255,.55);
  border-right:1px solid rgba(0,245,255,.06);
}
@keyframes qms-scroll {
  0%{transform:translateX(0)}
  100%{transform:translateX(-50%)}
}

/* ── BODY OFFSET ── */
body.qms-active {
  padding-top:60px !important;
  padding-bottom:42px !important;
}
@media(max-width:600px) {
  .qms-logo-text {display:none;}
  .qms-toolname {font-size:.55rem;}
  .qms-more-grid {grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;}
  .qms-more-title {font-size:1.1rem;}
  .qms-drawer {width:85vw;}
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
      '<a href="/index.html" class="qms-hub-btn">⬡ Hub</a>';
    return div;
  }

  /* ─── Build overlay ─────────────────────────────────────────── */
  function buildOverlay() {
    var div = document.createElement('div');
    div.className = 'qms-overlay';
    div.id = 'qmsOverlay';
    return div;
  }

  /* ─── Build sidebar drawer ──────────────────────────────────── */
  function buildDrawer() {
    var activeCat = getCat();
    var currentHref = currentPath();

    // Category tabs
    var tabsHtml = CATS.map(function (cat) {
      var active = (cat.id === 'All' && !activeCat) || cat.id === activeCat ? ' active' : '';
      return '<button class="qms-cat-tab' + active + '" data-cat="' + cat.id + '">' +
        cat.e + ' ' + cat.id +
      '</button>';
    }).join('');

    // Tool cards
    var toolsHtml = TOOLS.map(function (t) {
      var th = t.h.replace(/\/+$/, '').split('?')[0];
      var isCurrent = (currentHref === th || currentHref === th.replace('/index.html',''));
      var col = catColor(t.c);
      return '<a href="' + t.h + '" class="qms-tool-card-mini' + (isCurrent ? ' current' : '') + '"' +
        ' data-cat="' + t.c + '">' +
        '<span class="qms-mini-icon">' + t.e + '</span>' +
        '<span class="qms-mini-info">' +
          '<div class="qms-mini-name">' + t.n + '</div>' +
          '<div class="qms-mini-cat" style="color:' + col + '">' + t.c + '</div>' +
        '</span>' +
        '<span class="qms-mini-arrow">›</span>' +
      '</a>';
    }).join('');

    var div = document.createElement('div');
    div.className = 'qms-drawer';
    div.id = 'qmsDrawer';
    div.innerHTML =
      '<div class="qms-dh">' +
        '<a href="/index.html" class="qms-dh-logo">' +
          '<span class="qms-dh-logo-icon">🧙‍♂️</span>' +
          '<div>' +
            '<div class="qms-dh-logo-text">Quantum Merlin</div>' +
            '<div class="qms-dh-logo-sub">Ecosystem — 44 Tools</div>' +
          '</div>' +
        '</a>' +
        '<a href="/index.html" class="qms-dh-hublink">⬡ &nbsp; Explore all tools →</a>' +
      '</div>' +
      '<div class="qms-cat-tabs" id="qmsCatTabs">' + tabsHtml + '</div>' +
      '<div class="qms-drawer-scroll" id="qmsDrawerScroll">' + toolsHtml + '</div>';

    return div;
  }

  /* ─── Build "More Tools" section ────────────────────────────── */
  function buildMoreTools() {
    var activeCat = getCat();
    var related = relatedTools(activeCat, 4);
    if (!related.length) return null;

    var cardsHtml = related.map(function (t) {
      var col = catColor(t.c);
      return '<a href="' + t.h + '" class="qms-more-card">' +
        '<div class="qms-more-card-icon">' + t.e + '</div>' +
        '<div class="qms-more-card-name">' + t.n + '</div>' +
        '<div class="qms-more-card-cat" style="color:' + col + '">' + t.c + '</div>' +
        '<div class="qms-more-card-cta">Open tool <span>→</span></div>' +
      '</a>';
    }).join('');

    var catLabel = activeCat ? 'More ' + activeCat + ' Tools' : 'Explore More Tools';

    var sec = document.createElement('section');
    sec.className = 'qms-more';
    sec.id = 'qmsMore';
    sec.innerHTML =
      '<h2 class="qms-more-title">✨ ' + catLabel + '</h2>' +
      '<p class="qms-more-sub">44 quantum tools and growing</p>' +
      '<div class="qms-more-grid">' + cardsHtml + '</div>' +
      '<div class="qms-more-hub-cta">' +
        '<a href="/index.html" class="qms-more-hub-btn">⬡ &nbsp; Browse all 44 tools →</a>' +
      '</div>';

    return sec;
  }

  /* ─── Build ticker ──────────────────────────────────────────── */
  function buildTicker() {
    var items = TICKERS.concat(TICKERS);
    var html = items.map(function (t) {
      return '<span class="qms-ticker-item">' + t + '</span>';
    }).join('');
    var div = document.createElement('div');
    div.className = 'qms-ticker';
    div.innerHTML =
      '<div class="qms-ticker-label">LIVE</div>' +
      '<div class="qms-ticker-track"><div class="qms-ticker-inner">' + html + '</div></div>';
    return div;
  }

  /* ─── Hide existing header ──────────────────────────────────── */
  function hideOldHeader() {
    ['header.qm-header', '#qmTopbar', '.qm-header'].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) el.style.cssText = 'display:none !important';
    });
  }

  /* ─── Category filter logic ─────────────────────────────────── */
  function wireCatFilter(drawer) {
    var tabs  = drawer.querySelectorAll('.qms-cat-tab');
    var cards = drawer.querySelectorAll('.qms-tool-card-mini');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var cat = tab.dataset.cat;
        cards.forEach(function (card) {
          var show = (cat === 'All') || (card.dataset.cat === cat);
          card.style.display = show ? '' : 'none';
        });
        // Reset scroll
        var scroll = drawer.querySelector('#qmsDrawerScroll');
        if (scroll) scroll.scrollTop = 0;
      });
    });

    // Init: hide non-matching if active cat
    var activeCat = getCat();
    if (activeCat) {
      cards.forEach(function (card) {
        if (card.dataset.cat !== activeCat) card.style.display = 'none';
      });
    }
  }

  /* ─── Wire interactions ─────────────────────────────────────── */
  function wireInteractions(topbar, overlay, drawer) {
    var ham = document.getElementById('qmsHam');

    function open()  { drawer.classList.add('open');  overlay.classList.add('open');  ham && ham.classList.add('open'); }
    function close() { drawer.classList.remove('open'); overlay.classList.remove('open'); ham && ham.classList.remove('open'); }

    if (ham) ham.addEventListener('click', function (e) {
      e.stopPropagation();
      drawer.classList.contains('open') ? close() : open();
    });

    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    drawer.querySelectorAll('.qms-tool-card-mini, .qms-dh-hublink').forEach(function (el) {
      el.addEventListener('click', close);
    });
  }

  /* ─── Mount ─────────────────────────────────────────────────── */
  function mount() {
    injectCSS();
    hideOldHeader();

    var topbar  = buildTopbar();
    var overlay = buildOverlay();
    var drawer  = buildDrawer();
    var more    = buildMoreTools();
    var ticker  = buildTicker();

    // Prepend shell elements
    document.body.insertBefore(ticker,  document.body.firstChild);
    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(drawer,  document.body.firstChild);
    document.body.insertBefore(topbar,  document.body.firstChild);

    // Append "More Tools" section before the ticker (bottom of content)
    if (more) document.body.insertBefore(more, ticker);

    document.body.classList.add('qms-active');

    wireCatFilter(drawer);
    wireInteractions(topbar, overlay, drawer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

})();
