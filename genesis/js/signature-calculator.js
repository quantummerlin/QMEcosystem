/**
 * Quantum Signature Calculator
 * Personal frequency calculation based on birthdate and name
 */

class QuantumSignatureCalculator {
    constructor() {
        // Frequency mappings
        this.letterValues = {
            'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
            'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
            'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
        };
        
        // Base frequencies for numbers 1-9
        this.baseFrequencies = {
            1: 396,  // Root - Liberation
            2: 417,  // Sacral - Change
            3: 528,  // Solar Plexus - Transformation
            4: 639,  // Heart - Connection
            5: 741,  // Throat - Expression
            6: 852,  // Third Eye - Intuition
            7: 963,  // Crown - Awakening
            8: 432,  // Universal Harmony
            9: 528   // Love & Miracle
        };
        
        // Zodiac frequencies
        this.zodiacFrequencies = {
            'aries': 37,
            'taurus': 73,
            'gemini': 111,
            'cancer': 147,
            'leo': 183,
            'virgo': 219,
            'libra': 255,
            'scorpio': 291,
            'sagittarius': 327,
            'capricorn': 363,
            'aquarius': 399,
            'pisces': 435
        };
    }
    
    /**
     * Calculate complete quantum signature
     */
    calculateSignature(name, birthdate) {
        const signature = {
            name: name,
            birthdate: birthdate,
            timestamp: new Date().toISOString(),
            
            // Core numbers
            lifePathNumber: this.calculateLifePath(birthdate),
            expressionNumber: this.calculateExpression(name),
            soulUrgeNumber: this.calculateSoulUrge(name),
            personalityNumber: this.calculatePersonality(name),
            
            // Frequencies
            primaryFrequency: null,
            secondaryFrequency: null,
            tertiaryFrequency: null,
            zodiacFrequency: null,
            
            // Signature combination
            signatureFrequencies: [],
            signatureWaveforms: [],
            signatureVolumes: [],
            
            // Characteristics
            characteristics: [],
            strengths: [],
            challenges: [],
            recommendations: []
        };
        
        // Calculate primary frequency (from life path)
        signature.primaryFrequency = this.baseFrequencies[signature.lifePathNumber];
        
        // Calculate secondary frequency (from expression)
        signature.secondaryFrequency = this.baseFrequencies[signature.expressionNumber];
        
        // Calculate tertiary frequency (from soul urge)
        signature.tertiaryFrequency = this.baseFrequencies[signature.soulUrgeNumber];
        
        // Calculate zodiac frequency
        const zodiacSign = this.getZodiacSign(birthdate);
        signature.zodiacFrequency = this.zodiacFrequencies[zodiacSign.toLowerCase()];
        signature.zodiacSign = zodiacSign;
        
        // Build signature combination
        signature.signatureFrequencies = [
            signature.primaryFrequency,
            signature.secondaryFrequency,
            signature.tertiaryFrequency,
            signature.zodiacFrequency,
            7.83 // Schumann resonance for grounding
        ];
        
        signature.signatureWaveforms = ['sine', 'sine', 'sine', 'sine', 'sine'];
        signature.signatureVolumes = [0.70, 0.50, 0.30, 0.20, 0.15];
        
        // Add characteristics
        signature.characteristics = this.getCharacteristics(signature);
        signature.strengths = this.getStrengths(signature);
        signature.challenges = this.getChallenges(signature);
        signature.recommendations = this.getRecommendations(signature);
        
        return signature;
    }
    
    /**
     * Calculate Life Path Number
     */
    calculateLifePath(birthdate) {
        const date = new Date(birthdate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        const sum = this.reduceToSingleDigit(day) + 
                    this.reduceToSingleDigit(month) + 
                    this.reduceToSingleDigit(year);
        
        return this.reduceToSingleDigit(sum);
    }
    
    /**
     * Calculate Expression Number (from full name)
     */
    calculateExpression(name) {
        const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
        let sum = 0;
        
        for (let char of cleanName) {
            sum += this.letterValues[char] || 0;
        }
        
        return this.reduceToSingleDigit(sum);
    }
    
    /**
     * Calculate Soul Urge Number (from vowels)
     */
    calculateSoulUrge(name) {
        const vowels = 'AEIOU';
        const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
        let sum = 0;
        
        for (let char of cleanName) {
            if (vowels.includes(char)) {
                sum += this.letterValues[char] || 0;
            }
        }
        
        return this.reduceToSingleDigit(sum);
    }
    
    /**
     * Calculate Personality Number (from consonants)
     */
    calculatePersonality(name) {
        const vowels = 'AEIOU';
        const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
        let sum = 0;
        
        for (let char of cleanName) {
            if (!vowels.includes(char)) {
                sum += this.letterValues[char] || 0;
            }
        }
        
        return this.reduceToSingleDigit(sum);
    }
    
    /**
     * Reduce number to single digit (1-9)
     */
    reduceToSingleDigit(num) {
        while (num > 9) {
            num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        }
        return num;
    }
    
    /**
     * Get zodiac sign from birthdate
     */
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
    
    /**
     * Get characteristics based on signature
     */
    getCharacteristics(signature) {
        const characteristics = [];
        
        // Life path characteristics
        const lifePathTraits = {
            1: 'Natural leader, independent, pioneering spirit',
            2: 'Diplomatic, cooperative, sensitive to others',
            3: 'Creative, expressive, optimistic communicator',
            4: 'Practical, organized, strong foundation builder',
            5: 'Adventurous, freedom-loving, adaptable',
            6: 'Nurturing, responsible, harmonious',
            7: 'Analytical, spiritual seeker, introspective',
            8: 'Ambitious, powerful, material success oriented',
            9: 'Humanitarian, compassionate, universal love'
        };
        
        characteristics.push(lifePathTraits[signature.lifePathNumber]);
        
        return characteristics;
    }
    
    /**
     * Get strengths based on signature
     */
    getStrengths(signature) {
        const strengths = [];
        
        const strengthMap = {
            1: ['Leadership', 'Independence', 'Innovation'],
            2: ['Cooperation', 'Diplomacy', 'Intuition'],
            3: ['Creativity', 'Communication', 'Joy'],
            4: ['Stability', 'Organization', 'Reliability'],
            5: ['Adaptability', 'Freedom', 'Versatility'],
            6: ['Nurturing', 'Harmony', 'Responsibility'],
            7: ['Wisdom', 'Spirituality', 'Analysis'],
            8: ['Power', 'Success', 'Authority'],
            9: ['Compassion', 'Idealism', 'Generosity']
        };
        
        strengths.push(...strengthMap[signature.lifePathNumber]);
        
        return strengths;
    }
    
    /**
     * Get challenges based on signature
     */
    getChallenges(signature) {
        const challenges = [];
        
        const challengeMap = {
            1: ['Ego', 'Impatience', 'Domination'],
            2: ['Over-sensitivity', 'Indecision', 'Dependency'],
            3: ['Scattered energy', 'Superficiality', 'Gossip'],
            4: ['Rigidity', 'Stubbornness', 'Limitation'],
            5: ['Restlessness', 'Irresponsibility', 'Excess'],
            6: ['Perfectionism', 'Worry', 'Self-sacrifice'],
            7: ['Isolation', 'Skepticism', 'Coldness'],
            8: ['Materialism', 'Workaholism', 'Control'],
            9: ['Martyrdom', 'Idealism', 'Emotional distance']
        };
        
        challenges.push(...challengeMap[signature.lifePathNumber]);
        
        return challenges;
    }
    
    /**
     * Get frequency recommendations
     */
    getRecommendations(signature) {
        const recommendations = [];
        
        // Recommend tracks based on signature
        recommendations.push({
            type: 'daily',
            track: 'schumann-earth-resonance',
            reason: 'Grounding and alignment with your signature frequency'
        });
        
        recommendations.push({
            type: 'morning',
            track: 'morning-energy',
            reason: 'Activate your natural strengths'
        });
        
        recommendations.push({
            type: 'meditation',
            track: 'theta-meditation-6hz',
            reason: 'Connect with your higher purpose'
        });
        
        // Add specific recommendations based on life path
        if (signature.lifePathNumber === 1 || signature.lifePathNumber === 8) {
            recommendations.push({
                type: 'abundance',
                track: 'amplified-abundance',
                reason: 'Amplify your natural leadership and success energy'
            });
        }
        
        if (signature.lifePathNumber === 2 || signature.lifePathNumber === 6) {
            recommendations.push({
                type: 'relationships',
                track: 'relationship-harmony',
                reason: 'Enhance your natural gift for connection and harmony'
            });
        }
        
        if (signature.lifePathNumber === 3 || signature.lifePathNumber === 5) {
            recommendations.push({
                type: 'creativity',
                track: 'creative-flow',
                reason: 'Support your creative and expressive nature'
            });
        }
        
        if (signature.lifePathNumber === 7 || signature.lifePathNumber === 9) {
            recommendations.push({
                type: 'spiritual',
                track: '963-pineal-activation',
                reason: 'Deepen your spiritual connection and wisdom'
            });
        }
        
        return recommendations;
    }
    
    /**
     * Generate shareable signature card data
     */
    generateSignatureCard(signature) {
        return {
            name: signature.name,
            lifePathNumber: signature.lifePathNumber,
            primaryFrequency: signature.primaryFrequency,
            zodiacSign: signature.zodiacSign,
            signatureFrequencies: signature.signatureFrequencies,
            topStrength: signature.strengths[0],
            characteristics: signature.characteristics[0],
            shareText: `My Quantum Signature: Life Path ${signature.lifePathNumber} | Primary Frequency ${signature.primaryFrequency}Hz | ${signature.zodiacSign}`,
            shareUrl: `https://quantummerlin.com/signature?lp=${signature.lifePathNumber}&freq=${signature.primaryFrequency}`
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumSignatureCalculator;
}