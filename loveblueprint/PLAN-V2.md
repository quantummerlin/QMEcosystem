# Love Blueprint v2 — Polish Plan
_Locked 2026-10-15. Sibling of Soul Blueprint. URL = brand: quantummerlin.com/loveblueprint/_

## The Problem (user feedback on live draft)
1. Reading generation feels clunky; not obvious how to use or read the output.
2. No onboarding; no iterative instructions for the info.
3. "Love Blueprint" branding everywhere while the product is now Love Blueprint.
4. AI copy giveaways (em dashes, Oxford commas) must go.
5. Everything centered feels samey; wants a love-poetry feel.
6. Wants the best available animation for a high-end, professional result.

## Audit Facts (measured, not guessed)
- "Love Blueprint": 17 hits in index.html, 10 in the 4 JS engines (some user-facing REFUSALS copy).
- Em dashes (user-facing): index.html 160, dating-content.js 103, spark-runtime.js 12,
  synastry.js 6, articles 112 total. **393 all-in.**
- Layout: 21 text-align:center rules. Motion: only 2 keyframes (floatUp, beat), no token system.
- Reading = 10 sections dumped at once (rail exists but no chaining, no first-run guidance).
- Generate moment is instantaneous — no staged reveal (honest compute time is being thrown away).

## Phase 1 — REBRAND (DONE 2026-10-15)
- "Love Blueprint" everywhere user-facing (index, articles, REFUSALS strings,
  og:title/JSON-LD/about block/footers/QR alt). Artifact noun spark -> blueprint:
  Reveal My Blueprint, Your blueprints, My Blueprint card label, LB1 share codes
  (SS1 still parses so links shared pre-rebrand keep working).
- Internal identifiers kept (filenames, window.SoulSpark, GA events, element IDs).
- og-card.png regenerated with the new brand. 88/88 green; zero user-facing Soul Spark.
- LESSON: scripted copy passes can break data keys. The dash pass rewrote the INTENT_DRIVES
  key to 'Dating : open to anything' while chips sent the comma form, silently breaking
  alignment. ALWAYS re-verify enum keys after any bulk copy rewrite.

## Phase 2 — DE-AI THE COPY (DONE 2026-10-15)
- tests/deai-copy.cjs rules: R1 parenthetical pairs -> commas, R2 dash+conjunction -> comma,
  R3 dash+gerund -> colon, R4 dash+pronoun -> period, R5 dash+lowercase -> colon,
  R6 dash+Capital -> period, R7 serial comma removed inside true lists only.
  393 em dashes -> 15 (all legitimate: empty-state placeholders, sentinels, comments).
- tests/fix-colons.cjs collapsed the 158 " : " artifacts left by R3/R5, protecting 55
  ternaries via lookbehind (Node-only; browser code stays lookbehind-free).
- Escaped \u2014 sequences in JS strings needed a second manual pass (literal passes miss them).
- Gate: 88/88 green; serial-list count 0; intent alignment re-verified in browser.
- LESSON: bulk passes also rewrote this plan file and comment banners; harmless but note that
  scripts should exclude docs next time.

## Phase 3 — LOVE POETRY FORMATTING (DONE 2026-10-15)
- Flip-card reading bodies now render as stanzas: Playfair serif, 46ch max, left-aligned,
  line-height 1.75, ❦ ornament between stanzas, cascading reveal at 60ms per stanza.
- Centering reserved for hero/badges/ring cards only.

## Phase 4 — MOTION SYSTEM (DONE 2026-10-15)
- Tokens added: --t-fast .18s / --t-base .32s / --t-slow .62s, --ease-out expo, --stagger 70ms.
- Compute veil: honest staged reveal (glyph ring settles, place+time line, sub-copy) 1.15s,
  skipped entirely under prefers-reduced-motion. Verified mid-flight in browser.
- Micro: first-card pulse hint after tour; stanza cascade on flip; transform/opacity only.

## Phase 5 — ONBOARDING + ITERATION (DONE 2026-10-15)
- First-run sheet (localStorage lb-onboarded): 5-station summary, [Begin the tour] jumps to the
  signature + pulses the first card; [Just let me read] dismisses. Never re-shown.
- Station chaining: 7 "Next ->" buttons appended to sections + completion card after Traps
  with three use-it actions (bio / card / share). Verified: 7 next-stops + doneCard present.

## Phase 6 — QA + DEPLOY
- 88 tests green (vm sandbox loaders), em-dash count -> 0, "Love Blueprint" -> 0 user-facing,
  og-card.png regenerated + 200, QR scans to the right URL, legal links 200, GA events fire.
- Deploy via the divergence-safe pattern: worktree at origin/main -> cherry-pick -> push ->
  reset --mixed locally (never rebase the dirty tree).
- Checkpoints: (P1+P2) copy-final build -> user review -> (P3+P4+P5) experience build -> user
  review -> (P6) deploy. Nothing ships to production without a checkpoint review.

## Standing Rules (repo landmines)
- Samples computed via groundtruth-chart.cjs, never invented.
- Withhold (🔒) rather than estimate — accuracy standard untouched by polish work.
- Ads never inside interactive output; .ad-zone rules stay.
- Do NOT touch U+FFFD bytes in soulblueprint/index.html; hrefs only.
- Test scripts are .cjs; inline node -e hangs PowerShell; grep scoped (node_modules timeouts).

## Phase 7 - POETRY PASS (DONE 2026-10-20, deployed 69e5cebb)
User feedback on v2: 'clinical, not poetic... nothing is centre aligned... mirror every emoji so
it is on both sides of the writing on each line or it looks stupid.'
- CENTRED: section heads, flip-card back bodies + stanzas (44ch), pull/align panels, why-drawers,
  flag/trap/move titles, panels, bio card, social card labels/titles/bodies, library head, done card.
  Functional dense tables (option rows, bar rows) kept left for readability.
- MIRRORED: every decorative emoji on a line - section dots (markup regex adds trailing dot),
  rail pills, all toasts, verdicts ('V Aligned V'), badges ('Exact chart X2'), flip/CTA buttons,
  intent chips, flag/trap/promise li markers via CSS ::before+::after pairs, social-card bullet
  hearts + foot 'H decode yours H', onboard list items + buttons, library rows, bio tags
  ('Venus in X' wrapped in glyphs). 158 + 9 (CRLF part-2) + 56 article headings.
- WARMed: h1 'Your love story, read from the real sky' (OG/Twitter titles too), tagline 'Seven
  sealed letters about your heart', section subs rewritten as invitations ('Seven sealed letters
  from the sky. Tap one open.', 'every sign casts a shadow... named here kindly').
- Article headings: leading-only emoji mirrored; ' . ' de-AI artifacts in headings -> ': '.
- Tools: tests/poetry-pass.cjs, tests/poetry-pass2.cjs, tests/article-mirror.cjs (all report misses).
- LESSONS: (1) repo HTML files are CRLF - multi-line exact-match replaces silently miss; use
  regex with \r?\n. (2) scripted string replaces can create syntax breaks ('\u2665''') - ALWAYS run
  the vm.Script inline-parse gate after mass edits. (3) hidden browser tab pauses CSS transitions
  (opacity stuck at 0 mid-transition) - force-settle with getAnimations().finish() before asserting.
- Gate: 88/88 tests, inline scripts parse, browser DOM audit (heads dots=2 centered, stanzas
  centered, foot hearts=2, rail pills mirrored, genBtn mirrored), production 200 + markers live.

## Phase 8 - DE-SLOP (DONE 2026-10-20, deployed f332dd2e)
User: 'it still looks very ai'. Diagnosed by SCREENSHOT, not audit: gradient-text headline, glowing
gradient pills/badges, rainbow OS emoji over serif brand, drifting heart particles, glass blur,
infinite pulse, glow shadows = default AI-dashboard aesthetic.
Fix = editorial love-letter system: flat ink (--ink-rose #C22A4A), hairlines, solid h1 + hand-drawn
SVG flourish, monochrome dingbats with VS15 (balance/sparkle/flag/pencil/envelope/frame) replacing
colour emoji, particles removed, beat static, blur removed (app bar/nav solid), articles.css same.
Tools: tests/deslop.cjs + deslop2.cjs (regex-robust, miss-reporting).
LESSON: 'looks AI' is a VISUAL judgement - screenshot first, audit second; never iterate taste from DOM.
