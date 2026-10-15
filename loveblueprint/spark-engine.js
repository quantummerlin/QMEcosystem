// ============================================================
// LOVE BLUEPRINT — STRICT ACCURACY ENGINE v1.0.0
// ============================================================
// STANDARD: every astronomical output must be exact (real
// ephemeris via astronomy-engine, or closed-form formulas
// accurate to arcseconds). Every numerological output is
// deterministic integer arithmetic.
//
// NOTHING APPROXIMATE IS ALLOWED TO FALL BACK SILENTLY:
//   - If the ephemeris is unavailable, engineReady() is false
//     and computeChart() REFUSES and says why. No lookup
//     tables. No "nearest year" interpolation. Ever.
//   - Deliberately EXCLUDED (cannot be computed exactly
//     on-device): Chiron (no minor-body ephemeris), Lilith
//     (mean apogee drift is approximate), Vertex (formula
//     unverified against reference), legacy 1976/1981 planet
//     tables, sign-distance aspects. See REFUSALS.
//
// Depends on: astronomy-engine CDN (window.Astronomy) and,
// for full chart accuracy, the geocoder (window.SBGeo +
// window.SB_GEO) loaded BEFORE this file — same order as
// index.html uses. Pure-math functions have no dependencies
// and are unit-tested in tests/test-spark-engine.cjs.
// ============================================================

(function (global) {
    'use strict';

    var SPARK = {};
    SPARK.VERSION = '1.0.0';

    var SIGN_NAMES = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    var SIGN_ELEMENTS = ['Fire', 'Earth', 'Air', 'Water', 'Fire', 'Earth',
        'Air', 'Water', 'Fire', 'Earth', 'Air', 'Water'];

    // Documented refusals: the UI must show these verbatim rather than
    // ever present an approximate value as fact.
    SPARK.REFUSALS = {
        engineMissing: 'The exact ephemeris (astronomy-engine) did not load, so no chart was computed. Nothing was guessed. Check the connection and try again.',
        placeUnresolved: 'We could not resolve that birth place to exact coordinates, and an exact chart is impossible without them. Nothing was guessed. Try the nearest large city.',
        timeMissingForAngles: 'Birth time is required for the Ascendant and house-based points. Sign-only placements below are exact; angle-dependent cards are withheld, not estimated.',
        chiron: 'Chiron is excluded from Love Blueprint: no exact minor-body ephemeris runs on-device.',
        lilith: 'Lilith is excluded from Love Blueprint: mean-apogee drift formulas available here are approximate.',
        vertex: 'Vertex is excluded from Love Blueprint v1: the exact prime-vertical formula is not yet verified against reference software.'
    };

    function norm360(x) { return ((x % 360) + 360) % 360; }

    // ---------- Sign from exact ecliptic longitude ----------
    SPARK.signFromLongitude = function (lon) {
        if (lon == null || !isFinite(lon)) return null;
        var l = norm360(lon);
        var i = Math.floor(l / 30) % 12;
        return {
            name: SIGN_NAMES[i], index: i, element: SIGN_ELEMENTS[i],
            symbol: String.fromCharCode(0x2648 + i), // zodiac block U+2648..U+2653
            longitude: l, degree: l - i * 30
        };
    };

    // ---------- Time conversions (exact, deterministic) ----------
    SPARK.julianDate = function (date) {
        return date.getTime() / 86400000 + 2440587.5;
    };
    SPARK.julianCenturies = function (date) {
        return (SPARK.julianDate(date) - 2451545.0) / 36525;
    };
    // Exact UTC instant from local civil time + geocoder-resolved offset.
    // tzHours comes from SBGeo.offsetHoursAtLocal (IANA zone, DST-correct at
    // the birth instant). NEVER a guessed static offset.
    SPARK.utcFromLocal = function (y, mo, d, h, mi, tzHours) {
        return new Date(Date.UTC(y, mo - 1, d, h, mi, 0) - tzHours * 3600000);
    };

    // ---------- Mean obliquity (Meeus, ~0.01 arcsec) ----------
    SPARK.meanObliquityDeg = function (date) {
        var T = SPARK.julianCenturies(date);
        return 23.4392911 - 0.0130042 * T - 0.000000164 * T * T + 0.000000504 * T * T * T;
    };

    // ---------- Mean North Node (Meeus 47.6, accurate to ~0.01 deg) ----------
    // Disclosed convention: MEAN node (the astrological default), computed
    // from the standard closed-form series — not interpolated from a table.
    SPARK.meanNorthNodeLongitude = function (date) {
        var T = SPARK.julianCenturies(date);
        return norm360(125.0445550 - 1934.1362608 * T + 0.0020762 * T * T +
            (T * T * T) / 467410 - (T * T * T * T) / 60616000);
    };

    // ---------- Ascendant / Midheaven (exact spherical astronomy) ----------
    // Same proven formulas as calculations.js (validated by the repo E2E
    // suite), but the DEGREE is preserved — legacy code floored to the sign.
    SPARK.ascendantLongitude = function (lstDeg, latDeg, oblDeg) {
        var lst = lstDeg * Math.PI / 180;
        var ob = oblDeg * Math.PI / 180;
        var lat = latDeg * Math.PI / 180;
        var num = Math.cos(lst);
        var den = -(Math.sin(lst) * Math.cos(ob) + Math.tan(lat) * Math.sin(ob));
        return norm360(Math.atan2(num, den) * 180 / Math.PI);
    };
    // Robust branch selection: the MC longitude must lie within 90 deg of
    // RAMC (tan has period 180 deg, so exactly two candidates exist). The
    // legacy if/else quadrant fix silently breaks AT ramc = 90/270 where
    // floating-point tan is +/- huge; this never does.
    SPARK.midheavenLongitude = function (lstDeg, oblDeg) {
        var ramc = norm360(lstDeg);
        var m0 = Math.atan(Math.tan(ramc * Math.PI / 180) / Math.cos(oblDeg * Math.PI / 180)) * 180 / Math.PI;
        var c0 = norm360(m0), c1 = norm360(m0 + 180);
        return SPARK.separation(c0, ramc) <= SPARK.separation(c1, ramc) ? c0 : c1;
    };
    // Local Sidereal Time in degrees from a UTC instant + east longitude.
    SPARK.localSiderealTimeDeg = function (utcDate, lonDegEast) {
        var jd0Date = new Date(Date.UTC(utcDate.getUTCFullYear(), utcDate.getUTCMonth(),
            utcDate.getUTCDate(), 0, 0, 0));
        var jd0 = SPARK.julianDate(jd0Date);
        var T0 = (jd0 - 2451545.0) / 36525;
        var gmst0 = norm360(100.46061837 + 36000.770053608 * T0 + 0.000387933 * T0 * T0);
        var utHours = (utcDate.getTime() - jd0Date.getTime()) / 3600000;
        return norm360(gmst0 + utHours * 15 * 1.00273790935 + lonDegEast);
    };

    // ---------- Part of Fortune (exact degree formula, day/night aware) ----------
    SPARK.partOfFortuneLongitude = function (ascLon, sunLon, moonLon, isDay) {
        return norm360(ascLon + (isDay ? moonLon - sunLon : sunLon - moonLon));
    };
    // Exact day-chart test: Sun above the horizon at birth.
    SPARK.sunIsDiurnal = function (sunRAsunDeg, sunDecDeg, lstDeg, latDeg) {
        var D = Math.PI / 180;
        var H = (lstDeg - sunRAsunDeg) * D; // local hour angle
        var sinAlt = Math.sin(latDeg * D) * Math.sin(sunDecDeg * D) +
            Math.cos(latDeg * D) * Math.cos(sunDecDeg * D) * Math.cos(H);
        return sinAlt > 0;
    };

    // ---------- Moon phase (exact lunation angle) ----------
    SPARK.moonPhaseAngle = function (utcDate) {
        var A = global.Astronomy;
        if (A && typeof A.MoonPhase === 'function') {
            return norm360(A.MoonPhase(new A.AstroTime(utcDate)));
        }
        return null; // refuse, never approximate
    };
    var PHASE_NAMES = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
        'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
    // Documented convention: eight equal 45-deg sectors centred on the exact
    // phase (±22.5 deg) — the measurement is exact, the bucketing is standard.
    SPARK.moonPhaseName = function (angleDeg) {
        if (angleDeg == null || !isFinite(angleDeg)) return null;
        return PHASE_NAMES[Math.floor(norm360(angleDeg + 22.5) / 45) % 8];
    };

    // ---------- Ephemeris longitudes (exact, or refuse) ----------
    SPARK.engineReady = function () {
        var A = global.Astronomy;
        return !!(A && A.Ecliptic && A.GeoVector && A.AstroTime && A.Body);
    };
    // body: 'sun'|'moon'|'mercury'|'venus'|'mars'|'jupiter'|'saturn'|
    //       'uranus'|'neptune'|'pluto'
    SPARK.longitude = function (body, utcDate) {
        if (!SPARK.engineReady() || !utcDate || isNaN(utcDate.getTime())) return null;
        var A = global.Astronomy;
        try {
            var t = new A.AstroTime(utcDate);
            if (body === 'moon') return norm360(A.EclipticGeoMoon(t).lon);
            var key = body.charAt(0).toUpperCase() + body.slice(1);
            var b = A.Body[key];
            if (!b) return null;
            return norm360(A.Ecliptic(A.GeoVector(b, t, true)).elon);
        } catch (e) { return null; }
    };
    SPARK.equatorial = function (utcDate, lonDegEast, latDeg) {
        // Sun RA/Dec at the observer for the exact day/night test.
        if (!SPARK.engineReady()) return null;
        var A = global.Astronomy;
        try {
            var t = new A.AstroTime(utcDate);
            var obs = new A.Observer(latDeg, lonDegEast, 0);
            var eq = A.Equator(A.Body.Sun, t, obs, true, true);
            return { ra: norm360(eq.ra * 15), dec: eq.dec }; // ra hours -> degrees
        } catch (e) { return null; }
    };

    // ---------- Body set for one exact moment ----------
    var PLANETS = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter',
        'saturn', 'uranus', 'neptune', 'pluto'];
    SPARK.computePlacements = function (utcDate) {
        if (!SPARK.engineReady()) return null; // REFUSE — see REFUSALS.engineMissing
        var out = {};
        for (var i = 0; i < PLANETS.length; i++) {
            var lon = SPARK.longitude(PLANETS[i], utcDate);
            var s = SPARK.signFromLongitude(lon);
            if (!s) return null; // all-or-nothing: no partial fabricated charts
            s.body = PLANETS[i];
            out[PLANETS[i]] = s;
        }
        var nodeLon = SPARK.meanNorthNodeLongitude(utcDate);
        out.northNode = SPARK.signFromLongitude(nodeLon);
        out.northNode.nodeConvention = 'mean';
        out.southNode = SPARK.signFromLongitude(nodeLon + 180);
        return out;
    };

    // ---------- Degree-based aspects (exact angular separation) ----------
    // Orbs are an INTERPRETIVE convention, disclosed and user-configurable.
    // The angular measurement itself is exact.
    SPARK.DEFAULT_ORBS = { conjunction: 8, opposition: 8, trine: 7, square: 6, sextile: 4 };
    SPARK.ASPECT_TYPES = [
        { name: 'conjunction', angle: 0, nature: 'neutral' },
        { name: 'sextile', angle: 60, nature: 'harmonious' },
        { name: 'square', angle: 90, nature: 'challenging' },
        { name: 'trine', angle: 120, nature: 'harmonious' },
        { name: 'opposition', angle: 180, nature: 'challenging' }
    ];
    SPARK.separation = function (lon1, lon2) {
        var d = Math.abs(norm360(lon1) - norm360(lon2));
        return d > 180 ? 360 - d : d;
    };
    // computeAspects(listA, listB?) — list items: {label, longitude}.
    // listB omitted => natal pairs within A. With B => synastry cross-pairs.
    SPARK.computeAspects = function (listA, listB, orbs) {
        orbs = orbs || SPARK.DEFAULT_ORBS;
        var B = listB || null;
        var out = [];
        var i, j, a, b, sep, k, asp, orb, diff;
        for (i = 0; i < listA.length; i++) {
            a = listA[i];
            var upper = B ? B.length : listA.length;
            for (j = B ? 0 : i + 1; j < upper; j++) {
                b = B ? B[j] : listA[j];
                if (!B && a.label === b.label) continue;
                sep = SPARK.separation(a.longitude, b.longitude);
                for (k = 0; k < SPARK.ASPECT_TYPES.length; k++) {
                    asp = SPARK.ASPECT_TYPES[k];
                    orb = orbs[asp.name];
                    if (orb == null) continue;
                    diff = Math.abs(sep - asp.angle);
                    if (diff <= orb) {
                        out.push({
                            type: asp.name, nature: asp.nature,
                            a: a.label, b: b.label,
                            separation: sep, orb: diff
                        });
                        break; // tightest-match-first: one aspect per pair
                    }
                }
            }
        }
        out.sort(function (x, y) { return x.orb - y.orb; });
        return out;
    };

    global.SoulSpark = SPARK;
    if (typeof module !== 'undefined' && module.exports) module.exports = SPARK;
})(typeof window !== 'undefined' ? window : globalThis);
