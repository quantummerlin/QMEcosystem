// Universal Amplification Engine - Core System for Quantum Merlin
// Connects all spiritual tools through symbolic resonance

class UniversalAmplificationEngine {
    constructor() {
        this.frequencies = [];
        this.crystals = [];
        this.gematriaMatches = [];
        this.tarotArchetypes = [];
        this.sigilParameters = {};
        
        this.initializeSystems();
    }

    initializeSystems() {
        this.loadFrequencyDatabase();
        this.loadCrystalMappings();
        this.loadGematriaConnections();
        this.loadTarotArchetypes();
        this.initializeSigilGenerator();
    }

    // Core Amplification Method
    getAmplifications(input, type = 'text') {
        const results = {
            input: input,
            type: type,
            timestamp: new Date().toISOString(),
            amplifications: {}
        };

        // Process based on input type
        if (type === 'text') {
            results.amplifications.gematria = this.calculateGematriaAmplifications(input);
            results.amplifications.frequencies = this.getFrequencyAmplifications(input);
            results.amplifications.crystals = this.getCrystalAmplifications(input);
            results.amplifications.tarot = this.getTarotAmplifications(input);
            results.amplifications.sigils = this.generateSigilParameters(input);
        } else if (type === 'number') {
            results.amplifications.frequencies = this.getFrequencyFromNumber(input);
            results.amplifications.crystals = this.getCrystalsFromNumber(input);
            results.amplifications.gematria = this.getGematriaFromNumber(input);
        } else if (type === 'frequency') {
            results.amplifications.harmonics = this.getHarmonicAmplifications(input);
            results.amplifications.crystals = this.getCrystalsForFrequency(input);
            results.amplifications.chakras = this.getChakraResonance(input);
        }

        return results;
    }

    // Frequency Suggestion System
    getFrequencyAmplifications(text) {
        const gematriaValues = this.calculateGematriaValues(text);
        const frequencies = [];

        gematriaValues.forEach(value => {
            const baseFreq = this.valueToFrequency(value);
            const harmonics = this.generateHarmonics(baseFreq);
            
            frequencies.push({
                gematriaValue: value,
                baseFrequency: baseFreq,
                harmonics: harmonics,
                description: this.getFrequencyDescription(baseFreq),
                chakraResonance: this.getChakraForFrequency(baseFreq)
            });
        });

        return frequencies;
    }

    // Crystal Mapping System
    getCrystalAmplifications(text) {
        const gematriaValues = this.calculateGematriaValues(text);
        const crystals = [];

        gematriaValues.forEach(value => {
            const matchingCrystals = this.crystals.filter(crystal => 
                crystal.gematriaValues && crystal.gematriaValues.includes(value)
            );

            matchingCrystals.forEach(crystal => {
                crystals.push({
                    name: crystal.name,
                    type: crystal.type,
                    properties: crystal.properties,
                    chakra: crystal.chakra,
                    frequency: crystal.frequency,
                    gematriaConnection: value
                });
            });
        });

        return [...new Set(crystals)];
    }

    // Gematria Connection System
    calculateGematriaAmplifications(text) {
        const systems = ['english', 'reduced', 'reverse', 'hebrew'];
        const results = [];

        systems.forEach(system => {
            const value = this.calculateGematria(text, system);
            const connections = this.getGematriaConnections(value, system);
            
            results.push({
                system: system,
                value: value,
                connections: connections,
                significance: this.getGematriaSignificance(value)
            });
        });

        return results;
    }

    // Tarot Archetype Suggestions
    getTarotAmplifications(text) {
        const gematriaValues = this.calculateGematriaValues(text);
        const archetypes = [];

        gematriaValues.forEach(value => {
            const matchingCards = this.tarotArchetypes.filter(card => 
                card.numerology === value || 
                card.gematriaValue === value ||
                (value > 21 && (value % 22 === 0 || value % 21 === 0))
            );

            matchingCards.forEach(card => {
                archetypes.push({
                    card: card.name,
                    number: card.number,
                    suit: card.suit,
                    archetype: card.archetype,
                    meaning: card.meaning,
                    connection: value
                });
            });
        });

        return [...new Set(archetypes)];
    }

    // Sigil Parameter Generation
    generateSigilParameters(text) {
        const gematriaValues = this.calculateGematriaValues(text);
        const primaryValue = gematriaValues[0] || this.calculateGematria(text, 'english');
        
        return {
            text: text,
            primaryGematria: primaryValue,
            geometry: this.generateGeometry(primaryValue),
            colors: this.generateColorScheme(primaryValue),
            sacredRatio: this.calculateSacredRatio(primaryValue),
            frequency: this.valueToFrequency(primaryValue),
            intention: this.extractIntention(text),
            activationMethod: this.suggestActivationMethod(primaryValue)
        };
    }

    // Helper Methods
    calculateGematria(text, system) {
        // Implementation would connect to gematria-systems.js
        const gematriaSystems = {
            english: this.calculateEnglishOrdinal,
            reduced: this.calculateEnglishReduced,
            reverse: this.calculateReverseOrdinal,
            hebrew: this.calculateHebrewGematria
        };
        
        return gematriaSystems[system] ? gematriaSystems[system](text) : 0;
    }

    calculateGematriaValues(text) {
        return [
            this.calculateGematria(text, 'english'),
            this.calculateGematria(text, 'reduced'),
            this.calculateGematria(text, 'reverse'),
            this.calculateGematria(text, 'hebrew')
        ].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates
    }

    valueToFrequency(value) {
        // Convert gematria value to frequency (Hz)
        // Using sacred frequency ratios
        const baseFreq = 432; // A=432Hz tuning
        const ratio = 1.059463; // Equal temperament ratio
        return Math.round(baseFreq * Math.pow(ratio, (value - 1) % 12));
    }

    generateHarmonics(baseFreq) {
        const harmonics = [];
        for (let i = 1; i <= 5; i++) {
            harmonics.push(baseFreq * i);
            harmonics.push(baseFreq * 1.5 * i); // Fifth harmonics
        }
        return harmonics.slice(0, 8);
    }

    generateGeometry(value) {
        const shapes = ['circle', 'triangle', 'square', 'pentagon', 'hexagon', 'octagon'];
        const complexity = Math.min(value % 10 + 3, 12);
        return {
            primaryShape: shapes[value % shapes.length],
            points: complexity,
            symmetry: value % 2 === 0 ? 'bilateral' : 'radial',
            sacredGeometry: this.determineSacredGeometry(value)
        };
    }

    generateColorScheme(value) {
        const chakraColors = [
            '#FF0000', // Root
            '#FFA500', // Sacral
            '#FFFF00', // Solar Plexus
            '#00FF00', // Heart
            '#0000FF', // Throat
            '#4B0082', // Third Eye
            '#9400D3'  // Crown
        ];
        
        const primaryColor = chakraColors[value % chakraColors.length];
        const secondaryColor = chakraColors[(value + 3) % chakraColors.length];
        
        return {
            primary: primaryColor,
            secondary: secondaryColor,
            accent: this.generateAccentColor(value),
            harmony: this.getHarmoniousColors(primaryColor)
        };
    }

    // Database Loading Methods
    loadFrequencyDatabase() {
        // This would load from the frequency database files
        this.frequencies = [
            { value: 1, frequency: 432, chakra: 'root', description: 'Grounding and stability' },
            { value: 2, frequency: 528, chakra: 'sacral', description: 'Creativity and transformation' },
            { value: 3, frequency: 639, chakra: 'solar', description: 'Personal power and confidence' },
            // ... more frequencies
        ];
    }

    loadCrystalMappings() {
        this.crystals = [
            { 
                name: 'Clear Quartz', 
                type: 'amplifier', 
                properties: ['clarity', 'amplification', 'healing'],
                chakra: 'crown',
                frequency: 432,
                gematriaValues: [1, 8, 11, 22]
            },
            {
                name: 'Amethyst',
                type: 'spiritual',
                properties: ['intuition', 'spiritual growth', 'calm'],
                chakra: 'third eye',
                frequency: 639,
                gematriaValues: [3, 7, 12, 21]
            },
            // ... more crystals
        ];
    }

    loadGematriaConnections() {
        // Load from gematria-matches.js
        this.gematriaMatches = [
            { value: 11, meanings: ['master number', 'intuition', 'spiritual insight'] },
            { value: 22, meanings: ['master builder', 'ancient wisdom', 'manifestation'] },
            // ... more connections
        ];
    }

    loadTarotArchetypes() {
        this.tarotArchetypes = [
            { 
                name: 'The Fool', 
                number: 0, 
                suit: 'Major Arcana',
                archetype: 'Beginner\'s Mind', 
                meaning: 'New beginnings, innocence, freedom',
                numerology: 0,
                gematriaValue: 0
            },
            {
                name: 'The Magician',
                number: 1,
                suit: 'Major Arcana',
                archetype: 'Divine Manifestation',
                meaning: 'Willpower, manifestation, creation',
                numerology: 1,
                gematriaValue: 1
            },
            // ... all 78 cards
        ];
    }

    // Additional helper methods would be implemented here
    getFrequencyDescription(frequency) {
        // Return description based on frequency
        return `Sacred frequency at ${frequency}Hz for spiritual alignment`;
    }

    getChakraForFrequency(frequency) {
        // Map frequency to chakra
        const chakraFreqs = {
            432: 'root',
            528: 'sacral', 
            639: 'solar',
            741: 'heart',
            852: 'throat',
            963: 'third eye',
            1080: 'crown'
        };
        return chakraFreqs[frequency] || 'all';
    }

    getGematriaConnections(value, system) {
        // Return connections for specific gematria value
        return this.gematriaMatches.find(match => match.value === value) || {};
    }

    getGematriaSignificance(value) {
        if ([11, 22, 33, 44].includes(value)) {
            return 'Master Number - Enhanced spiritual significance';
        } else if (value <= 9) {
            return 'Single digit - Primary spiritual essence';
        } else {
            return 'Compound number - Complex spiritual energy';
        }
    }

    generateGeometry(value) {
        const shapes = ['circle', 'triangle', 'square', 'pentagon', 'hexagon', 'octagon'];
        return {
            primaryShape: shapes[value % shapes.length],
            points: Math.min(value % 10 + 3, 12),
            symmetry: value % 2 === 0 ? 'bilateral' : 'radial'
        };
    }

    generateColorScheme(value) {
        const chakraColors = [
            '#FF0000', '#FFA500', '#FFFF00', '#00FF00', 
            '#0000FF', '#4B0082', '#9400D3'
        ];
        
        return {
            primary: chakraColors[value % chakraColors.length],
            secondary: chakraColors[(value + 3) % chakraColors.length],
            accent: this.generateAccentColor(value)
        };
    }

    generateAccentColor(value) {
        const hue = (value * 137.5) % 360; // Golden angle
        return `hsl(${hue}, 70%, 50%)`;
    }

    calculateSacredRatio(value) {
        const phi = (1 + Math.sqrt(5)) / 2;
        return {
            goldenRatio: phi,
            scaled: value * phi,
            harmonics: [phi, phi * 2, phi / 2]
        };
    }

    extractIntention(text) {
        // Simple intention extraction
        const words = text.toLowerCase().split(' ');
        const intentionWords = ['love', 'peace', 'healing', 'abundance', 'clarity'];
        return words.find(word => intentionWords.includes(word)) || 'transformation';
    }

    suggestActivationMethod(value) {
        const methods = ['meditation', 'visualization', 'chanting', 'crystal grid', 'sound healing'];
        return methods[value % methods.length];
    }

    initializeSigilGenerator() {
        // Initialize sigil generation parameters
        this.sigilParameters = {
            sacredGeometries: ['flower of life', 'metatron\'s cube', 'vesica piscis'],
            activationMethods: ['lunar', 'solar', 'planetary'],
            elements: ['fire', 'water', 'air', 'earth', 'spirit']
        };
    }

    getHarmonicAmplifications(frequency) {
        return {
            fundamental: frequency,
            overtones: this.generateHarmonics(frequency),
            schumann: [7.83, 14.3, 20.8, 27.3, 33.8],
            planetary: this.getPlanetaryFrequencies()
        };
    }

    getPlanetaryFrequencies() {
        return {
            earth: 136.1,
            moon: 210.42,
            sun: 126.22,
            mercury: 141.27,
            venus: 221.23,
            mars: 144.72,
            jupiter: 183.58,
            saturn: 147.85,
            uranus: 207.36,
            neptune: 211.44,
            pluto: 140.25
        };
    }

    getCrystalsForFrequency(frequency) {
        return this.crystals.filter(crystal => 
            Math.abs(crystal.frequency - frequency) < 50
        );
    }

    getChakraResonance(frequency) {
        const chakras = {
            root: { freq: 256, element: 'earth' },
            sacral: { freq: 288, element: 'water' },
            solar: { freq: 320, element: 'fire' },
            heart: { freq: 341, element: 'air' },
            throat: { freq: 384, element: 'ether' },
            thirdEye: { freq: 426, element: 'light' },
            crown: { freq: 480, element: 'spirit' }
        };
        
        const closest = Object.entries(chakras).reduce((prev, [name, data]) => {
            const diff = Math.abs(data.freq - frequency);
            return diff < prev.diff ? { name, ...data, diff } : prev;
        }, { diff: Infinity });
        
        return closest;
    }

    // Gematria calculation methods
    calculateEnglishOrdinal(text) {
        const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
        let sum = 0;
        for (let char of cleanText) {
            sum += char.charCodeAt(0) - 64; // A=1, B=2, etc.
        }
        return sum;
    }

    calculateEnglishReduced(text) {
        const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
        let sum = 0;
        for (let char of cleanText) {
            let value = char.charCodeAt(0) - 64;
            sum += value > 9 ? value - 9 : value; // Reduce to single digit
        }
        return sum;
    }

    calculateReverseOrdinal(text) {
        const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
        let sum = 0;
        for (let char of cleanText) {
            sum += 27 - (char.charCodeAt(0) - 64); // Z=1, Y=2, etc.
        }
        return sum;
    }

    calculateHebrewGematria(text) {
        // Simplified Hebrew gematria calculation
        const hebrewValues = {
            A: 1, B: 2, G: 3, D: 4, H: 5, V: 6, Z: 7, Ch: 8, T: 9,
            Y: 10, K: 20, L: 30, M: 40, N: 50, S: 60, Ayn: 70, P: 80,
            Tz: 90, Q: 100, R: 200, Sh: 300, Tav: 400
        };
        
        const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
        let sum = 0;
        for (let char of cleanText) {
            sum += hebrewValues[char] || 0;
        }
        return sum;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalAmplificationEngine;
}

// Initialize global instance
window.UniversalAmplificationEngine = UniversalAmplificationEngine;