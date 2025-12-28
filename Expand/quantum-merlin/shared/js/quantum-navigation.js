/**
 * QUANTUM MERLIN FRAMEWORK
 * Navigation System - Cross-tool navigation with data passing
 * Version: 1.0.0
 */

const QuantumNavigation = {
  // Tool registry
  tools: {
    hub: {
      name: 'Quantum Merlin Hub',
      url: 'https://quantummerlin.com',
      color: 'cyan',
      icon: '🔮'
    },
    genesis: {
      name: 'Frequency Generator',
      url: 'https://genesis.quantummerlin.com',
      color: 'cyan',
      icon: '🎵'
    },
    codes: {
      name: 'Reality Codes',
      url: 'https://codes.quantummerlin.com',
      color: 'magenta',
      icon: '✨'
    },
    jukebox: {
      name: 'Quantum Jukebox',
      url: 'https://jukebox.quantummerlin.com',
      color: 'gold',
      icon: '📻'
    },
    dramaggia: {
      name: 'Gematria Calculator',
      url: 'https://dramaggia.quantummerlin.com',
      color: 'purple',
      icon: '🔢'
    },
    tarot: {
      name: 'Quantum Tarot',
      url: 'https://tarot.quantummerlin.com',
      color: 'magenta',
      icon: '🃏'
    },
    sigils: {
      name: 'Sigil Creator',
      url: 'https://sigils.quantummerlin.com',
      color: 'gold',
      icon: '🔯'
    },
    angels: {
      name: 'Angel Numbers',
      url: 'https://angels.quantummerlin.com',
      color: 'cyan',
      icon: '👼'
    },
    names: {
      name: 'Name Analyzer',
      url: 'https://names.quantummerlin.com',
      color: 'purple',
      icon: '📛'
    },
    grimoire: {
      name: 'Quantum Grimoire',
      url: 'https://grimoire.quantummerlin.com',
      color: 'purple',
      icon: '📖'
    },
    sync: {
      name: 'Synchronicity Tracker',
      url: 'https://sync.quantummerlin.com',
      color: 'cyan',
      icon: '🔄'
    },
    timeline: {
      name: 'Timeline Predictor',
      url: 'https://timeline.quantummerlin.com',
      color: 'cyan',
      icon: '⏰'
    },
    compatibility: {
      name: 'Compatibility Analyzer',
      url: 'https://compatibility.quantummerlin.com',
      color: 'magenta',
      icon: '💕'
    },
    decision: {
      name: 'Decision Helper',
      url: 'https://decision.quantummerlin.com',
      color: 'gold',
      icon: '🎯'
    },
    visualizer: {
      name: 'Reality Visualizer',
      url: 'https://visualizer.quantummerlin.com',
      color: 'magenta',
      icon: '🌌'
    },
    zodiac: {
      name: 'Quantum Zodiac',
      url: 'https://zodiac.quantummerlin.com',
      color: 'cyan',
      icon: '♈'
    },
    chinese: {
      name: 'Chinese Zodiac',
      url: 'https://chinese.quantummerlin.com',
      color: 'gold',
      icon: '🐉'
    }
  },

  /**
   * Navigate to a tool with optional data
   * @param {string} toolKey - Tool key from registry
   * @param {object} data - Optional data to pass
   */
  navigateTo(toolKey, data = null) {
    const tool = this.tools[toolKey];
    if (!tool) {
      console.error(`Tool '${toolKey}' not found in registry`);
      return;
    }

    // Store data in sessionStorage if provided
    if (data) {
      sessionStorage.setItem('quantum_transfer_data', JSON.stringify({
        from: this.getCurrentTool(),
        to: toolKey,
        data: data,
        timestamp: new Date().toISOString()
      }));
    }

    // Navigate to tool
    window.location.href = tool.url;
  },

  /**
   * Get transferred data (call this on page load)
   * @returns {object|null} Transferred data or null
   */
  getTransferredData() {
    const dataStr = sessionStorage.getItem('quantum_transfer_data');
    if (!dataStr) return null;

    try {
      const data = JSON.parse(dataStr);
      // Clear after reading
      sessionStorage.removeItem('quantum_transfer_data');
      return data;
    } catch (error) {
      console.error('Error parsing transferred data:', error);
      return null;
    }
  },

  /**
   * Get current tool key based on hostname
   * @returns {string} Current tool key
   */
  getCurrentTool() {
    const hostname = window.location.hostname;
    
    // Check for subdomain
    const subdomain = hostname.split('.')[0];
    if (this.tools[subdomain]) {
      return subdomain;
    }
    
    // Default to hub
    return 'hub';
  },

  /**
   * Get tool information
   * @param {string} toolKey - Tool key
   * @returns {object|null} Tool information
   */
  getTool(toolKey) {
    return this.tools[toolKey] || null;
  },

  /**
   * Get all tools
   * @returns {object} All tools
   */
  getAllTools() {
    return this.tools;
  },

  /**
   * Get tools by color
   * @param {string} color - Color name
   * @returns {array} Tools with that color
   */
  getToolsByColor(color) {
    return Object.entries(this.tools)
      .filter(([key, tool]) => tool.color === color)
      .map(([key, tool]) => ({ key, ...tool }));
  },

  /**
   * Create navigation menu
   * @param {string} containerId - Container element ID
   * @param {array} toolKeys - Optional array of specific tools to show
   */
  createMenu(containerId, toolKeys = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const currentTool = this.getCurrentTool();
    const toolsToShow = toolKeys 
      ? toolKeys.map(key => ({ key, ...this.tools[key] }))
      : Object.entries(this.tools).map(([key, tool]) => ({ key, ...tool }));

    const nav = document.createElement('nav');
    nav.className = 'nav';

    toolsToShow.forEach(({ key, name, icon, color }) => {
      const link = document.createElement('a');
      link.href = this.tools[key].url;
      link.className = `nav-link ${key === currentTool ? 'active' : ''}`;
      link.innerHTML = `${icon} ${name}`;
      link.style.setProperty('--tool-color', this.getColorHex(color));
      
      nav.appendChild(link);
    });

    container.appendChild(nav);
  },

  /**
   * Create tool grid for hub page
   * @param {string} containerId - Container element ID
   */
  createToolGrid(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const grid = document.createElement('div');
    grid.className = 'tool-grid';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
    grid.style.gap = 'var(--space-lg)';

    Object.entries(this.tools).forEach(([key, tool]) => {
      if (key === 'hub') return; // Skip hub itself

      const card = document.createElement('a');
      card.href = tool.url;
      card.className = 'card hover-lift';
      card.style.textDecoration = 'none';
      card.style.cursor = 'pointer';

      const icon = document.createElement('div');
      icon.style.fontSize = 'var(--text-5xl)';
      icon.style.marginBottom = 'var(--space-md)';
      icon.textContent = tool.icon;

      const title = document.createElement('h3');
      title.textContent = tool.name;
      title.style.color = this.getColorHex(tool.color);

      card.appendChild(icon);
      card.appendChild(title);
      grid.appendChild(card);
    });

    container.appendChild(grid);
  },

  /**
   * Create breadcrumb navigation
   * @param {string} containerId - Container element ID
   * @param {array} path - Array of tool keys representing the path
   */
  createBreadcrumb(containerId, path) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const breadcrumb = document.createElement('nav');
    breadcrumb.className = 'breadcrumb';
    breadcrumb.style.display = 'flex';
    breadcrumb.style.gap = 'var(--space-sm)';
    breadcrumb.style.alignItems = 'center';

    path.forEach((toolKey, index) => {
      const tool = this.tools[toolKey];
      if (!tool) return;

      if (index > 0) {
        const separator = document.createElement('span');
        separator.textContent = '→';
        separator.style.color = 'var(--quantum-gray)';
        breadcrumb.appendChild(separator);
      }

      const link = document.createElement('a');
      link.href = tool.url;
      link.textContent = `${tool.icon} ${tool.name}`;
      link.style.color = this.getColorHex(tool.color);
      
      if (index === path.length - 1) {
        link.style.fontWeight = 'bold';
      }

      breadcrumb.appendChild(link);
    });

    container.appendChild(breadcrumb);
  },

  /**
   * Get color hex from color name
   * @param {string} colorName - Color name
   * @returns {string} Hex color
   */
  getColorHex(colorName) {
    const colors = {
      cyan: '#00f5ff',
      magenta: '#ff00ff',
      gold: '#ffd700',
      purple: '#9d00ff',
      blue: '#00a8ff'
    };
    
    return colors[colorName] || colors.cyan;
  },

  /**
   * Suggest related tools based on current tool
   * @param {string} currentToolKey - Current tool key
   * @returns {array} Array of suggested tool keys
   */
  getSuggestions(currentToolKey) {
    const suggestions = {
      genesis: ['codes', 'visualizer', 'jukebox'],
      codes: ['genesis', 'dramaggia', 'sigils', 'jukebox'],
      dramaggia: ['codes', 'names', 'angels'],
      tarot: ['grimoire', 'sync', 'decision'],
      sigils: ['codes', 'grimoire', 'visualizer'],
      angels: ['sync', 'timeline', 'grimoire'],
      names: ['dramaggia', 'compatibility', 'zodiac'],
      grimoire: ['tarot', 'sigils', 'sync'],
      sync: ['timeline', 'angels', 'grimoire'],
      timeline: ['sync', 'decision', 'zodiac'],
      compatibility: ['names', 'zodiac', 'chinese'],
      decision: ['tarot', 'timeline', 'sync'],
      visualizer: ['genesis', 'codes', 'grimoire'],
      zodiac: ['chinese', 'compatibility', 'timeline'],
      chinese: ['zodiac', 'compatibility', 'names'],
      jukebox: ['genesis', 'codes', 'grimoire']
    };

    return suggestions[currentToolKey] || ['hub'];
  },

  /**
   * Create suggestion cards
   * @param {string} containerId - Container element ID
   * @param {string} currentToolKey - Current tool key
   */
  createSuggestions(containerId, currentToolKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const suggestions = this.getSuggestions(currentToolKey);
    
    const title = document.createElement('h3');
    title.textContent = 'Explore More Tools';
    title.style.marginBottom = 'var(--space-lg)';
    container.appendChild(title);

    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    grid.style.gap = 'var(--space-md)';

    suggestions.forEach(toolKey => {
      const tool = this.tools[toolKey];
      if (!tool) return;

      const card = document.createElement('a');
      card.href = tool.url;
      card.className = 'card hover-lift';
      card.style.textDecoration = 'none';
      card.style.padding = 'var(--space-lg)';
      card.style.textAlign = 'center';

      const icon = document.createElement('div');
      icon.style.fontSize = 'var(--text-4xl)';
      icon.style.marginBottom = 'var(--space-sm)';
      icon.textContent = tool.icon;

      const name = document.createElement('div');
      name.textContent = tool.name;
      name.style.color = this.getColorHex(tool.color);
      name.style.fontWeight = 'bold';

      card.appendChild(icon);
      card.appendChild(name);
      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuantumNavigation;
}