// ============================================
// Kosmic K-Pop Analytics
// Google Analytics 4 + Custom Event Tracking
// ============================================

// GA4 Configuration
const GA_MEASUREMENT_ID = 'G-VW4LGE7L1T';

// Initialize Google Analytics
(function() {
    // Load gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        'page_title': document.title,
        'page_location': window.location.href,
        'custom_map': {
            'dimension1': 'archetype',
            'dimension2': 'tool_name'
        }
    });
})();

// ============================================
// Custom Event Tracking Functions
// ============================================

// Track when user starts a reading/quiz
function trackToolStart(toolName) {
    gtag('event', 'tool_start', {
        'event_category': 'engagement',
        'event_label': toolName,
        'tool_name': toolName
    });
}

// Track when user completes a reading/quiz
function trackToolComplete(toolName, result) {
    gtag('event', 'tool_complete', {
        'event_category': 'engagement',
        'event_label': toolName,
        'tool_name': toolName,
        'archetype': result || 'unknown'
    });
}

// Track archetype discovery
function trackArchetypeDiscovered(archetypeName) {
    gtag('event', 'archetype_discovered', {
        'event_category': 'conversion',
        'event_label': archetypeName,
        'archetype': archetypeName
    });
    
    // Store in localStorage for persistence
    const data = {
        name: archetypeName,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        icon: getArchetypeIcon(archetypeName)
    };
    localStorage.setItem('kosmicArchetype', JSON.stringify(data));
}

// Track social shares
function trackShare(platform, content) {
    gtag('event', 'share', {
        'event_category': 'social',
        'event_label': platform,
        'content_type': content || 'archetype_result'
    });
}

// Track PWA install
function trackPWAInstall() {
    gtag('event', 'pwa_install', {
        'event_category': 'conversion',
        'event_label': 'app_installed'
    });
}

// Track streak milestones
function trackStreakMilestone(days) {
    gtag('event', 'streak_milestone', {
        'event_category': 'engagement',
        'event_label': `${days}_day_streak`,
        'value': days
    });
}

// Track button clicks
function trackButtonClick(buttonName, destination) {
    gtag('event', 'button_click', {
        'event_category': 'navigation',
        'event_label': buttonName,
        'destination': destination || 'unknown'
    });
}

// Track scroll depth
let scrollMilestones = [25, 50, 75, 100];
let scrollTracked = [];

window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    scrollMilestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollTracked.includes(milestone)) {
            scrollTracked.push(milestone);
            gtag('event', 'scroll_depth', {
                'event_category': 'engagement',
                'event_label': `${milestone}%`,
                'value': milestone
            });
        }
    });
});

// Track time on page
let timeOnPage = 0;
const timeIntervals = [30, 60, 120, 300]; // seconds
let timeTracked = [];

setInterval(() => {
    timeOnPage++;
    timeIntervals.forEach(interval => {
        if (timeOnPage === interval && !timeTracked.includes(interval)) {
            timeTracked.push(interval);
            gtag('event', 'time_on_page', {
                'event_category': 'engagement',
                'event_label': `${interval}_seconds`,
                'value': interval
            });
        }
    });
}, 1000);

// Helper function to get archetype icon
function getArchetypeIcon(name) {
    const icons = {
        'Golden Leader': '🌟',
        'Harmonious Diplomat': '🤝',
        'Mood Maker': '😄',
        'Stable Backbone': '💪',
        'Dance Virtuoso': '💃',
        'Visual Center': '✨',
        'Creative Genius': '🧠',
        'Fire Rapper': '🔥',
        'Power Vocalist': '🎤',
        'All-Rounder': '🏆',
        'Empire Builder': '🏗️',
        'Wise Teacher': '📚'
    };
    return icons[name] || '⭐';
}

// ============================================
// Auto-track page views for SPAs
// ============================================
function trackPageView(pagePath, pageTitle) {
    gtag('config', GA_MEASUREMENT_ID, {
        'page_path': pagePath,
        'page_title': pageTitle
    });
}

// ============================================
// Performance Tracking
// ============================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                gtag('event', 'page_load_time', {
                    'event_category': 'performance',
                    'event_label': 'load_complete',
                    'value': Math.round(perfData.loadEventEnd - perfData.startTime)
                });
            }
        }, 0);
    });
}

console.log('✨ Kosmic K-Pop Analytics initialized');
