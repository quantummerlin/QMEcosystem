#!/usr/bin/env node

/**
 * Headless Reading Generator for Etsy Fulfillment
 * 
 * Uses Puppeteer + local HTTP server to generate a reading via the existing
 * generator page, then extracts the content into a standalone HTML file.
 * 
 * Usage:
 *   node fulfill.js --name="Jane Doe" --date=1990-06-15 [--time=14:30] [--place="London, UK"] [--theme=girl|boy|purple] [--gift] [--nopush] [--password=CUSTOM]
 * 
 * Output: Creates soulblueprint/r/{slug}/index.html and prints the URL
 */

const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

function generatePassword(len = 6) {
    // Uppercase + digits, no ambiguous chars (0/O, 1/I/l)
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    let pw = '';
    for (let i = 0; i < len; i++) pw += chars[Math.floor(Math.random() * chars.length)];
    return pw;
}

// ============================================
// MAIN
// ============================================
async function main() {
    const args = parseArgs();
    if (!args.name || !args.date) {
        console.error('Usage: node fulfill.js --name="Jane Doe" --date=1990-06-15 [--time=14:30] [--place="London, UK"] [--theme=pink|blue|purple]');
        process.exit(1);
    }

    // Normalize theme: accept pink/blue/purple or girl/boy/purple
    const themeMap = { pink: 'girl', girl: 'girl', blue: 'boy', boy: 'boy', purple: 'purple', m: 'boy', f: 'girl', n: 'purple' };
    const theme = themeMap[(args.theme || 'pink').toLowerCase()] || 'girl';

    // Generate or use custom password
    const password = args.password || generatePassword();
    console.log(`Password: ${password}`);

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

        // Set theme/gender before generation starts
        await page.evaluate((t) => {
            if (typeof setGender === 'function') setGender(t);
        }, theme);
        console.log(`Page loaded (theme: ${theme}). Waiting for reading...`);

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
                '.cookie-banner', '.cookie-consent', '#cookieConsent',
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
                    btn.textContent = 'New Reading';
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
                newBtn.textContent = 'New Reading';
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
        const html = buildFinalHtml(fullHtml, args.name, args.gift === 'true', slug, password, {
            date: args.date,
            time: args.time || '',
            place: args.place || '',
            theme: theme,
            cardCount: cardCount
        });

        const outDir = path.join(READINGS_DIR, slug);
        fs.mkdirSync(outDir, { recursive: true });
        const outFile = path.join(outDir, 'index.html');
        fs.writeFileSync(outFile, html, 'utf-8');

        const deployUrl = `${BASE_URL}/r/${slug}/`;
        console.log(`\n${'='.repeat(60)}`);
        console.log(`  READING READY`);
        console.log(`  Name:     ${args.name}`);
        console.log(`  Cards:    ${cardCount}`);
        console.log(`  Password: ${password}`);
        console.log(`  File:     soulblueprint/r/${slug}/index.html`);
        console.log(`  URL:      ${deployUrl}`);
        console.log(`${'='.repeat(60)}`);

        // Print delivery message template
        console.log(`\n--- ETSY DELIVERY MESSAGE ---`);
        console.log(`Hi!\n`);
        console.log(`Your personalised "A Moment in Time" reading for ${args.name} is ready!\n`);
        console.log(`Click here to explore your reading:`);
        console.log(`${deployUrl}\n`);
        console.log(`Your password: ${password}\n`);
        console.log(`What you'll find:`);
        console.log(`- 135+ personalised readings covering astrology, numerology & life patterns`);
        console.log(`- Expandable sections - explore at your own pace`);
        console.log(`- Save to your phone's homescreen for permanent offline access`);
        console.log(`- Print or download anytime\n`);
        console.log(`Plus 70+ free AI guide books and a prompt generator to transform your reading into visual art, podcasts, journals & more!\n`);
        console.log(`This is your permanent link - it will never expire.\n`);
        console.log(`Enjoy your cosmic journey!`);
        console.log(`--- END MESSAGE ---\n`);

        // Auto deploy via git
        const skipPush = args.nopush === 'true';
        if (!skipPush) {
            try {
                console.log('\nDeploying...');
                const gitPath = `soulblueprint/r/${slug}`;
                execSync(`git add "${gitPath}"`, { cwd: REPO_ROOT, stdio: 'pipe' });
                execSync(`git commit -m "Reading: ${args.name}"`, { cwd: REPO_ROOT, stdio: 'pipe' });
                console.log('  Git committed. Pushing to origin...');
                execSync('git push origin main', { cwd: REPO_ROOT, stdio: 'pipe', timeout: 60000 });
                console.log(`   DEPLOYED — Live at: ${deployUrl}`);
            } catch (gitErr) {
                console.error('   Git push failed:', gitErr.message.substring(0, 200));
                console.log(`  Manual deploy:\n    cd ${REPO_ROOT}`);
                console.log(`    git add soulblueprint/r/${slug}`);
                console.log(`    git commit -m "Reading: ${args.name}"`);
                console.log('    git push origin main');
            }
        } else {
            console.log(`\nTo deploy:\n  cd ${REPO_ROOT}`);
            console.log(`  git add soulblueprint/r/${slug}`);
            console.log(`  git commit -m "Reading: ${args.name}"`);
            console.log('  git push origin main');
        }

    } finally {
        await browser.close();
        server.close();
    }
}

// ============================================
// BUILD FINAL HTML — inject modals + JS into captured page
// ============================================
function buildFinalHtml(capturedHtml, personName, isGift, slug, password, birthData) {
    birthData = birthData || {};

    // ---- Zodiac sign calculator ----
    function getSunSign(dateStr) {
        if (!dateStr) return '';
        const [, m, d] = dateStr.split('-').map(Number);
        const signs = [
            ['Capricorn',  [1,1],  [1,19]],
            ['Aquarius',   [1,20], [2,18]],
            ['Pisces',     [2,19], [3,20]],
            ['Aries',      [3,21], [4,19]],
            ['Taurus',     [4,20], [5,20]],
            ['Gemini',     [5,21], [6,20]],
            ['Cancer',     [6,21], [7,22]],
            ['Leo',        [7,23], [8,22]],
            ['Virgo',      [8,23], [9,22]],
            ['Libra',      [9,23], [10,22]],
            ['Scorpio',    [10,23],[11,21]],
            ['Sagittarius',[11,22],[12,21]],
            ['Capricorn',  [12,22],[12,31]]
        ];
        for (const [name, [sm, sd], [em, ed]] of signs) {
            if ((m === sm && d >= sd) || (m === em && d <= ed)) return name;
        }
        return '';
    }

    // ---- Date/time formatter ----
    function formatBirthDate(dateStr) {
        if (!dateStr) return '';
        const [y, m, d] = dateStr.split('-').map(Number);
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        const suffix = (d === 1 || d === 21 || d === 31) ? 'st' : (d === 2 || d === 22) ? 'nd' : (d === 3 || d === 23) ? 'rd' : 'th';
        return `${d}${suffix} ${months[m-1]} ${y}`;
    }
    function formatBirthTime(timeStr) {
        if (!timeStr) return '';
        const [h, min] = timeStr.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${String(min).padStart(2,'0')} ${ampm}`;
    }

    // ---- Build personalized data ----
    const sunSign = getSunSign(birthData.date);
    const formattedDate = formatBirthDate(birthData.date);
    const formattedTime = formatBirthTime(birthData.time);
    const birthPlace = birthData.place || '';
    const cardCount = birthData.cardCount || 135;
    const overlayTheme = birthData.theme || 'girl';

    // Build birth details line: "3rd May 1981 · 1:30 PM · Abu Dhabi, UAE"
    const detailParts = [formattedDate, formattedTime, birthPlace].filter(Boolean);
    const birthDetailsLine = detailParts.join(' \u00b7 ');

    // Theme color map for overlay accents
    const themeColors = {
        girl:   { glow: 'rgba(255,105,180,0.3)', glowStrong: 'rgba(255,105,180,0.5)', label: '#ffb6c1', signColor: '#ff69b4', border: 'rgba(255,105,180,0.25)', dotBg: '#ff69b4' },
        boy:    { glow: 'rgba(107,163,214,0.3)', glowStrong: 'rgba(107,163,214,0.5)', label: '#87ceeb', signColor: '#6ba3d6', border: 'rgba(107,163,214,0.25)', dotBg: '#6ba3d6' },
        purple: { glow: 'rgba(216,181,255,0.3)', glowStrong: 'rgba(216,181,255,0.5)', label: '#d8b5ff', signColor: '#b19cd9', border: 'rgba(216,181,255,0.25)', dotBg: '#d8b5ff' }
    };
    const tc = themeColors[overlayTheme] || themeColors.girl;

    // Additional CSS for the form/upgrade modals, nav button, welcome overlay, and password gate
    const extraCss = `
/* Password gate */
.pw-gate{position:fixed;top:0;left:0;right:0;bottom:0;background:linear-gradient(145deg,rgba(10,5,20,0.99),rgba(26,10,46,0.99));z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px 16px;font-family:'Inter','Segoe UI',system-ui,sans-serif}
.pw-gate.hidden{display:none}
.pw-card{max-width:380px;width:100%;background:linear-gradient(160deg,rgba(30,16,53,0.95),rgba(18,8,42,0.98));border:1.5px solid rgba(255,215,0,0.25);border-radius:20px;padding:36px 28px;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,0.5)}
.pw-card h2{font-family:'Playfair Display',Georgia,serif;font-size:1.4rem;color:#ffd700;margin:0 0 8px}
.pw-card .pw-subtitle{color:#e8d5ff;opacity:0.7;font-size:0.88rem;margin:0 0 24px;line-height:1.5}
.pw-card .pw-name{color:#fff;font-family:'Playfair Display',Georgia,serif;font-size:1.2rem;margin:0 0 20px}
.pw-input-wrap{display:flex;gap:8px;margin-bottom:12px}
.pw-input{flex:1;padding:14px 16px;border:2px solid rgba(255,215,0,0.2);border-radius:12px;background:rgba(255,255,255,0.05);color:#fff;font-size:1.1rem;font-family:monospace;letter-spacing:0.15em;text-transform:uppercase;text-align:center}
.pw-input:focus{outline:none;border-color:rgba(255,215,0,0.5)}
.pw-submit{padding:14px 24px;border:none;border-radius:12px;background:linear-gradient(135deg,#FFD700,#FFA500);color:#1a0a2e;font-weight:700;font-size:0.95rem;cursor:pointer;transition:transform 0.15s}
.pw-submit:hover{transform:scale(1.03)}
.pw-error{color:#ff6b6b;font-size:0.82rem;margin:8px 0 0;min-height:1.2em}
.pw-hint{color:#e8d5ff;opacity:0.35;font-size:0.72rem;margin-top:16px}
@media(max-width:480px){.pw-card{padding:28px 20px}.pw-card h2{font-size:1.2rem}.pw-input{font-size:1rem;padding:12px}}
/* Welcome overlay */
.welcome-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:linear-gradient(145deg,rgba(10,5,20,0.97),rgba(26,10,46,0.98));z-index:9999;display:flex;align-items:center;justify-content:center;padding:60px 16px 24px;opacity:1;transition:opacity 0.6s ease;font-family:'Inter','Segoe UI',system-ui,sans-serif;overflow-y:auto}
.welcome-overlay.hiding{opacity:0;pointer-events:none}
.welcome-card{max-width:440px;width:100%;background:linear-gradient(160deg,rgba(30,16,53,0.95),rgba(18,8,42,0.98));border:1.5px solid ${tc.border};border-radius:24px;padding:36px 28px;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,0.5),0 0 80px ${tc.glow};position:relative;overflow:hidden;animation:welcomeFadeIn 0.8s ease-out}
.welcome-card::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle at 30% 20%,${tc.glow} 0%,transparent 50%),radial-gradient(circle at 70% 80%,rgba(102,126,234,0.05) 0%,transparent 50%);pointer-events:none}
.welcome-card>*{position:relative;z-index:1}
.welcome-cosmic{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:0.82rem;color:${tc.label};opacity:0.6;margin-bottom:16px;letter-spacing:0.03em;animation:welcomeFadeIn 0.5s ease-out 0.2s both}
.welcome-label{font-family:'Playfair Display',Georgia,serif;font-size:0.82rem;color:${tc.label};letter-spacing:0.14em;text-transform:uppercase;opacity:0.7;margin-bottom:14px;animation:welcomeFadeIn 0.5s ease-out 0.3s both}
.welcome-title{font-family:'Playfair Display',Georgia,serif;font-size:1.4rem;color:#ffd700;margin-bottom:6px;line-height:1.3;animation:welcomeFadeIn 0.5s ease-out 0.4s both}
.welcome-name{font-family:'Playfair Display',Georgia,serif;font-size:1.6rem;color:#fff;margin-bottom:8px;line-height:1.2;animation:welcomeFadeIn 0.5s ease-out 0.5s both}
.welcome-birth-details{font-size:0.78rem;color:#e8d5ff;opacity:0.7;letter-spacing:0.06em;margin-bottom:6px;animation:welcomeFadeIn 0.5s ease-out 0.55s both}
.welcome-sign{font-family:'Playfair Display',Georgia,serif;font-size:0.92rem;color:${tc.signColor};font-weight:600;letter-spacing:0.08em;margin-bottom:16px;animation:welcomeFadeIn 0.5s ease-out 0.6s both}
.welcome-text{font-size:0.9rem;line-height:1.65;color:#e8d5ff;opacity:0.8;margin-bottom:24px;animation:welcomeFadeIn 0.5s ease-out 0.65s both}
.welcome-features{display:grid;grid-template-columns:1fr 1fr;gap:6px 14px;text-align:left;margin-bottom:28px;animation:welcomeFadeIn 0.5s ease-out 0.7s both}
.welcome-feature{display:flex;align-items:center;gap:6px;font-size:0.78rem;color:#e8d5ff;opacity:0.75;padding-left:8px}
.welcome-feature::before{content:'';width:4px;height:4px;border-radius:50%;background:${tc.dotBg};flex-shrink:0}
.welcome-divider{height:1px;background:linear-gradient(90deg,transparent,${tc.border},transparent);margin:0 0 24px}
.welcome-btn{display:inline-block;background:linear-gradient(135deg,#ffd700 0%,#ffec80 20%,#ffd700 40%,#e6ac00 60%,#ffd700 80%,#ffe44d 100%);background-size:300% auto;color:#1a0a2e;padding:18px 52px;border-radius:40px;font-size:1.1rem;font-weight:800;letter-spacing:0.04em;text-decoration:none;border:2px solid rgba(255,236,128,0.5);cursor:pointer;box-shadow:0 6px 30px rgba(255,215,0,0.4),0 0 60px rgba(255,215,0,0.12),inset 0 1px 0 rgba(255,255,255,0.3);transition:transform 0.25s,box-shadow 0.25s;animation:welcomeFadeIn 0.5s ease-out 0.8s both,welcomeShimmer 2.5s ease-in-out infinite,welcomePulse 2s ease-in-out infinite;position:relative}
.welcome-btn::after{content:'';position:absolute;inset:-4px;border-radius:44px;background:linear-gradient(135deg,rgba(255,215,0,0.3),rgba(255,236,128,0.1),rgba(255,215,0,0.3));z-index:-1;filter:blur(8px);opacity:0.7;animation:welcomePulse 2s ease-in-out infinite}
.welcome-btn:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 10px 40px rgba(255,215,0,0.5),0 0 80px rgba(255,215,0,0.18),inset 0 1px 0 rgba(255,255,255,0.4)}
.welcome-note{font-size:0.78rem;opacity:0.65;margin-top:18px;color:#c9a0ff;letter-spacing:0.02em;animation:welcomeFadeIn 0.5s ease-out 0.9s both}
.welcome-brand{margin-top:20px;padding-top:16px;border-top:1px solid ${tc.border}}
.welcome-brand-name{font-family:'Playfair Display',Georgia,serif;font-size:0.8rem;color:${tc.label};opacity:0.5}
@keyframes welcomeFadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes welcomeShimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes welcomePulse{0%,100%{box-shadow:0 6px 30px rgba(255,215,0,0.4),0 0 60px rgba(255,215,0,0.12)}50%{box-shadow:0 6px 36px rgba(255,215,0,0.55),0 0 80px rgba(255,215,0,0.2)}}
@media(max-width:480px){.welcome-card{padding:24px 16px;max-width:calc(100vw - 32px);border-radius:20px}.welcome-cosmic{font-size:0.74rem;margin-bottom:12px}.welcome-label{font-size:0.72rem;margin-bottom:10px}.welcome-title{font-size:1.2rem;margin-bottom:4px}.welcome-name{font-size:1.35rem;margin-bottom:6px}.welcome-birth-details{font-size:0.72rem;margin-bottom:4px}.welcome-sign{font-size:0.82rem;margin-bottom:12px}.welcome-text{font-size:0.82rem;margin-bottom:18px;line-height:1.55}.welcome-features{grid-template-columns:1fr;gap:4px;margin-bottom:20px}.welcome-feature{font-size:0.75rem}.welcome-btn{padding:14px 36px;font-size:0.98rem}.welcome-note{font-size:0.72rem;margin-top:12px;opacity:0.6}.welcome-brand{margin-top:14px;padding-top:12px}.welcome-brand-name{font-size:0.72rem}.welcome-divider{margin:0 0 18px}}
@media(max-width:360px){.welcome-card{padding:20px 14px}.welcome-title{font-size:1.1rem}.welcome-name{font-size:1.2rem}.welcome-sign{font-size:0.78rem}.welcome-btn{padding:10px 24px;font-size:0.88rem}}
@media(prefers-reduced-motion:reduce){.welcome-overlay *{animation:none!important;transition:none!important}}
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
.upgrade-option .features li::before{content:"\\u2022  ";color:var(--primary);font-weight:700}
.upgrade-close{position:absolute;top:12px;right:16px;background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--text);opacity:0.5;line-height:1}
.upgrade-close:hover{opacity:1}
.upgrade-back{background:none;border:none;color:var(--text);opacity:0.5;font-size:0.85rem;cursor:pointer;margin-top:8px}
.upgrade-back:hover{opacity:0.8;text-decoration:underline}
`;

    // Welcome overlay HTML (shown on first visit)
    const welcomeLabel = isGift ? 'A Gift Created Just For You' : 'Thank You For Your Order';
    const welcomeTitle = isGift ? 'Someone Special Created This For You' : 'Your Soul Blueprint Is Ready';
    const welcomeText = isGift
        ? `A unique Soul Blueprint has been lovingly created from your exact birth data. Inside you\'ll find ${cardCount}+ personalised readings across astrology, numerology, Chinese zodiac, and more \u2014 all calculated to the minute you were born. Plus 70+ AI guide books and a prompt generator to explore your reading further.`
        : `Your unique Soul Blueprint has been personally created from your exact birth data. Inside you\'ll find ${cardCount}+ personalised readings across astrology, numerology, Chinese zodiac, and more \u2014 all calculated to the minute you were born. Plus 70+ AI guide books and a prompt generator to explore your reading further.`;
    const cosmicLine = isGift ? 'A map of the cosmos at the moment they arrived' : 'A map of the cosmos at the moment you arrived';
    const welcomeKey = `sb-welcome-${slug}`;
    const pwKey = `sb-pw-${slug}`;

    // Password gate HTML
    const passwordHtml = `
<div class="pw-gate" id="passwordGate">
  <div class="pw-card">
    <h2>Your Reading Awaits</h2>
    <div class="pw-name">${escapeHtml(personName)}</div>
    <p class="pw-subtitle">Enter the password from your order confirmation to unlock your personalised reading.</p>
    <div class="pw-input-wrap">
      <input type="text" class="pw-input" id="pwInput" maxlength="8" placeholder="Enter password" autocomplete="off" autocapitalize="characters" spellcheck="false">
      <button class="pw-submit" onclick="checkPassword()">Unlock</button>
    </div>
    <div class="pw-error" id="pwError"></div>
    <div class="pw-hint">Password is case-insensitive</div>
  </div>
</div>`;

    // Password gate script
    const passwordScript = `
// Password gate
(function(){
  var pwKey='${pwKey}';
  var pw='${password}';
  var unlocked=false;
  try{unlocked=localStorage.getItem(pwKey)==='1'}catch(e){}
  if(unlocked){
    var g=document.getElementById('passwordGate');
    if(g)g.classList.add('hidden');
  }else{
    document.body.style.overflow='hidden';
    // Hide everything behind the gate
    var results=document.getElementById('resultsSection');
    if(results)results.style.visibility='hidden';
    var wo=document.getElementById('welcomeOverlay');
    if(wo)wo.style.display='none';
  }
  window.checkPassword=function(){
    var input=document.getElementById('pwInput').value.trim().toUpperCase();
    if(input===pw.toUpperCase()){
      try{localStorage.setItem(pwKey,'1')}catch(e){}
      var g=document.getElementById('passwordGate');
      if(g)g.classList.add('hidden');
      // Show content
      var results=document.getElementById('resultsSection');
      if(results)results.style.visibility='';
      // Show welcome overlay if not seen
      var wKey='${welcomeKey}';
      var wSeen=false;
      try{wSeen=localStorage.getItem(wKey)==='1'}catch(e){}
      if(!wSeen){
        var wo=document.getElementById('welcomeOverlay');
        if(wo)wo.style.display='';
        document.body.style.overflow='hidden';
      }else{
        document.body.style.overflow='';
      }
    }else{
      document.getElementById('pwError').textContent='Incorrect password. Please try again.';
      document.getElementById('pwInput').value='';
      document.getElementById('pwInput').focus();
    }
  };
  // Enter key to submit
  var inp=document.getElementById('pwInput');
  if(inp)inp.addEventListener('keydown',function(e){if(e.key==='Enter')window.checkPassword()});
})();
`;

    const birthDetailsHtml = birthDetailsLine ? `\n    <div class="welcome-birth-details">${escapeHtml(birthDetailsLine)}</div>` : '';
    const sunSignHtml = sunSign ? `\n    <div class="welcome-sign">${escapeHtml(sunSign)} Sun</div>` : '';

    const welcomeHtml = `
<div class="welcome-overlay" id="welcomeOverlay">
  <div class="welcome-card">
    <div class="welcome-cosmic">${cosmicLine}</div>
    <div class="welcome-label">${welcomeLabel}</div>
    <div class="welcome-title">${welcomeTitle}</div>
    <div class="welcome-name">${escapeHtml(personName)}</div>${birthDetailsHtml}${sunSignHtml}
    <p class="welcome-text">${welcomeText}</p>
    <div class="welcome-features">
      <div class="welcome-feature"><span>${cardCount}+ personalised readings</span></div>
      <div class="welcome-feature"><span>70+ AI guide books</span></div>
      <div class="welcome-feature"><span>Western &amp; Chinese astrology</span></div>
      <div class="welcome-feature"><span>Numerology deep dive</span></div>
      <div class="welcome-feature"><span>Love &amp; career insights</span></div>
      <div class="welcome-feature"><span>AI prompt generator</span></div>
    </div>
    <div class="welcome-divider"></div>
    <button class="welcome-btn" onclick="dismissWelcome()">Begin Exploring \u2192</button>
    <div class="welcome-note">Your reading is permanent \u2014 bookmark this page to return anytime</div>
    <div class="welcome-brand"><div class="welcome-brand-name">A Moment in Time \u00b7 by Quantum Merlin</div></div>
  </div>
</div>`;

    const welcomeScript = `
// Welcome overlay — show on first visit only
(function(){
  var key='${welcomeKey}';
  var seen=false;
  try{seen=localStorage.getItem(key)==='1'}catch(e){}
  if(seen){
    var wo=document.getElementById('welcomeOverlay');
    if(wo)wo.style.display='none';
  }else{
    document.body.style.overflow='hidden';
  }
})();
function dismissWelcome(){
  var wo=document.getElementById('welcomeOverlay');
  if(!wo)return;
  wo.classList.add('hiding');
  document.body.style.overflow='';
  try{localStorage.setItem('${welcomeKey}','1')}catch(e){}
  setTimeout(function(){wo.style.display='none'},600);
}
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
        <p class="price-note">Introductory offer</p>
        <ul class="features">
          <li>135+ personalised reading cards</li>
          <li>17 cosmic sections analysed</li>
          <li>Permanent link to revisit anytime</li>
          <li>Beautiful shareable format</li>
        </ul>
      </a>
      <a class="upgrade-option" href="https://www.etsy.com/shop/QuantumMerlin" target="_blank">
        <span class="upgrade-badge">50% OFF</span>
        <h3>2 Readings</h3>
        <div class="price"><span class="original">$35.99</span> $17.99</div>
        <p class="price-note">Introductory offer &middot; save even more</p>
        <ul class="features">
          <li>2 full personalised readings</li>
          <li>All 135+ cards &amp; 17 sections each</li>
          <li>Perfect for you &amp; a loved one</li>
          <li>Permanent links to revisit anytime</li>
        </ul>
      </a>
      <a class="upgrade-option featured" href="https://www.etsy.com/shop/QuantumMerlin" target="_blank">
        <span class="upgrade-badge">BEST VALUE</span>
        <h3>3 Readings</h3>
        <div class="price"><span class="original">$99.98</span> $49.99</div>
        <p class="price-note">50% off &middot; family &amp; friends</p>
        <ul class="features">
          <li>3 full personalised readings</li>
          <li>All 135+ cards &amp; 17 sections each</li>
          <li>Perfect for family or friends</li>
          <li>Permanent links to revisit anytime</li>
        </ul>
      </a>
      <a class="upgrade-option" href="https://www.etsy.com/shop/QuantumMerlin" target="_blank">
        <h3>Unlimited Readings</h3>
        <div class="price">$99.99</div>
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
    if(badge){badge.classList.add("is-read");badge.textContent="Done"}
    if(btn){btn.classList.add("is-read");btn.textContent="Read"}
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
        const injection = passwordHtml + '\n' + welcomeHtml + '\n' + modalsHtml + '\n' + scriptOpen + passwordScript + welcomeScript + scriptContent + scriptClose + '\n';
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
