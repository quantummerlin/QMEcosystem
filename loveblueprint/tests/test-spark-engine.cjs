// ============================================================
// LOVE BLUEPRINT — STRICT ENGINE VERIFICATION SUITE
// ============================================================
// Run: node loveblueprint/tests/test-spark-engine.cjs  (from soulblueprint/)
// Ground truths cross-checked against published reference values
// (astro.com / USNO / Meeus worked examples). Every test either
// PASSES or the suite exits non-zero — an approximate value can
// never be shipped silently.
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// NOTE: the repo root package.json sets "type": "module", so require() of a
// plain .js file silently returns an empty namespace (no throw, VERSION
// undefined). Load the engine into a CommonJS sandbox via vm instead — this
// also proves the file works as a real browser <script> would see it.
const ENGINE_PATH = path.join(__dirname, '..', 'spark-engine.js');
const sandboxMod = { exports: {} };
vm.runInNewContext(fs.readFileSync(ENGINE_PATH, 'utf8'), {
    module: sandboxMod,
    exports: sandboxMod.exports,
    Math: Math, Date: Date, isFinite: isFinite, String: String, Number: Number,
    JSON: JSON, console: console
}, { filename: ENGINE_PATH });
const SPARK = (sandboxMod.exports && sandboxMod.exports.VERSION) ? sandboxMod.exports : null;
if (!SPARK) { console.log('FATAL: engine did not export SoulSpark API'); process.exit(1); }

let pass = 0, fail = 0;
const failures = [];

function check(name, fn) {
    try {
        fn();
        pass++;
        console.log('  PASS  ' + name);
    } catch (e) {
        fail++;
        failures.push(name + ': ' + e.message);
        console.log('  FAIL  ' + name + ' -> ' + e.message);
    }
}
function approx(actual, expected, tol, label) {
    if (!isFinite(actual) || Math.abs(actual - expected) > tol) {
        throw new Error((label || 'value') + ': expected ' + expected + ' ±' + tol + ', got ' + actual);
    }
}
function eq(actual, expected, label) {
    if (actual !== expected) {
        throw new Error((label || 'value') + ': expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual));
    }
}

console.log('=== LOVE BLUEPRINT STRICT ENGINE v' + SPARK.VERSION + ' ===\n');

// ---------- 1. Sign math (deterministic) ----------
check('signFromLongitude: 0° = Aries 0°', () => {
    const s = SPARK.signFromLongitude(0);
    eq(s.name, 'Aries'); eq(s.element, 'Fire'); approx(s.degree, 0, 1e-9);
});
check('signFromLongitude: 211° = Scorpio 1°', () => {
    const s = SPARK.signFromLongitude(211);
    eq(s.name, 'Scorpio'); approx(s.degree, 1, 1e-9); eq(s.symbol, '\u264F');
});
check('signFromLongitude: normalizes negatives & >360', () => {
    approx(SPARK.signFromLongitude(-30).longitude, 330, 1e-9);
    approx(SPARK.signFromLongitude(725).longitude, 5, 1e-9);
});
check('signFromLongitude: refuses null/NaN', () => {
    eq(SPARK.signFromLongitude(null), null);
    eq(SPARK.signFromLongitude(NaN), null);
});

// ---------- 2. Julian Date (exact anchors) ----------
check('julianDate: J2000.0 epoch = 2451545.0', () => {
    approx(SPARK.julianDate(new Date('2000-01-01T12:00:00Z')), 2451545.0, 1e-9);
});
check('julianDate: known JD 2026-10-07T00:00Z = 2461320.5', () => {
    approx(SPARK.julianDate(new Date('2026-10-07T00:00:00Z')), 2461320.5, 1e-9);
});

// ---------- 3. Mean obliquity (Meeus) ----------
check('obliquity at J2000 = 23.4392911°', () => {
    approx(SPARK.meanObliquityDeg(new Date('2000-01-01T12:00:00Z')), 23.4392911, 1e-6);
});

// ---------- 4. Mean North Node (Meeus 47.6 closed form) ----------
// J2000.0 (2000-01-01 12:00 UT): mean node = 125.0445° -> Leo 5.0°
// (constant is quoted verbatim from Meeus, Astronomical Algorithms eq. 47.x)
check('mean node at J2000 = 125.0446° (Leo 5°)', () => {
    approx(SPARK.meanNorthNodeLongitude(new Date('2000-01-01T12:00:00Z')), 125.0445550, 0.01);
    eq(SPARK.signFromLongitude(SPARK.meanNorthNodeLongitude(new Date('2000-01-01T12:00:00Z'))).name, 'Leo');
});
// 2025-01-01 00:00 UT: hand-computed from the same closed form = 1.4974°
// (Aries 1.5°). Cross-check: mean node ingresses Pisces ~4 weeks later,
// consistent with published late-Jan-2025 ingress. Tolerance is tight;
// if this drifts the implementation changed, not the sky.
check('mean node 2025-01-01 = Aries ~1.50°', () => {
    const lon = SPARK.meanNorthNodeLongitude(new Date('2025-01-01T00:00:00Z'));
    eq(SPARK.signFromLongitude(lon).name, 'Aries');
    approx(lon, 1.4974, 0.05);
});
check('south node = north node + 180° exactly', () => {
    const d = new Date('1994-11-08T02:30:00Z');
    approx(SPARK.signFromLongitude(SPARK.meanNorthNodeLongitude(d) + 180).index,
        (SPARK.signFromLongitude(SPARK.meanNorthNodeLongitude(d)).index + 6) % 12, 1e-12);
});

// ---------- 5. Ascendant / MC (closed-form, ground truth) ----------
// MC ground truths: MC(RAMC 0)=0, MC(90)=90 (Cancer cusp), MC(180)=180,
// MC(270)=270 (Capricorn cusp). The 90/270 cases are exactly where the
// legacy quadrant fix flips the answer 180° wrong; the robust branch picks
// the candidate within 90° of RAMC.
check('midheavenLongitude: RAMC 0° -> 0°', () => {
    approx(SPARK.midheavenLongitude(0, 23.4392911), 0, 0.02);
});
check('midheavenLongitude: RAMC 90° -> 90° (legacy code returned 270° here)', () => {
    approx(SPARK.midheavenLongitude(90, 23.4392911), 90, 0.02);
});
check('midheavenLongitude: RAMC 180° -> 180°', () => {
    approx(SPARK.midheavenLongitude(180, 23.4392911), 180, 0.02);
});
check('midheavenLongitude: RAMC 270° -> 270° (Capricorn cusp)', () => {
    approx(SPARK.midheavenLongitude(270, 23.4392911), 270, 0.02);
});
check('midheavenLongitude: MC RA inverts to RAMC (45° case)', () => {
    // MC = 47.459° must have right ascension atan(tan(λ)cos ε) ≈ 45°
    const mc = SPARK.midheavenLongitude(45, 23.4392911);
    const ra = Math.atan(Math.tan(mc * Math.PI / 180) * Math.cos(23.4392911 * Math.PI / 180)) * 180 / Math.PI;
    approx(norm360t(ra), 45, 0.01);
});
function norm360t(x) { return ((x % 360) + 360) % 360; }
check('ascendantLongitude: LST 90°, equator -> 180° (Libra 0°)', () => {
    // At the equator, when LST=90° the point rising is exactly 180° ecliptic lon.
    approx(SPARK.ascendantLongitude(90, 0, 23.4392911), 180, 0.02);
});
check('ascendantLongitude is always finite 0-360', () => {
    for (let lst = 0; lst < 360; lst += 7) {
        for (const lat of [-60, -30, 0, 30, 60]) {
            const a = SPARK.ascendantLongitude(lst, lat, 23.4392911);
            if (!isFinite(a) || a < 0 || a >= 360) throw new Error('bad asc at ' + lst + '/' + lat);
        }
    }
});
check('MC/Asc relationship: MC falls in houses 9-11 from Asc (mid-latitude)', () => {
    const asc = SPARK.ascendantLongitude(180, 45, 23.4392911);
    const mc = SPARK.midheavenLongitude(180, 23.4392911);
    const gap = ((Math.floor(mc / 30) - Math.floor(asc / 30)) + 12) % 12; // 0-based house offset
    if (gap > 10 || gap < 8) throw new Error('MC-Asc sign gap implausible: ' + (gap + 1) + 'th house');
});

// ---------- 6. Local Sidereal Time (ground truth) ----------
check('LST at Greenwich = GMST (lon 0), J2000 00:00 UT', () => {
    // GMST at 2000-01-01 00:00 UT = 6h 39m 52.3s = 99.9675°
    const lst = SPARK.localSiderealTimeDeg(new Date('2000-01-01T00:00:00Z'), 0);
    approx(lst, 99.9675, 0.01);
});
check('LST increases ~1.00273° per UT minute... per 4min sidereal', () => {
    const l0 = SPARK.localSiderealTimeDeg(new Date('2020-06-15T00:00:00Z'), -71);
    const l1 = SPARK.localSiderealTimeDeg(new Date('2020-06-15T01:00:00Z'), -71);
    approx(((l1 - l0) + 360) % 360, 15.04107, 0.002); // sidereal hour in degrees
});

// ---------- 7. Part of Fortune (exact degree formula) ----------
check('PoF day chart: Asc 100 + Moon 300 - Sun 10 = 30°', () => {
    approx(SPARK.partOfFortuneLongitude(100, 10, 300, true), 30, 1e-9);
});
check('PoF night chart: Asc 100 + Sun 10 - Moon 300 = 170°', () => {
    approx(SPARK.partOfFortuneLongitude(100, 10, 300, false), 170, 1e-9);
});
check('sunIsDiurnal: Sun on meridian at noon = day chart', () => {
    // LST == Sun RA => hour angle 0 => Sun transits => altitude = 90-latitude+dec
    eq(SPARK.sunIsDiurnal(270, 10, 270, 45), true);
});
check('sunIsDiurnal: Sun opposite meridian = night chart', () => {
    eq(SPARK.sunIsDiurnal(90, 10, 270, 45), false);
});

// ---------- 8. Moon phase bucketing (exact angle -> 8 sectors) ----------
check('moonPhaseName: 0° ± eps = New Moon; 180° = Full', () => {
    eq(SPARK.moonPhaseName(0), 'New Moon');
    eq(SPARK.moonPhaseName(359.9), 'New Moon');
    eq(SPARK.moonPhaseName(180), 'Full Moon');
    eq(SPARK.moonPhaseName(90), 'First Quarter');
    eq(SPARK.moonPhaseName(270), 'Last Quarter');
});
check('moonPhaseAngle refuses without astronomy-engine', () => {
    eq(SPARK.moonPhaseAngle(new Date()), null); // not loaded in plain Node
});

// ---------- 9. REFUSAL behaviour (the heart of the standard) ----------
check('engineReady false in bare Node (no window.Astronomy)', () => {
    eq(SPARK.engineReady(), false);
});
check('longitude() refuses without engine (returns null, never a table)', () => {
    eq(SPARK.longitude('venus', new Date('1994-11-08T12:00:00Z')), null);
});
check('computePlacements refuses without engine', () => {
    eq(SPARK.computePlacements(new Date('1994-11-08T12:00:00Z')), null);
});
check('REFUSALS copy exists for every cut/approximate source', () => {
    for (const k of ['engineMissing', 'placeUnresolved', 'timeMissingForAngles', 'chiron', 'lilith', 'vertex']) {
        if (!SPARK.REFUSALS[k] || SPARK.REFUSALS[k].length < 20) throw new Error('missing refusal: ' + k);
    }
});

// ---------- 10. Degree-based aspects (exact separation) ----------
const LIST_A = [
    { label: 'Sun', longitude: 225.0 },   // Scorpio 15°
    { label: 'Venus', longitude: 230.5 }, // Scorpio 20.5°
    { label: 'Moon', longitude: 45.0 }    // Taurus 15°
];
const LIST_B = [
    { label: 'Mars', longitude: 46.2 },   // Taurus 16.2° -> opp Sun (orb 1.2)
    { label: 'Venus', longitude: 320.0 }  // Aquarius 20° -> square Sun (orb 5)
];
check('separation: 225 vs 45 = 180 exactly', () => {
    approx(SPARK.separation(225, 45), 180, 1e-9);
});
check('separation: wraps across 0° (359 vs 1 = 2)', () => {
    approx(SPARK.separation(359, 1), 2, 1e-9);
});
check('natal aspects: Sun-Moon opposition (orb 0), Sun-Venus conjunction (5.5), Moon-Venus opposition (5.5)', () => {
    const asp = SPARK.computeAspects(LIST_A);
    const opp = asp.find(a => a.type === 'opposition');
    const conj = asp.find(a => a.type === 'conjunction');
    if (!opp || opp.a !== 'Sun' || opp.b !== 'Moon' || Math.abs(opp.orb) > 1e-9) throw new Error('bad opposition');
    if (!conj || conj.a !== 'Sun' || conj.b !== 'Venus') throw new Error('bad conjunction');
    eq(asp.length, 3); // every major pair within default orbs
});
check('synastry cross-aspects: my Sun opp their Mars (orb 1.2)', () => {
    const asp = SPARK.computeAspects(LIST_A, LIST_B);
    const o = asp.find(a => a.type === 'opposition');
    if (!o) throw new Error('no cross opposition');
    approx(o.orb, 1.2, 1e-9);
});
check('aspects sorted tightest-first', () => {
    const asp = SPARK.computeAspects(LIST_A, LIST_B);
    for (let i = 1; i < asp.length; i++) {
        if (asp[i].orb < asp[i - 1].orb) throw new Error('not sorted');
    }
});
check('tight custom orb excludes wide aspect', () => {
    const asp = SPARK.computeAspects(LIST_A, LIST_B, { conjunction: 8, opposition: 0.5, trine: 7, square: 6, sextile: 4 });
    eq(asp.some(a => a.type === 'opposition'), false);
});
check('no aspect fabricated beyond orbs (random sweep vs brute force)', () => {
    // For random longitudes, aspect count must equal manual degree check
    let seed = 42;
    function rnd() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648 * 360; }
    for (let t = 0; t < 200; t++) {
        const A = [{ label: 'p1', longitude: rnd() }, { label: 'p2', longitude: rnd() }];
        const B = [{ label: 'p3', longitude: rnd() }, { label: 'p4', longitude: rnd() }];
        const got = SPARK.computeAspects(A, B);
        let want = 0;
        for (const a of A) for (const b of B) {
            const sep = SPARK.separation(a.longitude, b.longitude);
            for (const ty of SPARK.ASPECT_TYPES) {
                if (Math.abs(sep - ty.angle) <= SPARK.DEFAULT_ORBS[ty.name]) { want++; break; }
            }
        }
        if (got.length !== want) throw new Error('mismatch at sweep ' + t + ': ' + got.length + ' vs ' + want);
    }
});

// ---------- 11. utcFromLocal ----------
check('utcFromLocal: Sydney summer (UTC+11) 02:30 local -> 15:30Z prior day', () => {
    const u = SPARK.utcFromLocal(1994, 11, 8, 2, 30, 11);
    eq(u.toISOString(), '1994-11-07T15:30:00.000Z');
});
check('utcFromLocal: negative offset (UTC-3) 20:00 local -> 23:00Z', () => {
    const u = SPARK.utcFromLocal(2000, 6, 15, 20, 0, -3);
    eq(u.toISOString(), '2000-06-15T23:00:00.000Z');
});

console.log('\n' + '='.repeat(52));
console.log(pass + ' passed, ' + fail + ' failed');
if (fail > 0) {
    console.log('\nFAILURES:');
    failures.forEach(f => console.log(' - ' + f));
    console.log('RESULT: NOT SAFE - fix before shipping');
    process.exit(1);
}
console.log('RESULT: all suites green - exact-math verified');
console.log('(ephemeris-dependent paths refuse by design in bare Node;');
console.log(' browser E2E covers them with astronomy-engine loaded)');
