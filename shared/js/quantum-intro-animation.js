/**
 * Quantum Merlin Intro Animation
 * A reusable intro animation for all Quantum Merlin ecosystem pages
 * 
 * Usage:
 * 1. Include quantum-intro.css in your <head>
 * 2. Add the intro HTML structure after <body> tag
 * 3. Wrap your page content in <div id="app-content">
 * 4. Include this script before </body>
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

    const ctx = canvas.getContext('2d', { alpha: true });
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
            
            // Responsive font size: fits within screen width
            const maxFontSize = Math.min(width * 0.065, 42);
            const fontSize = ease * maxFontSize;
            
            introTitle.style.fontSize = fontSize + 'px';
            introTitle.style.transform = `translate(-50%, -50%)`;
            introTitle.style.opacity = ease;
        }

        // PHASE 9: Hold & Fade Out (10-11s)
        else if (t < 11) {
            singularity.style.opacity = 0;
            
            // Responsive font size: fits within screen width
            const maxFontSize = Math.min(width * 0.065, 42);
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

    function complete() {
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
