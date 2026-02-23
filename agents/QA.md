# Agent: QA
> **Role:** Quality assurance guardian — validation rules, test cases, checklists, accessibility, consistency checks, what to verify before every commit.

---

## Pre-Commit Checklist

Run through this before every push to `main`:

### Code Quality
- [ ] No JavaScript syntax errors (`console` in browser shows no errors)
- [ ] No broken `<script>` or `<link>` paths
- [ ] All `localStorage.getItem()` calls have null checks
- [ ] No hardcoded birth dates, names, or test data left in
- [ ] No `console.log()` debugging statements left in production code
- [ ] Functions that accept dates handle both string and Date object inputs

### Calculations
- [ ] Life Path reduction preserves Master Numbers (11, 22, 33)
- [ ] Chinese zodiac checks Lunar New Year dates before determining animal
- [ ] Personal Year accounts for birthday boundary (hasn't-passed-yet logic)
- [ ] Challenge numbers can be 0 (valid, not an error)
- [ ] Moon sign defaults to noon when no birth time given
- [ ] Rising sign returns null when no birth time available

### Cross-Brand Consistency
- [ ] If you changed a canonical file, ALL copies are updated
- [ ] Run: `find . -name "<filename>" -not -path "*/node_modules/*"` to find all copies
- [ ] Test at least 2 brand variants to confirm consistency
- [ ] Commit message lists ALL affected files

### Visual / UX
- [ ] Page loads correctly at 320px viewport (mobile)
- [ ] No horizontal scroll on any viewport
- [ ] Touch targets ≥ 44×44px
- [ ] Correct design system applied (QME or QRC — no mixing)
- [ ] Correct fonts loaded (Cinzel for QME, Orbitron for QRC)
- [ ] Background animation present and not broken
- [ ] Header and footer render correctly
- [ ] No flash of unstyled content (FOUC)

### SEO / Deployment
- [ ] Unique `<title>` and `<meta description>` per page
- [ ] Canonical URL set
- [ ] Open Graph tags present
- [ ] New pages added to `sitemap.xml`
- [ ] `_headers` rules applied if needed (noindex for dev pages)
- [ ] No broken redirects in `_redirects`

---

## Calculation Validation Tests

### Chinese Zodiac LNY (CRITICAL)
| Input | Expected Animal | Expected Element | LNY Date |
|---|---|---|---|
| 2026-01-15 | Snake | Wood | Feb 17, 2026 |
| 2026-03-01 | Horse | Fire | Feb 17, 2026 |
| 2025-01-28 | Dragon | Wood | Jan 29, 2025 |
| 2025-01-29 | Snake | Wood | Jan 29, 2025 |
| 2025-12-31 | Snake | Wood | Jan 29, 2025 |
| 2024-02-09 | Dragon | Wood | Feb 10, 2024 |
| 2024-02-10 | Dragon | Wood | Feb 10, 2024 |
| 2024-02-09 | Rabbit | Water | Feb 10, 2024 |
| 2000-01-15 | Rabbit | Earth | Feb 5, 2000 |
| 2000-02-05 | Dragon | Metal | Feb 5, 2000 |
| 1990-01-26 | Snake | Earth | Jan 27, 1990 |
| 1990-01-27 | Horse | Metal | Jan 27, 1990 |

### Life Path Number
| Birth Date | Expected Life Path |
|---|---|
| 1990-11-29 | 5 (29→11, Nov=11, 1990→1, 11+11+1=23→5) |
| 2000-01-01 | 4 (1+1+2=4) |
| 1987-06-15 | 1 (6+6+7=19→10→1) |
| 1995-10-22 | 11 (22+10+24→56→11 — Master!) |

### Personal Year Boundary
| Born | Current Date | Expected Cycle Year | Personal Year |
|---|---|---|---|
| Mar 15 | Jan 30, 2026 | 2025 | 9 |
| Mar 15 | Mar 16, 2026 | 2026 | 1 |
| Dec 31 | Dec 30, 2026 | 2025 | — |
| Jan 1 | Jan 2, 2026 | 2026 | — |

### Master Number Preservation
| Input | Reduced | Master? |
|---|---|---|
| 29 → 11 | Keep 11 | Yes |
| 22 | Keep 22 | Yes |
| 33 | Keep 33 | Yes |
| 44 | 4+4 = 8 | No (44 is NOT master) |
| 38 | 3+8 = 11 → Keep 11 | Yes |

---

## Cross-Browser Testing

### Required Browsers
| Browser | Version | Priority |
|---|---|---|
| Chrome | Latest | High |
| Safari | Latest (iOS) | High |
| Firefox | Latest | Medium |
| Samsung Internet | Latest | Medium |
| Edge | Latest | Low |

### Common Issues
| Issue | Cause | Fix |
|---|---|---|
| Backdrop-filter not working | Older Safari | Add `-webkit-backdrop-filter` prefix |
| Date parsing fails | Safari strict mode | Use `YYYY-MM-DD` format, not `MM/DD/YYYY` |
| Gradient text invisible | Firefox | Ensure both `-webkit-background-clip` and `background-clip` |
| Animation janky on mobile | GPU overload | Reduce particle count, use `will-change` sparingly |
| Font fallback on first load | FOUT | Use `font-display: swap` in @font-face |

---

## Accessibility Baseline

This ecosystem prioritises visual experience, but maintain these minimums:

- [ ] All `<img>` tags have `alt` attributes
- [ ] All `<button>` elements have visible text or `aria-label`
- [ ] Colour contrast: at least 4.5:1 for body text on dark backgrounds
- [ ] Forms have `<label>` elements associated with inputs
- [ ] Skip navigation is available
- [ ] No content depends solely on colour to convey meaning
- [ ] Screen readers can navigate the 6-section micro-tool structure

---

## Performance Targets

| Metric | Target | Notes |
|---|---|---|
| First Contentful Paint | < 1.5s | No build step = fast |
| Largest Contentful Paint | < 2.5s | Font loading is usually the bottleneck |
| Time to Interactive | < 3s | calculations.js is the heaviest script |
| Cumulative Layout Shift | < 0.1 | No late-loading ads that shift content |
| Total page weight | < 500KB | Excluding fonts and images |

---

## Error Recovery Patterns

### Calculation Errors
```javascript
// ALWAYS wrap calculations in try-catch
try {
    const result = calculateLifePath(birthDate);
    // use result
} catch (error) {
    console.error('Calculation error:', error);
    // Show graceful fallback, never crash the page
    showFallbackMessage("We couldn't calculate this — please check your birth date.");
}
```

### Missing Data
```javascript
// ALWAYS check localStorage before using
const birthDate = localStorage.getItem('userBirthDate');
if (!birthDate) {
    // Prompt user to enter birth date
    showBirthDatePrompt();
    return;
}
```

### Network Failures
```javascript
// For KV/Worker calls, always handle network errors
try {
    const response = await fetch(readingUrl);
    if (!response.ok) throw new Error('Network error');
    // use data
} catch (error) {
    showOfflineFallback();
}
```

---

## Regression Prevention

### After Every Calculation Change, Verify:
1. Life Path for a known date (e.g., 1990-11-29 → 5)
2. Chinese zodiac for a January birth (must check LNY)
3. Chinese zodiac for a March birth (should be current year)
4. Personal Year for someone whose birthday hasn't passed yet
5. Master Number 11 is preserved (not reduced to 2)
6. Challenge number 0 doesn't cause errors

### After Every UI Change, Verify:
1. Mobile layout at 320px
2. Correct font family loaded
3. Background animation renders
4. Navigation menu works (hamburger on mobile)
5. CTA buttons are clickable and correctly linked
6. Footer links work

### After Every Cross-Brand Propagation, Verify:
1. At least 2 different brands produce identical calculation results
2. All engine.js copies have the same LNY table
3. All calculations.js copies have the same CNY table
4. Forecast engine generates forecasts without errors

---

## Bug Report Template

When documenting a bug, include:
```
## Bug: [Short description]
**Location:** [file path + line number]
**Severity:** Critical / High / Medium / Low
**Browser/Device:** [where it was found]

### Steps to Reproduce
1. ...
2. ...
3. ...

### Expected Behaviour
...

### Actual Behaviour
...

### Root Cause
...

### Fix Applied
...

### Files Changed
- [file1] — [what changed]
- [file2] — [what changed]

### Verification
- [ ] Fix tested in [brand1]
- [ ] Fix propagated to all copies
- [ ] Regression tests pass
```

---

*Consult [CALCULATIONS.md](CALCULATIONS.md) for formula edge cases.*
*Consult [ARCHITECT.md](ARCHITECT.md) for propagation rules.*
*Consult [DEPLOY.md](DEPLOY.md) for pre-deployment checks.*
*See [CHINESE-ZODIAC-FIX-REFERENCE.md](CHINESE-ZODIAC-FIX-REFERENCE.md) for a real-world case study of how a cross-brand bug was identified and fixed.*
