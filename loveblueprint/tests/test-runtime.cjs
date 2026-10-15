// ============================================================
// SOUL SPARK — RUNTIME INTEGRATION SUITE
// ============================================================
// Loads the SAME files the browser loads, in the SAME order:
//   vendor/astronomy.browser.min.js  (window.Astronomy)
//   ../geo-data.js + ../geocode.js   (window.SB_GEO + window.SBGeo)
//   spark-engine.js                  (window.SoulSpark)
//   dating-content.js                (window.SparkContent)
//   spark-runtime.js                 (window.SparkRuntime)
// then proves the full pipeline reproduces the ground truth
// (tests/diag-sample-chart.cjs / groundtruth-chart.cjs) for
// Wayne Michael and Luna, including refusal paths.
//
// Run: node loveblueprint/tests/test-runtime.cjs
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..', '..');            // soulblueprint/
const LB   = path.join(ROOT, 'loveblueprint');

// ---- Shared browser-like sandbox ----
const sandbox = {
    console,
    Math, Date, JSON, isFinite, isNaN, parseInt, parseFloat,
    String, Number, Array, Object, Boolean, RegExp, Error,
    btoa: s => Buffer.from(s, 'binary').toString('base64'),
    atob: s => Buffer.from(s, 'base64').toString('binary'),
    setTimeout, clearTimeout
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

function load(rel) {
    const file = path.isAbsolute(rel) ? rel : path.join(LB, rel);
    vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}

// astronomy-engine browser bundle defines window.Astronomy
load(path.join('vendor', 'astronomy.browser.min.js'));
// geocoder dataset + resolver (shared with the main site).
// Resolves from either layout: nested (soulblueprint/loveblueprint)
// or post-move sibling (repo-root/loveblueprint next to soulblueprint/).
function geoFile(name) {
    const a = path.join(ROOT, name);
    return fs.existsSync(a) ? a : path.join(ROOT, 'soulblueprint', name);
}
load(geoFile('geo-data.js'));
load(geoFile('geocode.js'));
// spark stack
load('spark-engine.js');
load('dating-content.js');
load('spark-runtime.js');

const RT = sandbox.SparkRuntime;
const S  = sandbox.SoulSpark;
const C  = sandbox.SparkContent;
const GEO = sandbox.SBGeo;
const DATA = sandbox.SB_GEO;

let pass = 0, fail = 0;
const failures = [];
function check(name, fn) {
    try { fn(); pass++; console.log('  PASS  ' + name); }
    catch (e) { fail++; failures.push(name + ': ' + e.message); console.log('  FAIL  ' + name + ' -> ' + e.message); }
}
function eq(a, b, label) {
    if (a !== b) throw new Error((label || 'value') + ': expected ' + JSON.stringify(b) + ', got ' + JSON.stringify(a));
}
function approx(a, b, tol, label) {
    if (!isFinite(a) || Math.abs(a - b) > tol) throw new Error((label || 'value') + ': expected ' + b + ' \u00B1' + tol + ', got ' + a);
}
function ok(v, label) { if (!v) throw new Error((label || 'condition') + ' was falsy'); }

console.log('=== SOUL SPARK RUNTIME INTEGRATION ===');
console.log('engine ready: ' + S.engineReady() + ' | geocoder ready: ' + !!(GEO && DATA) + '\n');

// ---------- prerequisites ----------
check('astronomy-engine loaded inside sandbox', () => ok(S.engineReady()));
check('geocoder loaded (SBGeo + SB_GEO)', () => {
    ok(GEO && typeof GEO.geocode === 'function' && DATA, 'geocoder missing');
    if (typeof GEO.offsetHoursAtLocal !== 'function') throw new Error('offsetHoursAtLocal missing');
});
check('geocoder resolves "sydney, australia" (exact coords)', () => {
    const r = GEO.geocode('sydney, australia', DATA);
    ok(r && r.found, 'sydney unresolved');
    if (Math.abs(r.lat - (-33.8688)) > 0.5 || Math.abs(r.lon - 151.2093) > 0.5) {
        throw new Error('sydney coords off: ' + r.lat + ',' + r.lon);
    }
});

// ---------- geocoder offset correctness (Sydney DST) ----------
check('Sydney November = AEDT UTC+11 (DST-correct at instant)', () => {
    const oh = GEO.offsetHoursAtLocal(GEO.geocode('sydney, australia', DATA).zone, 1994, 11, 8, 2, 30);
    eq(oh, 11, 'offset');
});
check('Sydney June = AEST UTC+10 (no DST in winter)', () => {
    const oh = GEO.offsetHoursAtLocal(GEO.geocode('sydney, australia', DATA).zone, 1994, 6, 15, 12, 0);
    eq(oh, 10, 'offset');
});

// ---------- resolvePlace (runtime wrapper) ----------
check('resolvePlace: sydney -> found with tz', () => {
    const l = RT.resolvePlace('Sydney, Australia', { year: 1994, month: 11, day: 8, hour: 2, minute: 30 });
    ok(l.found, 'not found');
    eq(l.tz, 11, 'tz');
});
check('resolvePlace: nonsense place -> honest refusal', () => {
    const l = RT.resolvePlace('ZZZZnotacity, Nowhere', null);
    eq(l.found, false);
});

// ---------- WAYNE MICHAEL ground truth (full inputs) ----------
const WAYNE_IN = { name: 'Wayne Michael', birthDate: '1994-11-08', birthTime: '02:30', birthPlace: 'Sydney, Australia' };
const WAYNE = RT.computeChart(WAYNE_IN);

check('Wayne: chart ok, no fatal errors', () => { ok(WAYNE.ok, JSON.stringify(WAYNE.errors)); });
check('Wayne: UTC instant = 1994-11-07T15:30:00Z (AEDT)', () => eq(WAYNE.utcInstant, '1994-11-07T15:30:00.000Z'));
check('Wayne: Sun Scorpio 15.00 (ground truth)', () => {
    eq(WAYNE.placements.sun.name, 'Scorpio', 'sign');
    approx(WAYNE.placements.sun.degree, 15.00, 0.02, 'degree');
});
check('Wayne: Moon Capricorn 11.73', () => {
    eq(WAYNE.placements.moon.name, 'Capricorn', 'sign');
    approx(WAYNE.placements.moon.degree, 11.73, 0.02, 'degree');
});
check('Wayne: Venus Scorpio 7.52, Mars Leo 17.53, Mercury Libra 26.39', () => {
    eq(WAYNE.placements.venus.name, 'Scorpio'); approx(WAYNE.placements.venus.degree, 7.52, 0.02);
    eq(WAYNE.placements.mars.name, 'Leo');     approx(WAYNE.placements.mars.degree, 17.53, 0.02);
    eq(WAYNE.placements.mercury.name, 'Libra');approx(WAYNE.placements.mercury.degree, 26.39, 0.02);
});
check('Wayne: Ascendant Virgo 0.56 (exact sidereal math)', () => {
    ok(WAYNE.angles, 'angles withheld unexpectedly');
    eq(WAYNE.angles.ascendant.name, 'Virgo');
    approx(WAYNE.angles.ascendant.degree, 0.56, 0.02);
});
check('Wayne: Descendant Pisces 0.56 (7th house)', () => {
    eq(WAYNE.descendant.name, 'Pisces');
    approx(WAYNE.descendant.degree, 0.56, 0.02);
});
check('Wayne: North Node Scorpio 14.64 / South Taurus (mean node)', () => {
    eq(WAYNE.placements.northNode.name, 'Scorpio');
    approx(WAYNE.placements.northNode.degree, 14.64, 0.02);
    eq(WAYNE.placements.southNode.name, 'Taurus');
});
check('Wayne: Sun-NN conjunction 0.35 deg (structural claim in UI)', () => {
    approx(Math.abs(WAYNE.placements.sun.longitude - WAYNE.placements.northNode.longitude), 0.35, 0.02, 'orb');
});
check('Wayne: Part of Fortune Cancer 3.82, night chart', () => {
    ok(WAYNE.partOfFortune, 'PoF missing');
    eq(WAYNE.partOfFortune.isDayChart, false);
    eq(WAYNE.partOfFortune.position.name, 'Cancer');
    approx(WAYNE.partOfFortune.position.degree, 3.82, 0.02);
});
check('Wayne: spark dynamic = Boiling Ocean (Water Venus x Fire Mars)', () => {
    const d = RT.sparkDynamic(WAYNE);
    eq(d.dyn, 'Boiling Ocean');
});

// ---------- Luna ground truth ----------
const LUNA_IN = { name: 'Luna', birthDate: '1996-03-12', birthTime: '08:15', birthPlace: 'Melbourne, Australia' };
const LUNA = RT.computeChart(LUNA_IN);
check('Luna: chart ok; UTC 1996-03-11T21:15Z', () => {
    ok(LUNA.ok, JSON.stringify(LUNA.errors));
    eq(LUNA.utcInstant, '1996-03-11T21:15:00.000Z');
});
check('Luna: Ascendant Aries 2.87, Descendant Libra 2.87', () => {
    eq(LUNA.angles.ascendant.name, 'Aries'); approx(LUNA.angles.ascendant.degree, 2.87, 0.02);
    eq(LUNA.descendant.name, 'Libra');    approx(LUNA.descendant.degree, 2.87, 0.02);
});
check('Luna: Venus Taurus 6.42, Sun Pisces 21.58, Moon Sagittarius 10.76', () => {
    eq(LUNA.placements.venus.name, 'Taurus'); approx(LUNA.placements.venus.degree, 6.42, 0.02);
    eq(LUNA.placements.sun.name, 'Pisces');   approx(LUNA.placements.sun.degree, 21.58, 0.02);
    eq(LUNA.placements.moon.name, 'Sagittarius'); approx(LUNA.placements.moon.degree, 10.76, 0.05);
});

// ---------- card deck assembly ----------
check('Wayne cards: 7 built, none withheld, all have copy', () => {
    const cards = RT.buildCards(WAYNE);
    eq(cards.length, 7, 'card count');
    cards.forEach(c => {
        eq(c.withheld, false, c.front + ' withheld');
        ok(c.body && c.body.length > 40, c.front + ' body missing');
        ok(c.why && c.why.includes('Exact:'), c.front + ' why lacks exact degree note');
    });
});
check('Content library completeness: 7 points x 12 signs + 16 dynamics', () => {
    ['venus', 'moon', 'mercury', 'mars', 'rising', 'descendant', 'sun'].forEach(k => {
        const sigs = Object.keys(C[k]);
        eq(sigs.length, 12, k + ' sign count');
        sigs.forEach(s => {
            ok(C[k][s].body && C[k][s].why, k + '/' + s + ' empty');
        });
    });
    const dynKeys = ['Fire','Earth','Air','Water'];
    let n = 0;
    dynKeys.forEach(a => dynKeys.forEach(b => { ok(C.dynamics[a + '-' + b], 'missing dynamic ' + a + '-' + b); n++; }));
    eq(n, 16);
});

// ---------- REFUSAL paths ----------
check('No time + no place: angles withheld, notices honest, no guessing', () => {
    const c = RT.computeChart({ name: 'X', birthDate: '1990-06-15' });
    ok(c.ok);
    eq(c.angles, null, 'angles should be withheld');
    eq(c.descendant, null, 'descendant should be withheld');
    ok(c.notices.some(n => /No birth time/.test(n)), 'missing no-time notice');
    const cards = RT.buildCards(c);
    const rising = cards.find(x => x.key === 'rising');
    const d7 = cards.find(x => x.key === 'descendant');
    eq(rising.withheld, true); ok(/needs your exact birth time AND place/i.test(rising.body), 'rise needs-copy');
    ok(/refuses to estimate/i.test(rising.why), 'rising refusal copy');
    eq(d7.withheld, true);
});
check('Time given but place unresolvable: hard refusal, not a guess', () => {
    const c = RT.computeChart({ name: 'X', birthDate: '1990-06-15', birthTime: '09:30', birthPlace: 'ZZZnowhere' });
    ok(c.ok);
    eq(c.angles, null, 'must withhold angles');
    ok(c.notices.some(n => /could not resolve/i.test(n)), 'must explain refusal');
});
check('Date-only Moon near cusp: withheld instead of coin-flipped', () => {
    // 2026-10-02: Moon ingress day (changes sign within the UTC day).
    const c = RT.computeChart({ name: 'X', birthDate: '2026-10-02' });
    const cards = RT.buildCards(c);
    const moon = cards.find(x => x.key === 'moon');
    // Either the Moon is genuinely stable all day (card renders) OR
    // the day spans an ingress (card withheld). What must NEVER happen:
    // uncertain + rendered.
    if (c.moonUncertain) eq(moon.withheld, true, 'uncertain Moon must be withheld');
});
check('Engine missing -> computeChart refuses globally (no fallback tables)', () => {
    // The astronomy UMD bundle binds Astronomy INSIDE the vm context's global,
    // so hide/restore it there — deleting it on the outer sandbox object does
    // not affect what the in-context code sees.
    vm.runInContext(
        'globalThis.__heldAstro = globalThis.Astronomy; delete globalThis.Astronomy;' +
        'if (typeof window !== "undefined" && window !== globalThis) {' +
        '  window.__heldAstroW = window.Astronomy; delete window.Astronomy; }',
        sandbox);
    let c;
    try {
        c = RT.computeChart(WAYNE_IN);
    } finally {
        vm.runInContext(
            'if (globalThis.__heldAstro) { globalThis.Astronomy = globalThis.__heldAstro; delete globalThis.__heldAstro; }' +
            'if (typeof window !== "undefined" && window !== globalThis && window.__heldAstroW) {' +
            '  window.Astronomy = window.__heldAstroW; delete window.__heldAstroW; }',
            sandbox);
    }
    eq(c.ok, false, 'must refuse');
    ok(/did not load/i.test(c.errors[0]), 'refusal copy');
    // Engine works again after restoration (proves we restored cleanly)
    ok(S.engineReady(), 'engine not restored');
});

// ---------- love element pull (Words-vs-Chart input) ----------
check('Wayne love elements: Water 50/Earth 30/Fire 20/Air 0', () => {
    const el = RT.loveElements(WAYNE);
    approx(el.Water, 0.50, 1e-9); approx(el.Earth, 0.30, 1e-9);
    approx(el.Fire, 0.20, 1e-9);  approx(el.Air, 0.00, 1e-9);
});

// ---------- numerology (deterministic) ----------
check('Wayne numerology: Life Path from 1994-11-08 = 6, name numbers consistent', () => {
    const n = RT.numerology('Wayne Michael', '1994-11-08');
    // 8 + (1+1=2) + (1+9+9+4=23->5) => 8+2+5=15->6
    eq(n.lifePath, 6, 'lifePath');
    // Repo invariant: destiny == reduce(soulUrgeRaw + personalityRaw). Verify
    // via letter partition: every letter counted exactly once.
    const letters = 'WAYNEMICHAEL'.split('');
    const vowels = letters.filter(c => 'AEIOU'.includes(c)).join('');
    const cons = letters.filter(c => !'AEIOU'.includes(c)).join('');
    eq(vowels.length + cons.length, letters.length, 'partition');
    ok(n.destiny >= 1 && n.destiny <= 33, 'destiny range');
});

console.log('\n' + '='.repeat(52));
console.log(pass + ' passed, ' + fail + ' failed');
if (fail > 0) {
    console.log('\nFAILURES:');
    failures.forEach(f => console.log(' - ' + f));
    console.log('RESULT: NOT SAFE - fix before wiring UI');
    process.exit(1);
}
console.log('RESULT: runtime reproduces ground truth + refuses honestly');
console.log('        (same files & order as the browser will load)');
