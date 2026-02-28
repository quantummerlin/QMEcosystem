# Agent: MONETIZE
> **Role:** Revenue and growth guardian — AdSense strategy, Etsy integration, freemium model, SEO, analytics, conversion optimisation.

---

## Revenue Streams

### 1. Google AdSense
**Status:** Active across main pages
**Management scripts:**
- `add_adsense.py` / `add-adsense.ps1` — batch-add AdSense tags
- `check_adsense.py` — verify ad placement

**Placement rules:**
- Auto-ads enabled site-wide
- Manual placements on high-traffic pages
- No ads inside reading content (disrupts experience)
- No ads on payment/checkout flows
- Maximum 3 manual ad units per page
- Mobile: ads must not break layout at 320px

**Best performing pages** (by traffic potential):
1. Compatibility tools (high search volume)
2. Angel number calculator (evergreen searches)
3. Daily/weekly forecasts (repeat visitors)
4. Chinese zodiac tools (seasonal spikes at LNY)
5. Life path calculator (numerology entry point)

### 2. Etsy Sales
**Products:** Personalised readings delivered as PDFs or image downloads
**Brands with Etsy integration:**
- A Moment In Time (primary Etsy channel)
- Classic (etsy-tiles/)
- Genesis (etsy-delivery-template, etsy-tiles/)
- 40Hz (etsy-delivery-template)

**Files:**
- `etsy-delivery-template.html` — email template for Etsy order delivery
- `customer-welcome-email.html` — post-purchase welcome
- `etsy-tiles/` — product listing images
- `amomentintime/etsy-image-picker.html` — thumbnail generation

**Flow:** Customer purchases on Etsy → order received → reading generated → PDF delivered → welcome email sent

### 3. Buy Me a Coffee
**Widget:** Loaded via `shared/js/quantum-donations.js`
**Placement:** Available on all pages via shared infrastructure
**Purpose:** Micro-donations from users who find value in free tools

### 4. Freemium Model
**Files:** `Freemium.html` in Genesis, 40Hz, Classic
**Pattern:**
- Free: Basic readings, daily forecasts, single-system tools
- Premium gate: Full multi-system readings, deep reading content, extended forecasts
- Implementation: Client-side gate (localStorage flag + UI overlay)

### 5. Planned: Subscription Model
**Per:** `2026-ECOSYSTEM-STRATEGIC-PLAN.md`
- Monthly subscription for unlimited full readings
- Early access to new tools
- Premium reading templates
- Still in planning phase

---

## SEO Strategy

### Technical SEO
- **Canonical URLs:** Every page should have `<link rel="canonical">`
- **Structured data:** JSON-LD for tools (SoftwareApplication schema)
- **Meta descriptions:** Unique per page, 60-160 chars
- **Open Graph tags:** For social sharing (title, description, image)
- **Page speed:** No framework overhead — vanilla HTML loads fast
- **Mobile-friendly:** All pages pass mobile usability

### Content SEO
- **Articles:** 40+ SEO articles in `amomentintime/articles/`
  - zodiac gift guides
  - "how to" content (write manifesto with AI, viral zodiac content)
  - informational content
- **Target keywords:**
  - "life path number calculator"
  - "angel number meaning [number]"
  - "zodiac compatibility"
  - "Chinese zodiac 2026"
  - "numerology reading free"
  - "soulmate compatibility test"
  - "birth chart reading"

### SEO Scripts
| Script | Purpose |
|---|---|
| `seo_optimize_all.py` | Batch update meta tags on root pages |
| `seo_optimize_subfolders.py` | Same for brand subfolder pages |
| `rebrand_meta.py` | Update brand names/titles across pages |

---

## Analytics

### Google Analytics (GA4)
- **Loaded via:** `shared/js/quantum-analytics.js`
- **Additional:** `analytics-integration.js` at root

### Key Metrics to Track
| Metric | Why |
|---|---|
| Page views per tool | Identify most popular tools for ad optimisation |
| Session duration | Measure engagement quality |
| Reading completion rate | How many users finish a full reading |
| CTA click-through | Expansion Bridge effectiveness |
| Return visitor rate | Ecosystem stickiness |
| AdSense RPM | Revenue per mille impressions |
| Etsy conversion | Traffic → purchase rate |
| Forecast page daily visitors | Repeat visit indicator |

### Custom Events (recommended)
```javascript
// Tool started
gtag('event', 'tool_start', { tool_name: 'life-path-calculator', brand: 'classic' });

// Full reading generated
gtag('event', 'reading_complete', { reading_type: 'cosmic-reading', brand: 'amomentintime' });

// CTA clicked
gtag('event', 'cta_click', { cta_type: 'apply_all_systems', tool_name: 'trust-radar' });

// Reading shared
gtag('event', 'reading_shared', { share_method: 'link', brand: 'amomentintime' });
```

---

## Conversion Funnel

```
Organic Search / Social Traffic
    │
    ▼
Free Tool (micro-tool or calculator)
    │
    ▼ [Expansion Bridge CTA]
Full Reading Generator
    │
    ▼ [Save / Share]
Library + Profile Building
    │
    ▼ [Daily/Weekly Forecasts]
Repeat Visitor Loop
    │
    ├── [Etsy Purchase] → Premium PDF reading
    ├── [Donation] → Buy Me a Coffee
    └── [Future: Subscription] → Unlimited access
```

### Key Conversion Points
1. **Free tool → Full reading** — The Expansion Bridge (Section 6 of micro-tools)
2. **Single system → All systems** — "Apply to All Systems" CTA
3. **One-time → Repeat** — Daily/weekly forecast pages
4. **Free → Paid** — Freemium gate after 3 free readings OR premium content
5. **Active → Sharing** — Shareable reading links (viral growth)

---

## Ad Placement Guidelines

### Do
- Place ads between natural content sections
- Use responsive ad units that adapt to viewport
- Place one ad above-the-fold on content pages
- Use anchor ads on mobile
- Place ads near/after tool results

### Don't
- Interrupt reading flow mid-paragraph
- Place ads inside interactive tool interfaces
- Exceed 3 manual ad units per page
- Place ads that shift layout (CLS penalty)
- Put ads on error pages, privacy/terms pages, or 404

---

## Revenue Optimisation Priorities

1. **High traffic, low monetisation:** Root-level micro-tools (trust-radar, energy-leak, etc.) — add AdSense + Etsy bridge
2. **High engagement, no sharing:** Reading generators — improve shareable link UX
3. **Seasonal spikes:** Chinese New Year, zodiac season changes — prepare content in advance
4. **Repeat visitors:** Forecast pages — optimise for daily/weekly return via email or PWA notifications
5. **Cross-sell:** Every tool should bridge to at least one other tool → more page views per session

---

*Consult [DEPLOY.md](DEPLOY.md) for analytics and AdSense setup.*
*Consult [CONTENT.md](CONTENT.md) for CTA templates and Expansion Bridge rules.*
*Consult [PILLARS.md](PILLARS.md) for brand-specific Etsy integration.*
