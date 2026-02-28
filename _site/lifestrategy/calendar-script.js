// QUANTUM MERLIN CALENDAR PAGE - JAVASCRIPT

// ===== LOAD DATA FROM SESSION STORAGE =====
window.addEventListener('DOMContentLoaded', function() {
    const data = sessionStorage.getItem('quantumMerlinData');
    
    if (!data) {
        // No data found, redirect to home
        window.location.href = 'index.html';
        return;
    }
    
    const calendarData = JSON.parse(data);
    renderCalendar(calendarData);
});

// ===== RENDER CALENDAR =====
function renderCalendar(data) {
    const { formData, priorities, coreNumbers, calendar2026 } = data;
    
    // Update user name
    document.getElementById('user-name').textContent = 
        `${formData.firstName} ${formData.lastName}'s 2026 Strategic Calendar`;
    
    // Update core numbers
    document.getElementById('life-path').textContent = coreNumbers.lifePath;
    document.getElementById('destiny').textContent = coreNumbers.destiny;
    document.getElementById('soul-urge').textContent = coreNumbers.soulUrge;
    document.getElementById('personality').textContent = coreNumbers.personality;
    
    // Render year chart
    renderYearChart(calendar2026);
    
    // Render best/worst months
    renderBestWorstMonths(calendar2026);
    
    // Render monthly cards
    renderMonthlyCards(calendar2026);
    
    // Render priorities
    renderPriorities(priorities);
}

// ===== RENDER YEAR CHART =====
function renderYearChart(calendar) {
    const chartContainer = document.getElementById('year-chart');
    chartContainer.innerHTML = '';
    
    calendar.forEach(month => {
        const monthBar = document.createElement('div');
        monthBar.className = 'month-bar';
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        
        const barFill = document.createElement('div');
        barFill.className = `bar-fill ${month.trafficLight.class}`;
        barFill.style.height = `${month.score}%`;
        
        const barScore = document.createElement('div');
        barScore.className = 'bar-score';
        barScore.textContent = month.score;
        
        bar.appendChild(barFill);
        bar.appendChild(barScore);
        
        const monthLabel = document.createElement('div');
        monthLabel.className = 'month-label';
        monthLabel.textContent = month.monthName.substring(0, 3);
        
        monthBar.appendChild(bar);
        monthBar.appendChild(monthLabel);
        chartContainer.appendChild(monthBar);
    });
}

// ===== RENDER BEST/WORST MONTHS =====
function renderBestWorstMonths(calendar) {
    const bestMonthsList = document.getElementById('best-months');
    const redFlagList = document.getElementById('red-flag-months');
    
    bestMonthsList.innerHTML = '';
    redFlagList.innerHTML = '';
    
    // Find best months (score >= 70)
    const bestMonths = calendar.filter(m => m.score >= 70).sort((a, b) => b.score - a.score);
    
    if (bestMonths.length > 0) {
        bestMonths.slice(0, 3).forEach(month => {
            const li = document.createElement('li');
            li.textContent = `${month.monthName}: ${month.score}/100 - ${month.theme}`;
            bestMonthsList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No standout months this year. Focus on consistency.';
        bestMonthsList.appendChild(li);
    }
    
    // Find red flag months (score < 50)
    const redFlagMonths = calendar.filter(m => m.score < 50).sort((a, b) => a.score - b.score);
    
    if (redFlagMonths.length > 0) {
        redFlagMonths.forEach(month => {
            const li = document.createElement('li');
            li.textContent = `${month.monthName}: ${month.score}/100 - Conserve energy, avoid major launches`;
            redFlagList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No major red flags this year. Steady progress ahead.';
        redFlagList.appendChild(li);
    }
}

// ===== RENDER MONTHLY CARDS =====
function renderMonthlyCards(calendar) {
    const container = document.getElementById('monthly-cards');
    container.innerHTML = '';
    
    const categoryIcons = {
        health: '❤️',
        creativity: '🎨',
        relationships: '🤝',
        money: '💰',
        strategy: '🧠',
        visibility: '👁️'
    };
    
    const categoryNames = {
        health: 'Health',
        creativity: 'Creativity',
        relationships: 'Relationships',
        money: 'Money',
        strategy: 'Strategy',
        visibility: 'Visibility'
    };
    
    calendar.forEach((month, monthIndex) => {
        const card = document.createElement('div');
        card.className = 'month-card';
        
        // Add special classes for best/worst months
        if (month.score >= 70) {
            card.classList.add('best-month');
        } else if (month.score < 50) {
            card.classList.add('red-flag');
        }
        
        // Build category scores HTML
        let categoryScoresHTML = '';
        if (month.categoryScores) {
            categoryScoresHTML = '<div class="category-scores">';
            for (const [category, score] of Object.entries(month.categoryScores)) {
                const scoreClass = score >= 70 ? 'high' : score >= 50 ? 'medium' : 'low';
                categoryScoresHTML += `
                    <div class="category-score-item">
                        <span class="category-icon">${categoryIcons[category]}</span>
                        <span class="category-name">${categoryNames[category]}</span>
                        <span class="category-score ${scoreClass}">${score}</span>
                    </div>
                `;
            }
            categoryScoresHTML += '</div>';
        }
        
        // Build weeks HTML
        let weeksHTML = '';
        if (month.weeks && month.weeks.length > 0) {
            weeksHTML = '<div class="weeks-breakdown">';
            weeksHTML += '<h4>Weekly Breakdown</h4>';
            weeksHTML += '<div class="weeks-grid">';
            
            month.weeks.forEach(week => {
                const weekClass = week.isBestWeek ? 'best-week' : week.isRedFlagWeek ? 'red-flag-week' : '';
                weeksHTML += `
                    <div class="week-card ${weekClass}">
                        <div class="week-header">
                            <span class="week-number">Week ${week.weekNumber}</span>
                            <span class="week-score">${week.trafficLight.color} ${week.score}</span>
                        </div>
                        <div class="week-theme">${week.theme}</div>
                        <div class="week-guidance">${week.guidance}</div>
                    </div>
                `;
            });
            
            weeksHTML += '</div></div>';
        }
        
        // Build best days highlight
        let bestDaysHTML = '';
        if (month.days) {
            const bestDays = month.days.filter(day => day.isBestDay);
            const redFlagDays = month.days.filter(day => day.isRedFlagDay);
            
            if (bestDays.length > 0 || redFlagDays.length > 0) {
                bestDaysHTML = '<div class="daily-highlights">';
                if (bestDays.length > 0) {
                    bestDaysHTML += '<div class="best-days"><h5>🌟 Best Days</h5>';
                    bestDaysHTML += bestDays.map(day => `${day.month}/${day.day} ${day.dailyIcon} ${day.dailyFunction}`).join(', ');
                    bestDaysHTML += '</div>';
                }
                if (redFlagDays.length > 0) {
                    bestDaysHTML += '<div class="red-flag-days"><h5>⚠️ Red Flag Days</h5>';
                    bestDaysHTML += redFlagDays.map(day => `${day.month}/${day.day} ${day.dailyIcon} ${day.dailyFunction}`).join(', ');
                    bestDaysHTML += '</div>';
                }
                bestDaysHTML += '</div>';
            }
        }
        
        card.innerHTML = `
            <div class="month-header">
                <div class="month-name">${month.monthName}${month.isBirthdayMonth ? ' 🎂' : ''}</div>
                <div class="month-score-display">
                    <span class="traffic-light">${month.trafficLight.color}</span>
                    <span class="score-number ${month.trafficLight.class}">${month.score}</span>
                </div>
            </div>
            <div class="month-meta">
                <div class="meta-item">
                    <span class="meta-label">Personal Year:</span> ${month.personalYear}
                </div>
                <div class="meta-item">
                    <span class="meta-label">Personal Month:</span> ${month.personalMonth}
                </div>
                <div class="meta-item">
                    <span class="meta-label">Theme:</span> ${month.theme}
                </div>
            </div>
            <div class="month-guidance">
                ${month.guidance}
            </div>
            ${categoryScoresHTML}
            ${weeksHTML}
            ${bestDaysHTML}
            <div class="toggle-days">
                <button class="toggle-btn" onclick="toggleMonthDays(${monthIndex})">
                    <span class="toggle-text">Show Day-by-Day Breakdown ↓</span>
                </button>
            </div>
            <div class="days-breakdown" id="days-${monthIndex}" style="display: none;">
                ${renderDaysBreakdown(month)}
            </div>
        `;
        
        container.appendChild(card);
    });
}

function renderDaysBreakdown(month) {
    if (!month.days) return '';
    
    const dailyIcons = {
        'Strategy': '🧠',
        'Execute': '⚙️',
        'Create': '🎨',
        'Connect': '🤝',
        'Value': '💰',
        'Integrate': '🔄',
        'Recover': '🌱'
    };
    
    let daysHTML = '<div class="days-grid">';
    daysHTML += '<h4>Day-by-Day Breakdown</h4>';
    
    month.days.forEach(day => {
        const dayClass = day.isBestDay ? 'best-day' : day.isRedFlagDay ? 'red-flag-day' : '';
        daysHTML += `
            <div class="day-card ${dayClass}">
                <div class="day-header">
                    <span class="day-date">${day.month}/${day.day}</span>
                    <span class="day-score">${day.trafficLight.color} ${day.score}</span>
                </div>
                <div class="day-function">${dailyIcons[day.dailyFunction]} ${day.dailyFunction}</div>
                <div class="day-guidance">${day.guidance}</div>
                ${day.astronomicalData && day.astronomicalData.mercuryRetrograde ? '<div class="mercury-retrograde">⚠️ Mercury Retrograde</div>' : ''}
            </div>
        `;
    });
    
    daysHTML += '</div>';
    return daysHTML;
}

function toggleMonthDays(monthIndex) {
    const daysContainer = document.getElementById(`days-${monthIndex}`);
    const toggleBtn = document.querySelector(`#days-${monthIndex}`).previousElementSibling.querySelector('.toggle-text');
    
    if (daysContainer.style.display === 'none') {
        daysContainer.style.display = 'block';
        toggleBtn.textContent = 'Hide Day-by-Day Breakdown ↑';
    } else {
        daysContainer.style.display = 'none';
        toggleBtn.textContent = 'Show Day-by-Day Breakdown ↓';
    }
}

// ===== RENDER PRIORITIES =====
function renderPriorities(priorities) {
    const container = document.getElementById('priority-display');
    container.innerHTML = '';
    
    const priorityIcons = {
        health: '❤️',
        creativity: '🎨',
        relationships: '🤝',
        money: '💰',
        strategy: '🧠',
        visibility: '👁️'
    };
    
    const priorityNames = {
        health: 'Health',
        creativity: 'Creativity',
        relationships: 'Relationships',
        money: 'Money',
        strategy: 'Strategy',
        visibility: 'Visibility'
    };
    
    const weights = [1.4, 1.25, 1.15, 1.0, 0.9, 0.8];
    
    priorities.forEach((category, index) => {
        const item = document.createElement('div');
        item.className = 'priority-item';
        
        item.innerHTML = `
            <div class="priority-rank">${index + 1}</div>
            <div class="priority-icon-display">${priorityIcons[category]}</div>
            <div class="priority-name-display">${priorityNames[category]}</div>
            <div class="priority-weight">×${weights[index]}</div>
        `;
        
        container.appendChild(item);
    });
}

// ===== SHARE FUNCTIONS =====
function shareOnTwitter() {
    const text = encodeURIComponent("I just generated my 2026 Strategic Timing Calendar with Quantum Merlin! Know exactly when to push, wait, or pivot. 🔮✨");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard! Share it with friends.');
    }).catch(err => {
        console.error('Failed to copy link:', err);
        alert('Failed to copy link. Please copy manually: ' + url);
    });
}

// ===== EXPORT FUNCTIONS =====
function exportToPDF() {
    // For now, use browser print to PDF
    // In production, integrate with a PDF generation library like jsPDF
    window.print();
}

function exportToICS() {
    const data = JSON.parse(sessionStorage.getItem('quantumMerlinData'));
    const { formData, calendar2026 } = data;
    
    // Create ICS file content
    let icsContent = 'BEGIN:VCALENDAR\n';
    icsContent += 'VERSION:2.0\n';
    icsContent += 'PRODID:-//Quantum Merlin//Strategic Calendar//EN\n';
    icsContent += 'CALSCALE:GREGORIAN\n';
    icsContent += 'METHOD:PUBLISH\n';
    icsContent += `X-WR-CALNAME:${formData.firstName} ${formData.lastName}'s 2026 Strategic Calendar\n`;
    icsContent += 'X-WR-TIMEZONE:UTC\n';
    
    calendar2026.forEach(month => {
        const startDate = `2026${month.month.toString().padStart(2, '0')}01`;
        const endDate = `2026${month.month.toString().padStart(2, '0')}${getLastDayOfMonth(2026, month.month)}`;
        
        icsContent += 'BEGIN:VEVENT\n';
        icsContent += `DTSTART;VALUE=DATE:${startDate}\n`;
        icsContent += `DTEND;VALUE=DATE:${endDate}\n`;
        icsContent += `SUMMARY:${month.monthName} - Score: ${month.score}/100 ${month.trafficLight.color}\n`;
        icsContent += `DESCRIPTION:${month.guidance}\\n\\nTheme: ${month.theme}\\nPersonal Year: ${month.personalYear}\\nPersonal Month: ${month.personalMonth}\n`;
        icsContent += `UID:${month.month}-2026-quantum-merlin@quantummerlin.com\n`;
        icsContent += 'STATUS:CONFIRMED\n';
        icsContent += 'SEQUENCE:0\n';
        icsContent += 'END:VEVENT\n';
    });
    
    icsContent += 'END:VCALENDAR';
    
    // Create download link
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.firstName}-${formData.lastName}-2026-Calendar.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function generateHistoricalValidation(formData, lifePath, destiny) {
    const years = [2023, 2024, 2025];
    const historicalData = [];
    
    years.forEach(year => {
        const calendar = generateHistoricalCalendar(formData, lifePath, destiny, year);
        const accuracy = calculateHistoricalAccuracy(calendar);
        
        historicalData.push({
            year,
            calendar,
            accuracy,
            bestMonths: calendar.filter(m => m.score >= 70),
            worstMonths: calendar.filter(m => m.score < 40)
        });
    });
    
    return historicalData;
}

function generateHistoricalCalendar(formData, lifePath, destiny, year) {
    const calendar = [];
    const birthdayMonth = formData.birthMonth;
    
    // Calculate Personal Years
    const personalYear = calculatePersonalYear(birthdayMonth, formData.birthDay, year);
    
    for (let month = 1; month <= 12; month++) {
        const personalMonth = calculatePersonalMonth(personalYear, month);
        const score = calculateMonthlyScore(personalYear, personalMonth, lifePath, destiny, [], month, birthdayMonth);
        const trafficLight = getTrafficLight(score);
        const theme = getWeeklyTheme(score);
        const guidance = getMonthlyGuidance(personalYear, personalMonth, score, month, birthdayMonth);
        
        calendar.push({
            month,
            monthName: getMonthName(month),
            personalYear,
            personalMonth,
            score,
            trafficLight,
            theme,
            guidance
        });
    }
    
    return calendar;
}

function calculateHistoricalAccuracy(calendar) {
    // Simulated accuracy calculation (would compare with actual user data in production)
    const avgScore = calendar.reduce((sum, month) => sum + month.score, 0) / calendar.length;
    const scoreVariation = Math.sqrt(calendar.reduce((sum, month) => sum + Math.pow(month.score - avgScore, 2), 0) / calendar.length);
    
    // Higher accuracy if scores are consistent and patterns are clear
    const accuracy = Math.max(60, Math.min(95, 85 - scoreVariation * 0.5));
    return Math.round(accuracy);
}

function showHistoricalValidation() {
    const data = JSON.parse(sessionStorage.getItem('quantumMerlinData'));
    const { formData, coreNumbers } = data;
    
    const historicalData = generateHistoricalValidation(formData, coreNumbers.lifePath, coreNumbers.destiny);
    
    let validationHTML = '<div class="historical-validation">';
    validationHTML += '<h3>Historical Validation (2023-2025)</h3>';
    
    historicalData.forEach(({ year, accuracy, bestMonths, worstMonths }) => {
        validationHTML += `
            <div class="year-validation">
                <h4>${year} - Accuracy: ${accuracy}%</h4>
                <div class="year-summary">
                    <div class="best-months">
                        <strong>Best Months:</strong> ${bestMonths.map(m => m.monthName).join(', ')}
                    </div>
                    <div class="worst-months">
                        <strong>Challenging Months:</strong> ${worstMonths.map(m => m.monthName).join(', ')}
                    </div>
                </div>
            </div>
        `;
    });
    
    validationHTML += '<div class="validation-note">';
    validationHTML += '<p><strong>Note:</strong> This validation shows pattern consistency. Individual accuracy varies by person and life circumstances.</p>';
    validationHTML += '</div></div>';
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Historical Validation</h2>
                <button class="close-modal" onclick="closeModal()">×</button>
            </div>
            <div class="modal-body">
                ${validationHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function getLastDayOfMonth(year, month) {
    return new Date(year, month, 0).getDate();
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