/* ============================================================
   QUANTUM MERLIN HUB — JS
   Shell injector + hero slideshow + search/filter + ticker
   ============================================================ */

(function () {
  'use strict';

  /* ── CONFIG ─────────────────────────────────────────────── */
  var HERO_SLIDES = [
    {
      cat: 'Numerology',
      title: 'Decode Your Life Path',
      sub: 'Discover the numbers woven through your existence. Life path, personal year, soul purpose — revealed.',
      cta: 'Open Calculator',
      href: '/life-path-calculator.html'
    },
    {
      cat: 'Angel Numbers',
      title: 'Messages from the Field',
      sub: 'When numbers repeat, the universe speaks. Decode 111, 222, 333 and every sequence calling to you.',
      cta: 'Decode Now',
      href: '/angel-number-calculator.html'
    },
    {
      cat: 'Manifestation',
      title: 'Rewrite Your Reality Codes',
      sub: 'Align your energy, seal your intentions, and command the quantum field with ancient precision.',
      cta: 'Begin Ritual',
      href: '/manifest.html'
    },
    {
      cat: 'Soul Blueprint',
      title: 'Read Your Soul Contract',
      sub: 'Your soul chose this life for a reason. Uncover the hidden agreements, strengths, and lessons encoded at birth.',
      cta: 'View Blueprint',
      href: '/soulcard.html'
    },
    {
      cat: 'Frequency',
      title: 'Tune to Sacred Frequencies',
      sub: '40hz, 432Hz, Solfeggio tones — harness the vibrational architecture of the quantum field.',
      cta: 'Enter the Field',
      href: '/40hz/index.html'
    },
    {
      cat: 'Compatibility',
      title: 'Quantum Compatibility Matrix',
      sub: 'Every soul has a vibrational signature. See how your numbers resonate — or clash — with those around you.',
      cta: 'Check Compatibility',
      href: '/compatibility.html'
    }
  ];

  var NAV_ITEMS = [
    { icon: '🏠', label: 'Hub', href: '/index.html', active: true },
    { icon: '🔢', label: 'Numerology', href: '/life-path-calculator.html' },
    { icon: '✨', label: 'Angel Numbers', href: '/angel-number-calculator.html' },
    { icon: '🌀', label: 'Manifestation', href: '/manifest.html' },
    { icon: '🎵', label: 'Frequency', href: '/40hz/index.html' },
    { icon: '🔮', label: 'Zodiac', href: '/chinesezodiac/index.html' },
    { icon: '💫', label: 'Soul Blueprint', href: '/soulcard.html' },
    { icon: '♾️', label: 'Compatibility', href: '/compatibility.html' },
  ];

  var PROMO = {
    title: '🌟 FREE READINGS',
    text: 'Unlimited access to every tool. No account needed. Ancient wisdom, quantum precision.',
    cta: 'Explore All Tools',
    href: '#tools'
  };

  /* ── BUILD SHELL ─────────────────────────────────────────── */
  function buildShell() {
    var body = document.body;
    var existingMain = document.querySelector('main');

    var sidebarNavHTML = NAV_ITEMS.map(function (item) {
      return '<a href="' + item.href + '" class="qm-nav-item' + (item.active ? ' active' : '') + '">' +
        '<span class="qm-nav-icon">' + item.icon + '</span>' + item.label + '</a>';
    }).join('');

    var mobNavHTML = NAV_ITEMS.slice(0, 5).map(function (item) {
      return '<a href="' + item.href + '" class="qm-mob-nav-item' + (item.active ? ' active' : '') + '">' +
        '<span class="qm-mob-icon">' + item.icon + '</span>' + item.label + '</a>';
    }).join('');

    var shellHTML =
      '<div class="qm-shell">' +
        '<aside class="qm-sidebar">' +
          '<a href="/index.html" class="qm-logo">' +
            '<span class="qm-logo-icon">🧙</span>' +
            '<span class="qm-logo-text">Quantum Merlin</span>' +
          '</a>' +
          '<nav class="qm-nav-section">' +
            '<span class="qm-nav-label">Navigation</span>' +
            sidebarNavHTML +
          '</nav>' +
          '<div class="qm-sidebar-promo">' +
            '<div class="qm-sidebar-promo-title">' + PROMO.title + '</div>' +
            '<div class="qm-sidebar-promo-text">' + PROMO.text + '</div>' +
            '<a href="' + PROMO.href + '" class="qm-sidebar-promo-btn">' + PROMO.cta + '</a>' +
          '</div>' +
        '</aside>' +
        '<header class="qm-topbar">' +
          '<div class="qm-search-wrap">' +
            '<span class="qm-search-icon">🔍</span>' +
            '<input type="text" class="qm-search" id="qmSearch" placeholder="Search tools…" autocomplete="off">' +
          '</div>' +
          '<div class="qm-topbar-right">' +
            '<span class="qm-live-pill"><span class="qm-live-dot"></span>LIVE</span>' +
            '<span class="qm-tool-count" id="qmToolCount"></span>' +
          '</div>' +
        '</header>' +
        '<main class="qm-main" id="qmMain"></main>' +
      '</div>' +
      '<nav class="qm-mob-nav">' + mobNavHTML + '</nav>' +
      '<footer class="qm-ticker">' +
        '<div class="qm-ticker-label"><span class="qm-ticker-label-dot"></span>TOOLS</div>' +
        '<div class="qm-ticker-track-wrap"><div class="qm-ticker-track" id="qmTickerTrack"></div></div>' +
      '</footer>';

    body.insertAdjacentHTML('afterbegin', shellHTML);

    var mainEl = document.getElementById('qmMain');
    if (existingMain) {
      mainEl.appendChild(existingMain);
    }
  }

  /* ── HERO SLIDESHOW ─────────────────────────────────────── */
  function buildHero(container) {
    var total = HERO_SLIDES.length;
    var current = 0;
    var timer;

    var slidesHTML = HERO_SLIDES.map(function (s) {
      return '<div class="qm-hero-slide">' +
        '<div class="qm-hero-content">' +
          '<div class="qm-hero-cat">' + s.cat + '</div>' +
          '<h1 class="qm-hero-title">' + s.title + '</h1>' +
          '<p class="qm-hero-sub">' + s.sub + '</p>' +
          '<a href="' + s.href + '" class="qm-hero-cta">' + s.cta + ' →</a>' +
        '</div></div>';
    }).join('');

    var dotsHTML = HERO_SLIDES.map(function (_, i) {
      return '<button class="qm-hero-dot' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '"></button>';
    }).join('');

    container.innerHTML =
      '<div class="qm-hero-track" id="qmHeroTrack">' + slidesHTML + '</div>' +
      '<button class="qm-hero-prev" id="qmHeroPrev">&#8249;</button>' +
      '<button class="qm-hero-next" id="qmHeroNext">&#8250;</button>' +
      '<div class="qm-hero-dots" id="qmHeroDots">' + dotsHTML + '</div>';

    var track = document.getElementById('qmHeroTrack');
    var dots = document.querySelectorAll('.qm-hero-dot');

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
    }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 6000);
    }

    dots.forEach(function (d) {
      d.addEventListener('click', function () { goTo(+d.dataset.idx); startAuto(); });
    });
    document.getElementById('qmHeroPrev').addEventListener('click', function () { goTo(current - 1); startAuto(); });
    document.getElementById('qmHeroNext').addEventListener('click', function () { goTo(current + 1); startAuto(); });

    // Touch
    var tx = 0;
    container.addEventListener('touchstart', function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
    container.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 40) { goTo(dx < 0 ? current + 1 : current - 1); startAuto(); }
    }, { passive: true });
    container.addEventListener('mouseenter', function () { clearInterval(timer); });
    container.addEventListener('mouseleave', startAuto);

    startAuto();
  }

  /* ── TOOLS GRID ─────────────────────────────────────────── */
  var EXCLUDED_NAMES = {
    'index.html': 1, 'hub.html': 1, 'about.html': 1, 'contact.html': 1,
    'privacy.html': 1, 'terms.html': 1, 'disclaimer.html': 1,
    'reading-template.html': 1, 'widgets.html': 1, 'qrcodes.html': 1,
    'qrcodesfull.html': 1, 'quantum-forum.html': 1, 'tools': 1,
    'Widgets': 1, 'qrcodes-science': 1, 'quantum-merlin-hub': 1,
    'pt': 1, 'classic': 1, 'stranger': 1
  };

  function buildToolsGrid(container, toolsData) {
    var allCards = toolsData.filter(function (t) { return !EXCLUDED_NAMES[t.name]; });
    var filtered = allCards;
    var activeFilter = 'all';
    var searchQuery = '';

    var catColors = {
      'Numerology':    'numerology',
      'Angel Numbers': 'angel',
      'Manifestation': 'manifestation',
      'Frequency':     'frequency',
      'Zodiac':        'zodiac',
      'Soul Blueprint':'soul',
      'Sub-brands':    'subbrand',
      'Other':         'other',
      'Tools & Guides':'other',
      'Compatibility': 'angel'
    };

    var catIcons = {
      'Numerology':    '🔢',
      'Angel Numbers': '✨',
      'Manifestation': '🌀',
      'Frequency':     '🎵',
      'Zodiac':        '♈',
      'Soul Blueprint':'💫',
      'Sub-brands':    '🌟',
      'Other':         '🔮',
      'Tools & Guides':'📖',
      'Compatibility': '♾️'
    };

    // Build filters
    var cats = ['all'];
    var catSet = {};
    allCards.forEach(function (t) { catSet[t.category] = true; });
    Object.keys(catSet).sort().forEach(function (c) { cats.push(c); });

    var filtersHTML = cats.map(function (c) {
      return '<button class="qm-filter-btn' + (c === 'all' ? ' active' : '') + '" data-cat="' + c + '">' +
        (c === 'all' ? 'All' : c) + '</button>';
    }).join('') + '<span class="qm-results-count" id="qmResultsCount"></span>';

    var filtersEl = document.createElement('div');
    filtersEl.className = 'qm-filters';
    filtersEl.innerHTML = filtersHTML;
    container.appendChild(filtersEl);

    var grid = document.createElement('div');
    grid.className = 'qm-tool-grid reveal';
    grid.id = 'qmToolGrid';
    container.appendChild(grid);

    function prettify(name) {
      return name
        .replace(/\.html$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, function (c) { return c.toUpperCase(); })
        .trim();
    }

    function getDesc(t) {
      var descs = {
        // Numerology
        'life-path-calculator.html':      'Decode the master number that shapes your entire life journey',
        'birth-sigil.html':               'Generate your unique quantum sigil from your exact birth date and place',
        'business-numerology.html':       'Find the numbers behind your business name and launch date',
        'personal-day.html':              'Your numerological energy forecast for any given day',
        'personal-year-2026.html':        'What 2026 holds based on your personal year cycle number',
        'forecasts.html':                 'Monthly and yearly numerology forecasts for your path',
        'quantum-sigil-generator.html':   'Create sacred geometry sigils from names, words, or intentions',
        'quantum-sigil-gallery.html':     'Browse and save sigils from the community sigil gallery',
        // Angel Numbers
        'angel-number-calculator.html':   'Enter any number and decode the divine message behind it',
        'angel-number-full-reading.html': 'Deep multi-number reading — patterns, sequences, and full guidance',
        'angel-numbers':                  'Complete reference guide to every angel number and its meaning',
        // Manifestation
        'contract.html':                  'Reveal the hidden life rules you agreed to and don\'t remember signing',
        'contractfull.html':              'Extended unconscious contract analysis with full rewrite protocol',
        'energyleak.html':                'Find where your energy is quietly draining and why',
        'energyleakfull.html':            'Full energy audit with root-cause mapping and repair guidance',
        'hidden-strengths-revealer.html': 'Uncover the gifts you have but haven\'t been claiming',
        'identity-split-detector.html':   'Spot where your inner and outer selves are out of alignment',
        'identityfull.html':              'Deep identity split analysis with integration protocols and practices',
        'power-avoidance-pattern.html':   'Identify the patterns keeping you small and what\'s driving them',
        'powerfull.html':                 'Full power avoidance deep dive — unblock your authentic self-expression',
        'manifest.html':                  'Quantum manifestation tool — set the field and activate your intention',
        'manifestfull.html':              'Full manifestation protocol with belief mapping and quantum anchoring',
        'trust-radar.html':               'Map your trust patterns in relationships and where they came from',
        'trustfull.html':                 'Complete trust pattern analysis with repair protocols and exercises',
        'strengthsfull.html':             'Full hidden strengths deep dive with activation practices and exercises',
        'Reality codes':                  'Decode the subconscious programs running your reality field',
        // Soul Blueprint
        'soulblueprint':                  'Your complete soul contract — purpose, lessons, and karmic themes',
        'soulcard.html':                  'Draw your soul card and receive a personalised message for today',
        'quantum-rose.html':              'The rose as a sacred map of your soul\'s unfolding journey',
        'reading-generator.html':         'Generate a full personalised reading from your birth data',
        'readings':                       'Your reading archive — past readings saved and accessible anytime',
        'reading-template.html':          'Template for generating custom quantum reading formats',
        // Frequency
        'Frequency Generator':            'Generate sacred healing frequencies — Solfeggio, Schumann, and more',
        '40hz':                           '40Hz gamma wave entrainment for focus, clarity, and neural activation',
        'frequencygenerator':             'Alternative frequency player with extended tone and binaural options',
        'genesis':                        'Solfeggio frequency healing tones for deep cellular restoration',
        // Zodiac
        'chinesezodiac':                  'Your Chinese zodiac animal, element, and full personality profile',
        'kosmickpop':                     'Cosmic K-Pop readings — pop culture meets quantum zodiac energy',
        'kpop':                           'K-Pop quantum readings — cosmic energy aligned with K-Pop archetypes',
        // Compatibility
        'compatibility.html':             'Quantum compatibility reading — numerology, energy, and life path alignment',
        'compatabilty.html':              'Quantum compatibility reading — numerology, energy, and life path alignment',
        // Tools & Guides
        'workshop.html':                  'Guided exercises and practices to work with your quantum field',
        'library.html':                   'Full reference library — concepts, glossary, and deep-dive articles',
        'guides':                         'Step-by-step guides to using every tool in the ecosystem',
        'Expand':                         'Go deeper — advanced practices for the committed quantum explorer',
        'aihub':                          'AI-powered quantum readings — next-generation insight tools',
        'quantum-merlin-hub':             'Alternative hub experience — immersive quantum portal navigation',
        'tools':                          'Browse the complete toolkit — all quantum tools in one place',
        'hub.html':                       'Alternative hub view — all quantum tools at a glance',
        // Other / Sub-brands
        'amomentintime':                  'Capture any moment in time and read its quantum energy signature',
        'lifestrategy':                   'Life strategy mapped through quantum numerology and energy work',
        'ultimate':                       'The complete advanced practitioner suite — all tools unlocked',
        'gravity':                        'Quantum Gravity — the energetic forces shaping your reality field',
        'pt':                             'Personal transformation — guided quantum framework for lasting change',
        'classic':                        'Classic quantum readings — the original Merlin toolkit archive',
        'stranger':                       'Another dimension of readings — quantum mysticism beyond the veil',
        'mocktails&dreams':               'Dream interpretation meets quantum alchemy — decode nightly visions',
        'qrcodes-science':                'The science behind quantum QR codes and sacred geometry encoding',
        'qrcodes.html':                   'Generate quantum-encoded QR codes with sacred geometry overlays',
        'qrcodesfull.html':               'Full QR code analysis — decode the hidden information in any code',
        'quantum-forum.html':             'Community forum — connect with fellow quantum explorers',
        'Widgets':                        'Standalone quantum widgets — embeddable tools for any platform',
        'widgets.html':                   'Embeddable quantum widgets for your website or blog',
        // Info pages
        'about.html':                     'Meet Quantum Merlin — the story, the mission, and the ecosystem',
        'contact.html':                   'Reach the Quantum Merlin team — questions, collaborations, and readings',
        'privacy.html':                   'Our commitment to your data privacy and information security',
        'terms.html':                     'Terms of service and usage conditions for Quantum Merlin tools',
        'disclaimer.html':                'Important information about how to use Quantum Merlin readings'
      };
      return descs[t.name] || ('Explore ' + prettify(t.name));
    }

    function renderCards() {
      var results = allCards.filter(function (t) {
        var matchCat = activeFilter === 'all' || t.category === activeFilter;
        var q = searchQuery.toLowerCase();
        var matchQ = !q || t.name.toLowerCase().indexOf(q) > -1 ||
          (t.category && t.category.toLowerCase().indexOf(q) > -1);
        return matchCat && matchQ;
      });

      filtered = results;
      var count = document.getElementById('qmResultsCount');
      if (count) count.textContent = results.length + ' tools';
      var tc = document.getElementById('qmToolCount');
      if (tc) tc.textContent = results.length + ' tools';

      if (results.length === 0) {
        grid.innerHTML = '<div class="qm-empty"><div class="qm-empty-icon">🔮</div><div class="qm-empty-text">No tools match your search</div></div>';
        return;
      }

      grid.innerHTML = results.map(function (t) {
        var title = prettify(t.name);
        var icon = catIcons[t.category] || '🔮';
        var catClass = catColors[t.category] || 'other';
        var href = t.type === 'tool_dir' ? '/' + t.path + '/index.html' : '/' + t.path;
        var desc = getDesc(t);
        return '<a href="' + href + '" class="qm-tool-card">' +
          '<div class="qm-card-top">' +
            '<div class="qm-card-icon">' + icon + '</div>' +
            '<div class="qm-card-meta">' +
              '<div class="qm-card-title">' + title + '</div>' +
              '<div class="qm-card-cat cat-' + catClass + '">' + (t.category || 'Tool') + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="qm-card-desc">' + desc + '</div>' +
          '<div class="qm-card-footer">' +
            '<span class="qm-card-open">OPEN →</span>' +
            (t.js_files > 0 ? '<span class="qm-card-complexity">Interactive</span>' : '<span class="qm-card-complexity">Tool</span>') +
          '</div>' +
        '</a>';
      }).join('');

      // Trigger reveal
      setTimeout(function () { grid.classList.add('visible'); }, 50);
    }

    // Filter click
    filtersEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.qm-filter-btn');
      if (!btn) return;
      filtersEl.querySelectorAll('.qm-filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeFilter = btn.dataset.cat;
      renderCards();
    });

    // Search
    var searchEl = document.getElementById('qmSearch');
    if (searchEl) {
      searchEl.addEventListener('input', function () {
        searchQuery = searchEl.value;
        renderCards();
      });
    }

    renderCards();
  }

  /* ── TICKER ─────────────────────────────────────────────── */
  function buildTicker(tools) {
    var track = document.getElementById('qmTickerTrack');
    if (!track) return;
    var items = tools.slice(0, 30);
    var html = '';
    for (var copy = 0; copy < 2; copy++) {
      items.forEach(function (t) {
        var name = t.name.replace(/\.html$/, '').replace(/[-_]/g, ' ');
        html += '<span class="qm-ticker-item"><strong>' + (t.category || 'TOOL').toUpperCase().substring(0, 6) + '</strong>' + name + '</span>' +
                '<span class="qm-ticker-sep">◆</span>';
      });
    }
    track.innerHTML = html;
  }

  /* ── REVEAL ─────────────────────────────────────────────── */
  function initReveal() {
    var mainEl = document.getElementById('qmMain');
    var root = mainEl || null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { root: root, rootMargin: '-10px', threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  }

  /* ── PROGRESS ───────────────────────────────────────────── */
  function buildProgress(container, total, converted) {
    var pct = Math.round((converted / total) * 100);
    var el = document.createElement('div');
    el.className = 'qm-progress-bar';
    el.innerHTML =
      '<span class="qm-progress-label">ECOSYSTEM RENOVATION</span>' +
      '<div class="qm-progress-track"><div class="qm-progress-fill" id="qmProgressFill" style="width:0%"></div></div>' +
      '<span class="qm-progress-pct">' + converted + ' / ' + total + ' tools</span>';
    container.appendChild(el);
    setTimeout(function () {
      var fill = document.getElementById('qmProgressFill');
      if (fill) fill.style.width = pct + '%';
    }, 300);
  }

  /* ── INIT ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    buildShell();

    var mainEl = document.getElementById('qmMain');
    var existingInner = mainEl.querySelector('main') || mainEl;

    // Wrap content in proper div
    var contentWrap = document.createElement('div');
    contentWrap.id = 'qmContent';

    // Hero
    var heroEl = document.createElement('div');
    heroEl.className = 'qm-hero';
    contentWrap.appendChild(heroEl);
    buildHero(heroEl);

    // Progress bar (will be populated by page data)
    buildProgress(contentWrap, window.QM_TOOL_TOTAL || 79, window.QM_CONVERTED || 1);

    // Tools grid
    if (window.QM_TOOLS) {
      buildToolsGrid(contentWrap, window.QM_TOOLS);
    }

    mainEl.insertBefore(contentWrap, mainEl.firstChild);

    // Ticker
    if (window.QM_TOOLS) {
      buildTicker(window.QM_TOOLS);
    }

    // Reveal
    initReveal();
  });

})();
