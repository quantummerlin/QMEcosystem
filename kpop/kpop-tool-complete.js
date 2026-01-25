/**
 * K-Pop K-osmos Tool Completion Tracker
 * Include this on individual tool pages to track completion
 * 
 * Usage: Add to tool pages after kpop-progress.js
 * Call KPopToolComplete.markComplete() when a reading is generated
 */

const KPopToolComplete = {
    
    // Get current tool ID from URL
    getCurrentToolId() {
        const path = window.location.pathname;
        const parts = path.split('/');
        const filename = parts[parts.length - 1];
        return filename.replace('.html', '').replace(/\?.*$/, '');
    },
    
    // Mark current tool as complete
    markComplete() {
        if (typeof KPopProgress === 'undefined') {
            console.warn('KPopProgress not available');
            return false;
        }
        
        const toolId = this.getCurrentToolId();
        const progress = KPopProgress.completeTool(toolId);
        
        // Show small completion toast
        this.showCompletionToast(toolId);
        
        return progress;
    },
    
    // Show completion notification
    showCompletionToast(toolId) {
        // Add styles if not present
        if (!document.getElementById('completion-toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'completion-toast-styles';
            styles.textContent = `
                .kpop-complete-toast {
                    position: fixed;
                    top: 20px;
                    right: -400px;
                    background: linear-gradient(135deg, #1a0a1a 0%, #2d1f3d 100%);
                    border: 2px solid #4ade80;
                    border-radius: 15px;
                    padding: 15px 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    z-index: 9999;
                    transition: right 0.5s ease;
                    box-shadow: 0 0 20px rgba(74, 222, 128, 0.4);
                }
                .kpop-complete-toast.show {
                    right: 20px;
                }
                .complete-emoji {
                    font-size: 1.8rem;
                    animation: spin-bounce 0.6s ease;
                }
                .complete-text {
                    color: #e8d8f8;
                }
                .complete-label {
                    font-size: 0.7rem;
                    color: #4ade80;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    display: block;
                }
                .complete-message {
                    font-size: 0.95rem;
                    font-weight: 600;
                }
                @keyframes spin-bounce {
                    0% { transform: scale(0) rotate(-180deg); }
                    60% { transform: scale(1.2) rotate(10deg); }
                    100% { transform: scale(1) rotate(0deg); }
                }
                @media (max-width: 768px) {
                    .kpop-complete-toast {
                        left: 20px;
                        right: 20px !important;
                        top: auto;
                        bottom: -200px;
                        transition: bottom 0.5s ease;
                    }
                    .kpop-complete-toast.show {
                        bottom: 20px;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        const toast = document.createElement('div');
        toast.className = 'kpop-complete-toast';
        toast.innerHTML = `
            <span class="complete-emoji">⭐</span>
            <div class="complete-text">
                <span class="complete-label">Reading Complete!</span>
                <span class="complete-message">+1 toward your next level! 💜</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    },
    
    // Check if tool was already completed today
    isCompletedToday(toolId) {
        const todayKey = 'kpopCompleted_' + toolId + '_' + new Date().toDateString();
        return localStorage.getItem(todayKey) === 'true';
    },
    
    // Mark tool completed today (prevents spam)
    markCompletedToday(toolId) {
        const todayKey = 'kpopCompleted_' + toolId + '_' + new Date().toDateString();
        localStorage.setItem(todayKey, 'true');
    },
    
    // Auto-complete when certain elements appear (for reading results)
    watchForCompletion(selector, options = {}) {
        const observer = new MutationObserver((mutations, obs) => {
            const element = document.querySelector(selector);
            if (element) {
                const toolId = this.getCurrentToolId();
                
                // Only complete once per day per tool
                if (!this.isCompletedToday(toolId)) {
                    setTimeout(() => {
                        this.markComplete();
                        this.markCompletedToday(toolId);
                    }, options.delay || 1000);
                }
                
                if (options.once !== false) {
                    obs.disconnect();
                }
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        return observer;
    }
};

// Export globally
window.KPopToolComplete = KPopToolComplete;

// Auto-setup: Watch for common reading result containers
document.addEventListener('DOMContentLoaded', function() {
    // Common selectors for reading results
    const resultSelectors = [
        '.reading-result',
        '.result-container',
        '.reading-output',
        '#readingResult',
        '#result',
        '.full-reading',
        '.generated-reading'
    ];
    
    // Watch for any of these appearing
    resultSelectors.forEach(selector => {
        KPopToolComplete.watchForCompletion(selector, { once: true, delay: 1500 });
    });
});
