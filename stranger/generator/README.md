# A Moment in Time - PDF Book Generator

A Node.js tool that generates beautiful PDF books from "A Moment in Time" astrology reading HTML files with multiple design templates.

## 🌟 Features

- **Multi-Template Support**: Generate with different visual styles (Heart Bears, Cosmic, Minimalist, and more)
- **Automatic Parsing**: Extracts all readings, chapters, and data from source HTML
- **PDF Generation**: High-quality A5 PDF output via Puppeteer
- **Command-Line Interface**: Easy to use CLI with flexible options
- **HTML Preview**: Generates HTML files alongside PDFs for previewing

## 📋 Requirements

- Node.js 18+ 
- npm

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Generate a PDF with default template
node generate.js path/to/book.html

# Use specific template
node generate.js path/to/book.html --template heart-bears

# Specify output path
node generate.js path/to/book.html --output my-reading.pdf
```

## 📁 Project Structure

```
generator/
├── generate.js           # Main CLI entry point
├── parser.js             # HTML parser - extracts data from source
├── template-engine.js    # Template engine - fills templates with data
├── pdf-generator.js      # PDF generator - converts HTML to PDF
├── package.json          # Dependencies and scripts
├── README.md            # This file
├── templates/           # Design templates
│   └── heart-bears/
│       ├── template.html
│       └── partials/
│           ├── chapter.html
│           ├── reading.html
│           ├── snapshot-item.html
│           ├── toc-section.html
│           └── toc-entry.html
└── output/              # Generated files (gitignored)
```

## 💻 Usage

### Basic Usage

```bash
node generate.js <input.html> [options]
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--template=<name>` | Template to use | `heart-bears` |
| `--output=<path>` | Output PDF path | `output/<name>-<template>.pdf` |
| `--json-only` | Only output JSON data, no PDF | `false` |
| `--help, -h` | Show help message | - |

### Available Templates

- `heart-bears` - Cute pastel design with hearts and bears
- `cosmic` - Original celestial design
- `minimalist` - Clean, simple design

### Examples

```bash
# Generate with Heart Bears template
node generate.js readings/Jane-Smith.html --template heart-bears

# Save to specific location
node generate.js readings/Jane-Smith.html --output readings/Jane-Smith-Heart-Bears.pdf

# Export JSON data only (for debugging)
node generate.js readings/Jane-Smith.html --json-only

# Full command example
node generate.js input/book.html --template heart-bears --output output/Doyne-Jason.pdf
```

## 🎨 Creating Custom Templates

To create a new template:

1. Create a new directory in `templates/`: `templates/my-template/`
2. Create `template.html` with placeholder tags like `{{name}}`, `{{title}}`, `{{chapters}}`
3. Create a `partials/` subdirectory with:
   - `chapter.html` - Template for each chapter
   - `reading.html` - Template for each reading
   - `snapshot-item.html` - Template for snapshot items
   - `toc-section.html` - Template for TOC sections
   - `toc-entry.html` - Template for TOC entries
4. Add template name to `AVAILABLE_TEMPLATES` array in `generate.js`

### Available Placeholders

#### Meta Data
- `{{title}}` - Book title
- `{{subtitle}}` - Subtitle
- `{{name}}` - Person's name
- `{{details}}` - Birth details (date, time, place)
- `{{brand}}` - Brand name
- `{{halfTitleName}}` - Half title name
- `{{epigraphQuote}}` - Epigraph quote
- `{{epigraphAttr}}` - Epigraph attribution
- `{{dedication}}` - Dedication text

#### Sections
- `{{snapshot}}` - Cosmic snapshot grid
- `{{toc}}` - Table of contents
- `{{chapters}}` - All chapters with readings
- `{{closingTitle}}`, `{{closingBodyHTML}}`, `{{closingQuote}}`, `{{closingQuoteAttr}}` - Closing page
- `{{colophonBrand}}`, `{{colophonText}}`, `{{colophonURL}}` - Colophon

#### Chapter Partial
- `{{chapterNumber}}` - Chapter number
- `{{chapterIcon}}` - Chapter icon/emoji
- `{{chapterTitle}}` - Chapter title
- `{{chapterDesc}}` - Chapter description
- `{{readings}}` - All readings in this chapter

#### Reading Partial
- `{{title}}` - Reading title
- `{{value}}` - Reading value (e.g., "Sun in Gemini")
- `{{icon}}` - Reading icon
- `{{bodyHTML}}` - Reading body content (HTML)
- `{{keywords}}` - Keywords array
- `{{gifts}}` - Gifts list array

## 🔧 Development

### Running Tests

```bash
# Test parser only
node parser.js

# Test full generation
node generate.js path/to/test.html
```

### Adding Dependencies

```bash
npm install <package>
```

## 📊 Data Structure

The parser extracts the following structure from source HTML:

```json
{
  "meta": { ... },
  "snapshot": {
    "categories": [
      { "title": "The Big Three", "items": [...] }
    ]
  },
  "toc": [ ... ],
  "chapters": [
    {
      "number": "Chapter I",
      "title": "Celestial Gifts",
      "readings": [ ... ]
    }
  ],
  "closing": { ... },
  "colophon": { ... }
}
```

## 🐛 Troubleshooting

### PDF generation fails
- Ensure you have enough disk space
- Try running with `--json-only` first to check parser output
- Check that Puppeteer can launch Chromium

### Template not found
- Verify template directory exists in `templates/`
- Check template name is in `AVAILABLE_TEMPLATES` array
- Ensure `template.html` and `partials/` exist

### Missing data in output
- Check parser output with `--json-only`
- Verify source HTML has expected structure
- Check template placeholders match data keys

## 📄 License

Copyright © 2026 Quantum Merlin. All rights reserved.

## 🙏 Acknowledgments

Built with:
- [Puppeteer](https://pptr.dev/) - Headless Chrome for PDF generation
- [Cheerio](https://cheerio.js.org/) - Fast HTML parsing