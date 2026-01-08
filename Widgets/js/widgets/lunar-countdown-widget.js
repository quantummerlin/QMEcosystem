/**
 * Quantum Merlin Lunar Countdown Widget
 * Tracks time until next Full Moon and New Moon
 * Extends QuantumMerlinWidget core functionality
 */

(function() {
    'use strict';
    
    // Extend the core widget class
    class LunarCountdownWidget extends window.QuantumMerlin.Widget {
        constructor(config) {
            super({
                ...config,
                widgetType: 'lunar-countdown'
            });
            
            this.countdownInterval = null;
            this.lunarData = {
                fullMoon: null,
                newMoon: null,
                currentPhase: null,
                currentIntensity: null
            };
        }
        
        async fetchData() {
            this.showLoading();
            
            try {
                // For now, use simulated data (replace with real API later)
                const now = new Date();
                
                // Calculate next Full Moon (simplified)
                const lastFullMoon = new Date('2025-01-13'); // Last known full moon
                const lunarCycle = 29.53059; // Days
                const daysSinceLastFull = (now - lastFullMoon) / (1000 * 60 * 60 * 24);
                const nextFullMoonDays = lunarCycle - (daysSinceLastFull % lunarCycle);
                const nextFullMoon = new Date(now.getTime() + (nextFullMoonDays * 24 * 60 * 60 * 1000));
                
                // Calculate next New Moon
                const nextNewMoonDays = nextFullMoonDays - 14.765; // Half lunar cycle
                const nextNewMoon = nextNewMoonDays > 0 ? 
                    new Date(now.getTime() + (nextNewMoonDays * 24 * 60 * 60 * 1000)) :
                    new Date(now.getTime() + ((nextNewMoonDays + lunarCycle) * 24 * 60 * 60 * 1000));
                
                // Determine current phase
                const cycleProgress = (daysSinceLastFull % lunarCycle) / lunarCycle;
                let currentPhase = 'Waxing Crescent';
                let phaseEmoji = '🌒';
                
                if (cycleProgress < 0.03) currentPhase = 'New Moon', phaseEmoji = '🌑';
                else if (cycleProgress < 0.22) currentPhase = 'Waxing Crescent', phaseEmoji = '🌒';
                else if (cycleProgress < 0.28) currentPhase = 'First Quarter', phaseEmoji = '🌓';
                else if (cycleProgress < 0.47) currentPhase = 'Waxing Gibbous', phaseEmoji = '🌔';
                else if (cycleProgress < 0.53) currentPhase = 'Full Moon', phaseEmoji = '🌕';
                else if (cycleProgress < 0.72) currentPhase = 'Waning Gibbous', phaseEmoji = '🌖';
                else if (cycleProgress < 0.78) currentPhase = 'Last Quarter', phaseEmoji = '🌗';
                else currentPhase = 'Waning Crescent', phaseEmoji = '🌘';
                
                this.lunarData = {
                    fullMoon: nextFullMoon,
                    newMoon: nextNewMoon,
                    currentPhase,
                    phaseEmoji,
                    intensity: this.calculateLunarIntensity(cycleProgress),
                    cycleProgress: Math.round(cycleProgress * 100)
                };
                
            } catch (error) {
                throw new Error('Failed to fetch lunar data');
            }
        }
        
        calculateLunarIntensity(cycleProgress) {
            // Calculate lunar intensity based on phase
            const fullMoonProximity = Math.abs(cycleProgress - 0.5);
            const newMoonProximity = Math.min(cycleProgress, 1 - cycleProgress);
            
            const intensity = Math.max(fullMoonProximity, newMoonProximity);
            
            if (intensity < 0.1) return { level: 'Peak', color: '#ff6b9d' };
            if (intensity < 0.25) return { level: 'Strong', color: '#ffd700' };
            return { level: 'Background', color: '#00f5ff' };
        }
        
        render() {
            const { fullMoon, newMoon, currentPhase, phaseEmoji, intensity, cycleProgress } = this.lunarData;
            
            // Guard against null data
            if (!fullMoon || !newMoon) {
                this.showLoading();
                return;
            }
            
            // Determine which countdown to show (next event)
            const now = new Date();
            const nextFullMoonDiff = fullMoon - now;
            const nextNewMoonDiff = newMoon - now;
            const nextEvent = nextFullMoonDiff < nextNewMoonDiff ? 
                { type: 'Full Moon', date: fullMoon, emoji: '🌕' } :
                { type: 'New Moon', date: newMoon, emoji: '🌑' };
            
            const sizeClass = this.config.size === 'small' ? 'qm-compact' : '';
            
            let html = `
                <div class="qm-lunar-countdown ${sizeClass}">
                    <div class="qm-header">
                        <div class="qm-icon">${phaseEmoji}</div>
                        <div class="qm-title">Lunar Countdown</div>
                        ${this.config.size !== 'small' ? `<div class="qm-subtitle">${currentPhase}</div>` : ''}
                    </div>
                    
                    <div class="qm-main-content">
                        <div class="qm-next-event">
                            <div class="qm-event-title">Next ${nextEvent.type}</div>
                            <div class="qm-countdown" id="countdown-${this.config.containerId}">
                                Calculating...
                            </div>
                            <div class="qm-event-date">${this.formatDate(nextEvent.date)}</div>
                        </div>
                        
                        ${this.config.size !== 'small' ? `
                            <div class="qm-current-state">
                                <div class="qm-intensity-indicator">
                                    <span class="qm-intensity-label">Intensity:</span>
                                    <span class="qm-intensity-value" style="color: ${intensity.color}">${intensity.level}</span>
                                </div>
                                <div class="qm-cycle-progress">
                                    <div class="qm-progress-bar">
                                        <div class="qm-progress-fill" style="width: ${cycleProgress}%"></div>
                                    </div>
                                    <span class="qm-progress-label">${cycleProgress}% Complete</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    ${this.config.interactive ? `
                        <div class="qm-actions">
                            <button class="qm-button" onclick="window.qmShowLunarDetails('${this.config.containerId}')">
                                View Details
                            </button>
                            ${this.config.shareable ? `
                                <button class="qm-button" onclick="window.qmShareLunarWidget('${this.config.containerId}')">
                                    Share
                                </button>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
            
            this.widget.innerHTML = html;
            
            // Start countdown
            this.startCountdown(nextEvent.date);
        }
        
        startCountdown(targetDate) {
            if (this.countdownInterval) {
                clearInterval(this.countdownInterval);
            }
            
            const updateCountdown = () => {
                const now = new Date();
                const diff = targetDate - now;
                
                if (diff <= 0) {
                    // Event has passed, refresh data
                    this.fetchData().then(() => this.render());
                    return;
                }
                
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                const countdownEl = this.shadow.getElementById(`countdown-${this.config.containerId}`);
                if (countdownEl) {
                    if (this.config.size === 'small') {
                        countdownEl.innerHTML = `${days}d ${hours}h`;
                    } else {
                        countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                    }
                }
            };
            
            updateCountdown();
            this.countdownInterval = setInterval(updateCountdown, 1000);
        }
        
        getCustomStyles() {
            const size = this.config.size;
            
            return `
                .qm-lunar-countdown {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                
                .qm-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                
                .qm-main-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                
                .qm-next-event {
                    text-align: center;
                    margin-bottom: ${size === 'small' ? '0' : '20px'};
                }
                
                .qm-event-title {
                    font-size: ${size === 'small' ? '0.9em' : '1.1em'};
                    color: #ffd700;
                    margin-bottom: 10px;
                }
                
                .qm-countdown {
                    font-size: ${size === 'small' ? '1.2em' : '1.6em'};
                    font-weight: 600;
                    margin: 10px 0;
                    font-family: 'Courier New', monospace;
                }
                
                .qm-event-date {
                    font-size: ${size === 'small' ? '0.8em' : '0.9em'};
                    opacity: 0.7;
                }
                
                .qm-current-state {
                    width: 100%;
                    margin-top: 15px;
                }
                
                .qm-intensity-indicator {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    font-size: 0.9em;
                }
                
                .qm-cycle-progress {
                    margin-top: 10px;
                }
                
                .qm-progress-bar {
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                    overflow: hidden;
                    margin-bottom: 5px;
                }
                
                .qm-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ffd700, #ff6b9d, #8a2be2);
                    transition: width 1s ease;
                }
                
                .qm-progress-label {
                    font-size: 0.8em;
                    opacity: 0.6;
                }
                
                .qm-actions {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .qm-compact .qm-header {
                    margin-bottom: 10px;
                }
                
                .qm-compact .qm-title {
                    font-size: 1em;
                    margin-bottom: 5px;
                }
                
                @media (max-width: 350px) {
                    .qm-actions {
                        flex-direction: column;
                        gap: 5px;
                    }
                    .qm-button {
                        font-size: 0.8em;
                        padding: 8px 15px;
                    }
                }
            `;
        }
        
        formatDate(date) {
            if (!date || !(date instanceof Date) || isNaN(date)) {
                return 'Calculating...';
            }
            
            const options = {
                weekday: this.config.size === 'small' ? undefined : 'long',
                month: 'short',
                day: 'numeric',
                year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
            };
            
            return date.toLocaleDateString('en-US', options);
        }
        
        attachEventListeners() {
            // Add any specific event listeners here
        }
        
        destroy() {
            if (this.countdownInterval) {
                clearInterval(this.countdownInterval);
            }
            super.destroy();
        }
    }
    
    // Register the widget
    window.QuantumMerlin.registerWidget('lunar-countdown', LunarCountdownWidget);
    
    // Create global helper functions
    window.qmShowLunarDetails = function(containerId) {
        const widget = document.querySelector(`#${containerId}`).shadowRoot.querySelector('.qm-lunar-countdown');
        // Open modal or navigate to full page
        window.open('https://quantummerlin.com/tools/lunar-intelligence-hub', '_blank');
    };
    
    window.qmShareLunarWidget = function(containerId) {
        const text = 'Check out this amazing lunar countdown widget!';
        const url = window.location.href;
        
        if (navigator.share) {
            navigator.share({ title: 'Lunar Countdown', text, url });
        } else {
            navigator.clipboard.writeText(`${text} ${url}`);
            alert('Widget link copied to clipboard!');
        }
    };
    
})();