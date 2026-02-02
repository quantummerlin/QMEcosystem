// ============================================
// QUICK REBRAND SCRIPT
// ============================================
// Run this in Node.js to switch brands:
// node rebrand.js baby
// node rebrand.js kpop
// node rebrand.js stranger
// ============================================

const fs = require('fs');
const path = require('path');

const brands = {
    baby: 'config-baby.js',
    kpop: 'config-kpop.js',
    stranger: 'config-stranger.js'
};

const selectedBrand = process.argv[2];

if (!selectedBrand || !brands[selectedBrand]) {
    console.log('');
    console.log('🎨 ULTIMATE READING SYSTEM - REBRAND TOOL');
    console.log('=========================================');
    console.log('');
    console.log('Usage: node rebrand.js [brand]');
    console.log('');
    console.log('Available brands:');
    console.log('  baby     - Cosmic Baby Blueprint (newborn readings)');
    console.log('  kpop     - K-pop Kosmic (idol destiny readings)');
    console.log('  stranger - Stranger Patterns (Stranger Things theme)');
    console.log('');
    console.log('Example: node rebrand.js baby');
    console.log('');
    process.exit(1);
}

const sourceFile = path.join(__dirname, brands[selectedBrand]);
const targetFile = path.join(__dirname, 'config.js');

try {
    const content = fs.readFileSync(sourceFile, 'utf8');
    fs.writeFileSync(targetFile, content);
    
    console.log('');
    console.log('✅ REBRAND SUCCESSFUL!');
    console.log('======================');
    console.log(`Brand: ${selectedBrand.toUpperCase()}`);
    console.log(`Config: ${brands[selectedBrand]} → config.js`);
    console.log('');
    console.log('Open index.html in your browser to see the changes.');
    console.log('');
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}