// ============================================
// A MOMENT IN TIME — A5 PAPERBACK BOOK EXPORT
// ============================================
// Generates a self-contained HTML file perfectly
// formatted for A5 paperback (148mm × 210mm).
// Open in Chrome → Print → Save as PDF.
// ============================================

function exportPDFBook() {
    const userData = window.lastUserData || JSON.parse(localStorage.getItem('lastReading') || '{}');
    const readings = window.lastGeneratedReadings;

    if (!userData.name || !readings) {
        alert('Please generate a reading first before exporting.');
        return;
    }

    // Collect all reading content from the DOM
    const sections = collectReadingSections();
    if (sections.length === 0) {
        alert('No reading content found. Please generate a reading first.');
        return;
    }

    // Build complete standalone HTML book
    const html = buildA5BookHTML(userData, readings, sections);

    // Download as HTML file
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${userData.name.replace(/[^a-zA-Z0-9]/g, '-')}-A-Moment-in-Time-Book.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show instructions
    showExportInstructions(userData.name);
}

// ============================================
// COLLECT READING SECTIONS FROM DOM
// ============================================

function collectReadingSections() {
    const sections = [];
    const domSections = document.querySelectorAll('#readingsContainer .reading-section');

    domSections.forEach((section, sIdx) => {
        const header = section.querySelector('.section-header');
        const sectionName = header
            ? (header.querySelector('h2')?.textContent || header.querySelector('h3')?.textContent || `Section ${sIdx + 1}`)
            : `Section ${sIdx + 1}`;
        const sectionIcon = header ? (header.querySelector('.section-icon')?.textContent || '') : '';
        const sectionDesc = header ? (header.querySelector('.section-description')?.textContent || header.querySelector('p')?.textContent || '') : '';

        const cards = [];

        // Collect reading cards
        section.querySelectorAll('.reading-card').forEach(card => {
            const title = card.querySelector('h3')?.textContent || '';
            const resultValue = card.querySelector('.result-value')?.textContent || '';
            const icon = card.querySelector('.card-icon')?.textContent?.trim() || '';

            // Content is inside collapsed .reading-card-body > .reading-card-content > .reading-content
            const contentEl = card.querySelector('.reading-content')
                || card.querySelector('.reading-card-content')
                || card.querySelector('.reading-card-body');
            let content = '';
            if (contentEl) {
                const clone = contentEl.cloneNode(true);
                clone.querySelectorAll('.mark-read-btn, .read-badge, .expand-icon, button, script, .keyword-tag, .keywords, .strengths-challenges').forEach(el => el.remove());
                content = clone.innerHTML.trim();
            }

            // Keywords
            const keywords = [];
            card.querySelectorAll('.keyword-tag, .keyword').forEach(kw => {
                const t = kw.textContent.trim();
                if (t) keywords.push(t);
            });

            // Strengths / Challenges
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

        // Sub-sections (like Cosmic Snapshot)
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

// ============================================
// SHOW INSTRUCTIONS MODAL
// ============================================

function showExportInstructions(name) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(26,10,46,0.92);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);padding:20px;';
    modal.innerHTML = `
        <div style="background:linear-gradient(135deg,#2d1b4e,#1a0a2e);border:2px solid rgba(255,215,0,0.3);border-radius:20px;padding:35px;max-width:420px;text-align:center;color:#e8d5ff;font-family:'Inter',sans-serif;">
            <div style="font-size:2.5rem;margin-bottom:12px;">📖✨</div>
            <h2 style="color:#ffd700;font-size:1.4rem;margin-bottom:12px;font-family:'Playfair Display',serif;">Book File Created!</h2>
            <p style="margin-bottom:18px;line-height:1.6;font-size:0.95rem;">
                <strong style="color:#ffd700;">${name}</strong>'s A5 paperback book has been downloaded.
            </p>
            <div style="background:rgba(0,0,0,0.3);border-radius:12px;padding:18px;text-align:left;margin-bottom:18px;line-height:1.7;font-size:0.9rem;">
                <strong style="color:#ffd700;">To create a perfect PDF:</strong><br>
                1. Open the downloaded HTML file in Chrome<br>
                2. Press <kbd style="background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;font-size:0.85rem;">Ctrl+P</kbd> (or <kbd style="background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;font-size:0.85rem;">⌘+P</kbd> on Mac)<br>
                3. Set Destination → <strong style="color:#c9a0ff;">Save as PDF</strong><br>
                4. Paper size is already set to A5 — just save!
            </div>
            <p style="font-size:0.8rem;opacity:0.6;margin-bottom:15px;">The file also looks beautiful on screen — you can read it directly in any browser.</p>
            <button onclick="this.closest('div[style*=fixed]').remove()" style="background:linear-gradient(135deg,#ffd700,#daa520);border:none;color:#1a0a2e;padding:12px 30px;border-radius:25px;font-size:1rem;cursor:pointer;font-weight:700;">Got it!</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// ============================================
// UTILITY: Escape HTML
// ============================================

function escHtml(str) {
    if (!str) return '';
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function romanNumeral(n) {
    const r = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
    return r[n - 1] || String(n);
}

// ============================================
// BUILD THE COMPLETE A5 BOOK HTML
// ============================================

function buildA5BookHTML(userData, readings, sections) {
    const name = escHtml(userData.name);
    const birthDate = new Date(userData.birthDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const birthTime = userData.birthTime || '';
    const birthPlace = userData.birthPlace || '';
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const astro = readings.astrology;
    const numr = readings.numerology;

    const risingName = astro.risingSign ? astro.risingSign.name : 'Unknown';
    const uranusName = astro.uranusSign ? astro.uranusSign.name : '\u2014';
    const neptuneName = astro.neptuneSign ? astro.neptuneSign.name : '\u2014';
    const plutoName = astro.plutoSign ? astro.plutoSign.name : '\u2014';
    const northNodeName = astro.northNode ? astro.northNode.name : '\u2014';
    const chineseAnimal = astro.chineseZodiac ? astro.chineseZodiac.animal : '\u2014';
    const moonPhaseName = astro.moonPhase ? astro.moonPhase.name : '\u2014';

    // Build chapter HTML
    let chaptersHTML = '';
    sections.forEach((section, idx) => {
        chaptersHTML += `
        <div class="page chapter-opener">
            <div class="chapter-num">Chapter ${romanNumeral(idx + 1)}</div>
            <div class="chapter-icon">${section.icon}</div>
            <h2 class="chapter-title">${escHtml(section.name)}</h2>
            ${section.description ? `<p class="chapter-desc">${escHtml(section.description)}</p>` : ''}
            <div class="ornament">\u00b7 \u00b7 \u2726 \u00b7 \u00b7</div>
        </div>`;

        section.cards.forEach((card, ci) => {
            chaptersHTML += `<div class="reading avoid-break">`;
            chaptersHTML += `<div class="reading-header">`;
            if (card.icon) chaptersHTML += `<span class="r-icon">${card.icon}</span>`;
            chaptersHTML += `<span class="r-title">${escHtml(card.title)}</span>`;
            if (card.resultValue) chaptersHTML += `<span class="r-value">${escHtml(card.resultValue)}</span>`;
            chaptersHTML += `</div>`;

            if (card.content) {
                chaptersHTML += `<div class="reading-body">${card.content}</div>`;
            }

            if (card.keywords.length > 0) {
                chaptersHTML += `<div class="kw-row">${card.keywords.map(k => `<span class="kw">${escHtml(k)}</span>`).join('')}</div>`;
            }

            if (card.strengths.length > 0 || card.challenges.length > 0) {
                chaptersHTML += `<div class="sc-grid">`;
                if (card.strengths.length > 0) {
                    chaptersHTML += `<div class="sc-col"><h5 class="sc-gifts">\u2726 Gifts</h5><ul>${card.strengths.map(s => `<li>${escHtml(s)}</li>`).join('')}</ul></div>`;
                }
                if (card.challenges.length > 0) {
                    chaptersHTML += `<div class="sc-col"><h5 class="sc-growth">\u25C7 Growth Areas</h5><ul>${card.challenges.map(c => `<li>${escHtml(c)}</li>`).join('')}</ul></div>`;
                }
                chaptersHTML += `</div>`;
            }

            chaptersHTML += `</div>`;

            if (ci < section.cards.length - 1) {
                chaptersHTML += `<div class="section-sep">\u00b7 \u00b7 \u00b7 \u00b7</div>`;
            }
        });
    });

    // TOC
    let tocHTML = '';
    sections.forEach((section) => {
        tocHTML += `<div class="toc-section">
            <div class="toc-section-name">${section.icon} ${escHtml(section.name)}</div>
            ${section.cards.map(c =>
                `<div class="toc-entry">${escHtml(c.title)}${c.resultValue ? `<span class="toc-val">${escHtml(c.resultValue)}</span>` : ''}</div>`
            ).join('')}
        </div>`;
    });

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
/* =============================================
   A5 PAPERBACK BOOK \u2014 148mm x 210mm
   ============================================= */

@page {
    size: 148mm 210mm;
    margin: 18mm 14mm 22mm 18mm;
}
@page :left  { margin-left: 14mm; margin-right: 18mm; }
@page :right { margin-left: 18mm; margin-right: 14mm; }

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
    --cosmic: #2d1b4e;
    --gold: #b8860b;
    --gold-light: #d4a843;
    --accent: #6b4c8a;
    --text: #1a1a2e;
    --text-light: #4a4a6a;
    --divider: #d4c5a9;
    --cream: #fefcf8;
    --cream-dark: #f3efe6;
}

html { font-size: 10pt; }

body {
    font-family: 'EB Garamond', 'Georgia', 'Times New Roman', serif;
    color: var(--text);
    background: var(--cream);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
}

/* PRINT BAR (screen only) */
.print-bar {
    position: fixed; top: 0; left: 0; right: 0;
    background: linear-gradient(135deg, #1a0a2e, #2d1b4e);
    padding: 12px 24px;
    display: flex; align-items: center; justify-content: space-between;
    z-index: 1000;
    border-bottom: 2px solid rgba(255,215,0,0.3);
    font-family: system-ui, sans-serif;
}
.print-bar-title { color: #ffd700; font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; letter-spacing: 1px; }
.print-bar-hint { color: #c9a0ff; font-size: 0.8rem; }
.print-btn {
    background: linear-gradient(135deg, #ffd700, #daa520);
    color: #1a0a2e; border: none;
    padding: 10px 28px; border-radius: 25px;
    font-weight: 700; font-size: 0.95rem; cursor: pointer;
}
.print-btn:hover { transform: scale(1.05); }

@media print {
    .print-bar { display: none !important; }
    body { background: white; padding: 0; margin: 0; }
    .book { max-width: none; padding: 0; margin: 0; }
}
@media screen {
    body { padding-top: 56px; }
    .book { max-width: 148mm; margin: 20px auto 60px; box-shadow: 0 4px 40px rgba(0,0,0,0.12); border-radius: 2px; }
}

/* PAGES */
.page {
    padding: 18mm 14mm 22mm 18mm;
    min-height: 210mm;
    position: relative;
    page-break-after: always;
    break-after: page;
}

/* COVER */
.cover {
    background: linear-gradient(170deg, #1a0a2e 0%, #2d1b4e 30%, #1a0a2e 60%, #0f0720 100%);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; position: relative; overflow: hidden;
    padding: 25mm 18mm; color: white;
}
.cover .stars {
    position: absolute; inset: 0;
    background-image:
        radial-gradient(1px 1px at 20% 15%, rgba(255,255,255,0.7), transparent),
        radial-gradient(1.5px 1.5px at 80% 25%, rgba(255,215,0,0.5), transparent),
        radial-gradient(1px 1px at 50% 10%, rgba(255,255,255,0.8), transparent),
        radial-gradient(1px 1px at 10% 60%, rgba(255,215,0,0.4), transparent),
        radial-gradient(1.5px 1.5px at 90% 70%, rgba(255,255,255,0.5), transparent),
        radial-gradient(1px 1px at 30% 80%, rgba(255,215,0,0.4), transparent),
        radial-gradient(1px 1px at 70% 50%, rgba(255,255,255,0.5), transparent),
        radial-gradient(1px 1px at 45% 35%, rgba(255,215,0,0.3), transparent),
        radial-gradient(1.5px 1.5px at 15% 45%, rgba(255,255,255,0.4), transparent),
        radial-gradient(1px 1px at 85% 85%, rgba(255,215,0,0.5), transparent),
        radial-gradient(1px 1px at 60% 90%, rgba(255,255,255,0.3), transparent),
        radial-gradient(1px 1px at 55% 65%, rgba(255,215,0,0.3), transparent);
}
.cover .border-outer { position: absolute; inset: 8mm; border: 0.5pt solid rgba(255,215,0,0.25); }
.cover .border-inner { position: absolute; inset: 10mm; border: 0.25pt solid rgba(255,215,0,0.15); }
.cover-ornament { position: relative; z-index: 1; color: rgba(255,215,0,0.5); font-size: 12pt; letter-spacing: 6pt; margin: 6mm 0; }
.cover-title {
    position: relative; z-index: 1;
    font-family: 'Cormorant Garamond', serif;
    font-size: 24pt; font-weight: 300; color: #ffd700;
    letter-spacing: 2pt; text-transform: uppercase;
    line-height: 1.2; margin-bottom: 3mm;
    text-shadow: 0 0 40px rgba(255,215,0,0.3);
}
.cover-subtitle { position: relative; z-index: 1; font-style: italic; font-size: 11pt; color: rgba(200,180,255,0.8); letter-spacing: 1pt; margin-bottom: 10mm; }
.cover-name { position: relative; z-index: 1; font-family: 'Cormorant Garamond', serif; font-size: 20pt; font-weight: 600; letter-spacing: 1.5pt; margin-bottom: 8mm; text-shadow: 0 0 20px rgba(255,255,255,0.2); }
.cover-details { position: relative; z-index: 1; font-size: 9pt; color: rgba(200,180,255,0.6); line-height: 1.8; }
.cover-brand { position: absolute; bottom: 14mm; left: 0; right: 0; text-align: center; z-index: 1; font-family: 'Cormorant Garamond', serif; font-size: 7.5pt; color: rgba(255,215,0,0.4); letter-spacing: 3pt; text-transform: uppercase; }

/* HALF TITLE */
.half-title { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.half-title h1 { font-family: 'Cormorant Garamond', serif; font-size: 18pt; font-weight: 300; color: var(--cosmic); letter-spacing: 2pt; text-transform: uppercase; }
.half-title .ht-name { font-family: 'Cormorant Garamond', serif; font-size: 13pt; color: var(--accent); font-style: italic; margin-top: 4mm; }

/* EPIGRAPH */
.epigraph { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.epigraph blockquote { font-style: italic; font-size: 11pt; color: var(--text-light); max-width: 90mm; line-height: 1.8; margin-bottom: 5mm; }
.epigraph .attr { font-family: 'Cormorant Garamond', serif; font-size: 9pt; color: var(--accent); letter-spacing: 1pt; }
.epigraph .dedication { font-style: italic; font-size: 10pt; color: var(--text-light); margin-top: 15mm; line-height: 1.7; }

/* COSMIC SNAPSHOT */
.snapshot-title { font-family: 'Cormorant Garamond', serif; font-size: 14pt; font-weight: 600; color: var(--cosmic); text-align: center; letter-spacing: 2pt; text-transform: uppercase; margin-bottom: 3mm; }
.snap-divider { width: 30mm; height: 0.5pt; background: var(--gold); margin: 0 auto 5mm; }
.snap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; }
.snap-cat-title { font-family: 'Cormorant Garamond', serif; font-size: 8.5pt; font-weight: 600; color: var(--gold); text-transform: uppercase; letter-spacing: 1.5pt; margin-bottom: 1.5mm; padding-bottom: 1mm; border-bottom: 0.25pt solid var(--divider); }
.snap-item { display: flex; justify-content: space-between; font-size: 8.5pt; padding: 0.5mm 0; }
.snap-planet { color: var(--text-light); }
.snap-sign { color: var(--cosmic); font-weight: 600; font-family: 'Cormorant Garamond', serif; }
.snap-full { grid-column: 1 / -1; }

/* TOC */
.toc-title { font-family: 'Cormorant Garamond', serif; font-size: 14pt; font-weight: 600; color: var(--cosmic); text-align: center; letter-spacing: 2pt; text-transform: uppercase; margin-bottom: 3mm; }
.toc-section { margin-bottom: 4mm; }
.toc-section-name { font-family: 'Cormorant Garamond', serif; font-size: 10pt; font-weight: 600; color: var(--cosmic); padding-bottom: 1mm; border-bottom: 0.25pt solid var(--divider); margin-bottom: 1mm; }
.toc-entry { font-size: 8.5pt; color: var(--text-light); padding: 0.3mm 0 0.3mm 3mm; line-height: 1.5; }
.toc-val { color: var(--accent); font-style: italic; margin-left: 2mm; }

/* CHAPTER OPENER */
.chapter-opener { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, var(--cream) 0%, var(--cream-dark) 50%, var(--cream) 100%); }
.chapter-num { font-family: 'Cormorant Garamond', serif; font-size: 8pt; color: var(--gold); letter-spacing: 3pt; text-transform: uppercase; margin-bottom: 4mm; }
.chapter-icon { font-size: 22pt; margin-bottom: 4mm; opacity: 0.75; }
.chapter-title { font-family: 'Cormorant Garamond', serif; font-size: 18pt; font-weight: 600; color: var(--cosmic); letter-spacing: 1.5pt; margin-bottom: 3mm; line-height: 1.3; }
.chapter-desc { font-style: italic; font-size: 9.5pt; color: var(--text-light); max-width: 95mm; line-height: 1.6; }
.ornament { color: var(--divider); font-size: 10pt; letter-spacing: 4pt; margin-top: 6mm; }

/* READINGS */
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

/* Hide scraped UI junk */
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

/* CLOSING */
.closing { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.closing-ornament { color: var(--gold); font-size: 12pt; letter-spacing: 4pt; margin-bottom: 6mm; }
.closing h2 { font-family: 'Cormorant Garamond', serif; font-size: 15pt; font-weight: 600; color: var(--cosmic); margin-bottom: 5mm; }
.closing-body { font-size: 9.5pt; color: var(--text-light); max-width: 100mm; line-height: 1.7; }
.closing-body p { margin-bottom: 3mm; }
.closing-quote { font-style: italic; font-size: 10pt; color: var(--accent); margin-top: 8mm; line-height: 1.6; }
.closing-attr { font-size: 8.5pt; color: var(--text-light); margin-top: 2mm; }

/* COLOPHON */
.colophon { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; text-align: center; padding-bottom: 30mm; }
.colophon-brand { font-family: 'Cormorant Garamond', serif; font-size: 9pt; color: var(--gold); letter-spacing: 2pt; text-transform: uppercase; margin-bottom: 3mm; }
.colophon-text { font-size: 7.5pt; color: var(--text-light); line-height: 1.8; max-width: 90mm; }
.colophon-text strong { color: var(--cosmic); }
.colophon-url { font-size: 7pt; color: var(--accent); margin-top: 3mm; }
</style>
</head>
<body>

<div class="print-bar">
    <div>
        <div class="print-bar-title">A Moment in Time \u2014 ${name}</div>
        <div class="print-bar-hint">Press Ctrl+P (or \u2318+P) \u2192 Save as PDF. Paper size A5 is set automatically.</div>
    </div>
    <button class="print-btn" onclick="window.print()">\uD83D\uDDA8\uFE0F Print / Save as PDF</button>
</div>

<div class="book">

    <!-- HALF TITLE -->
    <div class="page half-title">
        <h1>A Moment in Time</h1>
        <div class="ht-name">\u2014 ${name} \u2014</div>
    </div>

    <!-- COVER -->
    <div class="page cover">
        <div class="stars"></div>
        <div class="border-outer"></div>
        <div class="border-inner"></div>
        <div class="cover-ornament">\u00b7 \u00b7 \u2726 \u00b7 \u00b7</div>
        <div class="cover-title">A Moment<br>in Time</div>
        <div class="cover-subtitle">A Complete Cosmic Portrait</div>
        <div class="cover-ornament">\u2014 \u2727 \u2014</div>
        <div class="cover-name">${name}</div>
        <div class="cover-details">
            ${birthDate}<br>
            ${birthTime ? birthTime + '<br>' : ''}
            ${birthPlace || ''}
        </div>
        <div class="cover-ornament">\u00b7 \u00b7 \u2726 \u00b7 \u00b7</div>
        <div class="cover-brand">Quantum Merlin</div>
    </div>

    <!-- EPIGRAPH -->
    <div class="page epigraph">
        <blockquote>\u201CThe cosmos is within us. We are made of star-stuff.<br>We are a way for the universe to know itself.\u201D</blockquote>
        <div class="attr">\u2014 Carl Sagan</div>
        <div class="dedication">
            This reading is dedicated to <em>${name}</em> \u2014<br>
            a soul whose cosmic pattern has never existed before<br>
            and will never exist again.
        </div>
    </div>

    <!-- COSMIC SNAPSHOT -->
    <div class="page">
        <div class="snapshot-title">Cosmic Coordinates</div>
        <div class="snap-divider"></div>
        <div class="snap-grid">
            <div>
                <div class="snap-cat-title">The Big Three</div>
                <div class="snap-item"><span class="snap-planet">\u2609 Sun</span><span class="snap-sign">${escHtml(astro.sunSign.name)}</span></div>
                <div class="snap-item"><span class="snap-planet">\u263D Moon</span><span class="snap-sign">${escHtml(astro.moonSign.name)}</span></div>
                <div class="snap-item"><span class="snap-planet">\u2191 Rising</span><span class="snap-sign">${escHtml(risingName)}</span></div>
            </div>
            <div>
                <div class="snap-cat-title">Personal Planets</div>
                <div class="snap-item"><span class="snap-planet">\u263F Mercury</span><span class="snap-sign">${escHtml(astro.mercurySign.name)}</span></div>
                <div class="snap-item"><span class="snap-planet">\u2640 Venus</span><span class="snap-sign">${escHtml(astro.venusSign.name)}</span></div>
                <div class="snap-item"><span class="snap-planet">\u2642 Mars</span><span class="snap-sign">${escHtml(astro.marsSign.name)}</span></div>
            </div>
            <div>
                <div class="snap-cat-title">Social Planets</div>
                <div class="snap-item"><span class="snap-planet">\u2643 Jupiter</span><span class="snap-sign">${escHtml(astro.jupiterSign.name)}</span></div>
                <div class="snap-item"><span class="snap-planet">\u2644 Saturn</span><span class="snap-sign">${escHtml(astro.saturnSign.name)}</span></div>
            </div>
            <div>
                <div class="snap-cat-title">Outer Planets</div>
                <div class="snap-item"><span class="snap-planet">\u2645 Uranus</span><span class="snap-sign">${escHtml(uranusName)}</span></div>
                <div class="snap-item"><span class="snap-planet">\u2646 Neptune</span><span class="snap-sign">${escHtml(neptuneName)}</span></div>
                <div class="snap-item"><span class="snap-planet">\u2647 Pluto</span><span class="snap-sign">${escHtml(plutoName)}</span></div>
            </div>
            <div class="snap-full">
                <div class="snap-cat-title">Soul & Destiny</div>
                <div class="snap-grid" style="gap:1mm;">
                    <div class="snap-item"><span class="snap-planet">\u260A North Node</span><span class="snap-sign">${escHtml(northNodeName)}</span></div>
                    <div class="snap-item"><span class="snap-planet">\uD83C\uDF19 Moon Phase</span><span class="snap-sign">${escHtml(moonPhaseName)}</span></div>
                    <div class="snap-item"><span class="snap-planet">\uD83D\uDC09 Chinese Zodiac</span><span class="snap-sign">${escHtml(chineseAnimal)}</span></div>
                    <div class="snap-item"><span class="snap-planet">\uD83D\uDD22 Life Path</span><span class="snap-sign">${numr.lifePath || '\u2014'}</span></div>
                    <div class="snap-item"><span class="snap-planet">\u2728 Destiny</span><span class="snap-sign">${numr.destiny || '\u2014'}</span></div>
                    <div class="snap-item"><span class="snap-planet">\uD83D\uDC9C Soul Urge</span><span class="snap-sign">${numr.soulUrge || '\u2014'}</span></div>
                </div>
            </div>
        </div>
    </div>

    <!-- TABLE OF CONTENTS -->
    <div class="page">
        <div class="toc-title">Contents</div>
        <div class="snap-divider"></div>
        ${tocHTML}
    </div>

    <!-- CHAPTERS -->
    ${chaptersHTML}

    <!-- CLOSING -->
    <div class="page closing">
        <div class="closing-ornament">\u2726 \u00b7 \u00b7 \u2726 \u00b7 \u00b7 \u2726</div>
        <h2>The Story Continues</h2>
        <div class="closing-body">
            <p>You have just explored ${name}\u2019s complete moment in time \u2014 a unique constellation of energies that has never existed before and will never exist again.</p>
            <p>With a ${escHtml(astro.sunSign.name)} Sun illuminating the core identity, a ${escHtml(astro.moonSign.name)} Moon nurturing the emotional world, and Life Path ${numr.lifePath} guiding the soul\u2019s journey, ${name} carries a sacred combination of gifts.</p>
            <p>Return to these pages whenever you need a reminder of who you truly are beneath all the roles you play.</p>
        </div>
        <div class="closing-quote">\u201CEvery soul arrives with a purpose.<br>${name}\u2019s purpose is written in the stars.\u201D</div>
        <div class="closing-attr">\u2014 A Moment in Time</div>
    </div>

    <!-- COLOPHON -->
    <div class="page colophon">
        <div class="colophon-brand">Quantum Merlin</div>
        <div class="colophon-text">
            <strong>A Moment in Time</strong><br>
            A Complete Cosmic Portrait for ${name}<br><br>
            Generated on ${today}<br>
            readings.quantummerlin.com<br><br>
            For entertainment and spiritual reflection purposes.<br>
            Every person is unique and will grow in their own beautiful way.<br><br>
            \u00a9 ${new Date().getFullYear()} Quantum Merlin. All rights reserved.
        </div>
        <div class="colophon-url">readings.quantummerlin.com</div>
    </div>

</div>
</body>
</html>`;
}
