// Simple SVG to PNG converter for PWA icons
// This creates placeholder icons with the zodiac theme

const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outputDir = path.join(__dirname, '../public/icons');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate SVG content
function generateSVG(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#9333ea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#grad1)" rx="100" ry="100"/>
  <text x="256" y="320" font-size="280" text-anchor="middle" fill="white">🐉</text>
</svg>`;
}

// Write SVG files
sizes.forEach(size => {
  const svg = generateSVG(size);
  const filename = path.join(outputDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`✅ Created: icon-${size}x${size}.svg`);
});

// Create favicon variants
['16', '32'].forEach(size => {
  const svg = generateSVG(parseInt(size));
  const filename = path.join(outputDir, `favicon-${size}x${size}.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`✅ Created: favicon-${size}x${size}.svg`);
});

// Create apple touch icon
const appleSVG = generateSVG(180);
fs.writeFileSync(path.join(outputDir, 'apple-touch-icon.svg'), appleSVG);
console.log('✅ Created: apple-touch-icon.svg');

// Create OG image
const ogSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#9333ea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#grad1)"/>
  <text x="600" y="400" font-size="300" text-anchor="middle" fill="white">🐉</text>
  <text x="600" y="520" font-size="48" text-anchor="middle" fill="white" font-weight="bold">Chinese Zodiac Fortune Guide</text>
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/og-image.svg'), ogSVG);
console.log('✅ Created: og-image.svg');

console.log('\n✨ All placeholder icons created successfully!');
console.log('📝 Note: These are SVG files. For better PWA support, convert them to PNG using:');
console.log('   - Online converters like https://cloudconvert.com/svg-to-png');
console.log('   - ImageMagick: ./scripts/generate-icons.sh source.png');