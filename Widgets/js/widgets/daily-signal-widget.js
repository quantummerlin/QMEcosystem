/**
 * Quantum Merlin Daily Signal Widget
 * Unified view of lunar, solar, circadian, environmental, geomagnetic, and biorhythmic signals
 * Your unique competitive advantage
 */

(function() {
    'use strict';
    
    class DailySignalWidget extends window.QuantumMerlin.Widget {
        constructor(config) {
            super({
                ...config,
                widgetType: 'daily-signal',
                showData: true,
                interactive: true
            });
            
            this.signals = {
                lunar: { value: 0, label: 'Lunar', icon: '🌙' },
                solar: { value: 0, label: 'Solar', icon: '☀️' },
                circadian: { value: 0, label: 'Circadian', icon: '🌊' },
                environmental: { value: 0, label: 'Environmental', icon: '🌡️' },
                geomagnetic: { value: 0, label: 'Geomagnetic', icon: '🧭' },
                biorhythmic: { value: 0, label: 'Biorhythmic', icon: '💫' }
            };
            
            this.overallScore = 0;
            this.chartInstance = null;
        }
        
        async fetchData() {
            this.showLoading();
            
            try {
                const now = new Date();
                const userLocation = await this.getUserLocation();
                
                // Calculate all signals (simplified for now, replace with real APIs)
                this.signals.lunar = this.calculateLunarSignal(now, userLocation);
                this.signals.solar = this.calculateSolarSignal(now, userLocation);
                this.signals.circadian = this.calculateCircadianSignal(now, userLocation);
                this.signals.environmental = this.calculateEnvironmentalSignal(now, userLocation);
                this.signals.geomagnetic = this.calculateGeomagneticSignal(now);
                this.signals.biorhythmic = this.calculateBiorhythmicSignal(now);
                
                // Calculate overall score
                this.overallScore = this.calculateOverallScore();
                
            } catch (error) {
                throw new Error('Failed to fetch signal data');
            }
        }
        
        async getUserLocation() {
            // In production, use geolocation API or stored preferences
            return {
                latitude: 40.7128, // Default: New York
                longitude: -74.0060,
                timezone: 'America/New_York'
            };
        }
        
        calculateLunarSignal(date, location) {
            // Simplified lunar intensity calculation
            const moonPhase = (date.getDate() / 30) * 100; // Simplified
            const intensity = Math.sin((moonPhase / 100) * Math.PI * 2) * 50 + 50;
            
            return {
                value: Math.round(intensity),
                status: intensity > 75 ? 'Peak' : intensity > 50 ? 'Strong' : 'Background',
                description: this.getLunarDescription(intensity)
            };
        }
        
        calculateSolarSignal(date, location) {
            // Simplified solar activity based on time of day
            const hour = date.getHours();
            let intensity = 0;
            
            if (hour >= 6 && hour <= 18) {
                intensity = Math.sin(((hour - 6) / 12) * Math.PI) * 80 + 20;
            } else {
                intensity = 20; // Low solar activity at night
            }
            
            return {
                value: Math.round(intensity),
                status: intensity > 70 ? 'Peak' : intensity > 40 ? 'Active' : 'Low',
                description: this.getSolarDescription(intensity, hour)
            };
        }
        
        calculateCircadianSignal(date, location) {
            // Personal circadian rhythm calculation
            const hour = date.getHours();
            let intensity = 50; // Baseline
            
            if (hour >= 9 && hour <= 11) intensity = 90; // Peak performance
            else if (hour >= 14 && hour <= 16) intensity = 75; // Afternoon peak
            else if (hour >= 22 || hour <= 6) intensity = 25; // Rest period
            else intensity = 60; // Normal
            
            return {
                value: Math.round(intensity),
                status: intensity > 75 ? 'Optimal' : intensity > 50 ? 'Good' : 'Low',
                description: this.getCircadianDescription(intensity, hour)
            };
        }
        
        calculateEnvironmentalSignal(date, location) {
            // Simulated environmental factors
            const season = date.getMonth(); // 0-11
            const baseIntensity = 50 + Math.sin((season / 12) * Math.PI * 2) * 30;
            
            return {
                value: Math.round(baseIntensity + Math.random() * 20),
                status: 'Moderate',
                description: this.getEnvironmentalDescription(baseIntensity)
            };
        }
        
        calculateGeomagneticSignal(date) {
            // Simulated geomagnetic activity
            const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
            const intensity = Math.abs(Math.sin(dayOfYear / 13.5)) * 80 + 20;
            
            return {
                value: Math.round(intensity),
                status: intensity > 60 ? 'Active' : 'Calm',
                description: this.getGeomagneticDescription(intensity)
            };
        }
        
        calculateBiorhythmicSignal(date) {
            // Simplified biorhythm calculation (using fixed birth date for demo)
            const birthDate = new Date('1990-01-01'); // Would be user's actual birth date
            const daysAlive = Math.floor((date - birthDate) / (1000 * 60 * 60 * 24));
            
            const physical = Math.sin((daysAlive / 23) * Math.PI * 2) * 50 + 50;
            const emotional = Math.sin((daysAlive / 28) * Math.PI * 2) * 50 + 50;
            const intellectual = Math.sin((daysAlive / 33) * Math.PI * 2) * 50 + 50;
            
            const average = (physical + emotional + intellectual) / 3;
            
            return {
                value: Math.round(average),
                status: average > 65 ? 'High' : average > 45 ? 'Balanced' : 'Low',
                description: this.getBiorhythmicDescription(average)
            };
        }
        
        calculateOverallScore() {
            const values = Object.values(this.signals).map(s => s.value);
            const average = values.reduce((a, b) => a + b, 0) / values.length;
            
            return {
                value: Math.round(average),
                level: average > 70 ? 'Peak Performance' : average > 55 ? 'Optimal' : 'Moderate',
                color: average > 70 ? '#00f5ff' : average > 55 ? '#ffd700' : '#ff6b9d',
                recommendation: this.getOverallRecommendation(average)
            };
        }
        
        render() {
            const isCompact = this.config.size === 'small';
            const showChart = this.config.size !== 'small';
            
            let html = `
                <div class="qm-daily-signal ${isCompact ? 'qm-compact' : ''}">
                    <div class="qm-header">
                        <div class="qm-icon">📊</div>
                        <div class="qm-title">Daily Signals</div>
                        ${!isCompact ? '<div class="qm-subtitle">What\'s affecting you today</div>' : ''}
                    </div>
                    
                    <div class="qm-signal-grid">
                        ${Object.entries(this.signals).map(([key, signal]) => `
                            <div class="qm-signal-item" data-signal="${key}">
                                <div class="qm-signal-icon">${signal.icon}</div>
                                <div class="qm-signal-value">${signal.value}%</div>
                                <div class="qm-signal-label">${signal.label}</div>
                                ${!isCompact ? `<div class="qm-signal-status" style="color: this.getSignalColor(signal.value)}">${signal.status}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                    
                    ${!isCompact ? `
                        <div class="qm-overall-score">
                            <div class="qm-score-header">
                                <span>Overall: ${this.overallScore.value}%</span>
                                <span class="qm-score-level" style="color: ${this.overallScore.color}">${this.overallScore.level}</span>
                            </div>
                            <div class="qm-score-bar">
                                <div class="qm-score-fill" style="width: ${this.overallScore.value}%; background: ${this.overallScore.color}"></div>
                            </div>
                            <div class="qm-recommendation">${this.overallScore.recommendation}</div>
                        </div>
                    ` : ''}
                    
                    ${showChart ? `
                        <div class="qm-chart-container">
                            <canvas id="signal-chart-${this.config.containerId}" width="280" height="180"></canvas>
                        </div>
                    ` : ''}
                    
                    ${this.config.interactive ? `
                        <div class="qm-actions">
                            <button class="qm-button" onclick="window.qmShowSignalDetails('${this.config.containerId}')">
                                View Analysis
                            </button>
                            ${!isCompact && this.config.shareable ? `
                                <button class="qm-button" onclick="window.qmShareSignals('${this.config.containerId}')">
                                    Share
                                </button>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
            
            this.widget.innerHTML = html;
            
            if (showChart) {
                this.renderChart();
            }
        }
        
        renderChart() {
            // Simple canvas-based chart (could upgrade to Chart.js for production)
            const canvas = this.shadow.getElementById(`signal-chart-${this.config.containerId}`);
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            // Draw radar chart
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 2 - 20;
            const signals = Object.values(this.signals);
            const angleStep = (Math.PI * 2) / signals.length;
            
            // Draw grid
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            
            for (let i = 1; i <= 5; i++) {
                ctx.beginPath();
                for (let j = 0; j < signals.length; j++) {
                    const angle = j * angleStep - Math.PI / 2;
                    const x = centerX + Math.cos(angle) * (radius * i / 5);
                    const y = centerY + Math.sin(angle) * (radius * i / 5);
                    if (j === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();
            }
            
            // Draw data
            ctx.strokeStyle = '#ffd700';
            ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            signals.forEach((signal, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const value = signal.value / 100;
                const x = centerX + Math.cos(angle) * (radius * value);
                const y = centerY + Math.sin(angle) * (radius * value);
                if (index === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            // Draw labels
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            
            signals.forEach((signal, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const x = centerX + Math.cos(angle) * (radius + 15);
                const y = centerY + Math.sin(angle) * (radius + 15);
                ctx.fillText(signal.icon, x, y);
            });
        }
        
        getCustomStyles() {
            const isCompact = this.config.size === 'small';
            
            return `
                .qm-daily-signal {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                
                .qm-header {
                    text-align: center;
                    margin-bottom: ${isCompact ? '15px' : '20px'};
                }
                
                .qm-signal-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: ${isCompact ? '8px' : '12px'};
                    margin-bottom: ${isCompact ? '15px' : '20px'};
                }
                
                .qm-signal-item {
                    text-align: center;
                    padding: ${isCompact ? '8px' : '12px'} 5px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
                
                .qm-signal-item:hover {
                    background: rgba(255, 215, 0, 0.1);
                    transform: translateY(-2px);
                }
                
                .qm-signal-icon {
                    font-size: ${isCompact ? '1.2em' : '1.5em'};
                    margin-bottom: 4px;
                }
                
                .qm-signal-value {
                    font-size: ${isCompact ? '1em' : '1.2em'};
                    font-weight: 600;
                    color: #ffd700;
                    margin-bottom: 2px;
                }
                
                .qm-signal-label {
                    font-size: ${isCompact ? '0.7em' : '0.8em'};
                    opacity: 0.8;
                    margin-bottom: 2px;
                }
                
                .qm-signal-status {
                    font-size: ${isCompact ? '0.65em' : '0.75em'};
                    font-weight: 500;
                }
                
                .qm-overall-score {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 15px;
                }
                
                .qm-score-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                    font-weight: 600;
                }
                
                .qm-score-bar {
                    width: 100%;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                    overflow: hidden;
                    margin-bottom: 8px;
                }
                
                .qm-score-fill {
                    height: 100%;
                    transition: width 1s ease;
                }
                
                .qm-recommendation {
                    font-size: 0.85em;
                    opacity: 0.8;
                    font-style: italic;
                }
                
                .qm-chart-container {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 15px;
                }
                
                .qm-actions {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: auto;
                    padding-top: 15px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .qm-compact .qm-signal-grid {
                    grid-template-columns: repeat(3, 1fr);
                    gap: 5px;
                }
                
                .qm-compact .qm-signal-item {
                    padding: 5px 2px;
                }
                
                @media (max-width: 400px) {
                    .qm-signal-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .qm-actions {
                        flex-direction: column;
                        gap: 5px;
                    }
                }
            `;
        }
        
        getSignalColor(value) {
            if (value > 70) return '#10b981';
            if (value > 50) return '#fbbf24';
            return '#ef4444';
        }
        
        // Description methods (simplified versions)
        getLunarDescription(intensity) {
            return intensity > 75 ? 'High lunar influence' : intensity > 50 ? 'Moderate lunar activity' : 'Low lunar effect';
        }
        
        getSolarDescription(intensity, hour) {
            if (hour >= 6 && hour <= 18) {
                return intensity > 70 ? 'Peak solar hours' : 'Active solar period';
            }
            return 'Solar rest period';
        }
        
        getCircadianDescription(intensity, hour) {
            if (hour >= 9 && hour <= 11) return 'Peak performance window';
            if (hour >= 22 || hour <= 6) return 'Rest and recovery';
            return 'Normal energy levels';
        }
        
        getEnvironmentalDescription(intensity) {
            return 'Moderate environmental conditions';
        }
        
        getGeomagneticDescription(intensity) {
            return intensity > 60 ? 'Geomagnetic field active' : 'Stable geomagnetic conditions';
        }
        
        getBiorhythmicDescription(average) {
            return average > 65 ? 'Biorhythms aligned' : average > 45 ? 'Biorhythms balanced' : 'Biorhythms low';
        }
        
        getOverallRecommendation(average) {
            if (average > 70) return 'Optimal day for important decisions and creative work';
            if (average > 55) return 'Good day for routine tasks and moderate challenges';
            return 'Focus on self-care and simple activities today';
        }
        
        attachEventListeners() {
            // Add hover effects for signal items
            const signalItems = this.shadow.querySelectorAll('.qm-signal-item');
            signalItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    this.trackAnalytics('signal_hover', { signal: item.dataset.signal });
                });
            });
        }
    }
    
    // Register the widget
    window.QuantumMerlin.registerWidget('daily-signal', DailySignalWidget);
    
    // Global helper functions
    window.qmShowSignalDetails = function(containerId) {
        window.open('https://quantummerlin.com/tools/daily-signal-dashboard', '_blank');
    };
    
    window.qmShareSignals = function(containerId) {
        const text = 'Check out my daily cosmic signals analysis!';
        const url = window.location.href;
        
        if (navigator.share) {
            navigator.share({ title: 'Daily Signals', text, url });
        } else {
            navigator.clipboard.writeText(`${text} ${url}`);
            alert('Signals link copied to clipboard!');
        }
    };
    
})();