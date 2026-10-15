// ============================================================
// DIAGNOSTIC: ground-truth the prototype's SAMPLE chart
// ============================================================
// The prototype ships sample placements for "Wayne Michael",
// 1994-11-08, 02:30, Sydney Australia. Under the absolute
// accuracy standard even DEMO data must be real, so this script
// verifies those sample values against exact math:
//
//   * North/South Node  — closed form from spark-engine.js (tested)
//   * Planets           — astronomy-engine, IF installed locally
//
// Sydney in November is AEDT = UTC+11, so
//   1994-11-08T02:30 local -> 1994-11-07T15:30:00Z
// (that conversion is itself pinned by test-spark-engine.cjs).
//
// Run: node loveblueprint/tests/diag-sample-chart.cjs
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Load spark-engine.js through a sandbox (repo root is type:module, so
// require() of a plain .js file silently yields an empty namespace).
const ENGINE_PATH = path.join(__dirname, '..', 'spark-engine.js');
const mod = { exports: {} };
vm.runInNewContext(fs.readFileSync(ENGINE_PATH, 'utf8'), {
    module: mod, exports: mod.exports,
    Math, Date, isFinite, String, Number, JSON, console
}, { filename: ENGINE_PATH });
const SPARK = mod.exports;

const LABELS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
                'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];

function fmt(s) {
    if (!s) return 'REFUSED (no exact source)';
    return s.name + ' ' + s.degree.toFixed(2) + '°  (lon ' + s.longitude.toFixed(4) + '°)';
}

// ---- The sample birth instant, converted exactly ----
// 1994-11-08 02:30 local, Sydney, AEDT (UTC+11)
const tzHours = 11;
const INSTANT = SPARK.utcFromLocal(1994, 11, 8, 2, 30, tzHours);
console.log('Sample birth instant (exact UTC): ' + INSTANT.toISOString());
console.log('Expected: 1994-11-07T15:30:00.000Z -> ' +
    (INSTANT.toISOString() === '1994-11-07T15:30:00.000Z' ? 'MATCH' : 'MISMATCH'));

// ---- Node axis: exact closed form, no dependencies ----
const nodeLon = SPARK.meanNorthNodeLongitude(INSTANT);
const north = SPARK.signFromLongitude(nodeLon);
const south = SPARK.signFromLongitude(nodeLon + 180);
console.log('\n--- NODE AXIS (mean node, Meeus closed form) ---');
console.log('North Node: ' + fmt(north));
console.log('South Node: ' + fmt(south));

// ---- Planets: need astronomy-engine ----
let Astro = null;
try {
    Astro = require('astronomy-engine');
} catch (e) {
    console.log('\n--- PLANETS ---');
    console.log('astronomy-engine NOT installed locally (' + e.code + ').');
    console.log('Planet verification must run in the browser where the CDN loads,');
    console.log('or after: npm install astronomy-engine --no-save');
}

if (Astro) {
    // Mirror spark-engine.longitude exactly, then report every placement the
    // prototype samples, so each can be diffed against the file's CARDS array.
    function lon(body) {
        const t = new Astro.AstroTime(INSTANT);
        if (body === 'moon') return SPARK.signFromLongitude(Astro.EclipticGeoMoon(t).lon);
        const b = Astro.Body[body.charAt(0).toUpperCase() + body.slice(1)];
        return SPARK.signFromLongitude(Astro.Ecliptic(Astro.GeoVector(b, t, true)).elon);
    }
    console.log('\n--- PLANETS (astronomy-engine, exact) ---');
    ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'].forEach(b => {
        console.log(b.padEnd(9) + ': ' + fmt(lon(b)));
    });

    // Ascendant for Sydney: lat -33.8688, lon 151.2093 (GeoNames Sydney CBD)
    const LAT = -33.8688, LON_E = 151.2093;
    const lst = SPARK.localSiderealTimeDeg(INSTANT, LON_E);
    const obl = SPARK.meanObliquityDeg(INSTANT);
    console.log('\n--- ANGLES (exact, Sydney lat/lon) ---');
    console.log('LST       : ' + lst.toFixed(4) + ' deg');
    console.log('Ascendant : ' + fmt(SPARK.signFromLongitude(SPARK.ascendantLongitude(lst, LAT, obl))));
    console.log('Midheaven : ' + fmt(SPARK.signFromLongitude(SPARK.midheavenLongitude(lst, obl))));
    const dsc = (SPARK.ascendantLongitude(lst, LAT, obl) + 180) % 360;
    console.log('Descendant: ' + fmt(SPARK.signFromLongitude(dsc)) + '   <- 7th house sign');

    console.log('\n--- PART OF FORTUNE (exact, day/night aware) ---');
    const sun = lon('sun'), moon = lon('moon');
    const ascLon = SPARK.ascendantLongitude(lst, LAT, obl);
    // Day/night needs Sun RA/Dec at the observer.
    const t = new Astro.AstroTime(INSTANT);
    const obs = new Astro.Observer(LAT, LON_E, 0);
    const sEq = Astro.Equator(Astro.Body.Sun, t, obs, true, true);
    const isDay = SPARK.sunIsDiurnal(sEq.ra * 15, sEq.dec, lst, LAT);
    console.log('Day chart? ' + isDay + '  (02:30 local = pre-dawn, expect false)');
    console.log('PoF       : ' + fmt(SPARK.signFromLongitude(
        SPARK.partOfFortuneLongitude(ascLon, sun.longitude, moon.longitude, isDay))));
}

// ---- What the prototype currently claims ----
console.log('\n--- PROTOTYPE SAMPLE CLAIMS (loveblueprint/prototype.html) ---');
console.log('  Venus Scorpio | Moon Taurus | Mercury Sagittarius | Mars Aries');
console.log('  Rising Scorpio | 7th House Taurus | Sun Scorpio');
console.log('\nDiff every line above against these. ANY mismatch means the');
console.log('sample data is wrong and must be corrected or explicitly labelled as demo.');
console.log('(Sun sign especially: 8 Nov 1994 is Scorpio by date table AND by');
console.log(' ephemeris only if the Sun had not reached 16 deg Scorpio cusp rules.)');