/**
 * Quantum Reality Codes - Analytics Integration
 * Google Analytics 4 + Event Tracking
 * 
 * Replace GA_MEASUREMENT_ID with your actual GA4 ID when ready
 */

const QRC_ANALYTICS = {
  GA_ID: 'G-XXXXXXXXXX', // Replace with your GA4 Measurement ID
  initialized: false,
  
  /**
   * Initialize Google Analytics
   */
  init() {
    if (this.initialized) return;
    
    // Don't load if using placeholder ID
    if (this.GA_ID === 'G-XXXXXXXXXX') {
      console.log('[QRC Analytics] Using placeholder ID - tracking disabled');
      return;
    }
    
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA_ID}`;
    document.head.appendChild(script);
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { dataLayer.push(arguments); };
    
    gtag('js', new Date());
    gtag('config', this.GA_ID, {
      page_title: document.title,
      page_location: window.location.href
    });
    
    this.initialized = true;
    console.log('[QRC Analytics] Initialized');
  },
  
  /**
   * Track page view
   */
  pageView(pagePath, pageTitle) {
    if (!this.initialized) return;
    
    gtag('event', 'page_view', {
      page_path: pagePath || window.location.pathname,
      page_title: pageTitle || document.title
    });
  },
  
  /**
   * Track tool usage
   */
  trackTool(toolName, action, value) {
    if (!this.initialized) {
      console.log(`[QRC Analytics] Tool: ${toolName}, Action: ${action}`);
      return;
    }
    
    gtag('event', 'tool_usage', {
      tool_name: toolName,
      action: action,
      value: value || 1
    });
  },
  
  /**
   * Track feature usage
   */
  trackFeature(featureName, details) {
    if (!this.initialized) {
      console.log(`[QRC Analytics] Feature: ${featureName}`, details);
      return;
    }
    
    gtag('event', 'feature_usage', {
      feature_name: featureName,
      ...details
    });
  },
  
  /**
   * Track button clicks
   */
  trackClick(buttonName, location) {
    if (!this.initialized) return;
    
    gtag('event', 'click', {
      button_name: buttonName,
      click_location: location
    });
  },
  
  /**
   * Track time spent on tool
   */
  trackTimeSpent(toolName, duration) {
    if (!this.initialized) return;
    
    gtag('event', 'timing_complete', {
      name: toolName,
      value: duration
    });
  },
  
  /**
   * Track navigation between tools
   */
  trackNavigation(fromTool, toTool) {
    if (!this.initialized) return;
    
    gtag('event', 'navigation', {
      from_tool: fromTool,
      to_tool: toTool
    });
  },
  
  /**
   * Track social share
   */
  trackShare(platform, content) {
    if (!this.initialized) return;
    
    gtag('event', 'share', {
      method: platform,
      content_type: content
    });
  },
  
  /**
   * Track email signup
   */
  trackEmailSignup(source) {
    if (!this.initialized) {
      console.log(`[QRC Analytics] Email signup from: ${source}`);
      return;
    }
    
    gtag('event', 'sign_up', {
      method: 'email',
      source: source
    });
  },
  
  /**
   * Track donation click
   */
  trackDonation(source) {
    if (!this.initialized) {
      console.log(`[QRC Analytics] Donation click from: ${source}`);
      return;
    }
    
    gtag('event', 'donation_click', {
      source: source
    });
  }
};

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  QRC_ANALYTICS.init();
});

// Export for usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QRC_ANALYTICS;
}

// Make available globally
window.QRC_ANALYTICS = QRC_ANALYTICS;
