/**
 * Quantum Frequency Generator - Multi-Layer Audio Engine
 * Supports up to 9 simultaneous frequencies with volume balancing
 */

class QuantumAudioEngine {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.layers = [];
        this.maxLayers = 9;
        this.isPlaying = false;
        this.analyser = null;
        this.dataArray = null;
        
        // Volume balancing formula (decreasing percentages)
        this.volumeLevels = [0.70, 0.50, 0.30, 0.20, 0.15, 0.10, 0.08, 0.05, 0.03];
        
        this.initializeAudioContext();
    }
    
    initializeAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = 0.5; // Master volume at 50%
            
            // Create analyser for visualization
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 2048;
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
            
            // Connect master gain to analyser to destination
            this.masterGain.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
            
            console.log('✅ Audio engine initialized');
        } catch (error) {
            console.error('❌ Audio context initialization failed:', error);
        }
    }
    
    /**
     * Add a frequency layer
     * @param {Object} config - Layer configuration
     * @returns {number} Layer index
     */
    addLayer(config = {}) {
        if (this.layers.length >= this.maxLayers) {
            console.warn('⚠️ Maximum layers reached');
            return -1;
        }
        
        const layerIndex = this.layers.length;
        const volumeLevel = this.volumeLevels[layerIndex];
        
        const layer = {
            index: layerIndex,
            frequency: config.frequency || 432,
            waveform: config.waveform || 'sine',
            volume: config.volume !== undefined ? config.volume : volumeLevel,
            enabled: config.enabled !== undefined ? config.enabled : true,
            oscillator: null,
            gainNode: null,
            type: config.type || 'base' // base, binaural, isochronic
        };
        
        this.layers.push(layer);
        console.log(`✅ Layer ${layerIndex} added:`, layer.frequency + 'Hz', layer.waveform);
        
        return layerIndex;
    }
    
    /**
     * Update a layer's configuration
     */
    updateLayer(index, config) {
        if (index < 0 || index >= this.layers.length) return;
        
        const layer = this.layers[index];
        const wasPlaying = this.isPlaying && layer.enabled;
        
        // Stop if playing
        if (wasPlaying) {
            this.stopLayer(index);
        }
        
        // Update configuration
        if (config.frequency !== undefined) layer.frequency = config.frequency;
        if (config.waveform !== undefined) layer.waveform = config.waveform;
        if (config.volume !== undefined) layer.volume = config.volume;
        if (config.enabled !== undefined) layer.enabled = config.enabled;
        if (config.type !== undefined) layer.type = config.type;
        
        // Restart if was playing
        if (wasPlaying && layer.enabled) {
            this.startLayer(index);
        }
        
        console.log(`🔄 Layer ${index} updated:`, layer.frequency + 'Hz');
    }
    
    /**
     * Remove a layer
     */
    removeLayer(index) {
        if (index < 0 || index >= this.layers.length) return;
        
        this.stopLayer(index);
        this.layers.splice(index, 1);
        
        // Reindex remaining layers
        this.layers.forEach((layer, i) => {
            layer.index = i;
        });
        
        console.log(`🗑️ Layer ${index} removed`);
    }
    
    /**
     * Start a specific layer
     */
    startLayer(index) {
        if (index < 0 || index >= this.layers.length) return;
        
        const layer = this.layers[index];
        if (!layer.enabled || layer.oscillator) return;
        
        // Resume audio context if suspended
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        // Create oscillator
        layer.oscillator = this.audioContext.createOscillator();
        layer.oscillator.type = layer.waveform;
        layer.oscillator.frequency.value = layer.frequency;
        
        // Create gain node
        layer.gainNode = this.audioContext.createGain();
        layer.gainNode.gain.value = layer.volume;
        
        // Connect: oscillator -> gain -> master gain
        layer.oscillator.connect(layer.gainNode);
        layer.gainNode.connect(this.masterGain);
        
        // Start oscillator
        layer.oscillator.start();
        
        console.log(`▶️ Layer ${index} started:`, layer.frequency + 'Hz');
    }
    
    /**
     * Stop a specific layer
     */
    stopLayer(index) {
        if (index < 0 || index >= this.layers.length) return;
        
        const layer = this.layers[index];
        if (!layer.oscillator) return;
        
        try {
            layer.oscillator.stop();
            layer.oscillator.disconnect();
            layer.gainNode.disconnect();
        } catch (error) {
            console.warn('Layer stop warning:', error);
        }
        
        layer.oscillator = null;
        layer.gainNode = null;
        
        console.log(`⏹️ Layer ${index} stopped`);
    }
    
    /**
     * Start all enabled layers
     */
    startAll() {
        if (this.isPlaying) return;
        
        this.layers.forEach((layer, index) => {
            if (layer.enabled) {
                this.startLayer(index);
            }
        });
        
        this.isPlaying = true;
        console.log('▶️ All layers started');
    }
    
    /**
     * Stop all layers
     */
    stopAll() {
        if (!this.isPlaying) return;
        
        this.layers.forEach((layer, index) => {
            this.stopLayer(index);
        });
        
        this.isPlaying = false;
        console.log('⏹️ All layers stopped');
    }
    
    /**
     * Set master volume
     */
    setMasterVolume(volume) {
        if (this.masterGain) {
            this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
        }
    }
    
    /**
     * Fade in master volume
     */
    fadeIn(duration = 2) {
        if (!this.masterGain) return;
        
        const currentTime = this.audioContext.currentTime;
        this.masterGain.gain.cancelScheduledValues(currentTime);
        this.masterGain.gain.setValueAtTime(0, currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0.5, currentTime + duration);
        
        console.log(`🔊 Fading in over ${duration}s`);
    }
    
    /**
     * Fade out master volume
     */
    fadeOut(duration = 2) {
        if (!this.masterGain) return;
        
        const currentTime = this.audioContext.currentTime;
        this.masterGain.gain.cancelScheduledValues(currentTime);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0, currentTime + duration);
        
        console.log(`🔉 Fading out over ${duration}s`);
        
        // Stop all after fade completes
        setTimeout(() => {
            this.stopAll();
        }, duration * 1000);
    }
    
    /**
     * Load a preset configuration
     */
    loadPreset(preset) {
        // Stop current playback
        this.stopAll();
        
        // Clear existing layers
        while (this.layers.length > 0) {
            this.removeLayer(0);
        }
        
        // Add new layers from preset
        preset.frequencies.forEach((freq, index) => {
            this.addLayer({
                frequency: freq,
                waveform: preset.waveforms ? preset.waveforms[index] : 'sine',
                volume: preset.volumes ? preset.volumes[index] : this.volumeLevels[index],
                enabled: true,
                type: index === 0 ? 'base' : 'harmonic'
            });
        });
        
        console.log('✅ Preset loaded:', preset.name);
    }
    
    /**
     * Get current configuration
     */
    getConfiguration() {
        return {
            layers: this.layers.map(layer => ({
                frequency: layer.frequency,
                waveform: layer.waveform,
                volume: layer.volume,
                enabled: layer.enabled,
                type: layer.type
            })),
            masterVolume: this.masterGain ? this.masterGain.gain.value : 0.5,
            isPlaying: this.isPlaying
        };
    }
    
    /**
     * Get analyser data for visualization
     */
    getAnalyserData() {
        if (this.analyser && this.dataArray) {
            this.analyser.getByteTimeDomainData(this.dataArray);
            return this.dataArray;
        }
        return null;
    }
    
    /**
     * Get frequency data for spectrum visualization
     */
    getFrequencyData() {
        if (this.analyser) {
            const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(frequencyData);
            return frequencyData;
        }
        return null;
    }
    
    /**
     * Cleanup and destroy audio engine
     */
    destroy() {
        this.stopAll();
        
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        this.layers = [];
        console.log('🗑️ Audio engine destroyed');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumAudioEngine;
}