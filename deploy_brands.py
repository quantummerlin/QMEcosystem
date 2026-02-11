#!/usr/bin/env python3
"""
Clone A Moment in Time for multiple brands.
Creates branded reading apps under classic/readings/, kpop/readings/, stranger/
"""

import os
import shutil

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SOURCE = os.path.join(BASE_DIR, "amomentintime")

# Files to copy (shared reading engine + content)
SHARED_FILES = [
    "index.html",
    "view.html",
    "calculations.js",
    "readings.js",
    "readings-extended.js",
    "advanced-readings.js",
    "deep-readings.js",
    "deep-planet-readings.js",
    "deep-planet-readings-outer.js",
    "deep-numerology-readings.js",
    "deep-chinese-zodiac-readings.js",
    "deep-chiron-readings.js",
    "deep-house-readings.js",
    "deep-lilith-readings.js",
    "deep-node-readings.js",
    "deep-transformative-planet-readings.js",
    "house-readings.js",
    "aspect-readings.js",
    "love-blueprint.js",
    "tone-variations.js",
    "save-share.js",
    "icon.svg",
    "sw.js",
]

# Forecast subfolder files
FORECAST_FILES = [
    "forecasts/index.html",
    "forecasts/engine.js",
    "forecasts/styles.css",
    "forecasts/robots.txt",
]

# Legal pages from soulblueprint (generic)
LEGAL_PAGES = [
    "about.html",
    "privacy.html",
    "terms.html",
    "disclaimer.html",
]

BRANDS = {
    "classic/readings": {
        "config_source": "config-classic.js",
        "manifest_name": "Quantum Merlin — Soul Blueprint",
        "manifest_short": "QM Blueprint",
        "manifest_desc": "65+ personalized cosmic readings from your birth data",
        "manifest_theme": "#bf5af2",
        "manifest_bg": "#0d0221",
        "icon_path": "/classic/RetroMerlin.jpg",
        "storage_prefix": "qm-classic",
    },
    "kpop/readings": {
        "config_source": "config-kpop.js",
        "manifest_name": "K-Pop Kosmic — Idol Blueprint",
        "manifest_short": "K-Pop Kosmic",
        "manifest_desc": "Discover your K-Pop idol destiny with 65+ cosmic readings",
        "manifest_theme": "#FF69B4",
        "manifest_bg": "#1a0a2e",
        "icon_path": "/kpop/kpop.jpg",
        "storage_prefix": "kpop-kosmic",
    },
    "stranger": {
        "config_source": "config-stranger.js",
        "manifest_name": "Stranger Patterns — Dimensional Profile",
        "manifest_short": "Stranger Patterns",
        "manifest_desc": "Your supernatural blueprint from the Upside Down",
        "manifest_theme": "#8B0000",
        "manifest_bg": "#0a0515",
        "icon_path": "/assets/tarot/QMTarot.png",
        "storage_prefix": "stranger-patterns",
    },
}


def create_manifest(dest, brand):
    """Create a PWA manifest.json for the brand."""
    manifest = f'''{{
  "name": "{brand['manifest_name']}",
  "short_name": "{brand['manifest_short']}",
  "description": "{brand['manifest_desc']}",
  "start_url": ".",
  "display": "standalone",
  "background_color": "{brand['manifest_bg']}",
  "theme_color": "{brand['manifest_theme']}",
  "icons": [
    {{
      "src": "{brand['icon_path']}",
      "sizes": "192x192",
      "type": "image/png"
    }},
    {{
      "src": "{brand['icon_path']}",
      "sizes": "512x512",
      "type": "image/png"
    }}
  ]
}}
'''
    with open(os.path.join(dest, "manifest.json"), 'w', encoding='utf-8') as f:
        f.write(manifest)
    
    # Also create forecast manifest
    forecast_dir = os.path.join(dest, "forecasts")
    if os.path.isdir(forecast_dir):
        with open(os.path.join(forecast_dir, "manifest.json"), 'w', encoding='utf-8') as f:
            f.write(manifest)


def deploy_brand(brand_path, brand_config):
    """Deploy a branded clone of A Moment in Time."""
    dest = os.path.join(BASE_DIR, brand_path)
    
    # Create destination directory
    os.makedirs(dest, exist_ok=True)
    os.makedirs(os.path.join(dest, "forecasts"), exist_ok=True)
    
    # Copy shared engine files
    copied = 0
    for f in SHARED_FILES:
        src = os.path.join(SOURCE, f)
        if os.path.exists(src):
            shutil.copy2(src, os.path.join(dest, f))
            copied += 1
    
    # Copy forecast files
    for f in FORECAST_FILES:
        src = os.path.join(SOURCE, f)
        if os.path.exists(src):
            dst = os.path.join(dest, f)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copy2(src, dst)
            copied += 1
    
    # Copy legal pages
    for f in LEGAL_PAGES:
        src = os.path.join(SOURCE, f)
        if os.path.exists(src):
            shutil.copy2(src, os.path.join(dest, f))
            copied += 1
    
    # Copy the brand config as config.js
    config_src = os.path.join(SOURCE, brand_config["config_source"])
    config_dst = os.path.join(dest, "config.js")
    if os.path.exists(config_src):
        shutil.copy2(config_src, config_dst)
        copied += 1
    else:
        print(f"    ⚠️  Config not found: {config_src}")
    
    # Create manifest
    create_manifest(dest, brand_config)
    copied += 1
    
    # Patch localStorage keys to be brand-specific (avoid cross-brand conflicts)
    prefix = brand_config["storage_prefix"]
    index_path = os.path.join(dest, "index.html")
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace storage key prefixes to be brand-specific
        content = content.replace("'sb-welcome-seen'", f"'{prefix}-welcome-seen'")
        content = content.replace("'sb-gender'", f"'{prefix}-gender'")
        content = content.replace("'sb-read-progress'", f"'{prefix}-read-progress'")
        content = content.replace("'sb-section-collapse'", f"'{prefix}-section-collapse'")
        content = content.replace("'sb-color-mode'", f"'{prefix}-color-mode'")
        content = content.replace('"sb-welcome-seen"', f'"{prefix}-welcome-seen"')
        content = content.replace('"sb-gender"', f'"{prefix}-gender"')
        content = content.replace('"sb-read-progress"', f'"{prefix}-read-progress"')
        content = content.replace('"sb-section-collapse"', f'"{prefix}-section-collapse"')
        content = content.replace('"sb-color-mode"', f'"{prefix}-color-mode"')
        
        # Make the saved readings key brand-specific too
        content = content.replace("'lastReading'", f"'{prefix}-lastReading'")
        content = content.replace("'lastReadingData'", f"'{prefix}-lastReadingData'")
        content = content.replace('"lastReading"', f'"{prefix}-lastReading"')
        content = content.replace('"lastReadingData"', f'"{prefix}-lastReadingData"')
        
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(content)
    
    return copied


def main():
    print("=" * 60)
    print("  A Moment in Time — Brand Deployment")
    print("=" * 60)
    
    total = 0
    for brand_path, config in BRANDS.items():
        print(f"\n  🎨 Deploying: {brand_path}/")
        print(f"     Config: {config['config_source']}")
        count = deploy_brand(brand_path, config)
        total += count
        print(f"     ✅ {count} files deployed")
    
    print("\n" + "=" * 60)
    print(f"  Total: {total} files deployed across {len(BRANDS)} brands")
    print("=" * 60)
    print("\n  Deployed brands:")
    for path in BRANDS:
        print(f"    → https://quantummerlin.com/{path}/")


if __name__ == "__main__":
    main()
