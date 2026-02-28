// Test ephemeris accuracy with May 3, 1981 13:30 Abu Dhabi
const fs = require('fs');
eval(fs.readFileSync('calculations.js', 'utf8'));

const testData = {
    name: 'Test Baby',
    birthDate: '1981-05-03',
    birthTime: '13:30',
    birthPlace: 'Abu Dhabi'
};

console.log('Testing ephemeris calculations...\n');

try {
    const results = calculateAllReadings(testData);
    
    console.log('=== EPHEMERIS ACCURACY VERIFICATION ===');
    console.log('Birth: May 3, 1981 at 13:30');
    console.log('Location: Abu Dhabi, UAE (UTC+4)');
    console.log('Coordinates: 24.45°N, 54.38°E\n');
    
    console.log('PRIMARY PLACEMENTS:');
    console.log('Sun:', results.astrology.sunSign.name, results.astrology.sunSign.symbol);
    console.log('Moon:', results.astrology.moonSign.name, results.astrology.moonSign.symbol);
    console.log('Rising:', results.astrology.risingSign.name, results.astrology.risingSign.symbol);
    
    console.log('\nPLANETARY POSITIONS:');
    console.log('Mercury:', results.astrology.mercurySign.name);
    console.log('Venus:', results.astrology.venusSign.name);
    console.log('Mars:', results.astrology.marsSign.name);
    console.log('Jupiter:', results.astrology.jupiterSign.name);
    console.log('Saturn:', results.astrology.saturnSign.name);
    
    console.log('\nCALCULATED POINTS:');
    console.log('Part of Fortune:', results.astrology.partOfFortune ? results.astrology.partOfFortune.name : 'N/A');
    console.log('Houses:', results.astrology.houses ? 'Calculated (' + results.astrology.houses.length + ')' : 'N/A');
    console.log('Aspects:', results.astrology.aspects ? results.astrology.aspects.length + ' found' : 'N/A');
    
    console.log('\n=== ACCURACY CHECK ===');
    console.log('Moon in Taurus:', results.astrology.moonSign.name === 'Taurus' ? '✅ CORRECT' : '❌ INCORRECT');
    console.log('Sun in Taurus:', results.astrology.sunSign.name === 'Taurus' ? '✅ CORRECT' : '❌ INCORRECT');
    
} catch (error) {
    console.error('Error during calculation:', error.message);
    console.error(error.stack);
}
