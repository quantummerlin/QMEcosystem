// Quantum Merlin Comprehensive Compatibility Calculator
// 12 Mystical Systems - Maximum Accuracy

class QuantumCompatibilityCalculator {
    constructor() {
        this.wisdomMessages = {
            high: [
                "The cosmos has aligned your paths with rare precision. This connection carries the signature of destiny.",
                "Your souls vibrate at harmonious frequencies across multiple dimensions of existence.",
                "Like twin stars in a binary system, your energies complement and amplify each other.",
                "The sacred mathematics of your connection reveals profound cosmic alignment.",
                "This bond transcends ordinary understanding - the universe recognizes your union."
            ],
            medium: [
                "Your connection holds beautiful potential waiting to be unlocked through awareness.",
                "The cosmos shows both harmony and growth opportunities in your sacred bond.",
                "Like a garden tended with care, this relationship flourishes with conscious nurturing.",
                "Your differences create dynamic balance - complementary forces in cosmic dance.",
                "The universe has brought you together for mutual evolution and soul growth."
            ],
            growing: [
                "Every sacred connection requires patience and understanding to fully bloom.",
                "The challenges in your cosmic chart are opportunities for profound transformation.",
                "Like the phoenix rising, your bond strengthens through conscious effort.",
                "The cosmos presents you with a powerful path of learning and evolution.",
                "This connection is a sacred classroom where both souls can expand."
            ]
        };
        
        this.initializeCalculator();
    }

    initializeCalculator() {
        const form = document.getElementById('compatibilityForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateComprehensiveCompatibility();
            });
        }
    }

    calculateComprehensiveCompatibility() {
        const formData = new FormData(document.getElementById('compatibilityForm'));
        const relationshipType = formData.get('relationshipType') || 'romantic';
        
        const soul1 = {
            name: formData.get('name1'),
            birthdate: formData.get('birthdate1'),
            birthtime: formData.get('birthtime1'),
            birthplace: formData.get('birthplace1'),
            currentLocation: formData.get('currentLocation1')
        };
        
        const soul2 = {
            name: formData.get('name2'),
            birthdate: formData.get('birthdate2'),
            birthtime: formData.get('birthtime2'),
            birthplace: formData.get('birthplace2'),
            currentLocation: formData.get('currentLocation2')
        };
        
        this.showLoadingAnimation();
        
        setTimeout(() => {
            const results = this.performAllCalculations(soul1, soul2, relationshipType);
            this.displayResults(results, soul1, soul2, relationshipType);
        }, 2500);
    }

    performAllCalculations(soul1, soul2, relationshipType) {
        // All 12 mystical systems
        const zodiac = this.calculateZodiacCompatibility(soul1, soul2);
        const chineseZodiac = this.calculateChineseZodiacCompatibility(soul1, soul2);
        const numerology = this.calculateNumerologyCompatibility(soul1, soul2);
        const tarot = this.calculateTarotCompatibility(soul1, soul2);
        const sacredGeometry = this.calculateSacredGeometry(soul1, soul2);
        const planetary = this.calculatePlanetaryCompatibility(soul1, soul2);
        const elemental = this.calculateElementalBalance(soul1, soul2);
        const moonPhase = this.calculateMoonPhaseCompatibility(soul1, soul2);
        const karmic = this.calculateKarmicCompatibility(soul1, soul2);
        const nameVibration = this.calculateNameVibration(soul1, soul2);
        const birthDayPower = this.calculateBirthDayPower(soul1, soul2);
        const currentCosmic = this.calculateCurrentCosmicInfluence(soul1, soul2);

        // Weighted scoring based on relationship type
        const weights = this.getRelationshipWeights(relationshipType);
        
        const overall = Math.round(
            zodiac.score * weights.zodiac +
            chineseZodiac.score * weights.chinese +
            numerology.score * weights.numerology +
            tarot.score * weights.tarot +
            sacredGeometry.score * weights.geometry +
            planetary.score * weights.planetary +
            elemental.score * weights.elemental +
            moonPhase.score * weights.moon +
            karmic.score * weights.karmic +
            nameVibration.score * weights.name +
            birthDayPower.score * weights.birthday +
            currentCosmic.score * weights.current
        );

        return {
            overall: Math.min(99, Math.max(1, overall)),
            zodiac, chineseZodiac, numerology, tarot, sacredGeometry, planetary,
            elemental, moonPhase, karmic, nameVibration, birthDayPower, currentCosmic,
            title: this.getCompatibilityTitle(overall, relationshipType),
            message: this.getWisdomMessage(overall)
        };
    }

    getRelationshipWeights(type) {
        const weights = {
            romantic: { zodiac: 0.12, chinese: 0.08, numerology: 0.12, tarot: 0.08, geometry: 0.06, planetary: 0.10, elemental: 0.10, moon: 0.08, karmic: 0.08, name: 0.06, birthday: 0.06, current: 0.06 },
            friendship: { zodiac: 0.10, chinese: 0.08, numerology: 0.10, tarot: 0.06, geometry: 0.06, planetary: 0.08, elemental: 0.12, moon: 0.06, karmic: 0.06, name: 0.10, birthday: 0.08, current: 0.10 },
            business: { zodiac: 0.08, chinese: 0.10, numerology: 0.14, tarot: 0.06, geometry: 0.08, planetary: 0.08, elemental: 0.10, moon: 0.04, karmic: 0.06, name: 0.10, birthday: 0.08, current: 0.08 },
            family: { zodiac: 0.10, chinese: 0.08, numerology: 0.10, tarot: 0.08, geometry: 0.06, planetary: 0.08, elemental: 0.10, moon: 0.08, karmic: 0.12, name: 0.06, birthday: 0.08, current: 0.06 },
            twinflame: { zodiac: 0.10, chinese: 0.06, numerology: 0.12, tarot: 0.10, geometry: 0.10, planetary: 0.10, elemental: 0.08, moon: 0.10, karmic: 0.12, name: 0.04, birthday: 0.04, current: 0.04 },
            soulcontract: { zodiac: 0.08, chinese: 0.06, numerology: 0.10, tarot: 0.10, geometry: 0.08, planetary: 0.08, elemental: 0.08, moon: 0.08, karmic: 0.14, name: 0.06, birthday: 0.06, current: 0.08 }
        };
        return weights[type] || weights.romantic;
    }

    // ========== 1. WESTERN ZODIAC ==========
    calculateZodiacCompatibility(soul1, soul2) {
        const sign1 = this.getZodiacSign(soul1.birthdate);
        const sign2 = this.getZodiacSign(soul2.birthdate);
        const element1 = this.getElement(sign1);
        const element2 = this.getElement(sign2);
        
        const elementScore = this.getElementCompatibilityScore(element1, element2);
        const signScore = this.getSignCompatibilityScore(sign1, sign2);
        const score = Math.round(elementScore * 0.5 + signScore * 0.5);
        
        return { score, sign1, sign2, element1, element2 };
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

    getElement(sign) {
        const elements = {
            Fire: ['Aries', 'Leo', 'Sagittarius'],
            Earth: ['Taurus', 'Virgo', 'Capricorn'],
            Air: ['Gemini', 'Libra', 'Aquarius'],
            Water: ['Cancer', 'Scorpio', 'Pisces']
        };
        return Object.keys(elements).find(el => elements[el].includes(sign));
    }

    getElementCompatibilityScore(el1, el2) {
        const compatibility = {
            'Fire-Fire': 88, 'Fire-Earth': 55, 'Fire-Air': 92, 'Fire-Water': 45,
            'Earth-Earth': 85, 'Earth-Air': 58, 'Earth-Water': 90,
            'Air-Air': 82, 'Air-Water': 52, 'Water-Water': 88
        };
        const key = [el1, el2].sort().join('-');
        return compatibility[key] || 70;
    }

    getSignCompatibilityScore(sign1, sign2) {
        const matrix = {
            'Aries': {'Aries':75,'Taurus':60,'Gemini':85,'Cancer':55,'Leo':95,'Virgo':58,'Libra':72,'Scorpio':65,'Sagittarius':93,'Capricorn':52,'Aquarius':88,'Pisces':62},
            'Taurus': {'Taurus':82,'Gemini':55,'Cancer':92,'Leo':68,'Virgo':95,'Libra':72,'Scorpio':88,'Sagittarius':52,'Capricorn':96,'Aquarius':48,'Pisces':90},
            'Gemini': {'Gemini':78,'Cancer':58,'Leo':88,'Virgo':68,'Libra':95,'Scorpio':52,'Sagittarius':85,'Capricorn':55,'Aquarius':93,'Pisces':58},
            'Cancer': {'Cancer':80,'Leo':72,'Virgo':88,'Libra':55,'Scorpio':96,'Sagittarius':48,'Capricorn':78,'Aquarius':52,'Pisces':98},
            'Leo': {'Leo':75,'Virgo':62,'Libra':88,'Scorpio':72,'Sagittarius':95,'Capricorn':58,'Aquarius':78,'Pisces':62},
            'Virgo': {'Virgo':78,'Libra':68,'Scorpio':90,'Sagittarius':55,'Capricorn':95,'Aquarius':58,'Pisces':72},
            'Libra': {'Libra':75,'Scorpio':72,'Sagittarius':88,'Capricorn':62,'Aquarius':95,'Pisces':65},
            'Scorpio': {'Scorpio':85,'Sagittarius':62,'Capricorn':88,'Aquarius':58,'Pisces':96},
            'Sagittarius': {'Sagittarius':82,'Capricorn':55,'Aquarius':90,'Pisces':68},
            'Capricorn': {'Capricorn':80,'Aquarius':62,'Pisces':78},
            'Aquarius': {'Aquarius':78,'Pisces':62},
            'Pisces': {'Pisces':85}
        };
        return matrix[sign1]?.[sign2] || matrix[sign2]?.[sign1] || 70;
    }

    // ========== 2. CHINESE ZODIAC ==========
    calculateChineseZodiacCompatibility(soul1, soul2) {
        const animal1 = this.getChineseZodiac(soul1.birthdate);
        const animal2 = this.getChineseZodiac(soul2.birthdate);
        const score = this.getChineseAnimalCompatibility(animal1, animal2);
        return { score, animal1, animal2 };
    }

    getChineseZodiac(birthdate) {
        const year = new Date(birthdate).getFullYear();
        const animals = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
        return animals[(year - 1900) % 12];
    }

    getChineseAnimalCompatibility(a1, a2) {
        const triads = [['Rat','Dragon','Monkey'],['Ox','Snake','Rooster'],['Tiger','Horse','Dog'],['Rabbit','Goat','Pig']];
        for (const triad of triads) {
            if (triad.includes(a1) && triad.includes(a2)) return a1 === a2 ? 82 : 92;
        }
        const clashes = {'Rat':'Horse','Ox':'Goat','Tiger':'Monkey','Rabbit':'Rooster','Dragon':'Dog','Snake':'Pig'};
        if (clashes[a1] === a2 || clashes[a2] === a1) return 55;
        return 72;
    }

    // ========== 3. NUMEROLOGY ==========
    calculateNumerologyCompatibility(soul1, soul2) {
        const lifePath1 = this.calculateLifePath(soul1.birthdate);
        const lifePath2 = this.calculateLifePath(soul2.birthdate);
        const score = this.getLifePathCompatibility(lifePath1, lifePath2);
        return { score, lifePath1, lifePath2 };
    }

    calculateLifePath(birthdate) {
        const date = new Date(birthdate);
        let sum = date.getDate() + (date.getMonth() + 1) + date.getFullYear();
        return this.reduceToMaster(sum);
    }

    reduceToMaster(num) {
        while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
            num = String(num).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        }
        return num;
    }

    getLifePathCompatibility(lp1, lp2) {
        const naturalPairs = [[1,5],[2,4],[2,8],[3,6],[3,9],[4,8],[5,7],[6,9]];
        for (const pair of naturalPairs) {
            if ((lp1===pair[0]&&lp2===pair[1])||(lp1===pair[1]&&lp2===pair[0])) return 92;
        }
        if (lp1 === lp2) return [11,22,33].includes(lp1) ? 95 : 85;
        if ((lp1 + lp2) === 9 || (lp1 + lp2) === 18) return 88;
        return 72;
    }

    // ========== 4. TAROT ==========
    calculateTarotCompatibility(soul1, soul2) {
        const card1 = this.getBirthTarotCard(soul1.birthdate);
        const card2 = this.getBirthTarotCard(soul2.birthdate);
        const score = this.getTarotCardCompatibility(card1, card2);
        return { score, card1, card2 };
    }

    getBirthTarotCard(birthdate) {
        const date = new Date(birthdate);
        const sum = date.getDate() + (date.getMonth() + 1) + date.getFullYear();
        let reduced = this.reduceToMaster(sum);
        if (reduced > 22) reduced = this.reduceToMaster(reduced);
        const cards = {1:'Magician',2:'High Priestess',3:'Empress',4:'Emperor',5:'Hierophant',6:'Lovers',7:'Chariot',8:'Strength',9:'Hermit',10:'Wheel of Fortune',11:'Justice',12:'Hanged Man',13:'Death',14:'Temperance',15:'Devil',16:'Tower',17:'Star',18:'Moon',19:'Sun',20:'Judgement',21:'World',22:'Fool'};
        return { number: reduced, name: cards[reduced] || 'Fool' };
    }

    getTarotCardCompatibility(c1, c2) {
        if (c1.number === c2.number) return 88;
        if (c1.number + c2.number === 22) return 90;
        if (Math.abs(c1.number - c2.number) <= 2) return 82;
        return 75;
    }

    // ========== 5. SACRED GEOMETRY ==========
    calculateSacredGeometry(soul1, soul2) {
        const shape1 = this.getSacredShape(soul1.birthdate);
        const shape2 = this.getSacredShape(soul2.birthdate);
        const score = this.getGeometryCompatibility(shape1, shape2);
        return { score, shape1, shape2 };
    }

    getSacredShape(birthdate) {
        const lifeNum = this.calculateLifePath(birthdate);
        const shapes = {1:'Circle',2:'Vesica Piscis',3:'Triangle',4:'Square',5:'Pentagon',6:'Hexagon',7:'Heptagon',8:'Octagon',9:'Nonagon',11:'Merkaba',22:'Flower of Life',33:'Metatron\'s Cube'};
        return shapes[lifeNum] || 'Circle';
    }

    getGeometryCompatibility(s1, s2) {
        if (s1 === s2) return 85;
        if ((s1==='Circle'&&s2==='Vesica Piscis')||(s2==='Circle'&&s1==='Vesica Piscis')) return 95;
        if ((s1==='Triangle'&&s2==='Hexagon')||(s2==='Triangle'&&s1==='Hexagon')) return 92;
        if (['Merkaba','Flower of Life','Metatron\'s Cube'].includes(s1)||['Merkaba','Flower of Life','Metatron\'s Cube'].includes(s2)) return 88;
        return 75;
    }

    // ========== 6. PLANETARY RULERS ==========
    calculatePlanetaryCompatibility(soul1, soul2) {
        const ruler1 = this.getPlanetaryRuler(soul1.birthdate);
        const ruler2 = this.getPlanetaryRuler(soul2.birthdate);
        const score = this.getPlanetaryScore(ruler1, ruler2);
        return { score, ruler1, ruler2 };
    }

    getPlanetaryRuler(birthdate) {
        const sign = this.getZodiacSign(birthdate);
        const rulers = {'Aries':'Mars','Taurus':'Venus','Gemini':'Mercury','Cancer':'Moon','Leo':'Sun','Virgo':'Mercury','Libra':'Venus','Scorpio':'Pluto','Sagittarius':'Jupiter','Capricorn':'Saturn','Aquarius':'Uranus','Pisces':'Neptune'};
        return rulers[sign];
    }

    getPlanetaryScore(p1, p2) {
        if (p1 === p2) return 85;
        const harmonious = [['Sun','Moon'],['Venus','Mars'],['Jupiter','Saturn']];
        for (const pair of harmonious) {
            if ((p1===pair[0]&&p2===pair[1])||(p1===pair[1]&&p2===pair[0])) return 92;
        }
        return 78;
    }

    // ========== 7. ELEMENTAL BALANCE ==========
    calculateElementalBalance(soul1, soul2) {
        const el1 = this.getElement(this.getZodiacSign(soul1.birthdate));
        const el2 = this.getElement(this.getZodiacSign(soul2.birthdate));
        const score = this.getElementCompatibilityScore(el1, el2);
        return { score, element1: el1, element2: el2 };
    }

    // ========== 8. MOON PHASE ==========
    calculateMoonPhaseCompatibility(soul1, soul2) {
        const phase1 = this.getMoonPhase(soul1.birthdate);
        const phase2 = this.getMoonPhase(soul2.birthdate);
        const score = this.getMoonPhaseScore(phase1, phase2);
        return { score, phase1, phase2 };
    }

    getMoonPhase(birthdate) {
        const date = new Date(birthdate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const jd = Math.floor(365.25*(year+4716))+Math.floor(30.6001*(month+1))+day-1524.5;
        const phase = ((jd-2451550.1)/29.530588853)%1;
        if (phase<0.0625) return 'New Moon';
        if (phase<0.1875) return 'Waxing Crescent';
        if (phase<0.3125) return 'First Quarter';
        if (phase<0.4375) return 'Waxing Gibbous';
        if (phase<0.5625) return 'Full Moon';
        if (phase<0.6875) return 'Waning Gibbous';
        if (phase<0.8125) return 'Last Quarter';
        if (phase<0.9375) return 'Waning Crescent';
        return 'New Moon';
    }

    getMoonPhaseScore(p1, p2) {
        const phases = ['New Moon','Waxing Crescent','First Quarter','Waxing Gibbous','Full Moon','Waning Gibbous','Last Quarter','Waning Crescent'];
        const idx1 = phases.indexOf(p1);
        const idx2 = phases.indexOf(p2);
        if (idx1===idx2) return 88;
        if (Math.abs(idx1-idx2)===4) return 92;
        if (Math.abs(idx1-idx2)===1||Math.abs(idx1-idx2)===7) return 82;
        return 75;
    }

    // ========== 9. KARMIC NUMBERS ==========
    calculateKarmicCompatibility(soul1, soul2) {
        const day1 = new Date(soul1.birthdate).getDate();
        const day2 = new Date(soul2.birthdate).getDate();
        const karmicDebt = [13,14,16,19];
        const hasKarma1 = karmicDebt.includes(day1);
        const hasKarma2 = karmicDebt.includes(day2);
        let score = 75;
        if (hasKarma1 && hasKarma2) score = 92;
        else if (hasKarma1 || hasKarma2) score = 82;
        return { score, karmic1: day1, karmic2: day2 };
    }

    // ========== 10. NAME VIBRATION ==========
    calculateNameVibration(soul1, soul2) {
        const vib1 = this.getNameVibration(soul1.name);
        const vib2 = this.getNameVibration(soul2.name);
        const harmonics = Math.abs(vib1 - vib2);
        let score = harmonics===0 ? 92 : harmonics<=2 ? 88 : harmonics<=4 ? 80 : 72;
        return { score, vibration1: vib1, vibration2: vib2 };
    }

    getNameVibration(name) {
        const values = {A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8};
        let sum = 0;
        for (let char of name.toUpperCase().replace(/[^A-Z]/g, '')) {
            sum += values[char] || 0;
        }
        return this.reduceToMaster(sum);
    }

    // ========== 11. BIRTHDAY POWER ==========
    calculateBirthDayPower(soul1, soul2) {
        const day1 = new Date(soul1.birthdate).getDate();
        const day2 = new Date(soul2.birthdate).getDate();
        const power1 = this.reduceToMaster(day1);
        const power2 = this.reduceToMaster(day2);
        let score = power1===power2 ? 90 : Math.abs(power1-power2)===1 ? 85 : (power1+power2===11||power1+power2===22) ? 92 : 75;
        return { score, power1, power2 };
    }

    // ========== 12. CURRENT COSMIC INFLUENCE ==========
    calculateCurrentCosmicInfluence(soul1, soul2) {
        const today = new Date();
        const currentSign = this.getZodiacSign(today.toISOString().split('T')[0]);
        const currentMoon = this.getMoonPhase(today.toISOString().split('T')[0]);
        const sign1 = this.getZodiacSign(soul1.birthdate);
        const sign2 = this.getZodiacSign(soul2.birthdate);
        
        let score = 75;
        if (currentSign===sign1 || currentSign===sign2) score += 10;
        const el = this.getElement(currentSign);
        const el1 = this.getElement(sign1);
        const el2 = this.getElement(sign2);
        if (el===el1 || el===el2) score += 5;
        
        return { score: Math.min(score,98), currentSign, currentMoon };
    }

    // ========== DISPLAY ==========
    getCompatibilityTitle(score, type) {
        const titles = {
            romantic: {95:'Divine Soulmates',85:'Destined Hearts',75:'Harmonious Union',65:'Growing Love',55:'Learning Journey'},
            friendship: {95:'Soul Siblings',85:'Kindred Spirits',75:'True Friends',65:'Building Bond',55:'New Connection'},
            business: {95:'Perfect Partners',85:'Power Duo',75:'Strong Alliance',65:'Promising Team',55:'Learning Curve'},
            default: {95:'Cosmic Soulmates',85:'Sacred Connection',75:'Harmonic Bond',65:'Growing Together',55:'Path of Discovery'}
        };
        const typeTitle = titles[type] || titles.default;
        for (let threshold of [95,85,75,65,55]) {
            if (score >= threshold) return typeTitle[threshold];
        }
        return 'New Beginning';
    }

    getWisdomMessage(score) {
        if (score >= 80) return this.wisdomMessages.high[Math.floor(Math.random()*this.wisdomMessages.high.length)];
        if (score >= 60) return this.wisdomMessages.medium[Math.floor(Math.random()*this.wisdomMessages.medium.length)];
        return this.wisdomMessages.growing[Math.floor(Math.random()*this.wisdomMessages.growing.length)];
    }

    showLoadingAnimation() {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = `
            <div style="text-align:center;padding:3rem;">
                <div style="font-size:4rem;margin-bottom:1rem;animation:pulse 1.5s ease-in-out infinite;">🔮</div>
                <h3 style="color:var(--neon-cyan);margin-bottom:1rem;font-family:'Orbitron',monospace;">Analyzing 12 Mystical Systems...</h3>
                <p style="color:rgba(255,255,255,0.7);font-size:0.9rem;">Western Zodiac • Chinese Zodiac • Numerology • Tarot</p>
                <p style="color:rgba(255,255,255,0.7);font-size:0.9rem;">Sacred Geometry • Planetary Rulers • Elements • Moon Phases</p>
                <p style="color:rgba(255,255,255,0.7);font-size:0.9rem;">Karmic Numbers • Name Vibration • Birthday Power • Current Cosmos</p>
                <div style="margin-top:2rem;display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;">
                    <span style="animation:fadeInOut 2s ease-in-out infinite;">⭐</span>
                    <span style="animation:fadeInOut 2s ease-in-out infinite 0.2s;">🌙</span>
                    <span style="animation:fadeInOut 2s ease-in-out infinite 0.4s;">✨</span>
                    <span style="animation:fadeInOut 2s ease-in-out infinite 0.6s;">💫</span>
                    <span style="animation:fadeInOut 2s ease-in-out infinite 0.8s;">🔯</span>
                </div>
            </div>
            <style>
                @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.1);}}
                @keyframes fadeInOut{0%,100%{opacity:0.3;}50%{opacity:1;}}
            </style>
        `;
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    displayResults(results, soul1, soul2, relationshipType) {
        const resultsContainer = document.getElementById('resultsContainer');
        
        resultsContainer.innerHTML = `
            <div style="text-align:center;margin-bottom:2rem;">
                <div style="font-size:3rem;margin-bottom:1rem;">✨</div>
                <h2 style="color:var(--neon-cyan);margin-bottom:0.5rem;font-family:'Orbitron',monospace;">Quantum Compatibility Analysis</h2>
                <div style="font-size:1.3rem;color:var(--neon-gold);margin-bottom:1rem;">${soul1.name} & ${soul2.name}</div>
                <div style="font-size:0.9rem;color:rgba(255,255,255,0.6);text-transform:capitalize;">${relationshipType.replace('-',' ')} Connection</div>
            </div>
            
            <div class="compatibility-score">
                <div class="score-circle" style="background:conic-gradient(var(--neon-cyan) ${results.overall}%, rgba(255,255,255,0.1) 0);">
                    <div class="score-inner">${results.overall}%</div>
                </div>
                <h3 class="compatibility-title" style="color:var(--neon-gold);margin-top:1rem;">${results.title}</h3>
                <p style="color:rgba(255,255,255,0.8);font-style:italic;max-width:500px;margin:1rem auto;">"${results.message}"</p>
            </div>
            
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;margin:2rem 0;">
                <div style="background:rgba(0,245,255,0.05);border:1px solid rgba(0,245,255,0.3);border-radius:15px;padding:1.5rem;">
                    <h4 style="color:var(--neon-cyan);margin-bottom:0.5rem;">⭐ Western Zodiac</h4>
                    <div style="font-size:1.5rem;margin-bottom:0.5rem;">${results.zodiac.sign1} + ${results.zodiac.sign2}</div>
                    <div style="color:var(--neon-gold);">${results.zodiac.score}%</div>
                </div>
                <div style="background:rgba(255,0,102,0.05);border:1px solid rgba(255,0,102,0.3);border-radius:15px;padding:1.5rem;">
                    <h4 style="color:var(--neon-pink);margin-bottom:0.5rem;">🐉 Chinese Zodiac</h4>
                    <div style="font-size:1.5rem;margin-bottom:0.5rem;">${results.chineseZodiac.animal1} + ${results.chineseZodiac.animal2}</div>
                    <div style="color:var(--neon-gold);">${results.chineseZodiac.score}%</div>
                </div>
                <div style="background:rgba(157,0,255,0.05);border:1px solid rgba(157,0,255,0.3);border-radius:15px;padding:1.5rem;">
                    <h4 style="color:var(--neon-purple);margin-bottom:0.5rem;">🔢 Numerology</h4>
                    <div style="font-size:1.5rem;margin-bottom:0.5rem;">Path ${results.numerology.lifePath1} + ${results.numerology.lifePath2}</div>
                    <div style="color:var(--neon-gold);">${results.numerology.score}%</div>
                </div>
                <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.3);border-radius:15px;padding:1.5rem;">
                    <h4 style="color:var(--neon-gold);margin-bottom:0.5rem;">🃏 Tarot</h4>
                    <div style="font-size:1.1rem;margin-bottom:0.3rem;">${results.tarot.card1.name}</div>
                    <div style="font-size:1.1rem;margin-bottom:0.5rem;">+ ${results.tarot.card2.name}</div>
                    <div style="color:var(--neon-gold);">${results.tarot.score}%</div>
                </div>
            </div>
            
            <div style="margin:2rem 0;">
                <h3 style="text-align:center;color:var(--neon-cyan);margin-bottom:1.5rem;font-family:'Orbitron',monospace;">12-System Breakdown</h3>
                <div class="compatibility-breakdown">
                    ${this.createBreakdownItem('⭐ Western Zodiac',results.zodiac.score)}
                    ${this.createBreakdownItem('🐉 Chinese Zodiac',results.chineseZodiac.score)}
                    ${this.createBreakdownItem('🔢 Numerology',results.numerology.score)}
                    ${this.createBreakdownItem('🃏 Tarot Archetypes',results.tarot.score)}
                    ${this.createBreakdownItem('🔯 Sacred Geometry',results.sacredGeometry.score)}
                    ${this.createBreakdownItem('🪐 Planetary Rulers',results.planetary.score)}
                    ${this.createBreakdownItem('🔥 Elemental Balance',results.elemental.score)}
                    ${this.createBreakdownItem('🌙 Moon Phases',results.moonPhase.score)}
                    ${this.createBreakdownItem('♾️ Karmic Numbers',results.karmic.score)}
                    ${this.createBreakdownItem('📛 Name Vibration',results.nameVibration.score)}
                    ${this.createBreakdownItem('🎂 Birthday Power',results.birthDayPower.score)}
                    ${this.createBreakdownItem('🌌 Current Cosmos',results.currentCosmic.score)}
                </div>
            </div>
            
            <div style="margin:2rem 0;padding:1.5rem;background:linear-gradient(135deg,rgba(0,245,255,0.05),rgba(157,0,255,0.05));border-radius:15px;border:1px solid rgba(255,255,255,0.1);">
                <h4 style="color:var(--neon-gold);margin-bottom:1rem;text-align:center;">🌌 Today's Cosmic Climate</h4>
                <div style="display:flex;justify-content:center;gap:2rem;flex-wrap:wrap;">
                    <span style="color:var(--neon-cyan);">☀️ ${results.currentCosmic.currentSign} Season</span>
                    <span style="color:var(--neon-purple);">🌙 ${results.currentCosmic.currentMoon}</span>
                </div>
            </div>
            
            <div style="text-align:center;margin-top:2rem;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.1);">
                <button onclick="window.print()" style="background:linear-gradient(135deg,var(--neon-cyan),var(--neon-purple));color:white;border:none;padding:12px 30px;border-radius:25px;cursor:pointer;font-family:'Orbitron',monospace;margin:5px;">📥 Save Reading</button>
                <button onclick="navigator.share?navigator.share({title:'Quantum Compatibility',text:'${soul1.name} & ${soul2.name}: ${results.overall}% compatible!',url:window.location.href}):alert('Copy the URL to share!')" style="background:transparent;color:var(--neon-cyan);border:2px solid var(--neon-cyan);padding:12px 30px;border-radius:25px;cursor:pointer;font-family:'Orbitron',monospace;margin:5px;">🔗 Share</button>
            </div>
        `;
        
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    createBreakdownItem(label, score) {
        const color = score >= 85 ? 'var(--neon-cyan)' : score >= 70 ? 'var(--neon-gold)' : 'var(--neon-pink)';
        return `
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.8rem;">
                <span style="min-width:160px;font-size:0.9rem;">${label}</span>
                <div style="flex:1;height:8px;background:rgba(255,255,255,0.1);border-radius:4px;overflow:hidden;">
                    <div style="width:${score}%;height:100%;background:${color};border-radius:4px;transition:width 1s ease;"></div>
                </div>
                <span style="min-width:45px;text-align:right;color:${color};font-weight:bold;">${score}%</span>
            </div>
        `;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new QuantumCompatibilityCalculator();
});
