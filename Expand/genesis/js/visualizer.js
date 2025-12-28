/**
 * Quantum Frequency Visualizer
 * Multi-layer waveform display with sacred geometry and particle effects
 */

class QuantumVisualizer {
    constructor(canvasId, audioEngine) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.audioEngine = audioEngine;
        this.animationId = null;
        this.isRunning = false;
        
        // Visualization settings
        this.settings = {
            showWaveform: true,
            showSpectrum: true,
            showParticles: true,
            showGeometry: true,
            particleCount: 50,
            geometryRotation: 0
        };
        
        // Particles array
        this.particles = [];
        
        // Color palette for layers
        this.layerColors = [
            '#00f5ff', // Cyan
            '#ff00ff', // Magenta
            '#ffd700', // Gold
            '#9d00ff', // Purple
            '#00ff88', // Green
            '#ff6b6b', // Red
            '#00a8ff', // Blue
            '#ffaa00', // Orange
            '#ff00aa'  // Pink
        ];
        
        this.initializeCanvas();
        this.initializeParticles();
    }
    
    initializeCanvas() {
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    initializeParticles() {
        this.particles = [];
        for (let i = 0; i < this.settings.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.3,
                color: this.layerColors[Math.floor(Math.random() * this.layerColors.length)]
            });
        }
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    animate() {
        if (!this.isRunning) return;
        
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw visualizations
        if (this.settings.showGeometry) {
            this.drawSacredGeometry();
        }
        
        if (this.settings.showWaveform) {
            this.drawWaveform();
        }
        
        if (this.settings.showSpectrum) {
            this.drawSpectrum();
        }
        
        if (this.settings.showParticles) {
            this.updateAndDrawParticles();
        }
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawWaveform() {
        const dataArray = this.audioEngine.getAnalyserData();
        if (!dataArray) return;
        
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerY = height / 2;
        
        // Draw waveform for each active layer
        this.audioEngine.layers.forEach((layer, index) => {
            if (!layer.enabled || !layer.oscillator) return;
            
            const color = this.layerColors[index % this.layerColors.length];
            const sliceWidth = width / dataArray.length;
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 2;
            this.ctx.globalAlpha = 0.6;
            
            let x = 0;
            for (let i = 0; i < dataArray.length; i++) {
                const v = dataArray[i] / 128.0;
                const y = centerY + (v - 1) * (height / 4) * layer.volume;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
                
                x += sliceWidth;
            }
            
            this.ctx.stroke();
            this.ctx.globalAlpha = 1.0;
        });
    }
    
    drawSpectrum() {
        const frequencyData = this.audioEngine.getFrequencyData();
        if (!frequencyData) return;
        
        const width = this.canvas.width;
        const height = this.canvas.height;
        const barWidth = width / frequencyData.length * 2;
        
        // Draw frequency bars
        for (let i = 0; i < frequencyData.length; i++) {
            const barHeight = (frequencyData[i] / 255) * height * 0.3;
            const x = i * barWidth;
            const y = height - barHeight;
            
            // Create gradient for bars
            const gradient = this.ctx.createLinearGradient(x, y, x, height);
            gradient.addColorStop(0, this.layerColors[i % this.layerColors.length]);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.globalAlpha = 0.5;
            this.ctx.fillRect(x, y, barWidth - 1, barHeight);
        }
        
        this.ctx.globalAlpha = 1.0;
    }
    
    drawSacredGeometry() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(this.canvas.width, this.canvas.height) * 0.15;
        
        // Rotate geometry
        this.settings.geometryRotation += 0.002;
        
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(this.settings.geometryRotation);
        
        // Draw flower of life pattern
        const petals = 6;
        for (let i = 0; i < petals; i++) {
            const angle = (Math.PI * 2 / petals) * i;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = this.layerColors[i % this.layerColors.length];
            this.ctx.lineWidth = 1;
            this.ctx.globalAlpha = 0.3;
            this.ctx.stroke();
        }
        
        // Center circle
        this.ctx.beginPath();
        this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = '#00f5ff';
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = 0.5;
        this.ctx.stroke();
        
        this.ctx.restore();
        this.ctx.globalAlpha = 1.0;
    }
    
    updateAndDrawParticles() {
        const frequencyData = this.audioEngine.getFrequencyData();
        const avgFrequency = frequencyData ? 
            frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length : 0;
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // React to audio
            const audioInfluence = avgFrequency / 255;
            particle.size = (Math.random() * 2 + 1) * (1 + audioInfluence);
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity * (0.5 + audioInfluence * 0.5);
            this.ctx.fill();
            
            // Draw glow
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 3
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.globalAlpha = particle.opacity * 0.3;
            this.ctx.fill();
        });
        
        this.ctx.globalAlpha = 1.0;
    }
    
    toggleWaveform() {
        this.settings.showWaveform = !this.settings.showWaveform;
    }
    
    toggleSpectrum() {
        this.settings.showSpectrum = !this.settings.showSpectrum;
    }
    
    toggleParticles() {
        this.settings.showParticles = !this.settings.showParticles;
    }
    
    toggleGeometry() {
        this.settings.showGeometry = !this.settings.showGeometry;
    }
    
    setParticleCount(count) {
        this.settings.particleCount = count;
        this.initializeParticles();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumVisualizer;
}