#!/usr/bin/env node

/**
 * Main Generator CLI
 * A Moment in Time - PDF Book Generator
 */

const { parseBookHTML } = require('./parser');
const TemplateEngine = require('./template-engine');
const PDFGenerator = require('./pdf-generator');
const fs = require('fs');
const path = require('path');

// Available templates
const AVAILABLE_TEMPLATES = [
  'heart-bears',
  'cosmic',
  'minimalist',
  'dark-celestial',
  'art-deco',
  'botanical',
  'celestial-watercolor',
  'vintage-storybook',
  'cosmic-rainbow',
  'fairy-tale',
  'mystical-tarot',
];

async function main() {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  const options = {
    input: null,
    template: 'heart-bears',
    output: null,
    jsonOnly: false,
    help: false,
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--json-only') {
      options.jsonOnly = true;
    } else if (arg.startsWith('--input=')) {
      options.input = arg.split('=')[1];
    } else if (arg.startsWith('--template=')) {
      options.template = arg.split('=')[1];
    } else if (arg.startsWith('--output=')) {
      options.output = arg.split('=')[1];
    } else if (!arg.startsWith('--') && !options.input) {
      options.input = arg;
    }
  }
  
  // Show help
  if (options.help) {
    showHelp();
    process.exit(0);
  }
  
  // Validate input
  if (!options.input) {
    console.error('❌ Error: No input file specified');
    console.error('Usage: node generate.js <input.html> [options]');
    console.error('Run "node generate.js --help" for more information');
    process.exit(1);
  }
  
  // Check if input file exists
  if (!fs.existsSync(options.input)) {
    console.error(`❌ Error: Input file not found: ${options.input}`);
    process.exit(1);
  }
  
  // Validate template
  if (!AVAILABLE_TEMPLATES.includes(options.template)) {
    console.error(`❌ Error: Unknown template "${options.template}"`);
    console.error(`Available templates: ${AVAILABLE_TEMPLATES.join(', ')}`);
    process.exit(1);
  }
  
  // Set default output path
  if (!options.output) {
    const inputName = path.basename(options.input, '.html');
    options.output = path.join(__dirname, 'output', `${inputName}-${options.template}.pdf`);
  }
  
  // Ensure output directory exists
  fs.mkdirSync(path.dirname(options.output), { recursive: true });
  
  console.log('\n═════════════════════════════════════════════════════');
  console.log('  🌟 A Moment in Time - PDF Generator');
  console.log('═════════════════════════════════════════════════════\n');
  
  // Step 1: Parse input HTML
  console.log('📖 Step 1: Parsing source HTML...');
  const bookData = parseBookHTML(options.input);
  console.log(`   ✅ Found: ${bookData.meta.name}`);
  console.log(`   ✅ Chapters: ${bookData.chapters.length}`);
  console.log(`   ✅ Readings: ${bookData.chapters.reduce((sum, ch) => sum + ch.readings.length, 0)}`);
  
  // Step 2: Load template
  console.log('\n🎨 Step 2: Loading template...');
  const templatePath = path.join(__dirname, 'templates', options.template, 'template.html');
  const partialsDir = path.join(__dirname, 'templates', options.template, 'partials');
  
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Error: Template not found: ${templatePath}`);
    process.exit(1);
  }
  
  const template = fs.readFileSync(templatePath, 'utf-8');
  console.log(`   ✅ Template: ${options.template}`);
  
  // Step 3: Fill template with data
  console.log('\n✏️  Step 3: Populating template with data...');
  const engine = new TemplateEngine();
  const filledHTML = engine.fillTemplate(template, bookData, partialsDir);
  console.log('   ✅ Template populated');
  
  // Step 4: Save intermediate HTML (optional)
  const htmlOutputPath = options.output.replace('.pdf', '.html');
  fs.writeFileSync(htmlOutputPath, filledHTML, 'utf-8');
  console.log(`   ✅ HTML saved: ${htmlOutputPath}`);
  
  // If JSON only, save and exit
  if (options.jsonOnly) {
    const jsonPath = options.output.replace('.pdf', '.json');
    fs.writeFileSync(jsonPath, JSON.stringify(bookData, null, 2));
    console.log(`\n✅ JSON saved: ${jsonPath}`);
    console.log('🎉 Complete! (JSON-only mode)');
    process.exit(0);
  }
  
  // Step 5: Generate PDF
  console.log('\n📄 Step 4: Generating PDF...');
  const pdfGen = new PDFGenerator();
  await pdfGen.generateFromHTML(filledHTML, options.output);
  
  console.log('\n═════════════════════════════════════════════════════');
  console.log('  🎉 Success!');
  console.log('═════════════════════════════════════════════════════');
  console.log(`\n📁 Output files:`);
  console.log(`   • PDF:  ${options.output}`);
  console.log(`   • HTML: ${htmlOutputPath}`);
  console.log(`\n💡 To regenerate with different template:`);
  console.log(`   node generate.js "${options.input}" --template <name> --output <path.pdf>\n`);
}

function showHelp() {
  console.log(`
A Moment in Time - PDF Book Generator
═══════════════════════════════════════

USAGE:
  node generate.js <input.html> [options]

ARGUMENTS:
  input.html          Path to source HTML file (required)

OPTIONS:
  --template=<name>   Template to use (default: heart-bears)
  --output=<path>     Output PDF path (default: output/<name>-<template>.pdf)
  --json-only         Only output JSON data, no PDF
  --help, -h          Show this help message

AVAILABLE TEMPLATES:
  ${AVAILABLE_TEMPLATES.join(', ')}

EXAMPLES:
  # Generate with default template
  node generate.js book.html

  # Use specific template
  node generate.js book.html --template cosmic

  # Specify output path
  node generate.js book.html --output readings/Doyne-Jason.pdf

  # JSON only (for debugging)
  node generate.js book.html --json-only

  # Full example
  node generate.js input/book.html --template heart-bears --output output/Doyne-Jason-Heart-Bears.pdf
`);
}

// Run
if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  });
}

module.exports = { main };