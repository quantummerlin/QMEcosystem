// QUANTUM MERLIN LIFE STRATEGY - JAVASCRIPT

// ===== PRIORITY DRAG & DROP WITH TOUCH SUPPORT =====
const priorityList = document.getElementById('priority-list');
let draggedElement = null;
let touchStartY = 0;
let touchCurrentY = 0;

// Add drag event listeners to all priority items (only if on form page)
if (priorityList) {
    document.querySelectorAll('.priority-list li').forEach(item => {
        // Desktop drag events
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
        
        // Mobile touch events
        item.addEventListener('touchstart', handleTouchStart, { passive: false });
        item.addEventListener('touchmove', handleTouchMove, { passive: false });
        item.addEventListener('touchend', handleTouchEnd, { passive: false });
    });
}

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    
    const afterElement = getDragAfterElement(priorityList, e.clientY);
    if (afterElement == null) {
        priorityList.appendChild(draggedElement);
    } else {
        priorityList.insertBefore(draggedElement, afterElement);
    }
    
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

// Touch event handlers for mobile
function handleTouchStart(e) {
    draggedElement = this;
    touchStartY = e.touches[0].clientY;
    this.classList.add('dragging');
    e.preventDefault();
}

function handleTouchMove(e) {
    if (!draggedElement) return;
    
    e.preventDefault();
    touchCurrentY = e.touches[0].clientY;
    
    const afterElement = getDragAfterElement(priorityList, touchCurrentY);
    if (afterElement == null) {
        priorityList.appendChild(draggedElement);
    } else {
        priorityList.insertBefore(draggedElement, afterElement);
    }
}

function handleTouchEnd(e) {
    if (!draggedElement) return;
    
    e.preventDefault();
    draggedElement.classList.remove('dragging');
    draggedElement = null;
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// ===== NUMEROLOGY CALCULATIONS =====

function reduceToSingleDigit(num, allowMasterNumbers = true) {
    // Master numbers: 11, 22, 33
    if (allowMasterNumbers && (num === 11 || num === 22 || num === 33)) {
        return num;
    }
    
    while (num > 9) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        if (allowMasterNumbers && (num === 11 || num === 22 || num === 33)) {
            return num;
        }
    }
    
    return num;
}

function calculateLifePath(month, day, year) {
    const monthSum = reduceToSingleDigit(month);
    const daySum = reduceToSingleDigit(day);
    const yearSum = reduceToSingleDigit(year);
    
    const total = monthSum + daySum + yearSum;
    return reduceToSingleDigit(total);
}

function letterToNumber(letter) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const position = alphabet.indexOf(letter.toUpperCase()) + 1;
    return position;
}

function calculateNameNumber(name) {
    const cleanName = name.replace(/[^A-Za-z]/g, '');
    const sum = cleanName.split('').reduce((total, letter) => {
        return total + letterToNumber(letter);
    }, 0);
    return reduceToSingleDigit(sum);
}

function calculateDestinyNumber(firstName, lastName) {
    const fullName = firstName + lastName;
    return calculateNameNumber(fullName);
}

function calculateSoulUrge(firstName, lastName) {
    const vowels = 'AEIOU';
    const fullName = (firstName + lastName).toUpperCase();
    const vowelSum = fullName.split('').reduce((total, letter) => {
        if (vowels.includes(letter)) {
            return total + letterToNumber(letter);
        }
        return total;
    }, 0);
    return reduceToSingleDigit(vowelSum);
}

function calculatePersonality(firstName, lastName) {
    const vowels = 'AEIOU';
    const fullName = (firstName + lastName).toUpperCase();
    const consonantSum = fullName.split('').reduce((total, letter) => {
        if (!vowels.includes(letter) && letter.match(/[A-Z]/)) {
            return total + letterToNumber(letter);
        }
        return total;
    }, 0);
    return reduceToSingleDigit(consonantSum);
}

function calculatePersonalYear(birthMonth, birthDay, currentYear) {
    const monthSum = reduceToSingleDigit(birthMonth);
    const daySum = reduceToSingleDigit(birthDay);
    const yearSum = reduceToSingleDigit(currentYear);
    
    const total = monthSum + daySum + yearSum;
    return reduceToSingleDigit(total);
}

function calculatePersonalMonth(personalYear, currentMonth) {
    const total = personalYear + currentMonth;
    return reduceToSingleDigit(total);
}

// ===== CHINESE ZODIAC =====

function getChineseZodiac(birthYear, birthMonth, birthDay) {
    const animals = [
        'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
        'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
    ];
    
    // Elements based on last digit of year (Heavenly Stems)
    // 0-1: Metal, 2-3: Water, 4-5: Wood, 6-7: Fire, 8-9: Earth
    const elements = ['Metal', 'Metal', 'Water', 'Water', 'Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth'];
    
    // Chinese New Year dates for accurate calculation
    const cnyDates = {
        1980: [2, 16], 1981: [2, 5], 1982: [1, 25], 1983: [2, 13], 1984: [2, 2],
        1985: [2, 20], 1986: [2, 9], 1987: [1, 29], 1988: [2, 17], 1989: [2, 6],
        1990: [1, 27], 1991: [2, 15], 1992: [2, 4], 1993: [1, 23], 1994: [2, 10],
        1995: [1, 31], 1996: [2, 19], 1997: [2, 7], 1998: [1, 28], 1999: [2, 16],
        2000: [2, 5], 2001: [1, 24], 2002: [2, 12], 2003: [2, 1], 2004: [1, 22],
        2005: [2, 9], 2006: [1, 29], 2007: [2, 18], 2008: [2, 7], 2009: [1, 26],
        2010: [2, 14], 2011: [2, 3], 2012: [1, 23], 2013: [2, 10], 2014: [1, 31],
        2015: [2, 19], 2016: [2, 8], 2017: [1, 28], 2018: [2, 16], 2019: [2, 5],
        2020: [1, 25], 2021: [2, 12], 2022: [2, 1], 2023: [1, 22], 2024: [2, 10],
        2025: [1, 29], 2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13],
        2030: [2, 3]
    };
    
    // Adjust year if born before Chinese New Year
    let year = birthYear;
    if (cnyDates[birthYear]) {
        const [cnyMonth, cnyDay] = cnyDates[birthYear];
        if (birthMonth < cnyMonth || (birthMonth === cnyMonth && birthDay < cnyDay)) {
            year = birthYear - 1;
        }
    }
    
    // Animal calculation (12-year cycle, 1924 = Rat year 0)
    const animalIndex = (year - 1924) % 12;
    // Element calculation (10-year cycle based on year's last digit)
    const elementIndex = year % 10;
    
    return {
        animal: animals[animalIndex >= 0 ? animalIndex : animalIndex + 12],
        element: elements[elementIndex],
        year: year
    };
}

// ===== GEMATRIA =====

function calculateGematria(name) {
    if (!name) return 0;
    let sum = 0;
    for (let char of name.toUpperCase()) {
        if (char >= 'A' && char <= 'Z') {
            sum += char.charCodeAt(0) - 64; // A=1, B=2, etc.
        }
    }
    return sum;
}

// ===== WESTERN ZODIAC (SUN SIGN) =====

function getZodiacSign(month, day) {
    const signs = [
        { name: 'Capricorn', symbol: '♑', element: 'Earth', modality: 'Cardinal' },
        { name: 'Aquarius', symbol: '♒', element: 'Air', modality: 'Fixed' },
        { name: 'Pisces', symbol: '♓', element: 'Water', modality: 'Mutable' },
        { name: 'Aries', symbol: '♈', element: 'Fire', modality: 'Cardinal' },
        { name: 'Taurus', symbol: '♉', element: 'Earth', modality: 'Fixed' },
        { name: 'Gemini', symbol: '♊', element: 'Air', modality: 'Mutable' },
        { name: 'Cancer', symbol: '♋', element: 'Water', modality: 'Cardinal' },
        { name: 'Leo', symbol: '♌', element: 'Fire', modality: 'Fixed' },
        { name: 'Virgo', symbol: '♍', element: 'Earth', modality: 'Mutable' },
        { name: 'Libra', symbol: '♎', element: 'Air', modality: 'Cardinal' },
        { name: 'Scorpio', symbol: '♏', element: 'Water', modality: 'Fixed' },
        { name: 'Sagittarius', symbol: '♐', element: 'Fire', modality: 'Mutable' },
        { name: 'Capricorn', symbol: '♑', element: 'Earth', modality: 'Cardinal' }
    ];
    
    // Cusp dates for each month (day when sign changes)
    const dates = [20, 19, 20, 20, 21, 21, 22, 23, 23, 23, 22, 22];
    
    // Month is 1-12, need to handle as 0-11 for array indexing
    const monthIndex = month - 1;
    let signIndex = month; // Start with next sign index
    
    if (monthIndex >= 0 && monthIndex < 12 && day < dates[monthIndex]) {
        signIndex = month - 1;
        if (signIndex < 0) signIndex = 11;
    }
    
    // Ensure signIndex is valid
    if (signIndex < 0 || signIndex >= signs.length) {
        signIndex = 0;
    }
    
    return signs[signIndex] || signs[0];
}

// ===== RISING SIGN (Simplified - requires birth time) =====

function getRisingSign(month, day, birthHour, birthMinute) {
    if (birthHour === null || birthHour === undefined) return null;
    
    const sunSign = getZodiacSign(month, day);
    if (!sunSign || !sunSign.name) return null;
    
    const signOrder = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                       'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const sunSignIndex = signOrder.indexOf(sunSign.name);
    
    // Each sign rises for ~2 hours, starting from 6am = sun sign
    const totalMinutes = birthHour * 60 + birthMinute;
    const sunriseMinutes = 6 * 60; // Assume 6am sunrise
    const minutesSinceSunrise = (totalMinutes - sunriseMinutes + 1440) % 1440;
    const risingOffset = Math.floor(minutesSinceSunrise / 120);
    const risingIndex = (sunSignIndex + risingOffset) % 12;
    
    const signs = [
        { name: 'Aries', symbol: '♈', element: 'Fire' },
        { name: 'Taurus', symbol: '♉', element: 'Earth' },
        { name: 'Gemini', symbol: '♊', element: 'Air' },
        { name: 'Cancer', symbol: '♋', element: 'Water' },
        { name: 'Leo', symbol: '♌', element: 'Fire' },
        { name: 'Virgo', symbol: '♍', element: 'Earth' },
        { name: 'Libra', symbol: '♎', element: 'Air' },
        { name: 'Scorpio', symbol: '♏', element: 'Water' },
        { name: 'Sagittarius', symbol: '♐', element: 'Fire' },
        { name: 'Capricorn', symbol: '♑', element: 'Earth' },
        { name: 'Aquarius', symbol: '♒', element: 'Air' },
        { name: 'Pisces', symbol: '♓', element: 'Water' }
    ];
    
    return signs[risingIndex];
}

// ===== MOON SIGN (Simplified calculation) =====

function getMoonSign(birthYear, birthMonth, birthDay) {
    // Simplified: Moon moves ~13° per day, completes zodiac in ~27.3 days
    const epoch = new Date(2000, 0, 6); // Known Aries Moon
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    const daysSinceEpoch = Math.floor((birthDate - epoch) / (1000 * 60 * 60 * 24));
    const moonCycle = 27.3; // Sidereal month
    const degreesPerDay = 360 / moonCycle;
    let totalDegrees = (daysSinceEpoch * degreesPerDay) % 360;
    if (totalDegrees < 0) totalDegrees += 360; // Handle dates before epoch
    let signIndex = Math.floor(totalDegrees / 30) % 12;
    if (signIndex < 0) signIndex += 12; // Ensure positive index
    
    const signs = [
        { name: 'Aries', symbol: '♈', element: 'Fire' },
        { name: 'Taurus', symbol: '♉', element: 'Earth' },
        { name: 'Gemini', symbol: '♊', element: 'Air' },
        { name: 'Cancer', symbol: '♋', element: 'Water' },
        { name: 'Leo', symbol: '♌', element: 'Fire' },
        { name: 'Virgo', symbol: '♍', element: 'Earth' },
        { name: 'Libra', symbol: '♎', element: 'Air' },
        { name: 'Scorpio', symbol: '♏', element: 'Water' },
        { name: 'Sagittarius', symbol: '♐', element: 'Fire' },
        { name: 'Capricorn', symbol: '♑', element: 'Earth' },
        { name: 'Aquarius', symbol: '♒', element: 'Air' },
        { name: 'Pisces', symbol: '♓', element: 'Water' }
    ];
    
    return signs[signIndex] || signs[0]; // Fallback to Aries if undefined
}

// ===== MOON PHASE (Accurate calculation) =====

function getMoonPhase(date) {
    const epoch = new Date('2000-01-06'); // Known new moon
    const daysSince = (date - epoch) / (1000 * 60 * 60 * 24);
    const lunation = daysSince % 29.53;
    
    if (lunation < 1.85) return { phase: 'New Moon', symbol: '🌑', modifier: 8, energy: 'initiation' };
    if (lunation < 7.38) return { phase: 'Waxing Crescent', symbol: '🌒', modifier: 5, energy: 'momentum' };
    if (lunation < 9.23) return { phase: 'First Quarter', symbol: '🌓', modifier: 3, energy: 'action' };
    if (lunation < 14.77) return { phase: 'Waxing Gibbous', symbol: '🌔', modifier: 6, energy: 'refinement' };
    if (lunation < 16.62) return { phase: 'Full Moon', symbol: '🌕', modifier: 10, energy: 'manifestation' };
    if (lunation < 22.15) return { phase: 'Waning Gibbous', symbol: '🌖', modifier: 2, energy: 'gratitude' };
    if (lunation < 23.99) return { phase: 'Last Quarter', symbol: '🌗', modifier: -3, energy: 'release' };
    return { phase: 'Waning Crescent', symbol: '🌘', modifier: -5, energy: 'rest' };
}

// ===== PLANETARY HOURS =====

function getPlanetaryHour(date) {
    const dayOfWeek = date.getDay();
    const hour = date.getHours();
    
    // Chaldean order of planets
    const planets = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];
    // Day rulers: Sunday=Sun, Monday=Moon, Tuesday=Mars, etc.
    const dayRulers = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
    
    const dayRulerIndex = planets.indexOf(dayRulers[dayOfWeek]);
    const hoursFromSunrise = (hour - 6 + 24) % 24;
    const planetaryHourIndex = (dayRulerIndex + hoursFromSunrise) % 7;
    
    const planetData = {
        'Saturn': { symbol: '♄', modifier: -5, energy: 'discipline', activity: 'structure' },
        'Jupiter': { symbol: '♃', modifier: 8, energy: 'expansion', activity: 'learning' },
        'Mars': { symbol: '♂', modifier: 6, energy: 'action', activity: 'initiative' },
        'Sun': { symbol: '☉', modifier: 10, energy: 'vitality', activity: 'leadership' },
        'Venus': { symbol: '♀', modifier: 5, energy: 'harmony', activity: 'relationships' },
        'Mercury': { symbol: '☿', modifier: 4, energy: 'communication', activity: 'writing' },
        'Moon': { symbol: '☽', modifier: 2, energy: 'intuition', activity: 'reflection' }
    };
    
    return { planet: planets[planetaryHourIndex], ...planetData[planets[planetaryHourIndex]] };
}

// ===== CROSS-SYSTEM ANALYSIS =====

function getCrossSystemAnalysis(sunSign, moonSign, risingSign, chinese, lifePath, personalYear) {
    let agreementBonus = 0;
    let tensionPenalty = 0;
    
    // Element mapping for Western signs
    function getWesternElement(sign) {
        if (!sign) return null;
        const fireSignals = ['Aries', 'Leo', 'Sagittarius'];
        const earthSigns = ['Taurus', 'Virgo', 'Capricorn'];
        const airSigns = ['Gemini', 'Libra', 'Aquarius'];
        const waterSigns = ['Cancer', 'Scorpio', 'Pisces'];
        
        if (fireSignals.includes(sign.name)) return 'Fire';
        if (earthSigns.includes(sign.name)) return 'Earth';
        if (airSigns.includes(sign.name)) return 'Air';
        if (waterSigns.includes(sign.name)) return 'Water';
        return null;
    }
    
    const sunElement = getWesternElement(sunSign);
    const moonElement = moonSign ? getWesternElement(moonSign) : null;
    const risingElement = risingSign ? getWesternElement(risingSign) : null;
    
    // Chinese element compatibility with Western element
    const elementHarmony = {
        'Fire': ['Fire', 'Wood'],
        'Earth': ['Earth', 'Metal'],
        'Air': ['Metal', 'Water'],
        'Water': ['Water', 'Wood']
    };
    
    // Western-Chinese element harmony
    if (elementHarmony[sunElement] && chinese && elementHarmony[sunElement].includes(chinese.element)) {
        agreementBonus += 8; // Systems agree
    } else if (chinese) {
        tensionPenalty += 4; // Dynamic tension
    }
    
    // Life Path alignment with Sun Sign
    const leaderPaths = [1, 8];
    const creativePaths = [3, 6];
    const seekerPaths = [7, 11];
    const builderPaths = [4, 22];
    
    const leaderSigns = ['Aries', 'Leo', 'Capricorn'];
    const creativeSigns = ['Taurus', 'Leo', 'Libra', 'Pisces'];
    const seekerSigns = ['Sagittarius', 'Aquarius', 'Pisces', 'Scorpio'];
    const builderSigns = ['Taurus', 'Virgo', 'Capricorn'];
    
    // Only check alignment if sunSign exists
    if (sunSign && sunSign.name) {
        if ((leaderPaths.includes(lifePath) && leaderSigns.includes(sunSign.name)) ||
            (creativePaths.includes(lifePath) && creativeSigns.includes(sunSign.name)) ||
            (seekerPaths.includes(lifePath) && seekerSigns.includes(sunSign.name)) ||
            (builderPaths.includes(lifePath) && builderSigns.includes(sunSign.name))) {
            agreementBonus += 10; // Strong alignment
        }
    }
    
    // Moon-Chinese element harmony
    if (moonElement && chinese) {
        if ((moonElement === 'Water' && ['Water', 'Wood'].includes(chinese.element)) ||
            (moonElement === 'Fire' && ['Fire', 'Wood'].includes(chinese.element)) ||
            (moonElement === 'Earth' && ['Earth', 'Metal'].includes(chinese.element)) ||
            (moonElement === 'Air' && ['Metal', 'Water'].includes(chinese.element))) {
            agreementBonus += 5;
        }
    }
    
    // Sun-Moon-Rising element alignment
    if (sunElement && moonElement && sunElement === moonElement) {
        agreementBonus += 6; // Inner-outer harmony
    }
    if (risingElement && sunElement && risingElement === sunElement) {
        agreementBonus += 4; // Public-private alignment
    }
    
    // Chinese year alignment (current year element matches birth element)
    const currentYear = new Date().getFullYear();
    const currentChinese = getChineseZodiac(currentYear, 6, 15); // Mid-year check
    if (chinese && chinese.element === currentChinese.element) {
        agreementBonus += 12; // Element year boost
    }
    
    return {
        bonus: agreementBonus,
        penalty: tensionPenalty,
        netModifier: agreementBonus - tensionPenalty
    };
}

// ===== SCORING SYSTEM =====

function calculateMonthlyScore(personalYear, personalMonth, lifePath, destiny, priorities, month, birthMonth, extendedData = null) {
    // Base score from personal year alignment
    let baseScore = 50;
    
    // Personal Year modifiers (more nuanced)
    const pyModifiers = {
        1: 12,  // New beginnings - high energy
        2: -8,  // Patience - lower energy
        3: 18,  // Creativity - very high energy
        4: -2,  // Building - slightly below neutral
        5: 22,  // Change - very high energy
        6: 3,   // Responsibility - slightly above neutral
        7: -12, // Introspection - low energy
        8: 20,  // Power - very high energy
        9: -6,  // Completion - moderate-low energy
        11: 25, // Master number - extremely high
        22: 18, // Master number - very high
        33: 12  // Master number - high
    };
    
    baseScore += pyModifiers[personalYear] || 0;
    
    // Personal Month modifiers
    const pmModifiers = {
        1: 12,
        2: -8,
        3: 18,
        4: -2,
        5: 22,
        6: 3,
        7: -12,
        8: 20,
        9: -6,
        11: 25,
        22: 18,
        33: 12
    };
    
    baseScore += pmModifiers[personalMonth] || 0;
    
    // Life Path alignment bonus (stronger)
    if (lifePath === personalMonth) {
        baseScore += 15;
    }
    
    // Destiny alignment bonus (stronger)
    if (destiny === personalYear) {
        baseScore += 15;
    }
    
    // Birthday month bonus (transition energy)
    if (month === birthMonth) {
        baseScore += 8; // Transition month has special energy
    }
    
    // Friction detection: conflicting energies
    // PY7 + PM5 = introspection vs change (friction)
    if ((personalYear === 7 && personalMonth === 5) || 
        (personalYear === 5 && personalMonth === 7)) {
        baseScore -= 10;
    }
    
    // PY2 + PM8 = patience vs power (friction)
    if ((personalYear === 2 && personalMonth === 8) || 
        (personalYear === 8 && personalMonth === 2)) {
        baseScore -= 8;
    }
    
    // PY9 + PM1 = completion vs beginning (friction)
    if ((personalYear === 9 && personalMonth === 1) || 
        (personalYear === 1 && personalMonth === 9)) {
        baseScore -= 12;
    }
    
    // Seasonal modifiers (Northern Hemisphere bias - can be adjusted)
    const seasonalModifiers = {
        1: -5,  // January - low energy
        2: -3,  // February - building
        3: 5,   // March - spring energy
        4: 8,   // April - high spring
        5: 10,  // May - peak spring
        6: 8,   // June - summer start
        7: 5,   // July - mid summer
        8: 0,   // August - transition
        9: 3,   // September - fall start
        10: 5,  // October - peak fall
        11: -2, // November - winding down
        12: -8  // December - rest
    };
    
    baseScore += seasonalModifiers[month] || 0;
    
    // NEW: Cross-System Analysis bonus/penalty
    if (extendedData && extendedData.crossSystemAnalysis) {
        baseScore += extendedData.crossSystemAnalysis.netModifier;
    }
    
    // NEW: Chinese Zodiac element modifiers
    if (extendedData && extendedData.chinese) {
        const chineseModifiers = {
            'Wood': { 3: 8, 4: 8, 5: 5 },     // Spring months
            'Fire': { 5: 8, 6: 10, 7: 8 },    // Summer months
            'Earth': { 3: 3, 6: 3, 9: 3, 12: 3 }, // Transition months
            'Metal': { 8: 8, 9: 10, 10: 8 },  // Autumn months
            'Water': { 11: 8, 12: 10, 1: 8 }  // Winter months
        };
        const elementMod = chineseModifiers[extendedData.chinese.element];
        if (elementMod && elementMod[month]) {
            baseScore += elementMod[month];
        }
    }
    
    // NEW: Gematria name resonance with personal year
    if (extendedData && extendedData.gematria) {
        const gematriaReduced = reduceToSingleDigit(extendedData.gematria, false);
        if (gematriaReduced === personalYear || gematriaReduced === personalMonth) {
            baseScore += 6; // Name resonates with current energy
        }
    }
    
    // Priority weighting influence (subtle)
    const priorityWeights = [1.4, 1.25, 1.15, 1.0, 0.9, 0.8];
    const avgWeight = priorityWeights.reduce((a, b) => a + b, 0) / priorityWeights.length;
    const weightBonus = (avgWeight - 1.0) * 10;
    baseScore += weightBonus;
    
    // Ensure score is between 0-100
    return Math.max(0, Math.min(100, Math.round(baseScore)));
}

function getTrafficLight(score) {
    if (score >= 80) return { color: '🟢', text: 'GO', class: 'green' };
    if (score >= 60) return { color: '🟡', text: 'SOFT GO', class: 'yellow' };
    if (score >= 40) return { color: '🟢', text: 'NEUTRAL', class: 'neutral' };
    if (score >= 20) return { color: '🔴', text: 'PULL BACK', class: 'red' };
    return { color: '🔴', text: 'REST', class: 'red' };
}

function getWeeklyTheme(score) {
    if (score >= 80) return '🟠 Amplify';
    if (score >= 65) return '🟢 Build';
    if (score >= 50) return '🟡 Adjust';
    if (score >= 35) return '🔵 Observe';
    return '🔴 Release';
}

function getMonthlyGuidance(personalYear, personalMonth, score, month, birthdayMonth) {
    const baseGuidance = {
        1: "New beginnings favor bold moves. Plant seeds for the year ahead.",
        2: "Patience and partnership. Build relationships, not empires.",
        3: "Creative expression peaks. Share your work with the world.",
        4: "Foundation building. Structure and systems over spontaneity.",
        5: "Change and freedom. Embrace uncertainty and pivot quickly.",
        6: "Responsibility and service. Focus on family and community.",
        7: "Introspection and analysis. Research, don't rush.",
        8: "Power and authority. Revenue generation and strategic visibility.",
        9: "Completion and release. Finish strong, start nothing new.",
        11: "Intuitive insights. Trust your signal, share your vision.",
        22: "Master builder. Large-scale projects and legacy work.",
        33: "Master teacher. Healing, teaching, and service."
    };
    
    let guidance = baseGuidance[personalMonth] || baseGuidance[personalYear] || "Navigate with awareness.";
    
    // Add score-based context
    if (score >= 80) {
        guidance += " This is a peak month—maximize your leverage.";
    } else if (score >= 70) {
        guidance += " Strong momentum—push forward with confidence.";
    } else if (score >= 60) {
        guidance += " Steady progress—maintain consistency.";
    } else if (score >= 50) {
        guidance += " Neutral energy—focus on maintenance and preparation.";
    } else if (score >= 40) {
        guidance += " Lower energy—conserve resources and avoid overextension.";
    } else if (score >= 30) {
        guidance += " High friction—minimize new commitments and rest.";
    } else {
        guidance += " Critical rest period—do not launch anything new.";
    }
    
    // Birthday month special note
    if (month === birthdayMonth) {
        guidance += " ⚡ Your Personal Year transitions this month—expect a shift in energy and direction.";
    }
    
    return guidance;
}

function calculateWeeklyScore(month, weekIndex, personalYear, personalMonth, lifePath, destiny, priorities, birthMonth, extendedData = null) {
    // Start with monthly base score
    let baseScore = calculateMonthlyScore(personalYear, personalMonth, lifePath, destiny, priorities, month, birthMonth, extendedData);
    
    // Weekly modifiers based on week position in month
    const weeklyModifiers = [
        5,   // Week 1: Building momentum
        10,  // Week 2: Peak energy
        8,   // Week 3: Sustaining
        3,   // Week 4: Winding down
        -5   // Week 5: Transition to next month
    ];
    
    baseScore += weeklyModifiers[weekIndex] || 0;
    
    // Week of year influences
    const weekOfYear = Math.floor((new Date(2026, month - 1, 1) - new Date(2026, 0, 1)) / (7 * 24 * 60 * 60 * 1000)) + weekIndex + 1;
    
    // Seasonal week influences
    if (weekOfYear >= 17 && weekOfYear <= 22) {
        baseScore += 8; // Late April to late May - peak spring
    } else if (weekOfYear >= 31 && weekOfYear <= 34) {
        baseScore -= 10; // Early August - friction zone
    } else if (weekOfYear >= 43 && weekOfYear <= 45) {
        baseScore += 6; // Late October - authority peak
    }
    
    // Extended data weekly modifiers
    if (extendedData) {
        // Cross-system analysis affects weekly flow
        if (extendedData.crossSystemAnalysis) {
            baseScore += extendedData.crossSystemAnalysis.netModifier || 0;
        }
        
        // Chinese element harmony with week number
        if (extendedData.chinese && extendedData.chinese.element) {
            const weekElement = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'][weekIndex % 5];
            const elementHarmony = {
                'Wood': { boost: 'Water', drain: 'Metal' },
                'Fire': { boost: 'Wood', drain: 'Water' },
                'Earth': { boost: 'Fire', drain: 'Wood' },
                'Metal': { boost: 'Earth', drain: 'Fire' },
                'Water': { boost: 'Metal', drain: 'Earth' }
            };
            const harmony = elementHarmony[extendedData.chinese.element];
            if (harmony) {
                if (weekElement === harmony.boost) baseScore += 3;
                if (weekElement === harmony.drain) baseScore -= 2;
            }
        }
    }
    
    return Math.max(0, Math.min(100, Math.round(baseScore)));
}

function calculateDailyScore(month, day, dayOfWeek, personalYear, personalMonth, lifePath, destiny, priorities, birthMonth, astronomicalData, extendedData = null) {
    // Start with monthly score as base
    let baseScore = calculateMonthlyScore(personalYear, personalMonth, lifePath, destiny, priorities, month, birthMonth, extendedData);
    
    // Day of week modifiers
    const dayModifiers = {
        1: 3,   // Monday - Strategy energy
        2: 5,   // Tuesday - Execution energy
        3: 8,   // Wednesday - Creative peak
        4: 6,   // Thursday - Connection energy
        5: 7,   // Friday - Value energy
        6: 2,   // Saturday - Integration
        0: -2   // Sunday - Recovery
    };
    
    baseScore += dayModifiers[dayOfWeek] || 0;
    
    // Astronomical influence - now using real calculations
    if (astronomicalData) {
        // Moon Phase (real calculation)
        if (astronomicalData.moonPhase) {
            baseScore += astronomicalData.moonPhase.modifier || 0;
        }
        
        // Planetary Hour
        if (astronomicalData.planetaryHour) {
            baseScore += astronomicalData.planetaryHour.modifier || 0;
        }
        
        // Mercury Retrograde
        if (astronomicalData.mercuryRetrograde) {
            baseScore -= 8; // Retrograde penalty
        }
    }
    
    // Personal day number (based on day of month)
    const personalDay = reduceToSingleDigit(day);
    const personalDayModifiers = {
        1: 8, 2: -5, 3: 10, 4: 2, 5: 12, 6: 5, 7: -8, 8: 10, 9: -6, 11: 15, 22: 12, 33: 8
    };
    baseScore += personalDayModifiers[personalDay] || 0;
    
    // NEW: Chinese Zodiac day element harmony
    if (extendedData && extendedData.chinese) {
        const dayElement = getDayElement(month, day);
        const elementHarmony = {
            'Wood': ['Water', 'Wood'],
            'Fire': ['Wood', 'Fire'],
            'Earth': ['Fire', 'Earth'],
            'Metal': ['Earth', 'Metal'],
            'Water': ['Metal', 'Water']
        };
        if (elementHarmony[extendedData.chinese.element] && 
            elementHarmony[extendedData.chinese.element].includes(dayElement)) {
            baseScore += 5;
        }
    }
    
    // Birthday bonus
    if (extendedData && extendedData.birthDay && month === birthMonth && day === extendedData.birthDay) {
        baseScore += 20; // Birthday is powerful
    }
    
    return Math.max(0, Math.min(100, Math.round(baseScore)));
}

// Helper: Get day element based on 5-day cycle
function getDayElement(month, day) {
    const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
    const dayOfYear = Math.floor((new Date(2026, month - 1, day) - new Date(2026, 0, 1)) / (1000 * 60 * 60 * 24));
    return elements[dayOfYear % 5];
}

function getAstronomicalData(date, extendedData = null) {
    // Use real moon phase and planetary hour calculations
    const moonPhase = getMoonPhase(date);
    const planetaryHour = getPlanetaryHour(date);
    const mercuryRetro = isMercuryRetrograde(date);
    
    // Get sun sign for the date (transit sun)
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const transitSunSign = getZodiacSign(month, day);
    
    // Calculate sun sign harmony with birth sun sign
    let transitHarmony = 0;
    if (extendedData && extendedData.sunSign) {
        const birthElement = extendedData.sunSign.element;
        const transitElement = transitSunSign.element;
        
        // Same element = strong harmony
        if (birthElement === transitElement) {
            transitHarmony = 8;
        }
        // Compatible elements
        const compatible = {
            'Fire': ['Fire', 'Air'],
            'Earth': ['Earth', 'Water'],
            'Air': ['Air', 'Fire'],
            'Water': ['Water', 'Earth']
        };
        if (compatible[birthElement] && compatible[birthElement].includes(transitElement)) {
            transitHarmony = 5;
        }
    }
    
    return {
        moonPhase,
        planetaryHour,
        mercuryRetrograde: mercuryRetro,
        transitSunSign,
        transitHarmony
    };
}

function getSunSign(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    return "Pisces";
}

function isMercuryRetrograde(date) {
    // Simplified Mercury retrograde periods (would use ephemeris in production)
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (24 * 60 * 60 * 1000));
    const retrogradePeriods = [
        [15, 40], [130, 155], [245, 270], [360, 385] // Approximate periods
    ];
    
    return retrogradePeriods.some(([start, end]) => dayOfYear >= start && dayOfYear <= end);
}

function getWeeklyGuidance(weekNumber, personalYear, personalMonth, score) {
    const baseGuidance = {
        1: "Week 1: Set foundations. Plan the month's major initiatives.",
        2: "Week 2: Build momentum. Execute on your highest priorities.",
        3: "Week 3: Sustain energy. Focus on consistent progress.",
        4: "Week 4: Review and refine. Prepare for next month.",
        5: "Week 5: Transition period. Complete loose ends."
    };
    
    let guidance = baseGuidance[Math.min(weekNumber % 5, 5)] || "Navigate this week with awareness.";
    
    if (score >= 80) {
        guidance += " Peak week—maximize your impact.";
    } else if (score >= 70) {
        guidance += " Strong momentum—push forward confidently.";
    } else if (score >= 60) {
        guidance += " Steady progress—maintain consistency.";
    } else if (score >= 50) {
        guidance += " Neutral energy—focus on maintenance.";
    } else if (score >= 40) {
        guidance += " Lower energy—conserve resources.";
    } else {
        guidance += " High friction—rest and reflect only.";
    }
    
    return guidance;
}

function getDailyGuidance(dailyFunction, score, personalYear, personalMonth, astronomicalData) {
    const functionGuidance = {
        'Strategy': 'Plan, research, architect systems.',
        'Execute': 'Complete tasks, move projects forward.',
        'Create': 'Write, design, brainstorm, innovate.',
        'Connect': 'Network, negotiate, build relationships.',
        'Value': 'Financial decisions, pricing, revenue.',
        'Integrate': 'Review, synthesize, organize.',
        'Recover': 'Rest, reflect, recharge energy.'
    };
    
    let guidance = functionGuidance[dailyFunction] || "Navigate with awareness.";
    
    // Add score context
    if (score >= 85) {
        guidance += " Exceptional day—major breakthroughs possible.";
    } else if (score >= 75) {
        guidance += " High-energy day—important progress.";
    } else if (score >= 65) {
        guidance += " Good energy—steady advancement.";
    } else if (score >= 55) {
        guidance += " Moderate energy—maintain routines.";
    } else if (score >= 45) {
        guidance += " Lower energy—focus on essentials only.";
    } else if (score >= 35) {
        guidance += " Low energy—avoid new commitments.";
    } else {
        guidance += " Rest day—minimal activity only.";
    }
    
    // Add astronomical context
    if (astronomicalData) {
        if (astronomicalData.mercuryRetrograde) {
            guidance += " Mercury retrograde—review, don't initiate.";
        }
        if (astronomicalData.moonPhase < 0.125) {
            guidance += " New Moon energy—plant seeds.";
        } else if (astronomicalData.moonPhase >= 0.375 && astronomicalData.moonPhase <= 0.625) {
            guidance += " Full Moon illumination—celebrate wins.";
        }
    }
    
    return guidance;
}

// ===== FORM SUBMISSION =====

const calendarForm = document.getElementById('calendar-form');
if (calendarForm) {
    calendarForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: document.getElementById('first-name').value.trim(),
            lastName: document.getElementById('last-name').value.trim(),
            birthMonth: parseInt(document.getElementById('birth-month').value),
            birthDay: parseInt(document.getElementById('birth-day').value),
            birthYear: parseInt(document.getElementById('birth-year').value),
            birthTime: document.getElementById('birth-time').value,
            birthPlace: document.getElementById('birth-place').value.trim(),
            currentLocation: document.getElementById('current-location').value.trim()
        };
        
        // Get priority order
        const priorityElements = document.querySelectorAll('.priority-list li');
        const priorities = Array.from(priorityElements).map(el => el.dataset.category);
        
        // Calculate core numerology numbers
        const lifePath = calculateLifePath(formData.birthMonth, formData.birthDay, formData.birthYear);
    const destiny = calculateDestinyNumber(formData.firstName, formData.lastName);
    const soulUrge = calculateSoulUrge(formData.firstName, formData.lastName);
    const personality = calculatePersonality(formData.firstName, formData.lastName);
    
    // NEW: Calculate extended discipline data
    const chinese = getChineseZodiac(formData.birthYear, formData.birthMonth, formData.birthDay);
    const fullName = formData.firstName + ' ' + formData.lastName;
    const gematria = calculateGematria(fullName);
    const sunSign = getZodiacSign(formData.birthMonth, formData.birthDay);
    const moonSign = getMoonSign(formData.birthYear, formData.birthMonth, formData.birthDay);
    
    // Rising sign (requires birth time)
    let risingSign = null;
    if (formData.birthTime) {
        const [hours, minutes] = formData.birthTime.split(':').map(Number);
        risingSign = getRisingSign(formData.birthMonth, formData.birthDay, hours, minutes);
    }
    
    // Cross-system analysis
    const crossSystemAnalysis = getCrossSystemAnalysis(sunSign, moonSign, risingSign, chinese, lifePath, 
        calculatePersonalYear(formData.birthMonth, formData.birthDay, 2026));
    
    // Extended data object for scoring
    const extendedData = {
        chinese,
        gematria,
        sunSign,
        moonSign,
        risingSign,
        crossSystemAnalysis,
        birthDay: formData.birthDay
    };
    
    // Calculate 2026 calendar with extended data
    const calendar2026 = generate2026Calendar(formData, lifePath, destiny, priorities, extendedData);
    
    // Store data in sessionStorage
    sessionStorage.setItem('quantumMerlinData', JSON.stringify({
        formData,
        priorities,
        coreNumbers: { lifePath, destiny, soulUrge, personality },
        extendedData: {
            chinese,
            gematria,
            sunSign: sunSign ? { name: sunSign.name, symbol: sunSign.symbol, element: sunSign.element } : null,
            moonSign: moonSign ? { name: moonSign.name, symbol: moonSign.symbol, element: moonSign.element } : null,
            risingSign: risingSign ? { name: risingSign.name, symbol: risingSign.symbol, element: risingSign.element } : null,
            crossSystemBonus: crossSystemAnalysis ? crossSystemAnalysis.netModifier : 0
        },
        calendar2026
    }));
    
    // Save user details to localStorage for future visits
    localStorage.setItem('quantumMerlinUserDetails', JSON.stringify({
        formData,
        priorities,
        savedAt: new Date().toISOString()
    }));
    
    // Redirect to calendar page
    window.location.href = 'calendar.html';
    });
}

function generate2026Calendar(formData, lifePath, destiny, priorities, extendedData = null) {
    const calendar = [];
    const currentYear = 2026;
    
    // Determine Personal Year transition point (birthday)
    const birthdayMonth = formData.birthMonth;
    const birthdayDay = formData.birthDay;
    
    // Calculate Personal Year before and after birthday
    const personalYear2025 = calculatePersonalYear(birthdayMonth, birthdayDay, 2025);
    const personalYear2026 = calculatePersonalYear(birthdayMonth, birthdayDay, 2026);
    
    // Generate monthly data with weeks and days
    for (let month = 1; month <= 12; month++) {
        // Determine which Personal Year applies to this month
        let activePersonalYear;
        if (month < birthdayMonth || (month === birthdayMonth && birthdayDay > 15)) {
            activePersonalYear = personalYear2025;
        } else {
            activePersonalYear = personalYear2026;
        }
        
        const personalMonth = calculatePersonalMonth(activePersonalYear, month);
        const score = calculateMonthlyScore(activePersonalYear, personalMonth, lifePath, destiny, priorities, month, birthdayMonth, extendedData);
        const trafficLight = getTrafficLight(score);
        const theme = getWeeklyTheme(score);
        const guidance = getMonthlyGuidance(activePersonalYear, personalMonth, score, month, birthdayMonth);
        const categoryScores = calculateCategoryScores(score, priorities, activePersonalYear, personalMonth);
        
        // Generate weeks for this month
        const weeks = generateWeeklyData(month, activePersonalYear, personalMonth, lifePath, destiny, priorities, birthdayMonth, extendedData);
        
        // Generate days for this month
        const days = generateDailyData(month, weeks, activePersonalYear, personalMonth, lifePath, destiny, priorities, birthdayMonth, extendedData);
        
        calendar.push({
            month,
            monthName: getMonthName(month),
            personalYear: activePersonalYear,
            personalMonth,
            score,
            trafficLight,
            theme,
            guidance,
            categoryScores,
            isBirthdayMonth: month === birthdayMonth,
            weeks,
            days
        });
    }
    
    return calendar;
}

function generateWeeklyData(month, personalYear, personalMonth, lifePath, destiny, priorities, birthdayMonth, extendedData = null) {
    const weeks = [];
    const daysInMonth = new Date(2026, month, 0).getDate();
    const firstDay = new Date(2026, month - 1, 1).getDay(); // 0 = Sunday
    
    // Calculate week of year
    const weekOfYear = Math.floor((new Date(2026, month - 1, 1) - new Date(2026, 0, 1)) / (7 * 24 * 60 * 60 * 1000)) + 1;
    
    // Generate 4-5 weeks per month
    let weekIndex = 0;
    let currentDay = 1;
    
    while (currentDay <= daysInMonth) {
        const weekNumber = weekOfYear + weekIndex;
        const weekScore = calculateWeeklyScore(month, weekIndex, personalYear, personalMonth, lifePath, destiny, priorities, birthdayMonth, extendedData);
        const weekTrafficLight = getTrafficLight(weekScore);
        const weekTheme = getWeeklyTheme(weekScore);
        const weekGuidance = getWeeklyGuidance(weekNumber, personalYear, personalMonth, weekScore);
        
        // Get days in this week (up to 7 days)
        const weekDays = [];
        let dayCount = 0;
        
        for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
            weekDays.push(currentDay);
            currentDay++;
            dayCount++;
        }
        
        weeks.push({
            weekNumber,
            weekIndex,
            score: weekScore,
            trafficLight: weekTrafficLight,
            theme: weekTheme,
            guidance: weekGuidance,
            days: weekDays,
            isBestWeek: weekScore >= 80,
            isRedFlagWeek: weekScore < 40
        });
        
        weekIndex++;
    }
    
    return weeks;
}

function generateDailyData(month, weeks, personalYear, personalMonth, lifePath, destiny, priorities, birthdayMonth, extendedData = null) {
    const days = [];
    const daysInMonth = new Date(2026, month, 0).getDate();
    
    // Daily functions mapping
    const dailyFunctions = {
        1: 'Strategy',    // Monday
        2: 'Execute',     // Tuesday
        3: 'Create',      // Wednesday
        4: 'Connect',     // Thursday
        5: 'Value',       // Friday
        6: 'Integrate',   // Saturday
        0: 'Recover'      // Sunday
    };
    
    const dailyFunctionIcons = {
        'Strategy': '🧠',
        'Execute': '⚙️',
        'Create': '🎨',
        'Connect': '🤝',
        'Value': '💰',
        'Integrate': '🔄',
        'Recover': '🌱'
    };
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(2026, month - 1, day);
        const dayOfWeek = date.getDay();
        const dayOfYear = Math.floor((date - new Date(2026, 0, 1)) / (24 * 60 * 60 * 1000)) + 1;
        const weekOfYear = Math.floor((date - new Date(2026, 0, 1)) / (7 * 24 * 60 * 60 * 1000)) + 1;
        
        const dailyFunction = dailyFunctions[dayOfWeek];
        const dailyIcon = dailyFunctionIcons[dailyFunction];
        
        // Calculate daily score with astronomical influence and extended data
        const astronomicalData = getAstronomicalData(date);
        const dailyScore = calculateDailyScore(month, day, dayOfWeek, personalYear, personalMonth, lifePath, destiny, priorities, birthdayMonth, astronomicalData, extendedData);
        const dailyTrafficLight = getTrafficLight(dailyScore);
        
        const dailyGuidance = getDailyGuidance(dailyFunction, dailyScore, personalYear, personalMonth, astronomicalData);
        const categoryScores = calculateCategoryScores(dailyScore, priorities, personalYear, personalMonth);
        
        // Get the week data for this day
        const weekData = weeks.find(w => w.days.includes(day));
        const weekTheme = weekData ? weekData.theme : getWeeklyTheme(dailyScore);
        
        // Get birth day from extendedData if available
        const actualBirthDay = extendedData && extendedData.birthDay ? extendedData.birthDay : 3;
        
        days.push({
            day,
            dayOfWeek,
            dayOfYear,
            weekOfYear,
            dailyFunction,
            dailyIcon,
            score: dailyScore,
            trafficLight: dailyTrafficLight,
            guidance: dailyGuidance,
            categoryScores,
            weekTheme,
            astronomicalData,
            extendedData,
            isBestDay: dailyScore >= 85,
            isRedFlagDay: dailyScore < 30,
            isBirthday: month === birthdayMonth && day === actualBirthDay
        });
    }
    
    return days;
}

function calculateCategoryScores(baseScore, priorities, personalYear, personalMonth) {
    const categoryModifiers = {
        health: {
            1: 5, 2: 10, 3: 8, 4: 12, 5: 3, 6: 15, 7: 8, 8: 5, 9: 10, 11: 12, 22: 10, 33: 15
        },
        creativity: {
            1: 15, 2: 5, 3: 20, 4: 8, 5: 18, 6: 10, 7: 12, 8: 8, 9: 15, 11: 22, 22: 18, 33: 20
        },
        relationships: {
            1: 8, 2: 18, 3: 12, 4: 10, 5: 5, 6: 20, 7: 3, 8: 8, 9: 12, 11: 15, 22: 12, 33: 22
        },
        money: {
            1: 12, 2: 5, 3: 10, 4: 15, 5: 8, 6: 8, 7: 3, 8: 22, 9: 10, 11: 18, 22: 20, 33: 12
        },
        strategy: {
            1: 18, 2: 8, 3: 10, 4: 20, 5: 12, 6: 10, 7: 22, 8: 18, 9: 15, 11: 20, 22: 22, 33: 18
        },
        visibility: {
            1: 20, 2: 3, 3: 18, 4: 5, 5: 22, 6: 8, 7: 0, 8: 20, 9: 8, 11: 22, 22: 18, 33: 20
        }
    };
    
    const priorityWeights = [1.4, 1.25, 1.15, 1.0, 0.9, 0.8];
    const scores = {};
    
    priorities.forEach((category, index) => {
        const pyModifier = categoryModifiers[category][personalYear] || 0;
        const pmModifier = categoryModifiers[category][personalMonth] || 0;
        const weight = priorityWeights[index];
        
        let categoryScore = baseScore + pyModifier + pmModifier;
        categoryScore = categoryScore * weight;
        categoryScore = Math.max(0, Math.min(100, Math.round(categoryScore)));
        
        scores[category] = categoryScore;
    });
    
    return scores;
}

function getMonthName(month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1];
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== FORM VALIDATION =====
const birthDayInput = document.getElementById('birth-day');
if (birthDayInput) {
    birthDayInput.addEventListener('input', function() {
        const month = parseInt(document.getElementById('birth-month').value);
        const day = parseInt(this.value);
        
        if (month && day) {
            const daysInMonth = new Date(2000, month, 0).getDate();
            if (day > daysInMonth) {
                this.setCustomValidity(`${getMonthName(month)} only has ${daysInMonth} days`);
            } else {
                this.setCustomValidity('');
            }
        }
    });
}

// ===== LOADING ANIMATION =====
function showLoading() {
    const button = document.querySelector('.cta-button');
    if (button) {
        button.innerHTML = '<span class="button-icon">⏳</span> Calculating Your 2026... <span class="button-icon">⏳</span>';
        button.disabled = true;
    }
}

// Add loading state to form submission
if (calendarForm) {
    calendarForm.addEventListener('submit', function() {
        showLoading();
    });
}

// ===== LOAD PREVIOUS DETAILS =====
(function checkForSavedDetails() {
    const savedData = localStorage.getItem('quantumMerlinUserDetails');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            // Check if data is valid and has required fields
            if (data.formData && data.formData.firstName && data.formData.lastName) {
                // Show the load previous button
                const loadContainer = document.getElementById('load-previous-container');
                if (loadContainer) {
                    loadContainer.style.display = 'block';
                }
            }
        } catch (e) {
            console.log('Error parsing saved details:', e);
        }
    }
})();

// Load Previous Details button handler
document.getElementById('load-previous-btn')?.addEventListener('click', function() {
    const savedData = localStorage.getItem('quantumMerlinUserDetails');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            const formData = data.formData;
            const priorities = data.priorities;
            
            // Populate form fields
            if (formData.firstName) document.getElementById('first-name').value = formData.firstName;
            if (formData.lastName) document.getElementById('last-name').value = formData.lastName;
            if (formData.birthMonth) document.getElementById('birth-month').value = formData.birthMonth;
            if (formData.birthDay) document.getElementById('birth-day').value = formData.birthDay;
            if (formData.birthYear) document.getElementById('birth-year').value = formData.birthYear;
            if (formData.birthTime) document.getElementById('birth-time').value = formData.birthTime;
            if (formData.birthPlace) document.getElementById('birth-place').value = formData.birthPlace;
            if (formData.currentLocation) document.getElementById('current-location').value = formData.currentLocation;
            
            // Restore priority order
            if (priorities && priorities.length > 0) {
                const priorityList = document.getElementById('priority-list');
                const items = Array.from(priorityList.querySelectorAll('li'));
                
                // Sort items based on saved priority order
                priorities.forEach(category => {
                    const item = items.find(li => li.dataset.category === category);
                    if (item) {
                        priorityList.appendChild(item);
                    }
                });
            }
            
            // Hide the load button after loading
            const loadContainer = document.getElementById('load-previous-container');
            if (loadContainer) {
                loadContainer.innerHTML = '<p style="color: var(--quantum-gold); font-style: italic;">✨ Your details have been loaded! Review and click Generate. ✨</p>';
            }
            
            // Scroll to form
            document.getElementById('calendar-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
            
        } catch (e) {
            console.log('Error loading saved details:', e);
            alert('Unable to load saved details. Please enter your information manually.');
        }
    }
});

// ===== TODAY'S SNAPSHOT POPUP =====
(function checkForTodaySnapshot() {
    const savedData = localStorage.getItem('quantumMerlinUserDetails');
    const lastSnapshotShown = localStorage.getItem('quantumMerlinLastSnapshot');
    const today = new Date().toDateString();
    
    // Only show if we have saved data AND haven't shown today's snapshot yet
    if (savedData && lastSnapshotShown !== today) {
        try {
            const data = JSON.parse(savedData);
            
            if (data.formData && data.formData.firstName) {
                // Wait a moment for page to load, then show popup
                setTimeout(() => {
                    showTodaySnapshot(data);
                }, 800);
            }
        } catch (e) {
            console.log('Error checking for snapshot:', e);
        }
    }
})();

function showTodaySnapshot(savedData) {
    const { formData, priorities } = savedData;
    const today = new Date();
    
    // Calculate today's data
    const lifePath = calculateLifePath(formData.birthMonth, formData.birthDay, formData.birthYear);
    const destiny = calculateDestinyNumber(formData.firstName, formData.lastName);
    const personalYear = calculatePersonalYear(formData.birthMonth, formData.birthDay, 2026);
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const personalMonth = calculatePersonalMonth(personalYear, month);
    const dayOfWeek = today.getDay();
    
    // Get astronomical data for today
    const astronomicalData = getAstronomicalData(today);
    
    // Calculate extended data
    const chinese = getChineseZodiac(formData.birthYear, formData.birthMonth, formData.birthDay);
    const sunSign = getZodiacSign(formData.birthMonth, formData.birthDay);
    const moonSign = getMoonSign(formData.birthYear, formData.birthMonth, formData.birthDay);
    
    const extendedData = {
        chinese,
        sunSign,
        moonSign,
        birthDay: formData.birthDay
    };
    
    // Calculate today's score
    const dailyScore = calculateDailyScore(month, day, dayOfWeek, personalYear, personalMonth, lifePath, destiny, priorities || [], formData.birthMonth, astronomicalData, extendedData);
    const trafficLight = getTrafficLight(dailyScore);
    
    // Daily function
    const dailyFunctions = {
        0: { name: 'Recovery', icon: '🌱' },
        1: { name: 'Strategy', icon: '🧠' },
        2: { name: 'Execute', icon: '⚙️' },
        3: { name: 'Create', icon: '🎨' },
        4: { name: 'Connect', icon: '🤝' },
        5: { name: 'Value', icon: '💰' },
        6: { name: 'Integrate', icon: '🔄' }
    };
    
    const dailyFunction = dailyFunctions[dayOfWeek];
    const dailyGuidance = getDailyGuidance(dailyFunction.name, dailyScore, personalYear, personalMonth, astronomicalData);
    
    // Format date
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', dateOptions);
    
    // Populate modal
    document.getElementById('snapshot-date').textContent = formattedDate;
    document.getElementById('snapshot-greeting').textContent = `Welcome back, ${formData.firstName}!`;
    document.getElementById('snapshot-score-number').textContent = dailyScore;
    
    const scoreCircle = document.getElementById('snapshot-score-circle');
    scoreCircle.className = `snapshot-score-circle ${trafficLight.class}`;
    
    const trafficLightEl = document.getElementById('snapshot-traffic-light');
    trafficLightEl.textContent = trafficLight.label;
    trafficLightEl.className = `snapshot-traffic-light ${trafficLight.class}`;
    
    document.getElementById('snapshot-function').textContent = `${dailyFunction.icon} Today's Focus: ${dailyFunction.name}`;
    document.getElementById('snapshot-guidance').textContent = dailyGuidance;
    
    // Astro info
    let astroInfo = '';
    if (astronomicalData) {
        if (astronomicalData.moonPhase) {
            astroInfo += `${astronomicalData.moonPhase.symbol} ${astronomicalData.moonPhase.phase}`;
        }
        if (astronomicalData.planetaryHour) {
            astroInfo += ` • ${astronomicalData.planetaryHour.symbol} ${astronomicalData.planetaryHour.planet} Hour`;
        }
        if (astronomicalData.mercuryRetrograde) {
            astroInfo += ' • ⚠️ Mercury Retrograde';
        }
    }
    document.getElementById('snapshot-astro').textContent = astroInfo;
    
    // Show modal
    document.getElementById('snapshot-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Mark that we've shown today's snapshot
    localStorage.setItem('quantumMerlinLastSnapshot', today.toDateString());
}

function closeSnapshotModal() {
    document.getElementById('snapshot-modal').style.display = 'none';
    document.body.style.overflow = '';
}

function goToFullCalendar() {
    closeSnapshotModal();
    
    // Check if we have calendar data in session storage
    const sessionData = sessionStorage.getItem('quantumMerlinData');
    
    if (sessionData) {
        // Already have calendar generated, go directly
        window.location.href = 'calendar.html';
    } else {
        // Need to regenerate - load details and prompt user to click generate
        const loadBtn = document.getElementById('load-previous-btn');
        if (loadBtn) {
            loadBtn.click();
        }
        // Scroll to form
        document.getElementById('calendar-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('snapshot-modal');
        if (modal && modal.style.display !== 'none') {
            closeSnapshotModal();
        }
    }
});