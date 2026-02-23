# Quantum Merlin Agent Council — Master Index

> **Purpose:** This folder contains the collective intelligence of the Quantum Merlin Ecosystem. Any AI agent working on any part of this codebase MUST read this file first, then consult the relevant specialist agent files before making changes.

---

## The Ecosystem at a Glance

**Quantum Merlin** is a spiritual technology ecosystem — a constellation of web apps that combine numerology, astrology, tarot, Chinese zodiac, moon phases, frequency healing, biorhythm, gematria, angel numbers, and psychological micro-tools into branded experiences.

- **Domain:** quantummerlin.com
- **Hosting:** Cloudflare Pages + Workers + KV
- **Stack:** Vanilla HTML/CSS/JS — no build step (except `chinesezodiac/` which uses Vite+TS)
- **Scale:** ~20 branded variants, 100+ tools per full brand, 50,000+ words of reading content
- **Revenue model:** Hybrid — AdSense + Etsy + Buy Me a Coffee + planned subscriptions

---

## The Agent Council

| Agent File | Domain | When to Consult |
|---|---|---|
| [ARCHITECT.md](ARCHITECT.md) | Code structure, module dependencies, shared infrastructure | Adding/modifying any JS module, creating new tools, refactoring |
| [BRANDING.md](BRANDING.md) | Design systems, CSS tokens, fonts, per-brand visual rules | Any UI work, new pages, styling changes |
| [CALCULATIONS.md](CALCULATIONS.md) | Numerology, astrology, Chinese zodiac, moon, biorhythm formulas | Any calculation logic, fixing bugs in spiritual engines |
| [CONTENT.md](CONTENT.md) | Reading text, tone variations, micro-tool template, voice rules | Writing readings, adjusting tone, creating content for new tools |
| [DEPLOY.md](DEPLOY.md) | Cloudflare, headers, redirects, PWA, sitemap, git workflow | Deployment, new routes, cache, service worker, SEO config |
| [PILLARS.md](PILLARS.md) | All branded sites — what exists, what's unique, what's missing | Working within any specific brand, understanding tool inventory |
| [MONETIZE.md](MONETIZE.md) | Revenue strategy, AdSense, Etsy, freemium, analytics, SEO | Payment integration, ad placement, conversion optimization |
| [QA.md](QA.md) | Testing, validation, consistency checks, deployment checklists | Before any commit, verifying calculations, cross-brand consistency |

---

## Golden Rules (Every Agent Must Follow)

### 1. Single Source of Truth
**Never copy shared logic.** The following files are canonical sources. Changes MUST be made in the source and propagated to all consumers:

| Canonical Source | Consumers | What It Contains |
|---|---|---|
| `soulblueprint/calculations.js` | 7 brand copies of `calculations.js` | All astrology + numerology + Chinese zodiac + moon phase calculations |
| `amomentintime/forecasts/engine.js` | 4 brand copies of `engine.js` | CosmicEngine — forecast generation, daily/weekly/monthly/yearly |
| `shared/css/quantum-*.css` | All branded sites | Design token system, base styles, animations, components |
| `shared/js/quantum-*.js` | All branded sites | Analytics, donations, effects, nav, profile, onboarding |
| `shared/components/*.html` | All branded sites | Header, footer, background, intro, scripts, meta, welcome flow |

**When you fix a bug or add a feature to any of these, you MUST update ALL copies.** Use grep to find them:
```bash
# Find all copies of calculations.js
find . -name "calculations.js" -not -path "*/node_modules/*"

# Find all copies of engine.js in forecasts folders
find . -path "*/forecasts/engine.js"
```

### 2. Lunar New Year Rule
All Chinese zodiac calculations MUST check the actual lunar new year date before determining the zodiac year. Never use raw `year % 12` without first checking if the date is before or after LNY. See [CALCULATIONS.md](CALCULATIONS.md) for the full rule and date table.

### 3. Brand Fidelity
Every page must correctly implement its brand's design system. There are TWO design systems — see [BRANDING.md](BRANDING.md):
- **QME Elegant** (purple/gold, Cinzel, serif) — Soul Blueprint, Classic, A Moment In Time
- **QRC Synthwave** (neon cyan/magenta, Orbitron, tech) — Genesis, 40Hz, Reality Codes

K-Pop and Stranger have their own overlays on top of QME Elegant.

### 4. The Six-Section Micro-Tool Template
All psychological micro-tools (energy leak, trust radar, identity split, etc.) follow the same structure. See [CONTENT.md](CONTENT.md).

### 5. Mobile First
All tools must work on 320px viewport. Test on mobile before committing.

### 6. No External Dependencies
The ecosystem is intentionally dependency-free (no React, no npm packages for frontend). Keep it that way. The only exceptions:
- Google Fonts (loaded via CDN)
- Google Analytics / AdSense
- Buy Me a Coffee widget
- html2canvas / jsPDF for PDF generation

### 7. LocalStorage is the Database
User data lives in `localStorage`. There is no backend database. The only server-side storage is Cloudflare KV for shared reading links. Respect this constraint.

### 8. Commit Discipline
- Group related changes into atomic commits
- Always describe WHAT changed and WHY in the commit message
- After fixing a bug in shared code, list ALL files affected
- Push frequently — the site deploys on push to `main`

---

## Ecosystem Architecture Map

```
quantummerlin.com/
│
├── PILLAR BRANDS (full tool suites, 80+ tools each)
│   ├── classic/           — Professional numerology & astrology
│   ├── stranger/          — Stranger Things themed oracle
│   ├── genesis/           — Solfeggio frequency generator
│   └── 40hz/              — Gamma wave cognitive enhancement
│
├── SOUL BLUEPRINT FAMILY (reading generators)
│   ├── ultimate/          — Core engine (source of truth)
│   ├── soulblueprint/     — Main branded deployment
│   └── amomentintime/     — Gift-oriented variant (multi-language)
│       ├── esp/           — Spanish
│       └── pt/            — Portuguese
│
├── K-POP BRANDS
│   ├── kpop/              — K-Pop themed numerology
│   └── kosmickpop/        — Advanced K-Pop with 80+ exclusive tools
│
├── HUB & EXPANSION
│   ├── quantum-merlin-hub/ — Central tool hub
│   ├── Expand/             — Extended hub + experimental tools
│   └── tools/              — Micro-embeddable widgets
│
├── STANDALONE
│   ├── gravity/ & gravity7/ — Gravity branded reading apps
│   ├── lifestrategy/        — Life Strategy Calendar
│   ├── chinesezodiac/       — Modern Vite+TS Chinese zodiac app
│   └── pt/                  — Portuguese translations
│
├── SHARED INFRASTRUCTURE
│   ├── shared/css/          — Design token system (8 CSS files)
│   ├── shared/js/           — Common JS modules (9 files)
│   ├── shared/components/   — Reusable HTML fragments (7 files)
│   ├── cloudflare/          — Worker scripts + KV config
│   ├── sw.js                — Service worker
│   └── manifest.json        — PWA manifest
│
├── ROOT-LEVEL TOOLS (main site sampler)
│   ├── index.html           — Homepage / gateway
│   ├── compatibility.html   — 7-dimension compatibility
│   ├── angel-number-*.html  — Angel number calculators
│   ├── birth-sigil.html     — Sacred geometry sigils
│   ├── trust-radar.html     — Psychological micro-tool
│   ├── energy-leak.html     — Energy leak locator
│   ├── forecasts.html       — Main forecast tool
│   └── [20+ more tools]
│
└── COUNCIL (you are here)
    └── agents/              — AI agent instruction files
```

---

## The Nine Mystical Systems

Everything in the ecosystem draws from these nine systems. Every tool should connect back to at least one:

1. **Numerology** — Life Path, Destiny, Soul Urge, Expression, Personal Year/Month/Day, Master Numbers, Karmic Debt, Pinnacles, Challenges
2. **Western Astrology** — Sun through Pluto, Chiron, Lilith, Nodes, Houses, Aspects, Stelliums, Modalities
3. **Chinese Zodiac** — 12 animals × 5 elements × yin/yang, lunar calendar aware
4. **Tarot** — 78 cards (22 Major + 56 Minor Arcana), multiple spread types
5. **Moon Phases** — 8 phases, birth moon significance, current phase guidance
6. **Frequency Healing** — Solfeggio (9 frequencies), binaural beats, isochronic tones, 40Hz gamma
7. **Gematria & Angel Numbers** — English Ordinal (A=1...Z=26), repeating number patterns, Reality Codes
8. **Biorhythm** — Physical (23-day), Emotional (28-day), Intellectual (33-day), Intuitive (38-day), Spiritual (53-day)
9. **Sacred Geometry** — Sigils, symbols, visual manifestation tools

---

## Quick Reference: Key Files

| Need | File |
|---|---|
| All calculation formulas | `soulblueprint/calculations.js` (canonical) |
| Forecast engine | `amomentintime/forecasts/engine.js` (canonical) |
| Reading content | `ultimate/readings.js` + `readings-extended.js` |
| Deep readings | `ultimate/deep-*.js` (12+ modules) |
| Compatibility engine | `compatability.js` (root) |
| Angel number engine | `angel-number-full-reading-engine.js` (root) |
| Brand design tokens | `shared/css/quantum-variables.css` |
| Shared components | `shared/components/*.html` |
| Deployment config | `_headers`, `_redirects`, `robots.txt`, `sitemap.xml` |
| PWA config | `sw.js`, `manifest.json` |
| Strategic vision | `2026-ECOSYSTEM-STRATEGIC-PLAN.md` |

---

*Last updated: February 2026*
*This file is the entry point. Always start here.*
