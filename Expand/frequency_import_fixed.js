// Frequency Database Import Script - FIXED VERSION
// Extract and categorize all frequency combinations from raw data

const fs = require('fs');

// Read extracted combinations
const combinations = fs.readFileSync('frequency_combinations.txt', 'utf8')
    .split('\n')
    .filter(line => line.trim() && line.includes('Hz'))
    .map(line => line.trim());

console.log(`Found ${combinations.length} frequency combinations to process`);

// Clean and standardize frequency combinations
function cleanFrequencyCombo(combo) {
    // Remove extra text and standardize format
    let cleaned = combo
        .replace(/\([^)]*\)/g, '') // Remove text in parentheses
        .replace(/[^0-9+.Hz\s]/g, '') // Keep only numbers, +, ., Hz, spaces
        .replace(/\s+/g, ' ') // Standardize spaces
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
    // Find all frequency patterns
    const matches = combo.match(/\d+\.?\d*Hz/g);
    if (!matches) return [];
    
    return matches.sort((a, b) => {
        // Sort by frequency value (ascending)
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
    
    // Check for Healing patterns (528Hz, 174Hz, 396Hz, 417Hz)
    const healingFreqs = ['528Hz', '174Hz', '396Hz', '417Hz', '285Hz'];
    if (frequencies.some(f => healingFreqs.includes(f))) {
        return 'healing';
    }
    
    // Check for Spiritual patterns (963Hz, 852Hz, 741Hz, 111Hz)
    const spiritualFreqs = ['963Hz', '852Hz', '741Hz', '111Hz', '939Hz'];
    if (frequencies.some(f => spiritualFreqs.includes(f))) {
        return 'spiritual';
    }
    
    // Check for Brainwave patterns (40Hz, 10Hz, 16Hz, 7.83Hz, 9Hz)
    const brainwaveFreqs = ['40Hz', '10Hz', '16Hz', '7.83Hz', '9Hz', '8Hz'];
    if (frequencies.some(f => brainwaveFreqs.includes(f))) {
        return 'focus';
    }
    
    // Check for Relationship patterns (639Hz, 222Hz)
    const relationshipFreqs = ['639Hz', '222Hz'];
    if (frequencies.some(f => relationshipFreqs.includes(f))) {
        return 'relationships';
    }
    
    // Check for Abundance patterns (194Hz, 888Hz, 777Hz)
    const abundanceFreqs = ['194Hz', '888Hz', '777Hz'];
    if (frequencies.some(f => abundanceFreqs.includes(f))) {
        return 'abundance';
    }
    
    // Check for Sleep patterns (2.5Hz, 3Hz, 4Hz, 4.5Hz)
    const sleepFreqs = ['2.5Hz', '3Hz', '4Hz', '4.5Hz', '1.5Hz'];
    if (frequencies.some(f => sleepFreqs.includes(f))) {
        return 'sleep';
    }
    
    // Check for Emotional patterns (432Hz, 396Hz, 639Hz)
    const emotionalFreqs = ['432Hz', '396Hz'];
    if (frequencies.some(f => emotionalFreqs.includes(f))) {
        return 'emotional';
    }
    
    return 'other';
}

// Generate track name from frequencies
function generateTrackName(frequencies, category) {
    if (!frequencies || frequencies.length < 2) return 'Unknown Combination';
    
    const mainFreq = frequencies[frequencies.length - 1]; // Use highest frequency as primary
    
    // Known frequency names
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
        '285Hz': 'Field Repair'
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
        'other': 'Frequency Synergy'
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

// Remove duplicates and process all combinations
const processedCombos = new Set();
const newTracks = [];
let trackId = 1000; // Start after existing tracks

combinations.forEach((combo, index) => {
    const cleanedCombo = cleanFrequencyCombo(combo);
    if (!cleanedCombo || cleanedCombo.length < 5) return;
    
    const frequencies = extractFrequencies(cleanedCombo);
    if (frequencies.length < 2) return;
    
    // Create unique key for deduplication
    const uniqueKey = frequencies.sort().join(' + ');
    if (processedCombos.has(uniqueKey)) return;
    processedCombos.add(uniqueKey);
    
    const category = categorizeFrequency(frequencies);
    const trackName = generateTrackName(frequencies, category);
    
    newTracks.push({
        id: trackId++,
        name: trackName,
        frequencies: frequencies,
        category: category,
        description: `Powerful frequency combination: ${frequencies.join(' + ')}`,
        duration: 600,
        benefits: ['Multiple frequency synergy', 'Enhanced effectiveness', 'Comprehensive support'],
        source: 'Deepseek Frequency Database',
        intensity: 'medium'
    });
});

console.log(`Generated ${newTracks.length} unique new tracks`);

// Output the new tracks
console.log('\n=== NEW TRACKS SAMPLE ===');
newTracks.slice(0, 15).forEach(track => {
    console.log(`${track.id}: ${track.name} (${track.frequencies.join(' + ')}) - ${track.category}`);
});

// Save new tracks to file
fs.writeFileSync('new_frequency_tracks_fixed.json', JSON.stringify(newTracks, null, 2));
console.log(`\nSaved ${newTracks.length} new tracks to new_frequency_tracks_fixed.json`);

// Category breakdown
const categoryCount = {};
newTracks.forEach(track => {
    categoryCount[track.category] = (categoryCount[track.category] || 0) + 1;
});

console.log('\n=== CATEGORY BREAKDOWN ===');
Object.entries(categoryCount).forEach(([category, count]) => {
    console.log(`${category}: ${count} tracks`);
});