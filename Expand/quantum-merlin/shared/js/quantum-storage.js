/**
 * QUANTUM MERLIN FRAMEWORK
 * Storage Management - localStorage CRUD Operations
 * Version: 1.0.0
 */

const QuantumStorage = {
  // Storage keys
  KEYS: {
    FREQUENCIES: 'quantum_frequencies',
    CODES: 'quantum_codes',
    SIGILS: 'quantum_sigils',
    TAROT: 'quantum_tarot',
    GRIMOIRE: 'quantum_grimoire',
    ANGELS: 'quantum_angels',
    SYNC: 'quantum_sync',
    NAMES: 'quantum_names',
    PREFERENCES: 'quantum_preferences',
    EXPORT_UNLOCKED: 'quantum_export_unlocked'
  },

  /**
   * Initialize storage with default structure
   */
  init() {
    Object.values(this.KEYS).forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify([]));
      }
    });
    
    // Initialize preferences if not exists
    if (!localStorage.getItem(this.KEYS.PREFERENCES)) {
      localStorage.setItem(this.KEYS.PREFERENCES, JSON.stringify({
        theme: 'default',
        soundEnabled: true,
        particlesEnabled: true,
        lastVisit: new Date().toISOString()
      }));
    }
  },

  /**
   * Save an item to storage
   * @param {string} key - Storage key
   * @param {object} item - Item to save
   * @returns {object} Saved item with ID and timestamp
   */
  save(key, item) {
    const items = this.getAll(key);
    const newItem = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      ...item
    };
    items.push(newItem);
    localStorage.setItem(key, JSON.stringify(items));
    return newItem;
  },

  /**
   * Get all items from storage
   * @param {string} key - Storage key
   * @returns {array} Array of items
   */
  getAll(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from storage:', error);
      return [];
    }
  },

  /**
   * Get a single item by ID
   * @param {string} key - Storage key
   * @param {string} id - Item ID
   * @returns {object|null} Item or null if not found
   */
  getById(key, id) {
    const items = this.getAll(key);
    return items.find(item => item.id === id) || null;
  },

  /**
   * Update an item
   * @param {string} key - Storage key
   * @param {string} id - Item ID
   * @param {object} updates - Updates to apply
   * @returns {object|null} Updated item or null if not found
   */
  update(key, id, updates) {
    const items = this.getAll(key);
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(key, JSON.stringify(items));
    return items[index];
  },

  /**
   * Delete an item
   * @param {string} key - Storage key
   * @param {string} id - Item ID
   * @returns {boolean} Success status
   */
  delete(key, id) {
    const items = this.getAll(key);
    const filtered = items.filter(item => item.id !== id);
    
    if (filtered.length === items.length) return false;
    
    localStorage.setItem(key, JSON.stringify(filtered));
    return true;
  },

  /**
   * Search items by query
   * @param {string} key - Storage key
   * @param {string} query - Search query
   * @returns {array} Matching items
   */
  search(key, query) {
    const items = this.getAll(key);
    const lowerQuery = query.toLowerCase();
    
    return items.filter(item => {
      return Object.values(item).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerQuery);
        }
        return false;
      });
    });
  },

  /**
   * Filter items by criteria
   * @param {string} key - Storage key
   * @param {function} predicate - Filter function
   * @returns {array} Filtered items
   */
  filter(key, predicate) {
    const items = this.getAll(key);
    return items.filter(predicate);
  },

  /**
   * Sort items
   * @param {string} key - Storage key
   * @param {string} field - Field to sort by
   * @param {string} order - 'asc' or 'desc'
   * @returns {array} Sorted items
   */
  sort(key, field, order = 'desc') {
    const items = this.getAll(key);
    return items.sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      
      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  },

  /**
   * Get recent items
   * @param {string} key - Storage key
   * @param {number} limit - Number of items to return
   * @returns {array} Recent items
   */
  getRecent(key, limit = 10) {
    const items = this.sort(key, 'timestamp', 'desc');
    return items.slice(0, limit);
  },

  /**
   * Link items together
   * @param {string} sourceKey - Source storage key
   * @param {string} sourceId - Source item ID
   * @param {string} targetKey - Target storage key
   * @param {string} targetId - Target item ID
   * @returns {boolean} Success status
   */
  link(sourceKey, sourceId, targetKey, targetId) {
    const sourceItem = this.getById(sourceKey, sourceId);
    if (!sourceItem) return false;
    
    if (!sourceItem.links) {
      sourceItem.links = [];
    }
    
    sourceItem.links.push({
      key: targetKey,
      id: targetId,
      timestamp: new Date().toISOString()
    });
    
    return this.update(sourceKey, sourceId, { links: sourceItem.links }) !== null;
  },

  /**
   * Get linked items
   * @param {string} key - Storage key
   * @param {string} id - Item ID
   * @returns {array} Linked items
   */
  getLinked(key, id) {
    const item = this.getById(key, id);
    if (!item || !item.links) return [];
    
    return item.links.map(link => {
      const linkedItem = this.getById(link.key, link.id);
      return linkedItem ? { ...linkedItem, linkType: link.key } : null;
    }).filter(Boolean);
  },

  /**
   * Add tags to an item
   * @param {string} key - Storage key
   * @param {string} id - Item ID
   * @param {array} tags - Tags to add
   * @returns {boolean} Success status
   */
  addTags(key, id, tags) {
    const item = this.getById(key, id);
    if (!item) return false;
    
    const currentTags = item.tags || [];
    const newTags = [...new Set([...currentTags, ...tags])];
    
    return this.update(key, id, { tags: newTags }) !== null;
  },

  /**
   * Get items by tag
   * @param {string} key - Storage key
   * @param {string} tag - Tag to filter by
   * @returns {array} Items with the tag
   */
  getByTag(key, tag) {
    return this.filter(key, item => {
      return item.tags && item.tags.includes(tag);
    });
  },

  /**
   * Export all data
   * @returns {object} All storage data
   */
  exportAll() {
    const data = {};
    Object.entries(this.KEYS).forEach(([name, key]) => {
      data[name] = this.getAll(key);
    });
    return data;
  },

  /**
   * Import data
   * @param {object} data - Data to import
   * @param {boolean} merge - Whether to merge with existing data
   * @returns {boolean} Success status
   */
  importData(data, merge = false) {
    try {
      Object.entries(data).forEach(([name, items]) => {
        const key = this.KEYS[name];
        if (!key) return;
        
        if (merge) {
          const existing = this.getAll(key);
          const merged = [...existing, ...items];
          localStorage.setItem(key, JSON.stringify(merged));
        } else {
          localStorage.setItem(key, JSON.stringify(items));
        }
      });
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },

  /**
   * Clear all data
   * @param {string} key - Optional specific key to clear
   */
  clear(key = null) {
    if (key) {
      localStorage.setItem(key, JSON.stringify([]));
    } else {
      Object.values(this.KEYS).forEach(k => {
        localStorage.setItem(k, JSON.stringify([]));
      });
    }
  },

  /**
   * Get storage statistics
   * @returns {object} Storage stats
   */
  getStats() {
    const stats = {};
    Object.entries(this.KEYS).forEach(([name, key]) => {
      const items = this.getAll(key);
      stats[name] = {
        count: items.length,
        size: new Blob([JSON.stringify(items)]).size
      };
    });
    
    const totalSize = Object.values(stats).reduce((sum, stat) => sum + stat.size, 0);
    const totalCount = Object.values(stats).reduce((sum, stat) => sum + stat.count, 0);
    
    return {
      ...stats,
      total: {
        count: totalCount,
        size: totalSize,
        sizeFormatted: this.formatBytes(totalSize)
      }
    };
  },

  /**
   * Check if export is unlocked
   * @returns {boolean} Export unlock status
   */
  isExportUnlocked() {
    return localStorage.getItem(this.KEYS.EXPORT_UNLOCKED) === 'true';
  },

  /**
   * Unlock export feature
   */
  unlockExport() {
    localStorage.setItem(this.KEYS.EXPORT_UNLOCKED, 'true');
  },

  /**
   * Get or set preferences
   * @param {object} updates - Optional updates to apply
   * @returns {object} Current preferences
   */
  preferences(updates = null) {
    const current = JSON.parse(localStorage.getItem(this.KEYS.PREFERENCES) || '{}');
    
    if (updates) {
      const updated = { ...current, ...updates };
      localStorage.setItem(this.KEYS.PREFERENCES, JSON.stringify(updated));
      return updated;
    }
    
    return current;
  },

  /**
   * Generate unique ID
   * @returns {string} Unique ID
   */
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Format bytes to human readable
   * @param {number} bytes - Bytes to format
   * @returns {string} Formatted string
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
};

// Initialize storage on load
if (typeof window !== 'undefined') {
  QuantumStorage.init();
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuantumStorage;
}