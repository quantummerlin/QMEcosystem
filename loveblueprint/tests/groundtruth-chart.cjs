#!/usr/bin/env node
// ============================================================
// LOVE BLUEPRINT — GROUND TRUTH CHART TOOL
// ============================================================
// Under the absolute-accuracy standard, NO sample/demo placement
// may be invented. This tool computes the exact chart for any
// birth data so sample content can be diffed against reality.
//
//   node loveblueprint/tests/groundtruth-chart.cjs \
//     --name="Wayne Michael" --date=1994-11-08 --time=02:30 \
//     --lat=-33.8688 --lon=151.2093 --tz=11
//
//   --tz is the DST-correct UTC offset AT THE BIRTH INSTANT in
//   hours (production gets this from the geocoder's IANA zone via
//   SBGeo.offsetHoursAtLocal, never a guessed static offset).
//
// Sources, all exact:
//   * planets / Moon          astronomy-engine (real ephemeris)
//   * Ascendant / MC / Desc   sidereal-time + spherical astronomy
//   * North/South Node        Meeus closed form (MEAN node, disclosed)
//   * Part of Fortune         degree formula, day/night aware
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ENGINE_PATH = path.join(__dirname, '..', 'spark-engine.js');

const SIGN_ELEMENTS = {
    Aries:'Fire', Taurus:'Earth', Gemini:'Air', Cancer:'Water', Leo:'Fire', Virgo:'Earth',
    Libra:'Air', Scorpio:'Water', Sagittarius:'Fire', Capricorn:'Earth', Aquarius:'Air', Pisces:'Water'
};

function args() {
    const out = {};
    process.argv.slice(2).forEach(a => {
        const m = a.match(/^--([^=]+)=(.*)$/);
        if (m) out[m[1]] = m[2];
    });
    return out;
}

let Astro;
try { Astro = require('astronomy-engine'); }
catch (e) {
    console.error('astronomy-engine is required:  npm install astronomy-engine --no-save');
    process.exit(1);
}

const A = args();
if (!A.date || !A.lat || !A.lon || A.tz === undefined) {
    console.error('Usage: --name --date=YYYY-MM-DD [--time=HH:MM] --lat --lon --tz');
    process.exit(1);
}

// Load the engine into ONE sandbox that already provides Astronomy —
// exactly the state the browser is in after the CDN script tag loads.
const SANDBOX = {
    module: { exports: {} },
    Math, Date, isFinite, String, Number, JSON, console,
    Astronomy: Astro
};
SANDBOX.exports = SANDBOX.module.exports;
vm.runInNewContext(fs.readFileSync(ENGINE_PATH, 'utf8'), SANDBOX, { filename: ENGINE_PATH });
const S = SANDBOX.module.exports;

const [Y, M, D] = A.date.split('-').map(Number);
const [hh, mm] = (A.time || '12:00').split(':').map(Number);
const LAT = parseFloat(A.lat), LON = parseFloat(A.lon), TZ = parseFloat(A.tz);

const INSTANT = S.utcFromLocal(Y, M, D, hh, mm, TZ);
const hasTime = !!A.time;

const line = (label, s) => console.log('  ' + label.padEnd(16) +
    (s ? (s.name + ' ' + s.degree.toFixed(2) + '°').padEnd(26) +
        ' (' + SIGN_ELEMENTS[s.name] + ', lon ' + s.longitude.toFixed(4) + ')'
      : 'REFUSED — no exact source'));

console.log('\n=== ' + (A.name || 'Chart') + ' ===');
console.log('  Birth local     : ' + A.date + (hasTime ? ' ' + A.time : ' (no time — noon assumed)'));
console.log('  UTC instant     : ' + INSTANT.toISOString());
console.log('  Observer        : lat ' + LAT + ', lon ' + LON + ', tz ' + TZ);

// ---- Planets (exact ephemeris) ----
function planet(body) {
    const t = new Astro.AstroTime(INSTANT);
    let lon;
    if (body === 'moon') lon = Astro.EclipticGeoMoon(t).lon;
    else {
        const b = Astro.Body[body.charAt(0).toUpperCase() + body.slice(1)];
        lon = Astro.Ecliptic(Astro.GeoVector(b, t, true)).elon;
    }
    return S.signFromLongitude(lon); // signFromLongitude normalizes negatives
}
console.log('\n-- PLACEMENTS --');
['sun','moon','mercury','venus','mars','jupiter','saturn','uranus','neptune','pluto']
    .forEach(b => line(b, planet(b)));

// ---- Node axis (mean node) ----
const nodeLon = S.meanNorthNodeLongitude(INSTANT);
const north = S.signFromLongitude(nodeLon);
const south = S.signFromLongitude(nodeLon + 180);
console.log('\n-- NODE AXIS (mean node, disclosed convention) --');
line('North Node', north);
line('South Node', south);

// ---- Angles: only when a real birth time exists ----
if (hasTime) {
    const lst = S.localSiderealTimeDeg(INSTANT, LON);
    const obl = S.meanObliquityDeg(INSTANT);
    const ascLon = S.ascendantLongitude(lst, LAT, obl);
    const mcLon = S.midheavenLongitude(lst, obl);
    console.log('\n-- ANGLES --');
    console.log('  ' + 'LST'.padEnd(16) + lst.toFixed(4) + ' deg');
    line('Ascendant', S.signFromLongitude(ascLon));
    line('Midheaven', S.signFromLongitude(mcLon));
    line('Descendant', S.signFromLongitude(ascLon + 180));

    // Whole-sign house system: house N sign = Ascendant sign + (N-1)
    const ascIdx = Math.floor(((ascLon % 360) + 360) % 360 / 30) % 12;
    const NAMES = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
    console.log('  Whole-sign 7th  : ' + NAMES[(ascIdx + 6) % 12] + ' (Descendant sign)');

    // Part of Fortune (exact, day/night aware)
    const t = new Astro.AstroTime(INSTANT);
    const obs = new Astro.Observer(LAT, LON, 0);
    const sEq = Astro.Equator(Astro.Body.Sun, t, obs, true, true);
    const isDay = S.sunIsDiurnal(sEq.ra * 15, sEq.dec, lst, LAT);
    console.log('\n-- PART OF FORTUNE --');
    console.log('  Day chart?      : ' + isDay);
    line('Part of Fortune', S.signFromLongitude(S.partOfFortuneLongitude(
        ascLon, planet('sun').longitude, planet('moon').longitude, isDay)));

    // Notable tight contacts (exact degrees, 8 deg orb)
    console.log('\n-- TIGHT CONTACTS (<= 8 deg, exact degrees) --');
    const list = [
        { label: 'Sun', s: planet('sun') }, { label: 'Moon', s: planet('moon') },
        { label: 'Venus', s: planet('venus') }, { label: 'Mars', s: planet('mars') },
        { label: 'Saturn', s: planet('saturn') }, { label: 'Jupiter', s: planet('jupiter') },
        { label: 'NorthNode', s: north }, { label: 'Ascendant', s: S.signFromLongitude(ascLon) },
        { label: 'Descendant', s: S.signFromLongitude(ascLon + 180) }
    ];
    const contacts = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            const sep = S.separation(list[i].s.longitude, list[j].s.longitude);
            const asp = S.computeAspects([list[i].s], [list[j].s])[0];
            if (asp) contacts.push({ ...asp, a: list[i].label, b: list[j].label });
        }
    }
    contacts.sort((x, y) => x.orb - y.orb).slice(0, 12).forEach(c => {
        console.log('  ' + (c.a + ' ' + c.type + ' ' + c.b).padEnd(34) + ' orb ' + c.orb.toFixed(2) + '°');
    });
} else {
    console.log('\n-- ANGLES / HOUSES / PoF -- REFUSED');
    console.log('  ' + S.REFUSALS.timeMissingForAngles);
}
console.log('');
