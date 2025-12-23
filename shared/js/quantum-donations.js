/**
 * Quantum Reality Codes - Donations Integration
 * Buy Me a Coffee + Email Signup
 */

const QRC_DONATIONS = {
  buyMeACoffeeUsername: '', // Set your Buy Me a Coffee username here
  
  /**
   * Open Buy Me a Coffee page
   */
  openBuyMeACoffee() {
    const username = this.buyMeACoffeeUsername || 'quantummerlin';
    window.open(`https://buymeacoffee.com/${username}`, '_blank');
    
    // Track the click
    if (window.QRC_ANALYTICS) {
      QRC_ANALYTICS.trackDonation('buy_me_a_coffee');
    }
  },
  
  /**
   * Create floating support button
   */
  createFloatingButton() {
    const button = document.createElement('a');
    button.className = 'qrc-floating-support';
    button.href = '#';
    button.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/>
      </svg>
      <span>Support Us</span>
    `;
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      this.openBuyMeACoffee();
    });
    
    document.body.appendChild(button);
    
    // Add styles if not already present
    if (!document.getElementById('qrc-floating-styles')) {
      const style = document.createElement('style');
      style.id = 'qrc-floating-styles';
      style.textContent = `
        .qrc-floating-support {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: linear-gradient(135deg, #ffdd00, #fbb034);
          color: #000;
          font-family: var(--font-display, 'Orbitron', sans-serif);
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-decoration: none;
          border-radius: 50px;
          box-shadow: 0 4px 20px rgba(255, 215, 0, 0.4);
          z-index: 999;
          transition: all 0.3s ease;
        }
        
        .qrc-floating-support:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 30px rgba(255, 215, 0, 0.6);
        }
        
        .qrc-floating-support svg {
          width: 20px;
          height: 20px;
        }
        
        @media (max-width: 640px) {
          .qrc-floating-support span {
            display: none;
          }
          
          .qrc-floating-support {
            padding: 14px;
            border-radius: 50%;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
};

/**
 * Email Signup Handler
 * Integrates with PythonAnywhere backend
 */
const QRC_EMAIL = {
  apiEndpoint: '', // Set your PythonAnywhere API endpoint here
  
  /**
   * Show email signup modal
   */
  showSignupModal() {
    // Check if modal already exists
    if (document.getElementById('qrc-email-modal')) {
      document.getElementById('qrc-email-modal').classList.add('active');
      return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'qrc-email-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Join the Quantum Council</h3>
          <button class="modal-close" onclick="QRC_EMAIL.closeModal()">&times;</button>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-6);">
          Get early access to new tools, exclusive reality codes, and cosmic updates delivered to your inbox.
        </p>
        <form action="https://formspree.io/f/mgowrolb" method="POST" onsubmit="QRC_EMAIL.handleSubmit(event)">
          <div class="input-group">
            <label class="input-label" for="email-input">Your Email</label>
            <input 
              type="email" 
              name="email"
              id="email-input" 
              class="input" 
              placeholder="mystic@quantum.com" 
              required
            >
          </div>
          <button type="submit" class="btn btn-primary w-full">
            ✨ Join the Council
          </button>
        </form>
        <p style="font-size: var(--text-xs); color: var(--text-muted); margin-top: var(--space-4); text-align: center;">
          No spam, just quantum wisdom. Unsubscribe anytime.
        </p>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Trigger open animation
    requestAnimationFrame(() => {
      modal.classList.add('active');
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });
  },
  
  closeModal() {
    const modal = document.getElementById('qrc-email-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  },
  
  async handleSubmit(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();
    
    if (!email) return;
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner spinner-sm"></span> Joining...';
    submitBtn.disabled = true;
    
    try {
      if (this.apiEndpoint) {
        // Send to PythonAnywhere
        const response = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        
        if (!response.ok) throw new Error('Signup failed');
      }
      
      // Track signup
      if (window.QRC_ANALYTICS) {
        QRC_ANALYTICS.trackEmailSignup('modal');
      }
      
      // Show success
      submitBtn.innerHTML = '✓ Welcome to the Council!';
      submitBtn.classList.remove('btn-primary');
      submitBtn.classList.add('btn-gold');
      
      // Store locally
      localStorage.setItem('qrc_email_subscribed', 'true');
      
      // Close after delay
      setTimeout(() => {
        this.closeModal();
      }, 2000);
      
    } catch (error) {
      console.error('Email signup error:', error);
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Show error
      const errorMsg = document.createElement('p');
      errorMsg.style.cssText = 'color: #ff4444; font-size: var(--text-sm); margin-top: var(--space-2);';
      errorMsg.textContent = 'Something went wrong. Please try again.';
      e.target.appendChild(errorMsg);
      
      setTimeout(() => errorMsg.remove(), 3000);
    }
  },
  
  /**
   * Check if should show signup prompt
   */
  shouldShowPrompt() {
    // Don't show if already subscribed
    if (localStorage.getItem('qrc_email_subscribed')) return false;
    
    // Don't show if dismissed recently (7 days)
    const dismissed = localStorage.getItem('qrc_email_dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSince = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) return false;
    }
    
    return true;
  },
  
  /**
   * Show prompt after tool usage
   */
  showPostToolPrompt() {
    if (!this.shouldShowPrompt()) return;
    
    // Show after a delay
    setTimeout(() => {
      this.showSignupModal();
    }, 3000);
  }
};

// Initialize floating button on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  QRC_DONATIONS.createFloatingButton();
});

// Export for usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QRC_DONATIONS, QRC_EMAIL };
}

// Make available globally
window.QRC_DONATIONS = QRC_DONATIONS;
window.QRC_EMAIL = QRC_EMAIL;
