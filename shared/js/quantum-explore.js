/**
 * Quantum Merlin - Cross-Brand Explore Component
 * Self-injecting "Explore More" card that recommends sibling brands.
 * Appears above the Etsy CTA / footer on every tool page.
 *
 * Usage: <script src="/shared/js/quantum-explore.js" defer></script>
 *
 * Features:
 *   - Detects current brand from URL path
 *   - Shows 3 contextually relevant sibling brands (never the current one)
 *   - Brand-themed styling matching QME Elegant or QRC Synthwave
 *   - GA4 cross_brand_click event tracking
 *   - Mobile-responsive (works at 320px)
 *   - Self-contained CSS (no external dependencies)
 */
(function () {
  'use strict';

  const COMPONENT_ID = 'qm-explore-more';
  if (document.getElementById(COMPONENT_ID)) return;

  // ── Brand Registry ─────────────────────────────────────────────────────────
  const BRANDS = {
    soulblueprint: {
      name: 'Soul Blueprint',
      path: '/soulblueprint/',
      tagline: 'Separate product — visit directly',
      emoji: '🌟',
      system: 'elegant',
      hidden: true,
    },
    amomentintime: {
      name: 'A Moment In Time',
      path: '/amomentintime/',
      tagline: 'Gift a personalised star chart reading to someone special',
      emoji: '🎁',
      system: 'elegant',
    },
    stranger: {
      name: 'Stranger Patterns',
      path: '/stranger/tools_index.html',
      tagline: 'Stranger Things themed oracle — personality quizzes & aura tests',
      emoji: '🔮',
      system: 'elegant',
    },
    kpop: {
      name: 'K-Pop Kosmic',
      path: '/kpop/tools_index.html',
      tagline: 'K-Pop themed numerology — squad chemistry & idol matching',
      emoji: '💜',
      system: 'elegant',
    },
    kosmickpop: {
      name: 'Kosmick Pop',
      path: '/kosmickpop/',
      tagline: '80+ exclusive K-Pop cosmic tools & deep readings',
      emoji: '✨',
      system: 'elegant',
    },
    genesis: {
      name: 'Genesis Frequencies',
      path: '/genesis/index-enhanced.html',
      tagline: 'Solfeggio frequency generator — healing tones & sound therapy',
      emoji: '🎵',
      system: 'synthwave',
    },
    '40hz': {
      name: '40Hz Gamma',
      path: '/40hz/',
      tagline: 'Gamma wave generator for cognitive enhancement & focus',
      emoji: '🧠',
      system: 'synthwave',
    },
    classic: {
      name: 'Classic',
      path: '/classic/',
      tagline: 'Professional numerology & astrology tools — clean & focused',
      emoji: '📊',
      system: 'elegant',
    },
    compatibility: {
      name: 'Compatibility',
      path: '/compatibility.html',
      tagline: '7-dimension cosmic compatibility — love, career & friendship',
      emoji: '💫',
      system: 'elegant',
    },
    forecasts: {
      name: 'Cosmic Forecasts',
      path: '/forecasts.html',
      tagline: 'Daily, weekly, monthly & yearly personalised cosmic forecasts',
      emoji: '🌙',
      system: 'elegant',
    },
  };

  // ── Recommendation Map ─────────────────────────────────────────────────────
  // Each brand maps to 3-4 recommended siblings (priority order)
  const RECOMMENDATIONS = {
    soulblueprint:  ['amomentintime', 'stranger', 'compatibility', 'forecasts'],
    amomentintime:  ['soulblueprint', 'compatibility', 'classic', 'forecasts'],
    stranger:       ['kpop', 'soulblueprint', '40hz', 'compatibility'],
    kpop:           ['kosmickpop', 'stranger', 'soulblueprint', 'compatibility'],
    kosmickpop:     ['kpop', 'stranger', 'soulblueprint', '40hz'],
    genesis:        ['40hz', 'soulblueprint', 'kosmickpop', 'forecasts'],
    '40hz':         ['genesis', 'soulblueprint', 'kosmickpop', 'stranger'],
    classic:        ['soulblueprint', 'amomentintime', 'compatibility', 'forecasts'],
    root:           ['soulblueprint', 'stranger', 'kpop', 'genesis'],
    ultimate:       ['soulblueprint', 'amomentintime', 'compatibility', 'forecasts'],
    gravity:        ['soulblueprint', 'classic', 'compatibility', 'forecasts'],
    lifestrategy:   ['soulblueprint', 'forecasts', 'compatibility', 'classic'],
    hub:            ['soulblueprint', 'stranger', 'genesis', '40hz'],
  };

  // ── Brand Detection ────────────────────────────────────────────────────────
  const path = window.location.pathname.toLowerCase();

  function detectBrand() {
    if (path.includes('/stranger/'))       return 'stranger';
    if (path.includes('/kpop/'))           return 'kpop';
    if (path.includes('/kosmickpop/'))     return 'kosmickpop';
    if (path.includes('/genesis/'))        return 'genesis';
    if (path.includes('/40hz/'))           return '40hz';
    if (path.includes('/classic/'))        return 'classic';
    if (path.includes('/soulblueprint/'))  return 'soulblueprint';
    if (path.includes('/amomentintime/'))  return 'amomentintime';
    if (path.includes('/ultimate/'))       return 'ultimate';
    if (path.includes('/gravity/'))        return 'gravity';
    if (path.includes('/lifestrategy/'))   return 'lifestrategy';
    if (path.includes('/quantum-merlin-hub/') || path.includes('/hub')) return 'hub';
    return 'root';
  }

  const currentBrand = detectBrand();

  // Skip on certain pages
  const SKIP_PAGES = ['/privacy', '/terms', '/disclaimer', '/about', '/contact'];
  if (SKIP_PAGES.some(p => path.includes(p))) return;

  // ── Get Recommendations ────────────────────────────────────────────────────
  const recs = (RECOMMENDATIONS[currentBrand] || RECOMMENDATIONS.root)
    .filter(id => id !== currentBrand && BRANDS[id])
    .slice(0, 3)
    .map(id => ({ id, ...BRANDS[id] }));

  if (recs.length === 0) return;

  // ── Detect Design System ───────────────────────────────────────────────────
  const isSynthwave = ['genesis', '40hz'].includes(currentBrand);

  // ── Styles ─────────────────────────────────────────────────────────────────
  const STYLES = {
    elegant: {
      sectionBg: 'rgba(45, 27, 78, 0.25)',
      border: 'rgba(255, 215, 0, 0.2)',
      headingColor: '#ffd700',
      subColor: '#f0e6ff',
      cardBg: 'rgba(45, 27, 78, 0.4)',
      cardBorder: 'rgba(255, 215, 0, 0.15)',
      cardHoverBorder: 'rgba(255, 215, 0, 0.5)',
      nameColor: '#ffd700',
      taglineColor: '#d4c5e8',
      headingFont: "'Cinzel', serif",
      bodyFont: "'Cormorant Garamond', Georgia, serif",
    },
    synthwave: {
      sectionBg: 'rgba(20, 20, 35, 0.6)',
      border: 'rgba(0, 245, 255, 0.2)',
      headingColor: '#00f5ff',
      subColor: '#a0c4d0',
      cardBg: 'rgba(30, 30, 50, 0.85)',
      cardBorder: 'rgba(0, 245, 255, 0.15)',
      cardHoverBorder: 'rgba(0, 245, 255, 0.6)',
      nameColor: '#00f5ff',
      taglineColor: '#8ab4c2',
      headingFont: "'Orbitron', sans-serif",
      bodyFont: "'Exo 2', sans-serif",
    },
  };

  const S = isSynthwave ? STYLES.synthwave : STYLES.elegant;

  // ── Build Component ────────────────────────────────────────────────────────
  const section = document.createElement('section');
  section.id = COMPONENT_ID;
  section.setAttribute('aria-label', 'Explore more from Quantum Merlin');

  section.innerHTML = `
    <style>
      #${COMPONENT_ID} {
        max-width: 900px;
        margin: 2rem auto;
        padding: 2rem 1.5rem;
        background: ${S.sectionBg};
        border: 1px solid ${S.border};
        border-radius: 16px;
        text-align: center;
        backdrop-filter: blur(6px);
      }
      #${COMPONENT_ID} .qm-explore-heading {
        font-family: ${S.headingFont};
        color: ${S.headingColor};
        font-size: 1.3rem;
        margin: 0 0 0.3rem;
        letter-spacing: 2px;
      }
      #${COMPONENT_ID} .qm-explore-sub {
        font-family: ${S.bodyFont};
        color: ${S.subColor};
        font-size: 0.95rem;
        margin: 0 0 1.5rem;
        opacity: 0.8;
      }
      #${COMPONENT_ID} .qm-explore-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1rem;
      }
      #${COMPONENT_ID} .qm-explore-card {
        display: block;
        padding: 1.2rem 1rem;
        background: ${S.cardBg};
        border: 1px solid ${S.cardBorder};
        border-radius: 12px;
        text-decoration: none;
        transition: border-color 0.3s, transform 0.2s, box-shadow 0.3s;
        cursor: pointer;
      }
      #${COMPONENT_ID} .qm-explore-card:hover {
        border-color: ${S.cardHoverBorder};
        transform: translateY(-2px);
        box-shadow: 0 4px 20px ${S.border};
      }
      #${COMPONENT_ID} .qm-explore-emoji {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      #${COMPONENT_ID} .qm-explore-name {
        font-family: ${S.headingFont};
        color: ${S.nameColor};
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.4rem;
        letter-spacing: 1px;
      }
      #${COMPONENT_ID} .qm-explore-tagline {
        font-family: ${S.bodyFont};
        color: ${S.taglineColor};
        font-size: 0.85rem;
        line-height: 1.4;
      }
      @media (max-width: 480px) {
        #${COMPONENT_ID} { padding: 1.2rem 1rem; }
        #${COMPONENT_ID} .qm-explore-grid { grid-template-columns: 1fr; }
        #${COMPONENT_ID} .qm-explore-heading { font-size: 1.1rem; }
      }
    </style>
    <h3 class="qm-explore-heading">Explore More from Quantum Merlin</h3>
    <p class="qm-explore-sub">Discover other cosmic tools and experiences</p>
    <div class="qm-explore-grid">
      ${recs.map(r => `
        <a class="qm-explore-card" href="${r.path}" data-brand="${r.id}">
          <span class="qm-explore-emoji">${r.emoji}</span>
          <div class="qm-explore-name">${r.name}</div>
          <div class="qm-explore-tagline">${r.tagline}</div>
        </a>
      `).join('')}
    </div>
  `;

  // ── GA4 Tracking ───────────────────────────────────────────────────────────
  section.querySelectorAll('.qm-explore-card').forEach(card => {
    card.addEventListener('click', function () {
      const targetBrand = this.getAttribute('data-brand');
      if (typeof gtag === 'function') {
        gtag('event', 'cross_brand_click', {
          event_category: 'navigation',
          event_label: targetBrand,
          source_brand: currentBrand,
          destination_brand: targetBrand,
        });
      }
    });
  });

  // ── Injection ──────────────────────────────────────────────────────────────
  // Place above the Etsy CTA if present, otherwise above the footer
  function inject() {
    const etsyCta = document.getElementById('qm-etsy-cta');
    if (etsyCta) {
      etsyCta.parentNode.insertBefore(section, etsyCta);
      return;
    }

    const footer = document.querySelector('footer.legal-footer') ||
                   document.querySelector('footer') ||
                   document.querySelector('.legal-footer');
    if (footer) {
      footer.parentNode.insertBefore(section, footer);
      return;
    }

    // Last resort: append to body
    document.body.appendChild(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
