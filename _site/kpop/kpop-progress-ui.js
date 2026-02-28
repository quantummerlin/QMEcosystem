/**
 * K-Pop Kosmic Progressive Journey UI Integration
 * Handles lock states, tier badges, and tool completion
 */

document.addEventListener('DOMContentLoaded', function() {
    // Wait for KPopProgress to be ready
    if (typeof KPopProgress === 'undefined') {
        console.warn('KPopProgress not loaded yet');
        return;
    }
    
    const progress = KPopProgress.init();
    
    // Apply lock states to all tool cards
    applyLockStates();
    
    // Add tier badges to cards
    addTierBadges();
    
    // Mark completed tools
    markCompletedTools();
    
    // Setup tool click handlers
    setupToolTracking();
    
    // Show welcome message for first time users
    if (progress.totalVisits === 1) {
        showWelcomeMessage();
    } else {
        showEncouragement();
    }
});

/**
 * Apply lock/unlock states to tool cards
 */
function applyLockStates() {
    const progress = KPopProgress.getProgress();
    const currentLevel = progress ? progress.level : 1;
    
    document.querySelectorAll('.tool-card').forEach(card => {
        const href = card.getAttribute('href');
        if (!href) return;
        
        // Extract tool ID from href
        const toolId = extractToolId(href);
        const requiredLevel = KPopProgress.getToolTier(toolId);
        
        // Store tool ID on card for later use
        card.dataset.toolId = toolId;
        card.dataset.tier = requiredLevel;
        
        if (requiredLevel > currentLevel) {
            // Lock this tool
            card.classList.add('locked');
            
            // Create lock overlay
            const overlay = document.createElement('div');
            overlay.className = 'lock-overlay';
            
            const levelName = KPopProgress.LEVELS[requiredLevel].name;
            const levelTitle = KPopProgress.LEVELS[requiredLevel].title;
            
            overlay.innerHTML = `
                <div class="lock-message">🔒 Unlocks at ${levelTitle}</div>
                <div class="lock-level">Complete more readings to level up!</div>
            `;
            card.appendChild(overlay);
            
            // Prevent navigation on locked tools
            card.addEventListener('click', function(e) {
                if (this.classList.contains('locked')) {
                    e.preventDefault();
                    showLockedMessage(requiredLevel);
                }
            });
        }
    });
}

/**
 * Add tier badges to tool cards
 */
function addTierBadges() {
    document.querySelectorAll('.tool-card').forEach(card => {
        const tier = card.dataset.tier;
        if (!tier) return;
        
        // Only show badges for tier 2+
        if (parseInt(tier) > 1) {
            const badge = document.createElement('span');
            badge.className = `tier-badge tier-${tier}`;
            
            const tierNames = {
                2: 'DEBUT',
                3: 'COMEBACK',
                4: 'WORLD TOUR',
                5: 'LEGEND'
            };
            
            badge.textContent = tierNames[tier] || '';
            card.appendChild(badge);
        }
    });
}

/**
 * Mark completed tools with stars
 */
function markCompletedTools() {
    const progress = KPopProgress.getProgress();
    if (!progress) return;
    
    progress.completedTools.forEach(toolId => {
        const card = document.querySelector(`.tool-card[data-tool-id="${toolId}"]`);
        if (card) {
            card.classList.add('completed');
        }
    });
}

/**
 * Setup click tracking for tool completion
 */
function setupToolTracking() {
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', function() {
            const toolId = this.dataset.toolId;
            if (!toolId || this.classList.contains('locked')) return;
            
            // Store that user clicked this tool (completion tracked on tool page)
            sessionStorage.setItem('kpopActiveToolId', toolId);
        });
    });
}

/**
 * Extract tool ID from href
 */
function extractToolId(href) {
    // Remove .html and path to get tool ID
    if (!href) return 'unknown';
    
    // Get just the filename
    const parts = href.split('/');
    const filename = parts[parts.length - 1];
    
    // Remove .html extension
    return filename.replace('.html', '').replace(/\?.*$/, '');
}

/**
 * Show message for locked tools
 */
function showLockedMessage(requiredLevel) {
    const levelInfo = KPopProgress.LEVELS[requiredLevel];
    const message = KPopProgress.PRODUCER_MESSAGES.locked.replace('{level}', levelInfo.title);
    
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'kpop-toast';
    toast.innerHTML = `
        <span class="toast-emoji">🔒</span>
        <span class="toast-message">${message}</span>
    `;
    
    // Add toast styles if not present
    if (!document.getElementById('toast-styles')) {
        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.textContent = `
            .kpop-toast {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: linear-gradient(135deg, #1a0a1a, #2d1f3d);
                border: 2px solid #ff6b9d;
                border-radius: 15px;
                padding: 15px 25px;
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 9999;
                box-shadow: 0 0 30px rgba(255, 107, 157, 0.5);
                transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .kpop-toast.show {
                transform: translateX(-50%) translateY(0);
            }
            .toast-emoji {
                font-size: 1.5rem;
            }
            .toast-message {
                color: #e8d8f8;
                font-size: 0.95rem;
                max-width: 300px;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 50);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

/**
 * Show welcome message for new users
 */
function showWelcomeMessage() {
    const modal = document.createElement('div');
    modal.className = 'kpop-celebration-modal';
    modal.innerHTML = `
        <div class="celebration-content">
            <div class="celebration-confetti"></div>
            <div class="celebration-emoji">🎤</div>
            <h2 class="celebration-title">Welcome, Trainee!</h2>
            <h3 class="celebration-level">Your K-osmic Journey Begins</h3>
            <p class="celebration-message">
                OMG BESTIE you made it! 💜✨ You're about to go from trainee to K-Pop LEGEND! 
                Complete readings to unlock new tools and earn achievements. 
                Your Producer (that's me!) will guide you every step! Let's SLAY! 🌟
            </p>
            <button class="celebration-btn" onclick="this.closest('.kpop-celebration-modal').remove()">
                Start My Journey! 🚀
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * Show random encouragement message
 */
function showEncouragement() {
    const progress = KPopProgress.getProgress();
    if (!progress || progress.totalVisits % 3 !== 0) return; // Show every 3rd visit
    
    const message = KPopProgress.getEncouragement();
    const levelInfo = KPopProgress.getCurrentLevel();
    
    const toast = document.createElement('div');
    toast.className = 'kpop-toast encouragement';
    toast.innerHTML = `
        <span class="toast-emoji">${levelInfo.emoji}</span>
        <span class="toast-message">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 500);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// Export for use elsewhere
window.KPopProgressUI = {
    applyLockStates,
    addTierBadges,
    markCompletedTools,
    showLockedMessage,
    extractToolId
};
