// ============================================================
// LOVE BLUEPRINT — hand-drawn icon set (v1.0.0)
// ------------------------------------------------------------
// One stroke language across every icon: 24px grid, 1.6 stroke,
// round caps/joins, currentColor. Icons tint like type, never
// render as OS emoji, and never depend on fallback fonts.
//
// Usage:  LBIcon('heart')          -> <svg class="ic">...</svg>
//         LBIcons.heart            -> inner markup only
// Loaded BEFORE dating-content.js so CONTENT.icons can embed
// planet glyphs as SVG (with text fallback if absent).
// ============================================================
(function (global) {
    'use strict';

    var P = {
        // ---- brand ----
        heart: '<path d="M12 20.6C6.2 16.1 2.9 12.9 2.9 9.5 2.9 6.4 5.2 4.1 8 4.1c1.7 0 3.3.9 4 2.3.7-1.4 2.3-2.3 4-2.3 2.8 0 5.1 2.3 5.1 5.4 0 3.4-3.3 6.6-9.1 11.1Z"/>',

        // ---- sections ----
        scales: '<path d="M12 4.4v13.8M8.6 18.2h6.8M4.2 7.8h15.6"/><path d="M4.2 7.8 2.2 12.4a2.7 2.7 0 0 0 4 0Z"/><path d="M19.8 7.8 17.8 12.4a2.7 2.7 0 0 0 4 0Z"/><circle cx="12" cy="4" r="1"/>',
        star4: '<path d="M12 2.2c.6 6 3.8 9.2 9.8 9.8-6 .6-9.2 3.8-9.8 9.8-.6-6-3.8-9.2-9.8-9.8 6-.6 9.2-3.8 9.8-9.8Z"/>',
        sparkle: '<path d="M9.2 2.8c.5 4.6 2.9 7 7.5 7.5-4.6.5-7 2.9-7.5 7.5-.5-4.6-2.9-7-7.5-7.5 4.6-.5 7-2.9 7.5-7.5Z"/><path d="M18.4 14.2c.2 2 1.2 3 3.2 3.4-2 .3-3 1.3-3.2 3.2-.3-1.9-1.3-2.9-3.3-3.2 2-.4 3-1.4 3.3-3.4Z"/>',
        flag: '<path d="M6 3.2v17.6"/><path d="M6 4.8c4-1.7 8 1.6 12.4-.2v8.2c-4.4 1.8-8.4-1.5-12.4.2Z"/>',
        warn: '<path d="M12 3.6 21.4 20H2.6Z"/><path d="M12 9.4v5"/><circle cx="12" cy="17.4" r=".8" fill="currentColor" stroke="none"/>',
        pen: '<path d="M16.6 3.6 20.4 7.4 8.2 19.6 3.2 21l1.4-5Z"/><path d="M14.6 5.6 18.4 9.4"/>',
        envelope: '<rect x="2.6" y="5.2" width="18.8" height="13.6" rx="1.6"/><path d="M2.9 6.2 12 13.2l9.1-7"/>',
        cardId: '<rect x="2.8" y="5" width="18.4" height="14" rx="2"/><circle cx="8.4" cy="10.8" r="1.9"/><path d="M5.6 16.1c.6-1.7 1.6-2.5 2.8-2.5s2.2.8 2.8 2.5"/><path d="M14.4 9.8H18M14.4 13.4H17"/>',
        frames: '<rect x="3.2" y="3.2" width="7.6" height="7.6" rx="1.2"/><rect x="13.2" y="3.2" width="7.6" height="7.6" rx="1.2"/><rect x="3.2" y="13.2" width="7.6" height="7.6" rx="1.2"/><rect x="13.2" y="13.2" width="7.6" height="7.6" rx="1.2"/>',
        lock: '<rect x="4.6" y="10.4" width="14.8" height="9.6" rx="2"/><path d="M8 10.4V7.6a4 4 0 0 1 8 0v2.8"/><path d="M12 14v3"/>',
        unlock: '<rect x="4.6" y="10.4" width="14.8" height="9.6" rx="2"/><path d="M8 10.4V7.6a4 4 0 0 1 7.7-1.5"/><path d="M12 14v3"/>',
        eye: '<path d="M2.6 12C5.2 7.6 8.3 5.6 12 5.6s6.8 2 9.4 6.4c-2.6 4.4-5.7 6.4-9.4 6.4s-6.8-2-9.4-6.4Z"/><circle cx="12" cy="12" r="2.9"/>',
        search: '<circle cx="10.4" cy="10.4" r="6.6"/><path d="M15.4 15.4 21 21"/>',
        chevron: '<path d="M9.2 4.8 16.4 12 9.2 19.2"/>',

        // ---- verdicts / states ----
        check: '<path d="M4.6 12.6 9.6 17.6 19.4 6.4"/>',
        xmark: '<path d="M5.6 5.6 18.4 18.4M18.4 5.6 5.6 18.4"/>',
        target: '<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="4.2"/><circle cx="12" cy="12" r=".9" fill="currentColor" stroke="none"/>',
        half: '<circle cx="12" cy="12" r="8.6"/><path d="M12 3.4a8.6 8.6 0 0 1 0 17.2Z" fill="currentColor" stroke="none"/>',
        circle: '<circle cx="12" cy="12" r="8.6"/>',
        diamond: '<path d="M12 3.6 20.4 12 12 20.4 3.6 12Z"/>',
        dot: '<circle cx="12" cy="12" r="4.6" fill="currentColor" stroke="none"/>',

        // ---- compare dims ----
        flame: '<path d="M12 2.6c1.6 4.6 6 6.2 6 11a6 6 0 0 1-12 0c0-3.6 2.8-4.8 3.7-7.8 1.4 1.2 1.8 2.4 1.8 3.5 1.3-1.3.8-4.2.5-6.7Z"/>',
        shield: '<path d="M12 2.9 20 5.6v5.5c0 4.9-3.4 8.3-8 10-4.6-1.7-8-5.1-8-10V5.6Z"/><path d="M8.8 11.7 11.2 14l4.2-4.6"/>',
        bubble: '<path d="M4.4 5.4h15.2a1.6 1.6 0 0 1 1.6 1.6v7.8a1.6 1.6 0 0 1-1.6 1.6h-8.4L6.8 20.6v-4.2H4.4A1.6 1.6 0 0 1 2.8 14.8V7a1.6 1.6 0 0 1 1.6-1.6Z"/>',
        hourglass: '<path d="M6.6 3h10.8M6.6 21h10.8"/><path d="M8 3v3.2c0 2.9 4 3.9 4 5.8 0 1.9-4 2.9-4 5.8V21"/><path d="M16 3v3.2c0 2.9-4 3.9-4 5.8 0 1.9 4 2.9 4 5.8V21"/>',

        // ---- tones ----
        bolt: '<path d="M13.6 2.4 5.4 13.4h5.4l-1.2 8.2 9-11.2h-5.6Z"/>',
        smile: '<circle cx="12" cy="12" r="9"/><circle cx="8.8" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="15.2" cy="10" r=".9" fill="currentColor" stroke="none"/><path d="M8 14.2c1.1 1.5 2.4 2.2 4 2.2s2.9-.7 4-2.2"/>',

        // ---- planets ----
        venus: '<circle cx="12" cy="8.6" r="5"/><path d="M12 13.6v7.6M8.6 17.9h6.8"/>',
        moon: '<path d="M20 13.9A8.6 8.6 0 1 1 10.1 4a6.9 6.9 0 0 0 9.9 9.9Z"/>',
        mercury: '<circle cx="12" cy="10" r="4.2"/><path d="M8.3 4.1a4.5 4.5 0 0 1 7.4 0"/><path d="M12 14.2v7M9 17.9h6"/>',
        mars: '<circle cx="10.1" cy="13.9" r="5.2"/><path d="M13.9 10.1 20.4 3.6M15.2 3.6h5.2v5.2"/>',
        sun: '<circle cx="12" cy="12" r="4.8"/><path d="M12 1.9v2.4M12 19.7v2.4M1.9 12h2.4M19.7 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7"/>',
        jupiter: '<path d="M7.4 6.4c.9-1.4 2.2-2.2 3.6-2.2 2.3 0 3.6 1.5 3.6 3.3 0 2.3-1.9 4-5.2 6.4L5.6 17h13.2"/><path d="M15.8 4.2V14"/>',
        saturn: '<circle cx="10.6" cy="13" r="5"/><path d="M4.8 8.6c4.4-2.6 13 3.2 14.6 8.6"/>',
        uranus: '<circle cx="12" cy="14.2" r="4.6"/><path d="M12 9.6V3.4"/><circle cx="12" cy="2.4" r="1.1"/>',
        neptune: '<path d="M6 4.6c0 0 1.6 2.6 6 2.6s6-2.6 6-2.6"/><path d="M12 7.2v13.2M8.8 17.2h6.4"/><path d="M6.8 4.2v3M17.2 4.2v3"/>',
        pluto: '<circle cx="10.4" cy="10" r="4.4"/><path d="M10.4 5.6h4.2c2.2 0 3.4 1.6 3.4 3.6s-1.2 3.6-3.4 3.6h-4.2"/><path d="M10.4 14.4v6.2M7.6 17.6h5.6"/>',
        ascArrow: '<path d="M2.8 20.6h18.4"/><path d="M5.2 16.8 14.4 6.6"/><path d="M9.4 6.4h5.4v5.2"/>',
        house: '<path d="M3.6 10.8 12 4.4l8.4 6.4v9.6H3.6Z"/><path d="M9.8 20.4v-6h4.4v6"/>',

        arrowR: '<path d="M3.6 12h16.2"/><path d="M14 6.2 19.8 12 14 17.8"/>',
        arrowL: '<path d="M20.4 12H4.2"/><path d="M10 6.2 4.2 12 10 17.8"/>',

        // ---- elements ----
        droplet: '<path d="M12 2.8c3.6 4.4 6.4 7.7 6.4 11.1a6.4 6.4 0 0 1-12.8 0c0-3.4 2.8-6.7 6.4-11.1Z"/>',
        leaf: '<path d="M4 20c0-9 5-15.4 16-16-.6 11-7 16-16 16Z"/><path d="M4 20 13 11"/>',
        wind: '<path d="M3 9h11.2a2.6 2.6 0 1 0-2.6-2.6"/><path d="M3 13.6h15.4a2.8 2.8 0 1 1-2.8 2.8"/><path d="M3 18h7"/>',

        // ---- library / misc ----
        book: '<path d="M4 4.4h5.4A2.6 2.6 0 0 1 12 7v13.4a2.4 2.4 0 0 0-2.4-1.8H4Z"/><path d="M20 4.4h-5.4A2.6 2.6 0 0 0 12 7v13.4a2.4 2.4 0 0 1 2.4-1.8H20Z"/>',
        arrowsLR: '<path d="M3.8 8.6h14"/><path d="M14 4.8l3.8 3.8-3.8 3.8"/><path d="M20.2 15.4h-14"/><path d="M10 11.6l-3.8 3.8 3.8 3.8"/>',
        clipboard: '<rect x="5.4" y="4.6" width="13.2" height="16" rx="2"/><path d="M9.2 4.6V3.2h5.6v1.4"/><path d="M8.6 10.2h6.8M8.6 13.8h6.8M8.6 17.2h4.4"/>'
    };

    function LBIcon(name, attrs) {
        var p = P[name];
        if (!p) return '';
        return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ' +
            'aria-hidden="true"' + (attrs ? ' ' + attrs : '') + '>' + p + '</svg>';
    }

    global.LBIcons = P;
    global.LBIcon = LBIcon;
    if (typeof module !== 'undefined' && module.exports) module.exports = { LBIcons: P, LBIcon: LBIcon };
})(typeof window !== 'undefined' ? window : globalThis);
