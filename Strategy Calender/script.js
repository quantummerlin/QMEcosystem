// QUANTUM MERLIN LIFE STRATEGY - JAVASCRIPT

// ===== PRIORITY DRAG & DROP =====
const priorityList = document.getElementById('priority-list');
let draggedElement = null;

// Add drag event listeners to all priority items
document.querySelectorAll('.priority-list li').forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);
});

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

// ===== SCORING SYSTEM =====

function calculateMonthlyScore(personalYear, personalMonth, lifePath, destiny, priorities, month, birthMonth) {
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
    if ((personalYear === 7 &amp;&amp; personalMonth === 5) || 
        (personalYear === 5 &amp;&amp; personalMonth === 7)) {
        baseScore -= 10;
    }
    
    // PY2 + PM8 = patience vs power (friction)
    if ((personalYear === 2 &amp;&amp; personalMonth === 8) || 
        (personalYear === 8 &amp;&amp; personalMonth === 2)) {
        baseScore -= 8;
    }
    
    // PY9 + PM1 = completion vs beginning (friction)
    if ((personalYear === 9 &amp;&amp; personalMonth === 1) || 
        (personalYear === 1 &amp;&amp; personalMonth === 9)) {
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

function calculateWeeklyScore(month, weekIndex, personalYear, personalMonth, lifePath, destiny, priorities, birthMonth) {
    // Start with monthly base score
    let baseScore = calculateMonthlyScore(personalYear, personalMonth, lifePath, destiny, priorities, month, birthMonth);
    
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
    
    return Math.max(0, Math.min(100, Math.round(baseScore)));
}

function calculateDailyScore(month, day, dayOfWeek, personalYear, personalMonth, lifePath, destiny, priorities, birthMonth, astronomicalData) {
    // Start with monthly score as base
    let baseScore = calculateMonthlyScore(personalYear, personalMonth, lifePath, destiny, priorities, month, birthMonth);
    
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
    
    // Astronomical influence
    if (astronomicalData) {
        baseScore += astronomicalData.moonPhaseModifier || 0;
        baseScore += astronomicalData.planetaryModifier || 0;
        baseScore += astronomicalData.transitModifier || 0;
    }
    
    // Lunar cycle influence (rough approximation)
    const dayOfMonth = day;
    if (dayOfMonth <= 7 || dayOfMonth >= 28) {
        baseScore += 5; // New Moon period - new beginnings
    } else if (dayOfMonth >= 14 && dayOfMonth <= 21) {
        baseScore += 3; // Full Moon period - illumination
    }
    
    // Personal day number (based on day of month)
    const personalDay = reduceToSingleDigit(dayOfMonth);
    const personalDayModifiers = {
        1: 8, 2: -5, 3: 10, 4: 2, 5: 12, 6: 5, 7: -8, 8: 10, 9: -6, 11: 15, 22: 12, 33: 8
    };
    baseScore += personalDayModifiers[personalDay] || 0;
    
    // Birthday bonus
    if (month === birthMonth && day === 3) { // Assuming day 3 is birthday
        baseScore += 15;
    }
    
    return Math.max(0, Math.min(100, Math.round(baseScore)));
}

function getAstronomicalData(date) {
    // Simulated astronomical data (would use Swiss Ephemeris API in production)
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (24 * 60 * 60 * 1000));
    
    // Moon phase simulation (29.53 day cycle)
    const moonCycle = (dayOfYear % 29.53) / 29.53;
    let moonPhaseModifier = 0;
    
    if (moonCycle < 0.125 || moonCycle > 0.875) {
        moonPhaseModifier = 5; // New Moon - new beginnings
    } else if (moonCycle >= 0.375 && moonCycle <= 0.625) {
        moonPhaseModifier = 3; // Full Moon - illumination
    } else if (moonCycle >= 0.625 && moonCycle <= 0.75) {
        moonPhaseModifier = -2; // Waning Moon - release
    }
    
    // Planetary modifier simulation
    const planetaryModifier = Math.sin(dayOfYear * 0.0172) * 3; // ~18 day cycle
    
    // Transit modifier simulation
    const transitModifier = Math.cos(dayOfYear * 0.0083) * 4; // ~75 day cycle
    
    return {
        moonPhase: moonCycle,
        moonPhaseModifier,
        planetaryModifier,
        transitModifier,
        sunSign: getSunSign(date),
        mercuryRetrograde: isMercuryRetrograde(date)
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

document.getElementById('calendar-form').addEventListener('submit', function(e) {
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
    
    // Calculate core numbers
    const lifePath = calculateLifePath(formData.birthMonth, formData.birthDay, formData.birthYear);
    const destiny = calculateDestinyNumber(formData.firstName, formData.lastName);
    const soulUrge = calculateSoulUrge(formData.firstName, formData.lastName);
    const personality = calculatePersonality(formData.firstName, formData.lastName);
    
    // Calculate 2026 calendar
    const calendar2026 = generate2026Calendar(formData, lifePath, destiny, priorities);
    
    // Store data in sessionStorage
    sessionStorage.setItem('quantumMerlinData', JSON.stringify({
        formData,
        priorities,
        coreNumbers: { lifePath, destiny, soulUrge, personality },
        calendar2026
    }));
    
    // Redirect to calendar page
    window.location.href = 'calendar.html';
});

function generate2026Calendar(formData, lifePath, destiny, priorities) {
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
        const score = calculateMonthlyScore(activePersonalYear, personalMonth, lifePath, destiny, priorities, month, birthdayMonth);
        const trafficLight = getTrafficLight(score);
        const theme = getWeeklyTheme(score);
        const guidance = getMonthlyGuidance(activePersonalYear, personalMonth, score, month, birthdayMonth);
        const categoryScores = calculateCategoryScores(score, priorities, activePersonalYear, personalMonth);
        
        // Generate weeks for this month
        const weeks = generateWeeklyData(month, activePersonalYear, personalMonth, lifePath, destiny, priorities, birthdayMonth);
        
        // Generate days for this month
        const days = generateDailyData(month, weeks, activePersonalYear, personalMonth, lifePath, destiny, priorities, birthdayMonth);
        
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

function generateWeeklyData(month, personalYear, personalMonth, lifePath, destiny, priorities, birthdayMonth) {
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
        const weekScore = calculateWeeklyScore(month, weekIndex, personalYear, personalMonth, lifePath, destiny, priorities, birthdayMonth);
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

function generateDailyData(month, weeks, personalYear, personalMonth, lifePath, destiny, priorities, birthdayMonth) {
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
        
        // Calculate daily score with astronomical influence
        const astronomicalData = getAstronomicalData(date);
        const dailyScore = calculateDailyScore(month, day, dayOfWeek, personalYear, personalMonth, lifePath, destiny, priorities, birthdayMonth, astronomicalData);
        const dailyTrafficLight = getTrafficLight(dailyScore);
        
        const dailyGuidance = getDailyGuidance(dailyFunction, dailyScore, personalYear, personalMonth, astronomicalData);
        const categoryScores = calculateCategoryScores(dailyScore, priorities, personalYear, personalMonth);
        
        // Get the week data for this day
        const weekData = weeks.find(w => w.days.includes(day));
        const weekTheme = weekData ? weekData.theme : getWeeklyTheme(dailyScore);
        
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
            isBestDay: dailyScore >= 85,
            isRedFlagDay: dailyScore < 30,
            isBirthday: month === birthdayMonth && day === 3 // Assuming day 3 is birthday
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
document.getElementById('birth-day').addEventListener('input', function() {
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

// ===== LOADING ANIMATION =====
function showLoading() {
    const button = document.querySelector('.cta-button');
    button.innerHTML = '<span class="button-icon">⏳</span> Calculating Your 2026... <span class="button-icon">⏳</span>';
    button.disabled = true;
}

// Add loading state to form submission
document.getElementById('calendar-form').addEventListener('submit', function() {
    showLoading();
});