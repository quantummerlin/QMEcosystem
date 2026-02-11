#!/usr/bin/env python3
"""
Update SEO meta tags in cloned brand deployments to match their brand identity.
"""

import os
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

BRANDS = {
    "classic/readings/index.html": {
        "title": "Quantum Merlin — Your Complete Soul Blueprint | 65+ Free Cosmic Readings",
        "description": "Get 65+ personalized readings combining numerology, astrology, and cosmic wisdom. Enter your birth data once and explore your complete Soul Blueprint. Free, no sign-up.",
        "keywords": "quantum merlin, soul blueprint, numerology reading, astrology reading, birth chart, life path number, free reading, cosmic profile",
        "canonical": "https://quantummerlin.com/classic/readings/",
        "theme_color": "#bf5af2",
        "app_title": "Quantum Merlin",
        "tile_color": "#bf5af2",
        "json_ld_name": "Quantum Merlin — Soul Blueprint",
        "og_image": "https://quantummerlin.com/classic/RetroMerlin.jpg",
        "og_alt": "Quantum Merlin — Soul Blueprint Reading",
        "icon": "/classic/RetroMerlin.jpg",
    },
    "kpop/readings/index.html": {
        "title": "K-Pop Kosmic — Your Complete Idol Blueprint | 65+ Cosmic Readings",
        "description": "Discover your K-Pop idol destiny with 65+ personalized readings. Stage presence, debut energy, career cycles, and cosmic K-Pop insights. Free, no sign-up.",
        "keywords": "kpop numerology, kpop astrology, idol blueprint, kpop destiny, kpop personality, idol energy, kpop kosmic, stage name",
        "canonical": "https://quantummerlin.com/kpop/readings/",
        "theme_color": "#FF69B4",
        "app_title": "K-Pop Kosmic",
        "tile_color": "#FF69B4",
        "json_ld_name": "K-Pop Kosmic — Idol Blueprint",
        "og_image": "https://quantummerlin.com/kpop/kpop.jpg",
        "og_alt": "K-Pop Kosmic — Idol Blueprint Reading",
        "icon": "/kpop/kpop.jpg",
    },
    "stranger/index.html": {
        "title": "Stranger Patterns — The Upside Down Oracle | 65+ Dimensional Readings",
        "description": "Discover your dimensional profile with 65+ supernatural readings. Stranger Things themed numerology, astrology, and psychic analysis. Free, no sign-up.",
        "keywords": "stranger things, upside down oracle, stranger patterns, dimensional reading, hawkins numerology, stranger astrology, eleven powers",
        "canonical": "https://quantummerlin.com/stranger/",
        "theme_color": "#8B0000",
        "app_title": "Stranger Patterns",
        "tile_color": "#8B0000",
        "json_ld_name": "Stranger Patterns — Dimensional Profile",
        "og_image": "https://quantummerlin.com/assets/tarot/QMTarot.png",
        "og_alt": "Stranger Patterns — Dimensional Profile Reading",
        "icon": "/assets/tarot/QMTarot.png",
    },
}


def rebrand_meta(filepath, brand):
    """Replace all meta tags in a clone's index.html with brand-appropriate values."""
    full_path = os.path.join(BASE_DIR, filepath)
    
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Title
    content = re.sub(
        r'<title[^>]*>.*?</title>',
        f'<title id="page-title">{brand["title"]}</title>',
        content, count=1
    )
    
    # Meta description
    content = re.sub(
        r'<meta\s+name="description"[^>]*>',
        f'<meta name="description" id="meta-description" content="{brand["description"]}">',
        content, count=1
    )
    
    # Keywords
    content = re.sub(
        r'<meta\s+name="keywords"[^>]*>',
        f'<meta name="keywords" content="{brand["keywords"]}">',
        content, count=1
    )
    
    # Theme color
    content = re.sub(
        r'<meta\s+name="theme-color"[^>]*>',
        f'<meta name="theme-color" content="{brand["theme_color"]}">',
        content, count=1
    )
    
    # App titles
    content = re.sub(
        r'<meta\s+name="apple-mobile-web-app-title"[^>]*>',
        f'<meta name="apple-mobile-web-app-title" content="{brand["app_title"]}">',
        content, count=1
    )
    content = re.sub(
        r'<meta\s+name="application-name"[^>]*>',
        f'<meta name="application-name" content="{brand["app_title"]}">',
        content, count=1
    )
    content = re.sub(
        r'<meta\s+name="msapplication-TileColor"[^>]*>',
        f'<meta name="msapplication-TileColor" content="{brand["tile_color"]}">',
        content, count=1
    )
    
    # Canonical
    content = re.sub(
        r'<link\s+rel="canonical"[^>]*>',
        f'<link rel="canonical" href="{brand["canonical"]}">',
        content, count=1
    )
    
    # JSON-LD
    content = re.sub(
        r'"name":\s*"Soul Blueprint - Cosmic Reading"',
        f'"name": "{brand["json_ld_name"]}"',
        content, count=1
    )
    content = re.sub(
        r'"description":\s*"Discover your Soul Blueprint[^"]*"',
        f'"description": "{brand["description"]}"',
        content, count=1
    )
    content = re.sub(
        r'"url":\s*"https://quantummerlin\.com/soulblueprint/"',
        f'"url": "{brand["canonical"]}"',
        content, count=1
    )
    
    # Icons
    content = content.replace('href="Amomentintime.jpg?v=1"', f'href="{brand["icon"]}?v=1"')
    content = content.replace('src="Amomentintime.jpg?v=1"', f'src="{brand["icon"]}?v=1"')
    
    # OG tags
    content = re.sub(
        r'<meta\s+property="og:title"[^>]*>',
        f'<meta property="og:title" id="og-title" content="{brand["title"]}">',
        content, count=1
    )
    content = re.sub(
        r'<meta\s+property="og:description"[^>]*>',
        f'<meta property="og:description" id="og-description" content="{brand["description"]}">',
        content, count=1
    )
    content = re.sub(
        r'<meta\s+property="og:url"[^>]*>',
        f'<meta property="og:url" content="{brand["canonical"]}">',
        content, count=1
    )
    content = re.sub(
        r'<meta\s+property="og:image"\s+content="[^"]*"[^>]*>',
        f'<meta property="og:image" content="{brand["og_image"]}">',
        content, count=1
    )
    content = re.sub(
        r'<meta\s+property="og:image:alt"[^>]*>',
        f'<meta property="og:image:alt" content="{brand["og_alt"]}">',
        content, count=1
    )
    
    # Twitter Card
    content = re.sub(
        r'<meta\s+name="twitter:title"[^>]*>',
        f'<meta name="twitter:title" content="{brand["title"]}">',
        content, count=1
    )
    content = re.sub(
        r'<meta\s+name="twitter:description"[^>]*>',
        f'<meta name="twitter:description" content="{brand["description"]}">',
        content, count=1
    )
    content = re.sub(
        r'<meta\s+name="twitter:image"[^>]*>',
        f'<meta name="twitter:image" content="{brand["og_image"]}">',
        content, count=1
    )
    
    if content != original:
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False


def main():
    print("Rebranding meta tags for cloned deployments...")
    for filepath, brand in BRANDS.items():
        changed = rebrand_meta(filepath, brand)
        status = "✅ Updated" if changed else "✔  No changes"
        print(f"  {status}: {filepath}")
    print("Done!")


if __name__ == "__main__":
    main()
