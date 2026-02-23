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

    const parts = [];
    parts.push('<!DOCTYPE html>');
    parts.push('<html lang="en">');
    parts.push('<head>');
    parts.push('<meta charset="UTF-8">');
    parts.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    parts.push('<title>A Moment in Time for ' + escapeHtml(name) + '</title>');
    parts.push('<meta name="robots" content="noindex, nofollow">');
    parts.push('<meta property="og:title" content="A Moment in Time for ' + escapeHtml(name) + '">');
    parts.push('<meta property="og:description" content="A personalised birth moment reading">');
    parts.push('<link rel="preconnect" href="https://fonts.googleapis.com">');
    parts.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
    parts.push('<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">');
    parts.push('<style>');
    parts.push(allCss);
    parts.push('/* Standalone overrides */');
    parts.push('body{margin:0;padding:0;font-family:var(--font-body);background:var(--background);color:var(--text)}');
    parts.push('#loadingOverlay,#inputSection,#myReadingsSection,.cookie-banner,nav,.gift-box,.coffee-box,.sticky-progress-header,.reading-nav-float,.gift-dialog-overlay,#gift-share-dialog,.quick-transform-section,.expand-all-section,.completion-celebration,.gift-support-section,.playbook-navigation,.example-banner,.book-template-section,.discover-links,.hero-progress,.card-actions,.mark-read-btn,.read-badge,.section-mark-read-btn,.new-reading-prompt,.ai-transform-banner,.ai-transform-callout,.ai-banner-dismiss,.fulfill-upgrade-card,.ad-container,.ad-placeholder,.theme-bar,.cookie-consent{display:none!important}');
    parts.push('.reading-card{cursor:pointer}');
    parts.push('.reading-card.expanded .reading-card-body{max-height:20000px;overflow:visible}');
    parts.push('.reading-header{text-align:center;padding:40px 20px 20px;max-width:800px;margin:0 auto}');
    parts.push('.reading-header h1{font-family:var(--font-heading);font-size:2rem;margin-bottom:8px}');
    parts.push('.reading-header .birth-info{font-size:1rem;opacity:0.8}');
    parts.push('.standalone-footer{text-align:center;padding:40px 20px;opacity:0.6;font-size:0.85rem}');
    parts.push('.standalone-footer a{color:var(--primary);text-decoration:none}');
    parts.push('</style>');
    parts.push('</head>');
    parts.push('<body class="theme-girl">');
    parts.push('<div class="reading-header">');
    parts.push('  <h1>A Moment in Time for ' + escapeHtml(name) + '</h1>');
    parts.push('  <p class="birth-info">' + escapeHtml(birthInfo) + '</p>');
    parts.push('</div>');
    parts.push('<div id="readingsContainer" style="max-width:800px;margin:0 auto;padding:0 16px">');
    parts.push(readingHtml);
    parts.push('</div>');
    if (closingHtml) {
        parts.push('<div id="readingClosing" style="max-width:800px;margin:0 auto;padding:0 16px">');
        parts.push(closingHtml);
        parts.push('</div>');
    }
    parts.push('<div class="standalone-footer">');
    parts.push('  <p>Generated by <a href="https://quantummerlin.com/soulblueprint/" target="_blank">A Moment in Time</a> by Quantum Merlin</p>');
    parts.push('</div>');
    parts.push('<script>');
    parts.push('function toggleCard(h){var c=h.closest(".reading-card");if(!c)return;c.classList.toggle("expanded");if(c.classList.contains("expanded"))setTimeout(function(){c.scrollIntoView({behavior:"smooth",block:"nearest"})},100)}');
    parts.push('function toggleSubSection(id){var e=document.getElementById("subsection-"+id);if(e)e.classList.toggle("collapsed")}');
    parts.push('function toggleSection(id){var e=document.getElementById("section-wrapper-"+id);if(!e)return;var c=e.querySelector(".section-content");if(c)c.classList.toggle("collapsed")}');
    parts.push('function markCardAsRead(){}');
    parts.push('function sbTrack(){}');
    // Avoid </script> inside script - split the closing tag
    parts.push('<' + '/script>');
    parts.push('</body>');
    parts.push('</html>');
    return parts.join('\n');
}

main().catch(err => {
    console.error('FATAL:', err.message || err);
    process.exit(1);
});
