// Final Merge: Add Expansion Tracks to Reach 1000+ Total
const fs = require('fs');

// Read current merged database
const currentDb = require('./genesis/js/frequency-database-merged.js');

// Read expansion tracks
const expansionTracks = JSON.parse(fs.readFileSync('expansion_frequency_tracks.json', 'utf8'));

console.log('=== FINAL MERGE TO 1000+ TRACKS ===');
console.log(`Current tracks: ${currentDb.tracks.length}`);
console.log(`Expansion tracks to add: ${expansionTracks.length}`);

// Add expansion tracks to database
let addedCount = 0;
expansionTracks.forEach(newTrack => {
    const trackId = `track_${newTrack.id}`;
    
    // Check for duplicates
    const existingTrack = currentDb.tracks.find(t => 
        t.id === trackId || 
        (t.frequencies && newTrack.frequencies && 
         JSON.stringify(t.frequencies.sort()) === JSON.stringify(newTrack.frequencies.map(f => parseFloat(f.replace('Hz', ''))).sort()))
    );
    
    if (!existingTrack) {
        // Convert expansion track to match database format
        const formattedTrack = {
            id: trackId,
            name: newTrack.name,
            category: newTrack.category,
            playCount: 0,
            duration: newTrack.duration,
            description: newTrack.description,
            frequencies: newTrack.frequencies.map(f => parseFloat(f.replace('Hz', ''))),
            waveforms: new Array(newTrack.frequencies.length).fill('sine'),
            volumes: newTrack.frequencies.map((_, i) => 0.7 - (i * 0.1)),
            tags: [newTrack.category, newTrack.source, 'expansion', 'advanced'],
            featured: false,
            recommended: false
        };
        
        currentDb.tracks.push(formattedTrack);
        addedCount++;
    }
});

console.log(`Successfully added ${addedCount} expansion tracks`);
console.log(`Final total tracks: ${currentDb.tracks.length}`);

// Update category counts
const categoryStats = {};
currentDb.tracks.forEach(track => {
    categoryStats[track.category] = (categoryStats[track.category] || 0) + 1;
});

console.log('\n=== FINAL CATEGORY BREAKDOWN ===');
Object.entries(categoryStats).forEach(([category, count]) => {
    const categoryName = currentDb.categories[category]?.name || category;
    console.log(`${categoryName}: ${count} tracks`);
});

// Generate comprehensive database file
const finalContent = `/**
 * Quantum Frequency Database - COMPLETE VERSION
 * Complete catalog of ${currentDb.tracks.length}+ frequency combinations
 * Includes Trinity Frequencies, Expansion Protocols, and Advanced Combinations
 * Generated: ${new Date().toISOString()}
 * 
 * Categories: ${Object.keys(currentDb.categories).length}
 * Total Tracks: ${currentDb.tracks.length}
 * Sources: Original Database + Deepseek Frequencies + Expansion Protocols
 */

const FrequencyDatabase = ${JSON.stringify(currentDb, null, 2)};

// Export for use in applications
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FrequencyDatabase;
}

// Database Statistics
if (typeof window !== 'undefined') {
    window.FrequencyDatabaseStats = {
        totalTracks: ${currentDb.tracks.length},
        categories: ${Object.keys(currentDb.categories).length},
        lastUpdated: '${new Date().toISOString()}',
        sources: ['Original Database', 'Deepseek Frequencies', 'Expansion Protocols'],
        featuredTracks: ${currentDb.tracks.filter(t => t.featured).length},
        trinityTracks: ${categoryStats.trinity || 0}
    };
}
`;

// Save final database
fs.writeFileSync('./genesis/js/frequency-database-final.js', finalContent);
console.log('\n✅ Final database saved as frequency-database-final.js');

// Create backup
fs.copyFileSync('./genesis/js/frequency-database.js', './genesis/js/frequency-database-pre-final-backup.js');
console.log('✅ Pre-final database backed up');

// Update main database
fs.copyFileSync('./genesis/js/frequency-database-final.js', './genesis/js/frequency-database.js');
console.log('✅ Main database updated to final version');

// Create summary report
const summaryReport = `
# Frequency Database - Complete Import Summary

## 📊 **Final Statistics**
- **Total Tracks**: ${currentDb.tracks.length}
- **Categories**: ${Object.keys(currentDb.categories).length}
- **Original Tracks**: 103
- **Deepseek Import**: 492
- **Expansion Import**: ${addedCount}
- **Duplicate Prevention**: ${expansionTracks.length - addedCount}

## 🎯 **Category Distribution**
${Object.entries(categoryStats).map(([category, count]) => {
    const categoryName = currentDb.categories[category]?.name || category;
    return `- **${categoryName}**: ${count} tracks`;
}).join('\n')}

## ✨ **Special Features Added**
- **Trinity Frequencies**: ${categoryStats.trinity || 0} tracks
- **Advanced Healing Protocols**: ${categoryStats.healing || 0} tracks  
- **Spiritual Combinations**: ${categoryStats.spiritual || 0} tracks
- **Focus Enhancements**: ${categoryStats.focus || 0} tracks

## 🚀 **Database Files**
- **Main Database**: \`genesis/js/frequency-database.js\`
- **Final Version**: \`genesis/js/frequency-database-final.js\`
- **Backup**: \`genesis/js/frequency-database-pre-final-backup.js\`

## 📅 **Import Completed**
${new Date().toLocaleString()}

## 🎉 **Mission Accomplished**
Successfully expanded from 103 tracks to ${currentDb.tracks.length} tracks - a ${Math.round((currentDb.tracks.length - 103) / 103 * 100)}% increase!
`;

fs.writeFileSync('DATABASE_IMPORT_SUMMARY.md', summaryReport);
console.log('✅ Summary report saved to DATABASE_IMPORT_SUMMARY.md');