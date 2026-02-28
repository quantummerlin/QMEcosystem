# Agent: ARCHITECT
> **Role:** Code structure guardian — module dependencies, file organisation, shared infrastructure, propagation rules.

---

## Stack Overview

| Layer | Tech | Notes |
|---|---|---|
| Frontend | Vanilla HTML + CSS + JS | No framework, no build step |
| Exception | `chinesezodiac/` | Vite + TypeScript + Tailwind CSS |
| Fonts | Google Fonts CDN | Cinzel Decorative, Cormorant Garamond, Orbitron, Exo 2 |
| Analytics | Google Analytics + gtag.js | Via `shared/js/quantum-analytics.js` |
| Ads | Google AdSense | Auto-ads + manual placements |
| PWA | Service Worker + manifest.json | `sw.js` at root |
| Hosting | Cloudflare Pages | Deploys on push to `main` |
| Server-side | Cloudflare Workers + KV | Only for shared reading links |
| PDF | html2canvas + jsPDF | For downloadable readings |

---

## Directory Architecture

### Brand Folders (full tool suites)
Each brand folder is a near-complete copy of the ecosystem. Typical folder contents:

```
brand-folder/
├── index.html              # Homepage / gateway
├── calculations.js         # Core engine (numerology, astrology, zodiac, moon, biorhythm)
├── readings.js             # Base reading text content
├── readings-extended.js    # Extended reading text content  
├── deep-*.js               # 12+ deep reading content modules:
│   ├── deep-astrology.js
│   ├── deep-biorhythm.js
│   ├── deep-challenges.js
│   ├── deep-chinese-zodiac.js
│   ├── deep-destiny.js
│   ├── deep-expression.js
│   ├── deep-gematria.js
│   ├── deep-moon.js
│   ├── deep-numerology.js
│   ├── deep-pinnacles.js
│   ├── deep-soul-urge.js
│   └── deep-tarot.js
├── forecast*.html          # Forecast tools
├── forecasts/
│   ├── engine.js           # CosmicEngine — forecast generation
│   └── forecast/engine.js  # (some brands have nested copy)
├── *.html                  # Individual tool pages (20-80+ per brand)
└── styles/                 # Brand-specific CSS (optional)
```

### Brands That Follow This Pattern
| Folder | Brand | Notes |
|---|---|---|
| `classic/` + `classic/readings/` | Classic | Readings subfolder has its own calculations.js |
| `stranger/` | Stranger | Stranger Things themed |
| `kpop/` + `kpop/readings/` | K-Pop | Readings subfolder structure |
| `kosmickpop/` | Kosmick Pop | Extended K-Pop with 80+ exclusive tools |
| `ultimate/` | Ultimate | Reference engine, source of truth for calculations |
| `soulblueprint/` | Soul Blueprint | Separate product (not part of ecosystem) |
| `amomentintime/` | A Moment In Time | Multi-language (esp/, pt/) |
| `genesis/` | Genesis | Solfeggio frequency focus |
| `40hz/` | 40Hz | Gamma wave focus |
| `Expand/` | Expand | Extended hub |

### Shared Infrastructure
```
shared/
├── css/
│   ├── quantum-variables.css     # Design tokens (colours, spacing, typography, z-index)
│   ├── quantum-base.css          # Reset, body, scrollbar, selection styles
│   ├── quantum-core.css          # Core layout: containers, cards, grids, sections
│   ├── quantum-components.css    # Buttons, inputs, badges, progress, tags, tooltips
│   ├── quantum-navigation.css    # Sidebar nav, mobile hamburger, breadcrumbs
│   ├── quantum-animations.css    # Keyframes: pulse, float, shimmer, glow, fade  
│   ├── quantum-backgrounds.css   # Particle field, grid floor, gradients, orbs
│   └── quantum-intro.css         # Intro/onboarding overlay styles
├── js/
│   ├── quantum-analytics.js      # GA4 + custom event tracking
│   ├── quantum-donations.js      # Buy Me a Coffee widget
│   ├── quantum-effects.js        # Particle effects, cursor trails, glow animations
│   ├── quantum-feedback.js       # User feedback collection
│   ├── quantum-intro-animation.js # Cosmic loading animation
│   ├── quantum-intro.js          # Onboarding flow logic
│   ├── quantum-nav.js            # Sidebar navigation + mobile menu
│   ├── quantum-onboarding.js     # First-visit welcome flow
│   └── quantum-profile.js        # LocalStorage profile management
├── components/
│   ├── background.html           # Animated background (particles, grid, orbs)
│   ├── footer.html               # Standard footer with links
│   ├── head-meta.html            # Common <head> meta tags
│   ├── header.html               # Navigation header
│   ├── intro-animation.html      # Loading animation overlay
│   ├── scripts.html              # Common script includes
│   └── welcome-flow.html         # First-visit onboarding modal
└── images/                       # Shared image assets
```

---

## Source of Truth — Canonical Files

These are the MASTER copies. All other copies must stay synchronised.

### calculations.js — `amomentintime/calculations.js`
Contains ALL calculation formulas:
- `calculateLifePath(birthDate)` — Numerology Life Path with Master Number detection
- `calculateDestinyNumber(name)` — Name-based destiny via Pythagorean values
- `calculateSoulUrge(name)` — Vowel reduction
- `calculateExpression(name)` — Full name reduction
- `calculatePersonalYear/Month/Day(birthDate)` — Personal cycle numbers
- `calculateKarmicDebt(number)` — 13, 14, 16, 19 detection
- `calculatePinnacles(birthDate)` — Four pinnacle periods
- `calculateChallenges(birthDate)` — Four challenge numbers
- `getZodiacSign(month, day)` — Western sun sign
- `calculateChineseZodiac(birthDate)` — Animal + element with LNY check
- `getMoonPhase(date)` — Current moon phase calculation
- `calculateBiorhythm(birthDate, targetDate)` — 5-cycle biorhythm
- `calculateGematria(text)` — English Ordinal (A=1...Z=26)
- `getAngelNumberMeaning(number)` — Repeating number patterns
- `calculateTarotCard(number)` — Major Arcana mapping
- `getPlanetaryPositions(birthDate)` — Simplified planetary placement

Brand copies at: `stranger/calculations.js`, `kpop/readings/calculations.js`, `classic/readings/calculations.js`, `amomentintime/calculations.js`, `amomentintime/esp/calculations.js`, `amomentintime/pt/calculations.js`, `ultimate/calculations.js`

### engine.js — `amomentintime/forecasts/engine.js`
Contains the `CosmicEngine` object:
- `chineseZodiac.calculateForDate(date)` — Date-aware zodiac (with LNY table)
- `chineseZodiac.currentYearEnergyForDate(date, birthAnimal)` — Current year energy
- `generateForecast(name, birthDate, targetDate)` — Daily/weekly/monthly forecast
- `generateYearlyForecast(name, birthDate, year)` — Annual overview
- `birthChart(name, birthDate)` — Full birth chart synthesis

Brand copies at: `stranger/forecasts/engine.js`, `kpop/readings/forecasts/engine.js`, `classic/readings/forecasts/engine.js`, `amomentintime/forecasts/forecast/engine.js`

### Reading Content — `ultimate/readings.js` + `ultimate/readings-extended.js`
Contains all base reading text, interpretations, and descriptors used by the reading generator.

### Deep Reading Modules — `ultimate/deep-*.js`
12+ modules containing deep interpretive text for each mystical system. These are content (not logic) — they provide the paragraphs, lists, and guidance text that gets injected into readings.

---

## Propagation Rules

### When You Fix a Bug in Any Canonical File:
1. Fix it in the canonical source first
2. Run: `find . -name "<filename>" -not -path "*/node_modules/*"` to find all copies
3. Apply the same fix to EVERY copy
4. Test at least 2 brand copies to verify consistency
5. Commit ALL changed files in a single atomic commit
6. List all affected files in the commit message

### When You Add a New Feature:
1. Prototype in the canonical source
2. Only propagate after feature is stable
3. If the feature needs brand-specific variation, add a configuration parameter rather than forking the code

### When You Create a New Tool Page:
1. Copy the closest existing tool as a template
2. Update `<title>`, `<meta>`, all heading text, all function names
3. Wire the shared components: background, header, footer, scripts
4. Ensure it appears in the brand's navigation/hub
5. Add to `sitemap.xml` if it's a root-level page

---

## LocalStorage Schema

All user data is stored in `localStorage`. The main keys:

| Key | Contents | Used By |
|---|---|---|
| `userName` | User's display name | Personalisation across all tools |
| `userBirthDate` | YYYY-MM-DD format | All calculation-based tools |
| `userProfile` | JSON object with calculated traits | Profile page, reading generator |
| `savedReadings` | Array of generated reading objects | Library page |
| `toolHistory` | Array of tools visited | Navigation, recommendations |
| `preferences` | Theme, notifications, etc. | Settings |
| `onboardingComplete` | Boolean | Welcome flow gate |

**Critical rule:** Never clear `localStorage` unless the user explicitly requests it. Never assume keys exist — always check with `localStorage.getItem()` and have fallbacks.

---

## Module Loading Pattern

Since there's no bundler, modules load via `<script>` tags in specific order:

```html
<!-- 1. Calculations engine (must load first) -->
<script src="calculations.js"></script>

<!-- 2. Reading content -->
<script src="readings.js"></script>
<script src="readings-extended.js"></script>

<!-- 3. Deep reading modules (load on demand) -->
<script src="deep-astrology.js"></script>
<!-- ... -->

<!-- 4. Shared infrastructure -->
<script src="../shared/js/quantum-analytics.js"></script>
<script src="../shared/js/quantum-nav.js"></script>
<script src="../shared/js/quantum-effects.js"></script>
<script src="../shared/js/quantum-profile.js"></script>

<!-- 5. Page-specific logic (inline or external) -->
<script>
  // Page initialization
</script>
```

**Path depth matters.** A page at `brand/tool.html` uses `../shared/`, but a page at `brand/sub/tool.html` uses `../../shared/`.

---

## Anti-Patterns to Avoid

1. **Don't add npm dependencies** for frontend code (except `chinesezodiac/`)
2. **Don't create a build step** — the site deploys as-is
3. **Don't use ES modules (`import/export`)** in brand pages — they use global scope via `<script>` tags
4. **Don't modify a brand copy without checking the canonical source** — you might overwrite a fix
5. **Don't create new calculation formulas outside calculations.js** — ALL math goes in that one file
6. **Don't hardcode birth dates or names** — always read from `localStorage` or form input
7. **Don't use `document.write()`** — ever
8. **Don't skip the LNY check** in Chinese zodiac calculations

---

*Consult [COUNCIL.md](COUNCIL.md) for the full ecosystem map.*
*Consult [BRANDING.md](BRANDING.md) before any UI changes.*
*Consult [CALCULATIONS.md](CALCULATIONS.md) before any formula changes.*
