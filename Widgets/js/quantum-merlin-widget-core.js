/**
 * Quantum Merlin Widget Core System
 * Universal widget framework for all Quantum Merlin tools
 * (c) 2025 Quantum Merlin - All Rights Reserved
 */

(function() {
    'use strict';
    
    // Core widget class that all widgets extend
    class QuantumMerlinWidget {
        constructor(config) {
            this.config = this.mergeConfig(config);
            this.container = null;
            this.shadow = null;
            this.widget = null;
            this.data = {};
            this.analytics = {
                views: 0,
                interactions: 0,
                shares: 0
            };
            
            this.init();
        }
        
        mergeConfig(config) {
            const defaults = {
                containerId: null,
                widgetType: 'unknown',
                theme: 'dark',
                size: 'medium',
                apiKey: 'free',
                branding: true,
                language: 'en',
                timezone: 'auto',
                autoRefresh: false,
                refreshInterval: 60000,
                customColors: {},
                showData: true,
                interactive: true,
                shareable: true,
                analytics: true
            };
            
            return { ...defaults, ...config };
        }
        
        async init() {
            try {
                this.createContainer();
                this.loadStyles();
                await this.fetchData();
                this.render();
                this.attachEventListeners();
                this.startAutoRefresh();
                this.trackAnalytics('view');
            } catch (error) {
                this.handleError(error);
            }
        }
        
        createContainer() {
            const containerEl = document.getElementById(this.config.containerId);
            if (!containerEl) {
                throw new Error(`Container #${this.config.containerId} not found`);
            }
            
            this.container = containerEl;
            
            // Create shadow DOM for style isolation
            this.shadow = this.container.attachShadow({ mode: 'open' });
            
            // Create main widget container
            this.widget = document.createElement('div');
            this.widget.className = `qm-widget qm-${this.config.widgetType} qm-size-${this.config.size} qm-theme-${this.config.theme}`;
            this.shadow.appendChild(this.widget);
        }
        
        loadStyles() {
            const style = document.createElement('style');
            style.textContent = this.getCoreStyles() + (this.getCustomStyles ? this.getCustomStyles() : '');
            this.shadow.appendChild(style);
        }
        
        getCoreStyles() {
            const theme = this.getThemeColors();
            const size = this.getSizeStyles();
            
            return `
                /* Core Widget Styles */
                .qm-widget {
                    font-family: 'Cormorant Garamond', serif;
                    background: ${theme.background};
                    color: ${theme.text};
                    border: ${theme.border};
                    border-radius: 12px;
                    box-shadow: ${theme.shadow};
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                
                .qm-widget:hover {
                    transform: translateY(-2px);
                    box-shadow: ${theme.shadowHover};
                }
                
                ${size}
                
                /* Typography */
                .qm-title {
                    font-family: 'Cinzel', serif;
                    font-size: 1.3em;
                    font-weight: 600;
                    color: ${theme.accent};
                    margin-bottom: 15px;
                    text-align: center;
                }
                
                .qm-subtitle {
                    font-size: 1em;
                    opacity: 0.8;
                    margin-bottom: 10px;
                    text-align: center;
                }
                
                /* Common Elements */
                .qm-icon {
                    font-size: 2.5em;
                    margin-bottom: 10px;
                    text-align: center;
                }
                
                .qm-value {
                    font-size: 1.8em;
                    font-weight: 600;
                    color: ${theme.accent};
                    text-align: center;
                    margin: 10px 0;
                }
                
                .qm-label {
                    font-size: 0.9em;
                    opacity: 0.7;
                    text-align: center;
                }
                
                /* Buttons */
                .qm-button {
                    background: ${theme.button};
                    color: ${theme.buttonText};
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.9em;
                    transition: all 0.3s ease;
                    margin: 5px;
                }
                
                .qm-button:hover {
                    background: ${theme.buttonHover};
                    transform: translateY(-1px);
                }
                
                /* Branding */
                .qm-branding {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 0.75em;
                    opacity: 0.5;
                }
                
                .qm-branding a {
                    color: inherit;
                    text-decoration: none;
                }
                
                .qm-branding a:hover {
                    opacity: 0.8;
                }
                
                /* Loading State */
                .qm-loading {
                    text-align: center;
                    padding: 40px;
                }
                
                .qm-spinner {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255, 215, 0, 0.3);
                    border-top-color: #ffd700;
                    border-radius: 50%;
                    animation: qm-spin 1s linear infinite;
                }
                
                @keyframes qm-spin {
                    to { transform: rotate(360deg); }
                }
                
                /* Error State */
                .qm-error {
                    text-align: center;
                    padding: 20px;
                    color: #ef4444;
                    font-size: 0.9em;
                }
                
                /* Responsive */
                @media (max-width: 400px) {
                    .qm-widget {
                        padding: 15px !important;
                    }
                    .qm-title {
                        font-size: 1.1em;
                    }
                    .qm-value {
                        font-size: 1.4em;
                    }
                }
            `;
        }
        
        getThemeColors() {
            const themes = {
                dark: {
                    background: 'linear-gradient(135deg, rgba(10, 0, 21, 0.98) 0%, rgba(45, 27, 78, 0.95) 100%)',
                    text: '#f0e6ff',
                    border: '2px solid rgba(218, 165, 32, 0.3)',
                    shadow: '0 10px 30px rgba(138, 43, 226, 0.2)',
                    shadowHover: '0 15px 40px rgba(218, 165, 32, 0.3)',
                    accent: '#ffd700',
                    button: 'linear-gradient(135deg, #8a2be2, #ff6b9d)',
                    buttonText: '#ffffff',
                    buttonHover: 'linear-gradient(135deg, #7a1bd2, #ef5b8d)'
                },
                light: {
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0e6ff 100%)',
                    text: '#2d1b4e',
                    border: '2px solid rgba(218, 165, 32, 0.3)',
                    shadow: '0 4px 20px rgba(138, 43, 226, 0.15)',
                    shadowHover: '0 8px 30px rgba(218, 165, 32, 0.25)',
                    accent: '#daa520',
                    button: 'linear-gradient(135deg, #8a2be2, #ff6b9d)',
                    buttonText: '#ffffff',
                    buttonHover: 'linear-gradient(135deg, #7a1bd2, #ef5b8d)'
                },
                minimal: {
                    background: 'rgba(10, 0, 21, 0.6)',
                    text: '#f0e6ff',
                    border: '1px solid rgba(218, 165, 32, 0.2)',
                    shadow: 'none',
                    shadowHover: '0 4px 20px rgba(218, 165, 32, 0.2)',
                    accent: '#ffd700',
                    button: 'linear-gradient(135deg, #daa520, #ffd700)',
                    buttonText: '#0a0015',
                    buttonHover: 'linear-gradient(135deg, #ffd700, #ffed4e)'
                }
            };
            
            const selectedTheme = themes[this.config.theme] || themes.dark;
            
            // Override with custom colors if provided
            if (this.config.customColors && Object.keys(this.config.customColors).length > 0) {
                return { ...selectedTheme, ...this.config.customColors };
            }
            
            return selectedTheme;
        }
        
        getSizeStyles() {
            const sizes = {
                small: `
                    .qm-widget {
                        width: 200px !important;
                        min-height: 120px !important;
                        padding: 15px !important;
                    }
                    .qm-title { font-size: 1.1em !important; }
                    .qm-icon { font-size: 2em !important; }
                    .qm-value { font-size: 1.4em !important; }
                `,
                medium: `
                    .qm-widget {
                        width: 300px !important;
                        min-height: 200px !important;
                        padding: 20px !important;
                    }
                `,
                large: `
                    .qm-widget {
                        width: 400px !important;
                        min-height: 300px !important;
                        padding: 30px !important;
                    }
                    .qm-title { font-size: 1.5em !important; }
                    .qm-icon { font-size: 3em !important; }
                    .qm-value { font-size: 2em !important; }
                `
            };
            
            return sizes[this.config.size] || sizes.medium;
        }
        
        async fetchData() {
            // Override in child classes
            this.data = { loaded: true };
        }
        
        render() {
            // Override in child classes
            if (this.config.branding && this.config.apiKey === 'free') {
                this.addBranding();
            }
        }
        
        attachEventListeners() {
            // Override in child classes
        }
        
        startAutoRefresh() {
            if (this.config.autoRefresh && this.config.refreshInterval > 0) {
                setInterval(async () => {
                    await this.fetchData();
                    this.render();
                    this.trackAnalytics('refresh');
                }, this.config.refreshInterval);
            }
        }
        
        addBranding() {
            const branding = document.createElement('div');
            branding.className = 'qm-branding';
            branding.innerHTML = `<a href="https://quantummerlin.com" target="_blank">Powered by Quantum Merlin</a>`;
            this.widget.appendChild(branding);
        }
        
        trackAnalytics(eventType, data = {}) {
            if (!this.config.analytics) return;
            
            this.analytics[eventType === 'view' ? 'views' : 'interactions']++;
            
            // Send to server if not free tier
            if (this.config.apiKey !== 'free') {
                fetch('https://api.quantummerlin.com/v1/analytics/widget-event', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.config.apiKey}`
                    },
                    body: JSON.stringify({
                        widgetType: this.config.widgetType,
                        eventType,
                        url: window.location.href,
                        timestamp: new Date().toISOString(),
                        ...data
                    })
                }).catch(() => {
                    // Silently fail analytics
                });
            }
        }
        
        handleError(error) {
            console.error('Quantum Merlin Widget Error:', error);
            this.widget.innerHTML = `
                <div class="qm-error">
                    <div class="qm-icon">⚠️</div>
                    <div>Unable to load widget</div>
                    <small>${error.message}</small>
                </div>
            `;
        }
        
        showLoading() {
            this.widget.innerHTML = `
                <div class="qm-loading">
                    <div class="qm-spinner"></div>
                    <div>Loading cosmic insights...</div>
                </div>
            `;
        }
        
        updateConfig(newConfig) {
            this.config = { ...this.config, ...newConfig };
            this.init();
        }
        
        destroy() {
            if (this.container && this.shadow) {
                this.container.innerHTML = '';
            }
        }
    }
    
    // Widget Registry
    const widgetRegistry = new Map();
    
    function registerWidget(type, widgetClass) {
        widgetRegistry.set(type, widgetClass);
    }
    
    function createWidget(type, config) {
        const WidgetClass = widgetRegistry.get(type);
        if (!WidgetClass) {
            throw new Error(`Widget type '${type}' not registered`);
        }
        return new WidgetClass(config);
    }
    
    // Auto-initialize widgets marked for auto-init
    function autoInitWidgets() {
        const widgets = document.querySelectorAll('[data-qm-widget]');
        widgets.forEach(container => {
            const type = container.dataset.qmWidget;
            const config = JSON.parse(container.dataset.qmConfig || '{}');
            
            config.containerId = container.id || `qm-widget-${Date.now()}`;
            
            try {
                createWidget(type, config);
            } catch (error) {
                console.error(`Failed to initialize widget: ${type}`, error);
            }
        });
    }
    
    // Export to global scope
    window.QuantumMerlin = {
        Widget: QuantumMerlinWidget,
        registerWidget,
        createWidget,
        autoInitWidgets,
        registry: widgetRegistry
    };
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInitWidgets);
    } else {
        autoInitWidgets();
    }
    
})();