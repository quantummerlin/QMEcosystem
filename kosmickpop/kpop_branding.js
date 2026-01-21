// ============================================
// K-Pop Realm: Branding & UI Enhancement Script
// Applies K-Pop styling to existing tools
// ============================================

// ============================================
// K-Pop Branding Configuration
// ============================================

const KPOP_BRANDING = {
    siteName: "Quantum Merlin: K-Pop Edition",
    tagline: "Decode Your K-Pop Destiny",
    theme: {
        primary: "pink-purple",
        accent: "cyan",
        effects: ["neon", "holographic", "sparkle"]
    },
    emojis: ["🎤", "✨", "🌟", "💖", "⭐", "🔥", "💃", "🎵"],
    vocabulary: {
        calculator: "K-Pop Blueprint",
        reading: "kosmic Analysis",
        result: "Idol Destiny",
        discover: "Reveal Your Destiny",
        explore: "Explore Your kosmic Journey"
    }
};

// ============================================
// K-Pop Star Field Animation
// ============================================

function createKPopStarField() {
    const canvas = document.createElement('canvas');
    canvas.id = 'kpop-starfield';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 200;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                opacity: Math.random(),
                speed: Math.random() * 0.5 + 0.1,
                color: ['#FF69B4', '#00FFFF', '#9400D3', '#FFD700'][Math.floor(Math.random() * 4)]
            });
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = star.opacity;
            ctx.fill();
            
            // Move star
            star.y -= star.speed;
            star.opacity = 0.5 + Math.sin(Date.now() * 0.001 + star.x) * 0.5;
            
            // Reset if off screen
            if (star.y < 0) {
                star.y = canvas.height;
                star.x = Math.random() * canvas.width;
            }
        });
        
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    createStars();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createStars();
    });
}

// ============================================
// K-Pop Neon Glow Effect
// ============================================

function addNeonGlow(element, color = '#FF69B4') {
    element.style.textShadow = `
        0 0 5px ${color},
        0 0 10px ${color},
        0 0 20px ${color},
        0 0 40px ${color}
    `;
}

function removeNeonGlow(element) {
    element.style.textShadow = 'none';
}

// ============================================
// K-Pop Sparkle Effect
// ============================================

function addSparkleEffect(element) {
    const sparkle = document.createElement('span');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: absolute;
        font-size: 20px;
        animation: sparkle 1s ease-in-out infinite;
        pointer-events: none;
        z-index: 1000;
    `;
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = rect.left + rect.width / 2 + 'px';
    sparkle.style.top = rect.top + rect.height / 2 + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// ============================================
// K-Pop Confetti Effect (for celebrations)
// ============================================

function kpopConfetti() {
    const colors = ['#FF69B4', '#00FFFF', '#9400D3', '#FFD700', '#FFFFFF'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${3 + Math.random() * 2}s linear forwards;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti animation to document
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// ============================================
// K-Pop Typing Effect (for dramatic reveals)
// ============================================

function kpopTypingEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            addSparkleEffect(element);
        }
    }
    
    type();
}

// ============================================
// K-Pop Sound Effects (optional)
// ============================================

const KPOP_SOUNDS = {
    click: 'data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU', // Placeholder
    success: 'data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU', // Placeholder
    sparkle: 'data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'  // Placeholder
};

function playKPopSound(soundName) {
    const audio = new Audio(KPOP_SOUNDS[soundName]);
    audio.play().catch(() => {
        // Audio blocked by browser - silent fail
    });
}

// ============================================
// K-Pop UI Enhancement Functions
// ============================================

function enhanceKPopUI() {
    // Add star field background
    createKPopStarField();
    
    // Enhance headings
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
        heading.classList.add('kpop-animate-pulse');
        
        // Add K-Pop emoji to headings
        const randomEmoji = KPOP_BRANDING.emojis[Math.floor(Math.random() * KPOP_BRANDING.emojis.length)];
        if (!heading.textContent.includes(randomEmoji)) {
            heading.textContent = `${heading.textContent} ${randomEmoji}`;
        }
    });
    
    // Enhance buttons
    document.querySelectorAll('button').forEach(button => {
        button.classList.add('kpop-btn-primary');
        
        // Add sparkle on hover
        button.addEventListener('mouseenter', () => {
            addSparkleEffect(button);
        });
        
        // Add neon glow on hover
        button.addEventListener('mouseenter', () => {
            addNeonGlow(button, '#FF69B4');
        });
        
        button.addEventListener('mouseleave', () => {
            removeNeonGlow(button);
        });
        
        // Play sound on click
        button.addEventListener('click', () => {
            playKPopSound('click');
        });
    });
    
    // Enhance inputs
    document.querySelectorAll('input, select').forEach(input => {
        input.classList.add('kpop-input');
    });
    
    // Enhance labels
    document.querySelectorAll('label').forEach(label => {
        label.classList.add('kpop-label');
    });
}

// ============================================
// K-Pop Result Reveal Animation
// ============================================

function revealKPopResult(resultElement) {
    resultElement.style.opacity = '0';
    resultElement.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        resultElement.style.transition = 'all 0.5s ease-out';
        resultElement.style.opacity = '1';
        resultElement.style.transform = 'translateY(0)';
        
        // Add confetti
        kpopConfetti();
        
        // Play success sound
        playKPopSound('success');
    }, 100);
}

// ============================================
// K-Pop Social Share Generator
// ============================================

function generateKPopShareText(result) {
    const archetypes = ["Golden Leader", "Mood Maker", "Main Dancer Virtuoso", "Visual Icon", "Rapper Firecracker", "Main Vocal Powerhouse", "All-Rounder Ace"];
    const randomArchetype = archetypes[Math.floor(Math.random() * archetypes.length)];
    
    return `🎤 My K-Pop Life Path is: ${randomArchetype} ✨
    
    The cosmos revealed my idol destiny! 
    Find YOUR K-Pop archetype here: [URL]
    
    #KPopNumerology #KosmicKPop #IdolDestiny ${KPOP_BRANDING.emojis[0]} ${KPOP_BRANDING.emojis[1]}`;
}

function shareOnTwitter(text, url) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
}

function shareOnInstagram() {
    alert('Share your K-Pop result screenshot on Instagram and tag us! 📸✨');
}

function shareOnTikTok() {
    alert('Create a TikTok showing your K-Pop result! Use #KPopNumerology 🎬✨');
}

// ============================================
// K-Pop Cookie Banner (for EU compliance)
// ============================================

function showKPopCookieBanner() {
    const banner = document.createElement('div');
    banner.id = 'kpop-cookie-banner';
    banner.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: rgba(26, 10, 46, 0.95);
        border: 2px solid #FF69B4;
        border-radius: 15px;
        padding: 20px;
        z-index: 100000;
        box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3);
        text-align: center;
    `;
    
    banner.innerHTML = `
        <p style="color: #fff; margin-bottom: 15px;">
            🎤 We use cookies to enhance your kosmic K-Pop experience. 
            By continuing, you agree to our <a href="/privacy.html" style="color: #00FFFF;">Privacy Policy</a>.
        </p>
        <button id="kpop-accept-cookies" class="kpop-btn-primary" style="padding: 10px 30px;">
            Accept & Continue ✨
        </button>
    `;
    
    document.body.appendChild(banner);
    
    document.getElementById('kpop-accept-cookies').addEventListener('click', () => {
        banner.remove();
        localStorage.setItem('kpopCookiesAccepted', 'true');
    });
}

// ============================================
// K-Pop Loading Animation
// ============================================

function showKPopLoading() {
    const overlay = document.createElement('div');
    overlay.id = 'kpop-loading-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(26, 10, 46, 0.95);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 99999;
    `;
    
    overlay.innerHTML = `
        <div class="kpop-loading-spinner" style="border-color: rgba(255, 105, 180, 0.3); border-top-color: #FF69B4;"></div>
        <p style="color: #fff; margin-top: 20px; font-size: 1.2rem;">
            Decoding your kosmic blueprint... 🌟
        </p>
        <p style="color: #FF69B4; margin-top: 10px;">
            The stars are aligning for you...
        </p>
    `;
    
    document.body.appendChild(overlay);
    
    return overlay;
}

function hideKPopLoading(overlay) {
    setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease';
        setTimeout(() => overlay.remove(), 500);
    }, 1500);
}

// ============================================
// K-Pop Disclaimer (Copyright Safety)
// ============================================

function addKPopDisclaimer() {
    const disclaimer = document.createElement('div');
    disclaimer.className = 'kpop-section kpop-p-sm';
    disclaimer.style.cssText = `
        margin-top: 40px;
        font-size: 0.8rem;
        text-align: center;
        opacity: 0.7;
    `;
    
    disclaimer.innerHTML = `
        <p>
            ⚠️ <strong>DISCLAIMER:</strong> This tool provides entertainment-based numerology and 
            astrological interpretations for K-Pop culture enthusiasts. All results are for 
            entertainment purposes only and should not be taken as professional advice, predictions, 
            or endorsements. References to idol archetypes and K-Pop concepts are general and not 
            affiliated with any specific groups, agencies, or individuals. 🎤✨
        </p>
    `;
    
    document.body.appendChild(disclaimer);
}

// ============================================
// Initialize K-Pop Branding
// ============================================

function initKPopBranding() {
    // Enhance UI
    enhanceKPopUI();
    
    // Add disclaimer
    addKPopDisclaimer();
    
    // Show cookie banner if not accepted
    if (!localStorage.getItem('kpopCookiesAccepted')) {
        showKPopCookieBanner();
    }
    
    // Add page load animation
    document.addEventListener('DOMContentLoaded', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Auto-initialize if script is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKPopBranding);
} else {
    initKPopBranding();
}

// Export functions for manual use
window.KPOP_BRANDING_FUNCTIONS = {
    createKPopStarField,
    addNeonGlow,
    removeNeonGlow,
    addSparkleEffect,
    kpopConfetti,
    kpopTypingEffect,
    playKPopSound,
    enhanceKPopUI,
    revealKPopResult,
    generateKPopShareText,
    shareOnTwitter,
    shareOnInstagram,
    shareOnTikTok,
    showKPopLoading,
    hideKPopLoading,
    showKPopCookieBanner,
    addKPopDisclaimer,
    initKPopBranding
};
