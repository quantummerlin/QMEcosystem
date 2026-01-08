// QUANTUM MERLIN - UNIVERSAL ONBOARDING SYSTEM v2.0.0
// Tool-specific welcome flows for first-time visitors

const ONBOARDING_CONFIG = {
    'angel-number': {
        steps: [
            {
                icon: '👼',
                title: 'Welcome to Angel Numbers',
                description: 'Decode the divine messages hidden in repeating number patterns. Your angels are speaking—learn their language.',
                button: 'Begin Journey ✨'
            },
            {
                icon: '🔢',
                title: 'Pattern Recognition',
                description: 'See 11:11? 222? 333? These aren\'t coincidences. They\'re coordinated signals from higher consciousness guiding your path.',
                button: 'Continue →'
            },
            {
                icon: '📡',
                title: 'Instant Decoding',
                description: 'Enter any repeating number sequence and receive its complete spiritual meaning, life guidance, and synchronicity interpretation.',
                button: 'Got It →'
            },
            {
                icon: '🌟',
                title: 'Ready to Decode?',
                description: 'Your angels are waiting. Enter the number you keep seeing and discover what the universe is trying to tell you.',
                button: 'Let\'s Go! 👼'
            }
        ]
    },
    'soul-card': {
        steps: [
            {
                icon: '🃏',
                title: 'Welcome to Soul Cards',
                description: 'Your birth date contains a hidden tarot archetype—your Soul Card. This is your spiritual blueprint and life purpose.',
                button: 'Discover Mine ✨'
            },
            {
                icon: '🎴',
                title: 'Your Birth Archetype',
                description: 'Based on numerology, every person has 1-2 Major Arcana cards that govern their soul\'s journey. This isn\'t random—it\'s cosmic code.',
                button: 'Continue →'
            },
            {
                icon: '⚡',
                title: 'Life Path Blueprint',
                description: 'Your Soul Card reveals your natural strengths, life challenges, karmic lessons, and the spiritual gifts you were born to share.',
                button: 'Perfect →'
            },
            {
                icon: '🌹',
                title: 'Ready to Reveal?',
                description: 'Enter your birth date and discover the Major Arcana card that holds the key to your soul\'s mission.',
                button: 'Show Me! 🔮'
            }
        ]
    },
    'birth-sigil': {
        steps: [
            {
                icon: '🔮',
                title: 'Welcome to Birth Sigils',
                description: 'Your birth date generates a unique mystical symbol—a personal sigil encoded with your life\'s energetic signature.',
                button: 'Create Mine ✨'
            },
            {
                icon: '🌀',
                title: 'Sacred Geometry',
                description: 'Using numerology and sacred geometry, we transform your birth date into a powerful visual talisman unique to you.',
                button: 'Continue →'
            },
            {
                icon: '✨',
                title: 'Personal Power Symbol',
                description: 'Your sigil can be used for meditation, manifestation, protection, or as a spiritual anchor. It\'s your personal frequency made visible.',
                button: 'Amazing →'
            },
            {
                icon: '🎨',
                title: 'Ready to Generate?',
                description: 'Enter your birth details and watch as the algorithm weaves your unique sacred symbol into existence.',
                button: 'Generate! 🔮'
            }
        ]
    },
    'compatibility': {
        steps: [
            {
                icon: '💫',
                title: 'Welcome to Compatibility',
                description: 'Discover the energetic dynamics between any two people using numerology, astrology, and quantum resonance analysis.',
                button: 'Check Chemistry ✨'
            },
            {
                icon: '⚛️',
                title: '3-Layer Analysis',
                description: 'We analyze Life Path compatibility, astrological synastry, and name vibration harmony to reveal the full energetic picture.',
                button: 'Continue →'
            },
            {
                icon: '🎯',
                title: 'Truth & Guidance',
                description: 'See where you naturally align, where friction exists, and how to navigate challenges. No sugar-coating—just quantum truth.',
                button: 'Got It →'
            },
            {
                icon: '🌹',
                title: 'Ready to Analyze?',
                description: 'Enter both people\'s details and discover the cosmic dynamics at play in your relationship.',
                button: 'Analyze! 💖'
            }
        ]
    },
    'trust-radar': {
        steps: [
            {
                icon: '🎯',
                title: 'Welcome to Trust Radar',
                description: 'Scan any person\'s energetic frequency to detect red flags, green flags, and hidden character patterns.',
                button: 'Scan Someone ✨'
            },
            {
                icon: '📡',
                title: 'Multi-Layer Detection',
                description: 'Using numerology, name analysis, and birth data, we detect personality traits, shadow patterns, and trust indicators.',
                button: 'Continue →'
            },
            {
                icon: '⚠️',
                title: 'Red & Green Flags',
                description: 'See potential warning signs, trustworthy qualities, and behavioral patterns before investing time or energy.',
                button: 'Smart →'
            },
            {
                icon: '🔍',
                title: 'Ready to Scan?',
                description: 'Enter someone\'s details and let the Trust Radar reveal what most people miss until it\'s too late.',
                button: 'Scan Now! 🎯'
            }
        ]
    },
    'hidden-strengths': {
        steps: [
            {
                icon: '💎',
                title: 'Hidden Strengths Revealer',
                description: 'Discover the dormant superpowers hiding in your birth chart—talents you haven\'t fully claimed yet.',
                button: 'Reveal Mine ✨'
            },
            {
                icon: '🔓',
                title: 'Dormant Gifts',
                description: 'Most people operate at 30% capacity. We analyze your numerology and astrology to find the untapped 70%.',
                button: 'Continue →'
            },
            {
                icon: '⚡',
                title: 'Activation Guidance',
                description: 'Not just "what" your hidden strengths are, but "how" to activate them and when they\'ll naturally emerge.',
                button: 'Perfect →'
            },
            {
                icon: '🌟',
                title: 'Ready to Unlock?',
                description: 'Enter your details and discover the extraordinary abilities you\'ve been carrying all along.',
                button: 'Unlock! 💫'
            }
        ]
    },
    'identity-split': {
        steps: [
            {
                icon: '🎭',
                title: 'Identity Split Detector',
                description: 'Feeling pulled in multiple directions? We detect when you\'re living between conflicting identities or life paths.',
                button: 'Check Mine ✨'
            },
            {
                icon: '⚡',
                title: 'Dual Forces',
                description: 'Many people have opposing energies in their chart—the artist vs. the businessman, the rebel vs. the leader. We find yours.',
                button: 'Continue →'
            },
            {
                icon: '🧭',
                title: 'Integration Path',
                description: 'The goal isn\'t to choose one—it\'s to integrate both. We show you how to harmonize your split identities into unified power.',
                button: 'Got It →'
            },
            {
                icon: '🌀',
                title: 'Ready to Detect?',
                description: 'Enter your details and discover which conflicting forces are creating tension in your life.',
                button: 'Detect! 🎭'
            }
        ]
    },
    'power-avoidance': {
        steps: [
            {
                icon: '👑',
                title: 'Power Avoidance Pattern',
                description: 'Are you unconsciously sabotaging success? We detect where you\'re avoiding your own power and why.',
                button: 'Check Mine ✨'
            },
            {
                icon: '🚧',
                title: 'Self-Sabotage Detection',
                description: 'Using birth data and name vibration, we identify the specific ways you block yourself from stepping into leadership.',
                button: 'Continue →'
            },
            {
                icon: '💡',
                title: 'Root Cause Analysis',
                description: 'Power avoidance isn\'t weakness—it\'s usually fear of responsibility or past trauma. We reveal the origin story.',
                button: 'Makes Sense →'
            },
            {
                icon: '⚡',
                title: 'Ready to Face It?',
                description: 'Enter your details and discover what\'s been holding you back from claiming your full authority.',
                button: 'Reveal! 👑'
            }
        ]
    },
    'quantum-rose': {
        steps: [
            {
                icon: '🌹',
                title: 'The Quantum Rose',
                description: 'Ask the Rose a question. Receive guidance through quantum entanglement and mystical divination.',
                button: 'Ask the Rose ✨'
            },
            {
                icon: '⚛️',
                title: 'Quantum Divination',
                description: 'The Rose doesn\'t predict—it reads probability fields and quantum fluctuations to reveal what\'s already forming.',
                button: 'Continue →'
            },
            {
                icon: '💫',
                title: 'Yes/No/Maybe/Transform',
                description: 'Four possible answers, each with deep guidance. The Rose sees beyond binary outcomes to show you the full energetic landscape.',
                button: 'Understood →'
            },
            {
                icon: '🔮',
                title: 'Ready to Ask?',
                description: 'Focus on your question. The Rose is listening. Type it and receive your quantum guidance.',
                button: 'Ask Now! 🌹'
            }
        ]
    }
};

// Initialize onboarding for a specific tool
function initQuantumOnboarding(toolKey, onCompleteCallback) {
    const storageKey = `quantumMerlin_${toolKey}_visited`;
    const hasVisited = localStorage.getItem(storageKey);
    
    if (hasVisited) {
        return; // Skip if already visited
    }
    
    const config = ONBOARDING_CONFIG[toolKey];
    if (!config) {
        console.error(`No onboarding config found for tool: ${toolKey}`);
        return;
    }
    
    // Create onboarding HTML
    createOnboardingModal(config, storageKey, onCompleteCallback);
    
    // Show after brief delay
    setTimeout(() => {
        document.getElementById('quantum-onboarding-overlay').classList.add('active');
    }, 300);
}

function createOnboardingModal(config, storageKey, onCompleteCallback) {
    const overlay = document.createElement('div');
    overlay.id = 'quantum-onboarding-overlay';
    overlay.className = 'onboarding-overlay';
    
    let stepsHTML = '';
    config.steps.forEach((step, index) => {
        const isActive = index === 0 ? 'active' : '';
        const nextStep = index + 1;
        const isLast = index === config.steps.length - 1;
        const clickAction = isLast 
            ? `closeQuantumOnboarding('${storageKey}', ${onCompleteCallback ? 'onboardingComplete' : 'null'})`
            : `nextQuantumOnboardingStep(${nextStep})`;
        
        stepsHTML += `
            <div class="onboarding-step ${isActive}" id="quantum-step-${index + 1}">
                <div class="onboarding-icon">${step.icon}</div>
                <h2>${step.title}</h2>
                <p>${step.description}</p>
                <button class="onboarding-btn" onclick="${clickAction}">${step.button}</button>
            </div>
        `;
    });
    
    let dotsHTML = '';
    config.steps.forEach((_, index) => {
        const isActive = index === 0 ? 'active' : '';
        dotsHTML += `<span class="dot ${isActive}" data-step="${index + 1}"></span>`;
    });
    
    overlay.innerHTML = `
        <div class="onboarding-modal">
            ${stepsHTML}
            <div class="onboarding-dots">${dotsHTML}</div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Store callback globally if provided
    if (onCompleteCallback) {
        window.onboardingComplete = onCompleteCallback;
    }
}

let currentQuantumStep = 1;

function nextQuantumOnboardingStep(stepNumber) {
    // Hide current step
    document.getElementById(`quantum-step-${currentQuantumStep}`).classList.remove('active');
    
    // Update dots
    document.querySelector(`.dot[data-step="${currentQuantumStep}"]`).classList.remove('active');
    document.querySelector(`.dot[data-step="${stepNumber}"]`).classList.add('active');
    
    // Show next step
    currentQuantumStep = stepNumber;
    document.getElementById(`quantum-step-${stepNumber}`).classList.add('active');
}

function closeQuantumOnboarding(storageKey, callback) {
    const overlay = document.getElementById('quantum-onboarding-overlay');
    overlay.classList.remove('active');
    
    // Mark as visited
    localStorage.setItem(storageKey, 'true');
    
    // Execute callback if provided
    if (callback && typeof window[callback] === 'function') {
        setTimeout(() => {
            window[callback]();
        }, 400);
    }
    
    // Remove overlay after animation
    setTimeout(() => {
        overlay.remove();
    }, 500);
}

// CSS injection (call this once per page)
function injectQuantumOnboardingStyles() {
    if (document.getElementById('quantum-onboarding-styles')) {
        return; // Already injected
    }
    
    const style = document.createElement('style');
    style.id = 'quantum-onboarding-styles';
    style.textContent = `
        /* Quantum Onboarding Styles */
        .onboarding-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 0, 21, 0.95);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s ease;
        }
        
        .onboarding-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .onboarding-modal {
            background: linear-gradient(135deg, rgba(138, 43, 226, 0.15), rgba(45, 27, 78, 0.25));
            border: 1px solid rgba(255, 215, 0, 0.3);
            border-radius: 20px;
            padding: 50px 40px;
            max-width: 600px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(138, 43, 226, 0.4);
            position: relative;
            animation: modalSlideIn 0.5s ease;
        }
        
        @keyframes modalSlideIn {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .onboarding-step {
            display: none;
            animation: fadeInUp 0.4s ease;
        }
        
        .onboarding-step.active {
            display: block;
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .onboarding-icon {
            font-size: 5rem;
            margin-bottom: 20px;
            animation: floatIcon 3s ease-in-out infinite;
        }
        
        @keyframes floatIcon {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .onboarding-step h2 {
            font-family: 'Cinzel Decorative', 'Orbitron', serif;
            font-size: 2rem;
            background: linear-gradient(135deg, #ffd700, #ff6b9d, #8a2be2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            letter-spacing: 2px;
        }
        
        .onboarding-step p {
            font-size: 1.15rem;
            line-height: 1.8;
            color: rgba(240, 230, 255, 0.9);
            margin-bottom: 30px;
        }
        
        .onboarding-btn {
            display: inline-block;
            padding: 15px 40px;
            background: linear-gradient(135deg, #daa520, #ffd700);
            color: #0a0015;
            text-decoration: none;
            border: none;
            border-radius: 25px;
            font-family: 'Cinzel', 'Orbitron', serif;
            font-weight: 600;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(218, 165, 32, 0.4);
        }
        
        .onboarding-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(218, 165, 32, 0.6);
        }
        
        .onboarding-dots {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 30px;
        }
        
        .onboarding-dots .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 215, 0, 0.3);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .onboarding-dots .dot.active {
            background: #ffd700;
            transform: scale(1.3);
        }
        
        @media (max-width: 768px) {
            .onboarding-modal {
                padding: 35px 25px;
            }
            
            .onboarding-icon {
                font-size: 3.5rem;
            }
            
            .onboarding-step h2 {
                font-size: 1.5rem;
            }
            
            .onboarding-step p {
                font-size: 1rem;
            }
            
            .onboarding-btn {
                padding: 12px 30px;
                font-size: 1rem;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Auto-initialize styles when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectQuantumOnboardingStyles);
} else {
    injectQuantumOnboardingStyles();
}
