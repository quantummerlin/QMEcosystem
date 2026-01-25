/* ===== ✨ K-POP COSMOS SLAY EFFECTS - JAVASCRIPT ✨ ===== */
/* Visual polish for the ultimate stan experience */
/* Include this after slay-effects.css */

(function() {
    'use strict';
    
    // ===== CONFIGURATION =====
    const CONFIG = {
        sparkleEmojis: ['✨', '💜', '⭐', '💖', '🌟', '💫', '✦', '♡'],
        particleEmojis: ['💜', '⭐', '✨', '💖', '🌟', '💫', '♡', '✦'],
        confettiEmojis: ['💜', '⭐', '✨', '💖', '🌟', '💫', '🎀', '💝'],
        sparkleDelay: 50,
        particleInterval: 800,
        particleCount: 12,
        confettiCount: 30,
        // Pages with complex forms - disable floating particles for better UX
        interactivePages: ['band-builder', 'welcome-flow', 'crystal-ball']
    };
    
    let lastSparkleTime = 0;
    let isInteractivePage = false;
    
    // ===== CHECK IF INTERACTIVE PAGE =====
    function checkInteractivePage() {
        const path = window.location.pathname.toLowerCase();
        return CONFIG.interactivePages.some(page => path.includes(page));
    }
    
    // ===== CREATE PARTICLES CONTAINER =====
    function createParticlesContainer() {
        if (document.getElementById('slayParticles')) return;
        
        const container = document.createElement('div');
        container.className = 'particles-container';
        container.id = 'slayParticles';
        document.body.insertBefore(container, document.body.firstChild);
        return container;
    }
    
    // ===== SPARKLE CURSOR TRAIL =====
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = CONFIG.sparkleEmojis[Math.floor(Math.random() * CONFIG.sparkleEmojis.length)];
        sparkle.style.left = (x + (Math.random() - 0.5) * 20) + 'px';
        sparkle.style.top = (y + (Math.random() - 0.5) * 20) + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 800);
    }
    
    function handleMouseMove(e) {
        const now = Date.now();
        if (now - lastSparkleTime < CONFIG.sparkleDelay) return;
        lastSparkleTime = now;
        createSparkle(e.clientX, e.clientY);
    }
    
    // ===== FLOATING PARTICLES =====
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = CONFIG.particleEmojis[Math.floor(Math.random() * CONFIG.particleEmojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 14000);
    }
    
    function initParticles() {
        const container = createParticlesContainer();
        if (!container) return;
        
        // Create initial particles
        for (let i = 0; i < CONFIG.particleCount; i++) {
            setTimeout(() => createParticle(container), i * 300);
        }
        
        // Keep creating particles
        setInterval(() => createParticle(container), CONFIG.particleInterval);
    }
    
    // ===== CONFETTI CELEBRATION =====
    window.triggerConfetti = function() {
        for (let i = 0; i < CONFIG.confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.textContent = CONFIG.confettiEmojis[Math.floor(Math.random() * CONFIG.confettiEmojis.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-20px';
                confetti.style.fontSize = (1 + Math.random() * 1) + 'rem';
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
    };
    
    // ===== TOUCH SPARKLE FOR MOBILE =====
    function handleTouchStart(e) {
        const touch = e.touches[0];
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createSparkle(touch.clientX, touch.clientY), i * 50);
        }
    }
    
    // ===== CLICK SPARKLE BURST =====
    function handleClick(e) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createSparkle(
                    e.clientX + (Math.random() - 0.5) * 60,
                    e.clientY + (Math.random() - 0.5) * 40
                );
            }, i * 30);
        }
    }
    
    // ===== CHECK FOR REDUCED MOTION =====
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    // ===== INITIALIZE =====
    function init() {
        if (prefersReducedMotion()) {
            console.log('💜 K-Pop Cosmos: Reduced motion mode - effects disabled');
            return;
        }
        
        // Check if this is an interactive page (forms, inputs, etc.)
        isInteractivePage = checkInteractivePage();
        
        if (isInteractivePage) {
            // On interactive pages: NO floating particles, NO sparkle trails
            // Just keep confetti available for celebrations
            console.log('✨ K-Pop Cosmos: Interactive page mode - minimal effects 💜');
            return;
        }
        
        // Mouse sparkle trail (only on non-interactive pages)
        document.addEventListener('mousemove', handleMouseMove);
        
        // Touch sparkle for mobile (only on non-interactive pages)
        document.addEventListener('touchstart', handleTouchStart);
        
        // Click sparkle burst (only on non-interactive pages)
        document.addEventListener('click', handleClick);
        
        // Initialize floating particles (only on non-interactive pages)
        initParticles();
        
        console.log('✨ K-Pop Cosmos Slay Effects loaded! 💜');
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Expose functions globally
    window.SlayEffects = {
        createSparkle: createSparkle,
        triggerConfetti: window.triggerConfetti
    };
    
})();
