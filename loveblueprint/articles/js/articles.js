/* ============================================================
   SOUL SPARK — SHARED ARTICLE SCRIPTS
   Reading-progress bar + guarded AdSense slot activation.
   Vanilla, no dependencies, reduced-motion aware.
   ============================================================ */
(function () {
    'use strict';

    /* ---- Reading progress bar (rAF, no scroll-handler thrash) ---- */
    var bar = document.getElementById('progressBar');
    if (bar) {
        var ticking = false;
        function update() {
            var doc = document.documentElement;
            var max = doc.scrollHeight - window.innerHeight;
            var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
            bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
            ticking = false;
        }
        window.addEventListener('scroll', function () {
            if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
        }, { passive: true });
        update();
    }

    /* ---- AdSense ----
       Slots ship as labelled placeholders. We only push units that carry a
       REAL numeric slot ID, so a not-yet-created ad can never throw on the
       page or render an empty dashed box as if it were inventory. */
    function initAds() {
        try {
            // Hide placeholder zones FIRST — before any early return — so an
            // article with no real inventory never shows an empty dashed
            // "Advertisement" box. A zone is live only when it contains an
            // <ins> with a NUMERIC data-ad-slot from the AdSense dashboard.
            document.querySelectorAll('.ad-zone').forEach(function (z) {
                var ins = z.querySelector('ins.adsbygoogle');
                var live = ins && /^\d+$/.test(ins.getAttribute('data-ad-slot') || '');
                if (!live) z.style.display = 'none';
            });

            var units = document.querySelectorAll('ins.adsbygoogle');
            if (!units.length) return;
            units.forEach(function (ins) {
                var slot = ins.getAttribute('data-ad-slot') || '';
                if (!slot || !/^\d+$/.test(slot)) return;   // placeholder -> skip
                try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { /* noop */ }
            });
        } catch (e) { /* never break the article over an ad */ }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAds);
    } else {
        initAds();
    }

    /* ---- Outbound CTA tracking (shared GA4 property) ---- */
    document.querySelectorAll('a[href*="/loveblueprint/"]').forEach(function (a) {
        a.addEventListener('click', function () {
            try {
                if (typeof gtag === 'function') {
                    gtag('event', 'article_cta_click', {
                        article: document.title.slice(0, 60),
                        destination: a.getAttribute('href')
                    });
                }
            } catch (e) { /* noop */ }
        });
    });
})();
