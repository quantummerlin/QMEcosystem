// Merge New Frequency Tracks into Existing Database
const fs = require('fs');

// Read existing database
const existingDb = require('./genesis/js/frequency-database.js');

// Read new tracks
const newTracks = JSON.parse(fs.readFileSync('new_frequency_tracks_fixed.json', 'utf8'));

console.log('=== MERGING FREQUENCY DATABASES ===');
console.log(`Existing tracks: ${Object.keys(existingDb.tracks).length}`);
console.log(`New tracks: ${newTracks.length}`);

// Add trinity category to existing categories if not present
if (!existingDb.categories.trinity) {
    existingDb.categories.trinity = {
        name: "Trinity Frequencies",
        color: "#ff6b35",
        icon: "✨",
        description: "Powerful 37Hz + 73Hz + Third Frequency combinations for deep transformation"
    };
    console.log('Added Trinity category');
}

// Merge tracks - convert to array format and merge
let mergedCount = 0;

// Convert existing tracks from object to array if needed
let existingTracks = [];
if (Array.isArray(existingDb.tracks)) {
    existingTracks = existingDb.tracks;
} else {
    // Convert from object format to array format
    Object.values(existingDb.tracks).forEach(track => {
        existingTracks.push(track);
    });
}

// Add new tracks
newTracks.forEach(newTrack => {
    const trackId = `track_${newTrack.id}`;
    const existingTrack = existingTracks.find(t => t.id === trackId);
    
    if (!existingTrack) {
        // Convert new track to match existing format
        const formattedTrack = {
            id: trackId,
            name: newTrack.name,
            category: newTrack.category,
            playCount: 0,
            duration: newTrack.duration,
            description: newTrack.description,
            frequencies: newTrack.frequencies.map(f => parseFloat(f.replace('Hz', ''))),
            waveforms: new Array(newTrack.frequencies.length).fill('sine'),
            volumes: newTrack.frequencies.map((_, i) => 0.7 - (i * 0.1)), // Decreasing volume
            tags: [newTrack.category, newTrack.source, 'imported'],
            featured: false,
            recommended: false
        };
        
        existingTracks.push(formattedTrack);
        mergedCount++;
    }
});

// Update database with array format
existingDb.tracks = existingTracks;

console.log(`Successfully merged ${mergedCount} new tracks`);
console.log(`Total tracks after merge: ${Object.keys(existingDb.tracks).length}`);

// Update category counts
const categoryStats = {};
Object.values(existingDb.tracks).forEach(track => {
    categoryStats[track.category] = (categoryStats[track.category] || 0) + 1;
});

console.log('\n=== UPDATED CATEGORY BREAKDOWN ===');
Object.entries(categoryStats).forEach(([category, count]) => {
    const categoryName = existingDb.categories[category]?.name || category;
    console.log(`${categoryName}: ${count} tracks`);
});

// Save merged database
const mergedContent = `/**
 * Quantum Frequency Database - EXPANDED VERSION
 * Complete catalog of ${Object.keys(existingDb.tracks).length}+ frequency combinations
 * Merged with Deepseek Frequency Database
 * Generated: ${new Date().toISOString()}
 */

const FrequencyDatabase = ${JSON.stringify(existingDb, null, 2)};

// Export for use in applications
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FrequencyDatabase;
}
`;

fs.writeFileSync('./genesis/js/frequency-database-merged.js', mergedContent);
console.log('\n✅ Merged database saved as frequency-database-merged.js');

// Create backup of original
fs.copyFileSync('./genesis/js/frequency-database.js', './genesis/js/frequency-database-backup.js');
console.log('✅ Original database backed up');

// Replace original with merged
fs.copyFileSync('./genesis/js/frequency-database-merged.js', './genesis/js/frequency-database.js');
console.log('✅ Original database updated with merged version');