# QRC Logo & Icon Generation Guide

Since the logo is defined in SVG format, you'll need to export it to PNG/ICO formats.

## Quick Generation Methods:

### Option 1: Online Tools (Easiest)
1. Copy the contents of `logo.svg`
2. Go to https://cloudconvert.com/svg-to-png or https://realfavicongenerator.net/
3. Upload/paste the SVG
4. Generate at various sizes

### Option 2: Using Inkscape (Free)
```bash
inkscape logo.svg --export-type=png --export-filename=icon-512x512.png --export-width=512 --export-height=512
inkscape logo.svg --export-type=png --export-filename=icon-192x192.png --export-width=192 --export-height=192
inkscape logo.svg --export-type=png --export-filename=apple-touch-icon.png --export-width=180 --export-height=180
```

### Option 3: Using ImageMagick
```bash
convert -background none logo.svg -resize 512x512 icon-512x512.png
convert -background none logo.svg -resize 192x192 icon-192x192.png
convert -background none logo.svg -resize 32x32 -resize 16x16 favicon.ico
```

## Required Icon Sizes:

| File | Size | Purpose |
|------|------|---------|
| favicon.ico | 16x16, 32x32, 48x48 (multi) | Browser tab |
| apple-touch-icon.png | 180x180 | iOS home screen |
| icon-72x72.png | 72x72 | PWA |
| icon-96x96.png | 96x96 | PWA |
| icon-128x128.png | 128x128 | PWA |
| icon-144x144.png | 144x144 | PWA |
| icon-152x152.png | 152x152 | PWA |
| icon-192x192.png | 192x192 | PWA, Android |
| icon-384x384.png | 384x384 | PWA |
| icon-512x512.png | 512x512 | PWA, Play Store |

## Text Logo CSS (Alternative)

If you need a text-only logo, use this CSS:

```css
.qrc-text-logo {
    font-family: 'Orbitron', sans-serif;
    font-weight: 800;
    font-size: 2rem;
    background: linear-gradient(135deg, #00f5ff 0%, #ff00ff 50%, #ffd700 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(0, 245, 255, 0.5);
}
```

## Emoji Placeholder

Until custom icons are generated, use the crystal ball emoji: 🔮

This maintains brand consistency across all pages.
