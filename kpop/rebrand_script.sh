#!/bin/bash

# Kosmic K-Pop (11:11) Rebrand Script
# This script rebrands all files from "Cosmic K-Pop" to "Kosmic K-Pop" with 11:11 integration

echo "🌟 Starting Kosmic K-Pop (11:11) Rebrand..."
echo ""

# Count files to process
total_files=$(find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.json" \) | wc -l)
echo "Found $total_files files to rebrand..."
echo ""

# Replace "Cosmic K-Pop" with "Kosmic K-Pop"
echo "Step 1: Replacing 'Cosmic K-Pop' → 'Kosmic K-Pop'..."
find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.json" \) -exec sed -i 's/Cosmic K-Pop/Kosmic K-Pop/g' {} \;
echo "✅ Step 1 complete"
echo ""

# Replace "cosmic k-pop" with "kosmic k-pop" (lowercase)
echo "Step 2: Replacing 'cosmic k-pop' → 'kosmic k-pop'..."
find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.json" \) -exec sed -i 's/cosmic k-pop/kosmic k-pop/g' {} \;
echo "✅ Step 2 complete"
echo ""

# Replace "CosmicKPop" with "KosmicKPop" (camelCase)
echo "Step 3: Replacing 'CosmicKPop' → 'KosmicKPop'..."
find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.json" \) -exec sed -i 's/CosmicKPop/KosmicKPop/g' {} \;
echo "✅ Step 3 complete"
echo ""

# Add 11:11 to titles and headers
echo "Step 4: Adding 11:11 energy to branding..."
find . -type f -name "*.html" -exec sed -i 's/<title>Kosmic K-Pop/<title>Kosmic K-Pop (11:11)/g' {} \;
echo "✅ Step 4 complete"
echo ""

# Replace "cosmic" with "kosmic" (when not part of other words)
echo "Step 5: Replacing 'cosmic' → 'kosmic' (standalone)..."
find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.md" -o -name "*.json" \) -exec sed -i 's/\bcosmic\b/kosmic/gI' {} \;
echo "✅ Step 5 complete"
echo ""

echo "🌟 Rebrand complete! All files now feature Kosmic K-Pop (11:11) branding!"
echo ""
echo "Summary:"
echo "- 'Cosmic K-Pop' → 'Kosmic K-Pop'"
echo "- 'cosmic' → 'kosmic'"
echo "- Titles now include '(11:11)'"
echo ""
echo "Next: Creating 11:11 marketing assets..."