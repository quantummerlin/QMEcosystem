#!/bin/bash

# Script to generate PWA icons from a source image
# Usage: ./generate-icons.sh source-image.png

SOURCE_IMAGE=$1
OUTPUT_DIR="public/icons"

if [ -z "$SOURCE_IMAGE" ]; then
    echo "Usage: $0 <source-image.png>"
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed."
    echo "Install it with: apt-get install imagemagick (Linux) or brew install imagemagick (Mac)"
    exit 1
fi

# Generate icons in required sizes
SIZES=(72 96 128 144 152 192 384 512)

echo "Generating PWA icons from $SOURCE_IMAGE..."

for size in "${SIZES[@]}"; do
    echo "Generating ${size}x${size} icon..."
    convert "$SOURCE_IMAGE" -resize ${size}x${size} "$OUTPUT_DIR/icon-${size}x${size}.png"
done

# Generate favicon variants
echo "Generating favicons..."
convert "$SOURCE_IMAGE" -resize 16x16 "$OUTPUT_DIR/favicon-16x16.png"
convert "$SOURCE_IMAGE" -resize 32x32 "$OUTPUT_DIR/favicon-32x32.png"
convert "$SOURCE_IMAGE" -resize 180x180 "$OUTPUT_DIR/apple-touch-icon.png"

# Generate OG image (1200x630 for social sharing)
echo "Generating OG image..."
convert "$SOURCE_IMAGE" -resize 1200x630^ -gravity center -extent 1200x630 "public/og-image.png"

echo "✅ All icons generated successfully!"
echo "Icons saved to: $OUTPUT_DIR"