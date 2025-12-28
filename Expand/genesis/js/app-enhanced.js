/**
 * Quantum Frequency Generator - Enhanced Application
 * Main application logic with multi-layer support and track browser
 */

class QuantumFrequencyApp {
    constructor() {
        this.audioEngine = new QuantumAudioEngine();
        this.visualizer = new QuantumVisualizer('visualizer-canvas', this.audioEngine);
        this.currentCategory = 'all';
        this.currentTrack = null;
        
        this.init();
    }
    
    init() {
        console.log('🚀 Initializing Quantum Frequency Generator...');
        
        // Initialize UI
        this.initializeTrackBrowser();
        this.initializeCategoryTabs();
        this.initializeSearch();
        this.initializeMasterControls();
        this.initializeLayerControls();
        
        // Load default configuration
        this.loadDefaultConfiguration();
        
        // Show welcome message
        this.showWelcomeMessage();
        
        console.log('✅ Quantum Frequency Generator initialized');
    }
    
    initializeTrackBrowser() {
        this.renderTrackList();
    }
    
    renderTrackList(tracks = null) {
        const trackList = document.getElementById('track-list');
        if (!trackList) return;
        
        // Get tracks to display
        let displayTracks = tracks;
        if (!displayTracks) {
            if (this.currentCategory === 'all') {
                displayTracks = FrequencyDatabase.tracks;
            } else if (this.currentCategory === 'featured') {
                displayTracks = FrequencyDatabase.getFeaturedTracks();
            } else {
                displayTracks = FrequencyDatabase.getTracksByCategory(this.currentCategory);
            }
        }
        
        // Sort by play count
        displayTracks = [...displayTracks].sort((a, b) => b.playCount - a.playCount);
        
        // Render tracks
        trackList.innerHTML = displayTracks.map(track => `
            <div class="track-card ${track.featured ? 'featured' : ''}" 
                 data-track-id="${track.id}">
                <div class="track-name">${track.name}</div>
                <div class="track-meta">
                    <span class="track-plays">
                        ▶️ ${track.playCount.toLocaleString()}
                    </span>
                    <span>${this.formatDuration(track.duration)}</span>
                </div>
                <div class="track-description">${track.description}</div>
                <div class="track-frequencies">
                    ${track.frequencies.slice(0, 5).map(freq => 
                        `<span class="freq-badge">${freq}Hz</span>`
                    ).join('')}
                    ${track.frequencies.length > 5 ? 
                        `<span class="freq-badge">+${track.frequencies.length - 5}</span>` : ''}
                </div>
            </div>
        `).join('');
        
        // Add click handlers
        trackList.querySelectorAll('.track-card').forEach(card => {
            card.addEventListener('click', () => {
                const trackId = card.dataset.trackId;
                this.loadTrack(trackId);
            });
        });
    }
    
    initializeCategoryTabs() {
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active state
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update category
                this.currentCategory = tab.dataset.category;
                
                // Re-render track list
                this.renderTrackList();
            });
        });
    }
    
    initializeSearch() {
        const searchInput = document.getElementById('track-search');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            if (query.length === 0) {
                this.renderTrackList();
            } else {
                const results = FrequencyDatabase.searchTracks(query);
                this.renderTrackList(results);
            }
        });
    }
    
    initializeMasterControls() {
        // Play button
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                this.audioEngine.startAll();
                this.visualizer.start();
                playBtn.textContent = '⏸️ Pause';
                this.showMessage('🎵 Playing all frequencies...', 'merlin');
            });
        }
        
        // Stop button
        const stopBtn = document.getElementById('stop-btn');
        if (stopBtn) {
            stopBtn.addEventListener('click', () => {
                this.audioEngine.stopAll();
                this.visualizer.stop();
                if (playBtn) playBtn.textContent = '▶️ Play All';
                this.showMessage('⏹️ Stopped playback', 'merlin');
            });
        }
        
        // Save button
        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveSession();
            });
        }
        
        // Export button
        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportSession();
            });
        }
        
        // Master volume
        const masterVolume = document.getElementById('master-volume');
        const masterVolumeValue = document.getElementById('master-volume-value');
        if (masterVolume && masterVolumeValue) {
            masterVolume.addEventListener('input', (e) => {
                const volume = e.target.value / 100;
                this.audioEngine.setMasterVolume(volume);
                masterVolumeValue.textContent = e.target.value + '%';
            });
        }
        
        // Add layer button
        const addLayerBtn = document.getElementById('add-layer-btn');
        if (addLayerBtn) {
            addLayerBtn.addEventListener('click', () => {
                this.addLayer();
            });
        }
    }
    
    initializeLayerControls() {
        this.renderLayerControls();
    }
    
    renderLayerControls() {
        const layerList = document.getElementById('layer-list');
        if (!layerList) return;
        
        const layers = this.audioEngine.layers;
        
        if (layers.length === 0) {
            layerList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.5);">
                    No layers added yet. Click "Add Layer" or load a preset track.
                </div>
            `;
            return;
        }
        
        layerList.innerHTML = layers.map((layer, index) => {
            const color = this.getLayerColor(index);
            return `
                <div class="layer-control" data-layer-index="${index}">
                    <div class="layer-header">
                        <div class="layer-info">
                            <div class="layer-number" style="background: ${color};">
                                ${index + 1}
                            </div>
                            <div class="layer-frequency">${layer.frequency}Hz</div>
                        </div>
                        <button class="quantum-btn quantum-btn-small" 
                                onclick="app.removeLayer(${index})">
                            🗑️
                        </button>
                    </div>
                    <div class="layer-controls-row">
                        <div class="control-group">
                            <label class="control-label">Frequency (Hz)</label>
                            <div class="slider-container">
                                <input type="range" 
                                       class="slider" 
                                       min="0.5" 
                                       max="1000" 
                                       step="0.5"
                                       value="${layer.frequency}"
                                       onchange="app.updateLayerFrequency(${index}, this.value)">
                                <span class="slider-value">${layer.frequency}Hz</span>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Volume</label>
                            <div class="slider-container">
                                <input type="range" 
                                       class="slider" 
                                       min="0" 
                                       max="100" 
                                       value="${layer.volume * 100}"
                                       onchange="app.updateLayerVolume(${index}, this.value)">
                                <span class="slider-value">${Math.round(layer.volume * 100)}%</span>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Waveform</label>
                            <select class="waveform-select" 
                                    onchange="app.updateLayerWaveform(${index}, this.value)">
                                <option value="sine" ${layer.waveform === 'sine' ? 'selected' : ''}>Sine</option>
                                <option value="square" ${layer.waveform === 'square' ? 'selected' : ''}>Square</option>
                                <option value="triangle" ${layer.waveform === 'triangle' ? 'selected' : ''}>Triangle</option>
                                <option value="sawtooth" ${layer.waveform === 'sawtooth' ? 'selected' : ''}>Sawtooth</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    loadTrack(trackId) {
        const track = FrequencyDatabase.getTrackById(trackId);
        if (!track) return;
        
        this.currentTrack = track;
        
        // Stop current playback
        this.audioEngine.stopAll();
        
        // Load preset
        this.audioEngine.loadPreset({
            name: track.name,
            frequencies: track.frequencies,
            waveforms: track.waveforms,
            volumes: track.volumes
        });
        
        // Update UI
        this.renderLayerControls();
        
        // Show message
        this.showMessage(`🎵 Loaded: ${track.name}`, 'merlin');
        
        // Auto-play
        setTimeout(() => {
            this.audioEngine.startAll();
            this.visualizer.start();
            const playBtn = document.getElementById('play-btn');
            if (playBtn) playBtn.textContent = '⏸️ Pause';
        }, 500);
    }
    
    addLayer() {
        if (this.audioEngine.layers.length >= 9) {
            this.showMessage('⚠️ Maximum 9 layers reached', 'rose');
            return;
        }
        
        const index = this.audioEngine.addLayer({
            frequency: 432,
            waveform: 'sine',
            enabled: true
        });
        
        if (index >= 0) {
            this.renderLayerControls();
            this.showMessage('✅ Layer added', 'merlin');
        }
    }
    
    removeLayer(index) {
        this.audioEngine.removeLayer(index);
        this.renderLayerControls();
        this.showMessage('🗑️ Layer removed', 'merlin');
    }
    
    updateLayerFrequency(index, value) {
        this.audioEngine.updateLayer(index, { frequency: parseFloat(value) });
        this.renderLayerControls();
    }
    
    updateLayerVolume(index, value) {
        this.audioEngine.updateLayer(index, { volume: parseFloat(value) / 100 });
        this.renderLayerControls();
    }
    
    updateLayerWaveform(index, value) {
        this.audioEngine.updateLayer(index, { waveform: value });
    }
    
    loadDefaultConfiguration() {
        // Load the most popular track by default
        const topTrack = FrequencyDatabase.getTopTracks(1)[0];
        if (topTrack) {
            this.loadTrack(topTrack.id);
        }
    }
    
    saveSession() {
        const config = this.audioEngine.getConfiguration();
        const sessionData = {
            type: 'frequency_session',
            timestamp: new Date().toISOString(),
            track: this.currentTrack ? this.currentTrack.name : 'Custom',
            configuration: config
        };
        
        // Save to localStorage using quantum storage
        if (typeof QuantumStorage !== 'undefined') {
            QuantumStorage.saveFrequency(sessionData);
            this.showMessage('💾 Session saved to Quantum Jukebox!', 'merlin');
        } else {
            console.warn('QuantumStorage not available');
            this.showMessage('⚠️ Storage not available', 'rose');
        }
    }
    
    exportSession() {
        const config = this.audioEngine.getConfiguration();
        const exportData = {
            name: this.currentTrack ? this.currentTrack.name : 'Custom Session',
            timestamp: new Date().toISOString(),
            configuration: config
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], 
                             { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quantum-frequency-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showMessage('📤 Session exported!', 'merlin');
    }
    
    formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    }
    
    getLayerColor(index) {
        const colors = [
            '#00f5ff', '#ff00ff', '#ffd700', '#9d00ff', 
            '#00ff88', '#ff6b6b', '#00a8ff', '#ffaa00', '#ff00aa'
        ];
        return colors[index % colors.length];
    }
    
    showWelcomeMessage() {
        if (typeof QuantumGuides !== 'undefined') {
            QuantumGuides.showMessage(
                'merlin',
                'Welcome to the Quantum Frequency Generator! 🎵 Browse 600+ healing frequency combinations or create your own multi-layer soundscapes. Each frequency is tuned to specific intentions and outcomes.',
                5000
            );
        }
    }
    
    showMessage(text, guide = 'merlin') {
        if (typeof QuantumGuides !== 'undefined') {
            QuantumGuides.showMessage(guide, text, 3000);
        }
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new QuantumFrequencyApp();
});

// Initialize quantum background
document.addEventListener('DOMContentLoaded', () => {
    if (typeof QuantumBackgrounds !== 'undefined') {
        QuantumBackgrounds.init('quantum-background', {
            gridColor: '#00f5ff',
            particleColor: '#00f5ff'
        });
    }
});