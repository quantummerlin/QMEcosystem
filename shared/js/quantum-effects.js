/**
 * Quantum Reality Codes - Background Effects
 * Creates floating particles and manages background animations
 */

class QuantumBackground {
  constructor(container) {
    this.container = container || document.querySelector('.quantum-bg');
    if (!this.container) return;
    
    this.particleCount = 30;
    this.particles = [];
    
    this.init();
  }
  
  init() {
    this.createParticles();
    this.createStars();
  }
  
  createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    
    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() < 0.3 ? 'large' : (Math.random() < 0.5 ? 'small' : '');
      const color = Math.random() < 0.3 ? 'magenta' : (Math.random() < 0.2 ? 'gold' : '');
      
      if (size) particle.classList.add(size);
      if (color) particle.classList.add(color);
      
      // Random position and timing
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${15 + Math.random() * 20}s`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      
      particlesContainer.appendChild(particle);
      this.particles.push(particle);
    }
    
    this.container.appendChild(particlesContainer);
  }
  
  createStars() {
    const starfield = document.createElement('div');
    starfield.className = 'starfield';
    
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      if (Math.random() < 0.2) {
        star.classList.add('bright');
      }
      
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 60}%`; // Top 60% of screen
      star.style.animationDelay = `${Math.random() * 3}s`;
      
      starfield.appendChild(star);
    }
    
    this.container.appendChild(starfield);
  }
}

/**
 * Scroll Reveal Animation
 * Animates elements as they enter the viewport
 */
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
    if (!this.elements.length) return;
    
    this.init();
  }
  
  init() {
    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      }
    );
    
    // Observe all elements
    this.elements.forEach(el => this.observer.observe(el));
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing after reveal (one-time animation)
        this.observer.unobserve(entry.target);
      }
    });
  }
}

/**
 * Magnetic Hover Effect
 * Creates subtle 3D tilt effect on hover
 */
class MagneticHover {
  constructor(selector = '.card, .tool-card') {
    this.elements = document.querySelectorAll(selector);
    if (!this.elements.length) return;
    
    this.init();
  }
  
  init() {
    this.elements.forEach(el => {
      el.addEventListener('mousemove', (e) => this.handleMouseMove(e, el));
      el.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, el));
    });
  }
  
  handleMouseMove(e, el) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }
  
  handleMouseLeave(e, el) {
    el.style.transform = '';
  }
}

// Initialize all effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Create background only if container exists
  const bgContainer = document.querySelector('.quantum-bg');
  if (bgContainer) {
    new QuantumBackground(bgContainer);
  }
  
  // Initialize scroll reveal
  new ScrollReveal();
  
  // Initialize magnetic hover
  new MagneticHover();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QuantumBackground, ScrollReveal, MagneticHover };
}
