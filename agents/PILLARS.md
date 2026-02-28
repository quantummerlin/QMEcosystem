# Agent: PILLARS
> **Role:** Brand encyclopedia — what exists in each brand, what's unique, what's shared, what's missing. The complete map of every branded site in the ecosystem.

---

## Ecosystem Inventory: ~915 HTML Pages Across 15+ Brands

---

## TIER 1: The Four Pillars (Full Tool Suites)

### Classic — `classic/`
**Design System:** QME Elegant (purple/gold, Cinzel, serif)
**HTML Count:** ~142 files
**Identity:** Professional numerology & astrology — the "serious" brand. Clean, authoritative, no gimmicks.

**Core Tools:**
- Life Path Calculator, Zodiac Calculator
- Soul Urge, Expression, Birthday Number readings
- Planetary readings: Venus, Mars, Jupiter, Saturn, Mercury, Rising, Moon sign
- Chiron, Lilith, Midheaven, Descendant, South Node readings
- Stellium, Modality, Synastry, Love Compatibility, Venus-Mars Compatibility
- Chinese Zodiac reading
- Fortune Cookie, Lucky Numbers, Yes/No Oracle
- Void of Course Moon, Mercury Retrograde Checker
- Brain Type Test, Aura Colour Test, Colour Personality Test

**Unique Features:**
- Group Builder (4 pages) — multi-person compatibility analysis
- Monthly/Weekly/Yearly forecasts
- Readings subfolder with full reading engine
- Etsy tiles (~10 files) for product listings
- Freemium gate system

**Forecasts:** `classic/readings/forecasts/engine.js`
**Calculations:** `classic/readings/calculations.js`

---

### Stranger — `stranger/`
**Design System:** QME Elegant + Stranger Things overlay (darker, moodier, red/atmospheric)
**HTML Count:** ~162 files (most in ecosystem by page count)
**Identity:** Stranger Things themed oracle — Upside Down metaphors, 80s horror aesthetic, atmospheric mystery.

**Core Tools:** Same full tool set as Classic PLUS:
- Chiron, Descendant, Dharma Number, Decade Forecast
- Personal Day/Month/Year calculators
- Pinnacle Numbers, Part of Fortune, North Node
- Neptune/Pluto Sign readings
- Composite Chart Reading, Crystal Ball, Daily Fortune
- Cosmic daily/weekly/monthly/yearly forecasts

**Unique Features:**
- Party Builder (4 pages) — Stranger Things party theme
- Generator Templates (5 themes): minimalist, mystical-tarot, heart-bears, vintage-storybook + partials
- Welcome Flow integration
- Most complete individual tool set of any brand

**Forecasts:** `stranger/forecasts/engine.js`
**Calculations:** `stranger/calculations.js`

---

### Genesis — `genesis/`
**Design System:** QRC Synthwave (neon cyan/magenta, Orbitron, Tron)
**HTML Count:** ~22 files
**Identity:** Solfeggio frequency generator — sonic healing, vibrational tools, frequency-first approach.

**Core Tools:**
- Main index with frequency generator
- Etsy delivery template + customer welcome email
- Etsy tiles (10+ files) for frequency product listings

**Current State:** Heavily Etsy/sales focused. Fewer interactive tools than other pillars. The frequency generation logic is the unique value prop.

**Subfolders:**
- `genesis/pt/` — Portuguese translation
- `genesis/genesis/` — nested copy (legacy)
- `genesis/rebrand collection/` — rebranded variants

---

### 40Hz — `40hz/`
**Design System:** QRC Synthwave (shares Genesis aesthetic)
**HTML Count:** ~9 files
**Identity:** Gamma wave cognitive enhancement — neuroscience meets mysticism. 40Hz binaural beats for focus, memory, clarity.

**Core Tools:**
- Index with gamma wave generator
- Admin, Freemium, delivery template
- Genesis FG variant

**Current State:** Smallest pillar. Shares much infrastructure with Genesis. Opportunity for expansion with attention/focus tools.

---

## TIER 2: Reading Generators

### Ultimate — `ultimate/`
**Design System:** QME Elegant
**HTML Count:** 1 (index.html)
**Identity:** The CORE ENGINE — source of truth for all reading content.

**Key Files (JS, not HTML):**
- `calculations.js` — master calculation engine
- `readings.js` + `readings-extended.js` — base reading text
- `deep-astrology.js`, `deep-biorhythm.js`, `deep-challenges.js`, `deep-chinese-zodiac.js`, `deep-destiny.js`, `deep-expression.js`, `deep-gematria.js`, `deep-moon.js`, `deep-numerology.js`, `deep-pinnacles.js`, `deep-soul-urge.js`, `deep-tarot.js` — 12 deep reading modules

**Role:** Not customer-facing. This is the mother engine that other brands copy from.

---

### Soul Blueprint — `soulblueprint/` (SEPARATE PRODUCT)
**Design System:** QME Elegant
**HTML Count:** ~167 files (highest in ecosystem)
**Identity:** Separate branded product — not part of this ecosystem. Has its own deployment.

**Core Tools:**
- Reading generator (main product)
- Shareable reading links (`/r/*` → `view.html`)
- Etsy image picker for product thumbnails
- Examples gallery

**Unique Features:**
- **SoulPrism sub-brand** (~10 pages) — prompt builder for AI-assisted readings, guides (birthday, insight, journal, spiritual)
- **Playbooks** (8 pages) — language, spiritual, stories, practical, visual-art, infographics
- **Generator Templates** (80+ files) — 10 visual themes (art-deco, botanical, celestial-watercolor, cosmic, cosmic-rainbow, dark-celestial, fairy-tale, heart-bears, minimalist, mystical-tarot, vintage-storybook), each with ~7 partials
- **Articles** (40+ pages) — SEO content (zodiac gift guide, YouTube shorts from reading, write manifesto with AI, viral zodiac content ideas, etc.)
- **Hidden pro generator** at `/s/*` (noindexed)

**Calculations:** `amomentintime/calculations.js` (CANONICAL SOURCE)

---

### A Moment In Time — `amomentintime/`
**Design System:** QME Elegant + gift/celebration overlay
**HTML Count:** ~86 files
**Identity:** Gift-oriented variant — "A reading for this moment". Birthday gifts, commemorations, special occasions.

**Core Tools:**
- Reading generator
- Shareable reading links (`/r/*` → `view.html`)
- Forecasts (with nested forecast engine)

**Unique Features:**
- **Multi-language support:**
  - `amomentintime/esp/` — Spanish (full calculations + readings)
  - `amomentintime/pt/` — Portuguese (full calculations + readings)
- **Generator Templates** (~70 files) — same 10 themes as other reading generators
- **Dual forecast engines:** `forecasts/engine.js` + `forecasts/forecast/engine.js`

**Calculations:** `amomentintime/calculations.js` + `esp/calculations.js` + `pt/calculations.js`
**Forecasts:** `amomentintime/forecasts/engine.js` (CANONICAL for CosmicEngine)

---

## TIER 3: K-Pop Brands

### K-Pop — `kpop/`
**Design System:** QME Elegant + K-Pop idol overlay (playful, pinks, fan energy)
**HTML Count:** ~101 files
**Identity:** K-Pop themed numerology & astrology — "Your idol energy blueprint". Fan culture meets mysticism.

**Core Tools:** Same full astrology/numerology tool set as Stranger, PLUS:
- **Band Builder** (4 pages) — create a K-Pop band from birth chart compatibility
  - band-builder, band-builder-results, band-builder-members, band-builder-debut
- **Squad Chemistry** — group compatibility reading

**Calculations:** `kpop/readings/calculations.js`
**Forecasts:** `kpop/readings/forecasts/engine.js`

---

### Kosmick Pop — `kosmickpop/`
**Design System:** QME Elegant + K-Pop overlay
**HTML Count:** ~79 files
**Identity:** Advanced K-Pop brand — exclusive tools not found in base K-Pop. The "premium" K-Pop experience.

**All tools prefixed `kpop_`:**
- Standard: life_path, zodiac-calculator, fortune-cookie, tools_index
- **Exclusive to Kosmick Pop:**
  - `kpop_stage_nerves` — Stage performance anxiety tool
  - `kpop_stage_name` — K-Pop stage name generator
  - `kpop_lightstick` — Virtual lightstick
  - `kpop_idol_chart` — Idol compatibility chart
  - `kpop_group_generator` — Random group formation
  - `kpop_main_character` — Main character energy reader
  - `kpop_comeback_energy` — Comeback energy calculator
  - `kpop_bias_pattern` — Bias selection pattern analyser
  - `kpop_bias_energy` — Bias energy compatibility
  - `kpop_avatar_generator` — K-Pop avatar creator
  - `kpop_archetype_quiz` — K-Pop archetype discovery
  - `kpop_dual_concept` — Dual concept analyser
  - `kpop_energy_reset` — Energy reset ritual
  - `kpop_presence_calibrator` — Stage presence tool
  - `kpop_compare_energy` — Energy comparison tool

---

## TIER 4: Hub & Expansion

### Quantum Merlin Hub — `quantum-merlin-hub/`
**Design System:** QRC Synthwave
**HTML Count:** ~20 files
**Identity:** Central reality codes hub — gematria, Reality Codes, quantum tools.

**Core Tools:**
- Reality Code Generator (quick + detailed)
- Code Tracker
- Astrology, Chinese Zodiac, Gematria, Tarot
- Crystal resonance, Sigils, Water charging
- Jukebox (Solfeggio frequency player)
- QR Codes Science page
- Community guidelines + templates

---

### Expand — `Expand/`
**Design System:** Mixed (QME + QRC)
**HTML Count:** ~103 files
**Identity:** Experimental expansion area — extended hub with psychological micro-tools and premium assessments.

**Unique Tools (not found elsewhere):**
- Authority Imprint Detector
- Life Force Signal Detector
- Life Phase Decoder
- Safety-Expansion Tension analyser
- Stress Signature tool
- Depth Enhancement Guide
- Relationship Dynamic Decoder
- Profile tools: Energy, Psychological, Relational, Spiritual, Unconscious
- Premium Assessment
- Manifestation Readiness quiz
- Quantum Blueprint
- Quantum Forum
- Quantum Rose Tarot
- Quantum Wishes
- Sacred Geometry Generator

**Contains:** `Expand/quantum-merlin-hub/` — full mirror of hub with enhanced tools

---

## TIER 5: Standalone Brands

### Gravity / Gravity7 — `gravity/` + `gravity7/`
**HTML Count:** 7 each (14 total)
**Identity:** Minimal gravity-themed reading brands.
**Same structure:** index, about, local-time, numerology, privacy, prophecy, reading

### LifeStrategy — `lifestrategy/`
**HTML Count:** 9 files
**Identity:** Life Strategy Calendar — scheduling tool with mystical timing.
**Pages:** index, about, booking, calendar, month, disclaimer, privacy, terms

### Chinese Zodiac — `chinesezodiac/`
**Tech:** Vite + TypeScript + Tailwind (ONLY modern build-step app)
**Identity:** Standalone modern Chinese zodiac app.
**Note:** This is architecturally different from everything else in the ecosystem.

---

## TIER 6: Root-Level Tools

These live at the workspace root and are accessible from quantummerlin.com directly:

| Page | System | Notes |
|---|---|---|
| `index.html` | Gateway | Main homepage |
| `compatibility.html` | Chinese Zodiac + Numerology | 7-dimension compatibility |
| `angel-number-calculator.html` | Angel Numbers | Basic calculator |
| `angel-number-full-reading.html` | Angel Numbers | Full reading engine |
| `birth-sigil.html` | Sacred Geometry | Visual sigil generator |
| `trust-radar.html` | Micro-tool | Psychological trust assessment |
| `energy-leak.html` / `energyleak.html` | Micro-tool | Energy drain identifier |
| `identity-split-detector.html` | Micro-tool | Self-integration tool |
| `hidden-strengths-revealer.html` | Micro-tool | Hidden talent discovery |
| `power-avoidance-pattern.html` | Micro-tool | Power pattern analysis |
| `forecasts.html` | All systems | Main forecast tool |
| `soulcard.html` | Numerology | Soul card calculator |
| `workshop.html` | Hub | Workshop/experimentation |
| `hub.html` | Hub | Tool navigation hub |
| `library.html` | Library | Saved readings |
| `reading-generator.html` | All systems | Main reading generator |
| `quantum-forum.html` | Community | Forum/discussion |
| `quantum-rose.html` | Character | Quantum Rose page |
| `quantum-sigil-generator.html` | Sacred Geometry | Sigil creation |
| `quantum-sigil-gallery.html` | Sacred Geometry | Sigil showcase |
| `qrcodes.html` | Reality Codes | QR code generator |
| `widgets.html` | Widget hub | Embeddable widgets |

---

## Cross-Brand Feature Matrix

| Feature | Classic | Stranger | Genesis | 40Hz | SoulBP | AMIT | K-Pop | KosmickPop | Hub | Expand |
|---|---|---|---|---|---|---|---|---|---|---|
| Numerology tools | ✓ | ✓ | - | - | ✓ | ✓ | ✓ | ✓ | - | ✓ |
| Astrology tools | ✓ | ✓ | - | - | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Chinese Zodiac | ✓ | ✓ | - | - | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Forecast engine | ✓ | ✓ | - | - | - | ✓ | ✓ | - | - | - |
| Reading generator | - | ✓ | - | - | ✓ | ✓ | ✓ | - | - | - |
| Frequency tools | - | - | ✓ | ✓ | - | - | - | - | ✓ | ✓ |
| Reality Codes | - | - | - | - | - | - | - | - | ✓ | ✓ |
| Micro-tools | - | - | - | - | - | - | - | - | - | ✓ |
| Multi-language | - | - | ✓ | - | - | ✓ | - | - | - | - |
| Etsy integration | ✓ | - | ✓ | ✓ | ✓ | - | - | - | - | - |
| Group builder | ✓ | ✓ | - | - | - | - | ✓ | - | - | - |
| Generator templates | - | ✓ | - | - | ✓ | ✓ | - | - | - | - |

---

## Brand Expansion Opportunities

| Brand | What's Missing | Priority |
|---|---|---|
| Genesis | Interactive tools beyond frequency generation | Medium |
| 40Hz | More cognitive enhancement tools, guided sessions | Medium |
| Classic | Micro-tools, deeper psychological tools | Low (already feature-rich) |
| Kosmick Pop | Forecast engine, reading generator | Medium |
| Gravity | Everything — only 7 pages | Low (niche brand) |
| LifeStrategy | More time-based tools, better integration with mystical calendar | Medium |
| Root | More micro-tools, consolidate duplicate tools | High |

---

*Consult [COUNCIL.md](COUNCIL.md) for the ecosystem map.*
*Consult [BRANDING.md](BRANDING.md) for each brand's design system.*
*Consult [ARCHITECT.md](ARCHITECT.md) for how brands share code.*
