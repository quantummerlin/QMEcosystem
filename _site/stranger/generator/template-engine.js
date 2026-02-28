/**
 * Template Engine
 * Fills HTML templates with parsed book data
 */

const fs = require('fs');
const path = require('path');

class TemplateEngine {
  constructor() {
    this.placeholders = new Map();
  }

  /**
   * Load a template file
   */
  loadTemplate(templatePath) {
    return fs.readFileSync(templatePath, 'utf-8');
  }

  /**
   * Replace simple placeholders like {{name}}
   */
  replaceSimple(template, data) {
    let result = template;
    
    for (const [key, value] of Object.entries(data)) {
      const placeholder = `{{${key}}}`;
      result = result.split(placeholder).join(value || '');
    }
    
    return result;
  }

  /**
   * Replace array placeholders like {{readings}}
   */
  replaceArray(template, key, items, itemTemplate) {
    const placeholder = `{{${key}}}`;
    if (!template.includes(placeholder) || !items || !items.length) {
      return template.replace(placeholder, '');
    }

    const rendered = items.map(item => this.renderItem(item, itemTemplate)).join('\n');
    return template.replace(placeholder, rendered);
  }

  /**
   * Render a single item with its data
   */
  renderItem(item, template) {
    let result = template;
    
    for (const [key, value] of Object.entries(item)) {
      const placeholder = `{{${key}}}`;
      const replacement = this.valueToHTML(value, key);
      result = result.split(placeholder).join(replacement);
    }
    
    return result;
  }

  /**
   * Convert values to HTML-safe strings
   */
  valueToHTML(value, key) {
    if (value === null || value === undefined) return '';
    
    // Handle arrays - wrap in spans for keywords, li for lists
    if (Array.isArray(value)) {
      if (key === 'keywords') {
        return value.map(v => `<span class="kw">${this.escapeHTML(String(v))}</span>`).join('');
      } else if (key === 'gifts' || key === 'growthAreas') {
        return value.map(v => `<li>${this.escapeHTML(String(v))}</li>`).join('');
      }
      return value.map(v => this.valueToHTML(v, key)).join('<br>');
    }
    
    // Handle HTML content (bodyHTML fields)
    if (key.includes('HTML')) {
      return value;
    }
    
    // Escape HTML for text content
    return this.escapeHTML(String(value));
  }

  escapeHTML(str) {
    return String(str)
      .replace(/&amp;/g, '&amp;amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '>')
      .replace(/"/g, '&quot;');
  }

  /**
   * Replace section placeholder with content from a partial
   */
  replaceSection(template, key, content) {
    const placeholder = `{{${key}}}`;
    return template.replace(placeholder, content || '');
  }

  /**
   * Conditional block: {{if:field}}content{{endif:field}}
   */
  replaceConditionals(template, data) {
    let result = template;
    
    for (const key of Object.keys(data)) {
      const value = data[key];
      const hasValue = value !== null && value !== undefined && value !== '';
      
      // {{if:field}}content{{endif:field}}
      const ifRegex = new RegExp(`{{if:${key}}}([\\s\\S]*?){{endif:${key}}}`, 'g');
      result = result.replace(ifRegex, hasValue ? '$1' : '');
      
      // {{unless:field}}content{{endunless:field}}
      const unlessRegex = new RegExp(`{{unless:${key}}}([\\s\\S]*?){{endunless:${key}}}`, 'g');
      result = result.replace(unlessRegex, hasValue ? '' : '$1');
    }
    
    // Remove any remaining unmatched conditionals
    result = result.replace(/{{(?:if|unless):[^}]+}}[\s\S]*?{{end(?:if|unless):[^}]+}}/g, '');
    
    return result;
  }

  /**
   * Fill complete template with book data
   */
  fillTemplate(template, bookData, partialsDir = null) {
    let result = template;
    
    // Meta data
    const meta = {
      title: bookData.meta?.title || '',
      subtitle: bookData.meta?.subtitle || '',
      name: bookData.meta?.name || '',
      details: bookData.meta?.details?.join('<br>') || '',
      brand: bookData.meta?.brand || '',
      halfTitleName: bookData.meta?.halfTitleName || '',
      epigraphQuote: bookData.meta?.epigraphQuote || '',
      epigraphAttr: bookData.meta?.epigraphAttr || '',
      dedication: bookData.meta?.dedication || '',
    };
    
    result = this.replaceSimple(result, meta);
    
    // Snapshot
    if (bookData.snapshot && partialsDir) {
      const snapshotPartial = this.loadPartial('snapshot-item', partialsDir);
      const snapshotItems = bookData.snapshot.categories.map(cat => {
        const itemsHTML = cat.items.map(item => 
          this.renderItem(item, snapshotPartial)
        ).join('');
        return `<div class="snap-cat"><div class="snap-cat-title">${cat.title}</div>${itemsHTML}</div>`;
      }).join('');
      result = this.replaceSection(result, 'snapshot', snapshotItems);
    }
    
    // TOC
    if (bookData.toc && partialsDir) {
      const tocSectionPartial = this.loadPartial('toc-section', partialsDir);
      const tocEntryPartial = this.loadPartial('toc-entry', partialsDir);
      const tocHTML = bookData.toc.map(section => {
        const entriesHTML = section.entries.map(entry =>
          this.renderItem({ entry }, tocEntryPartial)
        ).join('');
        return this.renderItem({ 
          sectionName: section.name, 
          entries: entriesHTML 
        }, tocSectionPartial);
      }).join('');
      result = this.replaceSection(result, 'toc', tocHTML);
    }
    
    // Chapters
    if (bookData.chapters && partialsDir) {
      const chapterPartial = this.loadPartial('chapter', partialsDir);
      const readingPartial = this.loadPartial('reading', partialsDir);
      
      const chaptersHTML = bookData.chapters.map(chapter => {
        const readingsHTML = chapter.readings.map(reading =>
          this.renderItem(reading, readingPartial)
        ).join('');
        return this.renderItem({
          chapterNumber: chapter.number,
          chapterIcon: chapter.icon,
          chapterTitle: chapter.title,
          chapterDesc: chapter.description,
          readings: readingsHTML,
        }, chapterPartial);
      }).join('');
      result = this.replaceSection(result, 'chapters', chaptersHTML);
    }
    
    // Closing
    if (bookData.closing) {
      const closing = {
        closingTitle: bookData.closing.title || '',
        closingBodyHTML: bookData.closing.bodyHTML || '',
        closingQuote: bookData.closing.quote || '',
        closingQuoteAttr: bookData.closing.quoteAttr || '',
      };
      result = this.replaceSimple(result, closing);
    }
    
    // Colophon
    if (bookData.colophon) {
      const colophon = {
        colophonBrand: bookData.colophon.brand || '',
        colophonText: bookData.colophon.text || '',
        colophonURL: bookData.colophon.url || '',
      };
      result = this.replaceSimple(result, colophon);
    }
    
    // Handle conditionals
    result = this.replaceConditionals(result, meta);
    
    return result;
  }

  loadPartial(partialName, partialsDir) {
    const partialPath = path.join(partialsDir, `${partialName}.html`);
    if (fs.existsSync(partialPath)) {
      return fs.readFileSync(partialPath, 'utf-8');
    }
    return '';
  }
}

module.exports = TemplateEngine;