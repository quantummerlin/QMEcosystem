#!/usr/bin/env node

/**
 * Headless Reading Generator for Etsy Fulfillment
 * 
 * Uses Puppeteer + local HTTP server to generate a reading via the existing
 * generator page, then extracts the content into a standalone HTML file.
 * 
 * Usage:
 *   node fulfill.js --name="Jane Doe" --date=1990-06-15 [--time=14:30] [--place="London, UK"]
 * 
 * Output: Creates soulblueprint/r/{slug}/index.html and prints the URL
 */

const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ---- Config ----
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SOULBLUEPRINT_DIR = path.resolve(__dirname, '..');
const READINGS_DIR = path.join(SOULBLUEPRINT_DIR, 'r');
const BASE_URL = 'https://quantummerlin.com/soulblueprint';

// ---- Static file server ----
function startServer() {
    return new Promise((resolve) => {
        const mimeTypes = {
            '.html': 'text/html; charset=utf-8',
            '.js': 'application/javascript; charset=utf-8',
            '.css': 'text/css', '.json': 'application/json',
            '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
            '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
            '.webp': 'image/webp', '.woff2': 'font/woff2',
        };
        // Serve from repo root so /soulblueprint/... paths resolve
        const server = http.createServer((req, res) => {
            const urlPath = new URL(req.url, 'http://localhost').pathname;
            let filePath = path.join(REPO_ROOT, decodeURIComponent(urlPath));
            if (filePath.endsWith(path.sep) || filePath.endsWith('/')) {
                filePath = path.join(filePath, 'index.html');
            }
            const ext = path.extname(filePath);
            try {
                const content = fs.readFileSync(filePath);
                res.writeHead(200, {
                    'Content-Type': mimeTypes[ext] || 'application/octet-stream',
                    'Cache-Control': 'no-store',
                });
                res.end(content);
            } catch {
                res.writeHead(404);
                res.end('Not found');
            }
        });
        server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
    });
}

// ---- Find Chrome or Edge ----
function findBrowser() {
    const candidates = [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        (process.env.LOCALAPPDATA || '') + '\\Google\\Chrome\\Application\\chrome.exe',
    ];
    for (const p of candidates) {
        if (fs.existsSync(p)) return p;
    }
    return null;
}

// ---- Parse CLI args ----
function parseArgs() {
    const args = {};
    for (const a of process.argv.slice(2)) {
        const m = a.match(/^--(\w+)=(.+)$/);
        if (m) args[m[1]] = m[2];
    }
    return args;
}

function randomSlug(len = 4) {
    const c = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let s = '';
    for (let i = 0; i < len; i++) s += c[Math.floor(Math.random() * c.length)];
    return s;
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ============================================
// MAIN
// ============================================
async function main() {
    const args = parseArgs();
    if (!args.name || !args.date) {
        console.error('Usage: node fulfill.js --name="Jane Doe" --date=1990-06-15 [--time=14:30] [--place="London, UK"]');
        process.exit(1);
    }

    const browserPath = findBrowser();
    if (!browserPath) { console.error('ERROR: No Chrome/Edge found.'); process.exit(1); }

    // Start local server (serves from repo root so /soulblueprint/... works)
    const { server, port } = await startServer();

    // Build URL — pro page with URL params for auto-generation
    // Note: NOT using fulfill=true because that adds fulfill-mode class which hides progress bar etc
    const params = new URLSearchParams({ name: args.name, date: args.date });
    if (args.time) params.set('time', args.time);
    if (args.place) params.set('place', args.place);
    const pageUrl = `http://127.0.0.1:${port}/soulblueprint/s/xK9mQ2/index.html?${params}`;

    console.log(`Browser: ${path.basename(browserPath)}`);
    console.log(`URL: ${pageUrl}`);

    const browser = await puppeteer.launch({
        executablePath: browserPath,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 900 });

        // Log errors only
        page.on('pageerror', err => console.log(`[PAGE ERROR] ${err.message.substring(0, 200)}`));

        // Navigate and wait for all scripts
        await page.goto(pageUrl, { waitUntil: 'networkidle0', timeout: 45000 });
        console.log('Page loaded. Waiting for reading...');

        // The DOMContentLoaded handler detects name/date URL params and auto-generates
        await page.waitForFunction(() => {
            const c = document.getElementById('readingsContainer');
            return c && c.children.length > 5 && c.innerHTML.length > 5000;
        }, { timeout: 90000, polling: 2000 });

        // Extra time for all sections to finish rendering
        await new Promise(r => setTimeout(r, 5000));

        const cardCount = await page.evaluate(() =>
            document.querySelectorAll('.reading-card').length
        );
        console.log(`Generated: ${cardCount} cards`);

        // ---- Capture full page, clone it, clean for delivery ----
        const fullHtml = await page.evaluate((baseUrl) => {
            // 1. Remove elements we don't want in the delivered reading
            const removeSelectors = [
                '#loadingOverlay',           // loading spinner
                '#inputSection',             // the input form
                '#myReadingsSection',        // saved readings dashboard
                '.cookie-banner', '.cookie-consent',
                '.gift-box', '.coffee-box',
                '.gift-dialog-overlay', '#gift-share-dialog',
                '.fulfill-upgrade-card',
                '.ad-container', '.ad-placeholder', 'ins.adsbygoogle',
                '.transform-btn', '.copy-reading-btn', // per-card transform/copy (keep card-actions container & mark-read)
                '.new-reading-prompt',
                '.ai-transform-banner', '.ai-transform-callout', '.ai-banner-dismiss',
                '.reading-nav-float',        // floating nav
                '.quick-transform-section', '.expand-all-section',
                '.completion-celebration',
                '.gift-support-section',
                '.playbook-navigation', '.example-banner',
                '.book-template-section', '.discover-links',
                '.pagination-controls',
                '[onclick*="giftReading"]',
            ];
            removeSelectors.forEach(s => {
                document.querySelectorAll(s).forEach(el => el.remove());
            });

            // 2. Remove all external <script> tags (they reference local server paths)
            document.querySelectorAll('script[src]').forEach(el => el.remove());

            // 3. Remove inline <script> blocks (we'll add our own clean one)
            document.querySelectorAll('script:not([src])').forEach(el => el.remove());

            // 4. Remove service worker <link> and manifest
            document.querySelectorAll('link[rel="manifest"]').forEach(el => el.remove());

            // 5. Make all relative links absolute
            document.querySelectorAll('a[href^="/"]').forEach(a => {
                a.href = 'https://quantummerlin.com' + a.getAttribute('href');
            });

            // 6. Remove fulfill-mode class (it hides progress bar etc)
            document.body.classList.remove('fulfill-mode');

            // 7. Make results section visible
            const results = document.getElementById('resultsSection');
            if (results) results.style.display = '';

            // 8. Update action buttons - replace "New Moment" with "New Reading" that shows upgrade
            document.querySelectorAll('.action-btn').forEach(btn => {
                const text = btn.textContent.trim();
                if (text.includes('Create Your Book') || text.includes('Share')) {
                    btn.remove();
                }
                if (text.includes('New Moment') || text.includes('New Reading')) {
                    btn.setAttribute('onclick', 'showForm()');
                    btn.textContent = '✨ New Reading';
                }
            });

            // 9. Update nav - change Generator link to New Reading button
            const navLinks = document.querySelector('.site-nav-links');
            if (navLinks) {
                // Remove "Generator" active link, add New Reading button
                navLinks.querySelectorAll('a').forEach(a => {
                    if (a.textContent.trim() === 'Generator') {
                        a.remove();
                    }
                    a.classList.remove('active');
                });
                const newBtn = document.createElement('a');
                newBtn.className = 'new-reading-nav-btn';
                newBtn.href = 'javascript:void(0)';
                newBtn.setAttribute('onclick', 'showForm()');
                newBtn.textContent = '✨ New Reading';
                navLinks.appendChild(newBtn);
            }

            // 10. Update meta robots
            let metaRobots = document.querySelector('meta[name="robots"]');
            if (!metaRobots) {
                metaRobots = document.createElement('meta');
                metaRobots.name = 'robots';
                document.head.appendChild(metaRobots);
            }
            metaRobots.content = 'noindex, nofollow';

            // 11. Get the full page HTML
            return document.documentElement.outerHTML;
        }, BASE_URL);

        console.log(`Captured: ${Math.round(fullHtml.length / 1024)}KB full page`);

        // ---- Post-process: inject our own script + modals, fix </script> issues ----
        const nameSlug = args.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
        const slug = `${nameSlug}-${randomSlug()}`;
        const html = buildFinalHtml(fullHtml, args.name);

        const outDir = path.join(READINGS_DIR, slug);
        fs.mkdirSync(outDir, { recursive: true });
        const outFile = path.join(outDir, 'index.html');
        fs.writeFileSync(outFile, html, 'utf-8');

        const deployUrl = `${BASE_URL}/r/${slug}/`;
        console.log(`\n${'='.repeat(60)}`);
        console.log(`  READING READY`);
        console.log(`  Name:  ${args.name}`);
        console.log(`  Cards: ${cardCount}`);
        console.log(`  File:  soulblueprint/r/${slug}/index.html`);
        console.log(`  URL:   ${deployUrl}`);
        console.log(`${'='.repeat(60)}`);
        console.log(`\nTo deploy:\n  cd ${REPO_ROOT}`);
        console.log(`  git add soulblueprint/r/${slug}`);
        console.log(`  git commit -m "Reading: ${args.name}"`);
        console.log(`  git push origin main`);

    } finally {
        await browser.close();
        server.close();
    }
}

// ============================================
// BUILD FINAL HTML — inject modals + JS into captured page
// ============================================
function buildFinalHtml(capturedHtml, personName) {
    // Additional CSS for the form/upgrade modals and nav button
    const extraCss = `
/* New Reading button in nav */
.new-reading-nav-btn{padding:6px 14px!important;border-radius:20px!important;background:var(--primary)!important;color:white!important;font-weight:600!important;cursor:pointer;border:none;transition:transform .15s,box-shadow .15s}
.new-reading-nav-btn:hover{transform:scale(1.05);box-shadow:0 2px 8px rgba(0,0,0,0.15)}
/* Form overlay */
.form-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:2000;justify-content:center;align-items:center;padding:20px}
.form-overlay.visible{display:flex}
.form-modal{background:var(--card-bg,#fff);border-radius:20px;padding:32px;max-width:420px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative;max-height:90vh;overflow-y:auto}
.form-modal h2{font-family:var(--font-heading);text-align:center;margin:0 0 8px;font-size:1.5rem;color:var(--text)}
.form-modal .form-subtitle{text-align:center;opacity:0.7;font-size:0.9rem;margin:0 0 24px}
.form-modal .form-group{margin-bottom:16px}
.form-modal label{display:block;font-weight:600;font-size:0.9rem;margin-bottom:4px;color:var(--text)}
.form-modal input{width:100%;padding:10px 14px;border:2px solid var(--card-border,#eee);border-radius:10px;font-size:0.95rem;font-family:var(--font-body);background:var(--background);color:var(--text);box-sizing:border-box;transition:border-color .2s}
.form-modal input:focus{outline:none;border-color:var(--primary)}
.form-modal .optional-badge{font-size:0.75rem;opacity:0.5;font-weight:400}
.form-modal .submit-btn{width:100%;padding:14px;border:none;border-radius:12px;background:linear-gradient(135deg,var(--primary),var(--accent,var(--primary)));color:white;font-size:1.05rem;font-weight:700;cursor:pointer;margin-top:8px;transition:transform .15s,box-shadow .15s}
.form-modal .submit-btn:hover{transform:translateY(-1px);box-shadow:0 4px 15px rgba(0,0,0,0.2)}
.form-close{position:absolute;top:12px;right:16px;background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--text);opacity:0.5;line-height:1}
.form-close:hover{opacity:1}
/* Upgrade overlay */
.upgrade-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:3000;justify-content:center;align-items:center;padding:20px}
.upgrade-overlay.visible{display:flex}
.upgrade-modal{background:var(--card-bg,#fff);border-radius:24px;padding:36px 28px;max-width:480px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative;text-align:center}
.upgrade-modal h2{font-family:var(--font-heading);font-size:1.6rem;margin:0 0 8px;color:var(--text)}
.upgrade-modal .upgrade-subtitle{opacity:0.7;font-size:0.95rem;margin:0 0 28px;line-height:1.5}
.upgrade-options{display:flex;flex-direction:column;gap:16px;margin-bottom:20px}
.upgrade-option{border:2px solid var(--card-border,#eee);border-radius:16px;padding:20px;cursor:pointer;transition:all .2s;text-decoration:none;display:block;position:relative;color:var(--text)}
.upgrade-option:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 15px rgba(0,0,0,0.1)}
.upgrade-option.featured{border-color:var(--primary);background:linear-gradient(135deg,rgba(255,105,180,0.05),rgba(255,182,193,0.08))}
.upgrade-badge{position:absolute;top:-10px;right:16px;background:var(--primary);color:white;font-size:0.72rem;font-weight:700;padding:3px 10px;border-radius:10px;text-transform:uppercase}
.upgrade-option h3{font-family:var(--font-heading);margin:0 0 6px;font-size:1.15rem;color:var(--text)}
.upgrade-option .price{font-size:1.4rem;font-weight:700;color:var(--primary);margin:4px 0}
.upgrade-option .price .original{text-decoration:line-through;opacity:0.4;font-size:0.9rem;font-weight:400;margin-right:6px;color:var(--text)}
.upgrade-option .price-note{font-size:0.8rem;opacity:0.6;margin:2px 0 0}
.upgrade-option .features{text-align:left;margin:10px 0 0;padding:0;list-style:none;font-size:0.85rem;line-height:1.8}
.upgrade-option .features li::before{content:"\\2713  ";color:var(--primary);font-weight:700}
.upgrade-close{position:absolute;top:12px;right:16px;background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--text);opacity:0.5;line-height:1}
.upgrade-close:hover{opacity:1}
.upgrade-back{background:none;border:none;color:var(--text);opacity:0.5;font-size:0.85rem;cursor:pointer;margin-top:8px}
.upgrade-back:hover{opacity:0.8;text-decoration:underline}
`;

    // Form + Upgrade modals HTML
    const modalsHtml = `
<div class="form-overlay" id="formOverlay" onclick="if(event.target===this)hideForm()">
  <div class="form-modal">
    <button class="form-close" onclick="hideForm()">&times;</button>
    <h2>Generate a New Reading</h2>
    <p class="form-subtitle">Enter birth details to create a unique cosmic blueprint</p>
    <form id="newReadingForm" onsubmit="return handleFormSubmit(event)">
      <div class="form-group"><label>Name</label><input type="text" id="formName" required placeholder="Enter name"></div>
      <div class="form-group"><label>Date of Birth</label><input type="date" id="formDate" required></div>
      <div class="form-group"><label>Time of Birth <span class="optional-badge">Optional</span></label><input type="time" id="formTime"></div>
      <div class="form-group"><label>Place of Birth <span class="optional-badge">Optional</span></label><input type="text" id="formPlace" placeholder="City, Country"></div>
      <button type="submit" class="submit-btn">Generate Your Reading</button>
    </form>
  </div>
</div>
<div class="upgrade-overlay" id="upgradeOverlay" onclick="if(event.target===this)hideUpgrade()">
  <div class="upgrade-modal">
    <button class="upgrade-close" onclick="hideUpgrade()">&times;</button>
    <h2>&#10024; Unlock Your Reading</h2>
    <p class="upgrade-subtitle">Your cosmic blueprint is ready to be generated!<br>Choose your access level below.</p>
    <div class="upgrade-options">
      <a class="upgrade-option featured" href="https://www.etsy.com/shop/QuantumMerlin" target="_blank">
        <span class="upgrade-badge">50% OFF</span>
        <h3>Single Reading</h3>
        <div class="price"><span class="original">$19.99</span> $9.99</div>
        <p class="price-note">Special introductory price</p>
        <ul class="features">
          <li>135+ personalised reading cards</li>
          <li>17 cosmic sections analysed</li>
          <li>Permanent link to revisit anytime</li>
          <li>Beautiful shareable format</li>
        </ul>
      </a>
      <a class="upgrade-option" href="https://www.etsy.com/shop/QuantumMerlin" target="_blank">
        <h3>Unlimited Readings</h3>
        <div class="price">$77</div>
        <p class="price-note">One-time payment &middot; lifetime access</p>
        <ul class="features">
          <li>Generate unlimited readings forever</li>
          <li>All 135+ cards &amp; 17 sections</li>
          <li>Friends, family, anyone</li>
          <li>Future features included</li>
        </ul>
      </a>
    </div>
    <button class="upgrade-back" onclick="hideUpgrade()">Maybe later</button>
  </div>
</div>`;

    // JavaScript for interactivity
    const scriptContent = `
var readCardIds=[];
try{readCardIds=JSON.parse(localStorage.getItem("sb-read-sections")||"[]")}catch(e){}

// Card expand/collapse
function toggleCard(h){var c=h.closest(".reading-card");if(!c)return;c.classList.toggle("expanded");if(c.classList.contains("expanded"))setTimeout(function(){c.scrollIntoView({behavior:"smooth",block:"nearest"})},100)}
function toggleSubSection(id){var e=document.getElementById("subsection-"+id);if(e)e.classList.toggle("collapsed")}
function toggleSection(id){var s=document.getElementById("section-"+id);if(!s)return;s.classList.toggle("collapsed");var a=s.querySelector(".section-arrow");if(a)a.textContent=s.classList.contains("collapsed")?"\\u25BC":"\\u25B2"}
function copyAllReadings(){var c=document.getElementById("readingsContainer");if(!c)return;navigator.clipboard.writeText(c.innerText).then(function(){alert("Reading copied to clipboard!")})}

// Mark as read
function markCardAsRead(event,cardId){
  event.stopPropagation();
  var card=document.getElementById(cardId);if(!card)return;
  var badge=card.querySelector(".read-badge");
  var btn=card.querySelector(".mark-read-btn");
  var isRead=card.classList.contains("is-read");
  if(isRead){
    card.classList.remove("is-read");
    if(badge){badge.classList.remove("is-read");badge.textContent=""}
    if(btn){btn.classList.remove("is-read");btn.textContent="Mark as Read"}
    readCardIds=readCardIds.filter(function(id){return id!==cardId});
  }else{
    card.classList.add("is-read");
    if(badge){badge.classList.add("is-read");badge.textContent="\\u2713"}
    if(btn){btn.classList.add("is-read");btn.textContent="\\u2713 Read"}
    if(readCardIds.indexOf(cardId)===-1)readCardIds.push(cardId);
    // Auto-collapse and scroll
    card.classList.remove("expanded");
    setTimeout(function(){var off=80;var top=card.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:top-off,behavior:"smooth"})},100);
  }
  try{localStorage.setItem("sb-read-sections",JSON.stringify(readCardIds))}catch(e){}
  updateProgress();
}

function sbTrack(){}
function startNewReading(){showForm()}
function showTemplatePicker(){}
function shareReading(){}

// Form & Upgrade
function showForm(){document.getElementById("formOverlay").classList.add("visible")}
function hideForm(){document.getElementById("formOverlay").classList.remove("visible")}
function showUpgrade(){document.getElementById("upgradeOverlay").classList.add("visible")}
function hideUpgrade(){document.getElementById("upgradeOverlay").classList.remove("visible")}
function handleFormSubmit(e){e.preventDefault();hideForm();showUpgrade();return false}
document.addEventListener("keydown",function(e){if(e.key==="Escape"){hideForm();hideUpgrade()}});

// Theme switching
var root=document.documentElement.style;
var themeMap={girl:{primary:"#FF69B4",secondary:"#FFB6C1",accent:"#FF1493",background:"#FFF0F5",border:"#FFE4EC",cardBg:"#FFFFFF",text:"#4A3347"},boy:{primary:"#6BA3D6",secondary:"#87CEEB",accent:"#4169E1",background:"#F0F8FF",border:"#B0E0E6",cardBg:"#FFFFFF",text:"#2C3E50"},purple:{primary:"#D8B5FF",secondary:"#B19CD9",accent:"#9B59B6",background:"#F8F0FF",border:"#E6D5F7",cardBg:"#FFFFFF",text:"#3D2952"}};
function setGender(t){
  document.body.classList.remove("theme-girl","theme-boy","theme-purple");
  document.body.classList.add("theme-"+t);
  var bar=document.getElementById("themeBar");
  if(bar){bar.classList.remove("theme-selected-girl","theme-selected-boy","theme-selected-purple");bar.classList.add("theme-selected-"+t)}
  document.querySelectorAll(".theme-bar-btn").forEach(function(b){b.classList.remove("active")});
  var ab=document.querySelector('.theme-bar-btn[data-theme="'+t+'"]');if(ab)ab.classList.add("active");
  var c=themeMap[t]||themeMap.girl;
  root.setProperty("--primary",c.primary);root.setProperty("--secondary",c.secondary);
  root.setProperty("--accent",c.accent);root.setProperty("--background",c.background);
  root.setProperty("--card-border",c.border);root.setProperty("--card-bg",c.cardBg);root.setProperty("--text",c.text);
}

// Progress tracking — uses is-read (mark as read) for progress
function updateProgress(){
  var total=document.querySelectorAll(".reading-card").length;
  var read=document.querySelectorAll(".reading-card.is-read").length;
  var pct=total?Math.round(read/total*100):0;
  // Sticky progress
  document.querySelectorAll(".progress-fill").forEach(function(f){f.style.width=pct+"%"});
  document.querySelectorAll(".progress-text").forEach(function(t){t.textContent=read+"/"+total+" read"});
  // Hero progress
  document.querySelectorAll(".hero-progress-fill").forEach(function(f){f.style.width=pct+"%"});
  var hpt=document.getElementById("heroProgressText");
  if(hpt)hpt.innerHTML=read+"/<span>"+total+"<\\/span> explored";
  var ic=document.getElementById("insightsCount");if(ic)ic.textContent=total;
  // Section counters
  document.querySelectorAll(".section-content").forEach(function(sec){
    var cards=sec.querySelectorAll(".reading-card");
    var exp=sec.querySelectorAll(".reading-card.is-read");
    var cnt=sec.querySelector(".section-reading-count");
    if(cnt)cnt.textContent=exp.length+"/"+cards.length;
  });
}
// Init progress on load
document.addEventListener("DOMContentLoaded",function(){updateProgress()});

// Disable service worker
if("serviceWorker" in navigator){navigator.serviceWorker.getRegistrations().then(function(r){r.forEach(function(reg){reg.unregister()})})}
`;

    let html = capturedHtml;

    // Ensure it starts with doctype
    if (!html.startsWith('<!')) {
        html = '<!DOCTYPE html>\n<html ' + html;
    } else if (!html.startsWith('<!DOCTYPE')) {
        html = '<!DOCTYPE html>\n' + html;
    }

    // Inject extra CSS before </style> (last occurrence to get the main style block)
    const lastStyleClose = html.lastIndexOf('</style>');
    if (lastStyleClose > -1) {
        html = html.substring(0, lastStyleClose) + extraCss + '\n</style>' + html.substring(lastStyleClose + 8);
    }

    // Inject modals + script before </body>
    const bodyClose = html.lastIndexOf('</body>');
    if (bodyClose > -1) {
        // Use array join to build the script tag safely (avoid </script> in source)
        const scriptOpen = '<' + 'script>';
        const scriptClose = '</' + 'script>';
        const injection = modalsHtml + '\n' + scriptOpen + scriptContent + scriptClose + '\n';
        html = html.substring(0, bodyClose) + injection + '</body>' + html.substring(bodyClose + 7);
    }

    // Remove any service worker registration lines
    html = html.replace(/navigator\.serviceWorker\.register\([^)]*\)/g, '/* sw disabled */');
    
    // Remove Google Analytics/AdSense scripts
    html = html.replace(/<script[^>]*google[^>]*>[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<script[^>]*gtag[^>]*>[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<script[^>]*adsense[^>]*>[\s\S]*?<\/script>/gi, '');

    return html;
}


main().catch(err => {
    console.error('FATAL:', err.message || err);
    process.exit(1);
});
