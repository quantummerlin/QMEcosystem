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
    const params = new URLSearchParams({ name: args.name, date: args.date, fulfill: 'true' });
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

        // ---- Extract content ----
        const extracted = await page.evaluate(() => {
            // Remove interactive elements
            const remove = [
                '.card-actions', '.transform-btn', '.copy-reading-btn',
                '.mark-read-btn', '.read-badge', '.section-mark-read-btn',
                '.new-reading-prompt', '.ai-transform-banner', '.ai-transform-callout',
                '.ai-banner-dismiss', '.sticky-progress-header', '.reading-nav-float',
                '.quick-transform-section', '.expand-all-section',
                '.completion-celebration', '.gift-support-section',
                '.playbook-navigation', '.example-banner',
                '.book-template-section', '.discover-links',
                '.hero-progress', '.ad-container', '.ad-placeholder',
                'ins.adsbygoogle', '.pagination-controls',
                '.fulfill-upgrade-card', '.gift-box', '.coffee-box',
                '.gift-dialog-overlay', '#gift-share-dialog',
                '[onclick*="giftReading"]',
            ];
            remove.forEach(s => document.querySelectorAll(s).forEach(el => el.remove()));

            const container = document.getElementById('readingsContainer');
            const closing = document.getElementById('readingClosing');
            const name = document.getElementById('subjectName')?.textContent || '';
            const birthInfo = document.getElementById('birthInfo')?.textContent || '';

            // Capture all CSS
            const styles = [];
            document.querySelectorAll('style').forEach(s => {
                if (s.textContent.length > 100) styles.push(s.textContent);
            });

            return {
                readingHtml: container?.innerHTML || '',
                closingHtml: closing?.innerHTML || '',
                name, birthInfo, styles,
            };
        });

        console.log(`Extracted: ${Math.round(extracted.readingHtml.length / 1024)}KB`);

        // ---- Build & save ----
        const nameSlug = args.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
        const slug = `${nameSlug}-${randomSlug()}`;
        const html = buildStandaloneHtml(extracted, slug);

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
// BUILD STANDALONE HTML
// ============================================
function buildStandaloneHtml(data, slug) {
    const { readingHtml, closingHtml, name, birthInfo, styles } = data;
    const allCss = styles.join('\n');
    const eName = escapeHtml(name);
    const eBirth = escapeHtml(birthInfo);

    const parts = [];
    parts.push('<!DOCTYPE html>');
    parts.push('<html lang="en">');
    parts.push('<head>');
    parts.push('<meta charset="UTF-8">');
    parts.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    parts.push('<title>A Moment in Time for ' + eName + '</title>');
    parts.push('<meta name="robots" content="noindex, nofollow">');
    parts.push('<meta property="og:title" content="A Moment in Time for ' + eName + '">');
    parts.push('<meta property="og:description" content="A personalised birth moment reading">');
    parts.push('<link rel="preconnect" href="https://fonts.googleapis.com">');
    parts.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
    parts.push('<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">');
    parts.push('<style>');
    parts.push(allCss);

    // ---------- Standalone overrides ----------
    parts.push('/* Standalone overrides */');
    parts.push('body{margin:0;padding:0;font-family:var(--font-body);background:var(--background);color:var(--text)}');
    // Hide only non-essential elements (keep theme-bar, nav, reading interactivity)
    parts.push('#loadingOverlay,#myReadingsSection,.cookie-banner,.gift-box,.coffee-box,.sticky-progress-header,.reading-nav-float,.gift-dialog-overlay,#gift-share-dialog,.quick-transform-section,.expand-all-section,.completion-celebration,.gift-support-section,.playbook-navigation,.example-banner,.book-template-section,.discover-links,.hero-progress,.card-actions,.mark-read-btn,.read-badge,.section-mark-read-btn,.new-reading-prompt,.ai-transform-banner,.ai-transform-callout,.ai-banner-dismiss,.fulfill-upgrade-card,.ad-container,.ad-placeholder,.cookie-consent,.pagination-controls{display:none!important}');
    parts.push('.reading-card{cursor:pointer}');
    parts.push('.reading-card.expanded .reading-card-body{max-height:20000px;overflow:visible}');
    parts.push('.reading-header{text-align:center;padding:40px 20px 20px;max-width:800px;margin:0 auto}');
    parts.push('.reading-header h1{font-family:var(--font-heading);font-size:2rem;margin-bottom:8px}');
    parts.push('.reading-header .birth-info{font-size:1rem;opacity:0.8}');
    parts.push('.standalone-footer{text-align:center;padding:40px 20px;opacity:0.6;font-size:0.85rem}');
    parts.push('.standalone-footer a{color:var(--primary);text-decoration:none}');

    // ---------- Theme bar ----------
    parts.push('.theme-bar{position:fixed;top:0;left:0;right:0;height:50px;background:linear-gradient(90deg,#FF69B4 0%,#FFB6C1 25%,#E6E6FA 50%,#87CEEB 75%,#6BA3D6 100%);display:flex;justify-content:center;align-items:center;gap:10px;z-index:1000;box-shadow:0 2px 10px rgba(0,0,0,0.15);transition:background 0.5s ease}');
    parts.push('.theme-bar.theme-selected-girl{background:linear-gradient(135deg,#FF69B4 0%,#FFB6C1 100%)}');
    parts.push('.theme-bar.theme-selected-boy{background:linear-gradient(135deg,#6BA3D6 0%,#87CEEB 100%)}');
    parts.push('.theme-bar.theme-selected-purple{background:linear-gradient(135deg,#D8B5FF 0%,#B19CD9 100%)}');
    parts.push('.theme-bar-btn{padding:8px 20px;border:2px solid white;border-radius:20px;background:transparent;color:white;font-size:0.9rem;font-weight:600;cursor:pointer;transition:all 0.3s ease}');
    parts.push('.theme-bar-btn:hover{background:rgba(255,255,255,0.2);transform:scale(1.05)}');
    parts.push('.theme-bar-btn.active{background:white;color:var(--primary)}');
    parts.push('.theme-bar-btn[data-theme="boy"].active{color:#6BA3D6}');
    parts.push('.theme-bar-btn[data-theme="purple"].active{color:#9B59B6}');

    // ---------- Nav bar ----------
    parts.push('.site-nav{position:sticky;top:50px;z-index:100;background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid rgba(0,0,0,0.06);padding:0 16px}');
    parts.push('.site-nav-inner{max-width:900px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:48px;gap:8px}');
    parts.push('.site-nav-brand{font-weight:700;font-size:1rem;color:var(--text);text-decoration:none;white-space:nowrap}');
    parts.push('.site-nav-links{display:flex;gap:4px;align-items:center;flex-wrap:nowrap;overflow-x:auto}');
    parts.push('.site-nav-links a{padding:6px 12px;border-radius:8px;font-size:0.82rem;font-weight:500;color:#555;text-decoration:none;white-space:nowrap;transition:background .15s,color .15s}');
    parts.push('.site-nav-links a:hover,.site-nav-links a.active{background:rgba(102,126,234,0.1);color:#667eea}');
    parts.push('.new-reading-nav-btn{padding:6px 14px!important;border-radius:20px!important;background:var(--primary)!important;color:white!important;font-weight:600!important;cursor:pointer;border:none;transition:transform .15s,box-shadow .15s}');
    parts.push('.new-reading-nav-btn:hover{transform:scale(1.05);box-shadow:0 2px 8px rgba(0,0,0,0.15)}');

    // ---------- Form modal overlay ----------
    parts.push('.form-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:2000;justify-content:center;align-items:center;padding:20px}');
    parts.push('.form-overlay.visible{display:flex}');
    parts.push('.form-modal{background:var(--card-bg,#fff);border-radius:20px;padding:32px;max-width:420px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative;max-height:90vh;overflow-y:auto}');
    parts.push('.form-modal h2{font-family:var(--font-heading);text-align:center;margin:0 0 8px;font-size:1.5rem;color:var(--text)}');
    parts.push('.form-modal .form-subtitle{text-align:center;opacity:0.7;font-size:0.9rem;margin:0 0 24px}');
    parts.push('.form-modal .form-group{margin-bottom:16px}');
    parts.push('.form-modal label{display:block;font-weight:600;font-size:0.9rem;margin-bottom:4px;color:var(--text)}');
    parts.push('.form-modal input{width:100%;padding:10px 14px;border:2px solid var(--card-border,#eee);border-radius:10px;font-size:0.95rem;font-family:var(--font-body);background:var(--background);color:var(--text);box-sizing:border-box;transition:border-color .2s}');
    parts.push('.form-modal input:focus{outline:none;border-color:var(--primary)}');
    parts.push('.form-modal .optional-badge{font-size:0.75rem;opacity:0.5;font-weight:400}');
    parts.push('.form-modal .submit-btn{width:100%;padding:14px;border:none;border-radius:12px;background:linear-gradient(135deg,var(--primary),var(--accent,var(--primary)));color:white;font-size:1.05rem;font-weight:700;cursor:pointer;margin-top:8px;transition:transform .15s,box-shadow .15s}');
    parts.push('.form-modal .submit-btn:hover{transform:translateY(-1px);box-shadow:0 4px 15px rgba(0,0,0,0.2)}');
    parts.push('.form-close{position:absolute;top:12px;right:16px;background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--text);opacity:0.5;line-height:1}');
    parts.push('.form-close:hover{opacity:1}');

    // ---------- Upgrade card ----------
    parts.push('.upgrade-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:3000;justify-content:center;align-items:center;padding:20px}');
    parts.push('.upgrade-overlay.visible{display:flex}');
    parts.push('.upgrade-modal{background:var(--card-bg,#fff);border-radius:24px;padding:36px 28px;max-width:480px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative;text-align:center}');
    parts.push('.upgrade-modal h2{font-family:var(--font-heading);font-size:1.6rem;margin:0 0 8px;color:var(--text)}');
    parts.push('.upgrade-modal .upgrade-subtitle{opacity:0.7;font-size:0.95rem;margin:0 0 28px;line-height:1.5}');
    parts.push('.upgrade-options{display:flex;flex-direction:column;gap:16px;margin-bottom:20px}');
    parts.push('.upgrade-option{border:2px solid var(--card-border,#eee);border-radius:16px;padding:20px;cursor:pointer;transition:all .2s;text-decoration:none;display:block;position:relative}');
    parts.push('.upgrade-option:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 15px rgba(0,0,0,0.1)}');
    parts.push('.upgrade-option.featured{border-color:var(--primary);background:linear-gradient(135deg,rgba(255,105,180,0.05),rgba(255,182,193,0.08))}');
    parts.push('.upgrade-badge{position:absolute;top:-10px;right:16px;background:var(--primary);color:white;font-size:0.72rem;font-weight:700;padding:3px 10px;border-radius:10px;text-transform:uppercase}');
    parts.push('.upgrade-option h3{font-family:var(--font-heading);margin:0 0 6px;font-size:1.15rem;color:var(--text)}');
    parts.push('.upgrade-option .price{font-size:1.4rem;font-weight:700;color:var(--primary);margin:4px 0}');
    parts.push('.upgrade-option .price .original{text-decoration:line-through;opacity:0.4;font-size:0.9rem;font-weight:400;margin-right:6px;color:var(--text)}');
    parts.push('.upgrade-option .price-note{font-size:0.8rem;opacity:0.6;margin:2px 0 0}');
    parts.push('.upgrade-option .features{text-align:left;margin:10px 0 0;padding:0;list-style:none;font-size:0.85rem;line-height:1.8}');
    parts.push('.upgrade-option .features li::before{content:"✓ ";color:var(--primary);font-weight:700}');
    parts.push('.upgrade-close{position:absolute;top:12px;right:16px;background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--text);opacity:0.5;line-height:1}');
    parts.push('.upgrade-close:hover{opacity:1}');
    parts.push('.upgrade-back{background:none;border:none;color:var(--text);opacity:0.5;font-size:0.85rem;cursor:pointer;margin-top:8px}');
    parts.push('.upgrade-back:hover{opacity:0.8;text-decoration:underline}');

    // Dark theme overrides for overlays
    parts.push('body.dark-theme .site-nav{background:rgba(26,10,46,0.95);border-bottom-color:rgba(255,255,255,0.08)}');
    parts.push('body.dark-theme .site-nav-brand{color:var(--primary)}');
    parts.push('body.dark-theme .site-nav-links a{color:#aaa}');
    parts.push('body.dark-theme .site-nav-links a:hover{background:rgba(102,126,234,0.2);color:#a0b4ff}');
    parts.push('body.dark-theme .form-modal,body.dark-theme .upgrade-modal{background:#1a0a2e;border:1px solid rgba(255,255,255,0.1)}');
    parts.push('@media(max-width:600px){.site-nav-links a{padding:6px 8px;font-size:0.78rem}.site-nav-brand{font-size:0.9rem}.upgrade-modal{padding:24px 18px}}');

    parts.push('</style>');
    parts.push('</head>');
    parts.push('<body class="theme-girl">');

    // ---------- Theme bar ----------
    parts.push('<div class="theme-bar theme-selected-girl" id="themeBar">');
    parts.push('  <button class="theme-bar-btn active" data-theme="girl" onclick="setTheme(\'girl\')">Pink</button>');
    parts.push('  <button class="theme-bar-btn" data-theme="purple" onclick="setTheme(\'purple\')">Purple</button>');
    parts.push('  <button class="theme-bar-btn" data-theme="boy" onclick="setTheme(\'boy\')">Blue</button>');
    parts.push('</div>');

    // ---------- Nav bar ----------
    parts.push('<nav class="site-nav" id="siteNav">');
    parts.push('  <div class="site-nav-inner">');
    parts.push('    <a href="https://quantummerlin.com/soulblueprint/" class="site-nav-brand">✨ A Moment in Time</a>');
    parts.push('    <div class="site-nav-links">');
    parts.push('      <a href="https://quantummerlin.com/soulblueprint/examples/">Examples</a>');
    parts.push('      <a href="https://quantummerlin.com/soulblueprint/articles/">Guides</a>');
    parts.push('      <a href="https://quantummerlin.com/soulblueprint/playbooks/">Playbooks</a>');
    parts.push('      <a class="new-reading-nav-btn" onclick="showForm()" href="javascript:void(0)">✨ New Reading</a>');
    parts.push('    </div>');
    parts.push('  </div>');
    parts.push('</nav>');

    // ---------- Reading header ----------
    parts.push('<div class="reading-header" style="padding-top:20px">');
    parts.push('  <h1>A Moment in Time for ' + eName + '</h1>');
    parts.push('  <p class="birth-info">' + eBirth + '</p>');
    parts.push('</div>');

    // ---------- Reading content ----------
    parts.push('<div id="readingsContainer" style="max-width:800px;margin:0 auto;padding:0 16px">');
    parts.push(readingHtml);
    parts.push('</div>');
    if (closingHtml) {
        parts.push('<div id="readingClosing" style="max-width:800px;margin:0 auto;padding:0 16px">');
        parts.push(closingHtml);
        parts.push('</div>');
    }

    // ---------- Footer ----------
    parts.push('<div class="standalone-footer">');
    parts.push('  <p>Generated by <a href="https://quantummerlin.com/soulblueprint/" target="_blank">A Moment in Time</a> by Quantum Merlin</p>');
    parts.push('</div>');

    // ---------- Form modal ----------
    parts.push('<div class="form-overlay" id="formOverlay" onclick="if(event.target===this)hideForm()">');
    parts.push('  <div class="form-modal">');
    parts.push('    <button class="form-close" onclick="hideForm()">&times;</button>');
    parts.push('    <h2>Generate a New Reading</h2>');
    parts.push('    <p class="form-subtitle">Enter birth details to create a unique cosmic blueprint</p>');
    parts.push('    <form id="newReadingForm" onsubmit="return handleFormSubmit(event)">');
    parts.push('      <div class="form-group"><label>Name</label><input type="text" id="formName" required placeholder="Enter name"></div>');
    parts.push('      <div class="form-group"><label>Date of Birth</label><input type="date" id="formDate" required></div>');
    parts.push('      <div class="form-group"><label>Time of Birth <span class="optional-badge">Optional</span></label><input type="time" id="formTime"></div>');
    parts.push('      <div class="form-group"><label>Place of Birth <span class="optional-badge">Optional</span></label><input type="text" id="formPlace" placeholder="City, Country"></div>');
    parts.push('      <button type="submit" class="submit-btn">Generate Your Reading</button>');
    parts.push('    </form>');
    parts.push('  </div>');
    parts.push('</div>');

    // ---------- Upgrade modal ----------
    parts.push('<div class="upgrade-overlay" id="upgradeOverlay" onclick="if(event.target===this)hideUpgrade()">');
    parts.push('  <div class="upgrade-modal">');
    parts.push('    <button class="upgrade-close" onclick="hideUpgrade()">&times;</button>');
    parts.push('    <h2>✨ Unlock Your Reading</h2>');
    parts.push('    <p class="upgrade-subtitle">Your cosmic blueprint is ready to be generated!<br>Choose your access level below.</p>');
    parts.push('    <div class="upgrade-options">');
    // Option 1: Single reading
    parts.push('      <a class="upgrade-option featured" href="https://www.etsy.com/shop/QuantumMerlin" target="_blank">');
    parts.push('        <span class="upgrade-badge">50% OFF</span>');
    parts.push('        <h3>Single Reading</h3>');
    parts.push('        <div class="price"><span class="original">$19.99</span> $9.99</div>');
    parts.push('        <p class="price-note">Special introductory price</p>');
    parts.push('        <ul class="features">');
    parts.push('          <li>135+ personalised reading cards</li>');
    parts.push('          <li>17 cosmic sections analysed</li>');
    parts.push('          <li>Permanent link to revisit anytime</li>');
    parts.push('          <li>Beautiful shareable format</li>');
    parts.push('        </ul>');
    parts.push('      </a>');
    // Option 2: Unlimited
    parts.push('      <a class="upgrade-option" href="https://www.etsy.com/shop/QuantumMerlin" target="_blank">');
    parts.push('        <h3>Unlimited Readings</h3>');
    parts.push('        <div class="price">$77</div>');
    parts.push('        <p class="price-note">One-time payment &middot; lifetime access</p>');
    parts.push('        <ul class="features">');
    parts.push('          <li>Generate unlimited readings forever</li>');
    parts.push('          <li>All 135+ cards &amp; 17 sections</li>');
    parts.push('          <li>Friends, family, anyone</li>');
    parts.push('          <li>Future features included</li>');
    parts.push('        </ul>');
    parts.push('      </a>');
    parts.push('    </div>');
    parts.push('    <button class="upgrade-back" onclick="hideUpgrade()">Maybe later</button>');
    parts.push('  </div>');
    parts.push('</div>');

    // ---------- JavaScript ----------
    parts.push('<script>');
    // Theme switching
    parts.push('var root=document.documentElement.style;');
    parts.push('var themeMap={girl:{primary:"#FF69B4",secondary:"#FFB6C1",accent:"#FF1493",background:"#FFF0F5",border:"#FFE4EC",cardBg:"#FFFFFF",text:"#4A3347"},boy:{primary:"#6BA3D6",secondary:"#87CEEB",accent:"#4169E1",background:"#F0F8FF",border:"#B0E0E6",cardBg:"#FFFFFF",text:"#2C3E50"},purple:{primary:"#D8B5FF",secondary:"#B19CD9",accent:"#9B59B6",background:"#F8F0FF",border:"#E6D5F7",cardBg:"#FFFFFF",text:"#3D2952"}};');
    parts.push('function setTheme(t){');
    parts.push('  document.body.classList.remove("theme-girl","theme-boy","theme-purple");');
    parts.push('  document.body.classList.add("theme-"+t);');
    parts.push('  var bar=document.getElementById("themeBar");');
    parts.push('  bar.classList.remove("theme-selected-girl","theme-selected-boy","theme-selected-purple");');
    parts.push('  bar.classList.add("theme-selected-"+t);');
    parts.push('  document.querySelectorAll(".theme-bar-btn").forEach(function(b){b.classList.remove("active")});');
    parts.push('  var ab=document.querySelector(".theme-bar-btn[data-theme=\\""+t+"\\"]");if(ab)ab.classList.add("active");');
    parts.push('  var c=themeMap[t]||themeMap.girl;');
    parts.push('  root.setProperty("--primary",c.primary);root.setProperty("--secondary",c.secondary);');
    parts.push('  root.setProperty("--accent",c.accent);root.setProperty("--background",c.background);');
    parts.push('  root.setProperty("--card-border",c.border);root.setProperty("--card-bg",c.cardBg);');
    parts.push('  root.setProperty("--text",c.text);');
    parts.push('}');

    // Section toggle (fixed selector)
    parts.push('function toggleSection(id){');
    parts.push('  var s=document.getElementById("section-"+id);if(!s)return;');
    parts.push('  s.classList.toggle("collapsed");');
    parts.push('  var a=s.querySelector(".section-arrow");');
    parts.push('  if(a)a.textContent=s.classList.contains("collapsed")?"▼":"▲";');
    parts.push('}');

    // Card toggle
    parts.push('function toggleCard(h){');
    parts.push('  var c=h.closest(".reading-card");if(!c)return;');
    parts.push('  c.classList.toggle("expanded");');
    parts.push('  if(c.classList.contains("expanded"))setTimeout(function(){c.scrollIntoView({behavior:"smooth",block:"nearest"})},100);');
    parts.push('}');

    // Sub-section toggle
    parts.push('function toggleSubSection(id){var e=document.getElementById("subsection-"+id);if(e)e.classList.toggle("collapsed")}');

    // Copy all readings
    parts.push('function copyAllReadings(){var c=document.getElementById("readingsContainer");if(!c)return;var t=c.innerText;navigator.clipboard.writeText(t).then(function(){alert("Reading copied to clipboard!")}).catch(function(){})}');

    // No-ops for removed features
    parts.push('function markCardAsRead(){}');
    parts.push('function sbTrack(){}');

    // Form & upgrade modals
    parts.push('function showForm(){document.getElementById("formOverlay").classList.add("visible")}');
    parts.push('function hideForm(){document.getElementById("formOverlay").classList.remove("visible")}');
    parts.push('function showUpgrade(){document.getElementById("upgradeOverlay").classList.add("visible")}');
    parts.push('function hideUpgrade(){document.getElementById("upgradeOverlay").classList.remove("visible")}');
    parts.push('function handleFormSubmit(e){e.preventDefault();hideForm();showUpgrade();return false}');

    // Close on Escape
    parts.push('document.addEventListener("keydown",function(e){if(e.key==="Escape"){hideForm();hideUpgrade()}});');

    // Split closing tag to avoid HTML parser issue
    parts.push('<' + '/script>');
    parts.push('</body>');
    parts.push('</html>');
    return parts.join('\n');
}

main().catch(err => {
    console.error('FATAL:', err.message || err);
    process.exit(1);
});
