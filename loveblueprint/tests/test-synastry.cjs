// ============================================================
// LOVE BLUEPRINT — SYNASTRY VERIFICATION SUITE
// ============================================================
// Ground-truth based. Expected values BELOW were HAND-COMPUTED
// from the ephemeris longitudes verified by groundtruth-chart.cjs:
//
//   Wayne 1994-11-07T15:30Z: Sun 224.9959, Moon 281.7271,
//     Mercury 206.3900, Venus 217.5179, Mars 137.5268,
//     Saturn 335.6807, Asc 150.5557 (Desc 330.5557)
//   Luna 1996-03-11T21:15Z: Sun 351.5840, Moon 250.7620,
//     Mercury 337.2804, Venus 36.4167, Mars 350.0257,
//     Saturn 356.7394, Asc 2.8690 (Desc 182.8690)
//
// Hand-checked expectations for Wayne x Luna:
//   chemistry: NO pair within orb -> dimension "no contact"
//   safety:    Venus-Venus opposition 178.90 sep (orb 1.10,
//              strength .817, tone -.75) -> score ~13
//   communication: Venus(W)-Mercury(L) trine 119.76 (orb .24,
//              strength .952, tone +1) -> score 100
//   longevity: NO pair within orb (Saturn-Moon square is 84.92
//              sep, orb 5.08 > 5 — OUTSIDE orb, must NOT count)
//   overall = (13*.28 + 100*.17)/.45 = ~46, coverage 45%
//   ease = 50 + ((-.75*.28)+(1*.17))/.45*50 = ~46
//   composite: Sun Cap ~18.3, Moon Sag ~26.2, Venus Aq ~7.0,
//              Mercury Cap ~1.8, Mars Gem ~3.8
//
// Run: node loveblueprint/tests/test-synastry.cjs
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const LB = path.join(__dirname, '..');
const ROOT = path.join(LB, '..');

const sandbox = {
    console, Math, Date, JSON, isFinite, isNaN, parseInt, parseFloat,
    String, Number, Array, Object, Boolean, RegExp, Error,
    btoa: s => Buffer.from(s, 'binary').toString('base64'),
    atob: s => Buffer.from(s, 'base64').toString('binary'),
    setTimeout, clearTimeout
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

function load(file) {
    vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}
const Astro = require('astronomy-engine');
sandbox.Astronomy = Astro;

load(path.join(LB, 'vendor', 'astronomy.browser.min.js'));
// geocoder lives with the sibling soulblueprint site; resolve either layout
function geoFile(name) {
    const a = path.join(ROOT, name);
    return fs.existsSync(a) ? a : path.join(ROOT, 'soulblueprint', name);
}
load(geoFile('geo-data.js'));
load(geoFile('geocode.js'));
load(path.join(LB, 'spark-engine.js'));
load(path.join(LB, 'dating-content.js'));
load(path.join(LB, 'spark-runtime.js'));
load(path.join(LB, 'synastry.js'));

const RT = sandbox.SparkRuntime;
const SYN = sandbox.SoulSparkSynastry;
const S = sandbox.SoulSpark;

let pass = 0, fail = 0;
const failures = [];
function check(name, fn) {
    try { fn(); pass++; console.log('  PASS  ' + name); }
    catch (e) { fail++; failures.push(name + ': ' + e.message); console.log('  FAIL  ' + name + ' -> ' + e.message); }
}
function eq(a, b, label) { if (a !== b) throw new Error((label || 'value') + ': expected ' + JSON.stringify(b) + ', got ' + JSON.stringify(a)); }
function approx(a, b, tol, label) { if (!isFinite(a) || Math.abs(a - b) > tol) throw new Error((label || 'value') + ': expected ' + b + ' \u00B1' + tol + ', got ' + a); }
function ok(v, label) { if (!v) throw new Error((label || 'condition') + ' was falsy'); }

console.log('=== LOVE BLUEPRINT SYNASTRY SUITE v' + '1.0.0' + ' ===\n');

// ---------- Real charts (same inputs as ground truth tools) ----------
const WAYNE = RT.computeChart({ name: 'Wayne Michael', birthDate: '1994-11-08', birthTime: '02:30', birthPlace: 'Sydney, Australia' });
const LUNA  = RT.computeChart({ name: 'Luna', birthDate: '1996-03-12', birthTime: '08:15', birthPlace: 'Melbourne, Australia' });

check('both charts compute exactly', () => { ok(WAYNE.ok && LUNA.ok); });

// ---------- pointsFromChart ----------
check('pointsFromChart: Wayne has 8 exact points incl Descendant', () => {
    const pts = SYN.pointsFromChart(WAYNE);
    const labels = pts.map(p => p.label);
    ['Sun', 'Venus', 'Mars', 'Mercury', 'Saturn', 'Moon', 'Descendant'].forEach(l =>
        ok(labels.includes(l), 'missing ' + l));
    eq(labels.includes('Jupiter'), true, 'Jupiter');
});
check('pointsFromChart: chart without time/place -> no Descendant/Moon if uncertain', () => {
    const c = RT.computeChart({ name: 'X', birthDate: '1990-06-15' });
    const pts = SYN.pointsFromChart(c);
    const labels = pts.map(p => p.label);
    eq(labels.includes('Descendant'), false, 'Descendant must be absent');
});
check('pointsFromChart: refuses a failed chart', () => {
    eq(SYN.pointsFromChart(null), null);
    eq(SYN.pointsFromChart({ ok: false }), null);
});

// ---------- Wayne x Luna: hand-computed ground truth ----------
const R = SYN.analyze(WAYNE, LUNA);
check('analyze(Wayne, Luna) succeeds with degree precision', () => {
    ok(R.ok, JSON.stringify(R.reason || ''));
    eq(R.precision, 'degree');
});
check('chemistry dimension: NO contact (hand-verified: all pairs outside orb)', () => {
    const d = R.dims.find(x => x.key === 'chemistry');
    eq(d.contacted, false, 'chemistry contacted');
    eq(d.score, null, 'chemistry score must be null, never padded');
});
check('safety: Venus-Venus opposition orb 1.10, score ~13', () => {
    const d = R.dims.find(x => x.key === 'safety');
    eq(d.contacted, true);
    const vv = d.hits.find(h => h.a === 'Venus' && h.b === 'Venus');
    ok(vv, 'Venus-Venus hit missing');
    eq(vv.type, 'opposition');
    approx(vv.separation, 178.90, 0.05, 'Venus-Venus separation');
    approx(vv.orb, 1.10, 0.05, 'orb');
    approx(d.score, 13, 2, 'safety score');
});
check('communication: Venus(W)-Mercury(L) trine orb 0.24, score ~100', () => {
    const d = R.dims.find(x => x.key === 'communication');
    eq(d.contacted, true);
    const vm_ = d.hits.find(h => h.a === 'Venus' && h.b === 'Mercury');
    ok(vm_, 'Venus-Mercury hit missing');
    eq(vm_.type, 'trine');
    approx(vm_.separation, 119.76, 0.05, 'sep');
    approx(d.score, 100, 1, 'communication score');
});
check('longevity: NO contact (Saturn-Moon sep 84.92 -> orb 5.08 > 5, must NOT count)', () => {
    const d = R.dims.find(x => x.key === 'longevity');
    eq(d.contacted, false, 'longevity contacted');
    eq(d.score, null);
});
check('overall renormalizes over contacted dims only: ~46 over 45% coverage', () => {
    eq(R.contactedCount, 2);
    eq(R.totalDims, 4);
    eq(R.coverage, 45);
    approx(R.overall, 46, 3, 'overall');
    approx(R.ease, 46, 3, 'ease');
});
check('contact axis is a density measure 0-100', () => {
    ok(R.contact >= 0 && R.contact <= 100, 'contact range: ' + R.contact);
});
check('every reported aspect carries measured separation + orb text', () => {
    R.notable.forEach(h => {
        ok(isFinite(h.separation) && isFinite(h.orb), 'missing measurements');
        ok(/apart, orb/.test(h.text), 'audit text: ' + h.text);
    });
});

// ---------- Self-synastry symmetry ----------
check('analyze(Wayne, Wayne): all dims contacted; ease 81 by hand-math', () => {
    const w = SYN.analyze(WAYNE, WAYNE);
    ok(w.ok);
    eq(w.contactedCount, w.totalDims, 'all dims contacted (identical charts aspect themselves)');
    // Hand-math: identical charts produce Moon-Moon conj (+1), Venus-Venus
    // conj (+1), Mercury-Mercury conj (+1), Venus-Saturn trine 1.84 orb (+1),
    // BUT Mars-Mars conj at orb 0 -> charged tone (-0.25): two identical
    // wills clashing is intense, not easy. Chemistry dim tone = -0.25.
    // ease = 50 + ((-0.25*.30) + .28 + .17 + .25)*50 = 81.25 -> 81.
    // A "clone date" scoring below 100 is CORRECT model behavior.
    approx(w.ease, 81, 1, 'ease');
    approx(w.overall, 81, 1, 'overall');
    const chem = w.dims.find(d => d.key === 'chemistry');
    const mm = chem.hits.find(h => h.a === 'Mars' && h.b === 'Mars');
    ok(mm && mm.type === 'conjunction' && mm.orb < 0.01, 'Mars-Mars exact conj');
    ok(mm.tone < 0, 'Mars conj must be charged, not harmonious');
});

// ---------- Composite midpoints (hand-computed) ----------
check('midpoint: simple case 10/50 = 30', () => approx(SYN.midpoint(10, 50), 30, 1e-9));
check('midpoint: wraps through 0 (350/10 = 0)', () => approx(SYN.midpoint(350, 10), 0, 1e-9));
check('midpoint: 180-degree ambiguity resolves to shorter arc', () => {
    // 0 and 180: either midpoint is "valid"; must be deterministic & finite
    const m = SYN.midpoint(0, 180);
    ok(m === 90 || m === 270, 'got ' + m);
});
check('composite Wayne x Luna: Sun Cap ~18.3, Moon Sag ~26.2, Venus Aq ~7.0, Mercury Cap ~1.8, Mars Gem ~3.8', () => {
    const comp = R.composite;
    ok(comp, 'composite missing');
    eq(comp.Sun.name, 'Capricorn');     approx(comp.Sun.degree, 18.3, 0.15, 'composite Sun');
    eq(comp.Moon.name, 'Sagittarius');  approx(comp.Moon.degree, 26.2, 0.15, 'composite Moon');
    eq(comp.Venus.name, 'Aquarius');    approx(comp.Venus.degree, 7.0, 0.15, 'composite Venus');
    eq(comp.Mercury.name, 'Capricorn'); approx(comp.Mercury.degree, 1.8, 0.15, 'composite Mercury');
    eq(comp.Mars.name, 'Gemini');       approx(comp.Mars.degree, 3.8, 0.15, 'composite Mars');
});

// ---------- Refusal behavior ----------
check('analyze refuses when one chart lacks minimum points', () => {
    const partial = { ok: true, placements: { sun: WAYNE.placements.sun } }; // no venus/mars
    const r = SYN.analyze(partial, WAYNE);
    eq(r.ok, false);
    ok(/minimum/.test(r.reason), 'reason copy');
});
check('charts without Descendant still analyze (dims skip withheld points)', () => {
    const a = RT.computeChart({ name: 'A', birthDate: '1992-07-19' });  // no time/place
    const b = RT.computeChart({ name: 'B', birthDate: '1993-01-25' });
    const r = SYN.analyze(a, b);
    ok(r.ok || !r.ok, 'must not throw');
    if (r.ok) {
        const long = r.dims.find(d => d.key === 'longevity');
        // Descendant pairs can't fire without Descendant on both sides
        long.hits.forEach(h => {
            ok(h.a !== 'Descendant' && h.b !== 'Descendant', 'Descendant hit without exact angles');
        });
    }
});

// ---------- Aspect detection sanity (synthetic longitudes) ----------
check('orb boundary: 4.99 counts, 5.01 does not (trine, orb 5)', () => {
    const A = [{ label: 'Venus', longitude: 0 }, { label: 'Mars', longitude: 0 }, { label: 'Sun', longitude: 0 }];
    // trine at 120: B at 124.99 (orb 4.99) vs 125.01 (orb 5.01)
    const in1  = S.computeAspects(A, [{ label: 'Venus', longitude: 124.99 }, { label: 'Mars', longitude: 30 }, { label: 'Sun', longitude: 30 }], SYN.ORBS);
    const out1 = S.computeAspects(A, [{ label: 'Venus', longitude: 125.01 }, { label: 'Mars', longitude: 30 }, { label: 'Sun', longitude: 30 }], SYN.ORBS);
    ok(in1.some(a => a.type === 'trine'), 'orb 4.99 must count');
    ok(!out1.some(a => a.type === 'trine'), 'orb 5.01 must NOT count');
});

console.log('\n' + '='.repeat(52));
console.log(pass + ' passed, ' + fail + ' failed');
if (fail > 0) {
    console.log('\nFAILURES:');
    failures.forEach(f => console.log(' - ' + f));
    console.log('RESULT: NOT SAFE - fix before wiring UI');
    process.exit(1);
}
console.log('RESULT: synastry verified against hand-computed ground truth');
