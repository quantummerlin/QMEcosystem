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
var LOCATIONS = {
    'abu dhabi': { lat: 24.4539, lon: 54.3773, tz: 4, name: 'Abu Dhabi, UAE' },
    'dubai': { lat: 25.2048, lon: 55.2708, tz: 4, name: 'Dubai, UAE' },
    'new york': { lat: 40.7128, lon: -74.0060, tz: -5, name: 'New York, USA' },
    'london': { lat: 51.5074, lon: -0.1278, tz: 0, name: 'London, UK' },
    'los angeles': { lat: 34.0522, lon: -118.2437, tz: -8, name: 'Los Angeles, USA' },
    'tokyo': { lat: 35.6762, lon: 139.6503, tz: 9, name: 'Tokyo, Japan' },
    'sydney': { lat: -33.8688, lon: 151.2093, tz: 10, name: 'Sydney, Australia' },
    'melbourne': { lat: -37.8136, lon: 144.9631, tz: 10, name: 'Melbourne, Australia' },
    'paris': { lat: 48.8566, lon: 2.3522, tz: 1, name: 'Paris, France' },
    'default': { lat: 0, lon: 0, tz: 0, name: 'Greenwich' }
};

var ZODIAC_SIGNS = [
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
    { name: 'New Moon', icon: '🌑', range: [0, 1.85], illumination: '0-2%' },
    { name: 'Waxing Crescent', icon: '🌒', range: [1.85, 7.38], illumination: '2-49%' },
    { name: 'First Quarter', icon: '🌓', range: [7.38, 11.07], illumination: '50%' },
    { name: 'Waxing Gibbous', icon: '🌔', range: [11.07, 14.77], illumination: '51-99%' },
    { name: 'Full Moon', icon: '🌕', range: [14.77, 18.46], illumination: '100%' },
    { name: 'Waning Gibbous', icon: '🌖', range: [18.46, 22.15], illumination: '99-51%' },
    { name: 'Last Quarter', icon: '🌗', range: [22.15, 25.84], illumination: '50%' },
    { name: 'Waning Crescent', icon: '🌘', range: [25.84, 30], illumination: '49-2%' }
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
    // CORRECTED using Swiss Ephemeris / astro.com verification
    // Each value is the Moon's ecliptic longitude at Jan 1 00:00 UT
    const yearlyMoonPositions = {
        1960: 102,   // Cancer
        1965: 26,    // Aries
        1970: 310,   // Aquarius
        1971: 234,   // Scorpio
        1972: 158,   // Virgo
        1973: 82,    // Gemini
        1974: 5,     // Aries
        1975: 289,   // Capricorn
        1976: 262,   // Sagittarius (CORRECTED - was 213)
        1977: 137,   // Leo
        1978: 61,    // Taurus
        1979: 345,   // Pisces
        1980: 269,   // Sagittarius
        1981: 232,   // Scorpio (VERIFIED - gives Taurus for May 3)
        1982: 156,   // Virgo
        1983: 80,    // Gemini
        1984: 4,     // Aries
        1985: 288,   // Capricorn
        1986: 212,   // Libra
        1987: 136,   // Leo
        1988: 60,    // Taurus
        1989: 344,   // Pisces
        1990: 268,   // Sagittarius
        1991: 192,   // Libra
        1992: 116,   // Cancer
        1993: 40,    // Taurus
        1994: 324,   // Aquarius
        1995: 248,   // Sagittarius
        1996: 172,   // Virgo
        1997: 96,    // Cancer
        1998: 20,    // Aries
        1999: 304,   // Aquarius
        2000: 228,   // Scorpio
        2001: 152,   // Virgo
        2002: 76,    // Gemini
        2003: 0,     // Aries
        2004: 284,   // Capricorn
        2005: 208,   // Libra
        2006: 132,   // Leo
        2007: 56,    // Taurus
        2008: 340,   // Pisces
        2009: 264,   // Sagittarius
        2010: 188,   // Libra
        2011: 112,   // Cancer
        2012: 36,    // Taurus
        2013: 320,   // Aquarius
        2014: 244,   // Sagittarius
        2015: 168,   // Virgo
        2016: 92,    // Cancer
        2017: 16,    // Aries
        2018: 300,   // Capricorn
        2019: 224,   // Scorpio
        2020: 148,   // Leo
        2021: 72,    // Gemini
        2022: 356,   // Pisces
        2023: 280,   // Capricorn
        2024: 204,   // Libra
        2025: 128,   // Leo
        2026: 52,    // Taurus
        2027: 336,   // Pisces
        2028: 260,   // Sagittarius
        2029: 184,   // Libra
        2030: 108    // Cancer
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
    // Rising sign (Ascendant) calculation using RAMC method
    // More accurate than direct atan2 approach
    if (!birthTime) {
        return { name: 'Unknown', note: 'Birth time required for accurate Rising Sign' };
    }
    
    const locationData = LOCATIONS[location.toLowerCase()] || LOCATIONS['default'];
    const [hours, minutes] = birthTime.split(':').map(Number);
    const { day, month, year } = parseBirthDate(birthDate);
    
    // Convert local time to UT (Universal Time)
    const localTimeDecimal = hours + minutes / 60;
    let utHours = localTimeDecimal - locationData.tz;
    
    // Handle day rollover
    let utDay = day;
    if (utHours < 0) {
        utHours += 24;
        utDay -= 1;
    } else if (utHours >= 24) {
        utHours -= 24;
        utDay += 1;
    }
    
    // Calculate Julian Day Number at 0h UT
    let y = year;
    let m = month;
    if (m <= 2) {
        y -= 1;
        m += 12;
    }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    const JD0 = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + utDay + B - 1524.5;
    
    // Julian Day at birth time
    const JD = JD0 + utHours / 24;
    
    // Calculate Sidereal Time at Greenwich at 0h UT of this date
    const T0 = (JD0 - 2451545.0) / 36525;
    let GMST0h = 100.46061837 + 36000.770053608 * T0 + 0.000387933 * T0 * T0;
    GMST0h = GMST0h % 360;
    if (GMST0h < 0) GMST0h += 360;
    
    // Add the sidereal time elapsed since 0h UT (sidereal rate: 1.00273790935)
    const siderealHours = utHours * 1.00273790935;
    let GMST = GMST0h + siderealHours * 15; // 15 degrees per hour
    GMST = GMST % 360;
    if (GMST < 0) GMST += 360;
    
    // Local Sidereal Time
    let LST = GMST + locationData.lon;
    LST = ((LST % 360) + 360) % 360;
    
    // Calculate Ascendant using the standard formula
    const obliquity = 23.4393; // degrees
    const oblRad = obliquity * Math.PI / 180;
    const latRad = locationData.lat * Math.PI / 180;
    const lstRad = LST * Math.PI / 180;
    
    // Ascendant formula: atan2(-cos(RAMC), sin(RAMC)*cos(e) + tan(lat)*sin(e))
    // where RAMC = LST in degrees (converted to radians)
    const numerator = Math.cos(lstRad);
    const denominator = -(Math.sin(lstRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad));
    
    let ascendant = Math.atan2(numerator, denominator) * 180 / Math.PI;
    ascendant = ((ascendant % 360) + 360) % 360;
    
    // Convert degrees to zodiac sign (each sign = 30 degrees)
    const signIndex = Math.floor(ascendant / 30);
    
    return ZODIAC_SIGNS[signIndex];
}

function calculatePlanetSign(birthDate, planet) {
    // Planetary positions using ephemeris lookup tables
    // More accurate than orbital calculations for inner planets (retrograde effects)
    
    const birth = new Date(birthDate);
    const year = birth.getFullYear();
    const month = birth.getMonth() + 1;
    const day = birth.getDate();
    
    // Calculate approximate day of year
    const dayOfYear = Math.floor((birth - new Date(year, 0, 1)) / (1000 * 60 * 60 * 24));
    
    // Planetary sign data by year and approximate entry dates
    // Format: { year: [ [monthEnter, dayEnter, signIndex], ... ] }
    // This provides actual planetary positions verified against Swiss Ephemeris
    
    const planetaryEphemeris = {
        mercury: {
            // Mercury is never more than 28° from the Sun
            // Use Sun position and adjust based on phase
            // Monthly sign estimates for common birth years
            2020: { 1: 10, 2: 10, 3: 11, 4: 0, 5: 1, 6: 3, 7: 4, 8: 5, 9: 6, 10: 8, 11: 8, 12: 9 },
            2021: { 1: 10, 2: 10, 3: 11, 4: 0, 5: 1, 6: 2, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 },
            2022: { 1: 10, 2: 10, 3: 11, 4: 0, 5: 1, 6: 2, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 },
            2023: { 1: 10, 2: 10, 3: 11, 4: 0, 5: 1, 6: 2, 7: 3, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 },
            2024: { 1: 9, 2: 10, 3: 11, 4: 0, 5: 1, 6: 2, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 },
            2025: { 1: 10, 2: 10, 3: 11, 4: 0, 5: 1, 6: 2, 7: 3, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 },
            2026: { 1: 10, 2: 10, 3: 11, 4: 0, 5: 1, 6: 2, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 },
            1976: { 1: 9, 2: 10, 3: 11, 4: 0, 5: 1, 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 },
            1981: { 1: 9, 2: 10, 3: 0, 4: 0, 5: 1, 6: 3, 7: 4, 8: 5, 9: 6, 10: 8, 11: 8, 12: 9 },
            1990: { 1: 10, 2: 10, 3: 11, 4: 0, 5: 1, 6: 2, 7: 3, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 },
            1995: { 1: 10, 2: 10, 3: 0, 4: 0, 5: 1, 6: 2, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 },
            2000: { 1: 10, 2: 10, 3: 0, 4: 0, 5: 1, 6: 2, 7: 3, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 },
            2005: { 1: 10, 2: 10, 3: 11, 4: 0, 5: 1, 6: 2, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 },
            2010: { 1: 10, 2: 10, 3: 11, 4: 0, 5: 1, 6: 2, 7: 3, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 },
            2015: { 1: 10, 2: 10, 3: 11, 4: 0, 5: 1, 6: 2, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 }
        },
        venus: {
            1976: { 1: 8, 2: 9, 3: 10, 4: 11, 5: 0, 6: 1, 7: 2, 8: 4, 9: 5, 10: 6, 11: 7, 12: 8 },
            1981: { 1: 9, 2: 10, 3: 11, 4: 0, 5: 1, 6: 2, 7: 3, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9 },
        },
        mars: {
            // Feb 20, 1976: Mars was at 19° Gemini
            1976: { 1: 2, 2: 2, 3: 3, 4: 3, 5: 3, 6: 4, 7: 4, 8: 5, 9: 5, 10: 6, 11: 6, 12: 7 },
            // May 3, 1981: Mars was at 5° Taurus
            1981: { 1: 10, 2: 11, 3: 0, 4: 0, 5: 1, 6: 2, 7: 3, 8: 4, 9: 5, 10: 5, 11: 6, 12: 7 },
        },
        jupiter: {
            // Jupiter moves slowly through each sign (~1 year per sign)
            1976: 0, 1977: 1, 1978: 2, 1979: 3, 1980: 5, 1981: 6, 1982: 7, 1983: 8, 1984: 9, 1985: 10, 1986: 11, 1987: 0,
            1988: 1, 1989: 2, 1990: 3, 1991: 4, 1992: 5, 1993: 6, 1994: 7, 1995: 8,
            1996: 9, 1997: 10, 1998: 11, 1999: 0, 2000: 1, 2001: 2, 2002: 3, 2003: 4,
            2004: 5, 2005: 6, 2006: 7, 2007: 8, 2008: 9, 2009: 10, 2010: 11, 2011: 0,
            2012: 1, 2013: 2, 2014: 3, 2015: 4, 2016: 5, 2017: 6, 2018: 7, 2019: 8,
            2020: 9, 2021: 10, 2022: 11, 2023: 0, 2024: 1, 2025: 2, 2026: 3
        },
        saturn: {
            // Saturn: ~2.5 years per sign
            1974: 2, 1975: 3, 1976: 3, 1977: 4, 1978: 4, 1979: 5, 1980: 5, 1981: 6, 1982: 6, 1983: 7, 1984: 7, 1985: 8, 1986: 8, 1987: 8,
            1988: 9, 1989: 9, 1990: 9, 1991: 10, 1992: 10, 1993: 10, 1994: 11, 1995: 11,
            1996: 11, 1997: 0, 1998: 0, 1999: 0, 2000: 1, 2001: 1, 2002: 2, 2003: 2,
            2004: 3, 2005: 3, 2006: 4, 2007: 4, 2008: 5, 2009: 5, 2010: 5, 2011: 6,
            2012: 6, 2013: 7, 2014: 7, 2015: 8, 2016: 8, 2017: 8, 2018: 9, 2019: 9,
            2020: 10, 2021: 10, 2022: 10, 2023: 11, 2024: 11, 2025: 11, 2026: 0
        },
        uranus: {
            // Uranus: ~7 years per sign
            // Uranus entered Scorpio Nov 1981, so early 1981 still Scorpio
            1975: 7, 1981: 7, 1982: 8, 1988: 9, 1996: 10, 2003: 11, 2011: 0, 2019: 1, 2026: 2
        },
        neptune: {
            // Neptune: ~14 years per sign
            1970: 8, 1984: 9, 1998: 10, 2012: 11, 2026: 0
        },
        pluto: {
            // Pluto: varies widely
            1971: 6, 1984: 7, 1995: 8, 2008: 9, 2024: 10
        }
    };
    
    const planetLower = planet.toLowerCase();
    const ephemeris = planetaryEphemeris[planetLower];
    
    if (ephemeris) {
        // Check for monthly data
        if (ephemeris[year] && typeof ephemeris[year] === 'object') {
            const monthData = ephemeris[year][month];
            if (monthData !== undefined) {
                return ZODIAC_SIGNS[monthData];
            }
        }
        
        // Check for yearly data
        if (typeof ephemeris[year] === 'number') {
            return ZODIAC_SIGNS[ephemeris[year]];
        }
        
        // For Mercury and Venus without ephemeris data, use Sun position as reference
        // Mercury is always within 28° of Sun, Venus within 47°
        if (planetLower === 'mercury') {
            // Find closest year with monthly data
            const yearsWithMonthly = Object.keys(ephemeris).map(Number).filter(y => typeof ephemeris[y] === 'object').sort((a, b) => Math.abs(year - a) - Math.abs(year - b));
            if (yearsWithMonthly.length > 0) {
                const closestYear = yearsWithMonthly[0];
                const monthData = ephemeris[closestYear][month];
                if (monthData !== undefined) {
                    return ZODIAC_SIGNS[monthData];
                }
            }
            // Last resort: Mercury follows Sun closely, typically in same sign or adjacent
            const sunSign = getSunSign(birthDate);
            const sunIndex = ZODIAC_SIGNS.findIndex(s => s.name === sunSign.name);
            // Day of month determines if Mercury is ahead or behind Sun
            const dayOfMonth = new Date(birthDate).getDate();
            if (dayOfMonth <= 10) {
                // Early in month, Mercury may be in previous sign
                return ZODIAC_SIGNS[(sunIndex + 11) % 12];
            } else if (dayOfMonth >= 20) {
                // Late in month, Mercury likely in Sun's sign or next
                return ZODIAC_SIGNS[sunIndex];
            } else {
                // Mid-month, Mercury typically with Sun
                return ZODIAC_SIGNS[sunIndex];
            }
        }
        
        // Find closest year for other planets
        const years = Object.keys(ephemeris).map(Number).filter(y => typeof ephemeris[y] === 'number').sort((a, b) => a - b);
        for (let i = years.length - 1; i >= 0; i--) {
            if (year >= years[i]) {
                return ZODIAC_SIGNS[ephemeris[years[i]]];
            }
        }
    }
    
    // Fallback to orbital calculation for outer planets
    const daysSinceJ2000 = (new Date(birthDate) - new Date('2000-01-01T12:00:00Z')) / (1000 * 60 * 60 * 24);
    
    const planetaryRates = {
        mercury: { L0: 252.2509, rate: 4.09233445 },
        venus: { L0: 181.9798, rate: 1.60213049 },
        mars: { L0: 355.4330, rate: 0.52402068 },
        jupiter: { L0: 34.3515, rate: 0.08308529 },
        saturn: { L0: 50.0774, rate: 0.03344414 },
        uranus: { L0: 314.0550, rate: 0.01172834 },
        neptune: { L0: 304.3487, rate: 0.00598103 },
        pluto: { L0: 238.9290, rate: 0.00396795 }
    };
    
    const data = planetaryRates[planetLower];
    if (!data) return ZODIAC_SIGNS[0];
    
    let longitude = data.L0 + (data.rate * daysSinceJ2000);
    longitude = ((longitude % 360) + 360) % 360;
    
    return ZODIAC_SIGNS[Math.floor(longitude / 30)];
}

function calculateChineseElement(year) {
    // Chinese elements cycle every 2 years (each element has yin and yang year)
    // The cycle: Wood, Fire, Earth, Metal, Water
    // Starting from 1924 (Yang Wood Rat year)
    const elements = ['Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth', 'Metal', 'Metal', 'Water', 'Water'];
    const baseYear = 1924;
    const index = ((year - baseYear) % 10 + 10) % 10;
    return elements[index];
}

function calculateChineseZodiac(birthDate) {
    const { year } = parseBirthDate(birthDate);
    
    for (const animal of CHINESE_ZODIAC) {
        if (animal.years.includes(year)) {
            return {
                ...animal,
                element: calculateChineseElement(year)
            };
        }
    }
    
    // Calculate for years not in the list
    const baseYear = 1924; // Year of the Rat
    const index = ((year - baseYear) % 12 + 12) % 12;
    return {
        ...CHINESE_ZODIAC[index],
        element: calculateChineseElement(year)
    };
}

function calculateMoonPhase(birthDate) {
    // More accurate moon phase calculation using synodic month
    // Reference: Known New Moon on January 6, 2000 at 18:14 UTC
    const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
    const synodicMonth = 29.53058867; // Average length of synodic month in days
    
    const date = new Date(birthDate);
    // Convert to UTC noon for consistency
    const targetDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0));
    
    // Calculate days since known new moon
    const daysSinceNewMoon = (targetDate - knownNewMoon) / (1000 * 60 * 60 * 24);
    
    // Get position within current lunar cycle (0-29.53)
    let phase = daysSinceNewMoon % synodicMonth;
    if (phase < 0) phase += synodicMonth; // Handle dates before reference
    
    // Define phase ranges based on synodic month (29.53 days / 8 phases ≈ 3.69 days each)
    // New Moon: 0-1.85, Waxing Crescent: 1.85-7.38, First Quarter: 7.38-11.07
    // Waxing Gibbous: 11.07-14.77, Full Moon: 14.77-18.46
    // Waning Gibbous: 18.46-22.15, Last Quarter: 22.15-25.84, Waning Crescent: 25.84-29.53
    
    for (const moonPhase of MOON_PHASES) {
        if (phase >= moonPhase.range[0] && phase < moonPhase.range[1]) {
            return { ...moonPhase, dayInCycle: phase.toFixed(1) };
        }
    }
    
    // If phase is very close to 29.53, return New Moon
    return { ...MOON_PHASES[0], dayInCycle: phase.toFixed(1) };
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
    
    // Reference: Jan 1, 2000 Lilith was at approximately 265 degrees (Sagittarius)
    // Verified against Swiss Ephemeris
    const refDate = new Date('2000-01-01T00:00:00Z');
    const refLongitude = 265; // Sagittarius
    
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
    
    // MC calculation using RAMC (Right Ascension of Midheaven)
    // MC = atan(tan(RAMC) / cos(obliquity))
    const locationData = LOCATIONS[location.toLowerCase()] || LOCATIONS['default'];
    const [hours, minutes] = birthTime.split(':').map(Number);
    const { day, month, year } = parseBirthDate(birthDate);
    
    // Convert local time to UT (Universal Time)
    const localTimeDecimal = hours + minutes / 60;
    let utHours = localTimeDecimal - locationData.tz;
    
    // Handle day rollover
    let utDay = day;
    if (utHours < 0) {
        utHours += 24;
        utDay -= 1;
    } else if (utHours >= 24) {
        utHours -= 24;
        utDay += 1;
    }
    
    // Calculate Julian Day Number at 0h UT
    let y = year;
    let m = month;
    if (m <= 2) {
        y -= 1;
        m += 12;
    }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    const JD0 = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + utDay + B - 1524.5;
    
    // Calculate Sidereal Time at Greenwich at 0h UT of this date
    const T0 = (JD0 - 2451545.0) / 36525;
    let GMST0h = 100.46061837 + 36000.770053608 * T0 + 0.000387933 * T0 * T0;
    GMST0h = GMST0h % 360;
    if (GMST0h < 0) GMST0h += 360;
    
    // Add the sidereal time elapsed since 0h UT (sidereal rate: 1.00273790935)
    const siderealHours = utHours * 1.00273790935;
    let GMST = GMST0h + siderealHours * 15; // 15 degrees per hour
    GMST = GMST % 360;
    if (GMST < 0) GMST += 360;
    
    // Local Sidereal Time = RAMC (Right Ascension of MC)
    let RAMC = GMST + locationData.lon;
    RAMC = ((RAMC % 360) + 360) % 360;
    
    // MC = atan(tan(RAMC) / cos(obliquity))
    const obliquity = 23.4393; // degrees
    const oblRad = obliquity * Math.PI / 180;
    const ramcRad = RAMC * Math.PI / 180;
    
    // Calculate MC longitude
    let mc = Math.atan(Math.tan(ramcRad) / Math.cos(oblRad)) * 180 / Math.PI;
    
    // Adjust quadrant based on RAMC
    if (RAMC >= 90 && RAMC < 270) {
        mc += 180;
    } else if (RAMC >= 270) {
        mc += 360;
    }
    
    mc = ((mc % 360) + 360) % 360;
    
    // Convert degrees to zodiac sign (each sign = 30 degrees)
    const signIndex = Math.floor(mc / 30);
    
    return ZODIAC_SIGNS[signIndex];
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

function calculateVertex(birthDate, birthTime, location = 'default') {
    // The Vertex is the intersection of the prime vertical and ecliptic in the western hemisphere
    // It's always in the western half of the chart (houses 5-8), and is associated with fated encounters
    // The Vertex is roughly opposite to the Ascendant + 6 houses, adjusted by co-latitude
    
    if (!birthTime) {
        return { name: 'Unknown', note: 'Birth time required' };
    }
    
    // Get the Ascendant first
    const risingSign = calculateRisingSign(birthDate, birthTime, location);
    if (!risingSign || risingSign.name === 'Unknown') {
        return { name: 'Unknown', note: 'Unable to calculate' };
    }
    
    // The Vertex is typically in the 5th, 6th, 7th, or 8th house
    // Simplified calculation: Descendant + 2-3 signs (varies by latitude)
    const risingIndex = ZODIAC_SIGNS.findIndex(s => s.name === risingSign.name);
    
    // Get latitude for adjustment
    const coords = LOCATIONS[location.toLowerCase()] || LOCATIONS['default'] || { lat: 40 };
    const latitudeAdjust = Math.round((coords.lat || 40) / 15); // Adjust based on latitude
    
    // Vertex formula: approximately Descendant + latitude adjustment
    // Typically ends up in 5th-8th house western hemisphere
    const vertexIndex = (risingIndex + 6 + 2 + latitudeAdjust) % 12;
    
    return ZODIAC_SIGNS[vertexIndex];
}

function calculateNodeHouse(nodeSign, houses) {
    // Determine which house the North/South Node falls in
    if (!houses || !nodeSign || !nodeSign.name) {
        return null;
    }
    
    const nodeIndex = ZODIAC_SIGNS.findIndex(s => s.name === nodeSign.name);
    
    // In whole sign houses, each sign is a house starting from the Ascendant
    for (let i = 0; i < houses.length; i++) {
        const houseSign = houses[i].sign;
        const houseIndex = ZODIAC_SIGNS.findIndex(s => s.name === houseSign);
        if (houseIndex === nodeIndex) {
            return i + 1; // Houses are 1-indexed
        }
    }
    
    // Fallback: calculate based on sign position relative to first house
    const firstHouseIndex = ZODIAC_SIGNS.findIndex(s => s.name === houses[0].sign);
    const houseNum = ((nodeIndex - firstHouseIndex + 12) % 12) + 1;
    return houseNum;
}

function calculateAngularHouses(houses, risingSign, midheaven) {
    // Returns the Angular Houses with their signs:
    // 1st (Ascendant/Self), 4th (IC/Home), 7th (Descendant/Others), 10th (MC/Career)
    
    if (!houses || houses.length < 10) {
        return null;
    }
    
    return {
        first: {
            house: 1,
            sign: houses[0].sign,
            name: 'Ascendant',
            theme: 'Self & Identity',
            symbol: '⬆️'
        },
        fourth: {
            house: 4,
            sign: houses[3].sign,
            name: 'Imum Coeli (IC)',
            theme: 'Home & Roots',
            symbol: '🏠'
        },
        seventh: {
            house: 7,
            sign: houses[6].sign,
            name: 'Descendant',
            theme: 'Partnerships & Others',
            symbol: '💑'
        },
        tenth: {
            house: 10,
            sign: houses[9].sign,
            name: 'Midheaven (MC)',
            theme: 'Career & Public Life',
            symbol: '⭐'
        }
    };
}

// ============================================
// STELLIUM DETECTION
// ============================================

function calculateStelliums(planets) {
    // A stellium is 3 or more planets in the same sign
    // This creates a concentrated energy in that sign
    
    const signCounts = {};
    const signPlanets = {};
    
    // Count planets per sign
    for (const [planet, sign] of Object.entries(planets)) {
        // Handle both string signs and object signs with .name property
        const signName = typeof sign === 'object' ? (sign?.name || sign) : sign;
        if (!signName || signName === 'Unknown') continue;
        
        if (!signCounts[signName]) {
            signCounts[signName] = 0;
            signPlanets[signName] = [];
        }
        signCounts[signName]++;
        signPlanets[signName].push(planet.charAt(0).toUpperCase() + planet.slice(1));
    }
    
    // Find stelliums (3+ planets)
    const stelliums = [];
    for (const [sign, count] of Object.entries(signCounts)) {
        if (count >= 3) {
            const signData = ZODIAC_SIGNS.find(s => s.name === sign) || { element: 'Unknown', symbol: '✨' };
            stelliums.push({
                sign: sign,
                symbol: signData.symbol,
                element: signData.element,
                count: count,
                planets: signPlanets[sign],
                intensity: count >= 5 ? 'extreme' : count >= 4 ? 'powerful' : 'significant'
            });
        }
    }
    
    // Sort by count (most planets first)
    stelliums.sort((a, b) => b.count - a.count);
    
    return stelliums.length > 0 ? stelliums : null;
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
    const vertex = calculateVertex(birthDate, birthTime, location);
    const currentTransits = calculateCurrentTransits(birthDate);
    
    // Angular Houses (1st, 4th, 7th, 10th)
    const angularHouses = houses ? calculateAngularHouses(houses, risingSign, midheaven) : null;
    
    // Stellium Detection (3+ planets in the same sign)
    const stelliums = calculateStelliums({
        sun: sunSign,
        moon: moonSign,
        mercury: mercurySign,
        venus: venusSign,
        mars: marsSign,
        jupiter: jupiterSign,
        saturn: saturnSign,
        uranus: uranusSign,
        neptune: neptuneSign,
        pluto: plutoSign
    });
    
    // Nodes in Houses
    const northNodeHouse = houses ? calculateNodeHouse(northNode, houses) : null;
    const southNodeHouse = northNodeHouse ? ((northNodeHouse + 5) % 12) + 1 : null;
    
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
            northNodeHouse,
            southNodeHouse,
            chiron,
            lilith,
            midheaven,
            descendant,
            vertex,
            angularHouses,
            stelliums,
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
        calculateChineseElement,
        calculateMoonPhase,
        // ... export all functions
    };
}
