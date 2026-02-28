/**
 * Quantum Merlin - Etsy Premium Reading CTA
 * Self-injecting component that adds an Etsy CTA card above the page footer.
 * Detects the current brand/section and styles the card accordingly.
 *
 * Usage: <script src="/shared/js/quantum-etsy-cta.js" defer></script>
 *        or  <script src="../shared/js/quantum-etsy-cta.js" defer></script>
 *
 * Configuration (optional data-attributes on the script tag):
 *   data-etsy-url   - Override the default Etsy shop URL
 *   data-cta-text   - Override the button label
 *   data-placement  - "above-footer" (default) | "after-result"
 */
(function () {
  'use strict';

  // ── Configuration ──────────────────────────────────────────────────────────
  const ETSY_BASE = 'https://www.etsy.com/shop/QuantumMerlin';
  const COMPONENT_ID = 'qm-etsy-cta';

  // Prevent double-injection
  if (document.getElementById(COMPONENT_ID)) return;

  // Read per-page overrides from the <script> tag's data-attributes
  const thisScript =
    document.currentScript ||
    document.querySelector('script[src*="quantum-etsy-cta"]');
  const overrideUrl = thisScript?.getAttribute('data-etsy-url');
  const overrideCta = thisScript?.getAttribute('data-cta-text');

  // ── Brand Detection ────────────────────────────────────────────────────────
  const path = window.location.pathname.toLowerCase();

  function detectBrand() {
    if (path.includes('/stranger/'))    return 'stranger';
    if (path.includes('/kpop/'))        return 'kpop';
    if (path.includes('/kosmickpop/'))  return 'kosmickpop';
    if (path.includes('/genesis/'))     return 'genesis';
    if (path.includes('/classic/'))     return 'classic';
    if (path.includes('/soulblueprint/')) return 'soulblueprint';
    if (path.includes('/40hz/'))        return '40hz';
    if (path.includes('/amomentintime/')) return 'amomentintime';
    if (path.includes('/gravity/'))     return 'gravity';
    if (path.includes('/lifestrategy/')) return 'lifestrategy';
    if (path.includes('/pt/'))          return 'pt';
    return 'qme'; // root-level tool
  }

  const brand = detectBrand();

  // ── Brand-Specific Theming ─────────────────────────────────────────────────
  const themes = {
    stranger: {
      accent:   '#FF4500',
      gradient: 'linear-gradient(135deg, #FF6B35, #f59e0b)',
      border:   'rgba(220, 20, 60, 0.3)',
      bg:       'rgba(15, 10, 12, 0.92)',
      font:     "'Cinzel', serif",
      label:    'Stranger Patterns'
    },
    kpop: {
      accent:   '#ff2d78',
      gradient: 'linear-gradient(135deg, #ff2d78, #a855f7)',
      border:   'rgba(255, 45, 120, 0.3)',
      bg:       'rgba(10, 5, 20, 0.92)',
      font:     "'Cinzel', serif",
      label:    'K-Pop Astrology'
    },
    kosmickpop: {
      accent:   '#00ffcc',
      gradient: 'linear-gradient(135deg, #00ffcc, #7b2ff7)',
      border:   'rgba(0, 255, 204, 0.3)',
      bg:       'rgba(5, 5, 15, 0.92)',
      font:     "'Orbitron', sans-serif",
      label:    'Kosmick Pop'
    },
    genesis: {
      accent:   '#ffd700',
      gradient: 'linear-gradient(135deg, #ffd700, #e6ac00)',
      border:   'rgba(255, 215, 0, 0.3)',
      bg:       'rgba(26, 10, 46, 0.92)',
      font:     "'Cinzel', serif",
      label:    'Genesis'
    },
    classic: {
      accent:   '#ffd700',
      gradient: 'linear-gradient(135deg, #ffd700, #e6ac00)',
      border:   'rgba(255, 215, 0, 0.3)',
      bg:       'rgba(26, 10, 46, 0.92)',
      font:     "'Cinzel', serif",
      label:    'Quantum Merlin'
    },
    soulblueprint: {
      accent:   '#ffd700',
      gradient: 'linear-gradient(135deg, #ffd700, #e6ac00)',
      border:   'rgba(255, 215, 0, 0.3)',
      bg:       'rgba(26, 10, 46, 0.92)',
      font:     "'Cinzel', serif",
      label:    'Soul Blueprint'
    },
    '40hz': {
      accent:   '#00d4ff',
      gradient: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
      border:   'rgba(0, 212, 255, 0.3)',
      bg:       'rgba(5, 5, 15, 0.92)',
      font:     "'Orbitron', sans-serif",
      label:    '40Hz Reality'
    },
    amomentintime: {
      accent:   '#ffd700',
      gradient: 'linear-gradient(135deg, #ffd700, #e6ac00)',
      border:   'rgba(255, 215, 0, 0.3)',
      bg:       'rgba(26, 10, 46, 0.92)',
      font:     "'Cinzel', serif",
      label:    'A Moment In Time'
    },
    gravity: {
      accent:   '#ffd700',
      gradient: 'linear-gradient(135deg, #ffd700, #e6ac00)',
      border:   'rgba(255, 215, 0, 0.3)',
      bg:       'rgba(26, 10, 46, 0.92)',
      font:     "'Cinzel', serif",
      label:    'Gravity'
    },
    lifestrategy: {
      accent:   '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      border:   'rgba(16, 185, 129, 0.3)',
      bg:       'rgba(5, 15, 10, 0.92)',
      font:     "'Cinzel', serif",
      label:    'Life Strategy'
    },
    pt: {
      accent:   '#ffd700',
      gradient: 'linear-gradient(135deg, #ffd700, #e6ac00)',
      border:   'rgba(255, 215, 0, 0.3)',
      bg:       'rgba(26, 10, 46, 0.92)',
      font:     "'Cinzel', serif",
      label:    'Quantum Merlin PT'
    },
    qme: {
      accent:   '#ffd700',
      gradient: 'linear-gradient(135deg, #ffd700, #e6ac00)',
      border:   'rgba(255, 215, 0, 0.3)',
      bg:       'rgba(26, 10, 46, 0.92)',
      font:     "'Cinzel', serif",
      label:    'Quantum Merlin'
    }
  };

  const theme = themes[brand] || themes.qme;

  // ── Build UTM URL ──────────────────────────────────────────────────────────
  const pageName = path.split('/').pop()?.replace('.html', '') || 'index';
  const etsyUrl =
    overrideUrl ||
    `${ETSY_BASE}?utm_source=quantummerlin&utm_medium=cta&utm_campaign=tool_upsell&utm_content=${brand}_${pageName}`;

  // ── CTA Text ───────────────────────────────────────────────────────────────
  const ctaLabel = overrideCta || 'Get Your Premium Reading on Etsy';
  const ctaSecondary = 'Hand-crafted 20+ page PDF delivered instantly';

  // ── Create DOM ─────────────────────────────────────────────────────────────
  function createCTA() {
    const section = document.createElement('section');
    section.id = COMPONENT_ID;
    section.setAttribute('aria-label', 'Premium reading offer');

    section.innerHTML = `
      <div class="qm-etsy-inner">
        <div class="qm-etsy-glow"></div>
        <div class="qm-etsy-icon">&#10024;</div>
        <h3 class="qm-etsy-title">Want the Full Picture?</h3>
        <p class="qm-etsy-desc">
          Go deeper with a <strong>personalised premium reading</strong> &mdash; 
          20+ pages of cosmic insights crafted just for you.
        </p>
        <a href="${etsyUrl}" target="_blank" rel="noopener" class="qm-etsy-btn"
           onclick="qmEtsyTrack()">
          ${ctaLabel} &rarr;
        </a>
        <p class="qm-etsy-sub">${ctaSecondary}</p>
      </div>
    `;

    // ── Styles (scoped to #qm-etsy-cta) ─────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
      #${COMPONENT_ID} {
        max-width: 720px;
        margin: 40px auto 10px;
        padding: 0 15px;
      }
      .qm-etsy-inner {
        position: relative;
        overflow: hidden;
        text-align: center;
        padding: 38px 28px 32px;
        background: ${theme.bg};
        border: 1px solid ${theme.border};
        border-radius: 22px;
        box-shadow: 0 12px 40px rgba(0,0,0,0.35);
      }
      .qm-etsy-glow {
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: ${theme.gradient};
        border-radius: 22px 22px 0 0;
      }
      .qm-etsy-icon {
        font-size: 2.4rem;
        margin-bottom: 10px;
        filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));
      }
      .qm-etsy-title {
        font-family: ${theme.font};
        font-size: 1.55rem;
        color: ${theme.accent};
        margin-bottom: 12px;
        letter-spacing: 1px;
      }
      .qm-etsy-desc {
        color: #c0bdb5;
        font-size: 1.02rem;
        line-height: 1.6;
        max-width: 540px;
        margin: 0 auto 22px;
      }
      .qm-etsy-desc strong {
        color: #e8e4d9;
      }
      .qm-etsy-btn {
        display: inline-block;
        padding: 14px 36px;
        background: ${theme.gradient};
        color: #0a0a0f;
        font-family: ${theme.font};
        font-weight: 700;
        font-size: 1.05rem;
        border-radius: 30px;
        text-decoration: none;
        box-shadow: 0 4px 20px ${theme.accent}40;
        transition: transform 0.25s, box-shadow 0.25s;
        letter-spacing: 0.03em;
      }
      .qm-etsy-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px ${theme.accent}60;
      }
      .qm-etsy-sub {
        margin-top: 14px;
        font-size: 0.85rem;
        color: #6b6b6b;
        font-style: italic;
      }
      @media (max-width: 480px) {
        .qm-etsy-inner { padding: 28px 18px 24px; }
        .qm-etsy-title { font-size: 1.3rem; }
        .qm-etsy-btn { padding: 12px 28px; font-size: 0.95rem; }
      }
    `;
    document.head.appendChild(style);
    return section;
  }

  // ── GA4 Event Tracking ─────────────────────────────────────────────────────
  window.qmEtsyTrack = function () {
    if (typeof gtag === 'function') {
      gtag('event', 'etsy_cta_click', {
        event_category: 'monetization',
        event_label: brand + '_' + pageName,
        transport_type: 'beacon'
      });
    }
  };

  // ── Injection ──────────────────────────────────────────────────────────────
  function inject() {
    const cta = createCTA();

    // Strategy: insert above footer.legal-footer, or before the last <footer>
    const legalFooter = document.querySelector('footer.legal-footer, .legal-footer');
    if (legalFooter) {
      legalFooter.parentNode.insertBefore(cta, legalFooter);
      return;
    }

    const footer = document.querySelector('footer');
    if (footer) {
      footer.parentNode.insertBefore(cta, footer);
      return;
    }

    // Fallback: append before </body>
    document.body.appendChild(cta);
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
