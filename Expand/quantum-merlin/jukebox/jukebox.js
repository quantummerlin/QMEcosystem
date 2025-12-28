/**
 * QUANTUM JUKEBOX
 * Unified Library for All Quantum Creations
 */

class QuantumJukebox {
    constructor() {
        // Current state
        this.currentFilter = 'all';
        this.currentSort = 'newest';
        this.searchQuery = '';
        this.allItems = [];
        
        // Type configurations
        this.typeConfig = {
            frequency: {
                icon: '🎵',
                color: '#00f5ff',
                glow: 'rgba(0, 245, 255, 0.3)',
                label: 'Frequency'
            },
            reality_code: {
                icon: '✨',
                color: '#ff00ff',
                glow: 'rgba(255, 0, 255, 0.3)',
                label: 'Reality Code'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadAllItems();
        this.updateStats();
        
        // Initialize backgrounds with gold theme
        QuantumBackgrounds.init({
            particles: {
                count: 50,
                colors: ['#ffd700', '#ff6b35']
            },
            stars: { count: 100 },
            grid: { color: 'gold' },
            sun: { color: 'gold' }
        });
    }
    
    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentFilter = btn.dataset.filter;
                this.updateFilterButtons(btn);
                this.renderItems();
            });
        });
        
        // Sort select
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderItems();
        });
        
        // Search input
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderItems();
        });
        
        // Export/Import buttons
        document.getElementById('exportBtn').addEventListener('click', () => this.exportData());
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        document.getElementById('importFile').addEventListener('change', (e) => this.importData(e));
        
        // Clear all button
        document.getElementById('clearAllBtn').addEventListener('click', () => this.clearAll());
    }
    
    loadAllItems() {
        this.allItems = [];
        
        // Load frequencies
        const frequencies = QuantumStorage.getAll(QuantumStorage.KEYS.FREQUENCIES);
        frequencies.forEach(freq => {
            this.allItems.push({
                ...freq,
                type: 'frequency',
                searchText: `${freq.name} ${freq.frequency}`.toLowerCase()
            });
        });
        
        // Load reality codes
        const codes = QuantumStorage.getAll(QuantumStorage.KEYS.CODES);
        codes.forEach(code => {
            this.allItems.push({
                ...code,
                type: 'reality_code',
                searchText: `${code.text} ${code.gematriaValue}`.toLowerCase()
            });
        });
        
        this.renderItems();
    }
    
    updateStats() {
        const stats = QuantumStorage.getStats();
        
        document.getElementById('frequencyCount').textContent = stats.FREQUENCIES?.count || 0;
        document.getElementById('codeCount').textContent = stats.CODES?.count || 0;
        document.getElementById('totalCount').textContent = stats.total?.count || 0;
        document.getElementById('storageSize').textContent = stats.total?.sizeFormatted || '0 KB';
    }
    
    filterItems() {
        let filtered = this.allItems;
        
        // Apply type filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(item => item.type === this.currentFilter);
        }
        
        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(item => 
                item.searchText.includes(this.searchQuery)
            );
        }
        
        return filtered;
    }
    
    sortItems(items) {
        const sorted = [...items];
        
        switch (this.currentSort) {
            case 'newest':
                sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                break;
            case 'oldest':
                sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                break;
            case 'name':
                sorted.sort((a, b) => {
                    const aName = a.name || a.text || '';
                    const bName = b.name || b.text || '';
                    return aName.localeCompare(bName);
                });
                break;
        }
        
        return sorted;
    }
    
    renderItems() {
        const container = document.getElementById('libraryItems');
        const filtered = this.filterItems();
        const sorted = this.sortItems(filtered);
        
        if (sorted.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📻</div>
                    <h3 style="color: var(--quantum-gold); margin-bottom: var(--space-md);">
                        Your Jukebox is Empty
                    </h3>
                    <p style="color: var(--quantum-gray); margin-bottom: var(--space-xl);">
                        Start creating frequencies and reality codes to build your quantum library!
                    </p>
                    <div style="display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap;">
                        <a href="../genesis/index.html" class="btn btn-primary">
                            🎵 Create Frequency
                        </a>
                        <a href="../codes/index.html" class="btn btn-secondary">
                            ✨ Create Code
                        </a>
                    </div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = sorted.map(item => this.renderItem(item)).join('');
    }
    
    renderItem(item) {
        const config = this.typeConfig[item.type];
        
        if (item.type === 'frequency') {
            return this.renderFrequency(item, config);
        } else if (item.type === 'reality_code') {
            return this.renderCode(item, config);
        }
        
        return '';
    }
    
    renderFrequency(freq, config) {
        return `
            <div class="library-item" style="--item-color: ${config.color}; --item-glow: ${config.glow};">
                <span class="item-type-badge" style="background: ${config.color};">
                    ${config.icon} ${config.label}
                </span>
                
                <div class="item-header">
                    <div style="flex: 1;">
                        <h3 class="item-title">${freq.name || `${freq.frequency} Hz Frequency`}</h3>
                        <div class="item-meta">
                            <span>${freq.frequency} Hz</span>
                            ${freq.binaural.enabled ? `<span>Binaural: ${freq.binaural.beat} Hz</span>` : ''}
                            ${freq.isochronic.enabled ? `<span>Isochronic: ${freq.isochronic.rate} Hz</span>` : ''}
                            <span>${new Date(freq.timestamp).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="item-actions">
                    <button class="btn btn-primary btn-sm" onclick="jukebox.openFrequency('${freq.id}')">
                        ▶️ Open
                    </button>
                    <button class="btn btn-ghost btn-sm" onclick="jukebox.deleteItem('frequency', '${freq.id}')">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
    }
    
    renderCode(code, config) {
        return `
            <div class="library-item" style="--item-color: ${config.color}; --item-glow: ${config.glow};">
                <span class="item-type-badge" style="background: ${config.color};">
                    ${config.icon} ${config.label}
                </span>
                
                <div class="item-header">
                    <div style="flex: 1;">
                        <h3 class="item-title">${code.text}</h3>
                        <div class="item-meta">
                            <span>Gematria: ${code.gematriaValue}</span>
                            <span>Reduced: ${code.reducedValue}</span>
                            <span>Words: ${code.wordCount}</span>
                            <span>${new Date(code.timestamp).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                
                ${code.suggestedFrequencies ? `
                    <div class="item-content">
                        <strong style="color: var(--quantum-cyan);">Suggested Frequencies:</strong>
                        ${code.suggestedFrequencies.map(f => `${f.freq} Hz (${f.name})`).join(', ')}
                    </div>
                ` : ''}
                
                <div class="item-actions">
                    <button class="btn btn-primary btn-sm" onclick="jukebox.openCode('${code.id}')">
                        ✨ Open
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="jukebox.openCodeInFrequency('${code.id}')">
                        🎵 Create Frequency
                    </button>
                    <button class="btn btn-ghost btn-sm" onclick="jukebox.deleteItem('reality_code', '${code.id}')">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
    }
    
    openFrequency(id) {
        QuantumNavigation.navigateTo('genesis', { loadId: id });
    }
    
    openCode(id) {
        QuantumNavigation.navigateTo('codes', { loadId: id });
    }
    
    openCodeInFrequency(id) {
        const code = QuantumStorage.getById(QuantumStorage.KEYS.CODES, id);
        if (!code || !code.suggestedFrequencies) return;
        
        const topFreq = code.suggestedFrequencies[0].freq;
        QuantumNavigation.navigateTo('genesis', {
            frequency: topFreq,
            source: 'jukebox',
            code: code.text
        });
    }
    
    deleteItem(type, id) {
        const typeLabel = type === 'frequency' ? 'frequency' : 'reality code';
        
        if (confirm(`Are you sure you want to delete this ${typeLabel}?`)) {
            const key = type === 'frequency' 
                ? QuantumStorage.KEYS.FREQUENCIES 
                : QuantumStorage.KEYS.CODES;
            
            QuantumStorage.delete(key, id);
            this.loadAllItems();
            this.updateStats();
        }
    }
    
    clearAll() {
        if (confirm('Are you sure you want to delete ALL items from your library? This cannot be undone!')) {
            QuantumStorage.clear(QuantumStorage.KEYS.FREQUENCIES);
            QuantumStorage.clear(QuantumStorage.KEYS.CODES);
            this.loadAllItems();
            this.updateStats();
        }
    }
    
    exportData() {
        const data = QuantumStorage.exportAll();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `quantum-merlin-backup-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('✨ Data exported successfully!');
    }
    
    importData(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                const merge = confirm(
                    'Do you want to MERGE with existing data?\n\n' +
                    'Click OK to merge (keep existing + add new)\n' +
                    'Click Cancel to replace (delete existing)'
                );
                
                const success = QuantumStorage.importData(data, merge);
                
                if (success) {
                    alert('✨ Data imported successfully!');
                    this.loadAllItems();
                    this.updateStats();
                } else {
                    alert('❌ Error importing data. Please check the file format.');
                }
            } catch (error) {
                alert('❌ Error parsing file. Please ensure it\'s a valid JSON file.');
                console.error('Import error:', error);
            }
        };
        
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    }
    
    updateFilterButtons(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
}

// Initialize jukebox
const jukebox = new QuantumJukebox();