# Agent: CALCULATIONS
> **Role:** Mathematical accuracy guardian — every formula, every edge case, every constant used across the mystical calculation systems.

---

## Critical Rule: Single Source of Truth

**Canonical file:** `amomentintime/calculations.js` (1801 lines, 58 readings)

All other `calculations.js` files are copies that MUST stay synchronised:
- `stranger/calculations.js`
- `kpop/readings/calculations.js`
- `classic/readings/calculations.js`
- `amomentintime/calculations.js`
- `amomentintime/esp/calculations.js`
- `amomentintime/pt/calculations.js`
- `ultimate/calculations.js`

**Before modifying any calculation, check the canonical file first. After modifying, propagate to all copies.**

---

## The Nine Systems — Formula Reference

### 1. NUMEROLOGY

#### Core Reducer
```
reduceToSingleDigit(num, keepMaster = true)
  → Repeatedly sum digits until single digit
  → If keepMaster: STOP at 11, 22, 33 (Master Numbers)
```

#### Letter-to-Number (Pythagorean)
```
A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9
J=1, K=2, L=3, M=4, N=5, O=6, P=7, Q=8, R=9
S=1, T=2, U=3, V=4, W=5, X=6, Y=7, Z=8
```
⚠️ **Z = 8, NOT 9.** This is the Pythagorean system, not Chaldean.

#### Vowels / Consonants
- **Vowels:** A, E, I, O, U
- **Y is a CONSONANT** in this system (always)

#### Life Path Number
```
Input: birthDate → extract day, month, year
Step 1: reducedDay = reduceToSingleDigit(day)
Step 2: reducedMonth = reduceToSingleDigit(month)
Step 3: reducedYear = reduceToSingleDigit(year)
Step 4: lifePath = reduceToSingleDigit(reducedDay + reducedMonth + reducedYear, keepMaster=true)
```
Master Number preservation: if sum = 11, 22, or 33, do NOT reduce further.

#### Destiny / Expression Number
```
Input: fullName → strip non-alpha → sum all letterToNumber() values → reduceToSingleDigit(keepMaster=true)
```

#### Soul Urge (Heart's Desire)
```
Input: fullName → extract vowels only → sum letterToNumber(vowel) → reduceToSingleDigit(keepMaster=true)
```

#### Personality Number
```
Input: fullName → extract consonants only → sum letterToNumber(consonant) → reduceToSingleDigit(keepMaster=true)
```

#### Birthday Number
```
Input: birthDate → day only → reduceToSingleDigit(day, keepMaster=true)
```

#### Maturity Number
```
Input: lifePath, destiny
Formula: reduceToSingleDigit(lifePath + destiny, keepMaster=true)
```

#### Personal Year
```
Input: birthDate, referenceDate (today)
Step 1: If birthday hasn't occurred yet this year → cycleYear = thisYear - 1, else cycleYear = thisYear
Step 2: reducedMonth = reduceToSingleDigit(birthMonth, keepMaster=false)
Step 3: reducedDay = reduceToSingleDigit(birthDay, keepMaster=false)
Step 4: reducedYear = reduceToSingleDigit(cycleYear, keepMaster=false)
Step 5: personalYear = reduceToSingleDigit(reducedMonth + reducedDay + reducedYear, keepMaster=true)
```
⚠️ **Birthday boundary check is critical.** Born Dec 15 → if today is Dec 1, you're still in the PREVIOUS personal year cycle.

#### Personal Month
```
personalMonth = reduceToSingleDigit(personalYear + currentMonth, keepMaster=true)
```

#### Personal Day
```
personalDay = reduceToSingleDigit(personalMonth + currentDayOfMonth, keepMaster=true)
```

#### Pinnacles (4 life phases)
```
d = reduceToSingleDigit(day), m = reduceToSingleDigit(month), y = reduceToSingleDigit(year)

1st Pinnacle = reduceToSingleDigit(d + m)
2nd Pinnacle = reduceToSingleDigit(d + y)
3rd Pinnacle = reduceToSingleDigit(1st + 2nd)
4th Pinnacle = reduceToSingleDigit(m + y)

Age ranges: 
  1st ends at: 36 - lifePath
  2nd ends at: (36 - lifePath) + 9
  3rd ends at: (36 - lifePath) + 18
  4th: rest of life
```

#### Challenges (4 life challenges)
```
d = reduceToSingleDigit(day, false), m = reduceToSingleDigit(month, false), y = reduceToSingleDigit(year, false)

1st = |d - m|
2nd = |d - y|
3rd = |1st - 2nd|
4th = |m - y|
```
⚠️ Challenges can be 0. This is valid.

#### Hidden Passion
```
Count frequency of each value (1-9) across all letters in name.
The most frequent value = Hidden Passion number.
```

#### Karmic Debt
```
Karmic numbers: [13, 14, 16, 19]
Check the INTERMEDIATE SUMS (before final reduction) in:
  1. Life Path chain
  2. Raw birthday (if day = 13, 14, 16, or 19)
  3. Destiny sum chain
  4. Soul Urge sum chain
  5. Personality sum chain

If an intermediate sum is 13, 14, 16, or 19 → karmic debt detected.
Master Numbers (11, 22, 33) STOP the reduction chain.
```

#### Master Numbers
```
Master Numbers: 11, 22, 33
Check: lifePath, destiny, soulUrge
If any equals 11, 22, or 33 → flag as Master Number.
```

---

### 2. WESTERN ASTROLOGY

#### Sun Sign
```
Match birthDate (month, day) to ZODIAC_SIGNS ranges.
Edge case: Capricorn wraps Dec 22 – Jan 19.
Default fallback: Aries (if no match, which shouldn't happen).
```

#### Moon Sign
```
Reference: yearlyMoonPositions[year] = ecliptic longitude at Jan 1 00:00 UT (1960-2030)
Moon daily motion: 13.176358°/day
UTC offset: use location timezone
daysSinceRef = days from Jan 1 of birth year to birth datetime (in UT)
longitude = refLongitude + (daysSinceRef × 13.176358), normalised to 0-360
signIndex = floor(longitude / 30)

If birth year not in table → use nearest year as reference.
If no birth time available → default to noon local time.
```

#### Rising Sign (Ascendant)
```
Requires: birth time + location (latitude, longitude)
Step 1: Convert local time to UT
Step 2: Calculate Julian Day Number (JD)
Step 3: Calculate Greenwich Mean Sidereal Time (GMST) at 0h UT
Step 4: Add sidereal elapsed time (rate = 1.00273790935)
Step 5: Local Sidereal Time (LST) = GMST + longitude
Step 6: Ascendant = atan2(cos(LST), -(sin(LST)·cos(ε) + tan(lat)·sin(ε)))
  where ε = obliquity = 23.4393°
Step 7: Normalise to 0-360, signIndex = floor(ascendant / 30)
```

#### Planetary Positions
```
3 tiers:
1. Monthly ephemeris (Mercury, Venus, Mars): ephemeris[year][month]
2. Yearly ephemeris (Jupiter, Saturn): ephemeris[year]
3. Orbital calculation for outer planets (Uranus, Neptune, Pluto):
   L = L0 + rate × daysSinceJ2000

Mean orbital rates (°/day):
  Mercury: 4.09233445    Venus: 1.60213049     Mars: 0.52402068
  Jupiter: 0.08308529    Saturn: 0.03344414     Uranus: 0.01172834
  Neptune: 0.00598103    Pluto: 0.00396795

Mercury fallback: Sun position ± 1 sign based on birth day (≤10: prev, ≥20: same)
```

#### Houses (Whole Sign)
```
Requires: birth time (for Rising Sign)
12 houses, each = 1 sign starting from Rising Sign index.
House N sign = (risingIndex + N - 1) % 12
```

#### Aspects
```
Angle = |sign1Index - sign2Index| × 30, clamped to 0-180°
Orb tolerance: 8°

Major aspects:
  Conjunction: 0° ± 8° → neutral
  Sextile: 60° ± 8° → harmonious
  Square: 90° ± 8° → challenging
  Trine: 120° ± 8° → harmonious
  Opposition: 180° ± 8° → challenging
```

#### Stelliums
```
Count planets per sign. 3+ in one sign = stellium.
Intensity: 3 = significant, 4 = powerful, 5+ = extreme.
```

#### Chiron
```
~50-year irregular orbit. Interpolated between reference years.
Wraparound correction: if longDiff > ±180°, adjust.
```

#### Black Moon Lilith
```
Mean Lunar Apogee. 8.85-year cycle.
Reference: Jan 1, 2000 at 265° (Sagittarius).
Daily motion: 0.1114° prograde.
```

#### North Node / South Node
```
North Node: retrograde motion, -0.0529°/day (~19.3°/year).
Interpolated from reference year table.
South Node: opposite sign = (northIndex + 6) % 12.
```

#### Part of Fortune
```
Formula: (ascIndex + moonIndex - sunIndex + 12) % 12
Requires Rising Sign (null if unknown).
```

---

### 3. CHINESE ZODIAC ⚠️ LNY-CRITICAL

#### Lunar New Year Date Check
```
CHINESE_NEW_YEAR_DATES = {
  1924: [2,5], 1925: [1,24], 1926: [2,13], 1927: [2,2], 1928: [1,23],
  ... (120 entries through 2043)
}

Algorithm:
  1. Get year from birthDate
  2. Look up CNY date: CHINESE_NEW_YEAR_DATES[year] → [cnyMonth, cnyDay]
  3. If birth month < cnyMonth → chineseYear = year - 1
  4. If birth month == cnyMonth AND birth day < cnyDay → chineseYear = year - 1
  5. Otherwise → chineseYear = year
```
⚠️ **THIS CHECK IS MANDATORY.** January/February births may belong to the PREVIOUS zodiac animal. The 2025-2026 bug (showing Wood Snake instead of Fire Horse) was caused by skipping this check.

#### Animal Determination
```
12 animals: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig
Primary: Match chineseYear against hardcoded years[] arrays (1924-2043).
Fallback: ((chineseYear - 1924) % 12 + 12) % 12
```

#### Element Determination
```
5 elements, each rules 2 consecutive years:
Cycle: ['Wood','Wood','Fire','Fire','Earth','Earth','Metal','Metal','Water','Water']
Formula: elements[((chineseYear - 1924) % 10 + 10) % 10]

By last digit of chineseYear:
  4,5 = Wood | 6,7 = Fire | 8,9 = Earth | 0,1 = Metal | 2,3 = Water
```

**2026 example:** LNY 2026 is [2,17] (Feb 17). Born Jan 15, 2026 → chineseYear = 2025 → Snake (Wood). Born Mar 1, 2026 → chineseYear = 2026 → Horse (Fire).

---

### 4. MOON PHASES

```
Reference New Moon: January 6, 2000 at 18:14 UTC
Synodic month: 29.53058867 days

daysSinceNewMoon = (birthDate - referenceDate) in days
phase = daysSinceNewMoon % 29.53058867 (handle negative with + synodic)

Phase ranges (in days within cycle):
  New Moon:        [0, 1.85]
  Waxing Crescent: [1.85, 7.38]
  First Quarter:   [7.38, 11.07]
  Waxing Gibbous:  [11.07, 14.76]
  Full Moon:       [14.76, 18.46]
  Waning Gibbous:  [18.46, 22.15]
  Third Quarter:   [22.15, 25.84]
  Waning Crescent: [25.84, 29.53]
```

---

### 5. BIORHYTHM

```
daysSinceBirth = floor((targetDate - birthDate) / 86400000)

Physical:    sin(2π × daysSinceBirth / 23) × 100
Emotional:   sin(2π × daysSinceBirth / 28) × 100
Intellectual:sin(2π × daysSinceBirth / 33) × 100
Intuitive:   sin(2π × daysSinceBirth / 38) × 100
Spiritual:   sin(2π × daysSinceBirth / 53) × 100

Values range: -100 to +100
Critical days: when value crosses zero (transition days)
```

---

### 6. GEMATRIA (English Ordinal)

```
A=1, B=2, C=3, ... Z=26
Sum all letter values in text. Spaces and non-alpha ignored.
Example: "ABUNDANCE" = 1+2+21+14+4+1+14+3+5 = 65
```

---

### 7. FORECAST ENGINE (CosmicEngine)

**Canonical file:** `amomentintime/forecasts/engine.js`

The CosmicEngine combines all systems to generate date-specific forecasts:

```
generateForecast(name, birthDate, targetDate)
  → Uses calculateForDate(birthDate) for Chinese zodiac (not calculate(year))
  → Generates daily, weekly, monthly guidance
  → Combines numerology personal year/month/day with transits

generateYearlyForecast(name, birthDate, year)
  → Uses calculateForDate(birthDate) for Chinese zodiac
  → Annual overview with all system energies
```

The engine has its own Chinese zodiac implementation with:
- `lunarNewYearDates` (2020-2035)
- `getChineseYear(date)` — returns Chinese year accounting for LNY
- `calculate(year)` — LEGACY, year-only (don't use)
- `calculateForDate(date)` — CORRECT, date-aware
- `currentYearEnergyForDate(date, birthAnimal)` — current year relationship

---

## Edge Cases & Gotchas

| Issue | Rule |
|---|---|
| Master Numbers 11, 22, 33 | Preserve during reduction in Life Path, Destiny, Soul Urge. Do NOT preserve in intermediate challenge/pinnacle component reduction. |
| Z = 8 | Pythagorean system. NOT Chaldean. |
| Y = consonant | Always. No vowel exception. |
| Karmic Debt chain | Master Numbers stop the chain — don't reduce past 11/22/33. |
| Personal Year birthday boundary | If your birthday hasn't passed yet, you're in the PREVIOUS year's cycle. |
| Chinese zodiac LNY | Always check. Jan/Feb births may belong to previous year. |
| Moon sign without birth time | Default to noon local time. |
| Rising sign without birth time | Return null/unknown. Never guess. |
| Capricorn sun sign | Wraps year boundary (Dec 22 – Jan 19). Special case in matching. |
| Challenge number = 0 | Valid. Don't treat as error. |
| Pinnacle age formula | 36 - lifePath for first period end age. |
| Moon daily motion | 13.176358°/day — use this exact constant. |
| Obliquity of ecliptic | 23.4393° — use this exact constant. |
| Synodic month | 29.53058867 days — use this exact constant. |

---

## Test Cases

### Chinese Zodiac LNY Test
```
Born: 2026-01-15 → Before LNY (Feb 17) → chineseYear = 2025 → Snake, Wood
Born: 2026-03-01 → After LNY → chineseYear = 2026 → Horse, Fire
Born: 2025-01-29 → LNY 2025 is Jan 29 → Born ON LNY → chineseYear = 2025 → Snake, Wood
Born: 2025-01-28 → One day before LNY → chineseYear = 2024 → Dragon, Wood
```

### Life Path Test
```
Born: 1990-11-29
Day: 29 → 2+9 = 11 (Master!)
Month: 11 (Master!)
Year: 1990 → 1+9+9+0 = 19 → 1+9 = 10 → 1+0 = 1
Sum: 11 + 11 + 1 = 23 → 2+3 = 5
Life Path = 5
```

### Personal Year Test
```
Born: March 15
Current date: January 30, 2026
Birthday hasn't passed → cycleYear = 2025
Month: 3 → 3, Day: 15 → 6, Year: 2025 → 9
Sum: 3+6+9 = 18 → 9
Personal Year = 9
```

---

*Consult [ARCHITECT.md](ARCHITECT.md) for file locations and propagation rules.*
*Consult [QA.md](QA.md) for validation checklists.*
