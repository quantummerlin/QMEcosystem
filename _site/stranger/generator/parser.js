/**
 * Book HTML Parser
 * Extracts all structured reading data from the source "A Moment in Time" HTML
 * and outputs a clean JSON data model that any template can consume.
 */

const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

function parseBookHTML(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf-8');
  const $ = cheerio.load(html);

  const bookData = {
    meta: extractMeta($),
    snapshot: extractSnapshot($),
    toc: extractTOC($),
    chapters: extractChapters($),
    closing: extractClosing($),
    colophon: extractColophon($),
  };

  return bookData;
}

// ─── META: Cover info ───────────────────────────────────────────────
function extractMeta($) {
  const cover = $('.cover');
  const meta = {
    title: 'A Moment in Time',
    subtitle: '',
    name: '',
    details: [],
    brand: '',
  };

  // Title
  const titleEl = cover.find('.cover-title');
  if (titleEl.length) meta.title = titleEl.text().trim();

  // Subtitle
  const subEl = cover.find('.cover-subtitle');
  if (subEl.length) meta.subtitle = subEl.text().trim();

  // Name
  const nameEl = cover.find('.cover-name');
  if (nameEl.length) meta.name = nameEl.text().trim();

  // Details lines
  const detailsEl = cover.find('.cover-details');
  if (detailsEl.length) {
    meta.details = detailsEl.html().split('<br>').map(s => s.replace(/<[^>]*>/g, '').trim()).filter(Boolean);
  }

  // Brand
  const brandEl = cover.find('.cover-brand');
  if (brandEl.length) meta.brand = brandEl.text().trim();

  // Half title
  const halfTitle = $('.half-title');
  if (halfTitle.length) {
    meta.halfTitleName = halfTitle.find('.ht-name').text().trim();
  }

  // Epigraph
  const epigraph = $('.epigraph');
  if (epigraph.length) {
    meta.epigraphQuote = epigraph.find('blockquote').text().trim();
    meta.epigraphAttr = epigraph.find('.attr').text().trim();
    meta.dedication = epigraph.find('.dedication').text().trim();
  }

  return meta;
}

// ─── SNAPSHOT: Cosmic snapshot grid ─────────────────────────────────
function extractSnapshot($) {
  const snapshot = {
    title: '',
    categories: [],
  };

  // Find the snapshot page (page with snap-grid)
  const snapPage = $('.snap-grid').first().closest('.page');
  
  snapshot.title = snapPage.find('.snapshot-title').text().trim();

  // Each category
  snapPage.find('.snap-grid > div').each((i, el) => {
    const catEl = $(el);
    const catTitle = catEl.find('.snap-cat-title').text().trim();
    if (!catTitle) return;

    const items = [];
    catEl.find('.snap-item').each((j, itemEl) => {
      const planet = $(itemEl).find('.snap-planet').text().trim();
      const sign = $(itemEl).find('.snap-sign').text().trim();
      items.push({ planet, sign });
    });

    // Check for nested grids (Soul & Destiny section)
    catEl.find('.snap-grid .snap-item').each((j, itemEl) => {
      const planet = $(itemEl).find('.snap-planet').text().trim();
      const sign = $(itemEl).find('.snap-sign').text().trim();
      // Avoid duplicates
      if (!items.find(it => it.planet === planet && it.sign === sign)) {
        items.push({ planet, sign });
      }
    });

    snapshot.categories.push({
      title: catTitle,
      items,
      fullWidth: catEl.hasClass('snap-full'),
    });
  });

  return snapshot;
}

// ─── TOC: Table of contents ─────────────────────────────────────────
function extractTOC($) {
  const sections = [];
  
  $('.toc-section').each((i, el) => {
    const sectionEl = $(el);
    const name = sectionEl.find('.toc-section-name').text().trim();
    const entries = [];
    
    sectionEl.find('.toc-entry').each((j, entryEl) => {
      entries.push($(entryEl).text().trim());
    });

    sections.push({ name, entries });
  });

  return sections;
}

// ─── CHAPTERS: All chapter content ──────────────────────────────────
function extractChapters($) {
  const chapters = [];
  
  // Find all chapter openers
  const chapterOpeners = $('.chapter-opener');
  
  chapterOpeners.each((i, openerEl) => {
    const opener = $(openerEl);
    const chapter = {
      number: opener.find('.chapter-num').text().trim(),
      icon: opener.find('.chapter-icon').text().trim(),
      title: cleanChapterTitle(opener.find('.chapter-title').text().trim()),
      description: opener.find('.chapter-desc').text().trim(),
      readings: [],
    };

    // Collect all readings between this chapter opener and the next
    let current = opener.parent().is('.page') ? opener.parent() : opener;
    
    // Get all sibling elements after this chapter opener until next chapter opener
    let nextEl = current.next();
    
    while (nextEl.length) {
      // Stop if we hit another chapter opener or closing
      if (nextEl.hasClass('chapter-opener') || nextEl.find('.chapter-opener').length || 
          nextEl.hasClass('closing') || nextEl.find('.closing').length) {
        break;
      }
      
      // Check if this element contains readings
      if (nextEl.hasClass('reading') || nextEl.find('.reading').length) {
        const readings = nextEl.hasClass('reading') ? [nextEl] : nextEl.find('.reading').toArray().map(el => $(el));
        
        readings.forEach(readingEl => {
          const r = typeof readingEl.find === 'function' ? readingEl : $(readingEl);
          const reading = extractReading($, r);
          if (reading) chapter.readings.push(reading);
        });
      }
      
      nextEl = nextEl.next();
    }

    chapters.push(chapter);
  });

  return chapters;
}

function extractReading($, readingEl) {
  const header = readingEl.find('.reading-header').first();
  const body = readingEl.find('.reading-body').first();
  
  if (!header.length) return null;

  const reading = {
    title: header.find('.r-title').text().trim(),
    value: header.find('.r-value').text().trim(),
    icon: header.find('.r-icon').text().trim(),
    bodyHTML: '',
    bodyText: '',
    keywords: [],
    gifts: [],
    growthAreas: [],
  };

  // Body content - preserve HTML structure
  if (body.length) {
    // Clean up the body HTML
    reading.bodyHTML = cleanBodyHTML($, body);
    reading.bodyText = body.text().trim();
  }

  // Keywords
  readingEl.find('.kw').each((i, el) => {
    reading.keywords.push($(el).text().trim());
  });

  // Gifts
  readingEl.find('.sc-gifts').closest('.sc-col').find('li').each((i, el) => {
    reading.gifts.push($(el).text().trim());
  });

  // Growth areas
  readingEl.find('.sc-growth').closest('.sc-col').find('li').each((i, el) => {
    reading.growthAreas.push($(el).text().trim());
  });

  return reading;
}

function cleanBodyHTML($, body) {
  // Clone to avoid modifying original
  const clone = body.clone();
  
  // Remove hidden elements
  clone.find('.mark-read-btn, .read-badge, .expand-icon, button, .ad-container, .reading-card-header, .reading-card-right').remove();
  
  // Get inner HTML
  let html = clone.html();
  
  // Clean up inline styles that reference CSS variables (won't work in templates)
  html = html.replace(/color:\s*var\([^)]+\)/g, '');
  html = html.replace(/background:\s*linear-gradient\([^)]+\)/g, '');
  
  return html;
}

function cleanChapterTitle(title) {
  // Remove the "0/34" count suffixes
  return title.replace(/\d+\/\d+$/, '').trim();
}

// ─── CLOSING ────────────────────────────────────────────────────────
function extractClosing($) {
  const closingPage = $('.closing').first();
  return {
    title: closingPage.find('h2').text().trim(),
    bodyHTML: closingPage.find('.closing-body').html() || '',
    bodyText: closingPage.find('.closing-body').text().trim(),
    quote: closingPage.find('.closing-quote').text().trim(),
    quoteAttr: closingPage.find('.closing-attr').text().trim(),
  };
}

// ─── COLOPHON ───────────────────────────────────────────────────────
function extractColophon($) {
  const colophon = $('.colophon').first();
  return {
    brand: colophon.find('.colophon-brand').text().trim(),
    text: colophon.find('.colophon-text').html() || '',
    url: colophon.find('.colophon-url').text().trim(),
  };
}

// ─── MAIN ───────────────────────────────────────────────────────────
if (require.main === module) {
  const inputPath = process.argv[2] || path.join(__dirname, '..', 'Doyne-Jason-A-Moment-in-Time-Book.html');
  const outputPath = process.argv[3] || path.join(__dirname, 'output', 'parsed-data.json');

  console.log(`📖 Parsing: ${inputPath}`);
  const data = parseBookHTML(inputPath);
  
  // Ensure output directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  
  console.log(`✅ Parsed successfully!`);
  console.log(`   Name: ${data.meta.name}`);
  console.log(`   Chapters: ${data.chapters.length}`);
  console.log(`   Total readings: ${data.chapters.reduce((sum, ch) => sum + ch.readings.length, 0)}`);
  console.log(`   Snapshot categories: ${data.snapshot.categories.length}`);
  console.log(`📄 Output: ${outputPath}`);
}

module.exports = { parseBookHTML };