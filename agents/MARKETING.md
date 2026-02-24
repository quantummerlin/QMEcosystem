# Agent: MARKETING
> **Role:** Growth, acquisition & retention strategist — SEO content calendar, social media hooks, email funnels, cross-brand discovery, seasonal campaigns, analytics-driven iteration.

---

## Mission

Drive **qualified traffic** to tools, convert visitors into Etsy buyers and email subscribers, and increase time-on-site through cross-brand discovery — all while respecting the "no creepy tracking, no dark patterns" ethos.

---

## Audience Segments

| Segment | Motivation | Entry Points | Upgrade Path |
|---|---|---|---|
| **Spiritual Seekers** | Self-discovery, daily guidance | Forecasts, angel numbers, moon phases | Full Soul Blueprint reading (Etsy) |
| **Astro-Curious** | Birth chart, compatibility | Compatibility tool, life path calculator | Personalised report (Etsy) |
| **K-Pop Stans** | Idol connections, fandom fun | K-Pop tools, squad chemistry | Kosmickpop premium tools |
| **Wellness / Biohackers** | Cognitive enhancement, focus | 40Hz gamma generator | Frequency presets, session tracking |
| **Gift Givers** | Unique gifts for loved ones | A Moment In Time (multi-language) | Etsy reading as gift |
| **Stranger Fans** | Nostalgia, personality quizzes | Stranger aura/oracle tools | Full Stranger reading |

---

## SEO Strategy

### Keyword Clusters (by brand)

| Brand | Primary Keywords | Long-Tail Opportunities |
|---|---|---|
| Root / Classic | numerology calculator, life path number, compatibility calculator | "what is my life path number", "numerology compatibility free" |
| Soul Blueprint | full birth chart reading, soul purpose reading, cosmic blueprint | "soul blueprint meaning", "personalised astrology report" |
| A Moment In Time | astrology gift, personalised star chart gift | "unique birthday gift astrology", "lectura astrologica personalizada" |
| Stranger | stranger things personality quiz, upside down oracle | "which stranger things character am I", "stranger things horoscope" |
| K-Pop / Kosmickpop | kpop astrology, idol compatibility, kpop numerology | "kpop birthday compatibility", "which kpop idol matches my zodiac" |
| 40Hz | 40hz frequency generator, gamma wave meditation | "40hz benefits for brain", "gamma wave generator online free" |
| Genesis | solfeggio frequency generator, 528hz generator | "solfeggio frequencies online", "healing frequency generator" |

### Content Calendar Framework

| Month | Seasonal Hook | Tools to Promote | Campaign |
|---|---|---|---|
| **January** | New Year, Chinese New Year | Chinese zodiac, Personal Year calculator, forecasts | "Your 2026 Cosmic Reset" |
| **February** | Valentine's Day | Compatibility tool, soul mate reading, Venus/Mars | "Cosmic Chemistry" |
| **March** | Spring Equinox, Pisces/Aries transition | Birth sigil, energy leak detector | "Spring Awakening" |
| **April** | Mercury retrograde (check dates) | Trust radar, hidden strengths | "Navigate the Retrograde" |
| **May** | Mental Health Awareness | 40Hz, biorhythm, identity split | "Mind Waves" |
| **June** | Summer Solstice | Moon phase calculator, manifestation | "Solstice Manifestation" |
| **July** | Mid-year review | Personal Year, forecasts, life strategy | "Mid-Year Cosmic Check-In" |
| **August** | Leo season, back to school | K-Pop tools, squad chemistry | "Main Character Energy" |
| **September** | Virgo season, harvest | Reading generator, Etsy push | "Harvest Your Blueprint" |
| **October** | Halloween, Scorpio season | Stranger tools, tarot, oracle | "Upside Down Season" |
| **November** | Scorpio/Sagittarius, Black Friday | Etsy sale, gift readings | "Cosmic Black Friday" |
| **December** | Winter Solstice, holidays, year-end | A Moment In Time gifts, 2027 forecasts | "Cosmic Gifting Season" |

---

## Email Marketing Funnel

### Current State
- **Service:** Formspree (basic collection, no automation)
- **Endpoint:** `https://formspree.io/f/mgowrolb`
- **Pages with capture:** index.html, 404.html, quantum-rose.html, library.html
- **Module:** `shared/js/quantum-donations.js` has `QRC_EMAIL.showSignupModal()`

### Target Architecture

```
Visitor → Free Tool → Email Capture → Welcome Sequence → Weekly Value → Etsy Offer
```

**Phase 1 (Current):** Expand Formspree capture to all brand landing pages
**Phase 2 (Future):** Migrate to ConvertKit/Mailchimp with:
- Welcome automation (3-email sequence)
- Weekly cosmic forecast digest
- Monthly Etsy promo
- Segmentation by entry brand (tag: soul-blueprint, stranger, kpop, etc.)

### Email Capture Placement Rules
- **ALWAYS** on: Brand index pages, tool index pages, after free readings complete
- **NEVER** on: Privacy/terms pages, mid-reading flow, checkout pages
- **Trigger:** After 60s on page OR after completing a free reading
- **Value exchange:** "Get your free weekly cosmic forecast" (not "sign up for our newsletter")
- **Design:** Match brand theme, non-intrusive slide-in or inline card

---

## Cross-Brand Discovery

### Strategy
Users who find one brand should discover others organically. The goal is increasing **pages per session** and **return visits**.

### Implementation: "Explore More" Component
A shared JS component (`shared/js/quantum-explore.js`) that:
1. Detects the current brand from URL path
2. Shows 3-4 recommended brands (excluding current)
3. Uses brand-appropriate descriptions
4. Tracks clicks via GA4 `cross_brand_click` event
5. Appears above the footer on every tool page

### Brand Recommendation Map

| If User Is On… | Recommend |
|---|---|
| Soul Blueprint | A Moment In Time (gift a reading), Stranger (fun quiz), Compatibility (relationships) |
| Stranger | K-Pop (another fun brand), Soul Blueprint (deeper reading), 40Hz (chill zone) |
| K-Pop / Kosmickpop | Stranger (vibe match), Soul Blueprint (go deeper), Compatibility (idol match) |
| Genesis / 40Hz | Each other (frequency sister brands), Soul Blueprint (spiritual), Kosmickpop (fun) |
| Classic | Soul Blueprint (upgraded version), A Moment In Time (gifts), Compatibility |
| A Moment In Time | Soul Blueprint (own reading), Etsy shop (buy for others), Compatibility |
| Root tools | Soul Blueprint (full reading), Stranger (fun), K-Pop (trending) |

---

## Etsy Optimization

### Current Listings Strategy
- Personalised PDF readings: Soul Blueprint, Classic, Genesis, 40Hz
- **Primary shop:** https://www.etsy.com/shop/QuantumMerlin

### CTA Component
- **File:** `shared/js/quantum-etsy-cta.js` (installed on 525+ pages)
- **Behaviour:** Brand-detected themed CTA card above footer
- **Tracking:** UTM parameters + GA4 `etsy_cta_click` event

### Listing Copy Template
```
Title: [Brand] Personalised [System] Reading – Custom Digital PDF
Tags: personalised reading, numerology, astrology, birth chart, [brand-specific], digital download, spiritual gift
Description opening: "Discover [what they'll learn] based on YOUR [birth date/name/etc]..."
```

### Conversion Boosters
1. Show reading **preview** (first 2 sections free) → "Get the full 20-page reading"
2. Social proof: "15,000+ readings generated" counter
3. Gift framing on A Moment In Time pages
4. Seasonal pricing events (see Content Calendar)

---

## Social Media Hooks

### Shareable Tool Outputs
Every tool should generate a **shareable card** — an image or text snippet users want to post.

| Tool | Share Hook |
|---|---|
| Life Path Calculator | "I'm a Life Path 7 – The Seeker 🔮" |
| Compatibility | "Our cosmic compatibility: 87% 💫" |
| Angel Number | "I keep seeing 444 — here's what it means" |
| Birth Sigil | Downloadable sigil image |
| K-Pop Squad Chemistry | "My idol soulmate is [idol] 💜" |
| Stranger Aura | "My Hawkins aura colour is [colour]" |
| 40Hz | "Just finished a 40Hz gamma session 🧠" |

### Platform Strategy
| Platform | Content Type | Frequency |
|---|---|---|
| TikTok | Tool demos, "Did you know your Life Path is…" | 3-5x/week |
| Instagram | Sigil art, compatibility cards, aesthetic | 3-4x/week |
| Pinterest | Infographics, compatibility charts, Etsy listings | 5-7x/week |
| X/Twitter | Angel number meanings, daily forecasts, memes | Daily |
| Reddit | r/numerology, r/astrology, r/strangerthings value posts | 2-3x/week |

---

## Analytics & KPIs

### Key Metrics (Google Analytics 4)
- **Acquisition:** Sessions by source, organic search impressions
- **Engagement:** Pages per session, avg engagement time, cross-brand navigation rate
- **Conversion:** Etsy CTA click rate, email signup rate, reading completion rate
- **Retention:** Returning visitor %, daily forecast return rate

### GA4 Custom Events (Already Implemented)
| Event | Trigger |
|---|---|
| `etsy_cta_click` | Etsy CTA button clicked (brand, tool tagged) |
| `email_signup` | Email form submitted |
| `reading_complete` | Full reading generated |
| `cross_brand_click` | User navigates to different brand |
| `tool_used` | Any calculator/tool completed |

### Monthly Review Checklist
- [ ] Top 10 landing pages by organic traffic
- [ ] Etsy CTA click-through rate by brand
- [ ] Email signup conversion rate by page
- [ ] Cross-brand discovery rate (pages per session)
- [ ] Bounce rate on key entry pages
- [ ] Search Console: new keyword rankings, crawl errors

---

## Competitor Awareness

| Competitor | Their Strength | Our Advantage |
|---|---|---|
| Co-Star | Beautiful app, push notifications | Multi-system (not just astrology), no app install needed |
| Cafe Astrology | Deep free content, SEO dominance | Interactive tools, modern UI, personalised PDFs |
| Labyrinthos | Tarot app, beautiful design | Broader systems, unique micro-tools, themed brands |
| Numerologist.com | Paid reports, heavy email | Free tools first, Etsy for purchases, no dark patterns |

---

## Rules for This Agent

1. **Value first, sell second** — every page must deliver genuine insight before any CTA
2. **No dark patterns** — no fake urgency, no misleading countdown timers, no "only 3 left!"
3. **Brand voice fidelity** — marketing copy must match the brand system it appears in (see [CONTENT.md](CONTENT.md))
4. **Track everything** — every CTA, link, and conversion must fire a GA4 event
5. **Mobile first** — 70%+ of traffic is mobile; all marketing elements must work at 320px
6. **Seasonal awareness** — tie campaigns to cosmic events (equinox, retrograde, lunar new year) not just commercial holidays
7. **Cross-pollinate** — every successful tool in one brand should be considered for adaptation to others

---

*Last updated: February 2026*
