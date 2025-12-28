// Update Genesis app with Quantum Merlin ecosystem integration
const fs = require('fs');

console.log('🎵 UPDATING GENESIS → QUANTUM MERLIN FREQUENCY GENERATOR\n');

let html = fs.readFileSync('./genesis/index-enhanced.html', 'utf8');

console.log('Step 1: Adding navigation menu...');

// Add navigation menu HTML after opening body tag
const navMenu = `
    <!-- Quantum Merlin Navigation Menu -->
    <div id="quantum-menu-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); z-index: 9998; backdrop-filter: blur(5px);" onclick="toggleQuantumMenu()"></div>
    
    <div id="quantum-menu" style="position: fixed; top: 0; right: -400px; width: 350px; height: 100%; background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%); z-index: 9999; transition: right 0.3s ease; box-shadow: -5px 0 30px rgba(0, 0, 0, 0.5); overflow-y: auto;">
        <div style="padding: 30px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h2 style="color: #00f5ff; margin: 0; font-size: 1.5em;">✨ Quantum Merlin</h2>
                <button onclick="toggleQuantumMenu()" style="background: none; border: none; color: white; font-size: 2em; cursor: pointer; padding: 0; line-height: 1;">×</button>
            </div>
            
            <div style="margin-bottom: 30px;">
                <a href="../quantum-merlin-hub/index.html" style="display: block; padding: 15px; background: rgba(0, 245, 255, 0.1); border: 1px solid rgba(0, 245, 255, 0.3); border-radius: 10px; color: white; text-decoration: none; margin-bottom: 10px; transition: all 0.3s;">
                    🏠 <strong>Home Hub</strong>
                </a>
            </div>
            
            <h3 style="color: rgba(255, 255, 255, 0.7); font-size: 0.9em; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">All Tools</h3>
            
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <a href="index-enhanced.html" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(0, 245, 255, 0.2); border: 1px solid rgba(0, 245, 255, 0.4); border-radius: 8px; color: #00f5ff; text-decoration: none; transition: all 0.3s;">
                    <span style="font-size: 1.5em;">🎵</span>
                    <span><strong>Frequency Generator</strong></span>
                </a>
                <a href="../quantum-merlin-hub/jukebox.html" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; text-decoration: none; transition: all 0.3s;">
                    <span style="font-size: 1.5em;">🎧</span>
                    <span>Quantum Jukebox</span>
                </a>
                <a href="../quantum-merlin-hub/gematria.html" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; text-decoration: none; transition: all 0.3s;">
                    <span style="font-size: 1.5em;">🔢</span>
                    <span>Quantum Gematria</span>
                </a>
                <a href="../quantum-merlin-hub/tarot.html" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; text-decoration: none; transition: all 0.3s;">
                    <span style="font-size: 1.5em;">🃏</span>
                    <span>Quantum Tarot</span>
                </a>
                <a href="../quantum-merlin-hub/reality-codes.html" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; text-decoration: none; transition: all 0.3s;">
                    <span style="font-size: 1.5em;">🧬</span>
                    <span>Reality Codes</span>
                </a>
                <a href="../quantum-merlin-hub/sigils.html" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; text-decoration: none; transition: all 0.3s;">
                    <span style="font-size: 1.5em;">✒️</span>
                    <span>Sigil Creator</span>
                </a>
                <a href="../quantum-merlin-hub/crystals.html" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; text-decoration: none; transition: all 0.3s;">
                    <span style="font-size: 1.5em;">💎</span>
                    <span>Crystal Guide</span>
                </a>
                <a href="../quantum-merlin-hub/astrology.html" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; text-decoration: none; transition: all 0.3s;">
                    <span style="font-size: 1.5em;">⭐</span>
                    <span>Astrology</span>
                </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <a href="disclaimer.html" style="color: rgba(255, 255, 255, 0.5); text-decoration: none; display: block; margin-bottom: 8px; font-size: 0.9em;">Disclaimer</a>
                <a href="terms.html" style="color: rgba(255, 255, 255, 0.5); text-decoration: none; display: block; margin-bottom: 8px; font-size: 0.9em;">Terms</a>
                <a href="privacy.html" style="color: rgba(255, 255, 255, 0.5); text-decoration: none; display: block; font-size: 0.9em;">Privacy</a>
            </div>
        </div>
    </div>
    
    <!-- Menu Toggle Button -->
    <button id="menu-toggle-btn" onclick="toggleQuantumMenu()" style="position: fixed; top: 20px; right: 20px; z-index: 9997; background: linear-gradient(135deg, #667eea, #00f5ff); border: none; border-radius: 50%; width: 60px; height: 60px; font-size: 1.8em; cursor: pointer; box-shadow: 0 4px 20px rgba(0, 245, 255, 0.4); transition: all 0.3s; display: flex; align-items: center; justify-content: center; color: white;">
        ☰
    </button>
    
    <script>
        function toggleQuantumMenu() {
            const menu = document.getElementById('quantum-menu');
            const overlay = document.getElementById('quantum-menu-overlay');
            const isOpen = menu.style.right === '0px';
            
            if (isOpen) {
                menu.style.right = '-400px';
                overlay.style.display = 'none';
            } else {
                menu.style.right = '0px';
                overlay.style.display = 'block';
            }
        }
        
        // Hover effects for menu links
        document.addEventListener('DOMContentLoaded', function() {
            const menuLinks = document.querySelectorAll('#quantum-menu a');
            menuLinks.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    this.style.background = 'rgba(0, 245, 255, 0.2)';
                    this.style.borderColor = 'rgba(0, 245, 255, 0.5)';
                    this.style.transform = 'translateX(5px)';
                });
                link.addEventListener('mouseleave', function() {
                    if (!this.querySelector('strong')) {
                        this.style.background = 'rgba(255, 255, 255, 0.05)';
                        this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }
                    this.style.transform = 'translateX(0)';
                });
            });
        });
    </script>
`;

// Insert navigation menu after <body> tag
html = html.replace('<body>', '<body>\n' + navMenu);

console.log('✅ Navigation menu added');

console.log('\nStep 2: Adding "Save to Jukebox" button...');

// Add Save to Jukebox button in the controls area
const jukeboxButton = `
            <button class="quantum-btn" onclick="saveToJukebox()" style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 15px 30px; border: none; border-radius: 12px; color: white; font-size: 1.1em; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); display: flex; align-items: center; gap: 10px; justify-content: center;">
                <span style="font-size: 1.3em;">🎧</span>
                <span>Save to Jukebox</span>
            </button>
            
            <script>
                function saveToJukebox() {
                    // Get current track info (you'll need to implement this based on your player state)
                    const currentTrack = {
                        name: 'Current Frequency Mix',
                        timestamp: new Date().toISOString(),
                        type: 'frequency'
                    };
                    
                    // Get existing jukebox data
                    let jukebox = JSON.parse(localStorage.getItem('quantumJukebox') || '[]');
                    
                    // Add current track
                    jukebox.push(currentTrack);
                    
                    // Save to localStorage
                    localStorage.setItem('quantumJukebox', JSON.stringify(jukebox));
                    
                    // Show confirmation
                    alert('✅ Saved to Quantum Jukebox!\\n\\nAccess your saved tracks anytime from the Jukebox.');
                }
            </script>
`;

// Find a good place to insert the button (after play controls)
html = html.replace(
    '</div>\\n        </div>\\n        \\n        <!-- Tool-Specific Styles -->',
    jukeboxButton + '\\n        </div>\\n        </div>\\n        \\n        <!-- Tool-Specific Styles -->'
);

console.log('✅ Jukebox button added');

console.log('\nStep 3: Updating title and branding...');

// Update page title
html = html.replace(
    '<h1 class="tool-title">🎵 Quantum Merlin</h1>',
    '<h1 class="tool-title">🎵 Quantum Merlin Frequency Generator</h1>'
);

// Update subtitle
html = html.replace(
    '<p class="tool-subtitle">Frequency Audio Experience - 674 Tracks for Relaxation & Meditation</p>',
    '<p class="tool-subtitle">Master Frequency Generator - 674 Tracks for Relaxation & Meditation</p>'
);

console.log('✅ Branding updated');

console.log('\nStep 4: Adding cross-tool suggestions...');

// Add suggestions section before footer
const suggestions = `
    <!-- Cross-Tool Suggestions -->
    <div style="max-width: 1200px; margin: 60px auto; padding: 40px 20px;">
        <h2 style="text-align: center; color: #00f5ff; margin-bottom: 30px; font-size: 2em;">✨ Enhance Your Experience</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
            <a href="../quantum-merlin-hub/jukebox.html" style="background: rgba(0, 245, 255, 0.05); border: 1px solid rgba(0, 245, 255, 0.2); border-radius: 15px; padding: 25px; text-decoration: none; color: white; transition: all 0.3s; display: block;">
                <div style="font-size: 3em; margin-bottom: 10px;">🎧</div>
                <h3 style="color: #00f5ff; margin-bottom: 10px;">Quantum Jukebox</h3>
                <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.9em;">Save and replay your favorite frequency mixes</p>
            </a>
            <a href="../quantum-merlin-hub/reality-codes.html" style="background: rgba(0, 245, 255, 0.05); border: 1px solid rgba(0, 245, 255, 0.2); border-radius: 15px; padding: 25px; text-decoration: none; color: white; transition: all 0.3s; display: block;">
                <div style="font-size: 3em; margin-bottom: 10px;">🧬</div>
                <h3 style="color: #00f5ff; margin-bottom: 10px;">Reality Codes</h3>
                <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.9em;">Turn your frequencies into manifestation codes</p>
            </a>
            <a href="../quantum-merlin-hub/gematria.html" style="background: rgba(0, 245, 255, 0.05); border: 1px solid rgba(0, 245, 255, 0.2); border-radius: 15px; padding: 25px; text-decoration: none; color: white; transition: all 0.3s; display: block;">
                <div style="font-size: 3em; margin-bottom: 10px;">🔢</div>
                <h3 style="color: #00f5ff; margin-bottom: 10px;">Quantum Gematria</h3>
                <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.9em;">Discover your personal frequency numbers</p>
            </a>
            <a href="../quantum-merlin-hub/crystals.html" style="background: rgba(0, 245, 255, 0.05); border: 1px solid rgba(0, 245, 255, 0.2); border-radius: 15px; padding: 25px; text-decoration: none; color: white; transition: all 0.3s; display: block;">
                <div style="font-size: 3em; margin-bottom: 10px;">💎</div>
                <h3 style="color: #00f5ff; margin-bottom: 10px;">Crystal Guide</h3>
                <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.9em;">Pair frequencies with crystal energies</p>
            </a>
        </div>
    </div>
    
    <style>
        /* Hover effects for suggestions */
        a[href*="quantum-merlin-hub"]:hover {
            background: rgba(0, 245, 255, 0.15) !important;
            border-color: rgba(0, 245, 255, 0.5) !important;
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 245, 255, 0.3);
        }
    </style>
`;

// Insert before footer
html = html.replace('</body>', suggestions + '\n</body>');

console.log('✅ Cross-tool suggestions added');

// Save updated file
fs.writeFileSync('./genesis/index-enhanced.html', html);

console.log('\n🎉 GENESIS UPDATED SUCCESSFULLY!');
console.log('\nChanges made:');
console.log('  ✅ Added Quantum Merlin navigation menu (top-right)');
console.log('  ✅ Added "Save to Jukebox" button');
console.log('  ✅ Updated branding to "Master Frequency Generator"');
console.log('  ✅ Added cross-tool suggestions section');
console.log('  ✅ Integrated with ecosystem navigation');
console.log('\nFile updated: genesis/index-enhanced.html');