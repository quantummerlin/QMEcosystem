/**
 * QUANTUM FREQUENCY GENERATOR
 * Main Application Logic
 */

class FrequencyGenerator {
    constructor() {
        // Audio Context
        this.audioContext = null;
        this.masterGain = null;
        
        // Oscillators
        this.baseOscillator = null;
        this.leftOscillator = null;
        this.rightOscillator = null;
        this.isochronicOscillator = null;
        this.isochronicGain = null;
        this.isochronicLFO = null;
        
        // State
        this.isPlaying = false;
        this.currentFrequency = 432;
        this.volume = 0.5;
        this.binauralBeat = 10;
        this.isochronicRate = 4;
        this.binauralEnabled = false;
        this.isochronicEnabled = false;
        
        // Visualizer
        this.analyser = null;
        this.canvas = null;
        this.canvasContext = null;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupCanvas();
        this.loadSavedFrequencies();
        
        // Initialize backgrounds
        QuantumBackgrounds.init({
            particles: {
                count: 50,
                colors: ['#00f5ff', '#00a8ff']
            },
            stars: { count: 100 },
            grid: { color: 'cyan' },
            sun: { color: 'cyan' }
        });
    }
    
    setupEventListeners() {
        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const freq = parseInt(btn.dataset.freq);
                this.setFrequency(freq);
                this.updatePresetButtons(btn);
            });
        });
        
        // Custom frequency slider
        const customSlider = document.getElementById('customFreqSlider');
        customSlider.addEventListener('input', (e) => {
            const freq = parseInt(e.target.value);
            this.setFrequency(freq);
            document.getElementById('customFreqValue').textContent = `${freq} Hz`;
            this.clearPresetButtons();
        });
        
        // Volume slider
        const volumeSlider = document.getElementById('volumeSlider');
        volumeSlider.addEventListener('input', (e) => {
            this.volume = e.target.value / 100;
            document.getElementById('volumeValue').textContent = `${e.target.value}%`;
            if (this.masterGain) {
                this.masterGain.gain.value = this.volume;
            }
        });
        
        // Binaural controls
        document.getElementById('binauralToggle').addEventListener('change', (e) => {
            this.binauralEnabled = e.target.checked;
            if (this.isPlaying) {
                this.updateBinauralBeats();
            }
        });
        
        document.getElementById('binauralSlider').addEventListener('input', (e) => {
            this.binauralBeat = parseFloat(e.target.value);
            const state = this.getBrainwaveState(this.binauralBeat);
            document.getElementById('binauralValue').textContent = `${this.binauralBeat} Hz (${state})`;
            if (this.isPlaying && this.binauralEnabled) {
                this.updateBinauralBeats();
            }
        });
        
        // Isochronic controls
        document.getElementById('isochronicToggle').addEventListener('change', (e) => {
            this.isochronicEnabled = e.target.checked;
            if (this.isPlaying) {
                this.updateIsochronicTones();
            }
        });
        
        document.getElementById('isochronicSlider').addEventListener('input', (e) => {
            this.isochronicRate = parseFloat(e.target.value);
            const state = this.getBrainwaveState(this.isochronicRate);
            document.getElementById('isochronicValue').textContent = `${this.isochronicRate} Hz (${state})`;
            if (this.isPlaying && this.isochronicEnabled) {
                this.updateIsochronicTones();
            }
        });
        
        // Playback controls
        document.getElementById('playBtn').addEventListener('click', () => this.play());
        document.getElementById('stopBtn').addEventListener('click', () => this.stop());
        document.getElementById('saveBtn').addEventListener('click', () => this.save());
        document.getElementById('clearAllBtn').addEventListener('click', () => this.clearAll());
    }
    
    setupCanvas() {
        this.canvas = document.getElementById('visualizerCanvas');
        this.canvasContext = this.canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }
    
    setFrequency(freq) {
        this.currentFrequency = freq;
        document.getElementById('mainFrequencyDisplay').textContent = freq;
        document.getElementById('customFreqSlider').value = freq;
        document.getElementById('customFreqValue').textContent = `${freq} Hz`;
        
        if (this.isPlaying) {
            this.updateFrequency();
        }
    }
    
    updatePresetButtons(activeBtn) {
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
    
    clearPresetButtons() {
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }
    
    getBrainwaveState(freq) {
        if (freq < 4) return 'Delta';
        if (freq < 8) return 'Theta';
        if (freq < 14) return 'Alpha';
        if (freq < 30) return 'Beta';
        return 'Gamma';
    }
    
    async play() {
        if (this.isPlaying) return;
        
        // Create audio context
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create master gain
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = this.volume;
        this.masterGain.connect(this.audioContext.destination);
        
        // Create analyser for visualizer
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        this.masterGain.connect(this.analyser);
        
        // Create base oscillator
        this.baseOscillator = this.audioContext.createOscillator();
        this.baseOscillator.type = 'sine';
        this.baseOscillator.frequency.value = this.currentFrequency;
        this.baseOscillator.connect(this.masterGain);
        this.baseOscillator.start();
        
        // Setup binaural beats if enabled
        if (this.binauralEnabled) {
            this.updateBinauralBeats();
        }
        
        // Setup isochronic tones if enabled
        if (this.isochronicEnabled) {
            this.updateIsochronicTones();
        }
        
        this.isPlaying = true;
        document.getElementById('playBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        
        // Start visualizer
        this.startVisualizer();
    }
    
    stop() {
        if (!this.isPlaying) return;
        
        // Stop all oscillators
        if (this.baseOscillator) {
            this.baseOscillator.stop();
            this.baseOscillator = null;
        }
        
        if (this.leftOscillator) {
            this.leftOscillator.stop();
            this.leftOscillator = null;
        }
        
        if (this.rightOscillator) {
            this.rightOscillator.stop();
            this.rightOscillator = null;
        }
        
        if (this.isochronicOscillator) {
            this.isochronicOscillator.stop();
            this.isochronicOscillator = null;
        }
        
        if (this.isochronicLFO) {
            this.isochronicLFO.stop();
            this.isochronicLFO = null;
        }
        
        // Close audio context
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        
        this.isPlaying = false;
        document.getElementById('playBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
        
        // Stop visualizer
        this.stopVisualizer();
    }
    
    updateFrequency() {
        if (this.baseOscillator) {
            this.baseOscillator.frequency.setValueAtTime(
                this.currentFrequency,
                this.audioContext.currentTime
            );
        }
        
        if (this.binauralEnabled) {
            this.updateBinauralBeats();
        }
    }
    
    updateBinauralBeats() {
        // Remove existing binaural oscillators
        if (this.leftOscillator) {
            this.leftOscillator.stop();
            this.leftOscillator = null;
        }
        
        if (this.rightOscillator) {
            this.rightOscillator.stop();
            this.rightOscillator = null;
        }
        
        if (!this.binauralEnabled || !this.isPlaying) return;
        
        // Create stereo panner for left ear
        const leftPanner = this.audioContext.createStereoPanner();
        leftPanner.pan.value = -1;
        leftPanner.connect(this.masterGain);
        
        // Create stereo panner for right ear
        const rightPanner = this.audioContext.createStereoPanner();
        rightPanner.pan.value = 1;
        rightPanner.connect(this.masterGain);
        
        // Create left oscillator
        this.leftOscillator = this.audioContext.createOscillator();
        this.leftOscillator.type = 'sine';
        this.leftOscillator.frequency.value = this.currentFrequency;
        this.leftOscillator.connect(leftPanner);
        this.leftOscillator.start();
        
        // Create right oscillator (with beat frequency difference)
        this.rightOscillator = this.audioContext.createOscillator();
        this.rightOscillator.type = 'sine';
        this.rightOscillator.frequency.value = this.currentFrequency + this.binauralBeat;
        this.rightOscillator.connect(rightPanner);
        this.rightOscillator.start();
    }
    
    updateIsochronicTones() {
        // Remove existing isochronic oscillator
        if (this.isochronicOscillator) {
            this.isochronicOscillator.stop();
            this.isochronicOscillator = null;
        }
        
        if (this.isochronicLFO) {
            this.isochronicLFO.stop();
            this.isochronicLFO = null;
        }
        
        if (!this.isochronicEnabled || !this.isPlaying) return;
        
        // Create gain node for amplitude modulation
        this.isochronicGain = this.audioContext.createGain();
        this.isochronicGain.gain.value = 0;
        this.isochronicGain.connect(this.masterGain);
        
        // Create LFO for pulsing
        this.isochronicLFO = this.audioContext.createOscillator();
        this.isochronicLFO.type = 'square';
        this.isochronicLFO.frequency.value = this.isochronicRate;
        this.isochronicLFO.connect(this.isochronicGain.gain);
        this.isochronicLFO.start();
        
        // Create tone oscillator
        this.isochronicOscillator = this.audioContext.createOscillator();
        this.isochronicOscillator.type = 'sine';
        this.isochronicOscillator.frequency.value = this.currentFrequency;
        this.isochronicOscillator.connect(this.isochronicGain);
        this.isochronicOscillator.start();
    }
    
    startVisualizer() {
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const draw = () => {
            this.animationId = requestAnimationFrame(draw);
            
            this.analyser.getByteTimeDomainData(dataArray);
            
            const ctx = this.canvasContext;
            const width = this.canvas.width;
            const height = this.canvas.height;
            
            // Clear canvas
            ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
            ctx.fillRect(0, 0, width, height);
            
            // Draw waveform
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#00f5ff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f5ff';
            ctx.beginPath();
            
            const sliceWidth = width / bufferLength;
            let x = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = v * height / 2;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                
                x += sliceWidth;
            }
            
            ctx.lineTo(width, height / 2);
            ctx.stroke();
        };
        
        draw();
    }
    
    stopVisualizer() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        // Clear canvas
        if (this.canvasContext) {
            this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    save() {
        const frequency = {
            frequency: this.currentFrequency,
            volume: this.volume,
            binaural: {
                enabled: this.binauralEnabled,
                beat: this.binauralBeat
            },
            isochronic: {
                enabled: this.isochronicEnabled,
                rate: this.isochronicRate
            },
            name: `${this.currentFrequency} Hz Frequency`,
            type: 'frequency'
        };
        
        const saved = QuantumStorage.save(QuantumStorage.KEYS.FREQUENCIES, frequency);
        
        // Show success message
        alert('✨ Frequency saved successfully!');
        
        // Reload saved list
        this.loadSavedFrequencies();
    }
    
    loadSavedFrequencies() {
        const frequencies = QuantumStorage.getAll(QuantumStorage.KEYS.FREQUENCIES);
        const container = document.getElementById('savedList');
        
        if (frequencies.length === 0) {
            container.innerHTML = `
                <p style="text-align: center; color: var(--quantum-gray); padding: var(--space-xl);">
                    No saved frequencies yet. Create and save your first frequency!
                </p>
            `;
            return;
        }
        
        container.innerHTML = frequencies.map(freq => `
            <div class="saved-item">
                <div class="saved-info">
                    <h4>${freq.name}</h4>
                    <div class="saved-meta">
                        ${freq.frequency} Hz • 
                        ${freq.binaural.enabled ? `Binaural: ${freq.binaural.beat} Hz` : ''} 
                        ${freq.isochronic.enabled ? `• Isochronic: ${freq.isochronic.rate} Hz` : ''}
                    </div>
                    <div class="saved-meta">
                        ${new Date(freq.timestamp).toLocaleDateString()}
                    </div>
                </div>
                <div class="saved-actions">
                    <button class="btn btn-ghost btn-sm" onclick="generator.loadFrequency('${freq.id}')">
                        Load
                    </button>
                    <button class="btn btn-ghost btn-sm" onclick="generator.deleteFrequency('${freq.id}')">
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    loadFrequency(id) {
        const freq = QuantumStorage.getById(QuantumStorage.KEYS.FREQUENCIES, id);
        if (!freq) return;
        
        // Stop current playback
        if (this.isPlaying) {
            this.stop();
        }
        
        // Load settings
        this.setFrequency(freq.frequency);
        this.volume = freq.volume;
        document.getElementById('volumeSlider').value = freq.volume * 100;
        document.getElementById('volumeValue').textContent = `${Math.round(freq.volume * 100)}%`;
        
        this.binauralEnabled = freq.binaural.enabled;
        this.binauralBeat = freq.binaural.beat;
        document.getElementById('binauralToggle').checked = freq.binaural.enabled;
        document.getElementById('binauralSlider').value = freq.binaural.beat;
        const binauralState = this.getBrainwaveState(freq.binaural.beat);
        document.getElementById('binauralValue').textContent = `${freq.binaural.beat} Hz (${binauralState})`;
        
        this.isochronicEnabled = freq.isochronic.enabled;
        this.isochronicRate = freq.isochronic.rate;
        document.getElementById('isochronicToggle').checked = freq.isochronic.enabled;
        document.getElementById('isochronicSlider').value = freq.isochronic.rate;
        const isochronicState = this.getBrainwaveState(freq.isochronic.rate);
        document.getElementById('isochronicValue').textContent = `${freq.isochronic.rate} Hz (${isochronicState})`;
        
        alert('✨ Frequency loaded successfully!');
    }
    
    deleteFrequency(id) {
        if (confirm('Are you sure you want to delete this frequency?')) {
            QuantumStorage.delete(QuantumStorage.KEYS.FREQUENCIES, id);
            this.loadSavedFrequencies();
        }
    }
    
    clearAll() {
        if (confirm('Are you sure you want to delete all saved frequencies?')) {
            QuantumStorage.clear(QuantumStorage.KEYS.FREQUENCIES);
            this.loadSavedFrequencies();
        }
    }
}

// Initialize generator
const generator = new FrequencyGenerator();