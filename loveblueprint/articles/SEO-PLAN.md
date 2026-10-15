# Soul Spark — SEO Content Plan

**Goal:** the compounding distribution asset that makes the Base-case growth
projection (1,000–4,000 visits/mo by month 12) actually happen. No product
work required — this is pure content + on-page SEO.

**Model:** 12 articles targeting real search intent around dating astrology,
compatibility, and profile bios. Each links to the tool (`/loveblueprint/`)
at 2–3 natural CTA points, and cross-links siblings. Pillar pages carry the
high-volume head terms; supporting pages catch long-tail.

**Standards (match the main site's 70-article conventions):**
- Ad zones ship as label-only placeholders and are HIDDEN until real
  inventory exists (`articles/js/articles.js` hides any `.ad-zone` lacking an
  `<ins class="adsbygoogle">` with a NUMERIC `data-ad-slot`). Never a fake ID,
  never an empty dashed box. To activate a zone, replace its whole block with:

    <div class="ad-zone">
      <ins class="adsbygoogle" style="display:block" data-ad-format="auto"
        data-ad-client="ca-pub-3480541530392777" data-ad-slot="REAL_NUMERIC_ID"
        data-full-width-responsive="true"></ins>
    </div>
- GA4 `G-VW4LGE7L1T` + AdSense `ca-pub-3480541530392777`
- Canonical + OG + Twitter + JSON-LD Article
- Breadcrumbs, generator CTA, legal footer links
- Dark-rose Soul Spark theme (`../css/articles.css`), self-contained
- Honesty line: entertainment/self-reflection, no deterministic claims
  (protects AdSense + matches the product's own no-fabrication ethics)

---

## The 12 articles (pillar + supporting)

| # | Slug | Target keyword | Intent | Type |
|---|---|---|---|---|
| 1 | venus-sign-dating-style | venus sign dating style | how you love | **PILLAR** ✅ built |
| 2 | astrology-compatibility-guide | astrology compatibility / synastry explained | how matching works | **PILLAR** ✅ built |
| 3 | dating-app-bio-ideas | dating app bio ideas | profile help | **PILLAR** ✅ built |
| 4 | moon-sign-in-relationships | moon sign relationship needs | emotional safety | support |
| 5 | mars-sign-chemistry | mars sign chemistry / attraction | desire & pursuit | support |
| 6 | 7th-house-partner | 7th house / descendant who you attract | who you need | support |
| 7 | rising-sign-first-date | rising sign first impression dating | first-date vibe | support |
| 8 | signs-that-are-actually-compatible | which signs are compatible | quick-reference | support |
| 9 | astrology-red-flags-dating | dating red flags by sign | safety/self-awareness | support |
| 10 | mercury-sign-texting-style | how each sign texts | communication | support |
| 11 | synastry-aspects-explained | synastry aspects (conjunction/trine/square) | deeper learning | support |
| 12 | birth-time-why-it-matters-dating | why birth time matters astrology | education + drives exact inputs | support |

**Built for launch (3 flagship pillars):** #1, #2, #3 — these carry the
highest-volume head terms and anchor the internal-link hub. The remaining
9 are queued in the template; each is a 45-min fill-in because the
structure is now reusable.

---

## Why these three first
- **#1 Venus sign dating style** — highest commercial-adjacent intent; Venus
  is literally Soul Spark's core placement. Every sign section links the tool.
- **#2 Compatibility guide** — captures "am I compatible with X" (huge volume),
  explains synastry in plain English, and sets up the degree-synastry feature
  as the payoff. This is the top-of-funnel page.
- **#3 Dating app bio ideas** — catches non-astrology searchers (people who
  just want a better Hinge bio) and converts them via the Bio Writer. Broadest net.

## Internal linking
Hub (`/loveblueprint/articles/`) → 3 pillars → each pillar links the other two
+ the tool. Tool index already links back to articles (add on deploy). This is
the same hub-and-spoke that ranks the main site's 70 guides.

## Measurement
GA4 events already fire. Add `article_view` per page (gtag pageview is
automatic). Watch: landing → `/loveblueprint/` click-through (the only
conversion that matters), and Search Console impressions on the 3 head terms
after ~6–8 weeks.
