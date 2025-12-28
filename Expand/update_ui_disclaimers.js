// Update Genesis UI with Quantum Merlin branding and disclaimers
const fs = require('fs');

console.log('🎨 UPDATING UI: Quantum Merlin Branding + Disclaimers\n');

// Read the current HTML file
let html = fs.readFileSync('./genesis/index-enhanced.html', 'utf8');

console.log('Step 1: Updating meta tags and removing health claims...');

// Update title and meta descriptions
html = html.replace(
    /<title>.*?<\/title>/,
    '<title>Quantum Merlin - Frequency Audio Experience | 674 Tracks</title>'
);

html = html.replace(
    /<meta name="description" content=".*?">/,
    '<meta name="description" content="Explore 674 frequency-based audio tracks for relaxation, meditation, and sound exploration. For entertainment purposes only.">'
);

html = html.replace(
    /<meta name="keywords" content=".*?">/,
    '<meta name="keywords" content="frequency audio, sound meditation, relaxation music, binaural beats, meditation sounds, quantum merlin">'
);

html = html.replace(
    /<meta property="og:title" content=".*?">/,
    '<meta property="og:title" content="Quantum Merlin - Frequency Audio Experience">'
);

html = html.replace(
    /<meta property="og:description" content=".*?">/,
    '<meta property="og:description" content="Explore 674 frequency-based audio tracks for relaxation and meditation. For entertainment purposes only.">'
);

console.log('✅ Meta tags updated');

console.log('\nStep 2: Updating main heading and subtitle...');

// Update main heading
html = html.replace(
    /<h1 class="tool-title">.*?<\/h1>/,
    '<h1 class="tool-title">🎵 Quantum Merlin</h1>'
);

// Update subtitle - remove "healing" language
html = html.replace(
    /<p class="tool-subtitle">.*?<\/p>/,
    '<p class="tool-subtitle">Frequency Audio Experience - 674 Tracks for Relaxation & Meditation</p>'
);

console.log('✅ Headings updated');

console.log('\nStep 3: Adding disclaimer banner...');

// Add disclaimer banner after the header
const disclaimerBanner = `
        <!-- DISCLAIMER BANNER -->
        <div style="background: rgba(255, 193, 7, 0.15); border: 2px solid #ffc107; border-radius: 15px; padding: 20px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; font-size: 1.1em; color: #ffc107;">
                ⚠️ <strong>DISCLAIMER:</strong> For entertainment and relaxation purposes only. 
                Not medical advice or treatment. 
                <a href="disclaimer.html" style="color: #ffc107; text-decoration: underline;">Read Full Disclaimer</a>
            </p>
        </div>
`;

// Insert disclaimer after the subtitle
html = html.replace(
    /(<p class="tool-subtitle">.*?<\/p>)/,
    '$1' + disclaimerBanner
);

console.log('✅ Disclaimer banner added');

console.log('\nStep 4: Updating category button...');

// Update "Healing" category button to "Relaxation"
html = html.replace(
    /<button class="category-tab" data-category="healing">.*?<\/button>/,
    '<button class="category-tab" data-category="relaxation">🌿 Relaxation</button>'
);

console.log('✅ Category button updated');

console.log('\nStep 5: Adding footer with legal links...');

// Add footer before closing body tag
const footer = `
    <!-- FOOTER WITH LEGAL LINKS -->
    <footer style="background: rgba(0, 0, 0, 0.3); padding: 40px 20px; margin-top: 60px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
        <div style="max-width: 1200px; margin: 0 auto;">
            <div style="margin-bottom: 20px;">
                <h3 style="color: #667eea; margin-bottom: 15px;">Quantum Merlin</h3>
                <p style="color: rgba(255, 255, 255, 0.7); max-width: 600px; margin: 0 auto;">
                    Frequency-based audio experience for entertainment, relaxation, and meditation purposes only.
                </p>
            </div>
            
            <div style="margin: 30px 0; padding: 20px; background: rgba(255, 193, 7, 0.1); border-radius: 10px; border: 1px solid rgba(255, 193, 7, 0.3);">
                <p style="color: #ffc107; margin: 0; font-size: 0.95em;">
                    <strong>⚠️ Important:</strong> Quantum Merlin provides audio content for entertainment and relaxation only. 
                    Not intended as medical treatment or therapy. Not intended to diagnose, treat, cure, or prevent any disease. 
                    Always consult healthcare professionals for medical advice.
                </p>
            </div>
            
            <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; margin: 20px 0;">
                <a href="disclaimer.html" style="color: #667eea; text-decoration: none; transition: color 0.3s;">Disclaimer</a>
                <a href="terms.html" style="color: #667eea; text-decoration: none; transition: color 0.3s;">Terms of Service</a>
                <a href="privacy.html" style="color: #667eea; text-decoration: none; transition: color 0.3s;">Privacy Policy</a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <p style="color: rgba(255, 255, 255, 0.5); font-size: 0.9em; margin: 0;">
                    © 2025 Quantum Merlin. All rights reserved. | Powered by Genesis Engine
                </p>
            </div>
        </div>
    </footer>
`;

html = html.replace('</body>', footer + '\n</body>');

console.log('✅ Footer added with legal links');

console.log('\nStep 6: Saving updated file...');

// Save the updated HTML
fs.writeFileSync('./genesis/index-enhanced.html', html);

console.log('✅ File saved: genesis/index-enhanced.html');

console.log('\n🎉 UI UPDATE COMPLETE!');
console.log('\nChanges made:');
console.log('  ✅ Updated title to "Quantum Merlin"');
console.log('  ✅ Removed all "healing" language from meta tags');
console.log('  ✅ Added prominent disclaimer banner');
console.log('  ✅ Updated category button (Healing → Relaxation)');
console.log('  ✅ Added footer with legal page links');
console.log('  ✅ Added entertainment-only disclaimers');
console.log('\nNext: Test the application to ensure everything works correctly!');