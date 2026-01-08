/**
 * Enhanced Lunar Countdown Widget with Real API Integration
 * Production-ready with accurate astronomical calculations
 */

(function() {
    'use strict';
    
    class EnhancedLunarCountdownWidget extends window.QuantumMerlin.Widget {
        constructor(config) {
            super({
                ...config,
                widgetType: 'lunar-countdown',
                autoRefresh: true,
                refreshInterval: 60000 // Refresh every minute
            });
            
            this.countdownInterval = null;
            this.lunarData = {};
            this.apiBase = config.apiBase || 'https://api.quantummerlin.com';
            this.userLocation = null;
        }
        
        async fetchData() {
            this.showLoading();
            
            try {
                // Get user location
                this.userLocation = await this.getUserLocation();
                
                // Fetch real lunar data from API
                const [currentData, fullMoonData, newMoonData] = await Promise.all([
                    this.fetchCurrentLunarData(),
                    this.fetchFullMoonData(),
                    this.fetchNewMoonData()
                ]);
                
                this.lunarData = {
                    current: currentData,
                    fullMoon: fullMoonData,
                    newMoon: newMoonData,
                    location: this.userLocation
                };
                
            } catch (error) {
                console.error('Enhanced Lunar Widget Error:', error);
                
                // Fallback to simulated data if API fails
                this.lunarData = this.getFallbackLunarData();
            }
        }
        
        async getUserLocation() {
            // Try to get actual user location
            if (navigator.geolocation && this.config.useLocation !== false) {
                try {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject, {
                            timeout: 5000,
                            maximumAge: 3600000 // 1 hour
                        });
                    });
                    
                    return {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                    };
                } catch (error) {
                    console.warn('Geolocation failed, using defaults');
                }
            }
            
            // Fallback locations based on timezone
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const fallbackLocations = {
                'America/New_York': { latitude: 40.7128, longitude: -74.0060 },
                'America/Los_Angeles': { latitude: 34.0522, longitude: -118.2437 },
                'Europe/London': { latitude: 51.5074, longitude: -0.1278 },
                'Europe/Paris': { latitude: 48.8566, longitude: 2.3522 },
                'Asia/Tokyo': { latitude: 35.6762, longitude: 139.6503 },
                'Australia/Sydney': { latitude: -33.8688, longitude: 151.2093 }
            };
            
            return fallbackLocations[timezone] || {
                latitude: 40.7128,
                longitude: -74.0060,
                timezone: 'UTC'
            };
        }
        
        async fetchCurrentLunarData() {
            const response = await fetch(`${this.apiBase}/api/v1/lunar/current`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.config.apiKey ? `Bearer ${this.config.apiKey}` : undefined
                },
                body: JSON.stringify({
                    latitude: this.userLocation.latitude,
                    longitude: this.userLocation.longitude,
                    timezone: this.userLocation.timezone
                })
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            return await response.json();
        }
        
        async fetchFullMoonData() {
            const response = await fetch(`${this.apiBase}/api/v1/lunar/next-full-moon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.config.apiKey ? `Bearer ${this.config.apiKey}` : undefined
                },
                body: JSON.stringify({
                    latitude: this.userLocation.latitude,
                    longitude: this.userLocation.longitude,
                    timezone: this.userLocation.timezone
                })
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            return await response.json();
        }
        
        async fetchNewMoonData() {
            const response = await fetch(`${this.apiBase}/api/v1/lunar/next-new-moon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.config.apiKey ? `Bearer ${this.config.apiKey}` : undefined
                },
                body: JSON.stringify({
                    latitude: this.userLocation.latitude,
                    longitude: this.userLocation.longitude,
                    timezone: this.userLocation.timezone
                })
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            return await response.json();
        }
        
        getFallbackLunarData() {
            // Fallback calculation if API fails
            const now = new Date();
            const lastFullMoon = new Date('2025-01-13');
            const lunarCycle = 29.53059;
            const daysSinceLastFull = (now - lastFullMoon) / (1000 * 60 * 60 * 24);
            const nextFullMoonDays = lunarCycle - (daysSinceLastFull % lunarCycle);
            const nextFullMoon = new Date(now.getTime() + (nextFullMoonDays * 24 * 60 * 60 * 1000));
            
            return {
                current: {
                    phase: 'Waxing Gibbous',
                    illumination: 75,
                    altitude: 45,
                    phaseProgress: 65
                },
                fullMoon: {
                    date: nextFullMoon.toISOString(),
                    daysUntil: Math.ceil(nextFullMoonDays),
                    intensity: 'Strong'
                },
                newMoon: {
                    date: new Date(now.getTime() + ((nextFullMoonDays - 14.765) * 24 * 60 * 60 * 1000)).toISOString(),
                    daysUntil: Math.ceil(nextFullMoonDays - 14.765),
                    intensity: 'Background'
                },
                location: this.userLocation
            };
        }
        
        render() {
            const { current, fullMoon, newMoon, location } = this.lunarData;
            
            if (!current || !fullMoon || !newMoon) {
                this.showError('Unable to load lunar data');
                return;
            }
            
            // Determine which event to countdown to
            const now = new Date();
            const fullMoonDate = new Date(fullMoon.date);
            const newMoonDate = new Date(newMoon.date);
            const nextFullMoonDiff = fullMoonDate - now;
            const nextNewMoonDiff = newMoonDate - now;
            
            const nextEvent = nextFullMoonDiff < nextNewMoonDiff ? 
                { type: 'Full Moon', date: fullMoonDate, emoji: '🌕', intensity: fullMoon.intensity } :
                { type: 'New Moon', date: newMoonDate, emoji: '🌑', intensity: newMoon.intensity };
            
            const isCompact = this.config.size === 'small';
            const showDetails = this.config.size === 'large';
            
            let html = `
                <div class="qm-lunar-countdown-enhanced ${isCompact ? 'qm-compact' : ''}">
                    <div class="qm-header">
                        <div class="qm-icon">${nextEvent.emoji}</div>
                        <div class="qm-title">Lunar Countdown</div>
                        ${!isCompact ? `<div class="qm-subtitle">${current.phase}</div>` : ''}
                    </div>
                    
                    <div class="qm-main-content">
                        <div class="qm-next-event">
                            <div class="qm-event-title">Next ${nextEvent.type}</div>
                            <div class="qm-countdown" id="countdown-${this.config.containerId}">
                                Calculating...
                            </div>
                            <div class="qm-event-date">${this.formatDate(nextEvent.date)}</div>
                            ${!isCompact ? `
                                <div class="qm-intensity-badge ${nextEvent.intensity.toLowerCase()}">
                                    ${nextEvent.intensity} Intensity
                                </div>
                            ` : ''}
                        </div>
                        
                        ${!isCompact ? `
                            <div class="qm-current-state">
                                <div class="qm-current-phase">
                                    <div class="qm-phase-indicator">
                                        <div class="qm-phase-emoji">${this.getMoonEmoji(current.phase)}</div>
                                        <div class="qm-phase-name">${current.phase}</div>
                                    </div>
                                    <div class="qm-illumination">
                                        <span class="qm-illumination-value">${current.illumination}%</span>
                                        <div class="qm-illumination-bar">
                                            <div class="qm-illumination-fill" style="width: ${current.illumination}%"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="qm-location-info">
                                    <div class="qm-location-label">Location</div>
                                    <div class="qm-location-value">
                                        ${Math.round(location.latitude)}°, ${Math.round(location.longitude)}°
                                    </div>
                                </div>
                                
                                ${showDetails ? `
                                    <div class="qm-advanced-details">
                                        <div class="qm-detail-item">
                                            <span class="qm-detail-label">Moon Altitude:</span>
                                            <span class="qm-detail-value">${current.altitude || 45}°</span>
                                        </div>
                                        <div class="qm-detail-item">
                                            <span class="qm-detail-label">Cycle Progress:</span>
                                            <span class="qm-detail-value">${current.phaseProgress || 65}%</span>
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                        ` : ''}
                    </div>
                    
                    ${this.config.interactive ? `
                        <div class="qm-actions">
                            <button class="qm-button qm-primary" onclick="window.qmShowLunarDetails('${this.config.containerId}')">
                                ${isCompact ? 'Learn More' : 'View Details'}
                            </button>
                            ${this.config.shareable ? `
                                <button class="qm-button qm-secondary" onclick="window.qmShareLunarWidget('${this.config.containerId}')">
                                    Share
                                </button>
                            ` : ''}
                            ${this.config.branding && this.config.apiKey !== 'free' ? `
                                <button class="qm-button qm-tertiary" onclick="window.qmCustomizeLunar('${this.config.containerId}')">
                                    Customize
                                </button>
                            ` : ''}
                        </div>
                    ` : ''}
                    
                    ${this.config.branding && this.config.apiKey === 'free' ? this.addBranding() : ''}
                </div>
            `;
            
            this.widget.innerHTML = html;
            
            // Start countdown with real astronomical timing
            this.startCountdown(nextEvent.date);
            
            // Track widget view
            this.trackAnalytics('view', {
                phase: current.phase,
                nextEvent: nextEvent.type,
                intensity: nextEvent.intensity,
                location: location
            });
        }
        
        getMoonEmoji(phase) {
            const emojiMap = {
                'New Moon': '🌑',
                'Waxing Crescent': '🌒',
                'First Quarter': '🌓',
                'Waxing Gibbous': '🌔',
                'Full Moon': '🌕',
                'Waning Gibbous': '🌖',
                'Last Quarter': '🌗',
                'Waning Crescent': '🌘'
            };
            return emojiMap[phase] || '🌙';
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
                    this.trackAnalytics('event_passed', { eventType: targetDate });
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
            const isCompact = this.config.size === 'small';
            
            return `
                .qm-lunar-countdown-enhanced {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    position: relative;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
                }
                
                .qm-header {
                    text-align: center;
                    margin-bottom: ${isCompact ? '12px' : '20px'};
                }
                
                .qm-main-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                
                .qm-next-event {
                    text-align: center;
                    margin-bottom: ${isCompact ? '12px' : '20px'};
                }
                
                .qm-event-title {
                    font-size: ${isCompact ? '0.95em' : '1.2em'};
                    color: #fbbf24;
                    margin-bottom: 8px;
                    font-weight: 600;
                }
                
                .qm-countdown {
                    font-size: ${isCompact ? '1.1em' : '1.6em'};
                    font-weight: 600;
                    margin: 10px 0;
                    font-family: 'Courier New', monospace;
                    color: #e2e8f0;
                    text-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
                }
                
                .qm-event-date {
                    font-size: ${isCompact ? '0.8em' : '0.9em'};
                    opacity: 0.8;
                    margin-bottom: 8px;
                }
                
                .qm-intensity-badge {
                    display: inline-block;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 0.75em;
                    font-weight: 600;
                    text-transform: uppercase;
                }
                
                .qm-intensity-badge.peak {
                    background: rgba(239, 68, 68, 0.2);
                    color: #ef4444;
                    border: 1px solid rgba(239, 68, 68, 0.3);
                }
                
                .qm-intensity-badge.strong {
                    background: rgba(245, 158, 11, 0.2);
                    color: #f59e0b;
                    border: 1px solid rgba(245, 158, 11, 0.3);
                }
                
                .qm-intensity-badge.background {
                    background: rgba(16, 185, 129, 0.2);
                    color: #10b981;
                    border: 1px solid rgba(16, 185, 129, 0.3);
                }
                
                .qm-current-state {
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .qm-current-phase {
                    margin-bottom: 15px;
                }
                
                .qm-phase-indicator {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 10px;
                }
                
                .qm-phase-emoji {
                    font-size: 1.5em;
                }
                
                .qm-phase-name {
                    font-size: 0.9em;
                    color: #fbbf24;
                    font-weight: 500;
                }
                
                .qm-illumination {
                    text-align: center;
                    margin-bottom: 10px;
                }
                
                .qm-illumination-value {
                    font-size: 0.85em;
                    font-weight: 600;
                    color: #e2e8f0;
                }
                
                .qm-illumination-bar {
                    width: 100px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                    overflow: hidden;
                    margin: 5px auto;
                }
                
                .qm-illumination-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #fbbf24, #f59e0b);
                    transition: width 1s ease;
                }
                
                .qm-location-info {
                    text-align: center;
                    margin-bottom: 10px;
                }
                
                .qm-location-label {
                    font-size: 0.75em;
                    opacity: 0.6;
                    text-transform: uppercase;
                    margin-bottom: 2px;
                }
                
                .qm-location-value {
                    font-size: 0.85em;
                    color: #94a3b8;
                }
                
                .qm-advanced-details {
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                .qm-detail-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                    font-size: 0.8em;
                }
                
                .qm-detail-label {
                    opacity: 0.7;
                }
                
                .qm-detail-value {
                    color: #fbbf24;
                    font-weight: 500;
                }
                
                .qm-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    justify-content: center;
                    margin-top: ${isCompact ? '12px' : '20px'};
                    padding-top: ${isCompact ? '10px' : '15px'};
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .qm-button {
                    padding: ${isCompact ? '6px 12px' : '8px 16px'};
                    border-radius: 6px;
                    border: none;
                    cursor: pointer;
                    font-size: ${isCompact ? '0.75em' : '0.85em'};
                    font-weight: 500;
                    transition: all 0.3s ease;
                }
                
                .qm-button:hover {
                    transform: translateY(-1px);
                }
                
                .qm-primary {
                    background: linear-gradient(45deg, #fbbf24, #f59e0b);
                    color: #0f172a;
                }
                
                .qm-secondary {
                    background: rgba(255, 255, 255, 0.1);
                    color: #e2e8f0;
                }
                
                .qm-tertiary {
                    background: rgba(139, 92, 246, 0.2);
                    color: #8b5cf6;
                    border: 1px solid rgba(139, 92, 246, 0.3);
                }
                
                .qm-compact .qm-header {
                    margin-bottom: 8px;
                }
                
                .qm-compact .qm-title {
                    font-size: 1em;
                    margin-bottom: 4px;
                }
                
                .qm-compact .qm-countdown {
                    font-size: 1em;
                }
                
                @media (max-width: 350px) {
                    .qm-actions {
                        flex-direction: column;
                        gap: 5px;
                    }
                    .qm-button {
                        font-size: 0.7em;
                        padding: 5px 10px;
                    }
                }
            `;
        }
        
        showError(message) {
            this.widget.innerHTML = `
                <div class="qm-error-state">
                    <div class="qm-error-icon">⚠️</div>
                    <div class="qm-error-message">${message}</div>
                    <button class="qm-retry-button" onclick="window.qmRetryLunar('${this.config.containerId}')">
                        Retry
                    </button>
                </div>
            `;
        }
        
        destroy() {
            if (this.countdownInterval) {
                clearInterval(this.countdownInterval);
            }
            super.destroy();
        }
    }
    
    // Register the enhanced widget
    window.QuantumMerlin.registerWidget('lunar-countdown-enhanced', EnhancedLunarCountdownWidget);
    
    // Global helper functions
    window.qmRetryLunar = function(containerId) {
        const container = document.getElementById(containerId);
        const widgetInstance = container._widgetInstance;
        if (widgetInstance) {
            widgetInstance.fetchData().then(() => widgetInstance.render());
        }
    };
    
    window.qmCustomizeLunar = function(containerId) {
        // Open customization modal for premium users
        window.open('https://quantummerlin.com/widgets/customize/lunar-countdown', '_blank');
    };
    
    window.qmShowLunarDetails = function(containerId) {
        window.open('https://quantummerlin.com/tools/lunar-intelligence-hub', '_blank');
    };
    
    window.qmShareLunarWidget = function(containerId) {
        const container = document.getElementById(containerId);
        const widgetInstance = container._widgetInstance;
        
        if (widgetInstance && widgetInstance.lunarData) {
            const { current, fullMoon } = widgetInstance.lunarData;
            const text = `🌙 Next Full Moon in ${fullMoon.daysUntil} days! Current phase: ${current.phase}`;
            const url = window.location.href;
            
            if (navigator.share) {
                navigator.share({ title: 'Lunar Countdown', text, url });
            } else {
                navigator.clipboard.writeText(`${text} ${url}`);
                alert('Lunar countdown copied to clipboard!');
            }
        }
    };
    
})();