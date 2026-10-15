/**
 * SOUL BLUEPRINT GEOCODER + TIMEZONE RESOLVER
 *
 * Replaces the ~190-city hardcoded LOCATIONS table in calculations.js with the
 * generated GeoNames dataset (window.SB_GEO, 8,412 cities, 245 countries) and
 * replaces the single static `tz` offset with a real IANA timezone resolved FOR
 * THE ACTUAL BIRTH INSTANT.
 *
 * THE TWO BUGS THIS EXISTS TO FIX
 * -------------------------------
 * 1. Silent Greenwich fallback. The old findLocation() returned
 *    {lat:0, lon:0, tz:0} for any unrecognised town. A perfect ephemeris fed
 *    coordinates from the Gulf of Guinea still yields a wrong Ascendant, and
 *    nothing told the user. Geocoding failure is now EXPLICIT: a result carries
 *    found:false, and callers must not invent coordinates.
 *
 * 2. Static offsets ignore daylight saving. Measured from the dataset: 162 of
 *    its 340 zones change offset seasonally. The old table stored London=0
 *    year-round, Melbourne=10 year-round, LA=0 year-round. Every DST-month birth
 *    in those cities got an hour wrong, which moves the Ascendant ~10 deg and
 *    can flip a sign outright.
 *
 * DESIGN NOTE ON THE MATCHER
 * --------------------------
 * An earlier draft used prefix matching (`want.startsWith(n) || n.startsWith(want)`)
 * and produced catastrophically wrong results: the legacy key "la" matched Lagos,
 * and "manama" matched a city in Cote d'Ivoire. Prefix matching is unsound for
 * short inputs. This matcher therefore requires an EXACT normalized token match
 * on the city name, then ranks by qualifier and population. Short or unusual
 * inputs that do not match exactly are deliberately NOT resolved - returning no
 * answer is correct; returning Lagos for Los Angeles is not.
 *
 * Loads as a plain <script> (defines window.SBGeo) and as CommonJS for tests.
 */

(function (root) {
    'use strict';

    /**
     * Curated aliases for forms people actually type that GeoNames' asciiname does
     * not contain. Derived by measurement (analyze-blockers.cjs), not guesswork:
     * "New York" and "Washington DC" returned zero exact matches, so they need an
     * entry here. Kept deliberately small and auditable.
     */
    var ALIASES = {
        'new york': 'new york city',
        'nyc': 'new york city',
        'washington dc': 'washington',
        'washington d.c.': 'washington',
        'washington, dc': 'washington',
        'la': 'los angeles',
        'sf': 'san francisco',
        'st petersburg': 'saint petersburg',
        'stpetersburg': 'saint petersburg',
        'mianzhu': 'mianzhu deyang sichuan',  // GeoNames name carries the region
        // German cities where GeoNames' asciiname includes qualifiers that people do not
        // type, and where the bare form is genuinely ambiguous between two real cities:
        //   "Frankfurt am Main" pop 650,000 vs "Frankfurt (Oder)" pop 57,107.
        // The bare form must mean the LARGE one, not fail.
        'frankfurt': 'frankfurt am main',
        'frankfurt main': 'frankfurt am main',
        'frankfurt an der oder': 'frankfurt oder',
        'frankfurt oder': 'frankfurt oder'
    };

    /**
     * Cities whose COMMON NAME differs from the GeoNames asciiname.
     *
     * Measured, not guessed: diag-geocode-failures.cjs proved that
     * norm("zurich"), norm("bangalore") and norm("kuwait city") return NONE,
     * while GeoNames stores "Zuerich" and "Bengaluru". Kuwait City is absent
     * from the cities5000 dump under that name entirely.
     *
     * Every entry here must be justified by a measured miss - adding a
     * speculative alias is how a matcher starts returning wrong cities.
     */
    var RENAMED = {
        'zurich': 'zuerich',
        'zurich switzerland': 'zuerich',
        'bangalore': 'bengaluru',
        'bangalore india': 'bengaluru',
        'bombay': 'mumbai',
        'calcutta': 'kolkata',
        'madras': 'chennai',
        'saigon': 'ho chi minh city',
        'peking': 'beijing',
        'canton': 'guangzhou',
        'korea': null,             // country, not a city - never match it
        'kuwait': 'kuwait city',
        'kuwait city': 'kuwait',    // see Kuwait note below
        'ceylon': null,
        'persia': null,
        'siamese': null
    };

    /** US state/territory postal codes -> admin1 names users type. */
    var US_STATES = {
        'al': 'alabama', 'ak': 'alaska', 'az': 'arizona', 'ar': 'arkansas',
        'ca': 'california', 'co': 'colorado', 'ct': 'connecticut', 'de': 'delaware',
        'dc': 'district of columbia', 'fl': 'florida', 'ga': 'georgia', 'hi': 'hawaii',
        'id': 'idaho', 'il': 'illinois', 'in': 'indiana', 'ia': 'iowa', 'ks': 'kansas',
        'ky': 'kentucky', 'la': 'louisiana', 'me': 'maine', 'md': 'maryland',
        'ma': 'massachusetts', 'mi': 'michigan', 'mn': 'minnesota', 'ms': 'mississippi',
        'mo': 'missouri', 'mt': 'montana', 'ne': 'nebraska', 'nv': 'nevada',
        'nh': 'new hampshire', 'nj': 'new jersey', 'nm': 'new mexico', 'ny': 'new york',
        'nc': 'north carolina', 'nd': 'north dakota', 'oh': 'ohio', 'ok': 'oklahoma',
        'or': 'oregon', 'pa': 'pennsylvania', 'ri': 'rhode island', 'sc': 'south carolina',
        'sd': 'south dakota', 'tn': 'tennessee', 'tx': 'texas', 'ut': 'utah',
        'vt': 'vermont', 'va': 'virginia', 'wa': 'washington', 'wv': 'west virginia',
        'wi': 'wisconsin', 'wy': 'wyoming'
    };

    /** Australian states, another common qualifier. */
    var AU_STATES = {
        'nsw': 'new south wales', 'vic': 'victoria', 'qld': 'queensland',
        'wa': 'western australia', 'sa': 'south australia', 'tas': 'tasmania',
        'act': 'australian capital territory', 'nt': 'northern territory'
    };

    var QUALIFIER_ALIASES = Object.assign({}, US_STATES, AU_STATES);

    /** Fold diacritics so "Zurich" matches "Zürich" and "Sao Paulo" matches both. */
    function foldDiacritics(s) {
        if (typeof s.normalize === 'function') {
            return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }
        return s;
    }

    /** Normalize any user input into comparable form. */
    function norm(s) {
        if (!s) return '';
        return foldDiacritics(String(s))
            .toLowerCase()
            .replace(/\./g, ' ')          // "St." / "d.c." / "U.S."
            .replace(/[^a-z0-9 ]+/g, ' ') // strip other punctuation
            .replace(/\s+/g, ' ')
            .trim();
    }

    /**
     * Split "Portland, OR" / "Paris France" / "Sydney, Australia" into a city
     * part and an optional qualifier. Only the FIRST comma separates them;
     * everything after is a qualifier to rank by.
     */
    function splitQuery(raw) {
        var s = String(raw || '').trim();
        var i = s.indexOf(',');
        if (i >= 0) {
            return { city: norm(s.slice(0, i)), qualifier: norm(s.slice(i + 1)) };
        }
        // No comma: a trailing country/state word may still be present
        // ("Sydney Australia", "London UK"). Try a two-word split later if the
        // whole string fails; see geocode().
        return { city: norm(s), qualifier: '' };
    }

    /** Build the searchable index lazily, once. */
    var indexBuilt = false;
    var byName = new Map();     // normalized name -> array of records
    var all = [];
    var countryNames = null;    // code -> full English name, memoized

    /**
     * ISO code -> country name.
     *
     * The dataset ships countryNamesList as an ARRAY PARALLEL to countries
     * (shorter than an object literal of quoted keys). The matcher consumes a
     * map, so build it once here. Memoized per dataset object, not per call.
     *
     * Without this bridge a qualifier of "Spain" or "Argentina" can never
     * match, because only ISO codes are stored in the row data - which is the
     * root cause of "Cordoba, Spain" resolving to Cordoba, Argentina.
     */
    function getCountryNames(geo) {
        if (countryNames && countryNames._owner === geo) return countryNames;
        var map = Object.create(null);
        map._owner = geo;
        var codes = geo.countries || [];
        var names = geo.countryNamesList || null;
        for (var i = 0; i < codes.length; i++) {
            // Fall back to the code itself if a name is missing, so a lookup
            // never yields undefined for a country that IS in the dataset.
            map[codes[i]] = (names && names[i]) ? names[i] : codes[i];
        }
        countryNames = map;
        return map;
    }

    function buildIndex(geo) {
        if (indexBuilt) return;
        if (!geo || !geo.rows) return;
        var rows = geo.rows.split(',');
        for (var i = 0; i < rows.length; i++) {
            var f = rows[i].split('~');
            if (f.length !== 7) continue; // build-time invariant should prevent this
            var rec = {
                name: f[0],
                lat: parseInt(f[1], 36) / 1000,
                lon: parseInt(f[2], 36) / 1000,
                zone: geo.zones[parseInt(f[3], 36)],
                cc: geo.countries[parseInt(f[4], 36)],
                admin1: f[5] || '',
                popBucket: parseInt(f[6], 36),
                minPop: geo.popBuckets[parseInt(f[6], 36)] || 0,
                // Match keys
                _n: norm(f[0]),
                _a1: norm(f[5] || '')
            };
            all.push(rec);
            var list = byName.get(rec._n);
            if (!list) { list = []; byName.set(rec._n, list); }
            list.push(rec);
        }
        indexBuilt = true;
    }

    function getGeo(explicit) {
        if (explicit) return explicit;
        if (typeof window !== 'undefined' && window.SB_GEO) return window.SB_GEO;
        if (root && root.SB_GEO) return root.SB_GEO;
        return null;
    }

    /** Score a qualifier against a candidate record. Higher is better.
     *
     *  Returns a NEGATIVE-INFINITY-equivalent score (-1) when a qualifier was
     *  supplied but matches nothing at all. That distinction is load-bearing:
     *  the caller uses it to return found:false rather than silently accepting
     *  the most populous same-name city, which is how "Cordoba, Spain" came back
     *  as Cordoba, Argentina and "Portland, ME" came back as Portland, Oregon.
     */
    /**
     * Score a qualifier against a candidate record. Higher is better; 0 means
     * "this qualifier says nothing about this record."
     *
     * TOKEN-BASED on purpose. The whole qualifier may combine a state AND a
     * country ("New York, NY, USA" -> "ny usa"). Testing that as one string
     * against one admin1 fails both parts, which is exactly the bug that made
     * "New York, NY, USA" return qualifier-unmatched. Each token is scored
     * independently; best-of per category, summed across categories.
     */
    var COUNTRY_TOKEN_ALIASES = {
        'usa': 'US', 'us': 'US', 'u s': 'US', 'united states': 'US', 'america': 'US',
        'uk': 'GB', 'britain': 'GB', 'england': 'GB', 'great britain': 'GB',
        'uae': 'AE', 'russia': 'RU', 'czechia': 'CZ', 'holland': 'NL', 'netherlands': 'NL'
    };
    function qualifierScore(rec, qualifier, geo) {
        if (!qualifier) return 0;
        var q = norm(qualifier);
        if (!q) return 0;

        // Tokenize on whitespace, but also keep the whole string as a token so
        // multi-word qualifiers ("nova scotia", "united states") match intact.
        var tokens = q.split(' ').filter(function (t) { return t.length >= 2; });
        if (tokens.indexOf(q) === -1) tokens.push(q);

        var nameMap = getCountryNames(geo);
        var ccNameNorm = rec.cc && nameMap ? norm(nameMap[rec.cc] || '') : '';

        var adminBest = 0, countryBest = 0, nameSubBest = 0;

        for (var i = 0; i < tokens.length; i++) {
            var t = tokens[i];
            var tState = QUALIFIER_ALIASES[t] || t;          // 'me' -> 'maine'
            var tCountryCode = COUNTRY_TOKEN_ALIASES[t] || null; // 'usa' -> 'US'

            // --- Category A: admin1 (state/province/district) ---
            if (rec._a1) {
                if (rec._a1 === t || rec._a1 === tState) adminBest = Math.max(adminBest, 12);
                else if ((t.length >= 3 && rec._a1.indexOf(tState) >= 0) ||
                         (tState.length >= 3 && tState.indexOf(rec._a1) >= 0)) {
                    adminBest = Math.max(adminBest, 8);
                }
            }

            // --- Category B: country, by ISO code or full name or alias ---
            if (rec.cc) {
                var up = t.replace(/\s/g, '').toUpperCase();
                if (up === rec.cc) countryBest = Math.max(countryBest, 14);
                if (tCountryCode && tCountryCode.toUpperCase() === rec.cc) countryBest = Math.max(countryBest, 14);
                // Full country name match ("spain", "united states", "france")
                if (ccNameNorm && (ccNameNorm === t || ccNameNorm === tState)) {
                    countryBest = Math.max(countryBest, 14);
                } else if (ccNameNorm && t.length >= 4 && ccNameNorm.indexOf(t) === 0) {
                    // "argentina" matches "Argentina"; prefix avoids "ira" in random names
                    countryBest = Math.max(countryBest, 8);
                }
            }

            // --- Category C: qualifier token is part of the city name itself ---
            // (e.g. "Mianzhu, Deyang, Sichuan" carries the region in the name.)
            if (t.length >= 3 && rec._n.indexOf(t) >= 0) nameSubBest = Math.max(nameSubBest, 3);
            if (t.length >= 3 && rec._a1 && rec._a1.indexOf(t) >= 0) nameSubBest = Math.max(nameSubBest, 5);
        }

        return adminBest + countryBest + nameSubBest;
    }

    /**
     * Resolve free-text place input to coordinates + timezone.
     *
     * @param {string} input  e.g. "Portland, OR", "Paris, France", "Tokyo"
     * @param {object} [geo]  SB_GEO override (tests pass this directly)
     * @returns {object} result with found:false when unresolved. NEVER returns
     *                   invented coordinates: the old silent {0,0} fallback is
     *                   the bug being removed.
     */
    function geocode(input) {
        var geo = arguments.length > 1 ? arguments[1] : null;
        geo = getGeo(geo);
        if (!geo) {
            return { found: false, reason: 'dataset-not-loaded', input: input, candidates: [] };
        }
        buildIndex(geo);
        getCountryNames(geo);

        if (!input || !String(input).trim()) {
            return { found: false, reason: 'empty-input', input: input, candidates: [] };
        }

        var parsed = splitQuery(input);
        var cityName = parsed.city;
        var qualifier = parsed.qualifier;

        if (!cityName) {
            return { found: false, reason: 'empty-city', input: input, candidates: [] };
        }

        // A RENAMED entry that maps to null means "this is a country or otherwise
        // not a city" - refuse rather than guess.
        if (Object.prototype.hasOwnProperty.call(RENAMED, cityName) && RENAMED[cityName] === null) {
            return { found: false, reason: 'not-a-city', input: input, candidates: [] };
        }

        // Candidate name keys: the literal city, an alias, a known rename, and
        // (when no comma was present) a split of the trailing word as
        // city+qualifier. Exact-normalized matching only - prefix matching is
        // unsound for short inputs ("la" matched Lagos in an earlier draft).
        var attempts = [];
        var direct = ALIASES[cityName] || cityName;
        attempts.push({ name: direct, qual: qualifier });
        if (RENAMED[cityName]) attempts.push({ name: RENAMED[cityName], qual: qualifier });

        if (!qualifier) {
            var words = cityName.split(' ');
            if (words.length >= 2) {
                var leading = words[0];
                var trailing = words.slice(1).join(' ');
                if (byName.has(leading) || byName.has(ALIASES[leading] || '') || byName.has(RENAMED[leading] || '')) {
                    attempts.push({ name: ALIASES[leading] || RENAMED[leading] || leading, qual: trailing });
                }
                if (!byName.has(direct)) {
                    var last = words[words.length - 1];
                    var firstWords = words.slice(0, -1).join(' ');
                    if (byName.has(last) && firstWords) {
                        attempts.push({ name: last, qual: firstWords });
                    }
                }
            }
        }

        var best = null;
        var bestScore = -Infinity;
        var qualifiedAttempt = false;   // did any attempt actually use a qualifier?
        for (var a = 0; a < attempts.length; a++) {
            var list = byName.get(attempts[a].name);
            if (!list || !list.length) continue;
            var q = norm(attempts[a].qual);

            // SAFETY: if the user supplied a qualifier, an attempt may only win
            // by actually matching it. Ranking unmatched candidates by
            // population is what produced "Cordoba, Spain" -> Cordoba (AR).
            if (q) {
                var anyMatched = false;
                for (var t = 0; t < list.length; t++) {
                    if (qualifierScore(list[t], q, geo) > 0) { anyMatched = true; break; }
                }
                if (!anyMatched) { qualifiedAttempt = true; continue; }
            }

            for (var k = 0; k < list.length; k++) {
                var rec = list[k];
                var qScore = qualifierScore(rec, q, geo);
                // Population breaks ties among equal-qualifier matches so that
                // "Sydney" means Sydney AU (5.6M) not Sydney NS (106k).
                var score = qScore * 1000 + rec.minPop / 1e6 - a;
                if (score > bestScore) { bestScore = score; best = rec; }
            }
        }

        if (!best) {
            // Offer near-misses for diagnostics only; never resolve to them.
            var near = [];
            byName.forEach(function (list, key) {
                if (near.length < 3 && key.indexOf(cityName) === 0 && key !== cityName) {
                    var c = list.reduce(function (x, y) { return y.minPop > x.minPop ? y : x; });
                    near.push({ name: c.name, cc: c.cc, pop: c.minPop });
                }
            });
            // A supplied qualifier that matched nothing is reported distinctly:
            // it means the city probably is not in the dataset (e.g. Portland,
            // Maine at 66k falls below the population cutoff). Saying so lets
            // the UI ask the user, instead of fabricating a chart.
            var reason = qualifiedAttempt && cityName && byName.has(direct) ? 'qualifier-unmatched' : 'no-match';
            return { found: false, reason: reason, input: input, candidates: near };
        }

        return {
            found: true,
            name: best.name,
            lat: best.lat,
            lon: best.lon,
            zone: best.zone,
            cc: best.cc,
            admin1: best.admin1,
            minPop: best.minPop,
            // Legacy numeric field. NOTE: a single number cannot be correct - the
            // offset depends on the date. Callers should use offsetMinutes(date).
            // Provided so existing call sites keep working during migration.
            tz: utcOffsetHours(best.zone, null),
            matchedBy: norm(best.name) === cityName ? 'exact' : 'alias'
        };
    }

    /**
     * IANA zones that the host Intl implementation REJECTS at runtime, mapped to
     * an accepted equivalent.
     *
     * Measured, not speculative: analyze-tz-runtime.cjs probed all 340 zones in
     * the dataset. 353 resolve canonically and 17 more resolve as linked/alias
     * zones even though supportedValuesOf() does not list them. Exactly ONE
     * throws a RangeError:
     *
     *   America/Coyhaique  (3 cities, ~68k people, CL - Aysen Region)
     *
     * It is a recently-created zone that older ICU data does not know. Coyhaique
     * observes mainland Chilean time, so America/Santiago is the correct
     * equivalent. Without this alias those births get offset null, and whatever
     * consumes it would fall back to something wrong - the silent-failure class
     * this module exists to eliminate.
     */
    var ZONE_ALIASES = {
        'America/Coyhaique': 'America/Santiago'
    };

    /** Resolve a zone through the alias table. Returns the usable zone name. */
    function resolveZone(zone) {
        if (!zone) return null;
        return ZONE_ALIASES[zone] || zone;
    }

    /**
     * UTC offset for an instant in a zone, daylight saving included.
     * Returns MINUTES east of UTC (positive = ahead of UTC).
     *
     * @param {string} zone   IANA name e.g. 'Europe/London'
     * @param {Date|number|null} instant  Date, epoch ms, or null for "now"
     * @returns {number|null} minutes, or null if the zone is unusable
     */
    function utcOffsetMinutes(zone, instant) {
        if (!zone) return null;
        zone = resolveZone(zone);
        var when = instant === null || instant === undefined ? new Date()
            : (instanceOfDate(instant) ? instant : new Date(instant));
        if (isNaN(when.getTime())) return null;
        try {
            var dtf = new Intl.DateTimeFormat('en-US', {
                timeZone: zone, hour12: false,
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });
            var parts = {};
            var ps = dtf.formatToParts(when);
            for (var i = 0; i < ps.length; i++) parts[ps[i].type] = ps[i].value;
            var hour = parts.hour === '24' ? 0 : Number(parts.hour);
            var asUTC = Date.UTC(+parts.year, +parts.month - 1, +parts.day, hour, +parts.minute, +parts.second);
            return Math.round((asUTC - when.getTime()) / 60000);
        } catch (e) {
            return null;
        }
    }

    function instanceOfDate(v) {
        return v instanceof Date || (typeof Date !== 'undefined' &&
            Object.prototype.toString.call(v) === '[object Date]');
    }

    /** Same as utcOffsetMinutes but in HOURS (fractional), for legacy call sites. */
    function utcOffsetHours(zone, instant) {
        var m = utcOffsetMinutes(zone, instant);
        return m === null ? 0 : m / 60;
    }

    /** True when this zone observes daylight saving in at least one of the probed months. */
    function zoneObservesDst(zone, year) {
        var y = year || new Date().getFullYear();
        var jan = utcOffsetMinutes(zone, new Date(Date.UTC(y, 0, 15, 12, 0, 0)));
        var jul = utcOffsetMinutes(zone, new Date(Date.UTC(y, 6, 15, 12, 0, 0)));
        if (jan === null || jul === null) return false;
        return jan !== jul;
    }

    /**
     * Read back the LOCAL wall-clock parts for an instant in a zone. This is the
     * inverse of localTimeToUtc and what makes a correct round-trip check
     * possible: an offset is only valid if applying it and reading the result
     * back yields the original wall clock.
     */
    function utcToLocalParts(z, instant) {
        try {
            var dtf = new Intl.DateTimeFormat('en-US', {
                timeZone: z, hour12: false,
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });
            var parts = {};
            var ps = dtf.formatToParts(instant);
            for (var i = 0; i < ps.length; i++) parts[ps[i].type] = ps[i].value;
            return {
                year: +parts.year, month: +parts.month, day: +parts.day,
                hour: parts.hour === '24' ? 0 : +parts.hour, minute: +parts.minute
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * Convert a LOCAL WALL-CLOCK birth time in a timezone to a UTC instant.
     *
     * WHY THIS IS NON-TRIVIAL
     * -----------------------
     * The UTC offset for a zone depends on the instant, but the instant depends
     * on the offset - a circular definition the old code resolved by assuming a
     * single static `tz` hour value year-round. That is wrong for every DST
     * month (162 of this dataset's 356 zones observe DST), and impossible to
     * represent at all for fractional zones: Nepal is +5:45, India +5:30.
     *
     * A fixed-point search finds a plausible offset in ~2 iterations. But the
     * search alone cannot tell an 'exact' time from a fall-back 'overlap' (two
     * valid instants) or a spring-forward 'gap' (no valid instant), and a naive
     * proximity check misflags ordinary times near a transition. So ambiguity is
     * decided by a ROUND-TRIP: keep every candidate offset that reproduces the
     * original wall clock. 1 valid -> exact, 2 -> overlap (take the first),
     * 0 -> gap (shift forward onto the post-transition offset).
     *
     * @param {string} zone IANA zone
     * @param {number} year,month(1-12),day,hour,minute local wall-clock parts
     * @returns {{utc:Date|null, offsetMinutes:number|null, ambiguous:boolean,
     *            kind:'exact'|'overlap'|'gap', iterations:number, error:string|null}}
     */
    function localTimeToUtc(zone, year, month, day, hour, minute) {
        var z = resolveZone(zone);
        if (!z) return { utc: null, offsetMinutes: null, ambiguous: false, iterations: 0, error: 'no-zone' };
        if (![year, month, day, hour, minute].every(function (v) { return isFinite(v); })) {
            return { utc: null, offsetMinutes: null, ambiguous: false, iterations: 0, error: 'bad-input' };
        }

        // Build the local wall-clock as if it were UTC; the true instant is this
        // minus the local offset. First pass assumes offset 0 to bootstrap.
        var localAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0, 0);
        var offset = null;
        var iterations = 0;
        var seenOffsets = {};
        for (var i = 0; i < 6; i++) {
            iterations = i + 1;
            var guess = i === 0 ? 0 : offset;
            var instant = new Date(localAsUtc - (guess === null ? 0 : guess) * 60000);
            var derived = utcOffsetMinutes(z, instant);
            if (derived === null) {
                return { utc: null, offsetMinutes: null, ambiguous: false, iterations: iterations, error: 'zone-unusable' };
            }
            seenOffsets[derived] = (seenOffsets[derived] || 0) + 1;
            if (offset === derived) break;  // fixed point reached
            offset = derived;
        }

        if (offset === null) {
            return { utc: null, offsetMinutes: null, ambiguous: false, iterations: iterations, error: 'no-convergence' };
        }

        // --- Enumerate every offset that ROUND-TRIPS this wall clock ---
        //
        // Do NOT decide ambiguity by proximity to a transition. An earlier draft
        // compared the offset one hour either side, which flagged every merely-
        // NEAR-transition time as ambiguous: London 02:30 on 2024-03-31 converted
        // correctly to 01:30 UTC yet came back ambiguous:
        //
        //   The right test is a round trip. For each candidate offset, apply it to
        //   the wall clock to get an instant, then read that instant back as local
        //   time. Keep offsets that reproduce the ORIGINAL wall clock exactly.
        //     1 valid offset -> 'exact'
        //     2 valid offsets -> 'overlap' (autumn fall-back: time happened twice)
        //     0 valid offsets -> 'gap'     (spring forward: time never happened)
        //
        // Candidates are sampled +-2h around the bootstrap instant in 15-minute
        // steps. The widest real transition is one hour, so this window is ample
        // and the cost is constant regardless of zone.
        var valid = [];
        var seen = {};
        for (var deltaMin = -120; deltaMin <= 120; deltaMin += 15) {
            var probe = new Date(localAsUtc - (offset || 0) * 60000 + deltaMin * 60000);
            var probeOffset = utcOffsetMinutes(z, probe);
            if (probeOffset === null || seen[probeOffset]) continue;
            seen[probeOffset] = true;
            var cand = new Date(localAsUtc - probeOffset * 60000);
            var back = utcToLocalParts(z, cand);
            if (!back) continue;
            if (back.year === year && back.month === month && back.day === day &&
                back.hour === hour && back.minute === minute) {
                valid.push({ offsetMinutes: probeOffset, utc: cand });
            }
        }
        valid.sort(function (a, b) { return a.utc - b.utc; });

        var kind, chosen;
        if (valid.length === 0) {
            // GAP: the local time never occurred. Resolve with the PRE-transition
            // offset, which lands the instant just after the gap - the convention
            // used by java.time ZonedDateTime and Luxon. (An earlier draft used
            // Math.max(offset, post), which subtracted the LARGER offset and moved
            // the instant an hour BACKWARD, so the returned time read back as
            // 00:30 local instead of the requested 01:30.)
            kind = 'gap';
            var before = new Date(localAsUtc - (offset || 0) * 60000 - 2 * 3600000);
            var preOffset = utcOffsetMinutes(z, before);
            if (preOffset === null) preOffset = offset;
            // The pre-transition offset is the SMALLER of the two competing
            // offsets for a northern-hemisphere spring-forward, and the larger
            // for a southern autumn-fall-forward. Pick by which is in effect
            // before the transition rather than by comparing magnitudes.
            chosen = { offsetMinutes: preOffset, utc: new Date(localAsUtc - preOffset * 60000) };
        } else if (valid.length === 1) {
            kind = 'exact';
            chosen = valid[0];
        } else {
            // OVERLAP: occurred more than once; take the FIRST occurrence, the
            // conventional astrological reading of a doubly-occurring clock time.
            kind = 'overlap';
            chosen = valid[0];
        }

        // Report the offset that ACTUALLY applies at the returned instant, not the
        // bootstrap guess (in a gap case the guess is the pre-transition value).
        var appliedOffset = utcOffsetMinutes(z, chosen.utc);
        if (appliedOffset === null) appliedOffset = chosen.offsetMinutes;

        return {
            utc: chosen.utc,
            offsetMinutes: appliedOffset,
            ambiguous: kind !== 'exact',
            kind: kind,
            iterations: iterations,
            error: null
        };
    }

    /**
     * Convenience: hours east of UTC for a local wall-clock birth, DST-correct.
     * Returns a NUMBER OF HOURS (fractional), matching the shape the legacy
     * `locationData.tz` field had, so existing `localTimeDecimal - tz` call
     * sites keep working - but now the value is right for the actual date.
     */
    function offsetHoursAtLocal(zone, year, month, day, hour, minute) {
        var r = localTimeToUtc(zone, year, month, day, hour, minute);
        if (r.error || r.offsetMinutes === null) return 0;
        return r.offsetMinutes / 60;
    }

    var api = {
        version: 3,
        geocode: geocode,
        utcOffsetMinutes: utcOffsetMinutes,
        utcOffsetHours: utcOffsetHours,
        zoneObservesDst: zoneObservesDst,
        localTimeToUtc: localTimeToUtc,
        offsetHoursAtLocal: offsetHoursAtLocal,
        resolveZone: resolveZone,
        norm: norm,
        foldDiacritics: foldDiacritics,
        ALIASES: ALIASES,
        ZONE_ALIASES: ZONE_ALIASES,
        /**
         * Audit every zone in a dataset for runtime usability. Returns the zones
         * that Intl REJECTS and have no alias. Must be empty before shipping:
         * an unaliased rejected zone means births in those cities get no offset.
         */
        findUnusableZones: function (geo) {
            geo = getGeo(geo);
            if (!geo || !geo.zones) return null;
            var bad = [];
            for (var i = 0; i < geo.zones.length; i++) {
                var z = geo.zones[i];
                utcOffsetMinutes(z, new Date(Date.UTC(2000, 0, 15, 12)));
                utcOffsetMinutes(z, new Date(Date.UTC(2000, 6, 15, 12)));
                // Probe the raw zone directly, bypassing the alias table, to see
                // whether the ALIAS is doing the work.
                var raw = null;
                try {
                    new Intl.DateTimeFormat('en-US', { timeZone: z, hour12: false, year: 'numeric' })
                        .format(new Date());
                    raw = true;
                } catch (e) { raw = false; }
                if (raw === false && !ZONE_ALIASES[z]) bad.push(z);
            }
            return bad;
        },
        // Test seam: reset the memoized index (tests load several datasets).
        _reset: function () { indexBuilt = false; byName = new Map(); all = []; countryNames = null; },
        // Diagnostics / tests: the resolved country map.
        _countryNames: function (geo) { return getCountryNames(getGeo(geo)); }
    };

    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    if (root) root.SBGeo = api;
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
