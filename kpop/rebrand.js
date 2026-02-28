// ============================================
// 💜 K-POP KOSMIC - REBRAND SCRIPT
// ============================================
// Run this in Node.js to switch brands:
// node rebrand.js kpop (default)
// ============================================

const fs = require('fs');
const path = require('path');

const brands = {
    kpop: 'config.js'
};

const selectedBrand = process.argv[2] || 'kpop';

if (!brands[selectedBrand]) {
    console.log('');
    console.log('💜 K-POP KOSMIC - REBRAND TOOL');
    console.log('===============================');
    console.log('');
    console.log('Usage: node rebrand.js [brand]');
    console.log('');
    console.log('Available brands:');
    console.log('  kpop     - K-pop Kosmic (idol destiny readings) [default]');
    console.log('');
    console.log('Example: node rebrand.js kpop');
    console.log('');
    process.exit(1);
}

const sourceFile = path.join(__dirname, brands[selectedBrand]);
const targetFile = path.join(__dirname, 'config.js');

try {
    const content = fs.readFileSync(sourceFile, 'utf8');
    fs.writeFileSync(targetFile, content);
    
    console.log('');
    console.log('✅ REBRAND SUCCESSFUL! 💜');
    console.log('=========================');
    console.log(`Brand: ${selectedBrand.toUpperCase()}`);
    console.log(`Config: ${brands[selectedBrand]} → config.js`);
    console.log('');
    console.log('Open reading.html in your browser to see the changes. 화이팅! ✨');
    console.log('');
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
