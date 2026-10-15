// ============================================================
// LOVE BLUEPRINT — QR generator (local build tool only)
// ------------------------------------------------------------
// The bio card tells users to "scan to decode yours", so it needs
// a REAL qr image. Because the URL is static, we bake one PNG at
// build time instead of shipping a QR library to every visitor.
//
// Error correction level H: survives screenshots, crops and the
// re-compression social platforms apply.
//
// Requires: npm install qrcode --no-save   (not saved to
// package.json — build tool only, never deployed)
//
// Run: node assets/make-qr.cjs
// ============================================================

const path = require('path');
const QRCode = require('qrcode');

const TARGET_URL = 'https://quantummerlin.com/loveblueprint/';
const OUT = path.join(__dirname, 'qr.png');

QRCode.toFile(OUT, TARGET_URL, {
  errorCorrectionLevel: 'H',
  type: 'png',
  width: 512,
  margin: 2,
  // Love Blueprint palette: plum bg, gold modules
  color: {
    dark: '#1E0E22',
    light: '#E8B96A'
  }
}, (err) => {
  if (err) {
    console.error('  FAIL qr.png -> ' + err.message);
    process.exit(1);
  }
  console.log('  OK  qr.png  (512x512, ecl H)  ' + TARGET_URL);
});
