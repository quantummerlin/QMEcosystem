/**
 * Quantum Merlin Ecosystem — Analytics
 * GA4 + zero-touch auto event tracking across all tools
 */

const QRC_ANALYTICS = {
  GA_ID: 'G-VW4LGE7L1T',
  initialized: false,
  _toolName: '',
  _pageType: '',

  // ── Init ──────────────────────────────────────────────────────
  init() {
    if (this.initialized) return;
    if (!this.GA_ID || this.GA_ID === 'G-XXXXXXXXXX') return;

    // If the page's inline GA4 tag already loaded gtag, reuse it — no duplicate script
    if (typeof window.gtag === 'function' && window.dataLayer) {
      this.initialized = true;
    } else {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { dataLayer.push(arguments); };
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.GA_ID;
      document.head.appendChild(s);
      gtag('js', new Date());
      gtag('config', this.GA_ID, {
        page_title: document.title,
        page_location: window.location.href
      });
      this.initialized = true;
    }

    this._toolName = this._getToolName();
    this._pageType = this._getPageType();

    this._autoTrackButtons();
    this._autoTrackScroll();
    this._autoTrackEcosystemLinks();
    // Defer result observation so dynamically-rendered tools have time to paint
    setTimeout(() => this._autoTrackResults(), 800);
  },

  // ── Safe fire helper ──────────────────────────────────────────
  _fire(event, params) {
    try { if (typeof gtag === 'function') gtag('event', event, params); } catch(e) {}
  },

  // ── Page context helpers ──────────────────────────────────────
  _getToolName() {
    const seg = window.location.pathname
      .replace(/\.html$/, '').split('/').filter(Boolean).pop() || 'home';
    return seg.replace(/-/g, '_');
  },

  _getPageType() {
    const p = window.location.pathname;
    if (/angel.number|\/\d{3,4}\.html/.test(p))                                    return 'angel_number';
    if (/life.path|compat|calculator|personal.year|personal.day|business.numer|power.days/.test(p)) return 'calculator';
    if (/birth.sigil|sigil/.test(p))                                                return 'sigil_generator';
    if (/frequencygenerator|genesis|40hz/.test(p))                                  return 'frequency';
    if (/trust.radar|energyleak|hidden.strength|identity.split|power.avoid/.test(p))return 'micro_tool';
    if (/amomentintime|soulblueprint|ultimate|view\.html/.test(p))                  return 'reading';
    if (/\/index\.html$|\/+$/.test(p))                                              return 'hub';
    return 'tool';
  },

  // ── Auto: calculate/generate button tracking ──────────────────
  _autoTrackButtons() {
    const CALC_RE  = /calculat|generat|reveal|discover|find.my|get.read|start.read|show.result/i;
    const SHARE_RE = /^(share|copy link|copy)$/i;
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('button,[role="button"],input[type="submit"]');
      if (!btn) return;
      const label = (btn.textContent || btn.value || '').trim();
      const sig   = label + ' ' + (btn.id || '') + ' ' + (btn.className || '');
      if (CALC_RE.test(sig)) {
        this._fire('tool_calculate', {
          tool_name:    this._toolName,
          page_type:    this._pageType,
          button_label: label.substring(0, 50)
        });
      } else if (SHARE_RE.test(label)) {
        this._fire('tool_share', { tool_name: this._toolName, page_type: this._pageType });
      }
    });
  },

  // ── Auto: scroll depth (25 / 50 / 75 / 100 %) ────────────────
  _autoTrackScroll() {
    const milestones = [25, 50, 75, 100];
    const fired = new Set();
    window.addEventListener('scroll', () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable <= 0) return;
      const pct = Math.round((window.scrollY / scrollable) * 100);
      milestones.forEach(d => {
        if (pct >= d && !fired.has(d)) {
          fired.add(d);
          this._fire('scroll_depth', { depth: d, tool_name: this._toolName, page_type: this._pageType });
        }
      });
    }, { passive: true });
  },

  // ── Auto: cross-ecosystem link navigation ─────────────────────
  _autoTrackEcosystemLinks() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.href || '';
      if (href.includes('quantummerlin.com') && href !== window.location.href) {
        this._fire('ecosystem_navigation', {
          from_tool:   this._toolName,
          destination: href.replace(/^https?:\/\/[^/]+/, '').substring(0, 100)
        });
      }
    });
  },

  // ── Auto: result section reveal (IntersectionObserver) ────────
  _autoTrackResults() {
    if (!('IntersectionObserver' in window)) return;
    const SELECTORS = [
      '#results','#result','.results','.result-section',
      '#reading-output','#output','.reading-result',
      '#life-path-result','#angel-result','.calculation-result',
      '#sigil-result','#compatibility-result','#personal-year-result',
      '[id$="-result"],[id$="-output"],[id$="-reading"]'
    ];
    const seen = new Set();
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (seen.has(el) || el.children.length === 0) return;
        seen.add(el);
        obs.unobserve(el);
        this._fire('result_revealed', {
          tool_name:  this._toolName,
          page_type:  this._pageType,
          element_id: el.id || (el.className || '').split(' ')[0]
        });
      });
    }, { threshold: 0.2 });
    SELECTORS.forEach(sel => {
      try { document.querySelectorAll(sel).forEach(el => obs.observe(el)); } catch(e) {}
    });
  },

  // ── Explicit tracking methods (backward compatible) ───────────

  pageView(pagePath, pageTitle) {
    this._fire('page_view', {
      page_path:  pagePath  || window.location.pathname,
      page_title: pageTitle || document.title
    });
  },

  trackTool(toolName, action, value) {
    this._fire('tool_usage', { tool_name: toolName, action, value: value || 1 });
  },

  trackFeature(featureName, details) {
    this._fire('feature_usage', { feature_name: featureName, ...(details || {}) });
  },

  trackClick(buttonName, location) {
    this._fire('click', { button_name: buttonName, click_location: location });
  },

  trackTimeSpent(toolName, duration) {
    this._fire('timing_complete', { name: toolName, value: duration });
  },

  trackNavigation(fromTool, toTool) {
    this._fire('navigation', { from_tool: fromTool, to_tool: toTool });
  },

  trackShare(platform, content) {
    this._fire('share', { method: platform, content_type: content });
  },

  trackEmailSignup(source) {
    this._fire('sign_up', { method: 'email', source });
  },

  trackDonation(source) {
    this._fire('donation_click', { source });
  }
};

document.addEventListener('DOMContentLoaded', () => QRC_ANALYTICS.init());

if (typeof module !== 'undefined' && module.exports) module.exports = QRC_ANALYTICS;
window.QRC_ANALYTICS = QRC_ANALYTICS;
