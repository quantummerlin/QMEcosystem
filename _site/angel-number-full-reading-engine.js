// ═══════════════════════════════════════════════════════════════════════
// QUANTUM MERLIN - ANGEL NUMBER FULL READING ENGINE
// Deep 9 Mystical Systems Integration
// ═══════════════════════════════════════════════════════════════════════

let previousData = null;
let selectedProfile = null;
let selectedOption = null;
let angelNumber = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPreviousReading();
    loadSavedProfiles();
});

// Load previous angel number from sessionStorage
function loadPreviousReading() {
    const storedData = sessionStorage.getItem('qm_angel_reading_data');
    if (storedData) {
        try {
            previousData = JSON.parse(storedData);
            angelNumber = previousData.angelNumber;
            displayPreviousReading();
        } catch(e) {
            // Invalid data, show manual entry
            showManualEntry();
        }
    } else {
        // No previous data - show manual entry
        showManualEntry();
    }
}

function showManualEntry() {
    document.getElementById('previousReading').innerHTML = `
        <div class="manual-entry">
            <div class="previous-label">✨ Enter Your Angel Number</div>
            <p style="color: rgba(255,255,255,0.7); margin: 15px 0; font-size: 0.95rem;">
                Enter the angel number you've been seeing repeatedly
            </p>
            <div style="display: flex; gap: 15px; align-items: center; max-width: 400px; margin: 20px auto;">
                <input type="text" id="manualAngelNumber" placeholder="e.g., 111, 222, 1111" 
                    style="flex: 1; padding: 15px 20px; background: rgba(255,255,255,0.1); border: 2px solid var(--quantum-gold); border-radius: 12px; color: white; font-size: 1.2rem; text-align: center; font-family: 'Orbitron', monospace;"
                    maxlength="4" />
                <button onclick="setManualAngelNumber()" 
                    style="padding: 15px 30px; background: linear-gradient(135deg, #8a2be2, #ff6b9d); border: none; border-radius: 12px; color: white; font-weight: 600; cursor: pointer; font-size: 1rem;">
                    Continue →
                </button>
            </div>
            <p style="color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-top: 10px;">
                Or <a href="angel-number-calculator.html" style="color: var(--quantum-gold);">discover your angel number</a> first
            </p>
        </div>
    `;
}

function setManualAngelNumber() {
    const input = document.getElementById('manualAngelNumber');
    const number = input.value.trim();
    
    // Validate angel number
    if (!number || !/^\d+$/.test(number)) {
        alert('Please enter a valid angel number (digits only)');
        return;
    }
    
    angelNumber = parseInt(number);
    
    const displayEl = document.getElementById('angelNumberDisplay');
    if (displayEl) displayEl.textContent = angelNumber;
    
    const meanings = getAngelNumberMeanings(angelNumber);
    if (meanings) {
        const previewEl = document.getElementById('angelMeaningPreview');
        if (previewEl) previewEl.textContent = meanings.spiritual.substring(0, 150) + '...';
    }
    
    // Show confirmation
    document.getElementById('previousReading').innerHTML = `
        <div class="angel-display">
            <div class="angel-number-large">${angelNumber}</div>
            <div class="previous-label">Your Angel Number</div>
        </div>
    `;
    
    // Auto-select 'new' option
    selectOption('new');
}

// Display the angel number
function displayPreviousReading() {
    const displayEl = document.getElementById('angelNumberDisplay');
    if (displayEl) displayEl.textContent = angelNumber;
    
    const meanings = getAngelNumberMeanings(angelNumber);
    if (meanings) {
        const previewEl = document.getElementById('angelMeaningPreview');
        if (previewEl) previewEl.textContent = meanings.spiritual.substring(0, 150) + '...';
    }
    
    document.getElementById('previousReading').innerHTML = `
        <div class="angel-display">
            <div class="angel-number-large">${angelNumber}</div>
            <div class="previous-label">Your Angel Number</div>
            <p style="color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-top: 10px;">
                ${meanings ? meanings.spiritual.substring(0, 100) + '...' : ''}
            </p>
        </div>
    `;
}

// Profile option selection
function selectOption(option) {
    selectedOption = option;
    document.querySelectorAll('.profile-option').forEach(el => el.classList.remove('selected'));
    const optionEl = document.getElementById('option' + option.charAt(0).toUpperCase() + option.slice(1));
    if (optionEl) optionEl.classList.add('selected');
    
    const savedProfiles = document.getElementById('savedProfiles');
    const birthForm = document.getElementById('birthForm');
    
    if (option === 'saved') {
        if (savedProfiles) savedProfiles.classList.add('active');
        if (birthForm) birthForm.classList.remove('active');
    } else {
        if (savedProfiles) savedProfiles.classList.remove('active');
        if (birthForm) birthForm.classList.add('active');
        checkFormValidity();
    }
}

// Load saved profiles from library
function loadSavedProfiles() {
    const library = JSON.parse(localStorage.getItem('qm_library') || '[]');
    const profiles = library.filter(item => item.type === 'profile' || item.birthDate);
    const container = document.getElementById('profilesList');
    
    if (profiles.length === 0) {
        container.innerHTML = `
            <div class="no-profiles">
                <div class="no-profiles-icon">📭</div>
                <div>No saved profiles found</div>
                <p style="margin-top: 10px; font-size: 0.9rem; opacity: 0.7;">Create one by entering your birth details</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = profiles.map((profile, index) => `
        <div class="profile-card" onclick="selectProfile(${index})" id="profile-${index}">
            <div class="profile-name">${profile.name || profile.fullName || 'Unnamed Profile'}</div>
            <div class="profile-details">${profile.birthDate ? new Date(profile.birthDate).toLocaleDateString() : 'No birth date'} ${profile.birthPlace ? '• ' + profile.birthPlace : ''}</div>
        </div>
    `).join('');
}

// Select a saved profile
function selectProfile(index) {
    const library = JSON.parse(localStorage.getItem('qm_library') || '[]');
    const profiles = library.filter(item => item.type === 'profile' || item.birthDate);
    selectedProfile = profiles[index];
    
    document.querySelectorAll('.profile-card').forEach(el => el.classList.remove('selected'));
    document.getElementById('profile-' + index).classList.add('selected');
    document.getElementById('generateBtn').disabled = false;
}

// Check if form is valid
function checkFormValidity() {
    const name = document.getElementById('fullName')?.value;
    const birthDate = document.getElementById('birthDate')?.value;
    const generateBtn = document.getElementById('generateBtn');
    
    // Also check if we have an angel number
    const hasAngelNumber = angelNumber !== null && angelNumber !== undefined;
    
    if (generateBtn) {
        const isValid = name && birthDate && hasAngelNumber;
        generateBtn.disabled = !isValid;
        generateBtn.style.opacity = isValid ? '1' : '0.5';
        generateBtn.style.cursor = isValid ? 'pointer' : 'not-allowed';
        
        if (!hasAngelNumber && name && birthDate) {
            // Show message that angel number is needed
            generateBtn.title = 'Please enter your angel number above first';
        } else {
            generateBtn.title = '';
        }
    }
}

document.getElementById('fullName')?.addEventListener('input', checkFormValidity);
document.getElementById('birthDate')?.addEventListener('change', checkFormValidity);

// Show loading overlay
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    const btn = document.getElementById('generateBtn');
    if (overlay) overlay.classList.add('active');
    if (btn) btn.classList.add('loading');
    
    // Cycle through systems during loading
    const systems = [
        '♈ Connecting to Astrology...',
        '🔢 Calculating Numerology...',
        '🪐 Aligning Planetary Forces...',
        '🌙 Consulting Lunar Wisdom...',
        '✡️ Decoding Gematria...',
        '🎵 Tuning Frequencies...',
        '🐉 Invoking Chinese Zodiac...',
        '🌌 Activating Reality Codes...',
        '🃏 Drawing Tarot Insights...'
    ];
    
    let index = 0;
    const loadingSystem = document.getElementById('loadingSystem');
    
    const interval = setInterval(() => {
        if (loadingSystem) {
            loadingSystem.textContent = systems[index];
        }
        index++;
        if (index >= systems.length) {
            clearInterval(interval);
        }
    }, 300);
    
    return interval;
}

// Hide loading overlay
function hideLoading(interval) {
    clearInterval(interval);
    const overlay = document.getElementById('loadingOverlay');
    const btn = document.getElementById('generateBtn');
    if (overlay) overlay.classList.remove('active');
    if (btn) btn.classList.remove('loading');
}

// Generate the full reading
function generateFullReading() {
    // Show loading state
    const loadingInterval = showLoading();
    
    // Delay to show loading animation
    setTimeout(() => {
        let profileData;
        
        if (selectedOption === 'saved' && selectedProfile) {
            profileData = selectedProfile;
        } else {
            profileData = {
                fullName: document.getElementById('fullName').value,
                birthDate: document.getElementById('birthDate').value,
                birthTime: document.getElementById('birthTime').value,
                birthPlace: document.getElementById('birthPlace').value
            };
            
            if (document.getElementById('saveProfile').checked) {
                saveProfileToLibrary(profileData);
            }
        }
        
        const birthDate = new Date(profileData.birthDate);
        
        // Generate readings for all systems
        const readings = {
            astrology: generateAstrologyReading(birthDate, profileData, angelNumber),
            numerology: generateNumerologyReading(birthDate, profileData.fullName, angelNumber),
            planetary: generatePlanetaryReading(birthDate, angelNumber),
            lunar: generateLunarReading(angelNumber),
            gematria: generateGematriaReading(profileData.fullName, angelNumber),
            frequency: generateFrequencyReading(birthDate, profileData.fullName, angelNumber),
            chinese: generateChineseZodiacReading(birthDate, angelNumber),
            reality: generateRealityCodesReading(birthDate, angelNumber),
            tarot: generateTarotReading(birthDate, angelNumber)
        };
        
        hideLoading(loadingInterval);
        displayFullReading(readings);
        
        document.getElementById('inputSection').style.display = 'none';
        document.getElementById('resultsSection').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Track event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'full_reading_generated', {
                'tool': 'angel_number',
                'angel_number': angelNumber,
                'profile_source': selectedOption
            });
        }
    }, 2800); // Allow loading animation to cycle through systems
}

// Display the full reading
function displayFullReading(readings) {
    const meanings = getAngelNumberMeanings(angelNumber);
    
    const html = `
        <div class="systems-intro">
            <h2>✨ Your Angel Number ${angelNumber} Across 9 Mystical Systems</h2>
            <p>We've analyzed your divine message through nine ancient wisdom traditions and modern quantum understanding to reveal how this angelic guidance uniquely applies to your life path and soul journey.</p>
        </div>

        <!-- System 1: Astrology -->
        <div class="system-card">
            <div class="system-header">
                <div class="system-icon">♈</div>
                <h3 class="system-title">1. Astrology</h3>
                <p class="system-subtitle">Celestial Blueprint of Your Divine Message</p>
            </div>
            <div class="system-content">
                <div class="system-label">🌟 Zodiac Alignment</div>
                <p class="system-text">${readings.astrology}</p>
            </div>
        </div>

        <!-- System 2: Numerology -->
        <div class="system-card">
            <div class="system-header">
                <div class="system-icon">🔢</div>
                <h3 class="system-title">2. Numerology</h3>
                <p class="system-subtitle">Sacred Mathematics of Your Angel Number</p>
            </div>
            <div class="system-content">
                <div class="system-label">✨ Vibrational Analysis</div>
                <p class="system-text">${readings.numerology}</p>
            </div>
        </div>

        <!-- System 3: Planetary Alignments -->
        <div class="system-card">
            <div class="system-header">
                <div class="system-icon">🪐</div>
                <h3 class="system-title">3. Planetary Alignments</h3>
                <p class="system-subtitle">Divine Timing & Cosmic Cycles</p>
            </div>
            <div class="system-content">
                <div class="system-label">⏰ Current Transits</div>
                <p class="system-text">${readings.planetary}</p>
            </div>
        </div>

        <!-- System 4: Lunar Positioning -->
        <div class="system-card">
            <div class="system-header">
                <div class="system-icon">🌙</div>
                <h3 class="system-title">4. Lunar Positioning</h3>
                <p class="system-subtitle">Moon Phase Wisdom</p>
            </div>
            <div class="system-content">
                <div class="system-label">🌕 Lunar Guidance</div>
                <p class="system-text">${readings.lunar}</p>
            </div>
        </div>

        <!-- System 5: Gematria -->
        <div class="system-card">
            <div class="system-header">
                <div class="system-icon">🔤</div>
                <h3 class="system-title">5. Gematria</h3>
                <p class="system-subtitle">Hidden Codes in Your Name</p>
            </div>
            <div class="system-content">
                <div class="system-label">📖 Name Resonance</div>
                <p class="system-text">${readings.gematria}</p>
            </div>
        </div>

        <!-- System 6: Solfeggio Frequencies -->
        <div class="system-card">
            <div class="system-header">
                <div class="system-icon">🎵</div>
                <h3 class="system-title">6. Solfeggio Frequencies</h3>
                <p class="system-subtitle">Sound Healing Resonance</p>
            </div>
            <div class="system-content">
                <div class="system-label">🎼 Healing Tones</div>
                <p class="system-text">${readings.frequency}</p>
            </div>
        </div>

        <!-- System 7: Chinese Zodiac -->
        <div class="system-card">
            <div class="system-header">
                <div class="system-icon">🐉</div>
                <h3 class="system-title">7. Chinese Zodiac</h3>
                <p class="system-subtitle">Eastern Cosmic Wisdom</p>
            </div>
            <div class="system-content">
                <div class="system-label">🎋 Animal Spirit Guidance</div>
                <p class="system-text">${readings.chinese}</p>
            </div>
        </div>

        <!-- System 8: Reality Codes -->
        <div class="system-card">
            <div class="system-header">
                <div class="system-icon">💫</div>
                <h3 class="system-title">8. Reality Codes</h3>
                <p class="system-subtitle">Quantum Affirmations</p>
            </div>
            <div class="system-content">
                <div class="system-label">🌈 Activation Codes</div>
                <p class="system-text">${readings.reality}</p>
            </div>
        </div>

        <!-- System 9: Tarot -->
        <div class="system-card">
            <div class="system-header">
                <div class="system-icon">🃏</div>
                <h3 class="system-title">9. Tarot</h3>
                <p class="system-subtitle">Archetypal Divine Guidance</p>
            </div>
            <div class="system-content">
                <div class="system-label">🔮 Card Wisdom</div>
                <p class="system-text">${readings.tarot}</p>
            </div>
        </div>

        <div class="action-buttons">
            <button class="action-btn primary" onclick="saveToLibrary()">💾 Save to Library</button>
            <button class="action-btn" onclick="window.print()">🖨️ Print Reading</button>
            <button class="action-btn" onclick="shareReading()">📤 Share</button>
            <a href="angel-number-calculator.html" class="action-btn">🔄 Calculate Another</a>
        </div>
    `;
    
    document.getElementById('resultsSection').innerHTML = html;
}

// Save profile to library
function saveProfileToLibrary(profile) {
    const library = JSON.parse(localStorage.getItem('qm_library') || '[]');
    library.push({
        type: 'profile',
        timestamp: new Date().toISOString(),
        ...profile
    });
    localStorage.setItem('qm_library', JSON.stringify(library));
}

// Save reading to library
function saveToLibrary() {
    const reading = {
        type: 'angel_number_full_reading',
        tool: 'Angel Number Full Reading',
        timestamp: new Date().toISOString(),
        angelNumber: angelNumber,
        profile: selectedProfile || {
            fullName: document.getElementById('fullName')?.value,
            birthDate: document.getElementById('birthDate')?.value
        }
    };
    
    const library = JSON.parse(localStorage.getItem('qm_library') || '[]');
    library.push(reading);
    localStorage.setItem('qm_library', JSON.stringify(library));
    
    alert('✅ Reading saved to your Library!');
}

// Share reading
function shareReading() {
    if (navigator.share) {
        navigator.share({
            title: `Angel Number ${angelNumber} - Full Reading`,
            text: `Check out my complete angel number reading from Quantum Merlin!`,
            url: window.location.href
        });
    } else {
        const shareText = `I just got my Angel Number ${angelNumber} full reading from Quantum Merlin! ✨ Check it out at quantummerlin.com`;
        navigator.clipboard.writeText(shareText);
        alert('📋 Share text copied to clipboard!');
    }
}

// ═══════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

function getZodiacSign(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    return "Pisces";
}

function getElement(zodiac) {
    const elements = {
        "Aries": "Fire", "Leo": "Fire", "Sagittarius": "Fire",
        "Taurus": "Earth", "Virgo": "Earth", "Capricorn": "Earth",
        "Gemini": "Air", "Libra": "Air", "Aquarius": "Air",
        "Cancer": "Water", "Scorpio": "Water", "Pisces": "Water"
    };
    return elements[zodiac] || "Unknown";
}

function getZodiacTrait(zodiac) {
    const traits = {
        "Aries": "bold initiative and pioneering courage",
        "Taurus": "steadfast determination and sensual wisdom",
        "Gemini": "intellectual curiosity and adaptive communication",
        "Cancer": "emotional depth and nurturing intuition",
        "Leo": "radiant creativity and generous leadership",
        "Virgo": "analytical precision and devoted service",
        "Libra": "diplomatic grace and harmonious balance",
        "Scorpio": "transformative power and psychic intensity",
        "Sagittarius": "philosophical vision and adventurous spirit",
        "Capricorn": "ambitious discipline and strategic mastery",
        "Aquarius": "innovative brilliance and humanitarian vision",
        "Pisces": "mystical empathy and boundless imagination"
    };
    return traits[zodiac] || "unique cosmic gifts";
}

function calculateLifePath(date) {
    const dateStr = date.getFullYear().toString() + 
                   (date.getMonth() + 1).toString().padStart(2, '0') + 
                   date.getDate().toString().padStart(2, '0');
    let sum = dateStr.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    
    while (sum > 9 && sum != 11 && sum != 22 && sum != 33) {
        sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return sum;
}

function calculateExpression(name) {
    const values = {
        'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'G':7,'H':8,'I':9,
        'J':1,'K':2,'L':3,'M':4,'N':5,'O':6,'P':7,'Q':8,'R':9,
        'S':1,'T':2,'U':3,'V':4,'W':5,'X':6,'Y':7,'Z':8
    };
    
    let sum = name.toUpperCase().replace(/[^A-Z]/g, '').split('').reduce((acc, char) => acc + values[char], 0);
    
    while (sum > 9 && sum != 11 && sum != 22 && sum != 33) {
        sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return sum;
}

function getChineseZodiac(year) {
    const animals = ["Monkey", "Rooster", "Dog", "Pig", "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Sheep"];
    return animals[year % 12];
}

function getCurrentMoonPhase() {
    const phases = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", 
                   "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
    const now = new Date();
    const start = new Date(2000, 0, 6, 18, 14);
    const diff = now - start;
    const lunation = 29.53058867 * 24 * 60 * 60 * 1000;
    const phase = ((diff % lunation) / lunation);
    return phases[Math.floor(phase * 8)];
}

function getAngelNumberMeanings(number) {
    const meanings = {
        111: {
            spiritual: "Divine alignment and new beginnings are manifesting",
            practical: "Your thoughts are rapidly becoming reality - focus on what you want",
            action: "Take the first step toward your dreams today"
        },
        222: {
            spiritual: "Trust in divine timing and universal orchestration",
            practical: "Partnerships and balance are key to your success right now",
            action: "Nurture relationships and practice patience"
        },
        333: {
            spiritual: "Ascended masters and creative forces surround you",
            practical: "Express yourself authentically and share your gifts with the world",
            action: "Create something today that reflects your soul's truth"
        },
        444: {
            spiritual: "Angels are protecting and supporting you",
            practical: "Build solid foundations through consistent effort",
            action: "Establish routines and structures that support your goals"
        },
        555: {
            spiritual: "Major life changes are divinely orchestrated",
            practical: "Embrace transformation and release what no longer serves you",
            action: "Make one bold change that you've been contemplating"
        },
        666: {
            spiritual: "Rebalance material and spiritual priorities",
            practical: "Release worry about material concerns; abundance is your birthright",
            action: "Practice gratitude for what you have while taking aligned action"
        },
        777: {
            spiritual: "Spiritual awakening and mystical abilities are activating",
            practical: "Trust your intuition completely - it's divinely guided",
            action: "Meditate, journal, or practice divination today"
        },
        888: {
            spiritual: "Infinite abundance is flowing into your reality",
            practical: "Financial blessings and karmic rewards are manifesting",
            action: "Receive with open arms and share your prosperity"
        },
        999: {
            spiritual: "A major life chapter is completing",
            practical: "Release the old to make space for miraculous new beginnings",
            action: "Complete something today and honor what's ending"
        },
        1111: {
            spiritual: "You're a master manifestor accessing quantum reality",
            practical: "Your thoughts instantly create - stay in high vibration",
            action: "Visualize your ideal reality with complete clarity and feeling"
        },
        1212: {
            spiritual: "Rapid spiritual ascension and timeline shifts",
            practical: "You're leveling up in consciousness and life circumstances",
            action: "Step into your highest version today"
        }
    };
    
    return meanings[number] || {
        spiritual: "The universe is sending you personalized guidance",
        practical: "Pay attention to patterns and synchronicities",
        action: "Trust that this number holds significance for your unique path"
    };
}

// -----------------------------------------------------------------------
// LOAD EXTERNAL INTERPRETATION ENGINE
// -----------------------------------------------------------------------

// Since the full interpretation functions are extensive, they're in a separate file
// Import them here (or include via script tag in HTML)

// For standalone operation, here are simplified versions:

function generateAstrologyReading(birthDate, profile, angelNumber) {
    const zodiac = getZodiacSign(birthDate);
    const element = getElement(zodiac);
    const meanings = getAngelNumberMeanings(angelNumber);
    
    return `As a ${zodiac} (${element} element), your Angel Number ${angelNumber} speaks directly to your celestial blueprint. ${meanings.spiritual} manifests through your astrological signature uniquely. Your ${zodiac} nature�${getZodiacTrait(zodiac)}�is perfectly positioned to receive this angelic guidance. The ${element} element flowing through your being acts as a sacred conductor for the ${angelNumber} frequency, allowing it to permeate every level of your existence. This celestial synchronicity is a cosmic appointment written in the stars since your birth.`;
}

function generateNumerologyReading(birthDate, fullName, angelNumber) {
    const lifePath = calculateLifePath(birthDate);
    const expression = calculateExpression(fullName);
    const meanings = getAngelNumberMeanings(angelNumber);
    
    return `Your Life Path ${lifePath} and Expression number ${expression} create sacred mathematical resonance with Angel Number ${angelNumber}. ${meanings.practical} The digit sum of your birthdate (${lifePath}) acts as a frequency multiplier, amplifying the ${angelNumber} message for your soul's journey. Your name vibration (${expression}) creates harmonic overtones that make this angel number particularly potent. Together�birth (${lifePath}), name (${expression}), and angel number (${angelNumber})�three sacred frequencies work in perfect synchronization guiding you toward your highest destiny.`;
}

function generatePlanetaryReading(birthDate, angelNumber) {
    const meanings = getAngelNumberMeanings(angelNumber);
    const planetaryMap = {
        111: { planet: "Mars", energy: "initiating new ventures with warrior courage" },
        222: { planet: "Venus", energy: "harmonizing relationships and partnerships" },
        333: { planet: "Jupiter", energy: "expanding creative expression and wisdom" },
        444: { planet: "Saturn", energy: "building lasting structures with discipline" },
        555: { planet: "Mercury", energy: "accelerating change through communication" },
        777: { planet: "Neptune", energy: "deepening spiritual connection and psychic abilities" },
        888: { planet: "Pluto", energy: "transforming wealth consciousness" },
        1111: { planet: "Uranus", energy: "awakening to quantum manifestation" }
    };
    
    const guidance = planetaryMap[angelNumber] || { planet: "the Cosmos", energy: "aligning all forces for your benefit" };
    
    return `Current planetary transits amplify Angel Number ${angelNumber} through ${guidance.planet}'s energy. This celestial body is ${guidance.energy}, creating a powerful cosmic window. ${meanings.action} Planetary alignments create a rare opportunity that won't return for years. The universe is orchestrating divine appointments to support your soul's evolution at this exact moment. Pay attention to synchronicities over the next 30 days as planetary movements continue activating the ${angelNumber} frequency.`;
}

function generateLunarReading(angelNumber) {
    const moonPhase = getCurrentMoonPhase();
    const meanings = getAngelNumberMeanings(angelNumber);
    
    const lunarGuidance = {
        "New Moon": "perfect for planting seeds of intention and new beginnings",
        "Waxing Crescent": "nurture your manifestations with faith and focused energy",
        "First Quarter": "take decisive action on your goals",
        "Waxing Gibbons": "refine and perfect your manifestation",
        "Full Moon": "celebrate completions and witness your power",
        "Waning Gibbous": "share wisdom gained from your journey",
        "Last Quarter": "release old patterns blocking your growth",
        "Waning Crescent": "rest, reflect, and prepare for renewal"
    };
    
    const guidance = lunarGuidance[moonPhase] || "work with cosmic rhythms";
    
    return `The Moon is in ${moonPhase} phase, creating specific resonance with Angel Number ${angelNumber}. This phase is ${guidance}. ${meanings.spiritual} The lunar cycle acts as a divine timer, and this particular moon phase perfectly aligns with your angel number's message. The Moon governs emotions, intuition, and the subconscious�all crucial for integrating angelic guidance. Work with lunar energy by honoring this natural rhythm. The next full moon will mark a completion point for intentions set now.`;
}

function generateGematriaReading(fullName, angelNumber) {
    const nameValue = calculateExpression(fullName);
    const meanings = getAngelNumberMeanings(angelNumber);
    
    return `In the sacred science of Gematria, your name "${fullName}" vibrates at the frequency of ${nameValue}. When this personal vibration encounters Angel Number ${angelNumber}, a unique harmonic signature emerges. ${meanings.spiritual} Your name isn't random�it's a vibrational code that your soul chose before birth. The numerical value of each letter creates a symphony of frequencies that shape your reality. As ${angelNumber} appears in your life, it's specifically calibrating to your name's vibrational signature, creating personalized guidance that no one else receives in quite the same way. This is divine communication customized to your exact frequency.`;
}

function generateFrequencyReading(birthDate, angelNumber) {
    const lifePath = calculateLifePath(birthDate);
    const baseFrequency = 432 + (lifePath * 11);
    const meanings = getAngelNumberMeanings(angelNumber);
    
    const solfeggioMap = {
        111: { freq: 396, benefit: "liberation from fear and guilt, grounding new reality" },
        222: { freq: 417, benefit: "facilitating change and clearing negativity" },
        333: { freq: 528, benefit: "transformation, DNA repair, and miracles" },
        444: { freq: 639, benefit: "connection, relationships, and harmony" },
        555: { freq: 741, benefit: "awakening intuition and consciousness expansion" },
        777: { freq: 852, benefit: "spiritual order and third eye activation" },
        888: { freq: 963, benefit: "divine consciousness and pineal gland activation" },
        1111: { freq: 1111, benefit: "unity consciousness and quantum field access" }
    };
    
    const mapping = solfeggioMap[angelNumber] || { freq: 528, benefit: "transformation and healing" };
    
    return `Your personal frequency resonates at ${baseFrequency}Hz based on your birthdate. Angel Number ${angelNumber} vibrates at the Solfeggio frequency of ${mapping.freq}Hz�known for ${mapping.benefit}. When your personal frequency encounters this angelic tone, entrainment occurs: your energy field naturally synchronizes with the higher vibration. ${meanings.practical} Consider listening to ${mapping.freq}Hz music or tones while meditating on your angel number for amplified results. This frequency literally restructures your cellular vibration, making manifestation of the angel number's guidance more effortless. Sound is creation itself�use it wisely.`;
}

function generateChineseZodiacReading(birthDate, angelNumber) {
    const animal = getChineseZodiac(birthDate.getFullYear());
    const meanings = getAngelNumberMeanings(angelNumber);
    
    const animalWisdom = {
        "Rat": "resourceful intelligence and adaptability",
        "Ox": "steadfast determination and hard work",
        "Tiger": "courageous action and leadership",
        "Rabbit": "gentle wisdom and diplomatic grace",
        "Dragon": "powerful charisma and good fortune",
        "Snake": "intuitive wisdom and transformation",
        "Horse": "free spirit and passionate pursuit",
        "Sheep": "creative compassion and harmony",
        "Monkey": "clever innovation and playfulness",
        "Rooster": "confident expression and precision",
        "Dog": "loyal devotion and protective instincts",
        "Pig": "generous abundance and sincere heart"
    };
    
    const wisdom = animalWisdom[animal] || "unique cosmic strengths";
    
    return `Born in the Year of the ${animal}, you carry the energetic signature of ${wisdom}. Angel Number ${angelNumber} speaks to your ${animal} nature in a specific dialect. ${meanings.spiritual} The ${animal}'s characteristics in your energetic makeup create a unique lens through which to interpret angelic messages. Eastern and Western mystical traditions converge in your reading, offering multidimensional guidance. Your ${animal} energy naturally excels at certain tasks�lean into these strengths as you implement your angel number's message. This is ancestral wisdom meeting celestial guidance.`;
}

function generateRealityCodesReading(birthDate, angelNumber) {
    const birthCode = birthDate.getDate().toString() + (birthDate.getMonth() + 1).toString() + angelNumber.toString();
    const meanings = getAngelNumberMeanings(angelNumber);
    
    return `Your personal Reality Code combines your birth date (${birthDate.getDate()}/${birthDate.getMonth() + 1}) with Angel Number ${angelNumber}, creating the unique frequency: ${birthCode}. ${meanings.practical} Reality Codes are the underlying mathematics of existence�quantum patterns that shape what manifests in your physical experience. This code acts as a password to specific timelines and possibilities. When you consciously work with ${birthCode}, you're literally programming reality at the quantum level. The universe operates on codes, frequencies, and patterns. Your angel number isn't just a message�it's an access code to higher dimensional experiences and accelerated manifestation.`;
}

function generateTarotReading(birthDate, angelNumber) {
    const lifePath = calculateLifePath(birthDate);
    const birthCard = getTarotBirthCard(lifePath);
    const meanings = getAngelNumberMeanings(angelNumber);
    
    const angelTarotMap = {
        111: "The Magician - master of manifestation and conscious creation",
        222: "The High Priestess - intuitive wisdom and divine feminine balance",
        333: "The Empress - creative abundance and nurturing expression",
        444: "The Emperor - structured leadership and protective authority",
        555: "The Hierophant - spiritual teaching and sacred transformation",
        777: "The Chariot - willpower directing spiritual forces",
        888: "Strength - infinite inner power and compassionate control",
        1111: "The Wheel of Fortune - destiny shifts and karmic completion"
    };
    
    const angelCard = angelTarotMap[angelNumber] || "The Fool - new beginnings and trust in the journey";
    
    return `Your birth card in Tarot is ${birthCard}, representing your soul's primary archetype. Angel Number ${angelNumber} resonates with ${angelCard}. ${meanings.spiritual} When your birth card energy combines with your angel number's Tarot correspondence, a powerful archetypal alliance forms. These aren't mere symbols�they're living energies that have guided humanity for millennia. Meditate on both cards together for profound insights. The imagery and symbolism speak to your subconscious in the language it understands best. Your angel number is showing you which archetypal energy to embody right now for maximum spiritual growth and material success.`;
}

function getTarotBirthCard(lifePath) {
    const cards = {
        1: "The Magician & The Wheel of Fortune",
        2: "The High Priestess & Justice",
        3: "The Empress & The Hanged Man",
        4: "The Emperor & Death",
        5: "The Hierophant & Temperance",
        6: "The Lovers & The Devil",
        7: "The Chariot & The Tower",
        8: "Strength & The Star",
        9: "The Hermit & The Moon",
        11: "Justice & The High Priestess",
        22: "The Fool",
        33: "The Empress & The Hanged Man (Master Number)"
    };
    return cards[lifePath] || "The Fool";
}

// -----------------------------------------------------------------------
// INITIALIZATION
// -----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    loadPreviousReading();
    loadSavedProfiles();
    
    // Form validation
    const form = document.getElementById('birthForm');
    if (form) {
        form.addEventListener('input', checkFormValidity);
    }
    
    console.log('Angel Number Full Reading Engine initialized');
});
