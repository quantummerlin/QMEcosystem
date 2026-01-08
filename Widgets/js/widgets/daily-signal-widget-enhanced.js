/**
 * Enhanced Daily Signal Dashboard Widget
 * Real-time integration with weather, geomagnetic, and astronomical APIs
 */

(function() {
    'use strict';
    
    class EnhancedDailySignalWidget extends window.QuantumMerlin.Widget {
        constructor(config) {
            super({
                ...config,
                widgetType: 'daily-signal-enhanced',
                autoRefresh: true,
                refreshInterval: 300000 // Refresh every 5 minutes
            });
            
            this.signals = {};
            this.overallScore = {};
            this.apiBase = config.apiBase || 'https://api.quantummerlin.com';
            this.userLocation = null;
            this.chartInstance = null;
        }
        
        async fetchData() {
            this.showLoading();
            
            try {
                // Get user location
                this.userLocation = await this.getUserLocation();
                
                // Fetch all signal data from API
                const response = await fetch(`${this.apiBase}/api/v1/signals/calculate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.config.apiKey ? `Bearer ${this.config.apiKey}` : undefined
                    },
                    body: JSON.stringify({
                        latitude: this.userLocation.latitude,
                        longitude: this.userLocation.longitude,
                        timezone: this.userLocation.timezone,
                        birthDate: this.config.birthDate || null
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }
                
                const data = await response.json();
                this.signals = data.signals;
                this.overallScore = data.overall;
                
            } catch (error) {
                console.error('Enhanced Daily Signals Error:', error);
                
                // Fallback to simulated data if API fails
                this.signals = this.getFallbackSignalData();
                this.overallScore = this.calculateFallbackOverallScore();
            }
        }
        
        async getUserLocation() {
            // Use geolocation API with enhanced accuracy
            if (navigator.geolocation && this.config.useLocation !== false) {
                try {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(
                            resolve, 
                            reject, 
                            {
                                timeout: 10000,
                                maximumAge: 3600000, // 1 hour cache
                                enableHighAccuracy: true
                            }
                        );
                    });
                    
                    return {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                        accuracy: position.coords.accuracy
                    };
                } catch (error) {
                    console.warn('Geolocation failed, using timezone-based location');
                }
            }
            
            // Enhanced fallback with better timezone detection
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const fallbackLocations = {
                'America/New_York': { latitude: 40.7128, longitude: -74.0060 },
                'America/Los_Angeles': { latitude: 34.0522, longitude: -118.2437 },
                'America/Chicago': { latitude: 41.8781, longitude: -87.6298 },
                'America/Denver': { latitude: 39.7392, longitude: -104.9903 },
                'America/Phoenix': { latitude: 33.4484, longitude: -112.0740 },
                'America/Toronto': { latitude: 43.6532, longitude: -79.3832 },
                'America/Vancouver': { latitude: 49.2827, longitude: -123.1207 },
                'America/Mexico_City': { latitude: 19.4326, longitude: -99.1332 },
                'America/Sao_Paulo': { latitude: -23.5505, longitude: -46.6333 },
                'Europe/London': { latitude: 51.5074, longitude: -0.1278 },
                'Europe/Paris': { latitude: 48.8566, longitude: 2.3522 },
                'Europe/Berlin': { latitude: 52.5200, longitude: 13.4050 },
                'Europe/Rome': { latitude: 41.9028, longitude: 12.4964 },
                'Europe/Madrid': { latitude: 40.4168, longitude: -3.7038 },
                'Europe/Amsterdam': { latitude: 52.3676, longitude: 4.9041 },
                'Europe/Stockholm': { latitude: 59.3293, longitude: 18.0686 },
                'Europe/Moscow': { latitude: 55.7558, longitude: 37.6176 },
                'Asia/Tokyo': { latitude: 35.6762, longitude: 139.6503 },
                'Asia/Shanghai': { latitude: 31.2304, longitude: 121.4737 },
                'Asia/Hong_Kong': { latitude: 22.3193, longitude: 114.1694 },
                'Asia/Singapore': { latitude: 1.3521, longitude: 103.8198 },
                'Asia/Seoul': { latitude: 37.5665, longitude: 126.9780 },
                'Asia/Dubai': { latitude: 25.2048, longitude: 55.2708 },
                'Asia/Kolkata': { latitude: 28.6139, longitude: 77.2090 },
                'Australia/Sydney': { latitude: -33.8688, longitude: 151.2093 },
                'Australia/Melbourne': { latitude: -37.8136, longitude: 144.9631 },
                'Australia/Perth': { latitude: -31.9505, longitude: 115.8605 },
                'Africa/Cairo': { latitude: 30.0444, longitude: 31.2357 },
                'Africa/Johannesburg': { latitude: -26.2041, longitude: 28.0473 },
                'Africa/Lagos': { latitude: 6.5244, longitude: 3.3792 }
            };
            
            return {
                ...fallbackLocations[timezone],
                timezone: timezone || 'UTC',
                accuracy: 'city-level'
            };
        }
        
        getFallbackSignalData() {
            const now = new Date();
            const hour = now.getHours();
            
            return {
                lunar: {
                    value: Math.round(Math.abs(Math.sin((now.getDate() / 30) * Math.PI * 2)) * 100),
                    status: 'Strong',
                    description: 'Lunar influence is moderate today'
                },
                solar: {
                    value: hour >= 6 && hour <= 18 ? 
                           Math.round(Math.sin(((hour - 6) / 12) * Math.PI) * 80 + 20) : 20,
                    status: hour >= 10 && hour <= 14 ? 'Peak' : 'Low',
                    description: 'Solar activity based on time of day'
                },
                circadian: {
                    value: hour >= 9 && hour <= 11 ? 90 :
                           hour >= 22 || hour <= 6 ? 25 : 60,
                    status: hour >= 9 && hour <= 11 ? 'Optimal' : 'Moderate',
                    description: 'Your natural energy rhythm'
                },
                environmental: {
                    value: Math.round(50 + Math.random() * 40),
                    status: 'Moderate',
                    description: 'Weather conditions are favorable',
                    details: { temperature: 22, humidity: 60, condition: 'Clear' }
                },
                geomagnetic: {
                    value: Math.round(Math.random() * 100),
                    status: Math.random() > 0.5 ? 'Active' : 'Calm',
                    description: 'Geomagnetic field is stable',
                    details: { kIndex: 3.5, activity: 'Quiet' }
                },
                biorhythmic: {
                    value: this.config.birthDate ? 
                           Math.round(50 + Math.random() * 40) : 50,
                    status: 'Balanced',
                    description: this.config.birthDate ? 
                           'Personal biorhythms calculated' : 'Set birth date for personal insights',
                    details: this.config.birthDate ? {
                        physical: 65,
                        emotional: 70,
                        intellectual: 55
                    } : null
                }
            };
        }
        
        calculateFallbackOverallScore() {
            const values = Object.values(this.signals).map(s => s.value);
            const average = values.reduce((a, b) => a + b, 0) / values.length;
            
            return {
                value: Math.round(average),
                level: average > 70 ? 'Peak Performance' : average > 55 ? 'Optimal' : 'Moderate',
                color: average > 70 ? '#10b981' : average > 55 ? '#fbbf24' : '#ef4444',
                recommendation: this.getRecommendation(average)
            };
        }
        
        getRecommendation(average) {
            if (average > 70) return 'Excellent day for important decisions and creative work';
            if (average > 55) return 'Good day for routine tasks and moderate challenges';
            return 'Focus on self-care and simple activities today';
        }
        
        render() {
            const isCompact = this.config.size === 'small';
            const showDetails = this.config.size !== 'small';
            const showChart = this.config.size === 'large';
            
            let html = `
                <div class="qm-daily-signal-enhanced ${isCompact ? 'qm-compact' : ''}">
                    <div class="qm-header">
                        <div class="qm-icon">📊</div>
                        <div class="qm-title">Daily Signals</div>
                        <div class="qm-subtitle">What's affecting you today</div>
                        ${this.userLocation ? `
                            <div class="qm-location-badge">
                                📍 ${this.userLocation.accuracy === 'high' ? 'Precise' : 'City-level'} Location
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="qm-signal-grid">
                        ${Object.entries(this.signals).map(([key, signal]) => `
                            <div class="qm-signal-item" data-signal="${key}">
                                <div class="qm-signal-icon">${this.getSignalIcon(key)}</div>
                                <div class="qm-signal-value">${signal.value}%</div>
                                <div class="qm-signal-label">${this.getSignalLabel(key)}</div>
                                ${showDetails ? `
                                    <div class="qm-signal-status" style="color: this.getSignalColor(signal.value)}">
                                        ${signal.status}
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                    
                    ${showDetails ? `
                        <div class="qm-overall-score">
                            <div class="qm-score-header">
                                <span class="qm-score-value">${this.overallScore.value}%</span>
                                <span class="qm-score-level" style="color: ${this.overallScore.color}">
                                    ${this.overallScore.level}
                                </span>
                            </div>
                            <div class="qm-score-bar">
                                <div class="qm-score-fill" style="width: ${this.overallScore.value}%; background: ${this.overallScore.color}"></div>
                            </div>
                            <div class="qm-recommendation">${this.overallScore.recommendation}</div>
                        </div>
                        
                        <div class="qm-signal-details">
                            ${Object.entries(this.signals).map(([key, signal]) => `
                                <div class="qm-detail-card" data-signal="${key}">
                                    <div class="qm-detail-header">
                                        <span class="qm-detail-icon">${this.getSignalIcon(key)}</span>
                                        <span class="qm-detail-title">${this.getSignalLabel(key)}</span>
                                        <span class="qm-detail-value" style="color: ${this.getSignalColor(signal.value)}">
                                            ${signal.value}%
                                        </span>
                                    </div>
                                    <div class="qm-detail-description">${signal.description}</div>
                                    ${signal.details ? this.renderSignalDetails(key, signal.details) : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${showChart ? `
                        <div class="qm-chart-container">
                            <canvas id="signal-chart-${this.config.containerId}" width="280" height="180"></canvas>
                        </div>
                    ` : ''}
                    
                    ${this.config.interactive ? `
                        <div class="qm-actions">
                            <button class="qm-button qm-primary" onclick="window.qmShowSignalAnalysis('${this.config.containerId}')">
                                ${isCompact ? 'Analysis' : 'Full Analysis'}
                            </button>
                            ${!isCompact && this.config.shareable ? `
                                <button class="qm-button qm-secondary" onclick="window.qmShareSignals('${this.config.containerId}')">
                                    Share
                                </button>
                            ` : ''}
                            ${!this.config.birthDate ? `
                                <button class="qm-button qm-tertiary" onclick="window.qmSetBirthData('${this.config.containerId}')">
                                    Personalize
                                </button>
                            ` : ''}
                        </div>
                    ` : ''}
                    
                    ${this.config.branding && this.config.apiKey === 'free' ? this.addBranding() : ''}
                </div>
            `;
            
            this.widget.innerHTML = html;
            
            if (showChart) {
                this.renderChart();
            }
            
            // Track widget view with enhanced analytics
            this.trackAnalytics('view', {
                overallScore: this.overallScore.value,
                location: this.userLocation?.timezone,
                hasPersonalData: !!this.config.birthDate,
                signals: Object.keys(this.signals)
            });
        }
        
        getSignalIcon(key) {
            const icons = {
                lunar: '🌙',
                solar: '☀️',
                circadian: '🌊',
                environmental: '🌡️',
                geomagnetic: '🧭',
                biorhythmic: '💫'
            };
            return icons[key] || '📊';
        }
        
        getSignalLabel(key) {
            const labels = {
                lunar: 'Lunar',
                solar: 'Solar',
                circadian: 'Circadian',
                environmental: 'Environmental',
                geomagnetic: 'Geomagnetic',
                biorhythmic: 'Biorhythmic'
            };
            return labels[key] || key;
        }
        
        getSignalColor(value) {
            if (value > 70) return '#10b981';
            if (value > 50) return '#fbbf24';
            return '#ef4444';
        }
        
        renderSignalDetails(key, details) {
            if (key === 'environmental') {
                return `
                    <div class="qm-detail-extra">
                        <div class="qm-detail-stat">
                            <span class="qm-stat-label">Temperature:</span>
                            <span class="qm-stat-value">${details.temperature}°C</span>
                        </div>
                        <div class="qm-detail-stat">
                            <span class="qm-stat-label">Humidity:</span>
                            <span class="qm-stat-value">${details.humidity}%</span>
                        </div>
                        <div class="qm-detail-stat">
                            <span class="qm-stat-label">Condition:</span>
                            <span class="qm-stat-value">${details.condition}</span>
                        </div>
                    </div>
                `;
            }
            
            if (key === 'geomagnetic') {
                return `
                    <div class="qm-detail-extra">
                        <div class="qm-detail-stat">
                            <span class="qm-stat-label">K-Index:</span>
                            <span class="qm-stat-value">${details.kIndex}</span>
                        </div>
                        <div class="qm-detail-stat">
                            <span class="qm-stat-label">Activity:</span>
                            <span class="qm-stat-value">${details.activity}</span>
                        </div>
                    </div>
                `;
            }
            
            if (key === 'biorhythmic' && details) {
                return `
                    <div class="qm-detail-extra">
                        <div class="qm-detail-stat">
                            <span class="qm-stat-label">Physical:</span>
                            <span class="qm-stat-value">${Math.round(details.physical)}%</span>
                        </div>
                        <div class="qm-detail-stat">
                            <span class="qm-stat-label">Emotional:</span>
                            <span class="qm-stat-value">${Math.round(details.emotional)}%</span>
                        </div>
                        <div class="qm-detail-stat">
                            <span class="qm-stat-label">Intellectual:</span>
                            <span class="qm-stat-value">${Math.round(details.intellectual)}%</span>
                        </div>
                    </div>
                `;
            }
            
            return '';
        }
        
        renderChart() {
            // Enhanced radar chart with real data
            const canvas = this.shadow.getElementById(`signal-chart-${this.config.containerId}`);
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            // Setup
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 2 - 30;
            const signalValues = Object.values(this.signals).map(s => s.value / 100);
            const signalLabels = Object.keys(this.signals).map(key => this.getSignalIcon(key));
            const angleStep = (Math.PI * 2) / signalValues.length;
            
            // Draw grid circles
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            
            for (let i = 1; i <= 5; i++) {
                ctx.beginPath();
                for (let j = 0; j < signalValues.length; j++) {
                    const angle = j * angleStep - Math.PI / 2;
                    const x = centerX + Math.cos(angle) * (radius * i / 5);
                    const y = centerY + Math.sin(angle) * (radius * i / 5);
                    if (j === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();
            }
            
            // Draw axes
            for (let i = 0; i < signalValues.length; i++) {
                const angle = i * angleStep - Math.PI / 2;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(
                    centerX + Math.cos(angle) * radius,
                    centerY + Math.sin(angle) * radius
                );
                ctx.stroke();
            }
            
            // Draw data polygon
            ctx.fillStyle = 'rgba(251, 191, 36, 0.3)';
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            signalValues.forEach((value, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const x = centerX + Math.cos(angle) * (radius * value);
                const y = centerY + Math.sin(angle) * (radius * value);
                if (index === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            // Draw data points
            ctx.fillStyle = '#fbbf24';
            signalValues.forEach((value, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const x = centerX + Math.cos(angle) * (radius * value);
                const y = centerY + Math.sin(angle) * (radius * value);
                
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Draw labels
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            signalLabels.forEach((label, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const x = centerX + Math.cos(angle) * (radius + 20);
                const y = centerY + Math.sin(angle) * (radius + 20);
                ctx.fillText(label, x, y);
            });
            
            // Draw percentage labels on grid
            ctx.font = '10px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            for (let i = 1; i <= 5; i++) {
                const value = i * 20;
                const x = centerX - radius - 15;
                const y = centerY + 10 - (radius * i / 5);
                ctx.fillText(`${value}%`, x, y);
            }
        }
        
        getCustomStyles() {
            const isCompact = this.config.size === 'small';
            
            return `
                .qm-daily-signal-enhanced {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
                }
                
                .qm-header {
                    text-align: center;
                    margin-bottom: ${isCompact ? '15px' : '20px'};
                    position: relative;
                }
                
                .qm-location-badge {
                    position: absolute;
                    top: 0;
                    right: 0;
                    background: rgba(16, 185, 129, 0.2);
                    color: #10b981;
                    padding: 2px 6px;
                    border-radius: 8px;
                    font-size: 0.65em;
                    font-weight: 500;
                }
                
                .qm-signal-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: ${isCompact ? '8px' : '12px'};
                    margin-bottom: ${isCompact ? '15px' : '20px'};
                }
                
                .qm-signal-item {
                    text-align: center;
                    padding: ${isCompact ? '10px 5px' : '15px 10px'};
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                
                .qm-signal-item:hover {
                    background: rgba(251, 191, 36, 0.1);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.2);
                }
                
                .qm-signal-icon {
                    font-size: ${isCompact ? '1.3em' : '1.5em'};
                    margin-bottom: 4px;
                }
                
                .qm-signal-value {
                    font-size: ${isCompact ? '1em' : '1.3em'};
                    font-weight: 600;
                    color: #fbbf24;
                    margin-bottom: 2px;
                }
                
                .qm-signal-label {
                    font-size: ${isCompact ? '0.7em' : '0.8em'};
                    opacity: 0.8;
                }
                
                .qm-signal-status {
                    font-size: ${isCompact ? '0.6em' : '0.7em'};
                    font-weight: 500;
                    margin-top: 2px;
                }
                
                .qm-overall-score {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 20px;
                    text-align: center;
                }
                
                .qm-score-header {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 10px;
                }
                
                .qm-score-value {
                    font-size: 2em;
                    font-weight: 600;
                    color: #e2e8f0;
                }
                
                .qm-score-level {
                    font-size: 1em;
                    font-weight: 600;
                }
                
                .qm-score-bar {
                    width: 100%;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 10px;
                }
                
                .qm-score-fill {
                    height: 100%;
                    transition: width 1s ease;
                }
                
                .qm-recommendation {
                    font-size: 0.9em;
                    opacity: 0.9;
                    font-style: italic;
                }
                
                .qm-signal-details {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                    margin-bottom: 20px;
                }
                
                .qm-detail-card {
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 8px;
                    padding: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                .qm-detail-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 8px;
                }
                
                .qm-detail-icon {
                    font-size: 1.2em;
                }
                
                .qm-detail-title {
                    font-weight: 600;
                    color: #e2e8f0;
                    flex: 1;
                }
                
                .qm-detail-value {
                    font-weight: 600;
                    font-size: 1.1em;
                }
                
                .qm-detail-description {
                    font-size: 0.8em;
                    opacity: 0.8;
                    margin-bottom: 8px;
                }
                
                .qm-detail-extra {
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding-top: 8px;
                }
                
                .qm-detail-stat {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 4px;
                    font-size: 0.75em;
                }
                
                .qm-stat-label {
                    opacity: 0.7;
                }
                
                .qm-stat-value {
                    color: #fbbf24;
                    font-weight: 500;
                }
                
                .qm-chart-container {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 20px;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 8px;
                    padding: 10px;
                }
                
                .qm-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    justify-content: center;
                    margin-top: auto;
                    padding-top: 15px;
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
                
                @media (max-width: 500px) {
                    .qm-signal-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .qm-signal-details {
                        grid-template-columns: 1fr;
                    }
                    
                    .qm-actions {
                        flex-direction: column;
                        gap: 5px;
                    }
                }
                
                @media (max-width: 400px) {
                    .qm-signal-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .qm-score-header {
                        flex-direction: column;
                        gap: 5px;
                    }
                }
            `;
        }
        
        attachEventListeners() {
            // Enhanced interaction tracking
            const signalItems = this.shadow.querySelectorAll('.qm-signal-item');
            signalItems.forEach(item => {
                item.addEventListener('click', () => {
                    const signalType = item.dataset.signal;
                    this.trackAnalytics('signal_detail_clicked', { signalType });
                    
                    // Highlight clicked signal
                    signalItems.forEach(i => i.classList.remove('qm-selected'));
                    item.classList.add('qm-selected');
                });
            });
        }
    }
    
    // Register the enhanced widget
    window.QuantumMerlin.registerWidget('daily-signal-enhanced', EnhancedDailySignalWidget);
    
    // Global helper functions
    window.qmShowSignalAnalysis = function(containerId) {
        window.open('https://quantummerlin.com/tools/daily-signal-dashboard', '_blank');
    };
    
    window.qmShareSignals = function(containerId) {
        const container = document.getElementById(containerId);
        const widgetInstance = container._widgetInstance;
        
        if (widgetInstance && widgetInstance.overallScore) {
            const text = `📊 Today's cosmic score: ${widgetInstance.overallScore.value}% - ${widgetInstance.overallScore.level}`;
            const url = window.location.href;
            
            if (navigator.share) {
                navigator.share({ title: 'My Daily Signals', text, url });
            } else {
                navigator.clipboard.writeText(`${text} ${url}`);
                alert('Daily signals copied to clipboard!');
            }
        }
    };
    
    window.qmSetBirthData = function(containerId) {
        // Open birth data modal for personalization
        window.open('https://quantummerlin.com/widgets/personalize/birth-data', '_blank');
    };
    
})();