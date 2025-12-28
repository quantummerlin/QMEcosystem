// Process Expansion File for Additional Frequencies
const fs = require('fs');

// Read expansion combinations
const expansionCombos = fs.readFileSync('expansion_combinations.txt', 'utf8')
    .split('\n')
    .filter(line => line.trim() && line.includes('Hz'))
    .map(line => line.trim());

console.log(`Found ${expansionCombos.length} expansion combinations to process`);

// Read existing merged database to avoid duplicates
const existingDb = require('./genesis/js/frequency-database-merged.js');
const existingFrequencies = new Set();

// Collect existing frequency combinations
existingDb.tracks.forEach(track => {
    if (track.frequencies && Array.isArray(track.frequencies)) {
        const freqCombo = track.frequencies.sort().map(f => f + 'Hz').join(' + ');
        existingFrequencies.add(freqCombo);
    }
});

console.log(`Existing combinations: ${existingFrequencies.size}`);

// Clean and standardize frequency combinations
function cleanFrequencyCombo(combo) {
    let cleaned = combo
        .replace(/\([^)]*\)/g, '') // Remove text in parentheses
        .replace(/[^0-9+.Hz,\s]/g, '') // Keep only numbers, +, ., Hz, comma, spaces
        .replace(/\s+/g, ' ') // Standardize spaces
        .replace(/,+/g, ' + ') // Convert commas to + format
        .trim();
    
    // Ensure proper formatting
    cleaned = cleaned.replace(/Hz\s*\+/g, 'Hz + ');
    cleaned = cleaned.replace(/\+\s*Hz/g, '+ Hz');
    
    // Split by + and clean each frequency
    const freqs = cleaned.split('+').map(f => f.trim()).filter(f => f.includes('Hz'));
    
    return freqs.join(' + ');
}

// Extract frequencies properly
function extractFrequencies(combo) {
    const matches = combo.match(/\d+\.?\d*Hz/g);
    if (!matches) return [];
    
    return matches.sort((a, b) => {
        const aVal = parseFloat(a.replace('Hz', ''));
        const bVal = parseFloat(b.replace('Hz', ''));
        return aVal - bVal;
    });
}

// Categorize frequency combinations
function categorizeFrequency(frequencies) {
    if (!frequencies || frequencies.length < 2) return 'other';
    
    const comboStr = frequencies.join(' + ');
    
    // Check for Trinity patterns (37Hz + 73Hz + X)
    if (comboStr.includes('37Hz') && comboStr.includes('73Hz') && frequencies.length === 3) {
        return 'trinity';
    }
    
    // Check for Healing patterns
    const healingFreqs = ['528Hz', '174Hz', '396Hz', '417Hz', '285Hz', '33.8Hz'];
    if (frequencies.some(f => healingFreqs.includes(f))) {
        return 'healing';
    }
    
    // Check for Spiritual patterns
    const spiritualFreqs = ['963Hz', '852Hz', '741Hz', '111Hz', '939Hz', '777Hz'];
    if (frequencies.some(f => spiritualFreqs.includes(f))) {
        return 'spiritual';
    }
    
    // Check for Brainwave patterns
    const brainwaveFreqs = ['40Hz', '10Hz', '16Hz', '7.83Hz', '9Hz', '8Hz', '13.5Hz', '14.1Hz'];
    if (frequencies.some(f => brainwaveFreqs.includes(f))) {
        return 'focus';
    }
    
    // Check for Relationship patterns
    const relationshipFreqs = ['639Hz', '222Hz'];
    if (frequencies.some(f => relationshipFreqs.includes(f))) {
        return 'relationships';
    }
    
    // Check for Abundance patterns
    const abundanceFreqs = ['194Hz', '888Hz', '777Hz', '2000Hz', '20000Hz'];
    if (frequencies.some(f => abundanceFreqs.includes(f))) {
        return 'abundance';
    }
    
    // Check for Sleep patterns
    const sleepFreqs = ['2.5Hz', '3Hz', '4Hz', '4.5Hz', '1.5Hz', '0.5Hz', '0.1Hz'];
    if (frequencies.some(f => sleepFreqs.includes(f))) {
        return 'sleep';
    }
    
    // Check for Emotional patterns
    const emotionalFreqs = ['432Hz', '396Hz', '639Hz'];
    if (frequencies.some(f => emotionalFreqs.includes(f))) {
        return 'emotional';
    }
    
    return 'other';
}

// Generate track name from frequencies
function generateTrackName(frequencies, category) {
    if (!frequencies || frequencies.length < 2) return 'Unknown Combination';
    
    const mainFreq = frequencies[frequencies.length - 1];
    
    // Enhanced frequency names
    const freqNames = {
        '528Hz': 'DNA Repair',
        '963Hz': 'Cosmic Connection',
        '852Hz': 'Intuitive Clarity',
        '741Hz': 'Creative Expression',
        '639Hz': 'Heart Connection',
        '417Hz': 'Transformation',
        '396Hz': 'Fear Release',
        '174Hz': 'Anxiety Relief',
        '432Hz': 'Harmonic Balance',
        '194Hz': 'Manifestation',
        '888Hz': 'Abundance',
        '777Hz': 'Luck Alignment',
        '111Hz': 'Angelic Gateway',
        '40Hz': 'Gamma Focus',
        '10Hz': 'Alpha Relaxation',
        '16Hz': 'Beta Clarity',
        '7.83Hz': 'Earth Grounding',
        '9Hz': 'Theta Meditation',
        '8Hz': 'Creative Flow',
        '27.5Hz': 'Cosmic Rhythm',
        '136.1Hz': 'Earth Energy',
        '285Hz': 'Field Repair',
        '33.8Hz': 'Master Healing',
        '999Hz': 'Universal Completion',
        '2000Hz': 'Higher Octave',
        '20000Hz': 'Ultra-High Frequency',
        '13.5Hz': 'Mental Projection',
        '14.1Hz': 'Enhanced Focus',
        '0.1Hz': 'Deep Stasis',
        '0.5Hz': 'Hibernation State',
        '128Hz': 'Pythagorean Perfection',
        '144Hz': 'Light Body',
        '55Hz': 'Cellular Command',
        '11.76Hz': 'Tesla Scalar'
    };
    
    const primaryName = freqNames[mainFreq] || `Frequency ${mainFreq}`;
    
    // Special naming for Trinity combinations
    if (frequencies.includes('37Hz') && frequencies.includes('73Hz') && frequencies.length === 3) {
        const thirdFreq = frequencies.find(f => f !== '37Hz' && f !== '73Hz');
        const thirdName = freqNames[thirdFreq] || `Frequency ${thirdFreq}`;
        return `Trinity: ${thirdName}`;
    }
    
    // Category-based naming
    const categoryNames = {
        'healing': 'Healing Protocol',
        'spiritual': 'Spiritual Activation',
        'focus': 'Focus Enhancement',
        'relationships': 'Relationship Harmony',
        'abundance': 'Abundance Magnet',
        'sleep': 'Sleep Enhancement',
        'emotional': 'Emotional Balance',
        'trinity': 'Trinity Resonance',
        'other': 'Advanced Frequency'
    };
    
    const categoryName = categoryNames[category] || 'Frequency Combination';
    
    if (frequencies.length === 2) {
        return `${primaryName} ${categoryName}`;
    } else if (frequencies.length === 3) {
        return `Triple ${categoryName}: ${primaryName}`;
    } else {
        return `Multi-${categoryName}: ${primaryName}`;
    }
}

// Process expansion combinations
const processedCombos = new Set();
const expansionTracks = [];
let trackId = 2000; // Start new track IDs

expansionCombos.forEach((combo, index) => {
    const cleanedCombo = cleanFrequencyCombo(combo);
    if (!cleanedCombo || cleanedCombo.length < 5) return;
    
    const frequencies = extractFrequencies(cleanedCombo);
    if (frequencies.length < 2) return;
    
    // Check for duplicates
    const uniqueKey = frequencies.sort().join(' + ');
    if (existingFrequencies.has(uniqueKey) || processedCombos.has(uniqueKey)) return;
    processedCombos.add(uniqueKey);
    
    const category = categorizeFrequency(frequencies);
    const trackName = generateTrackName(frequencies, category);
    
    expansionTracks.push({
        id: trackId++,
        name: trackName,
        frequencies: frequencies,
        category: category,
        description: `Advanced frequency combination: ${frequencies.join(' + ')}`,
        duration: 600,
        benefits: ['Enhanced synergy', 'Advanced healing', 'Multi-dimensional support'],
        source: 'Deepseek Frequency Expansion',
        intensity: 'high'
    });
});

console.log(`Generated ${expansionTracks.length} unique expansion tracks`);

// Save expansion tracks
fs.writeFileSync('expansion_frequency_tracks.json', JSON.stringify(expansionTracks, null, 2));
console.log(`\nSaved ${expansionTracks.length} expansion tracks to expansion_frequency_tracks.json`);

// Category breakdown
const categoryCount = {};
expansionTracks.forEach(track => {
    categoryCount[track.category] = (categoryCount[track.category] || 0) + 1;
});

console.log('\n=== EXPANSION CATEGORY BREAKDOWN ===');
Object.entries(categoryCount).forEach(([category, count]) => {
    console.log(`${category}: ${count} tracks`);
});