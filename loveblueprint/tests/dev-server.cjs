#!/usr/bin/env node
// ============================================================
// SOUL SPARK — LAN DEV SERVER (mobile testing)
// ============================================================
// Serves the soulblueprint/ folder on every interface so a phone
// on the same Wi-Fi can open the REAL prototype over HTTP:
//
//   http://<PC-LAN-IP>:8123/loveblueprint/prototype.html
//
// Why a server (not file://):
//   * relative engine paths (../geo-data.js) resolve exactly like
//     production (quantummerlin.com/soulblueprint/...)
//   * localStorage is per-origin & reliable
//   * no CORS oddities on file://
// Root = soulblueprint/ ONLY — nothing outside it is exposed.
// Path traversal is blocked. Run:  node loveblueprint/tests/dev-server.cjs
// Stop: Ctrl+C (or kill the terminal).
// ============================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = path.resolve(__dirname, '..', '..'); // soulblueprint/
const PORT = Number(process.env.PORT || 8123);
const HOST = '0.0.0.0';

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.cjs': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
    '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff',
    '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8',
    '.manifest': 'application/manifest+json', '.webmanifest': 'application/manifest+json'
};

function lanIps() {
    const out = [];
    const ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(name => {
        (ifaces[name] || []).forEach(i => {
            if (i.family === 'IPv4' && !i.internal) out.push(i.address);
        });
    });
    return out;
}

const server = http.createServer((req, res) => {
    let urlPath;
    try { urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
    catch (e) { res.writeHead(400); return res.end('Bad request'); }

    // Normalize + block traversal outside ROOT
    let filePath = path.normalize(path.join(ROOT, urlPath));
    if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
        res.writeHead(403); return res.end('Forbidden');
    }
    try {
        if (fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
    } catch (e) { /* falls through to 404 */ }

    fs.readFile(filePath, (err, data) => {
        if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('Not found: ' + urlPath); }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
            'Content-Type': MIME[ext] || 'application/octet-stream',
            'Cache-Control': 'no-store', // dev server: always fresh on reload
            'Access-Control-Allow-Origin': '*'
        });
        res.end(data);
    });
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.error('Port ' + PORT + ' is already in use. Try: set PORT=8124 and re-run.');
        process.exit(1);
    }
    throw e;
});

server.listen(PORT, HOST, () => {
    const ips = lanIps();
    console.log('');
    console.log('  SOUL SPARK DEV SERVER — serving repo root (mirrors production)');
    console.log('  ===================================================');
    console.log('  On this PC :  http://localhost:' + PORT + '/loveblueprint/prototype.html');
    if (ips.length) {
        console.log('  On your phone (same Wi-Fi as this PC):');
        ips.forEach(ip => console.log('      http://' + ip + ':' + PORT + '/loveblueprint/prototype.html'));
    } else {
        console.log('  No LAN IP found — is Wi-Fi/Ethernet connected?');
    }
    console.log('  ===================================================');
    console.log('  If the phone cannot connect: Windows Firewall may be');
    console.log('  blocking node.exe on Private networks. Allow it once,');
    console.log('  or run the "unblock firewall" note in the chat.');
    console.log('  Stop serving: Ctrl+C');
    console.log('');
});
