// Merge New Tracks into Existing Frequency Database
const fs = require('fs');

// Read existing database
const existingDb = require('./genesis/js/frequency-database.js');
const newTracks = JSON.parse(fs.readFileSync('new_frequency_tracks_fixed.json', 'utf8'));

console.log(`Existing database has: ${existingDb.tracks.length} tracks`);
console.log(`New tracks to add: ${newTracks.length} tracks`);
console.log(`Total will be: ${existingDb.tracks.length + newTracks.length} tracks`);

// Add trinity category to categories
const updatedCategories = {
    ...existingDb.categories,
    trinity: {
        name: "Trinity Frequencies",
        color: "#ff6b35",
        icon: "🔺",
        description: "Sacred Trinity combinations with 37Hz + 73Hz + Third Frequency"
    }
};

// Merge the tracks
const mergedTracks = [
    ...existingDb.tracks,
    ...newTracks
];

// Sort tracks by ID
mergedTracks.sort((a, b) => a.id - b.id);

// Create updated database
const updatedDatabase = {
    ...existingDb,
    categories: updatedCategories,
    tracks: mergedTracks
};

// Generate the new database file content
const dbContent = `/**
 * Quantum Frequency Database - ENHANCED
 * Complete catalog of ${mergedTracks.length} frequency combinations
 * Includes original tracks + 492 new combinations from deepseek database
 * Updated: ${new Date().toISOString()}
 */

const FrequencyDatabase = {
    categories: ${JSON.stringify(updatedCategories, null, 8)},
    
    tracks: ${JSON.stringify(mergedTracks, null, 8)},
    
    // Helper functions
    getTrackById: function(id) {
        return this.tracks.find(track => track.id === id);
    },
    
    getTracksByCategory: function(category) {
        return this.tracks.filter(track => track.category === category);
    },
    
    searchTracks: function(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.tracks.filter(track => 
            track.name.toLowerCase().includes(lowercaseQuery) ||
            track.description.toLowerCase().includes(lowercaseQuery) ||
            track.frequencies.some(freq => freq.toLowerCase().includes(lowercaseQuery))
        );
    },
    
    getTrackCount: function() {
        return this.tracks.length;
    },
    
    getCategories: function() {
        return Object.keys(this.categories);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FrequencyDatabase;
}`;

// Write the updated database
fs.writeFileSync('genesis/js/frequency-database-enhanced.js', dbContent);

console.log(`\n✅ SUCCESS! Updated database created:`);
console.log(`📊 Total tracks: ${mergedTracks.length}`);
console.log(`🆕 New tracks added: ${newTracks.length}`);
console.log(`📝 Categories: ${Object.keys(updatedCategories).length}`);

// Category breakdown after merge
const categoryBreakdown = {};
mergedTracks.forEach(track => {
    categoryBreakdown[track.category] = (categoryBreakdown[track.category] || 0) + 1;
});

console.log(`\n📈 FINAL CATEGORY BREAKDOWN:`);
Object.entries(categoryBreakdown)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
        const categoryName = updatedCategories[category]?.name || category;
        console.log(`${categoryName}: ${count} tracks`);
    });

// Update the original database file as backup
fs.writeFileSync('genesis/js/frequency-database-backup.js', fs.readFileSync('genesis/js/frequency-database.js', 'utf8'));

// Replace original with enhanced version
fs.copyFileSync('genesis/js/frequency-database-enhanced.js', 'genesis/js/frequency-database.js');

console.log(`\n💾 Database files updated:`);
console.log(`   • Original backed up to: frequency-database-backup.js`);
console.log(`   • Enhanced version: frequency-database.js`);
console.log(`   • Total tracks now: ${mergedTracks.length} 🎯`);