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
