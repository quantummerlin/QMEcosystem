/**
 * QUANTUM MERLIN FRAMEWORK
 * Background Effects - Particles, Grid, Sun Initialization
 * Version: 1.0.0
 */

const QuantumBackgrounds = {
  // Configuration
  config: {
    particles: {
      count: 50,
      minSize: 2,
      maxSize: 4,
      minDuration: 10,
      maxDuration: 30,
      colors: ['#00f5ff', '#ff00ff', '#ffd700', '#9d00ff', '#00a8ff']
    },
    stars: {
      count: 100,
      minSize: 1,
      maxSize: 3
    }
  },

  /**
   * Initialize all background effects
   * @param {object} options - Configuration options
   */
  init(options = {}) {
    const config = { ...this.config, ...options };
    
    // Create containers if they don't exist
    this.createContainers();
    
    // Initialize effects
    if (config.particles) {
      this.initParticles(config.particles);
    }
    
    if (config.stars) {
      this.initStars(config.stars);
    }
    
    if (config.grid) {
      this.initGrid(config.grid);
    }
    
    if (config.sun) {
      this.initSun(config.sun);
    }
  },

  /**
   * Create background containers
   */
  createContainers() {
    // Check if containers already exist
    if (document.querySelector('.quantum-particles')) return;
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'quantum-particles';
    document.body.appendChild(particlesContainer);
    
    // Create starfield container
    const starfieldContainer = document.createElement('div');
    starfieldContainer.className = 'starfield';
    document.body.appendChild(starfieldContainer);
  },

  /**
   * Initialize floating particles
   * @param {object} config - Particle configuration
   */
  initParticles(config) {
    const container = document.querySelector('.quantum-particles');
    if (!container) return;
    
    // Clear existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < config.count; i++) {
      const particle = this.createParticle(config);
      container.appendChild(particle);
    }
  },

  /**
   * Create a single particle
   * @param {object} config - Particle configuration
   * @returns {HTMLElement} Particle element
   */
  createParticle(config) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    const color = config.colors[Math.floor(Math.random() * config.colors.length)];
    const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
    const delay = Math.random() * 5;
    const startX = Math.random() * 100;
    const drift = (Math.random() - 0.5) * 100;
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}%`;
    particle.style.setProperty('--particle-color', color);
    particle.style.setProperty('--drift', `${drift}px`);
    particle.style.animation = `particleFloat ${duration}s linear ${delay}s infinite`;
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    
    return particle;
  },

  /**
   * Initialize starfield
   * @param {object} config - Star configuration
   */
  initStars(config) {
    const container = document.querySelector('.starfield');
    if (!container) return;
    
    // Clear existing stars
    container.innerHTML = '';
    
    for (let i = 0; i < config.count; i++) {
      const star = this.createStar(config);
      container.appendChild(star);
    }
  },

  /**
   * Create a single star
   * @param {object} config - Star configuration
   * @returns {HTMLElement} Star element
   */
  createStar(config) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random properties
    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 3;
    
    // Apply styles
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.animationDelay = `${delay}s`;
    
    return star;
  },

  /**
   * Initialize grid floor
   * @param {object} config - Grid configuration
   */
  initGrid(config = {}) {
    const { color = 'cyan' } = config;
    
    // Check if grid already exists
    if (document.querySelector('.quantum-grid-floor')) return;
    
    const gridFloor = document.createElement('div');
    gridFloor.className = `quantum-grid-floor grid-${color}`;
    
    const gridLines = document.createElement('div');
    gridLines.className = 'grid-lines';
    
    gridFloor.appendChild(gridLines);
    document.body.appendChild(gridFloor);
  },

  /**
   * Initialize quantum sun
   * @param {object} config - Sun configuration
   */
  initSun(config = {}) {
    const { color = 'cyan' } = config;
    
    // Check if sun already exists
    if (document.querySelector('.quantum-sun')) return;
    
    const sun = document.createElement('div');
    sun.className = `quantum-sun sun-${color}`;
    
    const sunCore = document.createElement('div');
    sunCore.className = 'sun-core';
    
    const sunGlow = document.createElement('div');
    sunGlow.className = 'sun-glow';
    
    sun.appendChild(sunCore);
    sun.appendChild(sunGlow);
    document.body.appendChild(sun);
  },

  /**
   * Update particle color
   * @param {string} color - New color
   */
  updateParticleColor(color) {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      particle.style.setProperty('--particle-color', color);
      particle.style.boxShadow = `0 0 ${particle.offsetWidth * 2}px ${color}`;
    });
  },

  /**
   * Update grid color
   * @param {string} color - New color ('cyan', 'magenta', 'gold', etc.)
   */
  updateGridColor(color) {
    const grid = document.querySelector('.quantum-grid-floor');
    if (!grid) return;
    
    // Remove all color classes
    grid.className = 'quantum-grid-floor';
    // Add new color class
    grid.classList.add(`grid-${color}`);
  },

  /**
   * Update sun color
   * @param {string} color - New color ('cyan', 'magenta', 'gold', etc.)
   */
  updateSunColor(color) {
    const sun = document.querySelector('.quantum-sun');
    if (!sun) return;
    
    // Remove all color classes
    sun.className = 'quantum-sun';
    // Add new color class
    sun.classList.add(`sun-${color}`);
  },

  /**
   * Set theme colors for a tool
   * @param {string} primaryColor - Primary color name
   * @param {string} secondaryColor - Secondary color name (optional)
   */
  setTheme(primaryColor, secondaryColor = null) {
    this.updateGridColor(primaryColor);
    this.updateSunColor(primaryColor);
    
    // Update particle colors if secondary color provided
    if (secondaryColor) {
      const colors = [
        this.getColorHex(primaryColor),
        this.getColorHex(secondaryColor)
      ];
      
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        const color = colors[index % colors.length];
        particle.style.setProperty('--particle-color', color);
        particle.style.boxShadow = `0 0 ${particle.offsetWidth * 2}px ${color}`;
      });
    }
  },

  /**
   * Get hex color from color name
   * @param {string} colorName - Color name
   * @returns {string} Hex color
   */
  getColorHex(colorName) {
    const colors = {
      cyan: '#00f5ff',
      magenta: '#ff00ff',
      gold: '#ffd700',
      purple: '#9d00ff',
      blue: '#00a8ff',
      pink: '#ff1493',
      orange: '#ff6b35',
      green: '#00ff88',
      violet: '#8a2be2',
      red: '#ff0055'
    };
    
    return colors[colorName] || colors.cyan;
  },

  /**
   * Toggle particles on/off
   * @param {boolean} enabled - Whether particles are enabled
   */
  toggleParticles(enabled) {
    const container = document.querySelector('.quantum-particles');
    if (!container) return;
    
    container.style.display = enabled ? 'block' : 'none';
  },

  /**
   * Toggle stars on/off
   * @param {boolean} enabled - Whether stars are enabled
   */
  toggleStars(enabled) {
    const container = document.querySelector('.starfield');
    if (!container) return;
    
    container.style.display = enabled ? 'block' : 'none';
  },

  /**
   * Add aurora effect
   * @param {string} color1 - First aurora color
   * @param {string} color2 - Second aurora color
   */
  addAurora(color1 = 'cyan', color2 = 'magenta') {
    // Check if aurora already exists
    if (document.querySelector('.aurora')) return;
    
    const aurora = document.createElement('div');
    aurora.className = 'aurora';
    aurora.style.setProperty('--aurora-color-1', this.getColorHex(color1));
    aurora.style.setProperty('--aurora-color-2', this.getColorHex(color2));
    
    // Create three layers
    for (let i = 0; i < 3; i++) {
      const layer = document.createElement('div');
      layer.className = 'aurora-layer';
      aurora.appendChild(layer);
    }
    
    document.body.appendChild(aurora);
  },

  /**
   * Remove aurora effect
   */
  removeAurora() {
    const aurora = document.querySelector('.aurora');
    if (aurora) {
      aurora.remove();
    }
  },

  /**
   * Add scanlines effect
   */
  addScanlines() {
    if (document.querySelector('.scanlines')) return;
    
    const scanlines = document.createElement('div');
    scanlines.className = 'scanlines';
    document.body.appendChild(scanlines);
  },

  /**
   * Remove scanlines effect
   */
  removeScanlines() {
    const scanlines = document.querySelector('.scanlines');
    if (scanlines) {
      scanlines.remove();
    }
  },

  /**
   * Clean up all background effects
   */
  cleanup() {
    const elements = [
      '.quantum-particles',
      '.starfield',
      '.quantum-grid-floor',
      '.quantum-sun',
      '.aurora',
      '.scanlines'
    ];
    
    elements.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.remove();
      }
    });
  }
};

// Auto-initialize with default settings when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      QuantumBackgrounds.init();
    });
  } else {
    QuantumBackgrounds.init();
  }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuantumBackgrounds;
}