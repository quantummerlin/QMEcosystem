// ============================================================
// LOVE BLUEPRINT . SYNASTRY ENGINE v1.0.0
// ============================================================
// Degree-based relationship astrology between two EXACT charts.
// Built on SoulSpark.computeAspects (real angular separation with
// disclosed orbs): never the legacy sign-distance method.
//
// ACCURACY CONTRACT
//   * Requires exact longitudes for both people. If a dimension has
//     NO aspect within orb, it reports "no strong contact" and is
//     EXCLUDED from the overall score: absence of contact is
//     information, not a zero and is never padded.
//   * Every claimed aspect is reported with its measured separation
//     and orb so the user can audit it.
//   * Orbs are an interpretive convention (synastry-tightened vs
//     natal) and are disclosed in the UI.
//
// Two honest axes instead of one fake number:
//   CONTACT: how much exact angular binding exists between charts
//   EASE    : the harmonious/challenging balance of that contact
// ============================================================

(function (global) {
    'use strict';

    var S = global.SoulSpark;
    var SYN = {};

    // Synastry orbs are traditionally TIGHTER than natal: a 6-degree
    // Venus-Mars square between two people is noise; within one chart it
    // is character. Disclosed in the UI.
    SYN.ORBS = { conjunction: 6, opposition: 6, trine: 5, square: 5, sextile: 3 };

    // Which cross-pairs feed which dimension, and how heavily each pair
    // counts. Derived from standard synastry practice.
    SYN.DIMENSIONS = [
        {
            key: 'chemistry', label: '\uD83D\uDD25 Chemistry', weight: 0.30,
            pairs: [
                { a: 'Venus', b: 'Mars', w: 1.0 },
                { a: 'Mars',  b: 'Venus', w: 1.0 },
                { a: 'Sun',   b: 'Venus', w: 0.5 },
                { a: 'Mars',  b: 'Mars', w: 0.5 }
            ]
        },
        {
            key: 'safety', label: '\uD83D\uDEE1\uFE0F Emotional safety', weight: 0.28,
            pairs: [
                { a: 'Moon',  b: 'Moon', w: 1.0 },
                { a: 'Moon',  b: 'Venus', w: 0.8 },
                { a: 'Venus', b: 'Moon', w: 0.8 },
                { a: 'Moon',  b: 'Sun', w: 0.6 },
                { a: 'Sun',   b: 'Moon', w: 0.6 },
                { a: 'Venus', b: 'Venus', w: 0.6 }  // shared values / aesthetic
            ]
        },
        {
            key: 'communication', label: '\uD83D\uDCAC Communication', weight: 0.17,
            pairs: [
                { a: 'Mercury', b: 'Mercury', w: 1.0 },
                { a: 'Mercury', b: 'Venus', w: 0.6 },
                { a: 'Venus',   b: 'Mercury', w: 0.6 },
                { a: 'Mercury', b: 'Moon', w: 0.5 },
                { a: 'Moon',    b: 'Mercury', w: 0.5 }
            ]
        },
        {
            key: 'longevity', label: '\u23F3 Staying power', weight: 0.25,
            pairs: [
                { a: 'Saturn', b: 'Sun', w: 0.9 },
                { a: 'Saturn', b: 'Moon', w: 0.9 },
                { a: 'Sun',    b: 'Saturn', w: 0.5 },
                { a: 'Venus',  b: 'Saturn', w: 0.7 },
                { a: 'Descendant', b: 'Sun', w: 1.0 },
                { a: 'Sun',    b: 'Descendant', w: 1.0 }
            ]
        }
    ];

    // Aspect nature -> signed contribution. Harmonious aspects support,
    // hard aspects charge. Conjunction is context-dependent and handled
    // by conjunctionTone() below.
    var NATURE = { harmonious: 1.0, neutral: 0.15, challenging: -0.75 };

    function conjunctionTone(aPoint, bPoint) {
        var charged = { Mars: 1, Saturn: 1 };
        if (charged[aPoint] || charged[bPoint]) return -0.25; // intense, needs work
        return 1.0; // warm fusion (benefics: Sun/Venus/Moon/Mercury)
    }

    // ---------- Input shaping ----------
    // chart = object from SparkRuntime.computeChart(). Only exact
    // placements are included; a withheld point is simply absent.
    SYN.pointsFromChart = function (chart) {
        if (!S || !chart || !chart.ok) return null;
        var p = chart.placements;
        if (!p || !p.sun || !p.venus || !p.mars) return null; // minimum viable synastry
        var pts = [
            { label: 'Sun',     longitude: p.sun.longitude },
            { label: 'Venus',   longitude: p.venus.longitude },
            { label: 'Mars',    longitude: p.mars.longitude },
            { label: 'Mercury', longitude: p.mercury ? p.mercury.longitude : null },
            { label: 'Jupiter', longitude: p.jupiter ? p.jupiter.longitude : null },
            { label: 'Saturn',  longitude: p.saturn ? p.saturn.longitude : null }
        ];
        // Moon: only if NOT withheld as sign-uncertain
        if (p.moon && !chart.moonUncertain) pts.push({ label: 'Moon', longitude: p.moon.longitude });
        // Descendant: only when time+place resolved it exactly
        if (chart.descendant) pts.push({ label: 'Descendant', longitude: chart.descendant.longitude });
        return pts.filter(function (x) { return x.longitude != null && isFinite(x.longitude); });
    };

    function lonOf(list, label) {
        for (var i = 0; i < list.length; i++) if (list[i].label === label) return list[i].longitude;
        return null;
    }

    // ---------- Aspect strength ----------
    // Tighter orb = stronger. Returns 0..1 (1 = exact to the degree).
    function orbStrength(orb, aspectName) {
        var max = SYN.ORBS[aspectName];
        if (!max) return 0;
        return Math.max(0, Math.min(1, 1 - (orb / max)));
    }

    // ---------- Core analysis ----------
    // chartA = "you", chartB = "them". Returns {ok:false, reason} if either
    // side lacks the minimum exact placements.
    SYN.analyze = function (chartA, chartB) {
        var A = SYN.pointsFromChart(chartA);
        var B = SYN.pointsFromChart(chartB);
        if (!A || !B || !A.length || !B.length) {
            return {
                ok: false,
                reason: 'One chart lacks the exact placements needed (Sun, Venus and Mars at minimum). Add the missing birth details and the full degree-based analysis unlocks.'
            };
        }

        var dims = [];
        var allFound = [];   // notable aspects across dimensions, tightest first

        SYN.DIMENSIONS.forEach(function (dim) {
            var contributions = [];
            var hits = [];
            dim.pairs.forEach(function (pair) {
                var aLon = lonOf(A, pair.a), bLon = lonOf(B, pair.b);
                if (aLon == null || bLon == null) return;      // withheld -> skip honestly
                var sep = S.separation(aLon, bLon);
                var asp = null;
                for (var k = 0; k < S.ASPECT_TYPES.length; k++) {
                    var t = S.ASPECT_TYPES[k];
                    var d = Math.abs(sep - t.angle);
                    if (d <= SYN.ORBS[t.name]) { asp = { type: t.name, nature: t.nature, orb: d }; break; }
                }
                if (!asp) return;                              // no contact within orb
                var strength = orbStrength(asp.orb, asp.type);
                var tone = (asp.type === 'conjunction') ? conjunctionTone(pair.a, pair.b) : NATURE[asp.nature];
                contributions.push({ w: pair.w, strength: strength, tone: tone });
                hits.push({
                    dim: dim.key,
                    a: pair.a, b: pair.b, type: asp.type, nature: asp.nature,
                    separation: sep, orb: asp.orb, strength: strength, tone: tone,
                    text: 'your ' + pair.a + ' ' + asp.type + ' their ' + pair.b +
                          ' (' + sep.toFixed(2) + '\u00B0 apart, orb ' + asp.orb.toFixed(2) + '\u00B0)'
                });
            });

            if (!contributions.length) {
                dims.push({
                    key: dim.key, label: dim.label, weight: dim.weight,
                    contacted: false, score: null, hits: [],
                    readout: 'No exact aspect within orb touches this dimension. That is information, not a bad sign and nothing here was forced to a number.'
                });
                return;
            }

            // Weighted tone across this dimension's contacts: -1..+1
            var num = 0, den = 0;
            contributions.forEach(function (c) {
                num += c.w * c.strength * c.tone;
                den += c.w * c.strength;
            });
            var tone = den > 0 ? num / den : 0;
            var score = Math.round(Math.max(0, Math.min(100, 50 + tone * 50)));

            dims.push({
                key: dim.key, label: dim.label, weight: dim.weight,
                contacted: true, score: score, tone: tone,
                strength: den, hits: hits,
                readout: DIMENSION_COPY[dim.key](tone, den, hits.length)
            });
            hits.forEach(function (h) { allFound.push(h); });
        });

        allFound.sort(function (x, y) { return x.orb - y.orb; });

        // Overall: renormalized across CONTACTED dimensions ONLY.
        var contacted = dims.filter(function (d) { return d.contacted; });
        var wsum = contacted.reduce(function (s, d) { return s + d.weight; }, 0);
        var overall = null, ease = null;
        if (contacted.length) {
            overall = Math.round(contacted.reduce(function (s, d) {
                return s + d.score * (d.weight / wsum);
            }, 0));
            var tsum = contacted.reduce(function (s, d) { return s + d.tone * d.weight; }, 0);
            ease = Math.round(Math.max(0, Math.min(100, 50 + (tsum / wsum) * 50)));
        }

        // CONTACT axis: normalized binding density, 0-100.
        var contact = contacted.length ? Math.round(Math.max(0, Math.min(100,
            contacted.reduce(function (s, d) { return s + Math.min(1, d.strength) * (d.weight / wsum); }, 0) * 100))): 0;

        return {
            ok: true,
            precision: 'degree',
            nameA: (chartA.input && chartA.input.name) || 'You',
            nameB: (chartB.input && chartB.input.name) || 'Them',
            overall: overall,
            contact: contact,
            ease: ease,
            coverage: Math.round(wsum * 100),
            dims: dims,
            contactedCount: contacted.length,
            totalDims: dims.length,
            notable: allFound.slice(0, 8),
            aspectsFound: allFound.length,
            composite: SYN.composite(chartA, chartB),
            orbs: SYN.ORBS
        };
    };

    // ---------- Composite chart (midpoint method) ----------
    // The relationship's own chart: each point is the near-midpoint of the
    // two people's exact longitudes. Standard technique, disclosed in UI.
    SYN.midpoint = function (a, b) {
        a = ((a % 360) + 360) % 360;
        b = ((b % 360) + 360) % 360;
        var d = b - a;
        if (d > 180) d -= 360;
        if (d < -180) d += 360;
        return ((a + d / 2) % 360 + 360) % 360;
    };
    SYN.composite = function (chartA, chartB) {
        var A = SYN.pointsFromChart(chartA), B = SYN.pointsFromChart(chartB);
        if (!A || !B) return null;
        var out = {};
        ['Sun', 'Moon', 'Venus', 'Mercury', 'Mars'].forEach(function (lbl) {
            var la = lonOf(A, lbl), lb = lonOf(B, lbl);
            if (la == null || lb == null) return;   // withheld -> omitted
            out[lbl] = S.signFromLongitude(SYN.midpoint(la, lb));
        });
        return Object.keys(out).length ? out : null;
    };

    // ---------- Honest copy: never fatalistic ----------
    var DIMENSION_COPY = {
        chemistry: function (tone, strength, n) {
            if (tone > 0.45)  return 'Real pull here \u2014 ' + n + ' exact contact' + (n > 1 ? 's' : '') + ' on your Venus/Mars axis. This is the dimension that makes someone register as magnetic before they have said anything clever.';
            if (tone > -0.1)  return 'Workable heat: ' + n + ' exact aspect' + (n > 1 ? 's' : '') + ', leaning charged rather than easy. That usually means it needs honesty, not more flirtation.';
            return 'Friction-forward chemistry \u2014 ' + n + ' exact aspect' + (n > 1 ? 's' : '') + ', mostly hard ones. That can be genuinely magnetic AND genuinely tiring. Worth knowing which you are signing up for.';
        },
        safety: function (tone, strength, n) {
            if (tone > 0.45)  return 'Your emotional systems speak the same language (' + n + ' exact contact' + (n > 1 ? 's' : '') + '). Rare, and it is what lets both people stop performing.';
            if (tone > -0.1)  return 'Different comfort dialects but real contact (' + n + ' aspect' + (n > 1 ? 's' : '') + '). Nobody has to guess: say how you settle, ask how they do.';
            return 'The contact here is charged rather than soothing (' + n + ' exact aspect' + (n > 1 ? 's' : '') + ', mostly hard ones). Not fatal \u2014 but differing comfort needs keep tripping couples who never name them out loud.';
        },
        communication: function (tone, strength, n) {
            if (tone > 0.45)  return 'Your Mercuries get each other (' + n + ' exact contact' + (n > 1 ? 's' : '') + '). Conversation will not be what breaks this.';
            if (tone > -0.1)  return 'Workable dialogue with a little translation required (' + n + ' aspect' + (n > 1 ? 's' : '') + '). Ask more than you assume and this improves fast.';
            return 'Genuinely different minds (' + n + ' exact aspect' + (n > 1 ? 's' : '') + ', mostly hard). Misreads will happen \u2014 they are fixable if neither of you treats being understood as automatic.';
        },
        longevity: function (tone, strength, n) {
            if (tone > 0.45)  return 'Staying power shows up in the math (' + n + ' exact contact' + (n > 1 ? 's' : '') + ', including Saturn and your relationship axis). These are the ingredients that survive year three.';
            if (tone > -0.1)  return 'Mixed on endurance (' + n + ' aspect' + (n > 1 ? 's' : '') + ') \u2014 real glue alongside real tension. Saturn contacts are not punishments; they mark where the work is worth doing.';
            return 'Hard aspects on the durability axis (' + n + ' exact contact' + (n > 1 ? 's' : '') + '). Plenty of lasting relationships run on hard Saturn \u2014 they are built, not found. Do not read this as a deadline.';
        }
    };

    global.SoulSparkSynastry = SYN;
    if (typeof module !== 'undefined' && module.exports) module.exports = SYN;
})(typeof window !== 'undefined' ? window : globalThis);
