// Quantum Merlin - Premium Export Unlock System
// This file provides the architecture for premium features

class QuantumPremium {
    constructor() {
        this.premiumFeatures = {
            tarot: {
                name: "Advanced Tarot Exports",
                price: 20,
                features: ["PDF Reports", "High-Resolution Card Images", "Personalized Spreads", "Export Reading History"]
            },
            sigils: {
                name: "Professional Sigil Toolkit",
                price: 20,
                features: ["High-Resolution Downloads", "Vector Export", "Batch Creation", "Advanced Charging Frequencies"]
            },
            frequencies: {
                name: "Frequency Master Collection",
                price: 20,
                features: ["Custom Frequency Creation", "Extended Audio Length", "Batch Downloads", "Advanced Waveforms"]
            },
            reports: {
                name: "Comprehensive Reports",
                price: 20,
                features: ["Detailed Life Path Analysis", "Compatibility Reports", "Predictive Forecasts", "Export All Data"]
            }
        };
        
        this.isPremium = this.checkPremiumStatus();
        this.init();
    }
    
    init() {
        // Add premium buttons to relevant tools
        this.addPremiumButtons();
        
        // Setup payment handlers
        this.setupPaymentHandlers();
        
        // Check for unlock codes
        this.checkUnlockCode();
    }
    
    checkPremiumStatus() {
        const premiumStatus = localStorage.getItem('quantum_premium_status');
        if (premiumStatus) {
            const data = JSON.parse(premiumStatus);
            if (data.unlocked && data.expiry > Date.now()) {
                return true;
            }
        }
        return false;
    }
    
    checkUnlockCode() {
        const urlParams = new URLSearchParams(window.location.search);
        const unlockCode = urlParams.get('unlock');
        
        if (unlockCode) {
            this.validateAndApplyUnlock(unlockCode);
        }
    }
    
    validateAndApplyUnlock(code) {
        // In production, this would validate against a server
        const validCodes = {
            'MERLIN2024': 'all',
            'ROSE2024': 'all',
            'QUANTUM': 'all',
            'FREQUENCY': 'frequencies',
            'TAROT': 'tarot',
            'SIGILS': 'sigils'
        };
        
        if (validCodes[code]) {
            this.unlockFeatures(validCodes[code]);
            this.showUnlockSuccess();
            
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            this.showUnlockError();
        }
    }
    
    unlockFeatures(featureType) {
        const status = {
            unlocked: true,
            expiry: Date.now() + (365 * 24 * 60 * 60 * 1000), // 1 year
            features: featureType === 'all' ? 'all' : featureType,
            unlockedAt: new Date().toISOString()
        };
        
        localStorage.setItem('quantum_premium_status', JSON.stringify(status));
        this.isPremium = true;
        
        // Update UI
        this.updatePremiumUI();
        
        // Track unlock event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'premium_unlock', {
                feature_type: featureType,
                method: 'unlock_code',
                timestamp: new Date().toISOString()
            });
        }
    }
    
    addPremiumButtons() {
        // Add premium buttons to relevant tools
        const toolName = this.getCurrentTool();
        
        if (toolName === 'tarot') {
            this.addTarotPremiumButtons();
        } else if (toolName === 'sigils') {
            this.addSigilPremiumButtons();
        } else if (toolName === 'frequency') {
            this.addFrequencyPremiumButtons();
        } else if (toolName === 'gematria') {
            this.addGematriaPremiumButtons();
        }
    }
    
    getCurrentTool() {
        const pathname = window.location.pathname;
        if (pathname.includes('tarot')) return 'tarot';
        if (pathname.includes('sigils')) return 'sigils';
        if (pathname.includes('frequency')) return 'frequency';
        if (pathname.includes('gematria')) return 'gematria';
        return 'general';
    }
    
    addTarotPremiumButtons() {
        const container = document.querySelector('.tarot-results');
        if (!container) return;
        
        const premiumSection = document.createElement('div');
        premiumSection.className = 'premium-section';
        premiumSection.innerHTML = `
            <div class="premium-header">
                <h3>🌟 Premium Features Available</h3>
                <p>Save and share your complete tarot reading</p>
            </div>
            <div class="premium-features">
                <div class="feature-item">
                    <span class="feature-icon">📄</span>
                    <span class="feature-text">Download as PDF Report</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🖼️</span>
                    <span class="feature-text">High-Resolution Card Images</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">📊</span>
                    <span class="feature-text">Detailed Analysis Report</span>
                </div>
            </div>
            <button class="premium-btn" onclick="quantumPremium.showPaymentModal('tarot')">
                🔓 Unlock Premium Features - $20
            </button>
        `;
        
        container.appendChild(premiumSection);
    }
    
    addSigilPremiumButtons() {
        const canvasContainer = document.querySelector('.canvas-container');
        if (!canvasContainer) return;
        
        const premiumControls = document.createElement('div');
        premiumControls.className = 'premium-controls';
        premiumControls.innerHTML = `
            <div class="premium-header">
                <h3>🎨 Professional Export Options</h3>
            </div>
            <div class="premium-buttons">
                <button class="premium-btn small" onclick="quantumPremium.exportSigil('png')" ${this.isPremium ? '' : 'disabled'}>
                    📥 Download HD PNG
                </button>
                <button class="premium-btn small" onclick="quantumPremium.exportSigil('svg')" ${this.isPremium ? '' : 'disabled'}>
                    📥 Download Vector SVG
                </button>
                <button class="premium-btn small" onclick="quantumPremium.exportSigil('pdf')" ${this.isPremium ? '' : 'disabled'}>
                    📥 Download PDF
                </button>
                ${!this.isPremium ? `<button class="unlock-btn" onclick="quantumPremium.showPaymentModal('sigils')">🔓 Unlock All Exports - $20</button>` : ''}
            </div>
        `;
        
        canvasContainer.appendChild(premiumControls);
    }
    
    addFrequencyPremiumButtons() {
        const player = document.querySelector('.audio-player');
        if (!player) return;
        
        const premiumControls = document.createElement('div');
        premiumControls.className = 'premium-audio-controls';
        premiumControls.innerHTML = `
            <div class="premium-header">
                <h3>🎵 Advanced Audio Features</h3>
            </div>
            <div class="premium-buttons">
                <button class="premium-btn small" onclick="quantumPremium.extendAudio()" ${this.isPremium ? '' : 'disabled'}>
                    ⏱️ Extend to 30 minutes
                </button>
                <button class="premium-btn small" onclick="quantumPremium.downloadAudio()" ${this.isPremium ? '' : 'disabled'}>
                    📥 Download Audio File
                </button>
                <button class="premium-btn small" onclick="quantumPremium.createCustomFrequency()" ${this.isPremium ? '' : 'disabled'}>
                    🎛️ Create Custom Frequency
                </button>
                ${!this.isPremium ? `<button class="unlock-btn" onclick="quantumPremium.showPaymentModal('frequencies')">🔓 Unlock All Features - $20</button>` : ''}
            </div>
        `;
        
        player.appendChild(premiumControls);
    }
    
    addGematriaPremiumButtons() {
        const results = document.querySelector('.gematria-results');
        if (!results) return;
        
        const premiumSection = document.createElement('div');
        premiumSection.className = 'premium-section';
        premiumSection.innerHTML = `
            <div class="premium-header">
                <h3>📊 Comprehensive Reports</h3>
            </div>
            <div class="premium-buttons">
                <button class="premium-btn" onclick="quantumPremium.generateGematriaReport()" ${this.isPremium ? '' : 'disabled'}>
                    📄 Generate Full Report
                </button>
                <button class="premium-btn" onclick="quantumPremium.exportGematriaData()" ${this.isPremium ? '' : 'disabled'}>
                    📊 Export All Data
                </button>
                ${!this.isPremium ? `<button class="unlock-btn" onclick="quantumPremium.showPaymentModal('reports')">🔓 Unlock Reports - $20</button>` : ''}
            </div>
        `;
        
        results.appendChild(premiumSection);
    }
    
    showPaymentModal(featureType) {
        const feature = this.premiumFeatures[featureType];
        
        const modal = document.createElement('div');
        modal.className = 'premium-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🌟 Unlock ${feature.name}</h2>
                    <button class="close-btn" onclick="quantumPremium.closeModal()">✕</button>
                </div>
                <div class="modal-body">
                    <div class="price-tag">$20</div>
                    <div class="features-list">
                        <h3>What you'll get:</h3>
                        ${feature.features.map(f => `<div class="feature-item">✨ ${f}</div>`).join('')}
                    </div>
                    <div class="payment-options">
                        <button class="pay-btn" onclick="quantumPremium.processPayment('stripe')">
                            💳 Pay with Card
                        </button>
                        <button class="pay-btn" onclick="quantumPremium.processPayment('paypal')">
                            💰 Pay with PayPal
                        </button>
                    </div>
                    <div class="guarantee">
                        🔒 30-day money-back guarantee<br>
                        📧 Email support included
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Track modal view
        if (typeof gtag !== 'undefined') {
            gtag('event', 'premium_modal_view', {
                feature_type: featureType,
                price: feature.price
            });
        }
    }
    
    closeModal() {
        const modal = document.querySelector('.premium-modal');
        if (modal) {
            modal.remove();
        }
    }
    
    processPayment(method) {
        // In production, this would integrate with real payment processors
        const modal = document.querySelector('.modal-content');
        
        modal.innerHTML = `
            <div class="processing-payment">
                <div class="spinner"></div>
                <h3>Processing Payment...</h3>
                <p>Securing your premium features...</p>
            </div>
        `;
        
        // Simulate payment processing
        setTimeout(() => {
            this.simulateSuccessfulPayment();
        }, 2000);
        
        // Track payment initiation
        if (typeof gtag !== 'undefined') {
            gtag('event', 'payment_initiated', {
                payment_method: method,
                price: 20,
                currency: 'USD'
            });
        }
    }
    
    simulateSuccessfulPayment() {
        // Simulate successful payment
        this.unlockFeatures('all');
        this.closeModal();
        this.showPaymentSuccess();
        
        // Track successful payment
        if (typeof gtag !== 'undefined') {
            gtag('event', 'payment_completed', {
                price: 20,
                currency: 'USD',
                transaction_id: 'QM_' + Date.now()
            });
        }
    }
    
    showPaymentSuccess() {
        const successModal = document.createElement('div');
        successModal.className = 'premium-modal';
        successModal.innerHTML = `
            <div class="modal-content success">
                <div class="success-animation">
                    <div class="success-icon">🎉</div>
                    <h2>Payment Successful!</h2>
                    <p>Welcome to Quantum Premium! All features are now unlocked.</p>
                    <button class="success-btn" onclick="quantumPremium.closeModal()">
                        🌟 Start Using Premium Features
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(successModal);
    }
    
    showUnlockSuccess() {
        const notification = document.createElement('div');
        notification.className = 'unlock-notification success';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">🌟</span>
                <span class="notification-text">Premium features unlocked successfully!</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    showUnlockError() {
        const notification = document.createElement('div');
        notification.className = 'unlock-notification error';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">⚠️</span>
                <span class="notification-text">Invalid unlock code. Please check and try again.</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    updatePremiumUI() {
        // Update all premium buttons and sections
        document.querySelectorAll('.premium-btn[disabled]').forEach(btn => {
            btn.disabled = false;
            btn.textContent = btn.textContent.replace('🔒', '🌟');
        });
        
        document.querySelectorAll('.unlock-btn').forEach(btn => {
            btn.remove();
        });
        
        // Update page header if premium
        const header = document.querySelector('.logo');
        if (header) {
            header.innerHTML = '✨ Quantum Merlin Premium';
        }
    }
    
    // Premium feature implementations
    exportSigil(format) {
        if (!this.isPremium) {
            this.showPaymentModal('sigils');
            return;
        }
        
        // Export sigil in specified format
        console.log(`Exporting sigil as ${format}`);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'sigil_export', {
                format: format,
                timestamp: new Date().toISOString()
            });
        }
    }
    
    extendAudio() {
        if (!this.isPremium) {
            this.showPaymentModal('frequencies');
            return;
        }
        
        // Extend audio playback
        console.log('Extending audio to 30 minutes');
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'audio_extended', {
                duration: 1800,
                timestamp: new Date().toISOString()
            });
        }
    }
    
    downloadAudio() {
        if (!this.isPremium) {
            this.showPaymentModal('frequencies');
            return;
        }
        
        // Download audio file
        console.log('Downloading audio file');
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'audio_downloaded', {
                format: 'mp3',
                timestamp: new Date().toISOString()
            });
        }
    }
    
    generateGematriaReport() {
        if (!this.isPremium) {
            this.showPaymentModal('reports');
            return;
        }
        
        // Generate comprehensive report
        console.log('Generating gematria report');
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'report_generated', {
                type: 'gematria',
                timestamp: new Date().toISOString()
            });
        }
    }
    
    setupPaymentHandlers() {
        // Payment setup will go here
        // For now, using simulation
    }
}

// Initialize premium system
let quantumPremium;
document.addEventListener('DOMContentLoaded', function() {
    quantumPremium = new QuantumPremium();
});

// CSS for premium features
const premiumStyles = `
.premium-section {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 105, 180, 0.1));
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 15px;
    padding: 2rem;
    margin: 2rem 0;
}

.premium-header h3 {
    color: #ffd700;
    margin-bottom: 1rem;
}

.premium-features {
    margin: 1.5rem 0;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.8rem;
    color: #e0e0e0;
}

.feature-icon {
    font-size: 1.2rem;
    color: #ffd700;
}

.premium-btn {
    background: linear-gradient(135deg, #ffd700, #ff69b4);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.5rem;
}

.premium-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 215, 0, 0.5);
}

.premium-btn.small {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
}

.premium-btn:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
}

.unlock-btn {
    background: linear-gradient(135deg, #8a2be2, #00ffff);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 20px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.premium-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

.modal-content {
    background: linear-gradient(135deg, rgba(20, 20, 40, 0.95), rgba(40, 20, 60, 0.95));
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 20px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    backdrop-filter: blur(10px);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.modal-header h2 {
    color: #ffd700;
    font-size: 1.8rem;
}

.close-btn {
    background: none;
    border: none;
    color: #999;
    font-size: 1.5rem;
    cursor: pointer;
}

.price-tag {
    font-size: 3rem;
    color: #ffd700;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1.5rem;
}

.features-list {
    margin: 2rem 0;
}

.features-list h3 {
    color: #00ffff;
    margin-bottom: 1rem;
}

.payment-options {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
}

.pay-btn {
    flex: 1;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.pay-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(76, 175, 80, 0.5);
}

.guarantee {
    text-align: center;
    color: #999;
    font-size: 0.9rem;
    margin-top: 1.5rem;
}

.processing-payment {
    text-align: center;
    padding: 2rem;
}

.spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid #ffd700;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.success-animation {
    text-align: center;
    padding: 2rem;
}

.success-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.success-btn {
    background: linear-gradient(135deg, #ffd700, #ff69b4);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
}

.unlock-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(20, 20, 40, 0.95);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 10px;
    padding: 1rem 1.5rem;
    backdrop-filter: blur(10px);
    z-index: 10000;
    animation: slideInRight 0.5s ease;
}

.unlock-notification.success {
    border-color: rgba(0, 255, 0, 0.5);
}

.unlock-notification.error {
    border-color: rgba(255, 0, 0, 0.5);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.notification-icon {
    font-size: 1.5rem;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

// Add styles to page
const styleSheet = document.createElement('style');
styleSheet.textContent = premiumStyles;
document.head.appendChild(styleSheet);