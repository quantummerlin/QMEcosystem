# Case Study: The Chinese Zodiac LNY Bug Fix
> **Purpose:** A real-world example of how a bug propagated across the ecosystem, how it was found, and how it was systematically fixed. Use this as a template for preventing and fixing cross-brand drift.

---

## The Bug

**Reported:** "It is currently the year of the Fire Horse but it is saying Wood Snake"

**Root Cause:** Multiple `calculations.js` and `engine.js` files determined the Chinese zodiac animal and element using only the Gregorian birth year (`year % 12`), without checking whether the date fell before or after the Lunar New Year. For dates in January or early February, this could assign the wrong animal AND the wrong element.

**Impact:** Incorrect Chinese zodiac results for:
- Any birth date in January or early February
- The "current year energy" display in forecasts
- Compatibility calculations involving Chinese zodiac

---

## How the Bug Spread

The ecosystem has **code duplication by design** — each brand folder has its own copy of `calculations.js` and `engine.js`. The canonical source (`amomentintime/calculations.js`) had the fix with proper LNY date tables, but when other brands were created by copying files, some copies:

1. Never got the LNY table added
2. Had the LNY table but callers used `calculate(year)` instead of `calculateForDate(date)`
3. Had partial implementations that covered some but not all code paths

This is the **drift problem** — copies diverge from the source over time.

---

## The Audit

A systematic audit categorised every file into:

### Already Correct (9 files)
- `amomentintime/calculations.js` — had full LNY table + date checking
- `chinesezodiac/` — modern TS implementation with proper date logic
- Several files that happened to have the fix

### Broken — Had Full Date Available But Didn't Use It (16 callers)
These files had the user's birth **date** available but passed only the **year** to the zodiac function.

### Broken — Year-Only Input (13 files)
These files only had a year value and needed a date lookup table added.

---

## The Fix — 13 Files Changed

### Fix Pattern 1: `calculations.js` files (7 files)

**What was added:**
```javascript
const CHINESE_NEW_YEAR_DATES = {
    1924: [2,5], 1925: [1,24], 1926: [2,13], // ...
    // 120 entries spanning 1924-2043
    2043: [1,22]
};
```

**What was changed:**
```javascript
// BEFORE (broken):
calculateChineseZodiac(birthDate) {
    const year = new Date(birthDate).getFullYear();
    // Used year directly → wrong for Jan/Feb births

// AFTER (fixed):
calculateChineseZodiac(birthDate) {
    const d = new Date(birthDate);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    
    let chineseYear = year;
    const cny = CHINESE_NEW_YEAR_DATES[year];
    if (cny) {
        if (month < cny[0] || (month === cny[0] && day < cny[1])) {
            chineseYear = year - 1;
        }
    }
    // Now uses chineseYear for both animal AND element lookup
```

**Files:** `amomentintime/calculations.js`, `stranger/calculations.js`, `kpop/readings/calculations.js`, `classic/readings/calculations.js`, `amomentintime/esp/calculations.js`, `amomentintime/pt/calculations.js`, `ultimate/calculations.js`

### Fix Pattern 2: `engine.js` files (5 files)

**What was added** (to files that didn't have it):
```javascript
lunarNewYearDates: { 2020:[1,25], 2021:[2,12], ..., 2035:[1,26] },

getChineseYear(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const lnyDate = this.lunarNewYearDates[year];
    if (lnyDate && (month < lnyDate[0] || (month === lnyDate[0] && day < lnyDate[1]))) {
        return year - 1;
    }
    return year;
},

calculateForDate(date) {
    const chineseYear = this.getChineseYear(date);
    return this.calculate(chineseYear);
},

currentYearEnergyForDate(date, birthAnimal) {
    const chineseYear = this.getChineseYear(date || new Date());
    const currentAnimal = this.calculate(chineseYear);
    // ... relationship calculation
}
```

**What was changed** (in callers):
```javascript
// BEFORE (broken):
const chineseZodiac = this.chineseZodiac.calculate(year);

// AFTER (fixed):
const chineseZodiac = this.chineseZodiac.calculateForDate(bd);
```

**Files:** `amomentintime/forecasts/engine.js` (caller fix), `stranger/forecasts/engine.js`, `kpop/readings/forecasts/engine.js`, `classic/readings/forecasts/engine.js`, `amomentintime/forecasts/forecast/engine.js` (full LNY additions + caller fixes)

### Fix Pattern 3: `compatability.js` (1 file)

```javascript
// Added LNY dates 2020-2043 to getChineseZodiac()
// Added date boundary check before animal determination
```

---

## Commit

```
Fix Chinese zodiac: add lunar new year date checking across all engines and calculators

13 files changed, 553 insertions, 64 deletions
Commit: 8c293344
```

---

## Lessons Learned

### 1. The Canonical Source Pattern Works — When Enforced
`amomentintime/calculations.js` already had the fix. The bug existed because copies didn't get the update.

**Prevention:** Always fix the canonical source FIRST, then propagate. Never fix a copy without checking the source.

### 2. Callers Matter as Much as Functions
The `engine.js` files had `calculateForDate(date)` available but some internal callers still used `calculate(year)`. Having the right function isn't enough — every call site must use it.

**Prevention:** When adding a date-aware version of a function, grep for all callers of the old version and update them.

### 3. Find All Copies Before Starting
The command `find . -name "calculations.js" -not -path "*/node_modules/*"` immediately revealed 8 copies. Without this, you'd fix one and miss seven.

**Prevention:** Always search for all copies before starting a fix.

### 4. Edge Cases Live at Boundaries
The bug only affected January/February births. If you only test with June birthdays, you'd never see it.

**Prevention:** Always test with boundary dates: Jan 1, the day before LNY, the day of LNY, the day after LNY, Dec 31.

### 5. This Case Study IS the Pattern
Every cross-brand bug will follow this same shape:
1. **Discover** the bug in one place
2. **Audit** all copies systematically
3. **Fix** the canonical source
4. **Propagate** to all copies
5. **Test** with edge cases
6. **Commit** atomically with full file list

---

## Quick Reference: Finding All Copies

```bash
# calculations.js copies
find . -name "calculations.js" -not -path "*/node_modules/*"

# engine.js copies
find . -path "*/forecasts/engine.js"
find . -path "*/forecasts/forecast/engine.js"

# compatibility engine
find . -name "compatability.js" -o -name "compatibility.js"

# Any file containing a specific function
grep -rl "calculateChineseZodiac" --include="*.js" .
grep -rl "chineseZodiac.calculate(" --include="*.js" .
```

---

*This case study demonstrates the fix-propagate-verify pattern. Apply it to every cross-brand bug.*
*Consult [CALCULATIONS.md](CALCULATIONS.md) for the complete Chinese zodiac formula.*
*Consult [QA.md](QA.md) for the full LNY validation test table.*
*Consult [ARCHITECT.md](ARCHITECT.md) for canonical file locations.*
