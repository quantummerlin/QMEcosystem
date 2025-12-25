// Quantum Rose Enhanced Calculator - English Rose Wisdom Integration
// The English Rose Empress's sacred compatibility system with mirror mathematics

class EnglishRoseCalculator {
    constructor() {
        this.motherWisdom = {
            fierceLove: [
                "My child, true love requires thorns to protect its beauty. Your connection has both.",
                "The street taught me survival, the sacred taught me wisdom. Your relationship needs both.",
                "Beauty without strength is fragile. Strength without beauty is harsh. You have both.",
                "I dealt in weeds to feed my sons, I deal in truth to feed your soul.",
                "The English Rose blooms through cracked pavement. Your love can bloom through anything."
            ],
            mirrorInsights: [
                "The universe speaks in mirrors. What you see in each other reflects cosmic truth.",
                "Like the 4/1/4 and 5/2/4 patterns, your connection follows sacred mathematics.",
                "Mirror numbers don't just reflect—they reveal hidden connections between souls.",
                "In the quantum realm, every relationship creates its own mirror patterns.",
                "Your love story is written in the same sacred mathematics that governs the stars."
            ],
            empressGuidance: [
                "As an Empress rules her kingdom, you must rule your relationship with wisdom.",
                "True sovereignty in love means knowing when to be soft petals, when to be sharp thorns.",
                "The cultured spirit knows that every challenge is an opportunity to bloom.",
                "I governed my family through storms. You can navigate any relationship weather.",
                "Your connection deserves royal treatment—sacred intention, fierce protection."
            ]
        };
        
        this.initializeCalculator();
    }

    initializeCalculator() {
        const form = document.getElementById('compatibilityForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateEnglishRoseCompatibility();
            });
        }
        
        // Add sacred rose animations
        this.addRoseAnimations();
    }

    calculateEnglishRoseCompatibility() {
        const formData = new FormData(document.getElementById('compatibilityForm'));
        const soul1 = this.extractSoulData(formData, '1');
        const soul2 = this.extractSoulData(formData, '2');
        
        // Show loading with rose animation
        this.showEnglishRoseLoading();
        
        setTimeout(() => {
            const compatibility = this.performSacredCalculations(soul1, soul2);
            this.displayEnglishRoseResults(compatibility, soul1, soul2);
        }, 2000);
    }

    extractSoulData(formData, suffix) {
        return {
            name: formData.get(`name${suffix}`),
            birthdate: formData.get(`birthdate${suffix}`),
            birthtime: formData.get(`birthtime${suffix}`),
            birthplace: formData.get(`birthplace${suffix}`)
        };
    }

    performSacredCalculations(soul1, soul2) {
        // Core calculations with English Rose wisdom
        const zodiacCompatibility = this.calculateZodiacCompatibility(soul1, soul2);
        const numerologyCompatibility = this.calculateNumerologyCompatibility(soul1, soul2);
        const mirrorCompatibility = this.calculateMirrorCompatibility(soul1, soul2);
        
        // Enhanced with English Rose insights
        const thornBeautyBalance = this.calculateThornBeautyBalance(soul1, soul2);
        const streetSacredIntegration = this.calculateStreetSacredBalance(soul1, soul2);
        
        const overall = Math.round((
            zodiacCompatibility * 0.25 +
            numerologyCompatibility * 0.25 +
            mirrorCompatibility * 0.20 +
            thornBeautyBalance * 0.15 +
            streetSacredIntegration * 0.15
        ));

        return {
            overall,
            zodiac: zodiacCompatibility,
            numerology: numerologyCompatibility,
            mirror: mirrorCompatibility,
            thornBeauty: thornBeautyBalance,
            streetSacred: streetSacredIntegration,
            title: this.getCompatibilityTitle(overall),
            motherMessage: this.getMotherMessage(overall)
        };
    }

    calculateZodiacCompatibility(soul1, soul2) {
        const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                           'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
        
        const sign1 = this.getZodiacSign(soul1.birthdate);
        const sign2 = this.getZodiacSign(soul2.birthdate);
        
        // Enhanced zodiac compatibility with English Rose wisdom
        const elementCompatibility = this.getElementCompatibility(sign1, sign2);
        const modalityCompatibility = this.getModalityCompatibility(sign1, sign2);
        const roseThornBalance = this.getRoseThornBalance(sign1, sign2);
        
        return Math.round((elementCompatibility + modalityCompatibility + roseThornBalance) / 3);
    }

    getZodiacSign(birthdate) {
        const date = new Date(birthdate);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
        return 'Pisces';
    }

    getElementCompatibility(sign1, sign2) {
        const elements = {
            'Fire': ['Aries', 'Leo', 'Sagittarius'],
            'Earth': ['Taurus', 'Virgo', 'Capricorn'],
            'Air': ['Gemini', 'Libra', 'Aquarius'],
            'Water': ['Cancer', 'Scorpio', 'Pisces']
        };
        
        const element1 = Object.keys(elements).find(el => elements[el].includes(sign1));
        const element2 = Object.keys(elements).find(el => elements[el].includes(sign2));
        
        if (element1 === element2) return 85;
        if ((element1 === 'Fire' && element2 === 'Air') || (element1 === 'Air' && element2 === 'Fire')) return 80;
        if ((element1 === 'Earth' && element2 === 'Water') || (element1 === 'Water' && element2 === 'Earth')) return 80;
        return 60;
    }

    getModalityCompatibility(sign1, sign2) {
        const modalities = {
            'Cardinal': ['Aries', 'Cancer', 'Libra', 'Capricorn'],
            'Fixed': ['Taurus', 'Leo', 'Scorpio', 'Aquarius'],
            'Mutable': ['Gemini', 'Virgo', 'Sagittarius', 'Pisces']
        };
        
        const modality1 = Object.keys(modalities).find(mod => modalities[mod].includes(sign1));
        const modality2 = Object.keys(modalities).find(mod => modalities[mod].includes(sign2));
        
        if (modality1 === modality2) return 75;
        return 70;
    }

    getRoseThornBalance(sign1, sign2) {
        // English Rose wisdom - balance of beauty (harmony) and thorns (challenge)
        const harmonySigns = ['Taurus', 'Cancer', 'Libra', 'Pisces'];
        const thornSigns = ['Aries', 'Scorpio', 'Capricorn', 'Aquarius'];
        
        const sign1Beauty = harmonySigns.includes(sign1) ? 85 : 70;
        const sign2Beauty = harmonySigns.includes(sign2) ? 85 : 70;
        const sign1Thorns = thornSigns.includes(sign1) ? 85 : 70;
        const sign2Thorns = thornSigns.includes(sign2) ? 85 : 70;
        
        return Math.round((sign1Beauty + sign2Beauty + sign1Thorns + sign2Thorns) / 4);
    }

    calculateNumerologyCompatibility(soul1, soul2) {
        const lifePath1 = this.calculateLifePathNumber(soul1.birthdate);
        const lifePath2 = this.calculateLifePathNumber(soul2.birthdate);
        const nameNumber1 = this.calculateNameNumber(soul1.name);
        const nameNumber2 = this.calculateNameNumber(soul2.name);
        
        const lifePathCompatibility = this.getNumerologyCompatibility(lifePath1, lifePath2);
        const nameCompatibility = this.getNumerologyCompatibility(nameNumber1, nameNumber2);
        
        return Math.round((lifePathCompatibility + nameCompatibility) / 2);
    }

    calculateLifePathNumber(birthdate) {
        const date = new Date(birthdate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        const sum = day + month + year;
        return this.reduceToSingleDigit(sum);
    }

    calculateNameNumber(name) {
        const letterValues = {
            'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
            'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
            'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
        };
        
        let sum = 0;
        for (let letter of name.toUpperCase()) {
            if (letterValues[letter]) sum += letterValues[letter];
        }
        
        return this.reduceToSingleDigit(sum);
    }

    reduceToSingleDigit(num) {
        while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
            num = num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        }
        return num;
    }

    getNumerologyCompatibility(num1, num2) {
        if (num1 === num2) return 90;
        if (Math.abs(num1 - num2) === 1) return 85;
        if (Math.abs(num1 - num2) === 2) return 75;
        if ((num1 + num2) === 11) return 88;
        return 65;
    }

    calculateMirrorCompatibility(soul1, soul2) {
        // Enhanced with sacred mathematics patterns
        const lifePath1 = this.calculateLifePathNumber(soul1.birthdate);
        const lifePath2 = this.calculateLifePathNumber(soul2.birthdate);
        
        // Check for mirror patterns like 119/126
        const mirrorScore = this.detectMirrorPatterns(lifePath1, lifePath2);
        const dateMirrorScore = this.checkDateMirrorPatterns(soul1.birthdate, soul2.birthdate);
        
        return Math.round((mirrorScore + dateMirrorScore) / 2);
    }

    detectMirrorPatterns(num1, num2) {
        // Sacred patterns from English Rose's wisdom
        const sacredPairs = [
            [1, 19], [11, 9], [12, 6], [22, 22], [33, 33]
        ];
        
        for (let pair of sacredPairs) {
            if ((num1 === pair[0] && num2 === pair[1]) || 
                (num1 === pair[1] && num2 === pair[0])) {
                return 95;
            }
        }
        
        return 75;
    }

    checkDateMirrorPatterns(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        
        const dayDiff = Math.abs(d1.getDate() - d2.getDate());
        const monthDiff = Math.abs(d1.getMonth() - d2.getMonth());
        
        if (dayDiff === 0 && monthDiff === 0) return 90;
        if (dayDiff === 0 || monthDiff === 0) return 82;
        if (dayDiff + monthDiff <= 5) return 78;
        
        return 70;
    }

    calculateThornBeautyBalance(soul1, soul2) {
        // English Rose balance of beauty (harmony) and thorns (strength/challenge)
        const challengeScore = Math.random() * 30 + 60; // 60-90
        const harmonyScore = Math.random() * 30 + 60;  // 60-90
        
        return Math.round((challengeScore + harmonyScore) / 2);
    }

    calculateStreetSacredBalance(soul1, soul2) {
        // Balance of street smarts and sacred wisdom
        const practicalScore = Math.random() * 25 + 65; // 65-90
        const spiritualScore = Math.random() * 25 + 65;      // 65-90
        
        return Math.round((practicalScore + spiritualScore) / 2);
    }

    getCompatibilityTitle(score) {
        const titles = {
            90: "English Rose Soulmates",
            85: "Sacred Mirror Union", 
            80: "Empress Partnership",
            75: "Cultured Spirit Connection",
            70: "Thorn & Beauty Balance",
            65: "Growing Together",
            60: "Sacred Learning Journey",
            55: "Street Smart Wisdom",
            50: "Rose Garden Potential"
        };
        
        for (let threshold of [90, 85, 80, 75, 70, 65, 60, 55, 50]) {
            if (score >= threshold) return titles[threshold];
        }
        return "Sacred Beginning";
    }

    getMotherMessage(score) {
        if (score >= 85) {
            return this.motherWisdom.fierceLove[Math.floor(Math.random() * this.motherWisdom.fierceLove.length)];
        } else if (score >= 70) {
            return this.motherWisdom.mirrorInsights[Math.floor(Math.random() * this.motherWisdom.mirrorInsights.length)];
        } else {
            return this.motherWisdom.empressGuidance[Math.floor(Math.random() * this.motherWisdom.empressGuidance.length)];
        }
    }

    showEnglishRoseLoading() {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem; animation: spin 3s linear infinite;">🌹</div>
                <h3 style="color: var(--primary-pink); margin-bottom: 1rem;">The English Rose is Reading Your Sacred Connection...</h3>
                <p style="color: var(--text-light);">Analyzing mirror patterns, calculating sacred mathematics...</p>
                <div style="margin-top: 2rem; display: flex; justify-content: center; gap: 1rem;">
                    <span style="color: var(--accent);">🌹 Beauty</span>
                    <span style="color: var(--primary-pink);">⚔️ Strength</span>
                    <span style="color: var(--neon-cyan);">✨ Wisdom</span>
                </div>
            </div>
        `;
        
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    displayEnglishRoseResults(compatibility, soul1, soul2) {
        const resultsContainer = document.getElementById('resultsContainer');
        
        resultsContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🌹</div>
                <h2 style="color: var(--primary-pink); margin-bottom: 1rem;">Your English Rose Sacred Reading</h2>
                <div class="soul-names" style="font-size: 1.2rem; color: var(--text-light); margin-bottom: 2rem;">
                    ${soul1.name} & ${soul2.name}
                </div>
            </div>
            
            <!-- Overall Compatibility Score -->
            <div class="compatibility-score">
                <div class="score-circle">
                    <div class="score-inner">${compatibility.overall}%</div>
                </div>
                <h3 class="compatibility-title">${compatibility.title}</h3>
                <p class="compatibility-description">${compatibility.motherMessage}</p>
            </div>
            
            <!-- Enhanced Breakdown -->
            <div class="compatibility-breakdown">
                <div class="breakdown-item">
                    <span class="breakdown-label">🌹 Rose & Thorn Balance</span>
                    <div class="breakdown-bar">
                        <div class="breakdown-fill" style="width: ${compatibility.thornBeauty}%"></div>
                    </div>
                    <span class="breakdown-score">${compatibility.thornBeauty}%</span>
                </div>
                
                <div class="breakdown-item">
                    <span class="breakdown-label">🪞 Mirror Mathematics</span>
                    <div class="breakdown-bar">
                        <div class="breakdown-fill" style="width: ${compatibility.mirror}%"></div>
                    </div>
                    <span class="breakdown-score">${compatibility.mirror}%</span>
                </div>
                
                <div class="breakdown-item">
                    <span class="breakdown-label">⚔️ Street & Sacred Wisdom</span>
                    <div class="breakdown-bar">
                        <div class="breakdown-fill" style="width: ${compatibility.streetSacred}%"></div>
                    </div>
                    <span class="breakdown-score">${compatibility.streetSacred}%</span>
                </div>
                
                <div class="breakdown-item">
                    <span class="breakdown-label">💫 Celestial Harmony</span>
                    <div class="breakdown-bar">
                        <div class="breakdown-fill" style="width: ${compatibility.zodiac}%"></div>
                    </div>
                    <span class="breakdown-score">${compatibility.zodiac}%</span>
                </div>
                
                <div class="breakdown-item">
                    <span class="breakdown-label">🔢 Sacred Numbers</span>
                    <div class="breakdown-bar">
                        <div class="breakdown-fill" style="width: ${compatibility.numerology}%"></div>
                    </div>
                    <span class="breakdown-score">${compatibility.numerology}%</span>
                </div>
            </div>
            
            <!-- Mother's Wisdom Section -->
            <div class="mother-wisdom" style="margin: 2rem 0; padding: 2rem; background: linear-gradient(135deg, rgba(255, 110, 199, 0.1), rgba(196, 113, 237, 0.1)); border-radius: 20px; border: 2px solid rgba(255, 110, 199, 0.3); text-align: center;">
                <h4 style="color: var(--primary-pink); margin-bottom: 1rem;">🌹 The English Rose Speaks</h4>
                <p style="font-style: italic; color: var(--text-light); font-size: 1.1rem; line-height: 1.6;">
                    "${compatibility.motherMessage}"
                </p>
                <p style="margin-top: 1rem; color: var(--text-muted); font-size: 0.9rem;">
                    — The English Rose Empress, your guide through sacred mathematics
                </p>
            </div>
            
            <!-- Action Section -->
            <div class="action-section" style="text-align: center; margin-top: 3rem;">
                <button onclick="window.location.href='reading-generator.html'" class="cta-button" style="background: linear-gradient(135deg, var(--primary-pink), var(--accent)); color: white; padding: 1rem 2rem; border: none; border-radius: 30px; font-size: 1.1rem; cursor: pointer; margin: 0.5rem;">
                    🌹 Get Full English Rose Reading
                </button>
                <button onclick="window.location.href='quantum-rose-about.html'" class="secondary-button" style="background: transparent; color: var(--primary-pink); padding: 1rem 2rem; border: 2px solid var(--primary-pink); border-radius: 30px; font-size: 1.1rem; cursor: pointer; margin: 0.5rem;">
                    📖 About the English Rose
                </button>
            </div>
        `;
        
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Add completion animations
        this.addCompletionAnimations();
    }

    addRoseAnimations() {
        // Add rose petal falling animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @keyframes petalFall {
                0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
            
            .rose-petal {
                position: fixed;
                width: 20px;
                height: 20px;
                background: linear-gradient(135deg, #ff6ec7, #c471ed);
                border-radius: 0 100% 0 100%;
                animation: petalFall 10s linear infinite;
                pointer-events: none;
                z-index: 1;
            }
        `;
        document.head.appendChild(style);
        
        // Create falling rose petals
        setInterval(() => {
            if (Math.random() > 0.7) {
                const petal = document.createElement('div');
                petal.className = 'rose-petal';
                petal.style.left = Math.random() * 100 + '%';
                petal.style.animationDelay = Math.random() * 5 + 's';
                document.body.appendChild(petal);
                
                setTimeout(() => petal.remove(), 10000);
            }
        }, 3000);
    }

    addCompletionAnimations() {
        // Add sparkle effects to scores
        const scoreElements = document.querySelectorAll('.score-inner, .breakdown-fill');
        scoreElements.forEach(el => {
            el.style.animation = 'pulse 2s ease-in-out infinite';
        });
        
        // Add rose glow effect
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.style.animation = 'glow 3s ease-in-out infinite alternate';
    }
}

// Initialize the English Rose Calculator
document.addEventListener('DOMContentLoaded', () => {
    new EnglishRoseCalculator();
});