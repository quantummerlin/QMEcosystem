/**
 * qm-shell.js — Universal QM Navigation Shell for Tool Pages
 * Replaces the existing .qm-header with the full Spotify-style nav shell:
 *   - Fixed topbar (60px) with hamburger, logo, tool name, back-to-hub
 *   - Slide-in sidebar drawer (left) with category nav + tool list
 *   - Fixed ticker bar (42px, bottom)
 *
 * Usage: Add <script src="/js/qm-shell.js" defer></script> to any QM tool page.
 * Zero dependencies. Self-contained styles injected via <style> tag.
 */
(function () {
  'use strict';

  /* ─── Brand ─────────────────────────────────────────────────── */
  var CYAN    = '#00f5ff';
  var GOLD    = '#ffd700';
  var MAGENTA = '#ff00ff';
  var PURPLE  = '#9d00ff';
  var PINK    = '#ff6b9d';
  var BG      = '#0a0a0f';
  var SURFACE = '#0f0f1a';

  /* ─── Nav categories ─────────────────────────────────────────── */
  var NAV = [
    { icon: '🔢', label: 'Numerology',     href: '/index.html?cat=Numerology' },
    { icon: '👼', label: 'Angel Numbers',  href: '/index.html?cat=Angel+Numbers' },
    { icon: '✨', label: 'Manifestation',  href: '/index.html?cat=Manifestation' },
    { icon: '🌟', label: 'Soul Blueprint', href: '/index.html?cat=Soul+Blueprint' },
    { icon: '🎵', label: 'Frequency',      href: '/index.html?cat=Frequency' },
    { icon: '♋', label: 'Zodiac',          href: '/index.html?cat=Zodiac' },
    { icon: '💞', label: 'Compatibility',  href: '/index.html?cat=Compatibility' },
    { icon: '🔮', label: 'All Tools',      href: '/index.html' },
  ];

  /* ─── Ticker items ───────────────────────────────────────────── */
  var TICKERS = [
    '🔢 Life Path Calculator — decode your destiny number',
    '👼 Angel Numbers — 111 · 222 · 333 · 444 · 555',
    '⭐ Birth Sigil — your unique quantum signature',
    '🌹 Unconscious Contracts — reveal hidden life rules',
    '🎵 Frequency Generator — tune to sacred sound',
    '♋ Zodiac Profiles — read your cosmic blueprint',
    '✨ 69 tools and growing — explore the Ecosystem',
    '🔮 Quantum Merlin — where mysticism meets mathematics',
  ];

  /* ─── Tool name from <title> ─────────────────────────────────── */
  function getToolName() {
    var t = document.title || '';
    return t.replace(/\s*\|.*$/, '').replace(/Quantum Merlin\s*[-–]?\s*/i, '').trim() || 'Quantum Tool';
  }

  /* ─── Active nav detection ───────────────────────────────────── */
  function getActiveCat() {
    var path = window.location.pathname;
    var params = new URLSearchParams(window.location.search);
    var cat = params.get('cat') || '';
    if (cat) return cat;
    if (/angel-number|angel_number/i.test(path)) return 'Angel Numbers';
    if (/numerology|life-path|birth-sigil|business-num|forecast/i.test(path)) return 'Numerology';
    if (/manifestation|contract|energy.?leak/i.test(path)) return 'Manifestation';
    if (/soul.?blue/i.test(path)) return 'Soul Blueprint';
    if (/frequency/i.test(path)) return 'Frequency';
    if (/zodiac/i.test(path)) return 'Zodiac';
    if (/compatib/i.test(path)) return 'Compatibility';
    return '';
  }

  /* ─── Inject CSS ─────────────────────────────────────────────── */
  function injectCSS() {
    var css = [
      /* Reset for shell elements only */
      '.qms-topbar,.qms-drawer,.qms-overlay,.qms-ticker{box-sizing:border-box;font-family:"Orbitron","Exo 2",sans-serif;}',

      /* ── Topbar ── */
      '.qms-topbar{',
        'position:fixed;top:0;left:0;right:0;z-index:9999;',
        'height:60px;',
        'background:rgba(10,10,15,.96);',
        'border-bottom:1px solid rgba(0,245,255,.15);',
        'display:flex;align-items:center;gap:12px;padding:0 16px;',
        'backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);',
      '}',
      '.qms-topbar::after{',
        'content:"";position:absolute;bottom:0;left:0;right:0;height:1px;',
        'background:linear-gradient(90deg,transparent,'+CYAN+','+MAGENTA+',transparent);',
        'opacity:.6;',
      '}',

      /* Hamburger */
      '.qms-ham{',
        'background:none;border:none;cursor:pointer;padding:8px;',
        'display:flex;flex-direction:column;gap:5px;flex-shrink:0;',
      '}',
      '.qms-ham span{display:block;width:22px;height:2px;background:'+CYAN+';border-radius:2px;transition:.25s;}',
      '.qms-ham.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}',
      '.qms-ham.open span:nth-child(2){opacity:0;}',
      '.qms-ham.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}',

      /* Logo */
      '.qms-logo{',
        'display:flex;align-items:center;gap:8px;text-decoration:none;flex-shrink:0;',
        'color:'+CYAN+';font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;',
        'transition:opacity .2s;',
      '}',
      '.qms-logo:hover{opacity:.8;}',
      '.qms-logo-icon{font-size:1.3rem;line-height:1;}',
      '.qms-logo-text{font-family:"Cinzel Decorative","Cinzel",serif;font-size:.65rem;color:'+GOLD+';}',

      /* Tool name */
      '.qms-toolname{',
        'flex:1;text-align:center;',
        'font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;',
        'color:rgba(240,230,255,.7);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;',
      '}',

      /* Right actions */
      '.qms-actions{display:flex;align-items:center;gap:8px;flex-shrink:0;}',
      '.qms-btn{',
        'background:rgba(0,245,255,.08);border:1px solid rgba(0,245,255,.25);',
        'color:'+CYAN+';border-radius:6px;padding:5px 10px;',
        'font-size:.6rem;font-family:inherit;letter-spacing:.08em;text-transform:uppercase;',
        'text-decoration:none;cursor:pointer;transition:all .2s;white-space:nowrap;',
      '}',
      '.qms-btn:hover{background:rgba(0,245,255,.18);border-color:'+CYAN+';color:#fff;box-shadow:0 0 12px rgba(0,245,255,.3);}',

      /* ── Overlay ── */
      '.qms-overlay{',
        'display:none;position:fixed;inset:0;z-index:9998;',
        'background:rgba(0,0,0,.6);backdrop-filter:blur(4px);',
      '}',
      '.qms-overlay.open{display:block;}',

      /* ── Sidebar drawer ── */
      '.qms-drawer{',
        'position:fixed;top:0;left:0;bottom:0;z-index:10000;',
        'width:260px;',
        'background:linear-gradient(180deg,'+BG+' 0%,'+SURFACE+' 100%);',
        'border-right:1px solid rgba(0,245,255,.12);',
        'transform:translateX(-100%);transition:transform .28s cubic-bezier(.4,0,.2,1);',
        'display:flex;flex-direction:column;overflow:hidden;',
      '}',
      '.qms-drawer.open{transform:translateX(0);}',

      /* Drawer header */
      '.qms-drawer-header{',
        'padding:20px 20px 16px;border-bottom:1px solid rgba(0,245,255,.1);flex-shrink:0;',
        'background:linear-gradient(135deg,rgba(0,245,255,.06),rgba(157,0,255,.06));',
      '}',
      '.qms-drawer-logo{',
        'display:flex;align-items:center;gap:10px;text-decoration:none;margin-bottom:12px;',
      '}',
      '.qms-drawer-logo-icon{font-size:1.8rem;}',
      '.qms-drawer-logo-text{',
        'font-family:"Cinzel Decorative","Cinzel",serif;',
        'font-size:.85rem;color:'+GOLD+';line-height:1.2;letter-spacing:.04em;',
      '}',
      '.qms-drawer-logo-sub{font-size:.55rem;color:rgba(240,230,255,.5);letter-spacing:.12em;text-transform:uppercase;margin-top:2px;}',

      /* Hub link */
      '.qms-hub-link{',
        'display:flex;align-items:center;gap:8px;',
        'background:linear-gradient(135deg,rgba(0,245,255,.12),rgba(157,0,255,.08));',
        'border:1px solid rgba(0,245,255,.2);border-radius:8px;',
        'padding:8px 12px;text-decoration:none;',
        'font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:'+CYAN+';',
        'transition:all .2s;',
      '}',
      '.qms-hub-link:hover{background:rgba(0,245,255,.2);box-shadow:0 0 16px rgba(0,245,255,.2);}',
      '.qms-hub-link-icon{font-size:1rem;}',

      /* Nav section */
      '.qms-drawer-scroll{flex:1;overflow-y:auto;padding:12px 0 80px;}',
      '.qms-drawer-scroll::-webkit-scrollbar{width:4px;}',
      '.qms-drawer-scroll::-webkit-scrollbar-track{background:transparent;}',
      '.qms-drawer-scroll::-webkit-scrollbar-thumb{background:rgba(0,245,255,.2);border-radius:2px;}',

      '.qms-nav-section{padding:8px 0;}',
      '.qms-nav-label{',
        'padding:4px 20px;font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;',
        'color:rgba(240,230,255,.35);',
      '}',
      '.qms-nav-item{',
        'display:flex;align-items:center;gap:10px;',
        'padding:9px 20px;text-decoration:none;',
        'font-size:.7rem;letter-spacing:.06em;color:rgba(240,230,255,.75);',
        'transition:all .18s;position:relative;cursor:pointer;border:none;background:none;width:100%;text-align:left;',
      '}',
      '.qms-nav-item::before{',
        'content:"";position:absolute;left:0;top:50%;transform:translateY(-50%);',
        'width:2px;height:0;background:'+CYAN+';border-radius:0 2px 2px 0;transition:height .18s;',
      '}',
      '.qms-nav-item:hover{color:#fff;background:rgba(0,245,255,.06);}',
      '.qms-nav-item:hover::before{height:60%;}',
      '.qms-nav-item.active{color:'+CYAN+';background:rgba(0,245,255,.08);}',
      '.qms-nav-item.active::before{height:60%;}',
      '.qms-nav-icon{font-size:1rem;flex-shrink:0;width:20px;text-align:center;}',

      /* ── Ticker ── */
      '.qms-ticker{',
        'position:fixed;bottom:0;left:0;right:0;z-index:9997;',
        'height:42px;overflow:hidden;',
        'background:linear-gradient(90deg,rgba(10,10,15,.98) 0%,rgba(15,15,26,.98) 100%);',
        'border-top:1px solid rgba(0,245,255,.12);',
        'display:flex;align-items:center;',
      '}',
      '.qms-ticker-label{',
        'flex-shrink:0;padding:0 14px;',
        'font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;',
        'color:'+CYAN+';border-right:1px solid rgba(0,245,255,.15);height:100%;',
        'display:flex;align-items:center;',
      '}',
      '.qms-ticker-track{flex:1;overflow:hidden;position:relative;}',
      '.qms-ticker-inner{',
        'display:flex;gap:0;white-space:nowrap;',
        'animation:qms-ticker-scroll 35s linear infinite;',
      '}',
      '.qms-ticker-inner:hover{animation-play-state:paused;}',
      '.qms-ticker-item{',
        'display:inline-flex;align-items:center;',
        'padding:0 32px;font-size:.65rem;letter-spacing:.05em;',
        'color:rgba(240,230,255,.6);border-right:1px solid rgba(0,245,255,.08);',
      '}',
      '.qms-ticker-item a{color:'+CYAN+';text-decoration:none;}',
      '.qms-ticker-item a:hover{text-decoration:underline;}',
      '@keyframes qms-ticker-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}',

      /* ── Body offset ── */
      'body.qms-active{padding-top:60px !important;padding-bottom:42px !important;}',
    ].join('');

    var el = document.createElement('style');
    el.id = 'qms-styles';
    el.textContent = css;
    document.head.appendChild(el);
  }

  /* ─── Build topbar ───────────────────────────────────────────── */
  function buildTopbar() {
    var toolName = getToolName();
    var div = document.createElement('div');
    div.className = 'qms-topbar';
    div.innerHTML = [
      '<button class="qms-ham" id="qmsHam" aria-label="Open menu">',
        '<span></span><span></span><span></span>',
      '</button>',
      '<a href="/index.html" class="qms-logo">',
        '<span class="qms-logo-icon">🧙‍♂️</span>',
        '<span class="qms-logo-text">Quantum Merlin</span>',
      '</a>',
      '<div class="qms-toolname">',toolName,'</div>',
      '<div class="qms-actions">',
        '<a href="/index.html" class="qms-btn">⬡ Hub</a>',
      '</div>',
    ].join('');
    return div;
  }

  /* ─── Build overlay ──────────────────────────────────────────── */
  function buildOverlay() {
    var div = document.createElement('div');
    div.className = 'qms-overlay';
    div.id = 'qmsOverlay';
    return div;
  }

  /* ─── Build sidebar drawer ───────────────────────────────────── */
  function buildDrawer() {
    var activeCat = getActiveCat();
    var navHtml = NAV.map(function (n) {
      var active = (n.label === activeCat) ? ' active' : '';
      return [
        '<a href="', n.href, '" class="qms-nav-item', active, '">',
          '<span class="qms-nav-icon">', n.icon, '</span>',
          n.label,
        '</a>',
      ].join('');
    }).join('');

    var div = document.createElement('div');
    div.className = 'qms-drawer';
    div.id = 'qmsDrawer';
    div.innerHTML = [
      '<div class="qms-drawer-header">',
        '<a href="/index.html" class="qms-drawer-logo">',
          '<span class="qms-drawer-logo-icon">🧙‍♂️</span>',
          '<div>',
            '<div class="qms-drawer-logo-text">Quantum Merlin</div>',
            '<div class="qms-drawer-logo-sub">Ecosystem</div>',
          '</div>',
        '</a>',
        '<a href="/index.html" class="qms-hub-link">',
          '<span class="qms-hub-link-icon">⬡</span>',
          'Back to Tool Hub',
        '</a>',
      '</div>',
      '<div class="qms-drawer-scroll">',
        '<nav class="qms-nav-section">',
          '<div class="qms-nav-label">Categories</div>',
          navHtml,
        '</nav>',
      '</div>',
    ].join('');
    return div;
  }

  /* ─── Build ticker ───────────────────────────────────────────── */
  function buildTicker() {
    var items = TICKERS.concat(TICKERS); // double for seamless loop
    var itemsHtml = items.map(function (t) {
      return '<span class="qms-ticker-item">' + t + '</span>';
    }).join('');

    var div = document.createElement('div');
    div.className = 'qms-ticker';
    div.innerHTML = [
      '<div class="qms-ticker-label">LIVE</div>',
      '<div class="qms-ticker-track">',
        '<div class="qms-ticker-inner" id="qmsTickerInner">',
          itemsHtml,
        '</div>',
      '</div>',
    ].join('');
    return div;
  }

  /* ─── Hide existing QM header ────────────────────────────────── */
  function hideOldHeader() {
    var old = document.querySelector('header.qm-header');
    if (old) {
      old.style.cssText = 'display:none !important';
    }
    // Also hide any existing shell topbar from older deployments
    var oldShell = document.getElementById('qmTopbar');
    if (oldShell) oldShell.style.display = 'none';
  }

  /* ─── Wire interactions ──────────────────────────────────────── */
  function wireInteractions(topbar, overlay, drawer) {
    var ham     = topbar.querySelector('#qmsHam') || document.getElementById('qmsHam');
    var ov      = overlay;
    var dr      = drawer;

    function open() {
      dr.classList.add('open');
      ov.classList.add('open');
      ham.classList.add('open');
      document.body.style.overflow = '';
    }
    function close() {
      dr.classList.remove('open');
      ov.classList.remove('open');
      ham.classList.remove('open');
    }

    if (ham) ham.addEventListener('click', function (e) {
      e.stopPropagation();
      dr.classList.contains('open') ? close() : open();
    });

    ov.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    // Close drawer when a nav link is clicked
    dr.querySelectorAll('.qms-nav-item').forEach(function (link) {
      link.addEventListener('click', close);
    });
  }

  /* ─── Mount everything ───────────────────────────────────────── */
  function mount() {
    injectCSS();
    hideOldHeader();

    var topbar  = buildTopbar();
    var overlay = buildOverlay();
    var drawer  = buildDrawer();
    var ticker  = buildTicker();

    document.body.insertBefore(ticker,  document.body.firstChild);
    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(drawer,  document.body.firstChild);
    document.body.insertBefore(topbar,  document.body.firstChild);

    document.body.classList.add('qms-active');

    wireInteractions(topbar, overlay, drawer);

    // Update hub converted count from meta if available
    var convertedMeta = document.querySelector('meta[name="qm-converted"]');
    if (convertedMeta) {
      window.__QMS_CONVERTED = parseInt(convertedMeta.content, 10) || 1;
    }
  }

  /* ─── Init ───────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

})();
