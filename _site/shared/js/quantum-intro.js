// ============================================
// QUANTUM MERLIN INTRO ANIMATION
// Reusable intro animation for all Quantum Merlin tools
// ============================================

(function() {
    'use strict';

    // Shared localStorage key for skip functionality across all QM pages
    const STORAGE_KEY = 'qm_intro_watched';
    const hasWatchedBefore = localStorage.getItem(STORAGE_KEY) === 'true';
    
    // Create intro HTML elements
    function createIntroElements() {
        // Skip if already watched before (unless forced)
        if (hasWatchedBefore && !window.forceQuantumIntro) {
            const appContent = document.getElementById('app-content');
            if (appContent) {
                appContent.classList.add('visible');
            }
            return false;
        }

        // Create container if it doesn't exist
        if (document.getElementById('intro-container')) {
            return true; // Already exists
        }

        const container = document.createElement('div');
        container.id = 'intro-container';
        container.innerHTML = `
            <canvas id="lines-canvas"></canvas>
            <div class="emoji-layer">
                <div class="intro-emoji" id="intro-quantum">⚛️</div>
                <div class="intro-emoji" id="intro-wizard">🧙‍♂️</div>
                <div class="intro-emoji" id="intro-rose">🌹</div>
            </div>
            <div id="singularity"></div>
            <div id="intro-title">QUANTUM MERLIN</div>
            ${hasWatchedBefore ? '<button id="skip-intro-btn">Skip Intro ⏭️</button>' : ''}
        `;
        document.body.insertBefore(container, document.body.firstChild);

        // Add styles if not already present
        if (!document.getElementById('quantum-intro-styles')) {
            const styles = document.createElement('style');
            styles.id = 'quantum-intro-styles';
            styles.textContent = `
                #intro-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 1s ease;
                }

                #intro-container.fade-out {
                    opacity: 0;
                    pointer-events: none;
                }

                #skip-intro-btn {
                    position: fixed;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 10001;
                    background: rgba(0, 245, 255, 0.15);
                    border: 1px solid rgba(0, 245, 255, 0.5);
                    color: #00f5ff;
                    padding: 12px 30px;
                    border-radius: 25px;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 0.9rem;
                    cursor: pointer;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                }

                #skip-intro-btn:hover {
                    background: rgba(0, 245, 255, 0.3);
                    box-shadow: 0 0 20px rgba(0, 245, 255, 0.5);
                }

                #lines-canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }

                .emoji-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 2;
                }

                .intro-emoji {
                    position: absolute;
                    font-size: 60px;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform-origin: center;
                    will-change: transform, opacity;
                    opacity: 0;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }

                #intro-quantum {
                    color: #FFD700;
                    text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
                }

                #intro-wizard {
                    color: #00F0FF;
                    text-shadow: 0 0 20px rgba(0, 240, 255, 0.8);
                }

                #intro-rose {
                    color: #FF0066;
                    text-shadow: 0 0 20px rgba(255, 0, 102, 0.8);
                }

                #singularity {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 4px;
                    height: 4px;
                    background: radial-gradient(circle, #FFD700, #00F0FF, #FF0066);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0;
                    z-index: 3;
                    box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
                }

                #intro-title {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    font-size: 1px;
                    font-weight: 900;
                    font-family: 'Orbitron', sans-serif;
                    background: linear-gradient(135deg, #00F0FF 0%, #FFD700 50%, #FF0066 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    white-space: nowrap;
                    opacity: 0;
                    z-index: 4;
                    letter-spacing: 0.1em;
                }

                #app-content {
                    opacity: 0;
                    transition: opacity 0.5s ease;
                }

                #app-content.visible {
                    opacity: 1;
                }
            `;
            document.head.appendChild(styles);
        }

        return true;
    }

    function runAnimation() {
        const canvas = document.getElementById('lines-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d', { alpha: true });
        const container = document.getElementById('intro-container');
        const appContent = document.getElementById('app-content');

        const quantum = document.getElementById('intro-quantum');
        const wizard = document.getElementById('intro-wizard');
        const rose = document.getElementById('intro-rose');
        const singularity = document.getElementById('singularity');
        const introTitle = document.getElementById('intro-title');

        let width, height, centerX, centerY;
        let time = 0;
        let isRunning = true;
        let wizardOrbitStart = 0;
        let roseOrbitStart = Math.PI;

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            centerX = width / 2;
            centerY = height / 2;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        }

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function clamp(value, min, max) {
            return Math.max(min, Math.min(max, value));
        }

        function updateAnimation() {
            const t = time / 60;

            ctx.clearRect(0, 0, width, height);

            // PHASE 1: Quantum Emergence (0-1s)
            if (t < 1) {
                const progress = clamp(t / 1, 0, 1);
                const ease = easeInOutCubic(progress);
                
                quantum.style.left = centerX + 'px';
                quantum.style.top = centerY + 'px';
                quantum.style.transform = `translate(-50%, -50%) scale(${ease})`;
                quantum.style.opacity = ease;
                
                wizard.style.opacity = 0;
                rose.style.opacity = 0;
            }

            // PHASE 2: Wizard & Rose Arrival (1-2s)
            else if (t < 2) {
                const progress = clamp((t - 1) / 1, 0, 1);
                const ease = easeInOutCubic(progress);
                
                quantum.style.left = centerX + 'px';
                quantum.style.top = centerY + 'px';
                quantum.style.transform = 'translate(-50%, -50%) scale(1)';
                quantum.style.opacity = 1;
                
                const wizardX = ease * (centerX - 80);
                wizard.style.left = wizardX + 'px';
                wizard.style.top = centerY + 'px';
                wizard.style.transform = 'translate(-50%, -50%) scale(1)';
                wizard.style.opacity = ease;
                
                const roseX = width - ease * (width - centerX - 80);
                rose.style.left = roseX + 'px';
                rose.style.top = centerY + 'px';
                rose.style.transform = 'translate(-50%, -50%) scale(1)';
                rose.style.opacity = ease;
            }

            // PHASE 3: Quiet Float (2-3s)
            else if (t < 3) {
                quantum.style.left = centerX + 'px';
                quantum.style.top = centerY + 'px';
                quantum.style.transform = 'translate(-50%, -50%) scale(1)';
                
                wizard.style.left = (centerX - 80) + 'px';
                wizard.style.top = centerY + 'px';
                wizard.style.transform = 'translate(-50%, -50%) scale(1)';
                
                rose.style.left = (centerX + 80) + 'px';
                rose.style.top = centerY + 'px';
                rose.style.transform = 'translate(-50%, -50%) scale(1)';
            }

            // PHASE 4: Lines Emerge (3-4.5s)
            else if (t < 4.5) {
                const progress = clamp((t - 3) / 1.5, 0, 1);
                const rotation = progress * Math.PI * 2 * 0.5;
                
                ctx.strokeStyle = 'rgba(0, 240, 255, ' + (progress * 0.6) + ')';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, 80, rotation, rotation + Math.PI);
                ctx.stroke();
                
                ctx.strokeStyle = 'rgba(255, 0, 255, ' + (progress * 0.6) + ')';
                ctx.beginPath();
                ctx.arc(centerX, centerY, 80, rotation + Math.PI / 2, rotation + Math.PI * 1.5);
                ctx.stroke();
                
                ctx.strokeStyle = 'rgba(157, 0, 255, ' + (progress * 0.6) + ')';
                ctx.beginPath();
                ctx.arc(centerX, centerY, 80, rotation + Math.PI, rotation + Math.PI * 2);
                ctx.stroke();
                
                if (t < 4.51) {
                    wizardOrbitStart = Math.PI;
                    roseOrbitStart = 0;
                }
            }

            // PHASE 5: Acceleration + Orbit (4.5-6.5s)
            else if (t < 6.5) {
                const progress = clamp((t - 4.5) / 2, 0, 1);
                const speedMultiplier = 1 + progress * 8;
                const rotation = ((t - 3) * speedMultiplier) * Math.PI * 2 * 0.5;
                
                ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, 80, rotation, rotation + Math.PI);
                ctx.stroke();
                
                ctx.strokeStyle = 'rgba(255, 0, 255, 0.6)';
                ctx.beginPath();
                ctx.arc(centerX, centerY, 80, rotation + Math.PI / 2, rotation + Math.PI * 1.5);
                ctx.stroke();
                
                ctx.strokeStyle = 'rgba(157, 0, 255, 0.6)';
                ctx.beginPath();
                ctx.arc(centerX, centerY, 80, rotation + Math.PI, rotation + Math.PI * 2);
                ctx.stroke();
                
                quantum.style.left = centerX + 'px';
                quantum.style.top = centerY + 'px';
                quantum.style.transform = 'translate(-50%, -50%) scale(1)';
                
                const orbitProgress = (t - 4.5) * speedMultiplier * 0.5;
                const orbitRadius = 80;
                
                const wizardAngle = wizardOrbitStart + orbitProgress * Math.PI * 2;
                const wizardX = centerX + Math.cos(wizardAngle) * orbitRadius;
                const wizardY = centerY + Math.sin(wizardAngle) * orbitRadius;
                wizard.style.left = wizardX + 'px';
                wizard.style.top = wizardY + 'px';
                wizard.style.transform = 'translate(-50%, -50%) scale(1)';
                
                const roseAngle = roseOrbitStart + orbitProgress * Math.PI * 2;
                const roseX = centerX + Math.cos(roseAngle) * orbitRadius;
                const roseY = centerY + Math.sin(roseAngle) * orbitRadius;
                rose.style.left = roseX + 'px';
                rose.style.top = roseY + 'px';
                rose.style.transform = 'translate(-50%, -50%) scale(1)';
            }

            // PHASE 6: Quantum Collapse (6.5-7.5s)
            else if (t < 7.5) {
                const progress = clamp((t - 6.5) / 1, 0, 1);
                const ease = easeInOutCubic(progress);
                
                const rotation = ((t - 3) * 9) * Math.PI * 2 * 0.5;
                const lineOpacity = 0.6 * (1 - ease);
                const lineRadius = 80 * (1 - ease);
                
                ctx.strokeStyle = 'rgba(0, 240, 255, ' + lineOpacity + ')';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, lineRadius, rotation, rotation + Math.PI);
                ctx.stroke();
                
                ctx.strokeStyle = 'rgba(255, 0, 255, ' + lineOpacity + ')';
                ctx.beginPath();
                ctx.arc(centerX, centerY, lineRadius, rotation + Math.PI / 2, rotation + Math.PI * 1.5);
                ctx.stroke();
                
                const orbitProgress = (t - 4.5) * 9 * 0.5;
                const orbitRadius = 80 * (1 - ease);
                
                const wizardAngle = wizardOrbitStart + orbitProgress * Math.PI * 2;
                const wizardX = centerX + Math.cos(wizardAngle) * orbitRadius;
                const wizardY = centerY + Math.sin(wizardAngle) * orbitRadius;
                
                const roseAngle = roseOrbitStart + orbitProgress * Math.PI * 2;
                const roseX = centerX + Math.cos(roseAngle) * orbitRadius;
                const roseY = centerY + Math.sin(roseAngle) * orbitRadius;
                
                const emojiScale = 1 - ease * 0.9;
                
                wizard.style.left = wizardX + 'px';
                wizard.style.top = wizardY + 'px';
                wizard.style.transform = `translate(-50%, -50%) scale(${emojiScale})`;
                wizard.style.opacity = 1 - ease;
                
                rose.style.left = roseX + 'px';
                rose.style.top = roseY + 'px';
                rose.style.transform = `translate(-50%, -50%) scale(${emojiScale})`;
                rose.style.opacity = 1 - ease;
                
                const quantumScale = 1 + (ease < 0.3 ? ease * 0.5 : (1 - ease) * 1.5);
                quantum.style.left = centerX + 'px';
                quantum.style.top = centerY + 'px';
                quantum.style.transform = `translate(-50%, -50%) scale(${quantumScale})`;
                quantum.style.opacity = 1 - ease;
                
                singularity.style.transform = `translate(-50%, -50%) scale(${ease})`;
                singularity.style.opacity = ease;
            }

            // PHASE 7: Singularity Pause (7.5-8s)
            else if (t < 8) {
                quantum.style.opacity = 0;
                wizard.style.opacity = 0;
                rose.style.opacity = 0;
                
                const pulse = Math.sin((t - 7.5) * Math.PI * 4) * 0.2 + 1;
                singularity.style.transform = `translate(-50%, -50%) scale(${pulse})`;
                singularity.style.opacity = 1;
            }

            // PHASE 8: Title Reveal (8-10s)
            else if (t < 10) {
                const progress = clamp((t - 8) / 2, 0, 1);
                const ease = easeInOutCubic(progress);
                
                singularity.style.transform = `translate(-50%, -50%) scale(1)`;
                singularity.style.opacity = 1 - ease;
                
                const maxFontSize = Math.min(width * 0.12, 48);
                const fontSize = ease * maxFontSize;
                
                introTitle.style.fontSize = fontSize + 'px';
                introTitle.style.transform = `translate(-50%, -50%)`;
                introTitle.style.opacity = ease;
            }

            // PHASE 9: Hold & Fade Out (10-11s)
            else if (t < 11) {
                singularity.style.opacity = 0;
                
                const maxFontSize = Math.min(width * 0.12, 48);
                introTitle.style.fontSize = maxFontSize + 'px';
                introTitle.style.opacity = 1;
                
                if (t > 10.5) {
                    const fadeProgress = (t - 10.5) / 0.5;
                    container.style.opacity = 1 - fadeProgress;
                }
            }

            // PHASE 10: Complete (11s+)
            else if (t >= 11) {
                if (isRunning) {
                    isRunning = false;
                    complete();
                }
            }

            time++;
            if (isRunning) {
                requestAnimationFrame(updateAnimation);
            }
        }

        function skipIntro() {
            isRunning = false;
            complete();
        }

        function complete() {
            // Mark intro as watched in shared localStorage (works across all QM pages)
            localStorage.setItem(STORAGE_KEY, 'true');
            
            // Hide skip button if it exists
            const skipBtn = document.getElementById('skip-intro-btn');
            if (skipBtn) skipBtn.style.display = 'none';
            
            container.classList.add('fade-out');
            setTimeout(() => {
                container.style.display = 'none';
                if (appContent) {
                    appContent.classList.add('visible');
                }
            }, 100);
        }

        resize();
        window.addEventListener('resize', resize);
        
        // Setup skip button if it exists
        const skipBtn = document.getElementById('skip-intro-btn');
        if (skipBtn) {
            skipBtn.onclick = skipIntro;
        }
        
        updateAnimation();
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (createIntroElements()) {
                setTimeout(runAnimation, 100);
            }
        });
    } else {
        if (createIntroElements()) {
            setTimeout(runAnimation, 100);
        }
    }

    // Export for manual control
    window.QuantumIntro = {
        reset: function() {
            localStorage.removeItem(STORAGE_KEY);
        },
        forcePlay: function() {
            localStorage.removeItem(STORAGE_KEY);
        }
    };
})();
