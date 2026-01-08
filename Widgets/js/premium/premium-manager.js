/**
 * Quantum Merlin Premium Manager
 * Handles authentication, payments, premium features, and analytics
 */

(function() {
    'use strict';
    
    class QuantumMerlinPremium {
        constructor(config = {}) {
            this.apiBase = config.apiBase || 'https://api.quantummerlin.com';
            this.currentPlan = 'free';
            this.user = null;
            this.apiKey = null;
            this.widgets = new Map();
            this.analytics = new Map();
            this.init();
        }
        
        async init() {
            // Check for existing session
            await this.loadUserSession();
            
            // Set up global event listeners
            this.setupEventListeners();
            
            // Initialize premium UI elements
            this.initializePremiumUI();
        }
        
        async loadUserSession() {
            try {
                const token = localStorage.getItem('qm_token');
                if (token) {
                    const response = await fetch(`${this.apiBase}/api/v1/auth/verify`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        this.user = data.user;
                        this.apiKey = data.apiKey;
                        this.currentPlan = data.user.plan;
                        this.updateUIForPlan();
                    } else {
                        localStorage.removeItem('qm_token');
                    }
                }
            } catch (error) {
                console.warn('Failed to load user session:', error);
            }
        }
        
        setupEventListeners() {
            // Login/Logout buttons
            document.addEventListener('click', async (e) => {
                if (e.target.matches('.qm-login-btn')) {
                    await this.showLoginModal();
                }
                if (e.target.matches('.qm-logout-btn')) {
                    await this.logout();
                }
                if (e.target.matches('.qm-upgrade-btn')) {
                    await this.showUpgradeModal();
                }
                if (e.target.matches('.qm-analytics-btn')) {
                    await this.showAnalytics();
                }
            });
        }
        
        initializePremiumUI() {
            // Add premium UI to all widgets
            this.addPremiumUItoWidgets();
            
            // Create floating premium badge if needed
            if (this.currentPlan === 'free') {
                this.createUpgradePrompt();
            }
        }
        
        addPremiumUItoWidgets() {
            const widgets = document.querySelectorAll('[data-qm-widget]');
            widgets.forEach(widget => {
                const widgetType = widget.dataset.qmWidget;
                
                if (this.currentPlan === 'free') {
                    this.addBrandingToWidget(widget);
                    this.addUpgradeButtonToWidget(widget);
                } else {
                    this.removeBrandingFromWidget(widget);
                    this.addCustomizeButtonToWidget(widget);
                    this.addAnalyticsToWidget(widget);
                }
            });
        }
        
        addBrandingToWidget(widget) {
            // Add "Powered by Quantum Merlin" branding
            const shadowRoot = widget.shadowRoot || widget;
            const branding = shadowRoot.querySelector('.qm-branding');
            
            if (!branding) {
                const brandingEl = document.createElement('div');
                brandingEl.className = 'qm-branding qm-premium-prompt';
                brandingEl.innerHTML = `
                    <a href="https://quantummerlin.com" target="_blank" class="qm-brand-link">
                        Powered by Quantum Merlin
                    </a>
                    <button class="qm-remove-branding-btn" onclick="window.qmPremium.showUpgradeModal()">
                        Remove Branding
                    </button>
                `;
                
                const style = document.createElement('style');
                style.textContent = `
                    .qm-premium-prompt {
                        position: absolute;
                        bottom: 5px;
                        right: 5px;
                        font-size: 0.7em;
                        opacity: 0.7;
                        text-align: right;
                    }
                    .qm-brand-link {
                        color: inherit;
                        text-decoration: none;
                        display: block;
                        margin-bottom: 2px;
                    }
                    .qm-remove-branding-btn {
                        background: rgba(251, 191, 36, 0.2);
                        border: 1px solid rgba(251, 191, 36, 0.3);
                        color: #fbbf24;
                        padding: 2px 6px;
                        border-radius: 4px;
                        font-size: 0.8em;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .qm-remove-branding-btn:hover {
                        background: rgba(251, 191, 36, 0.3);
                    }
                `;
                
                shadowRoot.appendChild(style);
                shadowRoot.appendChild(brandingEl);
            }
        }
        
        removeBrandingFromWidget(widget) {
            const shadowRoot = widget.shadowRoot || widget;
            const branding = shadowRoot.querySelector('.qm-branding');
            if (branding) {
                branding.remove();
            }
        }
        
        addUpgradeButtonToWidget(widget) {
            const shadowRoot = widget.shadowRoot || widget;
            const actions = shadowRoot.querySelector('.qm-actions');
            
            if (actions && !actions.querySelector('.qm-upgrade-widget-btn')) {
                const upgradeBtn = document.createElement('button');
                upgradeBtn.className = 'qm-button qm-upgrade-widget-btn';
                upgradeBtn.textContent = 'Remove Branding';
                upgradeBtn.onclick = () => this.showUpgradeModal();
                
                actions.appendChild(upgradeBtn);
            }
        }
        
        addCustomizeButtonToWidget(widget) {
            const shadowRoot = widget.shadowRoot || widget;
            const actions = shadowRoot.querySelector('.qm-actions');
            
            if (actions && !actions.querySelector('.qm-customize-widget-btn')) {
                const customizeBtn = document.createElement('button');
                customizeBtn.className = 'qm-button qm-customize-widget-btn';
                customizeBtn.textContent = 'Customize';
                customizeBtn.onclick = () => this.showCustomizeModal(widget);
                
                actions.appendChild(customizeBtn);
            }
        }
        
        addAnalyticsToWidget(widget) {
            const shadowRoot = widget.shadowRoot || widget;
            
            // Add analytics badge to premium widgets
            const analyticsBadge = document.createElement('div');
            analyticsBadge.className = 'qm-analytics-badge';
            analyticsBadge.innerHTML = `
                <button class="qm-analytics-widget-btn" onclick="window.qmPremium.showWidgetAnalytics('${widget.id}')">
                    📊 View Stats
                </button>
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                .qm-analytics-badge {
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    z-index: 1000;
                }
                .qm-analytics-widget-btn {
                    background: rgba(139, 92, 246, 0.2);
                    border: 1px solid rgba(139, 92, 246, 0.3);
                    color: #8b5cf6;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.7em;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .qm-analytics-widget-btn:hover {
                    background: rgba(139, 92, 246, 0.3);
                }
            `;
            
            shadowRoot.appendChild(style);
            shadowRoot.appendChild(analyticsBadge);
        }
        
        createUpgradePrompt() {
            // Create floating upgrade prompt
            const prompt = document.createElement('div');
            prompt.className = 'qm-floating-upgrade';
            prompt.innerHTML = `
                <div class="qm-upgrade-content">
                    <div class="qm-upgrade-icon">👑</div>
                    <div class="qm-upgrade-title">Go Premium</div>
                    <div class="qm-upgrade-benefits">
                        <div class="qm-benefit">✓ Remove branding</div>
                        <div class="qm-benefit">✓ Custom colors</div>
                        <div class="qm-benefit">✓ Analytics dashboard</div>
                        <div class="qm-benefit">✓ Priority support</div>
                    </div>
                    <div class="qm-upgrade-price">$29/month</div>
                    <button class="qm-upgrade-cta" onclick="window.qmPremium.showUpgradeModal()">
                        Upgrade Now
                    </button>
                    <button class="qm-upgrade-dismiss" onclick="this.parentElement.parentElement.remove()">
                        ✕
                    </button>
                </div>
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                .qm-floating-upgrade {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                    border: 1px solid rgba(251, 191, 36, 0.3);
                    border-radius: 12px;
                    padding: 20px;
                    max-width: 280px;
                    z-index: 10000;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                    animation: qmSlideIn 0.5s ease;
                }
                
                @keyframes qmSlideIn {
                    from { transform: translateX(400px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                .qm-upgrade-content {
                    text-align: center;
                    color: #e2e8f0;
                }
                
                .qm-upgrade-icon {
                    font-size: 2em;
                    margin-bottom: 10px;
                }
                
                .qm-upgrade-title {
                    font-family: 'Cinzel', serif;
                    font-size: 1.3em;
                    color: #fbbf24;
                    margin-bottom: 15px;
                }
                
                .qm-upgrade-benefits {
                    text-align: left;
                    margin-bottom: 15px;
                }
                
                .qm-benefit {
                    font-size: 0.85em;
                    margin-bottom: 5px;
                    opacity: 0.9;
                }
                
                .qm-upgrade-price {
                    font-size: 1.5em;
                    font-weight: 600;
                    color: #fbbf24;
                    margin-bottom: 15px;
                }
                
                .qm-upgrade-cta {
                    background: linear-gradient(45deg, #fbbf24, #f59e0b);
                    color: #0f172a;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    width: 100%;
                    margin-bottom: 10px;
                    transition: all 0.3s ease;
                }
                
                .qm-upgrade-cta:hover {
                    transform: translateY(-2px);
                }
                
                .qm-upgrade-dismiss {
                    background: none;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                    font-size: 1.2em;
                }
                
                .qm-upgrade-dismiss:hover {
                    color: #e2e8f0;
                }
            `;
            
            prompt.appendChild(style);
            document.body.appendChild(prompt);
            
            // Auto-hide after 30 seconds
            setTimeout(() => {
                if (prompt.parentElement) {
                    prompt.remove();
                }
            }, 30000);
        }
        
        async showLoginModal() {
            const modal = this.createModal('Login to Your Account', `
                <form id="qm-login-form" class="qm-auth-form">
                    <div class="qm-form-group">
                        <label>Email</label>
                        <input type="email" id="qm-login-email" required placeholder="your@email.com">
                    </div>
                    <div class="qm-form-group">
                        <label>Password</label>
                        <input type="password" id="qm-login-password" required placeholder="••••••••">
                    </div>
                    <button type="submit" class="qm-auth-submit">Login</button>
                    <div class="qm-auth-switch">
                        Don't have an account? 
                        <a href="#" onclick="window.qmPremium.showSignupModal()">Sign up</a>
                    </div>
                </form>
            `);
            
            // Handle login form submission
            modal.querySelector('#qm-login-form').addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.login(
                    modal.querySelector('#qm-login-email').value,
                    modal.querySelector('#qm-login-password').value
                );
            });
        }
        
        async showSignupModal() {
            const modal = this.createModal('Create Your Account', `
                <form id="qm-signup-form" class="qm-auth-form">
                    <div class="qm-form-group">
                        <label>Email</label>
                        <input type="email" id="qm-signup-email" required placeholder="your@email.com">
                    </div>
                    <div class="qm-form-group">
                        <label>Password</label>
                        <input type="password" id="qm-signup-password" required placeholder="••••••••">
                    </div>
                    <div class="qm-form-group">
                        <label>Confirm Password</label>
                        <input type="password" id="qm-signup-confirm" required placeholder="••••••••">
                    </div>
                    <button type="submit" class="qm-auth-submit">Create Account</button>
                    <div class="qm-auth-switch">
                        Already have an account? 
                        <a href="#" onclick="window.qmPremium.showLoginModal()">Login</a>
                    </div>
                </form>
            `);
            
            // Handle signup form submission
            modal.querySelector('#qm-signup-form').addEventListener('submit', async (e) => {
                e.preventDefault();
                const password = modal.querySelector('#qm-signup-password').value;
                const confirm = modal.querySelector('#qm-signup-confirm').value;
                
                if (password !== confirm) {
                    alert('Passwords do not match');
                    return;
                }
                
                await this.signup(
                    modal.querySelector('#qm-signup-email').value,
                    password
                );
            });
        }
        
        async showUpgradeModal() {
            const modal = this.createModal('Upgrade to Premium', `
                <div class="qm-upgrade-plans">
                    <div class="qm-plan qm-plan-selected">
                        <div class="qm-plan-header">
                            <h3>Premium</h3>
                            <div class="qm-plan-price">$29<span>/month</span></div>
                        </div>
                        <ul class="qm-plan-features">
                            <li>✓ Remove branding from all widgets</li>
                            <li>✓ Custom colors and themes</li>
                            <li>✓ Advanced customization options</li>
                            <li>✓ Analytics dashboard</li>
                            <li>✓ Priority email support</li>
                            <li>✓ API access for developers</li>
                        </ul>
                        <button class="qm-plan-select-btn qm-select-premium" onclick="window.qmPremium.startCheckout('premium')">
                            Select Premium
                        </button>
                    </div>
                    
                    <div class="qm-plan">
                        <div class="qm-plan-header">
                            <h3>Enterprise</h3>
                            <div class="qm-plan-price">$299<span>/month</span></div>
                        </div>
                        <ul class="qm-plan-features">
                            <li>✓ Everything in Premium</li>
                            <li>✓ Unlimited widget embeds</li>
                            <li>✓ White-label options</li>
                            <li>✓ Custom widget development</li>
                            <li>✓ Dedicated account manager</li>
                            <li>✓ SLA guarantee</li>
                        </ul>
                        <button class="qm-plan-select-btn" onclick="window.qmPremium.startCheckout('enterprise')">
                            Select Enterprise
                        </button>
                    </div>
                </div>
                
                <div class="qm-upgrade-guarantee">
                    <div class="qm-guarantee-icon">🛡️</div>
                    <div class="qm-guarantee-text">
                        <strong>30-Day Money Back Guarantee</strong>
                        Not satisfied? Get a full refund, no questions asked.
                    </div>
                </div>
            `);
        }
        
        async showCustomizeModal(widget) {
            const modal = this.createModal('Customize Widget', `
                <div class="qm-customize-form">
                    <div class="qm-customize-section">
                        <h3>Colors</h3>
                        <div class="qm-color-options">
                            <div class="qm-color-group">
                                <label>Primary Color</label>
                                <input type="color" id="qm-primary-color" value="#fbbf24">
                            </div>
                            <div class="qm-color-group">
                                <label>Background Color</label>
                                <input type="color" id="qm-bg-color" value="#1e293b">
                            </div>
                            <div class="qm-color-group">
                                <label>Text Color</label>
                                <input type="color" id="qm-text-color" value="#e2e8f0">
                            </div>
                        </div>
                    </div>
                    
                    <div class="qm-customize-section">
                        <h3>Size</h3>
                        <select id="qm-widget-size">
                            <option value="small">Small (200×120px)</option>
                            <option value="medium" selected>Medium (300×200px)</option>
                            <option value="large">Large (400×300px)</option>
                        </select>
                    </div>
                    
                    <div class="qm-customize-section">
                        <h3>Features</h3>
                        <div class="qm-feature-toggles">
                            <label>
                                <input type="checkbox" id="qm-show-chart" checked>
                                Show radar chart
                            </label>
                            <label>
                                <input type="checkbox" id="qm-show-details" checked>
                                Show detailed information
                            </label>
                            <label>
                                <input type="checkbox" id="qm-animations" checked>
                                Enable animations
                            </label>
                        </div>
                    </div>
                    
                    <div class="qm-customize-actions">
                        <button class="qm-preview-btn" onclick="window.qmPremium.previewCustomization('${widget.id}')">
                            Preview Changes
                        </button>
                        <button class="qm-save-btn" onclick="window.qmPremium.saveCustomization('${widget.id}')">
                            Save Customization
                        </button>
                    </div>
                </div>
            `);
        }
        
        async showAnalytics() {
            if (this.currentPlan === 'free') {
                this.showUpgradeModal();
                return;
            }
            
            try {
                const response = await fetch(`${this.apiBase}/api/v1/analytics/dashboard`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('qm_token')}` }
                });
                
                if (!response.ok) throw new Error('Failed to fetch analytics');
                
                const analytics = await response.json();
                
                const modal = this.createModal('Analytics Dashboard', `
                    <div class="qm-analytics-dashboard">
                        <div class="qm-analytics-summary">
                            <div class="qm-stat-card">
                                <div class="qm-stat-value">${analytics.totalViews}</div>
                                <div class="qm-stat-label">Total Views</div>
                            </div>
                            <div class="qm-stat-card">
                                <div class="qm-stat-value">${analytics.uniqueWidgets}</div>
                                <div class="qm-stat-label">Unique Widgets</div>
                            </div>
                        </div>
                        
                        <div class="qm-analytics-popular">
                            <h3>Popular Widgets</h3>
                            <div class="qm-popular-list">
                                ${analytics.popularWidgets.map(widget => `
                                    <div class="qm-popular-item">
                                        <span class="qm-widget-name">${widget.type}</span>
                                        <span class="qm-widget-views">${widget.views} views</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="qm-analytics-recent">
                            <h3>Recent Activity</h3>
                            <div class="qm-recent-list">
                                ${analytics.recentEvents.slice(0, 10).map(event => `
                                    <div class="qm-recent-item">
                                        <span class="qm-event-type">${event.eventType}</span>
                                        <span class="qm-event-time">${new Date(event.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `);
                
            } catch (error) {
                alert('Failed to load analytics. Please try again.');
            }
        }
        
        createModal(title, content) {
            // Remove existing modal
            const existingModal = document.querySelector('.qm-modal');
            if (existingModal) {
                existingModal.remove();
            }
            
            const modal = document.createElement('div');
            modal.className = 'qm-modal';
            modal.innerHTML = `
                <div class="qm-modal-backdrop" onclick="this.parentElement.remove()"></div>
                <div class="qm-modal-content">
                    <div class="qm-modal-header">
                        <h2>${title}</h2>
                        <button class="qm-modal-close" onclick="this.parentElement.parentElement.remove()">✕</button>
                    </div>
                    <div class="qm-modal-body">
                        ${content}
                    </div>
                </div>
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                .qm-modal {
                    position: fixed;
                    top: 0;
                left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .qm-modal-backdrop {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                }
                
                .qm-modal-content {
                    position: relative;
                    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                    border: 1px solid rgba(251, 191, 36, 0.2);
                    border-radius: 12px;
                    padding: 0;
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                }
                
                .qm-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .qm-modal-header h2 {
                    margin: 0;
                    color: #fbbf24;
                    font-family: 'Cinzel', serif;
                }
                
                .qm-modal-close {
                    background: none;
                    border: none;
                    color: #94a3b8;
                    font-size: 1.5em;
                    cursor: pointer;
                    padding: 5px;
                }
                
                .qm-modal-close:hover {
                    color: #e2e8f0;
                }
                
                .qm-modal-body {
                    padding: 20px;
                    color: #e2e8f0;
                }
                
                .qm-auth-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                
                .qm-form-group {
                    display: flex;
                    flex-direction: column;
                }
                
                .qm-form-group label {
                    margin-bottom: 5px;
                    font-size: 0.9em;
                    opacity: 0.9;
                }
                
                .qm-form-group input {
                    padding: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 6px;
                    background: rgba(255, 255, 255, 0.05);
                    color: #e2e8f0;
                    font-size: 1em;
                }
                
                .qm-auth-submit {
                    background: linear-gradient(45deg, #fbbf24, #f59e0b);
                    color: #0f172a;
                    border: none;
                    padding: 12px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1em;
                    transition: all 0.3s ease;
                }
                
                .qm-auth-submit:hover {
                    transform: translateY(-1px);
                }
                
                .qm-auth-switch {
                    text-align: center;
                    font-size: 0.9em;
                    opacity: 0.8;
                }
                
                .qm-auth-switch a {
                    color: #fbbf24;
                    text-decoration: none;
                }
                
                .qm-upgrade-plans {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 20px;
                    margin-bottom: 30px;
                }
                
                .qm-plan {
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    padding: 20px;
                    text-align: center;
                }
                
                .qm-plan-selected {
                    border-color: #fbbf24;
                    background: rgba(251, 191, 36, 0.05);
                }
                
                .qm-plan-header h3 {
                    margin: 0 0 10px 0;
                    color: #fbbf24;
                }
                
                .qm-plan-price {
                    font-size: 2em;
                    font-weight: 600;
                    color: #e2e8f0;
                    margin-bottom: 20px;
                }
                
                .qm-plan-features {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 20px 0;
                    text-align: left;
                }
                
                .qm-plan-features li {
                    padding: 5px 0;
                    font-size: 0.9em;
                }
                
                .qm-plan-select-btn {
                    background: rgba(255, 255, 255, 0.1);
                    color: #e2e8f0;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 10px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    width: 100%;
                    transition: all 0.3s ease;
                }
                
                .qm-select-premium {
                    background: linear-gradient(45deg, #fbbf24, #f59e0b);
                    color: #0f172a;
                    border: none;
                }
                
                .qm-upgrade-guarantee {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 20px;
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    border-radius: 8px;
                    text-align: left;
                }
                
                .qm-guarantee-icon {
                    font-size: 2em;
                }
                
                .qm-guarantee-text {
                    flex: 1;
                }
                
                @media (min-width: 600px) {
                    .qm-upgrade-plans {
                        grid-template-columns: 1fr 1fr;
                    }
                }
            `;
            
            modal.appendChild(style);
            document.body.appendChild(modal);
            
            return modal;
        }
        
        async login(email, password) {
            try {
                const response = await fetch(`${this.apiBase}/api/v1/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                
                const data = await response.json();
                localStorage.setItem('qm_token', data.token);
                
                this.user = data.user;
                this.apiKey = data.apiKey;
                this.currentPlan = data.user.plan;
                
                this.updateUIForPlan();
                
                // Close modal and show success
                document.querySelector('.qm-modal').remove();
                this.showNotification('Login successful!', 'success');
                
            } catch (error) {
                alert('Login failed. Please check your credentials.');
            }
        }
        
        async signup(email, password) {
            try {
                const response = await fetch(`${this.apiBase}/api/v1/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                if (!response.ok) {
                    throw new Error('Signup failed');
                }
                
                const data = await response.json();
                localStorage.setItem('qm_token', data.token);
                
                this.user = data.user;
                this.apiKey = data.apiKey;
                this.currentPlan = data.user.plan;
                
                this.updateUIForPlan();
                
                // Close modal and show success
                document.querySelector('.qm-modal').remove();
                this.showNotification('Account created successfully!', 'success');
                
            } catch (error) {
                alert('Signup failed. Please try again.');
            }
        }
        
        async logout() {
            localStorage.removeItem('qm_token');
            this.user = null;
            this.apiKey = null;
            this.currentPlan = 'free';
            
            this.updateUIForPlan();
            this.showNotification('Logged out successfully', 'info');
        }
        
        updateUIForPlan() {
            // Update all widgets based on new plan
            this.addPremiumUItoWidgets();
            
            // Update page elements
            document.querySelectorAll('.qm-login-btn').forEach(btn => {
                btn.textContent = this.user ? 'Logout' : 'Login';
                btn.classList.toggle('qm-logout-btn', !!this.user);
            });
            
            document.querySelectorAll('.qm-upgrade-btn').forEach(btn => {
                btn.style.display = this.currentPlan !== 'free' ? 'none' : 'block';
            });
            
            document.querySelectorAll('.qm-analytics-btn').forEach(btn => {
                btn.style.display = this.currentPlan !== 'free' ? 'block' : 'none';
            });
        }
        
        async startCheckout(plan) {
            // In production, integrate with Stripe Checkout
            const stripe = Stripe('pk_test_...'); // Your Stripe public key
            
            try {
                const response = await fetch(`${this.apiBase}/api/v1/payments/create-checkout-session`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('qm_token')}`
                    },
                    body: JSON.stringify({ plan })
                });
                
                const session = await response.json();
                
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id
                });
                
                if (result.error) {
                    alert(result.error.message);
                }
                
            } catch (error) {
                alert('Payment processing failed. Please try again.');
            }
        }
        
        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `qm-notification qm-${type}`;
            notification.textContent = message;
            
            const style = document.createElement('style');
            style.textContent = `
                .qm-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: 8px;
                    color: white;
                    z-index: 10001;
                    animation: qmSlideIn 0.3s ease;
                }
                .qm-success {
                    background: linear-gradient(45deg, #10b981, #059669);
                }
                .qm-info {
                    background: linear-gradient(45deg, #3b82f6, #2563eb);
                }
                .qm-error {
                    background: linear-gradient(45deg, #ef4444, #dc2626);
                }
            `;
            
            notification.appendChild(style);
            document.body.appendChild(notification);
            
            setTimeout(() => notification.remove(), 5000);
        }
    }
    
    // Initialize the premium manager
    window.qmPremium = new QuantumMerlinPremium();
    
    // Export for use in other scripts
    window.QuantumMerlinPremium = QuantumMerlinPremium;
    
})();