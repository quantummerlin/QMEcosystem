/**
 * Quantum Reality Codes - Navigation Component
 * Handles menu toggle, scroll effects, and dropdown
 */

class QuantumNav {
  constructor() {
    this.header = document.querySelector('.qrc-header');
    this.toggle = document.querySelector('.qrc-nav-toggle');
    this.dropdown = document.querySelector('.qrc-nav-dropdown');
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    // Toggle menu
    if (this.toggle && this.dropdown) {
      this.toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMenu();
      });
      
      // Close on outside click
      document.addEventListener('click', (e) => {
        if (this.isOpen && !this.dropdown.contains(e.target)) {
          this.closeMenu();
        }
      });
      
      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeMenu();
        }
      });
    }
    
    // Scroll effects
    if (this.header) {
      window.addEventListener('scroll', () => this.handleScroll());
      this.handleScroll(); // Check initial state
    }
  }
  
  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.toggle.classList.toggle('active', this.isOpen);
    this.dropdown.classList.toggle('active', this.isOpen);
  }
  
  closeMenu() {
    this.isOpen = false;
    this.toggle.classList.remove('active');
    this.dropdown.classList.remove('active');
  }
  
  handleScroll() {
    const scrolled = window.scrollY > 50;
    this.header.classList.toggle('scrolled', scrolled);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new QuantumNav();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuantumNav;
}
