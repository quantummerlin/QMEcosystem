// ============================================================
// A MOMENT IN TIME — THEMED BOOK GENERATOR
// ============================================================
// Generates beautiful themed HTML books from reading data.
// 11 design templates + A4/A5 paper size support.
// Open the downloaded HTML in Chrome → Print → Save as PDF.
// Premium feature — $50 lifetime access via Etsy.
// ============================================================

// ─── ACCESS GATE ─────────────────────────────────────────────

const SB_BOOK_ACCESS_KEY = 'sb-book-access';
const SB_UNLOCK_CODE = 'SOUL50BOOK';

// Check URL for unlock parameter on load
(function checkUnlockParam() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('unlock');
    if (code === SB_UNLOCK_CODE) {
        localStorage.setItem(SB_BOOK_ACCESS_KEY, 'lifetime');
        if (typeof sbTrack === 'function') sbTrack('book_access_unlocked', { method: 'url_code' });
        // Clean the URL so the code isn't visible/shareable
        const clean = new URL(window.location);
        clean.searchParams.delete('unlock');
        window.history.replaceState({}, '', clean);
    }
})();

function hasBookAccess() {
    return localStorage.getItem(SB_BOOK_ACCESS_KEY) === 'lifetime';
}

function showUpgradeModal() {
    if (typeof sbTrack === 'function') sbTrack('book_upgrade_shown');

    const existing = document.getElementById('bookUpgradeOverlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'bookUpgradeOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(10,5,20,0.92);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(12px);padding:16px;overflow-y:auto;';

    overlay.innerHTML = `
    <div style="background:linear-gradient(145deg,#1e1035,#12082a);border:1.5px solid rgba(255,215,0,0.25);border-radius:24px;padding:32px 28px;max-width:520px;width:100%;color:#e8d5ff;font-family:'Inter','Segoe UI',system-ui,sans-serif;position:relative;text-align:center;">
        <button onclick="document.getElementById('bookUpgradeOverlay').remove()" style="position:absolute;top:12px;right:16px;background:none;border:none;color:#c9a0ff;font-size:1.4rem;cursor:pointer;opacity:0.7;" aria-label="Close">&times;</button>

        <div style="font-size:2.2rem;margin-bottom:12px;">📖✨</div>
        <h2 style="color:#ffd700;font-size:1.3rem;font-family:'Playfair Display','Georgia',serif;margin:0 0 10px;">Unlock the Book Generator</h2>
        <p style="font-size:0.92rem;line-height:1.6;opacity:0.85;margin-bottom:20px;">Turn any Soul Blueprint reading into a stunning printable keepsake book — choose from <strong>11 premium templates</strong> including Art Deco, Botanical, Celestial Watercolor, and more.</p>

        <div style="background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.2);border-radius:16px;padding:18px;margin-bottom:20px;">
            <div style="font-size:2rem;font-weight:700;color:#ffd700;margin-bottom:4px;">$50</div>
            <div style="font-size:0.82rem;opacity:0.6;">One-time payment · Lifetime access · Unlimited books</div>
        </div>

        <div style="text-align:left;padding:0 8px;margin-bottom:22px;">
            <div style="display:flex;align-items:start;gap:8px;margin-bottom:8px;font-size:0.88rem;">
                <span style="color:#ffd700;flex-shrink:0;">✓</span>
                <span>11 beautifully designed book templates (A4 & A5)</span>
            </div>
            <div style="display:flex;align-items:start;gap:8px;margin-bottom:8px;font-size:0.88rem;">
                <span style="color:#ffd700;flex-shrink:0;">✓</span>
                <span>Generate unlimited books for yourself, friends & family</span>
            </div>
            <div style="display:flex;align-items:start;gap:8px;margin-bottom:8px;font-size:0.88rem;">
                <span style="color:#ffd700;flex-shrink:0;">✓</span>
                <span>Perfect for birthdays, baby showers & personalised gifts</span>
            </div>
            <div style="display:flex;align-items:start;gap:8px;font-size:0.88rem;">
                <span style="color:#ffd700;flex-shrink:0;">✓</span>
                <span>Lifetime access — pay once, create forever</span>
            </div>
        </div>

        <a href="https://www.etsy.com/shop/QuantumMerlin" target="_blank" rel="noopener" onclick="if(typeof sbTrack==='function')sbTrack('book_upgrade_clicked',{source:'modal'});" style="display:inline-block;background:linear-gradient(135deg,#ffd700,#e6ac00);color:#1a0a2e;border:none;padding:14px 40px;border-radius:30px;font-size:1.05rem;font-weight:700;cursor:pointer;text-decoration:none;box-shadow:0 4px 20px rgba(255,215,0,0.3);letter-spacing:0.02em;transition:all 0.2s;">
            Get Lifetime Access →
        </a>
        <p style="font-size:0.72rem;opacity:0.4;margin-top:14px;">Already purchased? <a href="#" onclick="promptUnlockCode();return false;" style="color:#c9a0ff;text-decoration:underline;">Enter your access code</a></p>
    </div>
    `;

    document.body.appendChild(overlay);
}

function promptUnlockCode() {
    const code = prompt('Enter your access code from your Etsy purchase:');
    if (code && code.trim() === SB_UNLOCK_CODE) {
        localStorage.setItem(SB_BOOK_ACCESS_KEY, 'lifetime');
        if (typeof sbTrack === 'function') sbTrack('book_access_unlocked', { method: 'manual_code' });
        document.getElementById('bookUpgradeOverlay')?.remove();
        alert('🎉 Book Generator unlocked! You now have lifetime access.');
        showTemplatePicker();
    } else if (code !== null) {
        alert('That code doesn\'t match. Please check your Etsy purchase confirmation email.');
    }
}

// ─── TEMPLATE CATALOGUE ─────────────────────────────────────

const BOOK_TEMPLATES = [
    {
        id: 'cosmic-classic',
        name: 'Cosmic Classic',
        desc: 'Deep purple & gold — the original signature design',
        icon: '✨',
        colors: ['#1a0a2e', '#2d1b4e', '#ffd700'],
        builtin: true
    },
    {
        id: 'art-deco',
        name: 'Art Deco',
        desc: 'Geometric elegance with gold & black lines',
        icon: '🎭',
        colors: ['#1a2744', '#c9a84c', '#faf6f0']
    },
    {
        id: 'botanical',
        name: 'Botanical',
        desc: 'Natural beauty with sage green watercolors',
        icon: '🌿',
        colors: ['#2d4a3e', '#87a878', '#f5f0e8']
    },
    {
        id: 'celestial-watercolor',
        name: 'Celestial Watercolor',
        desc: 'Soft blues & lilacs — dreamy painted skies',
        icon: '🎨',
        colors: ['#3a4a6b', '#8fa4c8', '#f8f4ff']
    },
    {
        id: 'cosmic-rainbow',
        name: 'Cosmic Rainbow',
        desc: 'Vibrant rainbow gradients on deep space',
        icon: '🌈',
        colors: ['#0f0a1a', '#e94560', '#00d2ff']
    },
    {
        id: 'dark-celestial',
        name: 'Dark Celestial',
        desc: 'Midnight blues & silver — stargazer\'s edition',
        icon: '🌌',
        colors: ['#0a0e1a', '#1a2744', '#c0c8e0']
    },
    {
        id: 'fairy-tale',
        name: 'Fairy Tale',
        desc: 'Enchanted forest — mossy greens & gold leaf',
        icon: '🧚',
        colors: ['#2a1810', '#6b8f5e', '#ffeaa7']
    },
    {
        id: 'heart-bears',
        name: 'Heart Bears',
        desc: 'Sweet pinks & lavender — perfect for little ones',
        icon: '🧸',
        colors: ['#FFB6C1', '#D8BFD8', '#fffbfe']
    },
    {
        id: 'minimalist',
        name: 'Minimalist',
        desc: 'Clean & modern — black, white & touches of blue',
        icon: '◻️',
        colors: ['#1a1a1a', '#4a90d9', '#ffffff']
    },
    {
        id: 'mystical-tarot',
        name: 'Mystical Tarot',
        desc: 'Deep jewel tones — amethyst, ruby & emerald',
        icon: '🔮',
        colors: ['#1a0a2e', '#8B5CF6', '#F59E0B']
    },
    {
        id: 'vintage-storybook',
        name: 'Vintage Storybook',
        desc: 'Warm sepia tones — aged parchment & ink',
        icon: '📜',
        colors: ['#2c1810', '#8b4513', '#f5e6d0']
    }
];

// Divider text per template: empty = CSS ::before handles ornament, text = renders directly
const TEMPLATE_DIVIDERS = {
    'art-deco': '', 'botanical': '', 'celestial-watercolor': '', 'cosmic-rainbow': '',
    'fairy-tale': '', 'mystical-tarot': '', 'vintage-storybook': '',
    'dark-celestial': '· · ✦ · ·', 'heart-bears': '· · ♥ · ·', 'minimalist': '· · · ·'
};

// Image assets per template — loaded at generation time and embedded as base64
const TEMPLATE_IMAGES = {
    'cosmic-classic': {
        cover:   { file: 'Cosmic Classic.jpg',        opacity: 0.40, blend: 'screen' },
        divider: { file: 'Section Divider.jpg',       height: '8mm' },
    },
    'art-deco': {
        divider: { file: 'Art Deco.jpg',               height: '12mm' },
    },
    'botanical': {
        cover:   { file: 'Botannical.jpg',             opacity: 0.15, blend: 'multiply' },
    },
    'celestial-watercolor': {
        cover:   { file: 'Celestial Watercolour.jpg',   opacity: 0.30, blend: 'soft-light' },
    },
    'cosmic-rainbow': {
        cover:   { file: 'Cosmic Rainbow.jpg',          opacity: 0.50, blend: 'screen' },
    },
    'dark-celestial': {
        cover:   { file: 'Dark Celestial.jpg',          opacity: 0.30, blend: 'screen' },
        divider: { file: 'Section Divider 2.jpg',      height: '8mm' },
    },
    'fairy-tale': {
        cover:   { file: 'Fairy Tale.jpg',              opacity: 0.30, blend: 'screen' },
    },
    'heart-bears': {
        cover:   { file: 'Heart Bears.jpg',             opacity: 0.30, blend: 'soft-light' },
        divider: { file: 'Heart Bears Devider.jpg',     height: '6mm' },
    },
    'minimalist': {
        cover:   { file: 'Minimalist.jpg',              opacity: 0.50, blend: 'multiply' },
    },
    'mystical-tarot': {
        cover:   { file: 'Mystical Tarot.jpg',          opacity: 0.25, blend: 'screen' },
        divider: { file: 'Tarot Divider.jpg',           height: '8mm' },
        opener:  { file: 'Tarot Opener.jpg',            opacity: 0.12, blend: 'screen' },
    },
    'vintage-storybook': {
        cover:   { file: 'Vintage Storybook.jpg',       opacity: 0.20, blend: 'multiply' },
    },
};


// ─── SHARED PARTIALS (identical across all themed templates) ──

const PARTIALS = {
    chapter: `<div class="page chapter-opener">
    <div class="constellation-bg"></div>
    <div class="chapter-num">{{chapterNumber}}</div>
    <div class="chapter-icon">{{chapterIcon}}</div>
    <h2 class="chapter-title">{{chapterTitle}}</h2>
    <p class="chapter-desc">{{chapterDesc}}</p>
    <div class="chapter-ornament">· · ♥ · ·</div>
</div>
{{readings}}`,

    reading: `<div class="reading">
    <div class="reading-header">
        <span class="r-title">{{title}}</span>
        <span class="r-value">{{value}}</span>
    </div>
    <div class="reading-body">{{bodyHTML}}</div>
    <div class="kw-row">{{keywords}}</div>
    <div class="sc-grid"><div class="sc-col"><h5 class="sc-gifts">✦ Gifts</h5><ul>{{gifts}}</ul></div></div>
</div>
<div class="heart-divider">· · ♥ · ·</div>`,

    snapshotItem: `<div class="snap-item"><span class="snap-planet">{{planet}}</span><span class="snap-sign">{{sign}}</span></div>`,

    tocEntry: `<div class="toc-entry">{{entry}}</div>`,

    tocSection: `<div class="toc-section"><div class="toc-section-name">{{sectionName}}</div>{{entries}}</div>`
};


// ─── BROWSER TEMPLATE ENGINE ─────────────────────────────────

class BookTemplateEngine {

    replaceSimple(template, data) {
        let result = template;
        for (const [key, value] of Object.entries(data)) {
            result = result.split(`{{${key}}}`).join(value != null ? value : '');
        }
        return result;
    }

    renderItem(item, template) {
        let result = template;
        for (const [key, value] of Object.entries(item)) {
            result = result.split(`{{${key}}}`).join(this.valueToHTML(value, key));
        }
        return result;
    }

    // Keys that carry pre-built HTML and must NOT be escaped
    static HTML_PASSTHROUGH = new Set([
        'readings', 'entries', 'snapshot',
        'bodyHTML', 'closingBodyHTML', 'colophonText',
        'dedication', 'details'
    ]);

    valueToHTML(value, key) {
        if (value === null || value === undefined) return '';
        if (Array.isArray(value)) {
            if (key === 'keywords') return value.map(v => `<span class="kw">${this.esc(String(v))}</span>`).join('');
            if (key === 'gifts' || key === 'growthAreas') return value.map(v => `<li>${this.esc(String(v))}</li>`).join('');
            return value.map(v => this.valueToHTML(v, key)).join('<br>');
        }
        if (key.includes('HTML') || BookTemplateEngine.HTML_PASSTHROUGH.has(key)) return value;
        return this.esc(String(value));
    }

    esc(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    replaceConditionals(template, data) {
        let result = template;
        for (const key of Object.keys(data)) {
            const hasValue = data[key] !== null && data[key] !== undefined && data[key] !== '';
            result = result.replace(new RegExp(`{{if:${key}}}([\\s\\S]*?){{endif:${key}}}`, 'g'), hasValue ? '$1' : '');
            result = result.replace(new RegExp(`{{unless:${key}}}([\\s\\S]*?){{endunless:${key}}}`, 'g'), hasValue ? '' : '$1');
        }
        result = result.replace(/{{(?:if|unless):[^}]+}}[\s\S]*?{{end(?:if|unless):[^}]+}}/g, '');
        return result;
    }

    /**
     * Build reading HTML with conditional keywords, gifts & growth areas.
     * Omits empty sections. No trailing divider after last reading.
     */
    buildReadingHTML(reading, dividerText, isLast) {
        let h = '<div class="reading" style="page-break-inside:avoid;break-inside:avoid;">';
        h += '<div class="reading-header">';
        h += `<span class="r-title">${this.esc(reading.title || '')}</span>`;
        if (reading.value) h += `<span class="r-value">${this.esc(reading.value)}</span>`;
        h += '</div>';
        if (reading.bodyHTML) h += `<div class="reading-body">${reading.bodyHTML}</div>`;
        const kw = reading.keywords;
        if (kw && kw.length) {
            h += `<div class="kw-row">${kw.map(k => `<span class="kw">${this.esc(k)}</span>`).join('')}</div>`;
        }
        const hasGifts = reading.gifts && reading.gifts.length > 0;
        const hasGrowth = reading.growthAreas && reading.growthAreas.length > 0;
        if (hasGifts || hasGrowth) {
            h += '<div class="sc-grid">';
            if (hasGifts) h += `<div class="sc-col"><h5 class="sc-gifts">✦ Gifts</h5><ul>${reading.gifts.map(g => `<li>${this.esc(g)}</li>`).join('')}</ul></div>`;
            if (hasGrowth) h += `<div class="sc-col"><h5 class="sc-growth">◇ Growth Areas</h5><ul>${reading.growthAreas.map(g => `<li>${this.esc(g)}</li>`).join('')}</ul></div>`;
            h += '</div>';
        }
        h += '</div>';
        if (!isLast) h += `<div class="heart-divider">${dividerText}</div>`;
        return h;
    }

    fillTemplate(template, bookData, dividerText = '· · ✦ · ·') {
        let result = template;

        // ── Meta placeholders ──
        const meta = {
            title: bookData.meta?.title || '',
            subtitle: bookData.meta?.subtitle || '',
            name: bookData.meta?.name || '',
            details: (bookData.meta?.details || []).join('<br>'),
            brand: bookData.meta?.brand || '',
            halfTitleName: bookData.meta?.halfTitleName || '',
            epigraphQuote: bookData.meta?.epigraphQuote || '',
            epigraphAttr: bookData.meta?.epigraphAttr || '',
            dedication: bookData.meta?.dedication || '',
        };
        result = this.replaceSimple(result, meta);

        // ── Snapshot ──
        if (bookData.snapshot) {
            const snapshotItems = bookData.snapshot.categories.map(cat => {
                const itemsHTML = cat.items.map(item =>
                    this.renderItem(item, PARTIALS.snapshotItem)
                ).join('');
                return `<div class="snap-cat"><div class="snap-cat-title">${cat.title}</div>${itemsHTML}</div>`;
            }).join('');
            result = result.split('{{snapshot}}').join(snapshotItems);
        }

        // ── Table of Contents ──
        if (bookData.toc) {
            const tocHTML = bookData.toc.map(section => {
                const entriesHTML = section.entries.map(entry =>
                    this.renderItem({ entry }, PARTIALS.tocEntry)
                ).join('');
                return this.renderItem({
                    sectionName: section.name,
                    entries: entriesHTML
                }, PARTIALS.tocSection);
            }).join('');
            result = result.split('{{toc}}').join(tocHTML);
        }

        // ── Chapters ──
        if (bookData.chapters) {
            const chaptersHTML = bookData.chapters.map(chapter => {
                const readingsHTML = chapter.readings.map((reading, ri, arr) =>
                    this.buildReadingHTML(reading, dividerText, ri === arr.length - 1)
                ).join('\n');
                return this.renderItem({
                    chapterNumber: chapter.number,
                    chapterIcon: chapter.icon,
                    chapterTitle: chapter.title,
                    chapterDesc: chapter.description || '',
                    readings: readingsHTML,
                }, PARTIALS.chapter);
            }).join('');
            result = result.split('{{chapters}}').join(chaptersHTML);
        }

        // ── Closing ──
        if (bookData.closing) {
            result = this.replaceSimple(result, {
                closingTitle: bookData.closing.title || '',
                closingBodyHTML: bookData.closing.bodyHTML || '',
                closingQuote: bookData.closing.quote || '',
                closingQuoteAttr: bookData.closing.quoteAttr || '',
            });
        }

        // ── Colophon ──
        if (bookData.colophon) {
            result = this.replaceSimple(result, {
                colophonBrand: bookData.colophon.brand || '',
                colophonText: (bookData.colophon.text || '').replace(/\n/g, '<br>'),
                colophonURL: bookData.colophon.url || '',
            });
        }

        result = this.replaceConditionals(result, meta);
        return result;
    }
}


// ─── DATA COLLECTION ─────────────────────────────────────────

function collectBookData() {
    const userData = window.lastUserData || JSON.parse(localStorage.getItem('lastReading') || '{}');
    const readings = window.lastGeneratedReadings;

    if (!userData.name || !readings) return null;

    const astro = readings.astrology;
    const numr = readings.numerology;
    const name = userData.name;
    const birthDate = new Date(userData.birthDate).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // ── Meta ──
    const meta = {
        title: 'A Moment in Time',
        subtitle: 'A Complete Cosmic Portrait',
        name: name,
        details: [birthDate, userData.birthTime || '', userData.birthPlace || ''].filter(Boolean),
        brand: 'Quantum Merlin',
        halfTitleName: `\u2014 ${name} \u2014`,
        epigraphQuote: '\u201CThe cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.\u201D',
        epigraphAttr: '\u2014 Carl Sagan',
        dedication: `This reading is dedicated to ${name} \u2014\na soul whose cosmic pattern has never existed before\nand will never exist again.`
    };

    // ── Cosmic Snapshot ──
    const safe = (obj, prop) => (obj && obj[prop]) ? obj[prop] : '\u2014';
    const snapshot = {
        categories: [
            {
                title: 'The Big Three',
                items: [
                    { planet: '\u2609 Sun', sign: safe(astro.sunSign, 'name') },
                    { planet: '\u263D Moon', sign: safe(astro.moonSign, 'name') },
                    { planet: '\u2191 Rising', sign: astro.risingSign ? astro.risingSign.name : '\u2014' }
                ]
            },
            {
                title: 'Personal Planets',
                items: [
                    { planet: '\u263F Mercury', sign: safe(astro.mercurySign, 'name') },
                    { planet: '\u2640 Venus', sign: safe(astro.venusSign, 'name') },
                    { planet: '\u2642 Mars', sign: safe(astro.marsSign, 'name') }
                ]
            },
            {
                title: 'Social Planets',
                items: [
                    { planet: '\u2643 Jupiter', sign: safe(astro.jupiterSign, 'name') },
                    { planet: '\u2644 Saturn', sign: safe(astro.saturnSign, 'name') }
                ]
            },
            {
                title: 'Outer Planets',
                items: [
                    { planet: '\u2645 Uranus', sign: astro.uranusSign ? astro.uranusSign.name : '\u2014' },
                    { planet: '\u2646 Neptune', sign: astro.neptuneSign ? astro.neptuneSign.name : '\u2014' },
                    { planet: '\u2647 Pluto', sign: astro.plutoSign ? astro.plutoSign.name : '\u2014' }
                ]
            },
            {
                title: 'Soul & Destiny',
                items: [
                    { planet: '\u260A North Node', sign: astro.northNode ? astro.northNode.name : '\u2014' },
                    { planet: '\uD83C\uDF19 Moon Phase', sign: astro.moonPhase ? astro.moonPhase.name : '\u2014' },
                    { planet: '\uD83D\uDC09 Chinese Zodiac', sign: astro.chineseZodiac ? astro.chineseZodiac.animal : '\u2014' },
                    { planet: '\uD83D\uDD22 Life Path', sign: String(numr.lifePath || '\u2014') },
                    { planet: '\u2728 Destiny', sign: String(numr.destiny || '\u2014') },
                    { planet: '\uD83D\uDC9C Soul Urge', sign: String(numr.soulUrge || '\u2014') }
                ]
            }
        ]
    };

    // ── Chapters & TOC from DOM ──
    const sections = collectReadingSections();

    const chapters = sections.map((section, idx) => ({
        number: `Chapter ${romanNumeral(idx + 1)}`,
        icon: section.icon,
        title: section.name,
        description: section.description,
        readings: section.cards.map(card => ({
            title: card.title,
            value: card.resultValue,
            icon: card.icon,
            bodyHTML: card.content,
            bodyText: card.content ? card.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '',
            keywords: card.keywords,
            gifts: card.strengths,
            growthAreas: card.challenges
        }))
    }));

    const toc = sections.map(section => ({
        name: `${section.icon} ${section.name}`,
        entries: section.cards.map(card =>
            card.resultValue ? `${card.title} \u2014 ${card.resultValue}` : card.title
        )
    }));

    // ── Closing ──
    const closing = {
        title: 'The Story Continues',
        bodyHTML: `<p>You have just explored ${_escHtml(name)}\u2019s complete moment in time \u2014 a unique constellation of energies that has never existed before and will never exist again.</p><p>With a ${_escHtml(safe(astro.sunSign, 'name'))} Sun illuminating the core identity, a ${_escHtml(safe(astro.moonSign, 'name'))} Moon nurturing the emotional world, and Life Path ${numr.lifePath || '\u2014'} guiding the soul\u2019s journey, ${_escHtml(name)} carries a sacred combination of gifts.</p><p>Return to these pages whenever you need a reminder of who you truly are beneath all the roles you play.</p>`,
        quote: `\u201CEvery soul arrives with a purpose. ${name}\u2019s purpose is written in the stars.\u201D`,
        quoteAttr: '\u2014 A Moment in Time'
    };

    // ── Colophon ──
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const colophon = {
        brand: 'Quantum Merlin',
        text: `A Moment in Time \u2014 A Complete Cosmic Portrait for ${name}\n\nGenerated on ${today}\nreadings.quantummerlin.com\n\nFor entertainment and spiritual reflection purposes.\nEvery person is unique and will grow in their own beautiful way.\n\n\u00A9 ${new Date().getFullYear()} Quantum Merlin. All rights reserved.`,
        url: 'readings.quantummerlin.com'
    };

    return { meta, snapshot, toc, chapters, closing, colophon };
}


// ─── DOM SECTION SCRAPER ─────────────────────────────────────

function collectReadingSections() {
    const sections = [];
    const domSections = document.querySelectorAll('#readingsContainer .reading-section');

    domSections.forEach((section, sIdx) => {
        const header = section.querySelector('.section-header');
        let sectionName = `Section ${sIdx + 1}`;
        if (header) {
            const hEl = header.querySelector('h2') || header.querySelector('h3');
            if (hEl) {
                const hClone = hEl.cloneNode(true);
                hClone.querySelectorAll('.section-reading-count').forEach(el => el.remove());
                sectionName = hClone.textContent.trim() || sectionName;
            }
        }
        const sectionIcon = header ? (header.querySelector('.section-icon')?.textContent || '') : '';
        const sectionDesc = header ? (header.querySelector('.section-description')?.textContent || header.querySelector('p')?.textContent || '') : '';

        const cards = [];

        section.querySelectorAll('.reading-card').forEach(card => {
            const title = card.querySelector('h3')?.textContent || '';
            const resultValue = card.querySelector('.result-value')?.textContent || '';
            const icon = card.querySelector('.card-icon')?.textContent?.trim() || '';

            const contentEl = card.querySelector('.reading-content')
                || card.querySelector('.reading-card-content')
                || card.querySelector('.reading-card-body');
            let content = '';
            if (contentEl) {
                const clone = contentEl.cloneNode(true);
                clone.querySelectorAll('.mark-read-btn, .read-badge, .expand-icon, button, script, .keyword-tag, .keywords, .strengths-challenges').forEach(el => el.remove());
                content = clone.innerHTML.trim();
            }

            const keywords = [];
            card.querySelectorAll('.keyword-tag, .keyword').forEach(kw => {
                const t = kw.textContent.trim();
                if (t) keywords.push(t);
            });

            let strengths = [], challenges = [];
            const sc = card.querySelector('.strengths-challenges');
            if (sc) {
                sc.querySelectorAll('.strengths li').forEach(li => strengths.push(li.textContent.trim()));
                sc.querySelectorAll('.challenges li').forEach(li => challenges.push(li.textContent.trim()));
            }

            if (title && (content || resultValue)) {
                cards.push({ title, resultValue, icon, content, keywords, strengths, challenges });
            }
        });

        section.querySelectorAll('.sub-section').forEach(sub => {
            const subTitle = sub.querySelector('.sub-section-header h4')?.textContent
                || sub.querySelector('.sub-section-header h3')?.textContent || '';
            const subBody = sub.querySelector('.sub-section-body');
            if (subBody && subTitle) {
                const clone = subBody.cloneNode(true);
                clone.querySelectorAll('button, script, .sub-section-arrow').forEach(el => el.remove());
                const subContent = clone.innerHTML.trim();
                if (subContent) {
                    cards.push({ title: subTitle, resultValue: '', icon: '', content: subContent, keywords: [], strengths: [], challenges: [] });
                }
            }
        });

        if (cards.length > 0) {
            sections.push({ name: sectionName.trim(), icon: sectionIcon.trim(), description: sectionDesc.trim(), cards });
        }
    });

    return sections;
}


// ─── QUALITY CSS (injected into all themed templates) ────────

const QUALITY_CSS = `
/* Quality enhancements — injected by book generator */
.reading { page-break-inside: avoid; break-inside: avoid; }
.sc-col .sc-growth { color: #c62828; font-size: inherit; margin-bottom: 1mm; }
.kw-row:empty { display: none; }
.sc-grid:empty { display: none; }
.chapter-desc:empty { display: none; }
`;


// ─── PAPER SIZE A4 CSS OVERRIDE ──────────────────────────────

const A4_OVERRIDE_CSS = `
/* ── A4 Paper Size Override ── */
@page { size: A4 !important; margin: 20mm 18mm 24mm 18mm !important; }
.page {
    width: 210mm !important;
    min-height: 297mm !important;
    padding: 20mm 18mm 24mm 18mm !important;
}
body { font-size: 11pt !important; line-height: 1.75 !important; }
.cover, .half-title, .epigraph, .chapter-opener, .closing, .colophon {
    min-height: 297mm !important;
}
.cover h1, .cover-title { font-size: 32pt !important; }
.cover .subtitle, .cover-subtitle { font-size: 12pt !important; }
.cover-name, .cover .cover-name { font-size: 22pt !important; }
.half-title h1 { font-size: 22pt !important; }
h2, .chapter-title { font-size: 20pt !important; }
h3 { font-size: 14pt !important; }
.snapshot-title, .toc-title { font-size: 16pt !important; }
.r-title { font-size: 12pt !important; }
.r-value { font-size: 11pt !important; }
.reading-body { font-size: 10.5pt !important; }
.kw { font-size: 8.5pt !important; }
.snap-item { font-size: 9.5pt !important; }
.toc-entry { font-size: 9.5pt !important; }
.toc-section-name { font-size: 11pt !important; }
.snap-cat-title { font-size: 9.5pt !important; }
.closing-body { font-size: 10.5pt !important; max-width: 140mm !important; }
.closing-quote { font-size: 11pt !important; }
.colophon-text { font-size: 9.5pt !important; }
.sc-grid { font-size: 9.5pt !important; }
.sc-col li { font-size: 9pt !important; }
.chapter-desc { font-size: 10.5pt !important; max-width: 130mm !important; }
.epigraph blockquote { font-size: 12pt !important; max-width: 130mm !important; }
.cover-details { font-size: 10pt !important; }
@media screen {
    .book { max-width: 210mm !important; }
}
`;


// ─── A4 OVERRIDE FOR COSMIC CLASSIC ─────────────────────────

const A4_COSMIC_OVERRIDE = `
@page { size: A4 !important; margin: 20mm 18mm 24mm 18mm !important; }
@page :left  { margin-left: 18mm !important; margin-right: 20mm !important; }
@page :right { margin-left: 20mm !important; margin-right: 18mm !important; }
.page {
    padding: 20mm 18mm 24mm 20mm !important;
    min-height: 297mm !important;
}
html { font-size: 11pt !important; }
.cover-title { font-size: 28pt !important; }
.cover-name { font-size: 22pt !important; }
.cover-subtitle { font-size: 12pt !important; }
.half-title h1 { font-size: 22pt !important; }
.chapter-title { font-size: 20pt !important; }
.snapshot-title, .toc-title { font-size: 16pt !important; }
.r-title { font-size: 12pt !important; }
.r-value { font-size: 11pt !important; }
.reading-body { font-size: 10.5pt !important; }
.snap-item { font-size: 9.5pt !important; }
.toc-entry { font-size: 9.5pt !important; }
.closing-body { font-size: 10.5pt !important; max-width: 140mm !important; }
.closing-quote { font-size: 11pt !important; }
.colophon-text { font-size: 9pt !important; }
.epigraph blockquote { font-size: 12pt !important; max-width: 130mm !important; }
@media screen {
    body { padding-top: 56px; }
    .book { max-width: 210mm !important; margin: 20px auto 60px !important; }
}
`;


// ─── IMAGE LOADING & INJECTION (base64 embed) ───────────────

async function _loadImageB64(filename) {
    try {
        const r = await fetch(encodeURI(filename));
        if (!r.ok) return null;
        const blob = await r.blob();
        return new Promise(res => {
            const fr = new FileReader();
            fr.onloadend = () => res(fr.result);
            fr.onerror = () => res(null);
            fr.readAsDataURL(blob);
        });
    } catch (_) { return null; }
}

async function _loadTemplateImages(templateId) {
    const cfg = TEMPLATE_IMAGES[templateId];
    if (!cfg) return {};
    const map = {};
    await Promise.all(Object.entries(cfg).map(async ([role, info]) => {
        const uri = await _loadImageB64(info.file);
        if (uri) map[role] = { ...info, uri };
    }));
    return map;
}

function _buildImageCSS(im, isBuiltin) {
    let c = '\n/* ── Image Enhancements ── */\n';
    c += '.cover{position:relative!important;overflow:hidden!important}\n';

    if (im.cover) {
        c += `.cover-img-layer{
  position:absolute;inset:0;z-index:0;pointer-events:none;
  background:url("${im.cover.uri}") center/cover no-repeat;
  opacity:${im.cover.opacity||.3};
  mix-blend-mode:${im.cover.blend||'screen'};
}\n`;
    }

    if (im.divider) {
        const s = isBuiltin ? '.section-sep' : '.heart-divider';
        c += `${s}{
  background:url("${im.divider.uri}") center/contain no-repeat!important;
  height:${im.divider.height||'8mm'}!important;min-height:${im.divider.height||'8mm'};
  font-size:0!important;color:transparent!important;
  border:none!important;margin:4mm auto!important;max-width:85%;
}
${s}::before,${s}::after{display:none!important;content:none!important}\n`;
    }

    if (im.opener) {
        c += `.chapter-opener{position:relative!important;overflow:hidden!important}
.chapter-opener>*{position:relative;z-index:1}
.chapter-opener-img{
  position:absolute;inset:0;z-index:0;pointer-events:none;
  background:url("${im.opener.uri}") center bottom/80% auto no-repeat;
  opacity:${im.opener.opacity||.15};
  mix-blend-mode:${im.opener.blend||'screen'};
}\n`;
    }

    return c;
}

function _injectImages(html, im, isBuiltin) {
    if (!im || !Object.keys(im).length) return html;
    html = html.replace('</style>', _buildImageCSS(im, isBuiltin) + '</style>');
    if (im.cover)  html = html.replace(/(<div[^>]*class="[^"]*\bcover\b[^"]*"[^>]*>)/, '$1<div class="cover-img-layer"></div>');
    if (im.opener) html = html.replace(/(<div[^>]*class="[^"]*\bchapter-opener\b[^"]*"[^>]*>)/g, '$1<div class="chapter-opener-img"></div>');
    return html;
}


// ─── TEMPLATE PICKER UI ──────────────────────────────────────

let _selectedTemplate = 'cosmic-classic';
let _selectedPaperSize = 'A5';

function showTemplatePicker() {
    // Access gate — check if user has lifetime access
    if (!hasBookAccess()) {
        showUpgradeModal();
        return;
    }
    if (typeof sbTrack === 'function') sbTrack('book_creation_started');
    const userData = window.lastUserData || JSON.parse(localStorage.getItem('lastReading') || '{}');
    const readings = window.lastGeneratedReadings;
    if (!userData.name || !readings) {
        alert('Please generate a reading first before exporting.');
        return;
    }

    // Reset selection
    _selectedTemplate = 'cosmic-classic';
    _selectedPaperSize = 'A5';

    const overlay = document.createElement('div');
    overlay.id = 'templatePickerOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(10,5,20,0.92);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(12px);padding:16px;overflow-y:auto;';

    overlay.innerHTML = `
    <div style="background:linear-gradient(145deg,#1e1035,#12082a);border:1.5px solid rgba(255,215,0,0.25);border-radius:24px;padding:28px 24px 24px;max-width:680px;width:100%;max-height:92vh;overflow-y:auto;color:#e8d5ff;font-family:'Inter','Segoe UI',system-ui,sans-serif;position:relative;">
        <!-- Close button -->
        <button onclick="document.getElementById('templatePickerOverlay').remove()" style="position:absolute;top:12px;right:16px;background:none;border:none;color:#c9a0ff;font-size:1.4rem;cursor:pointer;opacity:0.7;" aria-label="Close">&times;</button>

        <!-- Header -->
        <div style="text-align:center;margin-bottom:20px;">
            <div style="font-size:1.6rem;margin-bottom:6px;">📖✨</div>
            <h2 style="color:#ffd700;font-size:1.25rem;font-family:'Playfair Display','Georgia',serif;margin:0 0 6px;">Choose Your Book Design</h2>
            <p style="font-size:0.82rem;opacity:0.65;margin:0;">Select a theme and paper size for ${_escHtml(userData.name)}'s cosmic book</p>
        </div>

        <!-- Paper Size Toggle -->
        <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;">
            <button class="paper-btn paper-btn-active" data-size="A5" onclick="selectPaperSize('A5',this)" style="background:rgba(255,215,0,0.15);border:1.5px solid #ffd700;color:#ffd700;padding:8px 20px;border-radius:20px;font-size:0.85rem;font-weight:600;cursor:pointer;transition:all 0.2s;">
                A5 Paperback <span style="font-size:0.7rem;opacity:0.7;display:block;">148 × 210 mm</span>
            </button>
            <button class="paper-btn" data-size="A4" onclick="selectPaperSize('A4',this)" style="background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.2);color:#c9a0ff;padding:8px 20px;border-radius:20px;font-size:0.85rem;font-weight:600;cursor:pointer;transition:all 0.2s;">
                A4 Full Size <span style="font-size:0.7rem;opacity:0.7;display:block;">210 × 297 mm</span>
            </button>
        </div>

        <!-- Template Grid -->
        <div id="templateGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-bottom:20px;">
            ${BOOK_TEMPLATES.map((t, i) => `
                <div class="tpl-card${i === 0 ? ' tpl-selected' : ''}" data-id="${t.id}" onclick="selectTemplate('${t.id}',this)" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(255,215,0,0.12)'" onmouseout="this.style.transform='';this.style.boxShadow=''" style="border-radius:14px;overflow:hidden;cursor:pointer;border:2px solid ${i === 0 ? '#ffd700' : 'rgba(255,255,255,0.1)'};transition:all 0.25s;background:rgba(255,255,255,0.03);">
                    <div style="height:48px;background:linear-gradient(135deg,${t.colors[0]},${t.colors[1]},${t.colors[2]});display:flex;align-items:center;justify-content:center;">
                        <span style="font-size:1.4rem;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.4));">${t.icon}</span>
                    </div>
                    <div style="padding:8px 10px;">
                        <div style="font-size:0.82rem;font-weight:600;color:#fff;margin-bottom:2px;">${t.name}</div>
                        <div style="font-size:0.68rem;color:#b8a0d0;line-height:1.3;">${t.desc}</div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Generate Button -->
        <div style="text-align:center;">
            <button id="generateBookBtn" onclick="generateBook()" style="background:linear-gradient(135deg,#ffd700,#e6ac00);color:#1a0a2e;border:none;padding:14px 40px;border-radius:30px;font-size:1.05rem;font-weight:700;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 20px rgba(255,215,0,0.3);letter-spacing:0.02em;">
                ✨ Generate Book
            </button>
            <p style="font-size:0.72rem;opacity:0.45;margin-top:10px;">Downloads an HTML file — open in Chrome → Print → Save as PDF</p>
        </div>
    </div>
    `;

    document.body.appendChild(overlay);
}

function selectTemplate(id, el) {
    _selectedTemplate = id;
    document.querySelectorAll('#templateGrid .tpl-card').forEach(card => {
        card.style.borderColor = card.dataset.id === id ? '#ffd700' : 'rgba(255,255,255,0.1)';
        card.classList.toggle('tpl-selected', card.dataset.id === id);
    });
}

function selectPaperSize(size, el) {
    _selectedPaperSize = size;
    document.querySelectorAll('.paper-btn').forEach(btn => {
        const isActive = btn.dataset.size === size;
        btn.style.background = isActive ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)';
        btn.style.borderColor = isActive ? '#ffd700' : 'rgba(255,255,255,0.2)';
        btn.style.color = isActive ? '#ffd700' : '#c9a0ff';
    });
}


// ─── MAIN EXPORT ORCHESTRATOR ────────────────────────────────

async function generateBook() {
    if (typeof sbTrack === 'function') sbTrack('book_generated', { template: _selectedTemplate, paper_size: _selectedPaperSize });
    const btn = document.getElementById('generateBookBtn');
    if (btn) {
        btn.disabled = true;
        btn.textContent = '⏳ Generating...';
    }

    try {
        const bookData = collectBookData();
        if (!bookData) {
            alert('No reading data found. Please generate a reading first.');
            return;
        }

        let html;

        if (_selectedTemplate === 'cosmic-classic') {
            html = buildCosmicClassicHTML(bookData, _selectedPaperSize);
        } else {
            // Fetch the themed template
            const templateURL = `generator/templates/${_selectedTemplate}/template.html`;
            const response = await fetch(templateURL);
            if (!response.ok) throw new Error(`Could not load template: ${_selectedTemplate}`);
            let templateHTML = await response.text();

            // Strip tracking scripts
            templateHTML = templateHTML.replace(/<script[^>]*ninja-daytona[^>]*><\/script>/g, '');

            // Fill template with book data
            const engine = new BookTemplateEngine();
            const divider = TEMPLATE_DIVIDERS[_selectedTemplate] ?? '· · ✦ · ·';
            html = engine.fillTemplate(templateHTML, bookData, divider);

            // Inject quality CSS (growth areas, page breaks, empty container handling)
            html = html.replace('</style>', QUALITY_CSS + '\n</style>');

            // Inject paper size hint into print bar
            html = html.replace(
                /(<button class="print-btn")/,
                `<span style="font-size:0.78rem;opacity:0.7;margin-right:8px;">Ctrl+P \u2192 Save as PDF \u00b7 ${_selectedPaperSize}</span>$1`
            );

            // Apply A4 override if needed
            if (_selectedPaperSize === 'A4') {
                html = html.replace('</style>', A4_OVERRIDE_CSS + '\n</style>');
            }
        }

        // Load & embed template images (graceful — skips any that fail to load)
        if (btn) btn.textContent = '🎨 Embedding images...';
        try {
            const _imgMap = await _loadTemplateImages(_selectedTemplate);
            html = _injectImages(html, _imgMap, _selectedTemplate === 'cosmic-classic');
        } catch (imgErr) {
            console.warn('Image embedding skipped:', imgErr);
        }

        // Download the HTML file
        const name = bookData.meta.name || 'Reading';
        const safeName = name.replace(/[^a-zA-Z0-9]/g, '-');
        const sizeTag = _selectedPaperSize;
        const themeTag = _selectedTemplate;

        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${safeName}-Moment-in-Time-${themeTag}-${sizeTag}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Close picker and show instructions
        const overlay = document.getElementById('templatePickerOverlay');
        if (overlay) overlay.remove();

        showExportInstructions(name, themeTag, sizeTag);

    } catch (err) {
        console.error('Book generation failed:', err);
        alert('Something went wrong generating the book. Please try again.\n\n' + err.message);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = '✨ Generate Book';
        }
    }
}


// ─── COSMIC CLASSIC BUILT-IN TEMPLATE ────────────────────────

function buildCosmicClassicHTML(bookData, paperSize) {
    const name = _escHtml(bookData.meta.name);
    const details = (bookData.meta.details || []).map(d => _escHtml(d));

    // Snapshot grid
    let snapshotHTML = '';
    const cats = bookData.snapshot.categories;
    // First 4 categories in a 2-col grid, 5th (Soul & Destiny) spans full width
    cats.forEach((cat, i) => {
        const isLast = i === cats.length - 1;
        snapshotHTML += `<div${isLast ? ' class="snap-full"' : ''}>`;
        snapshotHTML += `<div class="snap-cat-title">${_escHtml(cat.title)}</div>`;
        if (isLast) snapshotHTML += `<div class="snap-grid" style="gap:1mm;">`;
        cat.items.forEach(item => {
            snapshotHTML += `<div class="snap-item"><span class="snap-planet">${_escHtml(item.planet)}</span><span class="snap-sign">${_escHtml(item.sign)}</span></div>`;
        });
        if (isLast) snapshotHTML += `</div>`;
        snapshotHTML += `</div>`;
    });

    // TOC
    let tocHTML = '';
    bookData.toc.forEach(section => {
        tocHTML += `<div class="toc-section"><div class="toc-section-name">${_escHtml(section.name)}</div>`;
        section.entries.forEach(entry => {
            tocHTML += `<div class="toc-entry">${_escHtml(entry)}</div>`;
        });
        tocHTML += `</div>`;
    });

    // Chapters
    let chaptersHTML = '';
    bookData.chapters.forEach(chapter => {
        chaptersHTML += `
        <div class="page chapter-opener">
            <div class="chapter-num">${_escHtml(chapter.number)}</div>
            <div class="chapter-icon">${chapter.icon}</div>
            <h2 class="chapter-title">${_escHtml(chapter.title)}</h2>
            ${chapter.description ? `<p class="chapter-desc">${_escHtml(chapter.description)}</p>` : ''}
            <div class="ornament">\u00b7 \u00b7 \u2726 \u00b7 \u00b7</div>
        </div>`;

        chapter.readings.forEach((reading, ri) => {
            chaptersHTML += `<div class="reading avoid-break">`;
            chaptersHTML += `<div class="reading-header">`;
            if (reading.icon) chaptersHTML += `<span class="r-icon">${reading.icon}</span>`;
            chaptersHTML += `<span class="r-title">${_escHtml(reading.title)}</span>`;
            if (reading.value) chaptersHTML += `<span class="r-value">${_escHtml(reading.value)}</span>`;
            chaptersHTML += `</div>`;

            if (reading.bodyHTML) {
                chaptersHTML += `<div class="reading-body">${reading.bodyHTML}</div>`;
            }

            if (reading.keywords && reading.keywords.length > 0) {
                chaptersHTML += `<div class="kw-row">${reading.keywords.map(k => `<span class="kw">${_escHtml(k)}</span>`).join('')}</div>`;
            }

            if ((reading.gifts && reading.gifts.length > 0) || (reading.growthAreas && reading.growthAreas.length > 0)) {
                chaptersHTML += `<div class="sc-grid">`;
                if (reading.gifts && reading.gifts.length > 0) {
                    chaptersHTML += `<div class="sc-col"><h5 class="sc-gifts">\u2726 Gifts</h5><ul>${reading.gifts.map(s => `<li>${_escHtml(s)}</li>`).join('')}</ul></div>`;
                }
                if (reading.growthAreas && reading.growthAreas.length > 0) {
                    chaptersHTML += `<div class="sc-col"><h5 class="sc-growth">\u25C7 Growth Areas</h5><ul>${reading.growthAreas.map(c => `<li>${_escHtml(c)}</li>`).join('')}</ul></div>`;
                }
                chaptersHTML += `</div>`;
            }

            chaptersHTML += `</div>`;
            if (ri < chapter.readings.length - 1) {
                chaptersHTML += `<div class="section-sep">\u00b7 \u00b7 \u00b7 \u00b7</div>`;
            }
        });
    });

    const a4Block = paperSize === 'A4' ? `<style>${A4_COSMIC_OVERRIDE}</style>` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>A Moment in Time \u2014 ${name}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
<style>
@page { size: 148mm 210mm; margin: 18mm 14mm 22mm 18mm; }
@page :left  { margin-left: 14mm; margin-right: 18mm; }
@page :right { margin-left: 18mm; margin-right: 14mm; }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root { --cosmic: #2d1b4e; --gold: #b8860b; --gold-light: #d4a843; --accent: #6b4c8a; --text: #1a1a2e; --text-light: #4a4a6a; --divider: #d4c5a9; --cream: #fefcf8; --cream-dark: #f3efe6; }
html { font-size: 10pt; }
body { font-family: 'EB Garamond', 'Georgia', 'Times New Roman', serif; color: var(--text); background: var(--cream); line-height: 1.7; -webkit-font-smoothing: antialiased; }

.print-bar { position: fixed; top: 0; left: 0; right: 0; background: linear-gradient(135deg, #1a0a2e, #2d1b4e); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; z-index: 1000; border-bottom: 2px solid rgba(255,215,0,0.3); font-family: system-ui, sans-serif; }
.print-bar-title { color: #ffd700; font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; letter-spacing: 1px; }
.print-bar-hint { color: #c9a0ff; font-size: 0.8rem; }
.print-btn { background: linear-gradient(135deg, #ffd700, #daa520); color: #1a0a2e; border: none; padding: 10px 28px; border-radius: 25px; font-weight: 700; font-size: 0.95rem; cursor: pointer; }
.print-btn:hover { transform: scale(1.05); }
@media print { .print-bar { display: none !important; } body { background: white; padding: 0; margin: 0; } .book { max-width: none; padding: 0; margin: 0; } }
@media screen { body { padding-top: 56px; } .book { max-width: 148mm; margin: 20px auto 60px; box-shadow: 0 4px 40px rgba(0,0,0,0.12); border-radius: 2px; } }

.page { padding: 18mm 14mm 22mm 18mm; min-height: 210mm; position: relative; page-break-after: always; break-after: page; }

.cover { background: linear-gradient(170deg, #1a0a2e 0%, #2d1b4e 30%, #1a0a2e 60%, #0f0720 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative; overflow: hidden; padding: 25mm 18mm; color: white; }
.cover .stars { position: absolute; inset: 0; background-image: radial-gradient(1px 1px at 20% 15%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 80% 25%, rgba(255,215,0,0.5), transparent), radial-gradient(1px 1px at 50% 10%, rgba(255,255,255,0.8), transparent), radial-gradient(1px 1px at 10% 60%, rgba(255,215,0,0.4), transparent), radial-gradient(1.5px 1.5px at 90% 70%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 30% 80%, rgba(255,215,0,0.4), transparent), radial-gradient(1px 1px at 70% 50%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 45% 35%, rgba(255,215,0,0.3), transparent), radial-gradient(1.5px 1.5px at 15% 45%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 85% 85%, rgba(255,215,0,0.5), transparent), radial-gradient(1px 1px at 60% 90%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 55% 65%, rgba(255,215,0,0.3), transparent); }
.cover .border-outer { position: absolute; inset: 8mm; border: 0.5pt solid rgba(255,215,0,0.25); }
.cover .border-inner { position: absolute; inset: 10mm; border: 0.25pt solid rgba(255,215,0,0.15); }
.cover-ornament { position: relative; z-index: 1; color: rgba(255,215,0,0.5); font-size: 12pt; letter-spacing: 6pt; margin: 6mm 0; }
.cover-title { position: relative; z-index: 1; font-family: 'Cormorant Garamond', serif; font-size: 24pt; font-weight: 300; color: #ffd700; letter-spacing: 2pt; text-transform: uppercase; line-height: 1.2; margin-bottom: 3mm; text-shadow: 0 0 40px rgba(255,215,0,0.3); }
.cover-subtitle { position: relative; z-index: 1; font-style: italic; font-size: 11pt; color: rgba(200,180,255,0.8); letter-spacing: 1pt; margin-bottom: 10mm; }
.cover-name { position: relative; z-index: 1; font-family: 'Cormorant Garamond', serif; font-size: 20pt; font-weight: 600; letter-spacing: 1.5pt; margin-bottom: 8mm; text-shadow: 0 0 20px rgba(255,255,255,0.2); }
.cover-details { position: relative; z-index: 1; font-size: 9pt; color: rgba(200,180,255,0.6); line-height: 1.8; }
.cover-brand { position: absolute; bottom: 14mm; left: 0; right: 0; text-align: center; z-index: 1; font-family: 'Cormorant Garamond', serif; font-size: 7.5pt; color: rgba(255,215,0,0.4); letter-spacing: 3pt; text-transform: uppercase; }

.half-title { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.half-title h1 { font-family: 'Cormorant Garamond', serif; font-size: 18pt; font-weight: 300; color: var(--cosmic); letter-spacing: 2pt; text-transform: uppercase; }
.half-title .ht-name { font-family: 'Cormorant Garamond', serif; font-size: 13pt; color: var(--accent); font-style: italic; margin-top: 4mm; }

.epigraph { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.epigraph blockquote { font-style: italic; font-size: 11pt; color: var(--text-light); max-width: 90mm; line-height: 1.8; margin-bottom: 5mm; }
.epigraph .attr { font-family: 'Cormorant Garamond', serif; font-size: 9pt; color: var(--accent); letter-spacing: 1pt; }
.epigraph .dedication { font-style: italic; font-size: 10pt; color: var(--text-light); margin-top: 15mm; line-height: 1.7; }

.snapshot-title { font-family: 'Cormorant Garamond', serif; font-size: 14pt; font-weight: 600; color: var(--cosmic); text-align: center; letter-spacing: 2pt; text-transform: uppercase; margin-bottom: 3mm; }
.snap-divider { width: 30mm; height: 0.5pt; background: var(--gold); margin: 0 auto 5mm; }
.snap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; }
.snap-cat-title { font-family: 'Cormorant Garamond', serif; font-size: 8.5pt; font-weight: 600; color: var(--gold); text-transform: uppercase; letter-spacing: 1.5pt; margin-bottom: 1.5mm; padding-bottom: 1mm; border-bottom: 0.25pt solid var(--divider); }
.snap-item { display: flex; justify-content: space-between; font-size: 8.5pt; padding: 0.5mm 0; }
.snap-planet { color: var(--text-light); }
.snap-sign { color: var(--cosmic); font-weight: 600; font-family: 'Cormorant Garamond', serif; }
.snap-full { grid-column: 1 / -1; }

.toc-title { font-family: 'Cormorant Garamond', serif; font-size: 14pt; font-weight: 600; color: var(--cosmic); text-align: center; letter-spacing: 2pt; text-transform: uppercase; margin-bottom: 3mm; }
.toc-section { margin-bottom: 4mm; }
.toc-section-name { font-family: 'Cormorant Garamond', serif; font-size: 10pt; font-weight: 600; color: var(--cosmic); padding-bottom: 1mm; border-bottom: 0.25pt solid var(--divider); margin-bottom: 1mm; }
.toc-entry { font-size: 8.5pt; color: var(--text-light); padding: 0.3mm 0 0.3mm 3mm; line-height: 1.5; }

.chapter-opener { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, var(--cream) 0%, var(--cream-dark) 50%, var(--cream) 100%); }
.chapter-num { font-family: 'Cormorant Garamond', serif; font-size: 8pt; color: var(--gold); letter-spacing: 3pt; text-transform: uppercase; margin-bottom: 4mm; }
.chapter-icon { font-size: 22pt; margin-bottom: 4mm; opacity: 0.75; }
.chapter-title { font-family: 'Cormorant Garamond', serif; font-size: 18pt; font-weight: 600; color: var(--cosmic); letter-spacing: 1.5pt; margin-bottom: 3mm; line-height: 1.3; }
.chapter-desc { font-style: italic; font-size: 9.5pt; color: var(--text-light); max-width: 95mm; line-height: 1.6; }
.ornament { color: var(--divider); font-size: 10pt; letter-spacing: 4pt; margin-top: 6mm; }

.reading { margin-bottom: 5mm; }
.avoid-break { page-break-inside: avoid; break-inside: avoid; }
.reading-header { display: flex; align-items: baseline; gap: 2mm; padding-bottom: 1.5mm; border-bottom: 0.4pt solid var(--divider); margin-bottom: 2mm; }
.r-icon { font-size: 11pt; flex-shrink: 0; }
.r-title { font-family: 'Cormorant Garamond', serif; font-size: 11pt; font-weight: 600; color: var(--cosmic); flex: 1; }
.r-value { font-family: 'Cormorant Garamond', serif; font-size: 10pt; font-weight: 600; color: var(--gold); font-style: italic; white-space: nowrap; }
.reading-body { font-size: 9.5pt; line-height: 1.7; color: var(--text); text-align: justify; hyphens: auto; -webkit-hyphens: auto; }
.reading-body p { margin-bottom: 2mm; text-indent: 4mm; }
.reading-body p:first-child { text-indent: 0; }
.reading-body strong { color: var(--cosmic); }
.reading-body em { color: var(--accent); }
.reading-body ul, .reading-body ol { margin: 2mm 0 2mm 5mm; }
.reading-body li { margin-bottom: 1mm; font-size: 9pt; }
.reading-body .mark-read-btn, .reading-body .read-badge, .reading-body .expand-icon, .reading-body button,
.reading-body .ad-container, .reading-body .reading-card-header, .reading-body .reading-card-right { display: none !important; }
.reading-body h4 { font-family: 'Cormorant Garamond', serif; font-size: 9.5pt; font-weight: 600; color: var(--cosmic); margin: 2.5mm 0 1mm; }
.reading-body h5 { font-family: 'Cormorant Garamond', serif; font-size: 9pt; font-weight: 600; color: var(--accent); margin: 2mm 0 1mm; }
.reading-body .blueprint-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
.reading-body .blueprint-item { font-size: 8.5pt; line-height: 1.4; }
.reading-body .blueprint-category h4 { border-bottom: 0.25pt solid var(--divider); padding-bottom: 1mm; }
.reading-body .meaning { font-size: 7.5pt; color: var(--text-light); font-style: italic; }

.kw-row { display: flex; flex-wrap: wrap; gap: 1.5mm; margin: 2mm 0; }
.kw { font-size: 7.5pt; padding: 0.5mm 2.5mm; border: 0.3pt solid var(--divider); border-radius: 1.5mm; color: var(--accent); background: var(--cream-dark); }
.sc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; margin: 2mm 0; font-size: 8.5pt; }
.sc-gifts { color: #2e7d32; font-size: 8.5pt; margin-bottom: 1mm; }
.sc-growth { color: #c62828; font-size: 8.5pt; margin-bottom: 1mm; }
.sc-col ul { list-style: none; padding: 0; }
.sc-col li { padding-left: 2mm; font-size: 8pt; line-height: 1.5; margin-bottom: 0.5mm; }
.section-sep { text-align: center; color: var(--divider); font-size: 9pt; letter-spacing: 3pt; margin: 4mm 0; }

.closing { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.closing-ornament { color: var(--gold); font-size: 12pt; letter-spacing: 4pt; margin-bottom: 6mm; }
.closing h2 { font-family: 'Cormorant Garamond', serif; font-size: 15pt; font-weight: 600; color: var(--cosmic); margin-bottom: 5mm; }
.closing-body { font-size: 9.5pt; color: var(--text-light); max-width: 100mm; line-height: 1.7; }
.closing-body p { margin-bottom: 3mm; }
.closing-quote { font-style: italic; font-size: 10pt; color: var(--accent); margin-top: 8mm; line-height: 1.6; }
.closing-attr { font-size: 8.5pt; color: var(--text-light); margin-top: 2mm; }

.colophon { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; text-align: center; padding-bottom: 30mm; }
.colophon-brand { font-family: 'Cormorant Garamond', serif; font-size: 9pt; color: var(--gold); letter-spacing: 2pt; text-transform: uppercase; margin-bottom: 3mm; }
.colophon-text { font-size: 7.5pt; color: var(--text-light); line-height: 1.8; max-width: 90mm; }
.colophon-text strong { color: var(--cosmic); }
.colophon-url { font-size: 7pt; color: var(--accent); margin-top: 3mm; }
</style>
${a4Block}
</head>
<body>
<div class="print-bar">
    <div>
        <div class="print-bar-title">A Moment in Time \u2014 ${name}</div>
        <div class="print-bar-hint">Press Ctrl+P (or \u2318+P) \u2192 Save as PDF. Paper size ${paperSize} is set automatically.</div>
    </div>
    <button class="print-btn" onclick="window.print()">\uD83D\uDDA8\uFE0F Print / Save as PDF</button>
</div>
<div class="book">
    <div class="page half-title"><h1>A Moment in Time</h1><div class="ht-name">${_escHtml(bookData.meta.halfTitleName)}</div></div>
    <div class="page cover"><div class="stars"></div><div class="border-outer"></div><div class="border-inner"></div><div class="cover-ornament">\u00b7 \u00b7 \u2726 \u00b7 \u00b7</div><div class="cover-title">A Moment<br>in Time</div><div class="cover-subtitle">A Complete Cosmic Portrait</div><div class="cover-ornament">\u2014 \u2727 \u2014</div><div class="cover-name">${name}</div><div class="cover-details">${details.join('<br>')}</div><div class="cover-ornament">\u00b7 \u00b7 \u2726 \u00b7 \u00b7</div><div class="cover-brand">Quantum Merlin</div></div>
    <div class="page epigraph"><blockquote>${bookData.meta.epigraphQuote}</blockquote><div class="attr">${_escHtml(bookData.meta.epigraphAttr)}</div><div class="dedication">${bookData.meta.dedication.replace(/\n/g, '<br>')}</div></div>
    <div class="page"><div class="snapshot-title">Cosmic Coordinates</div><div class="snap-divider"></div><div class="snap-grid">${snapshotHTML}</div></div>
    <div class="page"><div class="toc-title">Contents</div><div class="snap-divider"></div>${tocHTML}</div>
    ${chaptersHTML}
    <div class="page closing"><div class="closing-ornament">\u2726 \u00b7 \u00b7 \u2726 \u00b7 \u00b7 \u2726</div><h2>${_escHtml(bookData.closing.title)}</h2><div class="closing-body">${bookData.closing.bodyHTML}</div><div class="closing-quote">${_escHtml(bookData.closing.quote)}</div><div class="closing-attr">${_escHtml(bookData.closing.quoteAttr)}</div></div>
    <div class="page colophon"><div class="colophon-brand">${_escHtml(bookData.colophon.brand)}</div><div class="colophon-text">${bookData.colophon.text.replace(/\n/g, '<br>')}</div><div class="colophon-url">${_escHtml(bookData.colophon.url)}</div></div>
</div>
</body>
</html>`;
}


// ─── INSTRUCTIONS MODAL ──────────────────────────────────────

function showExportInstructions(name, theme, size) {
    const themeName = BOOK_TEMPLATES.find(t => t.id === theme)?.name || theme;
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(26,10,46,0.92);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);padding:20px;';
    modal.innerHTML = `
        <div style="background:linear-gradient(135deg,#2d1b4e,#1a0a2e);border:2px solid rgba(255,215,0,0.3);border-radius:20px;padding:35px;max-width:420px;text-align:center;color:#e8d5ff;font-family:'Inter',sans-serif;">
            <div style="font-size:2.5rem;margin-bottom:12px;">📖✨</div>
            <h2 style="color:#ffd700;font-size:1.4rem;margin-bottom:12px;font-family:'Playfair Display',serif;">Book Created!</h2>
            <p style="margin-bottom:14px;line-height:1.6;font-size:0.95rem;">
                <strong style="color:#ffd700;">${_escHtml(name)}</strong>'s ${size} book has been downloaded
                <br><span style="font-size:0.82rem;opacity:0.7;">Theme: ${_escHtml(themeName)}</span>
            </p>
            <div style="background:rgba(0,0,0,0.3);border-radius:12px;padding:18px;text-align:left;margin-bottom:18px;line-height:1.7;font-size:0.9rem;">
                <strong style="color:#ffd700;">To create a perfect PDF:</strong><br>
                1. Open the downloaded HTML file in Chrome<br>
                2. Press <kbd style="background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;font-size:0.85rem;">Ctrl+P</kbd> (or <kbd style="background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;font-size:0.85rem;">\u2318+P</kbd> on Mac)<br>
                3. Set Destination \u2192 <strong style="color:#c9a0ff;">Save as PDF</strong><br>
                4. Paper size is already set to ${size} \u2014 just save!
            </div>
            <p style="font-size:0.8rem;opacity:0.6;margin-bottom:15px;">The file also looks beautiful on screen \u2014 you can read it directly in any browser.</p>
            <button onclick="this.closest('div[style*=fixed]').remove()" style="background:linear-gradient(135deg,#ffd700,#daa520);border:none;color:#1a0a2e;padding:12px 30px;border-radius:25px;font-size:1rem;cursor:pointer;font-weight:700;">Got it!</button>
        </div>
    `;
    document.body.appendChild(modal);
}


// ─── UTILITY HELPERS ─────────────────────────────────────────

function _escHtml(str) {
    if (!str) return '';
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function romanNumeral(n) {
    const r = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'];
    return r[n - 1] || String(n);
}

// Legacy alias — the old export-pdf.js button calls this
function exportPDFBook() {
    showTemplatePicker();
}
