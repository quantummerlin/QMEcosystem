// Google Analytics Integration for Quantum Merlin
// This file handles all analytics tracking across the ecosystem

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

// Initialize Google Analytics
ga('create', 'GA_MEASUREMENT_ID', 'auto'); // Replace with actual GA ID
ga('send', 'pageview');

// Enhanced Ecommerce Tracking
function trackToolUsage(toolName, action, value) {
    ga('send', 'event', {
        eventCategory: 'Tool Usage',
        eventAction: action,
        eventLabel: toolName,
        eventValue: value || 1
    });
}

// Track sigil generation
function trackSigilGeneration(location, moonPhase, style) {
    ga('send', 'event', {
        eventCategory: 'Sigil Generator',
        eventAction: 'Generate Sigil',
        eventLabel: `${location} - ${moonPhase} - ${style}`,
        eventValue: 1
    });
    
    // Enhanced ecommerce for potential future monetization
    ga('ec:addProduct', {
        'id': 'sigil-gen',
        'name': 'Cosmic Sigil Generation',
        'category': 'Digital Service',
        'variant': style,
        'price': 0,
        'quantity': 1
    });
    ga('ec:setAction', 'detail');
    ga('send', 'pageview');
}

// Track email signups
function trackEmailSignup(source) {
    ga('send', 'event', {
        eventCategory: 'Email Marketing',
        eventAction: 'Signup',
        eventLabel: source,
        eventValue: 1
    });
}

// Track social sharing
function trackSocialShare(network, content) {
    ga('send', 'social', network, 'share', content);
}

// Track forum engagement
function trackForumEngagement(action, category) {
    ga('send', 'event', {
        eventCategory: 'Forum Engagement',
        eventAction: action,
        eventLabel: category,
        eventValue: 1
    });
}

// Track premium feature usage
function trackPremiumUsage(feature) {
    ga('send', 'event', {
        eventCategory: 'Premium Features',
        eventAction: 'Usage',
        eventLabel: feature,
        eventValue: 1
    });
}

// Track time spent on tools
function trackToolTimeSpent(toolName, duration) {
    ga('send', 'timing', 'Tool Engagement', toolName, duration);
}

// Track user journey across tools
function trackUserJourney(fromTool, toTool) {
    ga('send', 'event', {
        eventCategory: 'User Journey',
        eventAction: 'Navigation',
        eventLabel: `${fromTool} to ${toTool}`,
        eventValue: 1
    });
}

// Track revenue events (for future monetization)
function trackRevenue(product, price, category) {
    ga('require', 'ecommerce');
    
    ga('ecommerce:addTransaction', {
        'id': generateTransactionId(),
        'revenue': price,
        'shipping': '0',
        'tax': '0'
    });
    
    ga('ecommerce:addItem', {
        'id': generateTransactionId(),
        'name': product,
        'category': category,
        'price': price,
        'quantity': 1
    });
    
    ga('ecommerce:send');
}

// Helper function to generate transaction IDs
function generateTransactionId() {
    return 'txn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Custom dimensions for enhanced tracking
function setUserProperties(userType, toolsUsed) {
    ga('set', 'dimension1', userType); // User Type: New, Returning, Premium
    ga('set', 'dimension2', toolsUsed); // Tools Used: comma-separated list
    ga('set', 'dimension3', navigator.language); // User Language
    ga('set', 'dimension4', new Date().getTimezoneOffset()); // User Timezone
}

// Track page performance
function trackPagePerformance() {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        ga('send', 'timing', 'Page Load', 'document', loadTime);
    }
}

// Track errors
function trackError(error, context) {
    ga('send', 'event', {
        eventCategory: 'Errors',
        eventAction: context,
        eventLabel: error.message,
        nonInteraction: true
    });
}

// Track outbound links
function trackOutboundLink(url, category) {
    ga('send', 'event', {
        eventCategory: 'Outbound Links',
        eventAction: 'Click',
        eventLabel: url,
        transport: 'beacon'
    });
}

// Initialize tracking when page loads
window.addEventListener('load', function() {
    trackPagePerformance();
    
    // Determine if user is new or returning
    const isNewUser = !localStorage.getItem('returningUser');
    if (isNewUser) {
        localStorage.setItem('returningUser', 'true');
        setUserProperties('New', '');
        ga('send', 'event', 'User Type', 'New User', 'First Visit');
    } else {
        setUserProperties('Returning', localStorage.getItem('toolsUsed') || '');
        ga('send', 'event', 'User Type', 'Returning User', 'Return Visit');
    }
});

// Facebook Pixel Integration
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', 'YOUR_PIXEL_ID'); // Replace with actual Pixel ID
fbq('track', 'PageView');

// Export functions for use in other files
window.QuantumAnalytics = {
    trackToolUsage,
    trackSigilGeneration,
    trackEmailSignup,
    trackSocialShare,
    trackForumEngagement,
    trackPremiumUsage,
    trackToolTimeSpent,
    trackUserJourney,
    trackRevenue,
    trackError,
    trackOutboundLink
};

console.log('Quantum Merlin Analytics initialized');