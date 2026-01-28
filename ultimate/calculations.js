// ============================================
// ULTIMATE READING SYSTEM - ALL CALCULATIONS
// ============================================
// Contains all 58 reading calculations
// Pure functions - no branding, just math
// ============================================

// ============================================
// UTILITY FUNCTIONS
// ============================================

function reduceToSingleDigit(num, keepMaster = true) {
    const masterNumbers = [11, 22, 33];
    while (num > 9) {
        if (keepMaster && masterNumbers.includes(num)) {
            return num;
        }
        num = String(num).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    return num;
}

function letterToNumber(letter) {
    const values = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
        'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
        'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    };
    return values[letter.toUpperCase()] || 0;
}

function nameToNumber(name) {
    return name.split('').reduce((sum, char) => sum + letterToNumber(char), 0);
}

function getVowels(name) {
    return name.toUpperCase().replace(/[^AEIOU]/g, '');
}

function getConsonants(name) {
    return name.toUpperCase().replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/g, '');
}

function parseBirthDate(dateStr) {
    const date = new Date(dateStr);
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        date: date
    };
}

// ============================================
// ZODIAC DATA
// ============================================

const ZODIAC_SIGNS = [
    { name: 'Aries', symbol: '♈', element: 'Fire', start: [3, 21], end: [4, 19] },
    { name: 'Taurus', symbol: '♉', element: 'Earth', start: [4, 20], end: [5, 20] },
    { name: 'Gemini', symbol: '♊', element: 'Air', start: [5, 21], end: [6, 20] },
    { name: 'Cancer', symbol: '♋', element: 'Water', start: [6, 21], end: [7, 22] },
    { name: 'Leo', symbol: '♌', element: 'Fire', start: [7, 23], end: [8, 22] },
    { name: 'Virgo', symbol: '♍', element: 'Earth', start: [8, 23], end: [9, 22] },
    { name: 'Libra', symbol: '♎', element: 'Air', start: [9, 23], end: [10, 22] },
    { name: 'Scorpio', symbol: '♏', element: 'Water', start: [10, 23], end: [11, 21] },
    { name: 'Sagittarius', symbol: '♐', element: 'Fire', start: [11, 22], end: [12, 21] },
    { name: 'Capricorn', symbol: '♑', element: 'Earth', start: [12, 22], end: [1, 19] },
    { name: 'Aquarius', symbol: '♒', element: 'Air', start: [1, 20], end: [2, 18] },
    { name: 'Pisces', symbol: '♓', element: 'Water', start: [2, 19], end: [3, 20] }
];

const CHINESE_ZODIAC = [
    { name: 'Rat', years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032] },
    { name: 'Ox', years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033] },
    { name: 'Tiger', years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034] },
    { name: 'Rabbit', years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035] },
    { name: 'Dragon', years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036] },
    { name: 'Snake', years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037] },
    { name: 'Horse', years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038] },
    { name: 'Goat', years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039] },
    { name: 'Monkey', years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040] },
    { name: 'Rooster', years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041] },
    { name: 'Dog', years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042] },
    { name: 'Pig', years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043] }
];

const MOON_PHASES = [
    { name: 'New Moon', icon: '🌑', range: [0, 1.85] },
    { name: 'Waxing Crescent', icon: '🌒', range: [1.85, 7.38] },
    { name: 'First Quarter', icon: '🌓', range: [7.38, 11.07] },
    { name: 'Waxing Gibbous', icon: '🌔', range: [11.07, 14.77] },
    { name: 'Full Moon', icon: '🌕', range: [14.77, 18.46] },
    { name: 'Waning Gibbous', icon: '🌖', range: [18.46, 22.15] },
    { name: 'Last Quarter', icon: '🌗', range: [22.15, 25.84] },
    { name: 'Waning Crescent', icon: '🌘', range: [25.84, 29.53] }
];

// ============================================
// NUMEROLOGY CALCULATIONS
// ============================================

function calculateLifePath(birthDate) {
    const { day, month, year } = parseBirthDate(birthDate);
    const sum = reduceToSingleDigit(day) + reduceToSingleDigit(month) + reduceToSingleDigit(year);
    return reduceToSingleDigit(sum, true);
}

function calculateDestinyNumber(fullName) {
    const sum = nameToNumber(fullName.replace(/[^a-zA-Z]/g, ''));
    return reduceToSingleDigit(sum, true);
}

function calculateSoulUrge(fullName) {
    const vowels = getVowels(fullName);
    const sum = nameToNumber(vowels);
    return reduceToSingleDigit(sum, true);
}

function calculatePersonality(fullName) {
    const consonants = getConsonants(fullName);
    const sum = nameToNumber(consonants);
    return reduceToSingleDigit(sum, true);
}

function calculateBirthdayNumber(birthDate) {
    const { day } = parseBirthDate(birthDate);
    return reduceToSingleDigit(day, true);
}

function calculateExpressionNumber(fullName) {
    return calculateDestinyNumber(fullName);
}

function calculateMaturityNumber(lifePath, destiny) {
    return reduceToSingleDigit(lifePath + destiny, true);
}

function calculatePersonalYear(birthDate, currentYear = new Date().getFullYear()) {
    const { day, month } = parseBirthDate(birthDate);
    const sum = reduceToSingleDigit(day) + reduceToSingleDigit(month) + reduceToSingleDigit(currentYear);
    return reduceToSingleDigit(sum, true);
}

function calculatePersonalMonth(birthDate, currentYear, currentMonth) {
    const personalYear = calculatePersonalYear(birthDate, currentYear);
    return reduceToSingleDigit(personalYear + currentMonth, true);
}

function calculatePersonalDay(birthDate, currentDate = new Date()) {
    const personalMonth = calculatePersonalMonth(
        birthDate, 
        currentDate.getFullYear(), 
        currentDate.getMonth() + 1
    );
    return reduceToSingleDigit(personalMonth + currentDate.getDate(), true);
}

function calculatePinnacles(birthDate) {
    const lifePath = calculateLifePath(birthDate);
    const { day, month, year } = parseBirthDate(birthDate);
    
    const d = reduceToSingleDigit(day);
    const m = reduceToSingleDigit(month);
    const y = reduceToSingleDigit(year);
    
    return {
        first: reduceToSingleDigit(d + m, true),
        second: reduceToSingleDigit(d + y, true),
        third: reduceToSingleDigit(reduceToSingleDigit(d + m) + reduceToSingleDigit(d + y), true),
        fourth: reduceToSingleDigit(m + y, true),
        ages: {
            first: `Birth to ${36 - lifePath}`,
            second: `${36 - lifePath + 1} to ${36 - lifePath + 9}`,
            third: `${36 - lifePath + 10} to ${36 - lifePath + 18}`,
            fourth: `${36 - lifePath + 19} onwards`
        }
    };
}

function calculateChallenges(birthDate) {
    const { day, month, year } = parseBirthDate(birthDate);
    
    const d = reduceToSingleDigit(day, false);
    const m = reduceToSingleDigit(month, false);
    const y = reduceToSingleDigit(year, false);
    
    const first = Math.abs(d - m);
    const second = Math.abs(d - y);
    const third = Math.abs(first - second);
    const fourth = Math.abs(m - y);
    
    return { first, second, third, fourth };
}

function calculateHiddenPassion(fullName) {
    const counts = {};
    const name = fullName.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (const char of name) {
        const num = letterToNumber(char);
        counts[num] = (counts[num] || 0) + 1;
    }
    
    let maxCount = 0;
    let passion = 1;
    
    for (const [num, count] of Object.entries(counts)) {
        if (count > maxCount) {
            maxCount = count;
            passion = parseInt(num);
        }
    }
    
    return passion;
}

function calculateKarmicDebt(lifePath, destiny, soulUrge, personality) {
    const karmicNumbers = [13, 14, 16, 19];
    const debts = [];
    
    // Check if any core numbers reduce from karmic numbers
    const checkKarmic = (num) => {
        for (const karmic of karmicNumbers) {
            if (reduceToSingleDigit(karmic, false) === num) {
                return karmic;
            }
        }
        return null;
    };
    
    // Simplified check - just return if life path suggests karmic lessons
    if ([4, 5, 7, 1].includes(lifePath)) {
        return { hasDebt: true, numbers: [lifePath === 4 ? 13 : lifePath === 5 ? 14 : lifePath === 7 ? 16 : 19] };
    }
    
    return { hasDebt: false, numbers: [] };
}

function calculateMasterNumber(lifePath, destiny, soulUrge) {
    const masters = [];
    if ([11, 22, 33].includes(lifePath)) masters.push({ type: 'Life Path', number: lifePath });
    if ([11, 22, 33].includes(destiny)) masters.push({ type: 'Destiny', number: destiny });
    if ([11, 22, 33].includes(soulUrge)) masters.push({ type: 'Soul Urge', number: soulUrge });
    return masters;
}

// ============================================
// ASTROLOGY CALCULATIONS
// ============================================

function calculateSunSign(birthDate) {
    const { month, day } = parseBirthDate(birthDate);
    
    for (const sign of ZODIAC_SIGNS) {
        const [startMonth, startDay] = sign.start;
        const [endMonth, endDay] = sign.end;
        
        if (sign.name === 'Capricorn') {
            if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
                return sign;
            }
        } else if (
            (month === startMonth && day >= startDay) ||
            (month === endMonth && day <= endDay)
        ) {
            return sign;
        }
    }
    
    return ZODIAC_SIGNS[0]; // Default to Aries
}

function calculateMoonSign(birthDate) {
    // Simplified moon sign calculation based on birth date
    // In reality, this requires exact birth time and ephemeris data
    const { day, month, year } = parseBirthDate(birthDate);
    const seed = (day + month * 30 + year) % 12;
    return ZODIAC_SIGNS[seed];
}

function calculateRisingSign(birthDate, birthTime) {
    // Simplified rising sign calculation
    // In reality, requires exact birth time and location
    if (!birthTime) {
        return { name: 'Unknown', note: 'Birth time required for accurate Rising Sign' };
    }
    
    const [hours, minutes] = birthTime.split(':').map(Number);
    const sunSign = calculateSunSign(birthDate);
    const sunIndex = ZODIAC_SIGNS.findIndex(s => s.name === sunSign.name);
    
    // Approximate: Rising sign changes every 2 hours
    const risingOffset = Math.floor(hours / 2);
    const risingIndex = (sunIndex + risingOffset) % 12;
    
    return ZODIAC_SIGNS[risingIndex];
}

function calculatePlanetSign(birthDate, planet) {
    // Simplified planetary position calculation
    // Each planet has different orbital periods
    const { day, month, year } = parseBirthDate(birthDate);
    
    const offsets = {
        mercury: 88,    // ~88 day orbit
        venus: 225,     // ~225 day orbit
        mars: 687,      // ~687 day orbit
        jupiter: 4333,  // ~12 year orbit
        saturn: 10759,  // ~29 year orbit
        uranus: 30687,  // ~84 year orbit
        neptune: 60190, // ~165 year orbit
        pluto: 90560    // ~248 year orbit
    };
    
    const daysSinceEpoch = Math.floor((new Date(birthDate) - new Date('2000-01-01')) / (1000 * 60 * 60 * 24));
    const offset = offsets[planet] || 365;
    const index = Math.abs(Math.floor((daysSinceEpoch / offset) * 12)) % 12;
    
    return ZODIAC_SIGNS[index];
}

function calculateChineseZodiac(birthDate) {
    const { year } = parseBirthDate(birthDate);
    
    for (const animal of CHINESE_ZODIAC) {
        if (animal.years.includes(year)) {
            return animal;
        }
    }
    
    // Calculate for years not in the list
    const baseYear = 1924; // Year of the Rat
    const index = ((year - baseYear) % 12 + 12) % 12;
    return CHINESE_ZODIAC[index];
}

function calculateMoonPhase(birthDate) {
    const date = new Date(birthDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Simplified moon phase calculation
    const c = Math.floor(year / 100);
    const n = year - 19 * Math.floor(year / 19);
    const k = Math.floor((c - 17) / 25);
    let i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * n + 15;
    i = i - 30 * Math.floor(i / 30);
    i = i - Math.floor(i / 28) * (1 - Math.floor(i / 28) * Math.floor(29 / (i + 1)) * Math.floor((21 - n) / 11));
    let j = year + Math.floor(year / 4) + i + 2 - c + Math.floor(c / 4);
    j = j - 7 * Math.floor(j / 7);
    const l = i - j;
    const moonDay = day + l;
    const phase = ((moonDay % 30) + 30) % 30;
    
    for (const moonPhase of MOON_PHASES) {
        if (phase >= moonPhase.range[0] && phase < moonPhase.range[1]) {
            return moonPhase;
        }
    }
    
    return MOON_PHASES[0];
}

function calculateNorthNode(birthDate) {
    // North Node moves backwards through zodiac, ~18.6 year cycle
    const { year, month } = parseBirthDate(birthDate);
    const daysSinceEpoch = Math.floor((new Date(birthDate) - new Date('2000-01-01')) / (1000 * 60 * 60 * 24));
    const nodeCycle = 6793; // ~18.6 years in days
    const index = (12 - Math.floor((daysSinceEpoch / nodeCycle) * 12) % 12) % 12;
    return ZODIAC_SIGNS[index];
}

function calculateSouthNode(northNode) {
    const northIndex = ZODIAC_SIGNS.findIndex(s => s.name === northNode.name);
    const southIndex = (northIndex + 6) % 12;
    return ZODIAC_SIGNS[southIndex];
}

function calculateChiron(birthDate) {
    // Chiron has ~50 year orbit
    const daysSinceEpoch = Math.floor((new Date(birthDate) - new Date('2000-01-01')) / (1000 * 60 * 60 * 24));
    const chironCycle = 18262; // ~50 years in days
    const index = ((Math.floor((daysSinceEpoch / chironCycle) * 12) % 12) + 12) % 12;
    return ZODIAC_SIGNS[index];
}

function calculateLilith(birthDate) {
    // Black Moon Lilith has ~9 year cycle
    const daysSinceEpoch = Math.floor((new Date(birthDate) - new Date('2000-01-01')) / (1000 * 60 * 60 * 24));
    const lilithCycle = 3232; // ~8.85 years in days
    const index = ((Math.floor((daysSinceEpoch / lilithCycle) * 12) % 12) + 12) % 12;
    return ZODIAC_SIGNS[index];
}

function calculateMidheaven(birthDate, birthTime) {
    if (!birthTime) {
        return { name: 'Unknown', note: 'Birth time required' };
    }
    
    const [hours] = birthTime.split(':').map(Number);
    const sunSign = calculateSunSign(birthDate);
    const sunIndex = ZODIAC_SIGNS.findIndex(s => s.name === sunSign.name);
    
    // MC is typically 90 degrees (3 signs) ahead of Ascendant
    const risingSign = calculateRisingSign(birthDate, birthTime);
    const risingIndex = ZODIAC_SIGNS.findIndex(s => s.name === risingSign.name);
    const mcIndex = (risingIndex + 9) % 12; // 9 signs = 270 degrees from Ascendant
    
    return ZODIAC_SIGNS[mcIndex];
}

function calculateDescendant(risingSign) {
    const risingIndex = ZODIAC_SIGNS.findIndex(s => s.name === risingSign.name);
    const descIndex = (risingIndex + 6) % 12;
    return ZODIAC_SIGNS[descIndex];
}

function calculateElement(sunSign) {
    return sunSign.element;
}

function calculateModality(birthDate) {
    const sunSign = calculateSunSign(birthDate);
    const cardinalSigns = ['Aries', 'Cancer', 'Libra', 'Capricorn'];
    const fixedSigns = ['Taurus', 'Leo', 'Scorpio', 'Aquarius'];
    const mutableSigns = ['Gemini', 'Virgo', 'Sagittarius', 'Pisces'];
    
    if (cardinalSigns.includes(sunSign.name)) return 'Cardinal';
    if (fixedSigns.includes(sunSign.name)) return 'Fixed';
    return 'Mutable';
}

// ============================================
// LIFE CYCLE CALCULATIONS
// ============================================

function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years, months, days };
}

function calculateNextBirthday(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    
    if (nextBirthday <= today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const diff = nextBirthday - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    return { date: nextBirthday, daysUntil: days };
}

function calculateLifeStage(birthDate) {
    const age = calculateAge(birthDate);
    
    if (age.years < 1) return { stage: 'Infant', description: 'First year of life - rapid development and bonding' };
    if (age.years < 3) return { stage: 'Toddler', description: 'Learning to walk, talk, and explore the world' };
    if (age.years < 6) return { stage: 'Early Childhood', description: 'Developing personality and social skills' };
    if (age.years < 12) return { stage: 'Middle Childhood', description: 'Building knowledge and friendships' };
    if (age.years < 18) return { stage: 'Adolescence', description: 'Identity formation and independence' };
    if (age.years < 25) return { stage: 'Young Adult', description: 'Establishing career and relationships' };
    if (age.years < 40) return { stage: 'Adult', description: 'Building life and family' };
    if (age.years < 60) return { stage: 'Middle Age', description: 'Peak achievement and reflection' };
    if (age.years < 75) return { stage: 'Senior', description: 'Wisdom and legacy building' };
    return { stage: 'Elder', description: 'Sharing wisdom and life experience' };
}

// ============================================
// HOUSE CALCULATIONS
// ============================================

function calculateHouses(birthDate, birthTime, risingSign) {
    // If no birth time, cannot calculate houses accurately
    if (!birthTime) {
        return null;
    }
    
    // Get rising sign index as starting point for 1st house
    const risingIndex = ZODIAC_SIGNS.findIndex(s => s.name === risingSign.name);
    
    // Calculate all 12 house cusps (simplified whole sign system)
    // In whole sign houses, each house corresponds to one complete zodiac sign
    const houses = [];
    for (let i = 0; i < 12; i++) {
        const houseNumber = i + 1;
        const signIndex = (risingIndex + i) % 12;
        houses.push({
            house: houseNumber,
            sign: ZODIAC_SIGNS[signIndex],
            cusp: ZODIAC_SIGNS[signIndex].name
        });
    }
    
    return houses;
}

function getPlanetHouse(planetSign, houses) {
    if (!houses) return null;
    
    const house = houses.find(h => h.sign.name === planetSign.name);
    return house ? house.house : null;
}

// ============================================
// ASPECT CALCULATIONS
// ============================================

function calculateAspectAngle(sign1Index, sign2Index) {
    // Calculate the shortest angle between two signs (0-180 degrees)
    const diff = Math.abs(sign1Index - sign2Index);
    const angle = diff * 30; // Each sign is 30 degrees
    return angle > 180 ? 360 - angle : angle;
}

function calculateAspect(planet1Sign, planet2Sign, planet1Name, planet2Name) {
    const sign1Index = ZODIAC_SIGNS.findIndex(s => s.name === planet1Sign.name);
    const sign2Index = ZODIAC_SIGNS.findIndex(s => s.name === planet2Sign.name);
    
    const angle = calculateAspectAngle(sign1Index, sign2Index);
    const orb = 8; // degrees of allowed orb
    
    // Major aspects
    const aspects = [
        { name: 'Conjunction', angle: 0, symbol: '☌', type: 'major', nature: 'neutral' },
        { name: 'Sextile', angle: 60, symbol: '⚹', type: 'major', nature: 'harmonious' },
        { name: 'Square', angle: 90, symbol: '□', type: 'major', nature: 'challenging' },
        { name: 'Trine', angle: 120, symbol: '△', type: 'major', nature: 'harmonious' },
        { name: 'Opposition', angle: 180, symbol: '☍', type: 'major', nature: 'challenging' }
    ];
    
    for (const aspect of aspects) {
        if (Math.abs(angle - aspect.angle) <= orb) {
            return {
                aspect: aspect.name,
                symbol: aspect.symbol,
                type: aspect.type,
                nature: aspect.nature,
                planet1: planet1Name,
                planet2: planet2Name,
                angle: angle,
                orb: Math.abs(angle - aspect.angle)
            };
        }
    }
    
    return null;
}

function calculateAllAspects(astrology) {
    const planets = [
        { name: 'Sun', sign: astrology.sunSign },
        { name: 'Moon', sign: astrology.moonSign },
        { name: 'Mercury', sign: astrology.mercurySign },
        { name: 'Venus', sign: astrology.venusSign },
        { name: 'Mars', sign: astrology.marsSign },
        { name: 'Jupiter', sign: astrology.jupiterSign },
        { name: 'Saturn', sign: astrology.saturnSign }
    ];
    
    const aspects = [];
    
    // Calculate aspects between all planet pairs
    for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
            const aspect = calculateAspect(
                planets[i].sign, 
                planets[j].sign,
                planets[i].name,
                planets[j].name
            );
            if (aspect) {
                aspects.push(aspect);
            }
        }
    }
    
    return aspects;
}

// ============================================
// MASTER CALCULATION FUNCTION
// ============================================

function calculateAllReadings(userData) {
    const { name, birthDate, birthTime, birthPlace } = userData;
    
    // Core numerology
    const lifePath = calculateLifePath(birthDate);
    const destiny = calculateDestinyNumber(name);
    const soulUrge = calculateSoulUrge(name);
    const personality = calculatePersonality(name);
    const birthday = calculateBirthdayNumber(birthDate);
    const expression = calculateExpressionNumber(name);
    const maturity = calculateMaturityNumber(lifePath, destiny);
    const personalYear = calculatePersonalYear(birthDate);
    const personalMonth = calculatePersonalMonth(birthDate, new Date().getFullYear(), new Date().getMonth() + 1);
    const personalDay = calculatePersonalDay(birthDate);
    const pinnacles = calculatePinnacles(birthDate);
    const challenges = calculateChallenges(birthDate);
    const hiddenPassion = calculateHiddenPassion(name);
    const karmicDebt = calculateKarmicDebt(lifePath, destiny, soulUrge, personality);
    const masterNumbers = calculateMasterNumber(lifePath, destiny, soulUrge);
    
    // Astrology
    const sunSign = calculateSunSign(birthDate);
    const moonSign = calculateMoonSign(birthDate);
    const risingSign = calculateRisingSign(birthDate, birthTime);
    const mercurySign = calculatePlanetSign(birthDate, 'mercury');
    const venusSign = calculatePlanetSign(birthDate, 'venus');
    const marsSign = calculatePlanetSign(birthDate, 'mars');
    const jupiterSign = calculatePlanetSign(birthDate, 'jupiter');
    const saturnSign = calculatePlanetSign(birthDate, 'saturn');
    const uranusSign = calculatePlanetSign(birthDate, 'uranus');
    const neptuneSign = calculatePlanetSign(birthDate, 'neptune');
    const plutoSign = calculatePlanetSign(birthDate, 'pluto');
    const chineseZodiac = calculateChineseZodiac(birthDate);
    const moonPhase = calculateMoonPhase(birthDate);
    const northNode = calculateNorthNode(birthDate);
    const southNode = calculateSouthNode(northNode);
    const chiron = calculateChiron(birthDate);
    const lilith = calculateLilith(birthDate);
    const midheaven = calculateMidheaven(birthDate, birthTime);
    const descendant = calculateDescendant(risingSign.name ? risingSign : sunSign);
    const element = calculateElement(sunSign);
    const modality = calculateModality(birthDate);
    
    // Houses and Aspects
    const houses = calculateHouses(birthDate, birthTime, risingSign);
    const aspects = houses ? calculateAllAspects({
        sunSign, moonSign, mercurySign, venusSign, marsSign, jupiterSign, saturnSign
    }) : [];
    
    // Planet house placements
    const planetHouses = houses ? {
        sun: getPlanetHouse(sunSign, houses),
        moon: getPlanetHouse(moonSign, houses),
        mercury: getPlanetHouse(mercurySign, houses),
        venus: getPlanetHouse(venusSign, houses),
        mars: getPlanetHouse(marsSign, houses),
        jupiter: getPlanetHouse(jupiterSign, houses),
        saturn: getPlanetHouse(saturnSign, houses)
    } : null;
    
    // Life cycles
    const age = calculateAge(birthDate);
    const nextBirthday = calculateNextBirthday(birthDate);
    const lifeStage = calculateLifeStage(birthDate);
    
    return {
        // Input data
        input: { name, birthDate, birthTime, birthPlace },
        
        // Numerology
        numerology: {
            lifePath,
            destiny,
            soulUrge,
            personality,
            birthday,
            expression,
            maturity,
            personalYear,
            personalMonth,
            personalDay,
            pinnacles,
            challenges,
            hiddenPassion,
            karmicDebt,
            masterNumbers
        },
        
        // Astrology
        astrology: {
            sunSign,
            moonSign,
            risingSign,
            mercurySign,
            venusSign,
            marsSign,
            jupiterSign,
            saturnSign,
            uranusSign,
            neptuneSign,
            plutoSign,
            chineseZodiac,
            moonPhase,
            northNode,
            southNode,
            chiron,
            lilith,
            midheaven,
            descendant,
            element,
            modality,
            houses,
            planetHouses,
            aspects
        },
        
        // Life cycles
        lifeCycles: {
            age,
            nextBirthday,
            lifeStage
        },
        
        // Metadata
        meta: {
            generatedAt: new Date().toISOString(),
            totalReadings: 58
        }
    };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateAllReadings,
        calculateLifePath,
        calculateDestinyNumber,
        calculateSoulUrge,
        calculatePersonality,
        calculateSunSign,
        calculateMoonSign,
        calculateRisingSign,
        calculateChineseZodiac,
        calculateMoonPhase,
        // ... export all functions
    };
}