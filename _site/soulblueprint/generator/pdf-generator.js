/**
 * PDF Generator
 * Uses Puppeteer to convert HTML to PDF
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class PDFGenerator {
  constructor(options = {}) {
    this.options = {
      format: 'A5',
      landscape: false,
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
      ...options,
    };
  }

  /**
   * Generate PDF from HTML string
   */
  async generateFromHTML(html, outputPath) {
    console.log('📄 Generating PDF...');
    
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    
    try {
      const page = await browser.newPage();
      
      // Set content
      await page.setContent(html, {
        waitUntil: ['networkidle0', 'domcontentloaded'],
        timeout: 30000,
      });
      
      // Generate PDF
      const pdf = await page.pdf({
        path: outputPath,
        ...this.options,
      });
      
      await browser.close();
      
      const sizeKB = Math.round(pdf.length / 1024);
      console.log(`✅ PDF generated: ${outputPath} (${sizeKB} KB)`);
      
      return outputPath;
    } catch (error) {
      await browser.close();
      throw error;
    }
  }

  /**
   * Generate PDF from HTML file
   */
  async generateFromFile(inputPath, outputPath) {
    const html = fs.readFileSync(inputPath, 'utf-8');
    return this.generateFromHTML(html, outputPath);
  }

  /**
   * Get PDF info without generating
   */
  async getPDFInfo(html) {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    
    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: ['networkidle0', 'domcontentloaded'] });
      
      const metrics = await page.metrics();
      await browser.close();
      
      return {
        documentWidth: Math.round(metrics.DocumentsCount * 148), // A5 width in mm
        estimatedPages: metrics.DocumentsCount,
      };
    } catch (error) {
      await browser.close();
      throw error;
    }
  }
}

module.exports = PDFGenerator;