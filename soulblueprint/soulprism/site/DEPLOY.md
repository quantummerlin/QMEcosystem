# Visual Soul Blueprint — Deployment Guide

## Site Structure

```
site/
├── index.html                  # Landing page
├── css/main.css               # Complete CSS framework (1241 lines)
├── js/main.js                 # JavaScript functionality (207 lines)
├── guides/
│   ├── visual-blueprint.html  # Full visual guide (10 sections)
│   ├── quick-start.html       # 5-minute quick start
│   ├── transformations.html   # 60+ free transformations (9 categories)
│   ├── premium-transformations.html  # 21 premium transformations
│   └── examples.html          # Leo Sun step-by-step demo
├── netlify.toml               # Netlify config
├── _headers                   # Security headers
└── .nojekyll                  # GitHub Pages config
```

## Deploy Options

### Option 1: Netlify (Recommended — Free)

**Via Netlify CLI:**
```bash
npm install -g netlify-cli
cd soulprism/site
netlify login
netlify init
netlify deploy --prod --dir .
```

**Via Netlify Dashboard:**
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Deploy manually"
3. Drag the `site/` folder onto the drop zone
4. Done! You'll get a URL like `https://random-name.netlify.app`
5. Set custom domain in Site settings → Domain management

### Option 2: GitHub Pages

1. Create a new repo (e.g., `soulprism-site`)
2. Copy the `site/` contents to the repo root
3. Push to GitHub
4. Go to Settings → Pages → Source: Deploy from branch → main → / (root)
5. Site will be at `https://quantummerlin.github.io/soulprism-site/`

### Option 3: Vercel

```bash
npm install -g vercel
cd soulprism/site
vercel --prod
```

### Option 4: Deploy from QMEcosystem Repo

If using Netlify with the existing repo:
- **Base directory:** `soulblueprint/soulprism/site`
- **Publish directory:** `.`
- **Build command:** (none — static site)

## Custom Domain Setup

After deploying, set your custom domain:
- **Netlify:** Site settings → Domain management → Add custom domain
- **GitHub Pages:** Settings → Pages → Custom domain
- Add CNAME record pointing to your deployment URL

## Post-Deploy Checklist

- [ ] All 6 pages load correctly
- [ ] Navigation works between all pages
- [ ] Copy-to-clipboard works on prompt boxes
- [ ] Mobile responsive layout works
- [ ] Progress tracking saves/loads in Visual Guide
- [ ] Accordion sections expand/collapse on Transformations pages
- [ ] External links open in new tabs
- [ ] Replace AdSense placeholders with real ad units (optional)
