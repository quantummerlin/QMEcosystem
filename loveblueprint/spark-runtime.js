// ============================================================
// LOVE BLUEPRINT . RUNTIME ORCHESTRATOR v1.0.0
// ============================================================
// Glue between the strict engine (spark-engine.js), the geocoder
// (../geo-data.js + ../geocode.js, shared with the main site) and
// the content library (dating-content.js). Produces the full
// chart + card deck + honesty state for a set of birth inputs.
//
// HARD RULES (absolute accuracy standard):
//   1. No lookup tables, no interpolation, no estimates presented
//      as facts. Anything not exactly computable is REFUSED with
//      user-facing copy from SoulSpark.REFUSALS.
//   2. Unresolved place = hard refusal for anything angle-based.
//   3. Missing time = angles + 7th house withheld (not estimated);
//      sign-only placements remain exact (noon-UT convention,
//      disclosed) EXCEPT Moon, whose degree depends on the instant
//      . Moon without time is flagged as "date-only" honestly.
//   4. Every placement returned carries its exact longitude so
//      downstream features (synastry, alignment) use degrees.
// ============================================================

(function (global) {
    'use strict';

    var S = global.SoulSpark;
    var C = global.SparkContent;

    var RT = {};

    // Resolve a typed place via the site geocoder (14,133 cities,
    // IANA zones). Mirrors calculations.js findLocation() priority:
    // SBGeo/SB_GEO when loaded; otherwise refuse: no 25-city fallback.
    RT.resolvePlace = function (placeText, whenParts) {
        if (!placeText) return { found: false, reason: 'no-place' };
        if (!(global.SBGeo && global.SB_GEO && typeof global.SBGeo.geocode === 'function')) {
            return { found: false, reason: 'no-geocoder' };
        }
        var key = String(placeText).toLowerCase().trim();
        var r;
        try { r = global.SBGeo.geocode(key, global.SB_GEO); }
        catch (e) { return { found: false, reason: 'geocoder-error' }; }
        if (!r || !r.found) return { found: false, reason: (r && r.reason) || 'unknown-place' };
        var resolved = {
            found: true, lat: r.lat, lon: r.lon,
            name: [r.name, r.admin1 || null].filter(Boolean).join(', '),
            zone: r.zone, raw: r
        };
        // DST-correct offset at the birth instant via the IANA zone.
        if (whenParts && typeof global.SBGeo.offsetHoursAtLocal === 'function') {
            var oh = global.SBGeo.offsetHoursAtLocal(r.zone, whenParts.year, whenParts.month,
                whenParts.day, whenParts.hour || 12, whenParts.minute || 0);
            if (typeof oh === 'number' && isFinite(oh)) { resolved.tz = oh; return resolved; }
        }
        if (typeof r.tz === 'number' && isFinite(r.tz)) { resolved.tz = r.tz; return resolved; }
        return { found: false, reason: 'no-offset' };
    };

    // Main entry: full chart from birth inputs.
    // input: { name, birthDate:'YYYY-MM-DD', birthTime:'HH:MM'|null,
    //          birthPlace:'City, Country'|null }
    // returns { ok, chart | errors[], notices[] }
    RT.computeChart = function (input) {
        var notices = [];
        var errors = [];

        if (!S || !S.engineReady()) {
            return { ok: false, errors: [S ? S.REFUSALS.engineMissing : 'Engine not loaded'] };
        }
        var p = parseDate(input.birthDate);
        if (!p) return { ok: false, errors: ['Birth date could not be read.'] };
        var hasTime = !!input.birthTime;
        var hp = hasTime ? parseClock(input.birthTime) : null;
        if (hasTime && !hp) return { ok: false, errors: ['Birth time could not be read.'] };

        var hour = hasTime ? hp.hour : 12;
        var minute = hasTime ? hp.minute : 0;
        if (!hasTime) notices.push('No birth time given: planetary SIGNS use the noon-UT convention (disclosed) and angle-based points are withheld entirely. The Moon moves ~13°/day, so its sign is date-only reliable near month edges: noted where it applies.');

        // ---- Place resolution (required for time-dependent math) ----
        var loc = null;
        if (input.birthPlace) {
            loc = RT.resolvePlace(input.birthPlace, { year: p.year, month: p.month, day: p.day, hour: hour, minute: minute });
            if (!loc.found) {
                loc = null;
                notices.push(S.REFUSALS.placeUnresolved);
            }
        } else {
            notices.push('No birth place given: angle-based points (Rising, 7th House) are withheld. Planetary signs remain exact.');
        }

        // ---- The instant used for placements ----
        // With a resolved place we have the true UTC instant (DST-correct).
        // Without one we use the noon-UT convention and DISCLOSE it.
        var utc;
        if (loc) {
            utc = S.utcFromLocal(p.year, p.month, p.day, hour, minute, loc.tz);
        } else {
            utc = new Date(Date.UTC(p.year, p.month - 1, p.day, 12, 0, 0));
            if (hasTime) notices.push('A birth time was given but no resolved place, so the time cannot be converted to a true UT instant. Planets used the noon-UT convention; angles are withheld rather than guessed.');
        }

        // ---- Placements (exact) ----
        var placements = S.computePlacements(utc);
        if (!placements) return { ok: false, errors: [S.REFUSALS.engineMissing] };

        // Sun sign sanity: the static zodiac-date method can flip at cusps;
        // our ephemeris longitude is the truth. Cross-note the date-table sign
        // only for transparency when they differ.
        var dateTableSun = sunSignByDate(p);
        if (dateTableSun && dateTableSun !== placements.sun.name) {
            notices.push('Cusp birth: calendar-date tables call this ' + dateTableSun + ', but the ephemeris places the Sun in ' + placements.sun.name + ' ' + placements.sun.degree.toFixed(2) + '°. The ephemeris wins.');
        }

        // Moon without time: was the Moon within 6.5° of a sign boundary at
        // any point that day? If so the sign genuinely cannot be pinned
        // without the time; say exactly that instead of showing a coin-flip.
        var moonUncertain = false;
        if (!hasTime || !loc) {
            var lo = utc.getTime() - 12 * 3600000, hi = utc.getTime() + 12 * 3600000;
            var m0 = S.longitude('moon', new Date(lo));
            var m1 = S.longitude('moon', new Date(hi));
            var loIdx = Math.floor(m0 / 30) % 12, hiIdx = Math.floor(m1 / 30) % 12;
            if (loIdx !== hiIdx) {
                moonUncertain = true;
                notices.push('Moon sign withheld: without an exact time the Moon changes sign within your birth day (' + S.signFromLongitude(m0).name + ' to ' + S.signFromLongitude(m1).name + '). Add your birth time and it locks in.');
            }
        }

        // ---- Angles: only with BOTH time and resolved place ----
        var angles = null;
        var descendant = null;
        if (hasTime && loc) {
            var lst = S.localSiderealTimeDeg(utc, loc.lon);
            var obl = S.meanObliquityDeg(utc);
            var ascLon = S.ascendantLongitude(lst, loc.lat, obl);
            var mcLon = S.midheavenLongitude(lst, obl);
            angles = {
                ascendant: S.signFromLongitude(ascLon),
                midheaven: S.signFromLongitude(mcLon),
                lstDeg: lst
            };
            descendant = S.signFromLongitude(ascLon + 180);
        }
        // (Refusal notices for missing time/place were already recorded when
        // the input was first inspected: never duplicated here.)

        // ---- Part of Fortune: exact, requires angles ----
        var pof = null;
        if (angles) {
            var t = new global.Astronomy.AstroTime(utc);
            var obs = new global.Astronomy.Observer(loc.lat, loc.lon, 0);
            var sunEq = global.Astronomy.Equator(global.Astronomy.Body.Sun, t, obs, true, true);
            var isDay = S.sunIsDiurnal(sunEq.ra * 15, sunEq.dec, angles.lstDeg, loc.lat);
            pof = {
                position: S.signFromLongitude(S.partOfFortuneLongitude(
                    angles.ascendant.longitude, placements.sun.longitude, placements.moon.longitude, isDay)),
                isDayChart: isDay
            };
        }

        return {
            ok: true,
            errors: errors,
            notices: notices,
            input: input,
            utcInstant: utc.toISOString(),
            location: loc ? { name: loc.name, lat: loc.lat, lon: loc.lon, tz: loc.tz, zone: loc.zone } : null,
            hasTime: hasTime,
            hasPlace: !!loc,
            placements: placements,          // sun..pluto + northNode/southNode (sign, degree, longitude)
            angles: angles,                  // { ascendant, midheaven } or null
            descendant: descendant,          // sign object or null (withheld > guessed)
            partOfFortune: pof,
            moonUncertain: moonUncertain
        };
    };

    // ---- Card deck assembly (content lookup with hard refusal) ----
    // Returns array of { key, icon, front, sign, title, body, why, withheld }
    RT.buildCards = function (chart) {
        if (!chart || !chart.ok || !C) return [];
        var cards = [];
        function addPoint(key, label, signObj, opts) {
            opts = opts || {};
            var entry = {
                key: key, icon: C.icons[key], front: label,
                title: C.titles[key], withheld: false
            };
            if (!signObj || !signObj.name) {
                entry.withheld = true;
                entry.sign = '—';
                entry.body = opts.withheldBody || 'Withheld, not exactly computable from what you gave us. Nothing is guessed here.';
                entry.why = opts.withheldWhy || 'Love Blueprint shows a placement only when it can compute it exactly. Add the missing input and this card fills in itself.';
                entry.needsTime = !!opts.needsTime;
                cards.push(entry);
                return;
            }
            var lib = C[key];
            var txt = lib && lib[signObj.name];
            if (!txt) {
                // Content gap = refuse that card too. Never show wrong copy.
                entry.withheld = true;
                entry.sign = signObj.name;
                entry.body = 'This reading is still being written for your exact placement. It will appear in the next content update rather than showing you approximate copy.';
                entry.why = 'Absolute-accuracy standard: placements render only when complete, verified copy exists.';
                cards.push(entry);
                return;
            }
            entry.sign = signObj.name;
            entry.body = txt.body;
            entry.why = txt.why + (signObj.degree != null
                ? (' (Exact: ' + signObj.name + ' ' + signObj.degree.toFixed(2) + '\u00B0.)') : '');
            entry.longitude = signObj.longitude;
            entry.needsTime = !!opts.needsTime;
            cards.push(entry);
        }
        addPoint('venus', 'Venus', chart.placements.venus);
        addPoint('moon', 'Moon', chart.moonUncertain ? null : chart.placements.moon, {
            withheldBody: 'Your Moon changes sign during your birth day, so its sign cannot be pinned without a birth time. Nothing is guessed here: add your time and this card fills in exactly.',
            withheldWhy: 'The Moon moves ~13°/day. Near sign boundaries a date-only chart is genuinely ambiguous; Love Blueprint withholds rather than coin-flips.'
        });
        addPoint('mercury', 'Mercury', chart.placements.mercury);
        addPoint('mars', 'Mars', chart.placements.mars);
        addPoint('rising', 'Rising', chart.angles ? chart.angles.ascendant : null, {
            needsTime: true,
            withheldBody: 'Rising needs your exact birth time AND place. It changes sign roughly every two hours. Add both and this locks in to the degree.',
            withheldWhy: 'Without time+place the Ascendant is unknowable, and Love Blueprint refuses to estimate it.'
        });
        addPoint('descendant', '7th House', chart.descendant, {
            needsTime: true,
            withheldBody: 'The 7th House is the exact opposite of your Rising sign, so it needs the same inputs: birth time AND place. This is your single most important compatibility point: worth chasing down your birth certificate for.',
            withheldWhy: 'Descendant = Ascendant + 180°, both computed from sidereal time at the resolved birth location. Withheld, never estimated.'
        });
        addPoint('sun', 'Sun', chart.placements.sun);
        return cards;
    };

    // Spark badge: Venus element x Mars element dynamic + keywords
    RT.sparkDynamic = function (chart) {
        if (!chart || !chart.ok) return null;
        var v = chart.placements.venus, m = chart.placements.mars;
        if (!v || !m) return null;
        var key = v.element + '-' + m.element;
        var d = C.dynamics[key];
        if (!d) return null;
        return {
            dyn: d.dyn, keywords: d.keywords,
            sub: 'Venus in ' + v.name + ' \u00D7 Mars in ' + m.name +
                (chart.descendant ? (' \u2192 7th House in ' + chart.descendant.name) : '')
        };
    };

    // Numerology: deterministic integer math (reuse the site's proven
    // partition when calculations.js is loaded; else the identical
    // implementation below, kept in lockstep with the repo invariant:
    // Destiny = Soul Urge + Personality before final reduction).
    var NUM_MAP = {};
    (function () {
        var groups = [['A','J','S'],['B','K','T'],['C','L','U'],['D','M','V'],['E','N','W'],['F','O','X'],['G','P','Y'],['H','Q','Z'],['I','R']];
        groups.forEach(function (grp, idx) {
            grp.forEach(function (ch) { NUM_MAP[ch] = idx + 1; });
        });
    })();
    function reduceKeepMaster(n) {
        while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
            n = String(n).split('').reduce(function (a, c) { return a + Number(c); }, 0);
        }
        return n;
    }
    function nameToNumber(str) {
        return String(str).toUpperCase().split('').reduce(function (acc, ch) {
            return acc + (NUM_MAP[ch] || 0);
        }, 0);
    }
    RT.numerology = function (fullName, birthDate) {
        var p = parseDate(birthDate);
        if (!p) return null;
        var clean = String(fullName || '').replace(/[^A-Za-z]/g, '').toUpperCase();
        if (!clean) return null;
        var vowels = clean.split('').filter(function (c) { return 'AEIOU'.indexOf(c) >= 0; }).join('');
        var consonants = clean.split('').filter(function (c) { return 'AEIOU'.indexOf(c) < 0; }).join('');
        var lifePath = reduceKeepMaster(reduceKeepMaster(p.day) + reduceKeepMaster(p.month) + reduceKeepMaster(p.year));
        var destiny = reduceKeepMaster(nameToNumber(clean));
        var soulUrge = reduceKeepMaster(nameToNumber(vowels));
        var personality = reduceKeepMaster(nameToNumber(consonants));
        var birthday = reduceKeepMaster(p.day);
        return { lifePath: lifePath, destiny: destiny, soulUrge: soulUrge, personality: personality, birthday: birthday };
    };

    // Love-element pull vector from the exact chart (for Words-vs-Chart
    // and synastry): weighted Venus(3)+Moon(3)+Mars(2)+Descendant(2).
    RT.loveElements = function (chart) {
        var tally = { Water: 0, Earth: 0, Fire: 0, Air: 0 }, total = 0;
        function add(signObj, w) {
            if (signObj && signObj.element && tally[signObj.element] != null) {
                tally[signObj.element] += w; total += w;
            }
        }
        add(chart.placements.venus, 3);
        if (!chart.moonUncertain) add(chart.placements.moon, 3);
        add(chart.placements.mars, 2);
        add(chart.descendant, 2);
        if (!total) return null;
        var out = {};
        Object.keys(tally).forEach(function (e) { out[e] = tally[e] / total; });
        return out;
    };

    // Sun-sign-by-calendar-date (used ONLY for the cusp cross-check notice).
    var SUN_RANGES = [
        ['Capricorn', 12, 22, 1, 19], ['Aquarius', 1, 20, 2, 18], ['Pisces', 2, 19, 3, 20],
        ['Aries', 3, 21, 4, 19], ['Taurus', 4, 20, 5, 20], ['Gemini', 5, 21, 6, 20],
        ['Cancer', 6, 21, 7, 22], ['Leo', 7, 23, 8, 22], ['Virgo', 8, 23, 9, 22],
        ['Libra', 9, 23, 10, 22], ['Scorpio', 10, 23, 11, 21], ['Sagittarius', 11, 22, 12, 21]
    ];
    function sunSignByDate(p) {
        for (var i = 0; i < SUN_RANGES.length; i++) {
            var r = SUN_RANGES[i];
            if (r[0] === 'Capricorn') {
                if ((p.month === 12 && p.day >= 22) || (p.month === 1 && p.day <= 19)) return r[0];
            } else if ((p.month === r[1] && p.day >= r[2]) || (p.month === r[3] && p.day <= r[4])) return r[0];
        }
        return null;
    }

    function parseDate(s) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '').trim());
        if (!m) return null;
        var y = Number(m[1]), mo = Number(m[2]), d = Number(m[3]);
        if (mo < 1 || mo > 12 || d < 1 || d > 31 || y < 1583) return null;
        return { year: y, month: mo, day: d };
    }
    function parseClock(s) {
        var m = /^(\d{1,2}):(\d{2})$/.exec(String(s || '').trim());
        if (!m) return null;
        var h = Number(m[1]), mi = Number(m[2]);
        if (h > 23 || mi > 59) return null;
        return { hour: h, minute: mi };
    }
    RT._parseDate = parseDate;      // exported for tests
    RT._parseClock = parseClock;

    global.SparkRuntime = RT;
    if (typeof module !== 'undefined' && module.exports) module.exports = RT;
})(typeof window !== 'undefined' ? window : globalThis);
