/**
 * Quantum Merlin - Email Capture Component
 * Self-injecting inline email signup that appears on brand landing pages.
 * Uses Formspree for collection. Fires GA4 email_signup event.
 *
 * Usage: <script src="/shared/js/quantum-email-capture.js" defer></script>
 *
 * Behavior:
 *   - Shows a non-intrusive inline card above the Explore/Etsy/footer sections
 *   - Brand-themed (QME Elegant or QRC Synthwave)
 *   - Remembers if user already signed up or dismissed (localStorage)
 *   - Value exchange: "Free weekly cosmic forecast"
 */
(function () {
  'use strict';

  const COMPONENT_ID = 'qm-email-capture';
  const FORMSPREE_URL = 'https://formspree.io/f/mgowrolb';
  const LS_KEY = 'qm_email_captured';
  const LS_DISMISS_KEY = 'qm_email_dismissed';

  // Don't show if already signed up or dismissed in last 30 days
  if (document.getElementById(COMPONENT_ID)) return;
  if (localStorage.getItem(LS_KEY)) return;

  const dismissedAt = localStorage.getItem(LS_DISMISS_KEY);
  if (dismissedAt) {
    const daysSince = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
    if (daysSince < 30) return;
  }

  // Skip certain pages
  const path = window.location.pathname.toLowerCase();
  const SKIP_PAGES = ['/privacy', '/terms', '/disclaimer', '/contact', '/offline'];
  if (SKIP_PAGES.some(p => path.includes(p))) return;

  // ── Brand Detection ────────────────────────────────────────────────────────
  function detectBrand() {
    if (path.includes('/stranger/'))       return { name: 'Stranger Patterns', system: 'elegant', tag: 'stranger' };
    if (path.includes('/kpop/'))           return { name: 'K-Pop Kosmic', system: 'elegant', tag: 'kpop' };
    if (path.includes('/kosmickpop/'))     return { name: 'Kosmick Pop', system: 'elegant', tag: 'kosmickpop' };
    if (path.includes('/genesis/'))        return { name: 'Genesis', system: 'synthwave', tag: 'genesis' };
    if (path.includes('/40hz/'))           return { name: '40Hz Gamma', system: 'synthwave', tag: '40hz' };
    if (path.includes('/soulblueprint/'))  return { name: 'Soul Blueprint', system: 'elegant', tag: 'soulblueprint' };
    if (path.includes('/amomentintime/'))  return { name: 'A Moment In Time', system: 'elegant', tag: 'amomentintime' };
    if (path.includes('/classic/'))        return { name: 'Classic', system: 'elegant', tag: 'classic' };
    return { name: 'Quantum Merlin', system: 'elegant', tag: 'root' };
  }

  const brand = detectBrand();
  const isSynthwave = brand.system === 'synthwave';

  // ── Theme ──────────────────────────────────────────────────────────────────
  const T = isSynthwave ? {
    bg: 'rgba(20, 20, 35, 0.7)',
    border: 'rgba(0, 245, 255, 0.25)',
    accent: '#00f5ff',
    text: '#a0c4d0',
    inputBg: 'rgba(10, 10, 15, 0.8)',
    inputBorder: 'rgba(0, 245, 255, 0.3)',
    btnBg: 'linear-gradient(135deg, #00f5ff, #06b6d4)',
    btnText: '#0a0a0f',
    headingFont: "'Orbitron', sans-serif",
    bodyFont: "'Exo 2', sans-serif",
  } : {
    bg: 'rgba(45, 27, 78, 0.3)',
    border: 'rgba(255, 215, 0, 0.2)',
    accent: '#ffd700',
    text: '#f0e6ff',
    inputBg: 'rgba(10, 0, 21, 0.6)',
    inputBorder: 'rgba(255, 215, 0, 0.25)',
    btnBg: 'linear-gradient(135deg, #daa520, #ffd700)',
    btnText: '#1a0a2e',
    headingFont: "'Cinzel', serif",
    bodyFont: "'Cormorant Garamond', Georgia, serif",
  };

  // ── Build Component ────────────────────────────────────────────────────────
  const section = document.createElement('section');
  section.id = COMPONENT_ID;
  section.setAttribute('aria-label', 'Email signup');

  section.innerHTML = `
    <style>
      #${COMPONENT_ID} {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem 1.5rem;
        background: ${T.bg};
        border: 1px solid ${T.border};
        border-radius: 16px;
        text-align: center;
        backdrop-filter: blur(6px);
        position: relative;
      }
      #${COMPONENT_ID} .qm-ec-dismiss {
        position: absolute;
        top: 0.5rem;
        right: 0.8rem;
        background: none;
        border: none;
        color: ${T.text};
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.2s;
        padding: 4px 8px;
      }
      #${COMPONENT_ID} .qm-ec-dismiss:hover { opacity: 1; }
      #${COMPONENT_ID} .qm-ec-heading {
        font-family: ${T.headingFont};
        color: ${T.accent};
        font-size: 1.2rem;
        margin: 0 0 0.4rem;
        letter-spacing: 1.5px;
      }
      #${COMPONENT_ID} .qm-ec-sub {
        font-family: ${T.bodyFont};
        color: ${T.text};
        font-size: 0.95rem;
        margin: 0 0 1.2rem;
        opacity: 0.85;
      }
      #${COMPONENT_ID} .qm-ec-form {
        display: flex;
        gap: 0.6rem;
        max-width: 420px;
        margin: 0 auto;
      }
      #${COMPONENT_ID} .qm-ec-input {
        flex: 1;
        padding: 0.7rem 1rem;
        font-family: ${T.bodyFont};
        font-size: 0.95rem;
        color: ${T.text};
        background: ${T.inputBg};
        border: 1px solid ${T.inputBorder};
        border-radius: 8px;
        outline: none;
        transition: border-color 0.3s;
      }
      #${COMPONENT_ID} .qm-ec-input:focus {
        border-color: ${T.accent};
      }
      #${COMPONENT_ID} .qm-ec-input::placeholder {
        color: ${T.text};
        opacity: 0.4;
      }
      #${COMPONENT_ID} .qm-ec-btn {
        padding: 0.7rem 1.4rem;
        font-family: ${T.headingFont};
        font-size: 0.85rem;
        font-weight: 600;
        color: ${T.btnText};
        background: ${T.btnBg};
        border: none;
        border-radius: 8px;
        cursor: pointer;
        letter-spacing: 1px;
        transition: transform 0.2s, box-shadow 0.3s;
        white-space: nowrap;
      }
      #${COMPONENT_ID} .qm-ec-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 15px ${T.border};
      }
      #${COMPONENT_ID} .qm-ec-fine {
        font-family: ${T.bodyFont};
        color: ${T.text};
        font-size: 0.75rem;
        margin: 0.8rem 0 0;
        opacity: 0.5;
      }
      #${COMPONENT_ID} .qm-ec-success {
        font-family: ${T.bodyFont};
        color: ${T.accent};
        font-size: 1rem;
        padding: 1rem 0;
      }
      @media (max-width: 480px) {
        #${COMPONENT_ID} .qm-ec-form { flex-direction: column; }
        #${COMPONENT_ID} { padding: 1.2rem 1rem; }
      }
    </style>
    <button class="qm-ec-dismiss" title="Dismiss" aria-label="Dismiss signup">&times;</button>
    <h3 class="qm-ec-heading">Get Your Free Weekly Cosmic Forecast</h3>
    <p class="qm-ec-sub">Personalised insights delivered every Monday — no spam, unsubscribe anytime.</p>
    <form class="qm-ec-form" action="${FORMSPREE_URL}" method="POST">
      <input type="hidden" name="_subject" value="New subscriber from ${brand.name}">
      <input type="hidden" name="source_brand" value="${brand.tag}">
      <input type="hidden" name="source_page" value="${path}">
      <input class="qm-ec-input" type="email" name="email" placeholder="your@email.com" required aria-label="Email address">
      <button class="qm-ec-btn" type="submit">Subscribe</button>
    </form>
    <p class="qm-ec-fine">No spam. Just cosmic wisdom. Unsubscribe anytime.</p>
  `;

  // ── Event Handlers ─────────────────────────────────────────────────────────
  const form = section.querySelector('form');
  const dismissBtn = section.querySelector('.qm-ec-dismiss');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]').value;
    const formData = new FormData(form);

    // Send to Formspree via fetch
    fetch(FORMSPREE_URL, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
    }).then(res => {
      if (res.ok) {
        localStorage.setItem(LS_KEY, Date.now().toString());
        section.querySelector('.qm-ec-form').style.display = 'none';
        section.querySelector('.qm-ec-sub').style.display = 'none';
        section.querySelector('.qm-ec-fine').style.display = 'none';
        section.querySelector('.qm-ec-dismiss').style.display = 'none';
        section.querySelector('.qm-ec-heading').textContent = 'You\'re In!';
        const success = document.createElement('p');
        success.className = 'qm-ec-success';
        success.textContent = 'Check your inbox for your first cosmic forecast.';
        section.querySelector('.qm-ec-heading').after(success);

        // GA4 tracking
        if (typeof gtag === 'function') {
          gtag('event', 'email_signup', {
            event_category: 'engagement',
            source_brand: brand.tag,
            source_page: path,
          });
        }
      }
    }).catch(() => {
      // Fallback: submit normally
      form.submit();
    });
  });

  dismissBtn.addEventListener('click', function () {
    localStorage.setItem(LS_DISMISS_KEY, Date.now().toString());
    section.remove();
  });

  // ── Injection ──────────────────────────────────────────────────────────────
  function inject() {
    // Place above the Explore component if present, then Etsy CTA, then footer
    const explore = document.getElementById('qm-explore-more');
    if (explore) {
      explore.parentNode.insertBefore(section, explore);
      return;
    }

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

    document.body.appendChild(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
