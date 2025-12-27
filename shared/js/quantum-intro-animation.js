/**
 * Quantum Merlin Intro Animation
 * A reusable intro animation for all Quantum Merlin ecosystem pages
 * 
 * Features:
 * - Skip button appears after first watch (stored in localStorage)
 * - Smooth animations with orbital patterns
 * - Responsive design
 */

(function() {
    // Check if intro elements exist
    const canvas = document.getElementById('lines-canvas');
    const container = document.getElementById('intro-container');
    const appContent = document.getElementById('app-content');
    
    if (!canvas || !container || !appContent) {
        // No intro animation on this page, show content immediately
        if (appContent) appContent.classList.add('visible');
        return;
    }

    const STORAGE_KEY = 'qm_intro_watched';
    const hasWatchedBefore = localStorage.getItem(STORAGE_KEY) === 'true';
    
    // Create skip button if user has watched before
    let skipBtn = null;
    if (hasWatchedBefore) {
        skipBtn = document.createElement('button');
        skipBtn.id = 'skip-intro-btn';
        skipBtn.innerHTML = 'Skip Intro ⏭️';
        skipBtn.style.cssText = `
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
        `;
        skipBtn.onmouseover = () => {
            skipBtn.style.background = 'rgba(0, 245, 255, 0.3)';
            skipBtn.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.5)';
        };
        skipBtn.onmouseout = () => {
            skipBtn.style.background = 'rgba(0, 245, 255, 0.15)';
            skipBtn.style.boxShadow = 'none';
        };
        skipBtn.onclick = () => {
            skipIntro();
        };
        container.appendChild(skipBtn);
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    
    // Support both old (.intro-emoji) and new (#quantum, #wizard, #rose) element structures
    const quantum = document.getElementById('quantum') || document.querySelector('.intro-emoji[data-symbol="⚛️"]');
    const wizard = document.getElementById('wizard') || document.querySelector('.intro-emoji[data-symbol="🧙‍♂️"]');
    const rose = document.getElementById('rose') || document.querySelector('.intro-emoji[data-symbol="🌹"]');
    const singularity = document.getElementById('singularity');
    const introTitle = document.getElementById('title') || document.getElementById('intro-title');

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
    
    function skipIntro() {
        isRunning = false;
        complete();
    }

    function updateAnimation() {
        const t = time / 60;

        ctx.clearRect(0, 0, width, height);

        // PHASE 1: Quantum Emergence (0-1s)
        if (t < 1) {
            const progress = clamp(t / 1, 0, 1);
            const ease = easeInOutCubic(progress);
            
            if (quantum) {
                quantum.style.left = centerX + 'px';
                quantum.style.top = centerY + 'px';
                quantum.style.transform = `translate(-50%, -50%) scale(${ease})`;
                quantum.style.opacity = ease;
            }
            
            if (wizard) wizard.style.opacity = 0;
            if (rose) rose.style.opacity = 0;
        }

        // PHASE 2: Wizard & Rose Arrival (1-2s)
        else if (t < 2) {
            const progress = clamp((t - 1) / 1, 0, 1);
            const ease = easeInOutCubic(progress);
            
            if (quantum) {
                quantum.style.left = centerX + 'px';
                quantum.style.top = centerY + 'px';
                quantum.style.transform = 'translate(-50%, -50%) scale(1)';
                quantum.style.opacity = 1;
            }
            
            if (wizard) {
                const wizardX = ease * (centerX - 80);
                wizard.style.left = wizardX + 'px';
                wizard.style.top = centerY + 'px';
                wizard.style.transform = 'translate(-50%, -50%) scale(1)';
                wizard.style.opacity = ease;
            }
            
            if (rose) {
                const roseX = width - ease * (width - centerX - 80);
                rose.style.left = roseX + 'px';
                rose.style.top = centerY + 'px';
                rose.style.transform = 'translate(-50%, -50%) scale(1)';
                rose.style.opacity = ease;
            }
        }

        // PHASE 3: Quiet Float (2-3s)
        else if (t < 3) {
            if (quantum) {
                quantum.style.left = centerX + 'px';
                quantum.style.top = centerY + 'px';
                quantum.style.transform = 'translate(-50%, -50%) scale(1)';
            }
            
            if (wizard) {
                wizard.style.left = (centerX - 80) + 'px';
                wizard.style.top = centerY + 'px';
                wizard.style.transform = 'translate(-50%, -50%) scale(1)';
            }
            
            if (rose) {
                rose.style.left = (centerX + 80) + 'px';
                rose.style.top = centerY + 'px';
                rose.style.transform = 'translate(-50%, -50%) scale(1)';
            }
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
            
            if (quantum) {
                quantum.style.left = centerX + 'px';
                quantum.style.top = centerY + 'px';
                quantum.style.transform = 'translate(-50%, -50%) scale(1)';
            }
            
            const orbitProgress = (t - 4.5) * speedMultiplier * 0.5;
            const orbitRadius = 80;
            
            if (wizard) {
                const wizardAngle = wizardOrbitStart + orbitProgress * Math.PI * 2;
                const wizardX = centerX + Math.cos(wizardAngle) * orbitRadius;
                const wizardY = centerY + Math.sin(wizardAngle) * orbitRadius;
                wizard.style.left = wizardX + 'px';
                wizard.style.top = wizardY + 'px';
                wizard.style.transform = 'translate(-50%, -50%) scale(1)';
            }
            
            if (rose) {
                const roseAngle = roseOrbitStart + orbitProgress * Math.PI * 2;
                const roseX = centerX + Math.cos(roseAngle) * orbitRadius;
                const roseY = centerY + Math.sin(roseAngle) * orbitRadius;
                rose.style.left = roseX + 'px';
                rose.style.top = roseY + 'px';
                rose.style.transform = 'translate(-50%, -50%) scale(1)';
            }
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
            
            if (wizard) {
                wizard.style.left = wizardX + 'px';
                wizard.style.top = wizardY + 'px';
                wizard.style.transform = `translate(-50%, -50%) scale(${emojiScale})`;
                wizard.style.opacity = 1 - ease;
            }
            
            if (rose) {
                rose.style.left = roseX + 'px';
                rose.style.top = roseY + 'px';
                rose.style.transform = `translate(-50%, -50%) scale(${emojiScale})`;
                rose.style.opacity = 1 - ease;
            }
            
            const quantumScale = 1 + (ease < 0.3 ? ease * 0.5 : (1 - ease) * 1.5);
            if (quantum) {
                quantum.style.left = centerX + 'px';
                quantum.style.top = centerY + 'px';
                quantum.style.transform = `translate(-50%, -50%) scale(${quantumScale})`;
                quantum.style.opacity = 1 - ease;
            }
            
            if (singularity) {
                singularity.style.transform = `translate(-50%, -50%) scale(${ease})`;
                singularity.style.opacity = ease;
            }
        }

        // PHASE 7: Singularity Pause (7.5-8s)
        else if (t < 8) {
            if (quantum) quantum.style.opacity = 0;
            if (wizard) wizard.style.opacity = 0;
            if (rose) rose.style.opacity = 0;
            
            const pulse = Math.sin((t - 7.5) * Math.PI * 4) * 0.2 + 1;
            if (singularity) {
                singularity.style.transform = `translate(-50%, -50%) scale(${pulse})`;
                singularity.style.opacity = 1;
            }
        }

        // PHASE 8: Title Reveal (8-10s)
        else if (t < 10) {
            const progress = clamp((t - 8) / 2, 0, 1);
            const ease = easeInOutCubic(progress);
            
            singularity.style.transform = `translate(-50%, -50%) scale(1)`;
            singularity.style.opacity = 1 - ease;
            
            // Responsive font size: fits within screen width
            const maxFontSize = Math.min(width * 0.065, 42);
            const fontSize = ease * maxFontSize;
            
            if (introTitle) {
                introTitle.style.fontSize = fontSize + 'px';
                introTitle.style.transform = `translate(-50%, -50%)`;
                introTitle.style.opacity = ease;
            }
        }

        // PHASE 9: Hold & Fade Out (10-11s)
        else if (t < 11) {
            if (singularity) singularity.style.opacity = 0;
            
            // Responsive font size: fits within screen width
            const maxFontSize = Math.min(width * 0.065, 42);
            if (introTitle) {
                introTitle.style.fontSize = maxFontSize + 'px';
                introTitle.style.opacity = 1;
            }
            
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

    function complete() {
        // Mark as watched in localStorage
        localStorage.setItem(STORAGE_KEY, 'true');
        
        // Hide skip button if exists
        if (skipBtn) skipBtn.style.display = 'none';
        
        container.classList.add('fade-out');
        setTimeout(() => {
            container.style.display = 'none';
            appContent.classList.add('visible');
        }, 100);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('load', () => {
        setTimeout(() => {
            updateAnimation();
        }, 100);
    });
})();
