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
    this._autoTrackTimeOnPage();
    this._setUserProperties();
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

  // ── Auto: time-on-page quality events (30s / 60s / 120s / 180s) ──
  _autoTrackTimeOnPage() {
    const milestones = [30, 60, 120, 180];
    const fired = new Set();
    const start = Date.now();
    const check = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      milestones.forEach(s => {
        if (elapsed >= s && !fired.has(s)) {
          fired.add(s);
          this._fire('time_on_page', {
            seconds:   s,
            tool_name: this._toolName,
            page_type: this._pageType
          });
        }
      });
      if (fired.size < milestones.length) setTimeout(check, 10000);
    };
    setTimeout(check, 30000);
  },

  // ── User properties — persistent behavioural segmentation ─────
  _setUserProperties() {
    try {
      // Read signals from localStorage set by various tools across the ecosystem
      const savedTracks   = JSON.parse(localStorage.getItem('qm_saved_tracks')  || '{}');
      const readingCount  = parseInt(localStorage.getItem('qm_reading_count')   || '0', 10);
      const emailCaptured = !!localStorage.getItem('qm_email_captured');
      const hasSavedFreqs = Object.keys(savedTracks).length > 0;

      // Determine preferred tool type from page type history
      const pageTypeHistory = JSON.parse(localStorage.getItem('qm_page_type_history') || '[]');
      pageTypeHistory.push(this._pageType);
      if (pageTypeHistory.length > 20) pageTypeHistory.shift();
      localStorage.setItem('qm_page_type_history', JSON.stringify(pageTypeHistory));

      // Find most visited category
      const freq = {};
      pageTypeHistory.forEach(t => { freq[t] = (freq[t] || 0) + 1; });
      const preferredType = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || this._pageType;

      // Increment reading count if this is a reading page
      const newReadingCount = this._pageType === 'reading' ? readingCount + 1 : readingCount;
      if (this._pageType === 'reading') localStorage.setItem('qm_reading_count', newReadingCount);

      // Classify engagement tier
      const totalVisits = pageTypeHistory.length;
      const engagementTier = totalVisits >= 10 ? 'power_user'
                           : totalVisits >= 4  ? 'returning'
                           : 'new';

      this._fire('set_user_properties', {
        preferred_tool_type: preferredType,
        engagement_tier:     engagementTier,
        readings_generated:  newReadingCount > 5 ? '5+' : String(newReadingCount),
        has_saved_tracks:    hasSavedFreqs,
        has_email:           emailCaptured,
        page_type_session:   this._pageType
      });

      // GA4 user_properties (scoped to user, persists across sessions in GA4)
      try {
        if (typeof gtag === 'function') {
          gtag('set', 'user_properties', {
            preferred_tool_type: preferredType,
            engagement_tier:     engagementTier,
            has_saved_tracks:    String(hasSavedFreqs),
            has_email:           String(emailCaptured)
          });
        }
      } catch(e) {}
    } catch(e) {}
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
