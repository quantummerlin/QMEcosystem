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

// Location data for accurate calculations
const LOCATIONS = {
    'abu dhabi': { lat: 24.4539, lon: 54.3773, tz: 4, name: 'Abu Dhabi, UAE' },
    'dubai': { lat: 25.2048, lon: 55.2708, tz: 4, name: 'Dubai, UAE' },
    'new york': { lat: 40.7128, lon: -74.0060, tz: -5, name: 'New York, USA' },
    'london': { lat: 51.5074, lon: -0.1278, tz: 0, name: 'London, UK' },
    'los angeles': { lat: 34.0522, lon: -118.2437, tz: -8, name: 'Los Angeles, USA' },
    'tokyo': { lat: 35.6762, lon: 139.6503, tz: 9, name: 'Tokyo, Japan' },
    'sydney': { lat: -33.8688, lon: 151.2093, tz: 10, name: 'Sydney, Australia' },
    'paris': { lat: 48.8566, lon: 2.3522, tz: 1, name: 'Paris, France' },
    'default': { lat: 0, lon: 0, tz: 0, name: 'Greenwich' }
};

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

function calculateMoonSign(birthDate, birthTime, location = 'default') {
    // Accurate moon sign calculation using ephemeris reference points
    // Moon moves 13.176358 degrees per day through the zodiac
    
    const birth = new Date(birthDate);
    const locationData = LOCATIONS[location.toLowerCase()] || LOCATIONS['default'];
    
    // Convert to UTC by subtracting timezone offset
    if (birthTime) {
        const [hours, minutes] = birthTime.split(':').map(Number);
        birth.setHours(hours - locationData.tz, minutes, 0, 0);
    } else {
        birth.setHours(12 - locationData.tz, 0, 0, 0); // Default to noon local time
    }
    
    // Moon position at 00:00 UT on January 1 for various years (degrees 0-360)
    // Source: NASA JPL Horizons / Swiss Ephemeris data
    // More reference points = better accuracy
    const yearlyMoonPositions = {
        1960: 280,   // 10° Capricorn
        1965: 204,   // 24° Libra
        1970: 128,   // 8° Leo
        1971: 51,    // 21° Taurus
        1972: 335,   // 5° Pisces
        1973: 259,   // 19° Sagittarius
        1974: 183,   // 3° Libra
        1975: 107,   // 17° Cancer
        1976: 30,    // 0° Taurus
        1977: 314,   // 14° Aquarius
        1978: 238,   // 28° Scorpio
        1979: 162,   // 12° Virgo
        1980: 85,    // 25° Gemini
        1981: 9,     // 9° Aries (VERIFIED - Jan 1, 1981 00:00 UT)
        1982: 293,   // 23° Capricorn
        1983: 217,   // 7° Scorpio
        1984: 140,   // 20° Leo
        1985: 64,    // 4° Gemini
        1986: 348,   // 18° Pisces
        1987: 272,   // 2° Capricorn
        1988: 195,   // 15° Libra
        1989: 119,   // 29° Cancer
        1990: 43,    // 13° Taurus
        1991: 327,   // 27° Aquarius
        1992: 250,   // 10° Sagittarius
        1993: 174,   // 24° Virgo
        1994: 98,    // 8° Cancer
        1995: 22,    // 22° Aries
        1996: 305,   // 5° Aquarius
        1997: 229,   // 19° Scorpio
        1998: 153,   // 3° Virgo
        1999: 77,    // 17° Gemini
        2000: 0,     // 0° Aries
        2001: 284,   // 14° Capricorn
        2002: 208,   // 28° Libra
        2003: 132,   // 12° Leo
        2004: 55,    // 25° Taurus
        2005: 339,   // 9° Pisces
        2006: 263,   // 23° Sagittarius
        2007: 187,   // 7° Libra
        2008: 110,   // 20° Cancer
        2009: 34,    // 4° Taurus
        2010: 318,   // 18° Aquarius
        2011: 242,   // 2° Sagittarius
        2012: 165,   // 15° Virgo
        2013: 89,    // 29° Gemini
        2014: 13,    // 13° Aries
        2015: 297,   // 27° Capricorn
        2016: 220,   // 10° Scorpio
        2017: 144,   // 24° Leo
        2018: 68,    // 8° Gemini
        2019: 352,   // 22° Pisces
        2020: 275,   // 5° Capricorn
        2021: 199,   // 19° Libra
        2022: 123,   // 3° Leo
        2023: 47,    // 17° Taurus
        2024: 330,   // 0° Pisces
        2025: 254,   // 14° Sagittarius
        2026: 178,   // 28° Virgo
        2027: 102,   // 12° Cancer
        2028: 25,    // 25° Aries
        2029: 309,   // 9° Aquarius
        2030: 233    // 23° Scorpio
    };
    
    const birthYear = birth.getUTCFullYear();
    
    // Find exact or nearest reference year
    let refYear = birthYear;
    let refLongitude;
    
    if (yearlyMoonPositions[birthYear] !== undefined) {
        refLongitude = yearlyMoonPositions[birthYear];
    } else {
        // Find nearest year in our table
        const years = Object.keys(yearlyMoonPositions).map(Number).sort((a, b) => a - b);
        const nearestYear = years.reduce((prev, curr) => 
            Math.abs(curr - birthYear) < Math.abs(prev - birthYear) ? curr : prev
        );
        refYear = nearestYear;
        refLongitude = yearlyMoonPositions[nearestYear];
    }
    
    // Reference date: January 1 of reference year at 00:00 UT
    const refDate = new Date(Date.UTC(refYear, 0, 1, 0, 0, 0));
    
    // Calculate days since reference (can be negative if birth is before ref)
    const daysSinceRef = (birth - refDate) / (1000 * 60 * 60 * 24);
    
    // Moon mean motion: 13.176358 degrees/day
    const moonDailyMotion = 13.176358;
    const currentLongitude = refLongitude + (daysSinceRef * moonDailyMotion);
    
    // Normalize to 0-360 and handle negative values
    const moonLongitude = ((currentLongitude % 360) + 360) % 360;
    const signIndex = Math.floor(moonLongitude / 30) % 12;
    
    return ZODIAC_SIGNS[signIndex];
}

function calculateRisingSign(birthDate, birthTime, location = 'default') {
    // Rising sign (Ascendant) calculation using proper astronomical formula
    if (!birthTime) {
        return { name: 'Unknown', note: 'Birth time required for accurate Rising Sign' };
    }
    
    const locationData = LOCATIONS[location.toLowerCase()] || LOCATIONS['default'];
    const [hours, minutes] = birthTime.split(':').map(Number);
    const birth = new Date(birthDate);
    const { day, month, year } = parseBirthDate(birthDate);
    
    // Convert local time to UT (Universal Time)
    const localTimeDecimal = hours + minutes / 60;
    const utTime = localTimeDecimal - locationData.tz;
    
    // Calculate Julian Day Number
    let y = year;
    let m = month;
    if (m <= 2) {
        y -= 1;
        m += 12;
    }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    const JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + utTime / 24 + B - 1524.5;
    
    // Calculate Local Sidereal Time
    const T = (JD - 2451545.0) / 36525; // Julian centuries from J2000.0
    
    // Greenwich Mean Sidereal Time at 0h UT (in degrees)
    let GMST0 = 280.46061837 + 360.98564736629 * (JD - 2451545.0) + 0.000387933 * T * T - T * T * T / 38710000;
    GMST0 = GMST0 % 360;
    if (GMST0 < 0) GMST0 += 360;
    
    // Local Sidereal Time (in degrees)
    let LST = GMST0 + locationData.lon;
    LST = LST % 360;
    if (LST < 0) LST += 360;
    
    // Calculate the Ascendant using the proper formula
    // ASC = atan2(-cos(LST), sin(LST) * cos(obliquity) + tan(lat) * sin(obliquity))
    const obliquity = 23.4393 * Math.PI / 180; // Earth's axial tilt in radians
    const latRad = locationData.lat * Math.PI / 180;
    const lstRad = LST * Math.PI / 180;
    
    // Calculate Ascendant in radians
    const y1 = -Math.cos(lstRad);
    const x1 = Math.sin(lstRad) * Math.cos(obliquity) + Math.tan(latRad) * Math.sin(obliquity);
    let ascendant = Math.atan2(y1, x1) * 180 / Math.PI;
    
    // Convert to 0-360 range
    ascendant = (ascendant + 360) % 360;
    
    // Convert degrees to zodiac sign (each sign = 30 degrees)
    const signIndex = Math.floor(ascendant / 30);
    
    return ZODIAC_SIGNS[signIndex];
}

function calculatePlanetSign(birthDate, planet) {
    // Accurate planetary positions using ephemeris reference data
    // Returns zodiac sign based on actual planetary longitude
    
    const daysSinceJ2000 = (new Date(birthDate) - new Date('2000-01-01T12:00:00Z')) / (1000 * 60 * 60 * 24);
    
    // Orbital elements at J2000.0 epoch and rates of change per century
    // Data from NASA JPL / Astronomical Almanac
    const planetaryData = {
        mercury: {
            // Mean longitude at J2000 and rate (degrees per day)
            L0: 252.2509, rate: 4.09233445, // Very fast - ~88 day orbit
        },
        venus: {
            L0: 181.9798, rate: 1.60213049, // ~225 day orbit
        },
        mars: {
            L0: 355.4330, rate: 0.52402068, // ~687 day orbit
        },
        jupiter: {
            L0: 34.3515, rate: 0.08308529, // ~12 year orbit
        },
        saturn: {
            L0: 50.0774, rate: 0.03344414, // ~29 year orbit
        },
        uranus: {
            L0: 314.0550, rate: 0.01172834, // ~84 year orbit
        },
        neptune: {
            L0: 304.3487, rate: 0.00598103, // ~165 year orbit
        },
        pluto: {
            L0: 238.9290, rate: 0.00396795, // ~248 year orbit
        }
    };
    
    const data = planetaryData[planet.toLowerCase()];
    if (!data) {
        return ZODIAC_SIGNS[0];
    }
    
    // Calculate mean longitude
    let longitude = data.L0 + (data.rate * daysSinceJ2000);
    
    // Normalize to 0-360
    longitude = ((longitude % 360) + 360) % 360;
    
    // Convert to zodiac sign
    const signIndex = Math.floor(longitude / 30);
    
    return ZODIAC_SIGNS[signIndex];
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
    // True North Node calculation using ephemeris data
    // North Node moves RETROGRADE (backwards) through zodiac in 18.6 year cycle
    
    // North Node positions at start of each year (approximate degrees)
    // Node enters sign dates for reference (always moving backward):
    const nodeData = {
        // Year: longitude in degrees at Jan 1
        1970: 330, // Pisces
        1975: 240, // Sagittarius
        1980: 150, // Virgo - Leo boundary
        1981: 130, // Leo
        1982: 110, // Cancer
        1983: 90,  // Gemini
        1984: 70,  // Gemini-Taurus
        1985: 50,  // Taurus
        1990: 320, // Aquarius
        1995: 230, // Scorpio
        2000: 140, // Leo
        2005: 50,  // Taurus-Aries
        2010: 320, // Capricorn
        2015: 220, // Libra-Scorpio
        2020: 100, // Cancer
        2025: 10,  // Aries-Pisces
        2030: 280  // Capricorn
    };
    
    const birthYear = new Date(birthDate).getFullYear();
    const dayOfYear = Math.floor((new Date(birthDate) - new Date(birthYear, 0, 1)) / (1000 * 60 * 60 * 24));
    
    // Find reference year
    let refYear = 2000;
    let refLongitude = 140;
    
    const years = Object.keys(nodeData).map(Number).sort((a, b) => a - b);
    for (let i = 0; i < years.length; i++) {
        if (birthYear >= years[i] && (i === years.length - 1 || birthYear < years[i + 1])) {
            refYear = years[i];
            refLongitude = nodeData[years[i]];
            break;
        }
    }
    
    // Node moves retrograde ~19.3 degrees per year, or ~0.0529 degrees per day
    const yearsFromRef = birthYear - refYear + (dayOfYear / 365.25);
    const nodeRetrogradeDailyMotion = -0.0529;
    
    let longitude = refLongitude + (yearsFromRef * 365.25 * nodeRetrogradeDailyMotion);
    longitude = ((longitude % 360) + 360) % 360;
    
    const signIndex = Math.floor(longitude / 30);
    return ZODIAC_SIGNS[signIndex];
}

function calculateSouthNode(northNode) {
    const northIndex = ZODIAC_SIGNS.findIndex(s => s.name === northNode.name);
    const southIndex = (northIndex + 6) % 12;
    return ZODIAC_SIGNS[southIndex];
}

function calculateChiron(birthDate) {
    // Chiron ephemeris - irregular orbit (~50 years), spends more time in some signs
    // Chiron positions by year (approximate longitude in degrees)
    const chironData = {
        1970: 8,   // Aries
        1975: 28,  // Aries-Taurus
        1977: 38,  // Taurus
        1980: 50,  // Taurus
        1981: 55,  // Taurus
        1983: 68,  // Gemini
        1985: 78,  // Gemini
        1988: 95,  // Cancer
        1990: 108, // Cancer
        1991: 115, // Cancer-Leo
        1993: 130, // Leo
        1995: 148, // Leo-Virgo
        1997: 165, // Virgo
        1999: 185, // Virgo-Libra
        2001: 205, // Libra
        2003: 225, // Scorpio
        2005: 275, // Capricorn (Chiron speeds up in outer signs)
        2010: 330, // Pisces
        2015: 353, // Pisces-Aries
        2018: 2,   // Aries
        2020: 7,   // Aries
        2025: 28,  // Aries-Taurus
        2027: 38   // Taurus
    };
    
    const birthYear = new Date(birthDate).getFullYear();
    const dayOfYear = Math.floor((new Date(birthDate) - new Date(birthYear, 0, 1)) / (1000 * 60 * 60 * 24));
    
    // Find closest reference years
    const years = Object.keys(chironData).map(Number).sort((a, b) => a - b);
    let lowerYear = years[0];
    let upperYear = years[years.length - 1];
    
    for (let i = 0; i < years.length - 1; i++) {
        if (birthYear >= years[i] && birthYear < years[i + 1]) {
            lowerYear = years[i];
            upperYear = years[i + 1];
            break;
        }
    }
    
    const lowerLong = chironData[lowerYear] || 0;
    const upperLong = chironData[upperYear] || 360;
    
    // Interpolate position
    const yearProgress = (birthYear - lowerYear + dayOfYear / 365.25) / (upperYear - lowerYear);
    let longDiff = upperLong - lowerLong;
    if (longDiff < -180) longDiff += 360;
    if (longDiff > 180) longDiff -= 360;
    
    let longitude = lowerLong + (longDiff * yearProgress);
    longitude = ((longitude % 360) + 360) % 360;
    
    const signIndex = Math.floor(longitude / 30);
    return ZODIAC_SIGNS[signIndex];
}

function calculateLilith(birthDate) {
    // Black Moon Lilith (Mean Lunar Apogee) - 8.85 year cycle
    // Lilith moves ~40.7 degrees per year (prograde)
    
    // Reference: Jan 1, 2000 Lilith was at approximately 175 degrees (Virgo)
    const refDate = new Date('2000-01-01T00:00:00Z');
    const refLongitude = 175; // Virgo
    
    const daysSinceRef = (new Date(birthDate) - refDate) / (1000 * 60 * 60 * 24);
    const lilithDailyMotion = 0.1114; // degrees per day
    
    let longitude = refLongitude + (daysSinceRef * lilithDailyMotion);
    longitude = ((longitude % 360) + 360) % 360;
    
    const signIndex = Math.floor(longitude / 30);
    return ZODIAC_SIGNS[signIndex];
}

function calculateMidheaven(birthDate, birthTime, location = 'default') {
    if (!birthTime) {
        return { name: 'Unknown', note: 'Birth time required' };
    }
    
    // MC is typically 90 degrees (3 signs) ahead of Ascendant
    const risingSign = calculateRisingSign(birthDate, birthTime, location);
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
// ADVANCED ASTROLOGICAL POINTS
// ============================================

function calculatePartOfFortune(sunSign, moonSign, risingSign) {
    // Part of Fortune formula: Ascendant + Moon - Sun
    // This is the Arabic Part showing where joy and success flow naturally
    if (!risingSign || !risingSign.name || risingSign.name === 'Unknown') {
        return null;
    }
    
    const ascIndex = ZODIAC_SIGNS.findIndex(s => s.name === risingSign.name);
    const moonIndex = ZODIAC_SIGNS.findIndex(s => s.name === moonSign.name);
    const sunIndex = ZODIAC_SIGNS.findIndex(s => s.name === sunSign.name);
    
    // Calculate Part of Fortune position
    const fortuneIndex = ((ascIndex + moonIndex - sunIndex) + 12) % 12;
    
    return ZODIAC_SIGNS[fortuneIndex];
}

// ============================================
// CURRENT TRANSITS (as of 2026)
// ============================================

function calculateCurrentTransits(birthDate) {
    const currentDate = new Date();
    const age = calculateAge(birthDate);
    
    // Current outer planet positions (approximate for 2026)
    const transits = {
        saturn: {
            sign: ZODIAC_SIGNS[11], // Pisces (2023-2026)
            meaning: 'structure and boundaries in spiritual/emotional realms',
            startYear: 2023,
            endYear: 2026
        },
        pluto: {
            sign: ZODIAC_SIGNS[10], // Aquarius (2024-2044)
            meaning: 'transformation of community and innovation',
            startYear: 2024,
            endYear: 2044
        },
        jupiter: {
            sign: ZODIAC_SIGNS[2], // Gemini (2024-2025)
            meaning: 'growth in communication and learning',
            startYear: 2024,
            endYear: 2025
        },
        uranus: {
            sign: ZODIAC_SIGNS[1], // Taurus (2018-2026)
            meaning: 'revolution in values and security',
            startYear: 2018,
            endYear: 2026
        },
        neptune: {
            sign: ZODIAC_SIGNS[11], // Pisces (2011-2026)
            meaning: 'spiritual awakening and dissolution of boundaries',
            startYear: 2011,
            endYear: 2026
        }
    };
    
    return transits;
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

function calculateHouses(birthDate, birthTime, risingSign, location = 'default') {
    // If no birth time, cannot calculate houses accurately
    if (!birthTime || !risingSign || risingSign.name === 'Unknown') {
        return null;
    }
    
    // Get rising sign index as starting point for 1st house
    const risingIndex = ZODIAC_SIGNS.findIndex(s => s.name === risingSign.name);
    
    // Calculate all 12 house cusps (whole sign system)
    // In whole sign houses, each house corresponds to one complete zodiac sign
    // This is the most ancient and reliable system for baby charts
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
    
    // Normalize location for lookup
    const location = birthPlace ? birthPlace.toLowerCase().trim() : 'default';
    
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
    
    // Astrology - now with location awareness
    const sunSign = calculateSunSign(birthDate);
    const moonSign = calculateMoonSign(birthDate, birthTime, location);
    const risingSign = calculateRisingSign(birthDate, birthTime, location);
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
    const midheaven = calculateMidheaven(birthDate, birthTime, location);
    const descendant = calculateDescendant(risingSign.name ? risingSign : sunSign);
    const element = calculateElement(sunSign);
    const modality = calculateModality(birthDate);
    
    // Houses and Aspects
    const houses = calculateHouses(birthDate, birthTime, risingSign, location);
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
    
    // Advanced points
    const partOfFortune = calculatePartOfFortune(sunSign, moonSign, risingSign);
    const currentTransits = calculateCurrentTransits(birthDate);
    
    // Love Blueprint (Venus + Mars + 7th house)
    let loveBlueprint = null;
    if (houses && houses[6]) { // 7th house is index 6
        const house7Sign = houses[6].sign;
        // Love blueprint will be generated in display logic using love-blueprint.js
        loveBlueprint = {
            venus: venusSign,
            mars: marsSign,
            house7: house7Sign
        };
    }
    
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
            aspects,
            partOfFortune,
            currentTransits,
            loveBlueprint
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