# Agent: DEPLOY
> **Role:** Deployment and infrastructure guardian — Cloudflare Pages, headers, redirects, PWA, service worker, sitemap, git workflow, caching, SEO config.

---

## Deployment Architecture

```
GitHub (main branch)
    │
    ▼  (push triggers auto-deploy)
Cloudflare Pages
    │
    ├── quantummerlin.com (primary domain)
    ├── Cloudflare Workers (shared reading links)
    └── Cloudflare KV (reading data store)
```

**Workflow:** Push to `main` → Cloudflare Pages auto-deploys → live in ~30 seconds.

There is **no build step** (no `npm run build`). Cloudflare deploys the repo contents as-is. The only exception is `chinesezodiac/` which has its own Vite build.

---

## Git Workflow

### Branch Strategy
- **`main`** — production. Every push deploys immediately.
- No staging or dev branches in regular use.

### Commit Rules
1. One logical change per commit
2. Descriptive message: WHAT changed + WHY
3. When fixing bugs in shared code, list ALL affected files
4. Push frequently — don't accumulate large uncommitted changes
5. Never force push to `main`

### Before Pushing
- [ ] All files saved
- [ ] No syntax errors in modified JS files
- [ ] Tested at least one affected page locally
- [ ] Checked cross-brand propagation (if touching shared code)
- [ ] Sitemap updated (if adding new root-level pages)

---

## Cloudflare Configuration

### `_headers` File
Located at repo root. Controls HTTP headers per path pattern.

**Current rules:**
```
/*                           → Cache-Control: must-revalidate, security headers (XSS, X-Frame, etc.)
/*.html                      → Cache-Control: must-revalidate (always fresh)
/*.js, /*.css                → max-age=300 (5 min cache)
/assets/*                    → max-age=31536000, immutable (1 year cache)
/shared/*                    → max-age=300 (5 min cache)
```

**Noindex rules (X-Robots-Tag: noindex, nofollow):**
- All `.py`, `.ps1`, `.md`, `.txt`, `.odt`, `.pdf`, `.log`, `.json`, `.xml`, `.zip`, `.mp4`, `.mov` files
- `wrangler.toml`, `sw.js`
- Backup/dev HTML files (index-local-backup, etc.)
- `soulblueprint/s/*` (hidden pro generator)

### `_redirects` File
Located at repo root. Cloudflare Pages redirects.

**Current rules:**
```
# Shared reading links (200 = rewrite, not redirect)
/soulblueprint/r/*   → /soulblueprint/view.html?id=:splat  200
/amomentintime/r/*   → /amomentintime/view.html?id=:splat  200
/amomentintime/esp/r/* → /amomentintime/esp/view.html?id=:splat  200
/amomentintime/pt/r/*  → /amomentintime/pt/view.html?id=:splat  200

# 301 consolidation redirects
/about.html          → /about-new.html     301
/contact.html        → /contact-new.html   301
/compatabilty.html   → /compatibility.html 301  (typo fix)
/index-local-backup  → /                   301
/soulcard-old-backup → /soulcard.html      301

# Trailing slash normalization
/amomentintime      → /amomentintime/     301
/amomentintime/esp  → /amomentintime/esp/ 301
/amomentintime/pt   → /amomentintime/pt/  301
```

### CNAME
```
quantummerlin.com
```

### Cloudflare Workers
- **Purpose:** Handle shared reading link resolution (reading ID → KV lookup → reading data)
- **Config:** `wrangler.toml` at repo root
- **KV namespace:** Stores reading JSON objects with reading IDs as keys
- **Flow:** User generates reading → saved to KV → shareable link → Worker fetches from KV → `view.html` renders

---

## PWA Configuration

### `manifest.json`
```json
{
  "name": "Quantum Reality Codes",
  "short_name": "QRC",
  "description": "Transform intentions into reality through sacred mathematics",
  "start_url": "./index.html",
  "display": "standalone",
  "background_color": "#0a0a0f",
  "theme_color": "#00f5ff",
  "orientation": "portrait"
}
```

### `sw.js` (Service Worker)
- Located at repo root for maximum scope
- Caches static assets for offline use
- Network-first strategy for HTML (always try fresh)
- Cache-first for CSS, JS, images, fonts
- Fallback to `offline.html` when network unavailable

### Required Meta Tags (every page)
```html
<meta name="theme-color" content="#0a0e27">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

---

## SEO Configuration

### `robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://quantummerlin.com/sitemap.xml
```

### `sitemap.xml`
- Lists all public-facing HTML pages
- Must be updated when adding new root-level pages
- Brand subfolder pages handle their own discovery via internal linking

### Per-Page SEO Requirements
```html
<meta name="description" content="[60-160 chars, unique per page]">
<meta name="keywords" content="[relevant keywords]">
<meta property="og:title" content="[Page title]">
<meta property="og:description" content="[Same as meta description]">
<meta property="og:type" content="website">
<meta property="og:url" content="https://quantummerlin.com/[path]">
<link rel="canonical" href="https://quantummerlin.com/[path]">
```

### SEO Scripts
- `seo_optimize_all.py` — Batch SEO tag optimisation for root pages
- `seo_optimize_subfolders.py` — Same for subfolder pages
- Run these when doing bulk SEO updates

---

## Adding a New Page

### Root-Level Pages
1. Create `pagename.html` at repo root
2. Add to `sitemap.xml`
3. Add `_headers` rules if needed (noindex for dev pages)
4. Include shared components (background, header, footer, scripts)
5. Include proper `<head>` meta tags (see SEO section)
6. Test locally, commit, push

### Brand-Level Pages
1. Create `brand/pagename.html`
2. Wire shared CSS from `../shared/css/` (check path depth)
3. Wire shared JS from `../shared/js/`
4. Include brand-specific navigation
5. Add to brand's index/hub tool list
6. Test locally, commit, push

### Adding a New Redirect
1. Edit `_redirects` at repo root
2. Format: `source  destination  statusCode`
3. 200 = rewrite (invisible), 301 = permanent redirect
4. Put more specific rules FIRST (Cloudflare matches top-down)

---

## Analytics Integration

### Google Analytics (GA4)
- Loaded via `shared/js/quantum-analytics.js`
- Tracks page views automatically
- Custom events for tool completion, reading generation, CTA clicks
- The `analytics-integration.js` at root provides additional event tracking

### Google AdSense
- Managed via `add_adsense.py` / `add-adsense.ps1` scripts
- `check_adsense.py` validates placement
- See [MONETIZE.md](MONETIZE.md) for ad strategy

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Changes not showing after push | Hard refresh (Ctrl+Shift+R), check Cloudflare dashboard for deployment status |
| 404 on new page | Ensure file exists at correct path, check `_redirects` for conflicts |
| Shared CSS/JS not loading | Verify relative path depth (../ vs ../../) matches page location |
| Service worker serving stale content | Update SW version, or user can clear browser cache |
| Redirect loop | Check `_redirects` for circular rules |
| KV reading not loading | Check Cloudflare Workers dashboard, verify KV binding |
| Font not loading | Verify Google Fonts `<link>` in `<head>`, check CSP headers |

---

*Consult [ARCHITECT.md](ARCHITECT.md) for full directory structure.*
*Consult [QA.md](QA.md) for pre-deployment checklist.*
