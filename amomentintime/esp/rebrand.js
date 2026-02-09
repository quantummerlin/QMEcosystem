// ============================================
// SCRIPT DE CAMBIO DE MARCA RÁPIDO
// ============================================
// Ejecuta esto en Node.js para cambiar de marca:
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
    console.log('🎨 SISTEMA DE LECTURA DEFINITIVO - HERRAMIENTA DE CAMBIO DE MARCA');
    console.log('==================================================================');
    console.log('');
    console.log('Uso: node rebrand.js [marca]');
    console.log('');
    console.log('Marcas disponibles:');
    console.log('  baby     - Plano Cósmico del Bebé (lecturas de recién nacidos)');
    console.log('  kpop     - K-pop Kósmico (lecturas del destino de ídolos)');
    console.log('  stranger - Patrones Extraños (tema de Stranger Things)');
    console.log('');
    console.log('Ejemplo: node rebrand.js baby');
    console.log('');
    process.exit(1);
}

const sourceFile = path.join(__dirname, brands[selectedBrand]);
const targetFile = path.join(__dirname, 'config.js');

try {
    const content = fs.readFileSync(sourceFile, 'utf8');
    fs.writeFileSync(targetFile, content);
    
    console.log('');
    console.log('✅ ¡CAMBIO DE MARCA EXITOSO!');
    console.log('============================');
    console.log(`Marca: ${selectedBrand.toUpperCase()}`);
    console.log(`Configuración: ${brands[selectedBrand]} → config.js`);
    console.log('');
    console.log('Abre index.html en tu navegador para ver los cambios.');
    console.log('');
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
