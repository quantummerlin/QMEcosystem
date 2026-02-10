#!/usr/bin/env python3
"""
SEO Optimization Script for Quantum Merlin Ecosystem — Subfolder Apps
Adds missing OG, Twitter, canonical, JSON-LD, keywords, robots, author tags
to all HTML files in subfolders.
"""

import os
import re
import glob

BASE_URL = "https://quantummerlin.com"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# App-specific metadata overrides for key index pages
INDEX_OVERRIDES = {
    "soulblueprint": {
        "title": "Soul Blueprint — Deep Numerology & Life Path Reading | Quantum Merlin",
        "description": "Discover your complete Soul Blueprint through advanced numerology. Life path, expression, soul urge, personality numbers, pinnacles, challenges, and karmic lessons all in one reading.",
        "keywords": "soul blueprint, numerology reading, life path, expression number, soul urge, personality number, pinnacles, karmic lessons, quantum merlin",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "lifestrategy": {
        "title": "Life Strategy Calculator — Personal Development Planner | Quantum Merlin",
        "description": "Plan your life strategy with numerology-powered insights. Personal year forecasts, booking calendar, and strategic life planning tools.",
        "keywords": "life strategy, personal development, numerology planner, life planning, personal year, strategic planning, quantum merlin",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "ultimate": {
        "title": "Ultimate Quantum Reading — Complete Cosmic Analysis | Quantum Merlin",
        "description": "The ultimate quantum reading combining numerology, astrology, tarot, and sacred geometry for a comprehensive life analysis. Your complete cosmic profile in one place.",
        "keywords": "ultimate reading, quantum analysis, complete numerology, astrology reading, cosmic profile, tarot, sacred geometry, quantum merlin",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "qrcodes-science": {
        "title": "Quantum Reality Codes — The Science Behind Frequencies | Quantum Merlin",
        "description": "Explore the scientific foundation behind quantum reality codes, frequency healing, and vibrational medicine. Evidence-based articles on sound, light, and energy healing.",
        "keywords": "quantum science, frequency healing, vibrational medicine, sound healing, quantum physics, reality codes, energy science, quantum merlin",
        "json_ld_type": "WebSite",
        "json_ld_category": None,
    },
    "classic": {
        "title": "Quantum Merlin Classic — Numerology & Astrology Tools",
        "description": "Access the full suite of Quantum Merlin classic tools. Life path calculator, zodiac readings, tarot, compatibility analysis, forecasts, and 50+ spiritual tools.",
        "keywords": "numerology tools, astrology calculator, life path, zodiac reading, tarot reading, compatibility, spiritual tools, quantum merlin classic",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "Expand": {
        "title": "Expand — Quantum Frequency & Spiritual Growth Tools | Quantum Merlin",
        "description": "Expand your consciousness with quantum frequency tools, gematria calculators, sacred geometry generators, angel numbers, astrology, and manifestation assessments.",
        "keywords": "quantum frequency, spiritual growth, gematria, sacred geometry, angel numbers, manifestation, consciousness expansion, quantum merlin",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "kosmickpop": {
        "title": "KosmickPop — K-Pop Cosmic Energy & Numerology | Quantum Merlin",
        "description": "Discover your K-Pop cosmic energy! Bias energy readings, idol charts, archetype quizzes, comeback energy predictions, and numerology for K-Pop fans.",
        "keywords": "kpop numerology, kpop astrology, bias energy, idol chart, kpop quiz, comeback energy, kpop cosmic, kosmickpop, quantum merlin",
        "json_ld_type": "WebApplication",
        "json_ld_category": "EntertainmentApplication",
    },
    "kpop": {
        "title": "K-Pop Kosmic — Spiritual Tools for K-Pop Fans | Quantum Merlin",
        "description": "K-Pop themed spiritual tools! Numerology, astrology, tarot, compatibility, and cosmic forecasts designed for K-Pop fans. Band builder, squad chemistry, and more.",
        "keywords": "kpop spiritual tools, kpop numerology, kpop astrology, kpop compatibility, band builder, squad chemistry, kpop kosmic, quantum merlin",
        "json_ld_type": "WebApplication",
        "json_ld_category": "EntertainmentApplication",
    },
}

# Skip patterns
SKIP_FILES = {
    "test_modal.html", "test-astronomy.html", "test-may3.html", "test-moon-calc.html",
    "debug-life-path.html", "customer-welcome-email.html", "etsy-delivery-template.html",
    "reading-loading.html", "reading-result.html", "1111_logo_concepts.html",
    "email-capture.html", "depth-enhancement-guide.html", "welcome-flow.html",
}


def has_tag(content, pattern):
    """Check if a tag exists in the head section (first 8000 chars)."""
    return bool(re.search(pattern, content[:8000], re.IGNORECASE))


def get_title_from_html(content):
    """Extract existing title from HTML."""
    match = re.search(r'<title[^>]*>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
    return match.group(1).strip() if match else ""


def get_description_from_html(content):
    """Extract existing description from HTML."""
    match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', content[:8000], re.IGNORECASE)
    return match.group(1).strip() if match else ""


def humanize_filename(filename):
    """Convert filename to a readable title."""
    name = filename.replace('.html', '').replace('-', ' ').replace('_', ' ')
    name = re.sub(r'\b(kpop|qm)\b', '', name, flags=re.IGNORECASE).strip()
    return name.title()


def get_seo_data_for_file(filepath, folder_name):
    """Generate appropriate SEO data for a file."""
    filename = os.path.basename(filepath)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Get existing title and description
    existing_title = get_title_from_html(content)
    existing_desc = get_description_from_html(content)
    
    # Build relative URL path
    rel_path = os.path.relpath(filepath, BASE_DIR).replace('\\', '/')
    url_path = rel_path.replace('.html', '').replace('/index', '')
    canonical_url = f"{BASE_URL}/{url_path}"
    
    # Use existing title or generate one
    title = existing_title if existing_title else f"{humanize_filename(filename)} | Quantum Merlin"
    
    # Use existing description or generate one
    if existing_desc:
        description = existing_desc
    else:
        readable = humanize_filename(filename)
        description = f"Explore {readable} — a free interactive spiritual tool by Quantum Merlin. Discover cosmic insights through numerology, astrology, and quantum frequencies."
    
    # Determine image based on folder
    og_image = f"{BASE_URL}/assets/tarot/QMTarot.png"
    if folder_name in ("kpop",):
        og_image = f"{BASE_URL}/kpop/kpop.jpg"
    elif folder_name in ("kosmickpop",):
        og_image = f"{BASE_URL}/kosmickpop/kpop.jpg"
    elif folder_name == "classic":
        og_image = f"{BASE_URL}/classic/RetroMerlin.jpg"
    
    # Determine keywords based on folder
    keywords_base = "quantum merlin, spiritual tools"
    if folder_name in ("kpop", "kosmickpop"):
        keywords_base = "kpop, numerology, astrology, spiritual tools, quantum merlin"
    elif folder_name == "classic":
        keywords_base = "numerology, astrology, tarot, spiritual tools, quantum merlin"
    elif folder_name == "Expand":
        keywords_base = "quantum frequency, gematria, sacred geometry, quantum merlin"
    
    return {
        "title": title,
        "description": description,
        "keywords": keywords_base,
        "canonical": canonical_url,
        "og_image": og_image,
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    }


def inject_seo(filepath, data):
    """Inject missing SEO tags into a file. Returns list of changes made."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = []
    
    # Skip Jinja2 templates
    if '{%' in content[:500]:
        return ["SKIPPED (Jinja2 template)"]
    
    # Skip non-HTML files (fragments)
    if '<!DOCTYPE' not in content[:200] and '<html' not in content[:200]:
        return ["SKIPPED (not standalone HTML)"]
    
    # Must have a <head> section
    if not re.search(r'</head>', content, re.IGNORECASE):
        return ["SKIPPED (no </head>)"]
    
    # 1. Add description if missing
    if not has_tag(content, r'<meta\s+name=["\']description'):
        title_match = re.search(r'(<title[^>]*>.*?</title>)', content, re.DOTALL)
        if title_match:
            content = content.replace(
                title_match.group(0),
                title_match.group(0) + f'\n    <meta name="description" content="{data["description"]}">',
                1
            )
            changes.append("description")
    
    # 2. Add keywords if missing
    if not has_tag(content, r'<meta\s+name=["\']keywords'):
        desc_match = re.search(r'(<meta\s+name=["\']description["\'][^>]*>)', content)
        if desc_match:
            content = content.replace(
                desc_match.group(0),
                desc_match.group(0) + f'\n    <meta name="keywords" content="{data["keywords"]}">',
                1
            )
            changes.append("keywords")
    
    # 3. Add author if missing
    if not has_tag(content, r'<meta\s+name=["\']author'):
        # Find last meta tag in head to insert after
        kw_match = re.search(r'(<meta\s+name=["\']keywords["\'][^>]*>)', content)
        desc_match = re.search(r'(<meta\s+name=["\']description["\'][^>]*>)', content)
        anchor = kw_match or desc_match
        if anchor:
            content = content.replace(
                anchor.group(0),
                anchor.group(0) + '\n    <meta name="author" content="Quantum Merlin">',
                1
            )
            changes.append("author")
    
    # 4. Add robots if missing
    if not has_tag(content, r'<meta\s+name=["\']robots'):
        author_match = re.search(r'(<meta\s+name=["\']author["\'][^>]*>)', content)
        if author_match:
            content = content.replace(
                author_match.group(0),
                author_match.group(0) + '\n    <meta name="robots" content="index, follow">',
                1
            )
            changes.append("robots")
    
    # 5. Add canonical if missing
    if not has_tag(content, r'<link\s+rel=["\']canonical'):
        robots_match = re.search(r'(<meta\s+name=["\']robots["\'][^>]*>)', content)
        author_match = re.search(r'(<meta\s+name=["\']author["\'][^>]*>)', content)
        anchor = robots_match or author_match
        if anchor:
            content = content.replace(
                anchor.group(0),
                anchor.group(0) + f'\n    <link rel="canonical" href="{data["canonical"]}">',
                1
            )
            changes.append("canonical")
    
    # 6. Add OG tags if missing
    if not has_tag(content, r'<meta\s+property=["\']og:title'):
        og_block = f'''
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{data['canonical']}">
    <meta property="og:title" content="{data['title']}">
    <meta property="og:description" content="{data['description']}">
    <meta property="og:image" content="{data['og_image']}">
    <meta property="og:site_name" content="Quantum Merlin">
    <meta property="og:locale" content="en_US">'''
        
        head_end = re.search(r'(</head>)', content, re.IGNORECASE)
        if head_end:
            content = content[:head_end.start()] + og_block + '\n' + content[head_end.start():]
            changes.append("OG")
    else:
        # Patch missing OG sub-tags
        if not has_tag(content, r'<meta\s+property=["\']og:site_name'):
            last_og = list(re.finditer(r'(<meta\s+property=["\']og:[^"\']*["\'][^>]*>)', content[:8000]))
            if last_og:
                pos = last_og[-1].end()
                content = content[:pos] + '\n    <meta property="og:site_name" content="Quantum Merlin">' + content[pos:]
                changes.append("og:site_name")
        if not has_tag(content, r'<meta\s+property=["\']og:image'):
            last_og = list(re.finditer(r'(<meta\s+property=["\']og:[^"\']*["\'][^>]*>)', content[:8000]))
            if last_og:
                pos = last_og[-1].end()
                content = content[:pos] + f'\n    <meta property="og:image" content="{data["og_image"]}">' + content[pos:]
                changes.append("og:image")
        if not has_tag(content, r'<meta\s+property=["\']og:url'):
            og_title = re.search(r'(<meta\s+property=["\']og:title["\'][^>]*>)', content[:8000])
            if og_title:
                content = content.replace(
                    og_title.group(0),
                    f'<meta property="og:url" content="{data["canonical"]}">\n    ' + og_title.group(0),
                    1
                )
                changes.append("og:url")
    
    # 7. Add Twitter Card if missing
    if not has_tag(content, r'<meta\s+name=["\']twitter:card'):
        twitter_block = f'''
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{data['title']}">
    <meta name="twitter:description" content="{data['description']}">
    <meta name="twitter:image" content="{data['og_image']}">'''
        
        last_og = list(re.finditer(r'(<meta\s+property=["\']og:[^"\']*["\'][^>]*>)', content[:8000]))
        if last_og:
            pos = last_og[-1].end()
            content = content[:pos] + twitter_block + content[pos:]
        else:
            head_end = re.search(r'(</head>)', content, re.IGNORECASE)
            if head_end:
                content = content[:head_end.start()] + twitter_block + '\n' + content[head_end.start():]
        changes.append("Twitter")
    
    # 8. Add JSON-LD if missing
    if not has_tag(content, r'application/ld\+json'):
        ld_type = data.get("json_ld_type", "WebPage")
        ld_cat = data.get("json_ld_category")
        
        ld_lines = [
            '',
            '    <!-- Structured Data -->',
            '    <script type="application/ld+json">',
            '    {',
            '      "@context": "https://schema.org",',
            f'      "@type": "{ld_type}",',
            f'      "name": "{data["title"]}",',
            f'      "description": "{data["description"]}",',
            f'      "url": "{data["canonical"]}",',
        ]
        
        if ld_type == "WebApplication" and ld_cat:
            ld_lines.append(f'      "applicationCategory": "{ld_cat}",')
            ld_lines.append('      "operatingSystem": "Any",')
            ld_lines.append('      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },')
        
        ld_lines.append('      "author": { "@type": "Person", "name": "Quantum Merlin" }')
        ld_lines.append('    }')
        ld_lines.append('    </script>')
        
        ld_block = '\n'.join(ld_lines)
        
        head_end = re.search(r'(</head>)', content, re.IGNORECASE)
        if head_end:
            content = content[:head_end.start()] + ld_block + '\n' + content[head_end.start():]
            changes.append("JSON-LD")
    
    # Write if changed
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
    
    return changes


def process_folder(folder_name):
    """Process all HTML files in a subfolder."""
    folder_path = os.path.join(BASE_DIR, folder_name)
    if not os.path.isdir(folder_path):
        print(f"  ⚠  Folder {folder_name}/ not found")
        return 0
    
    html_files = glob.glob(os.path.join(folder_path, '*.html'))
    html_files.sort()
    
    if not html_files:
        print(f"  ⚠  No HTML files in {folder_name}/")
        return 0
    
    total_changes = 0
    files_changed = 0
    
    for filepath in html_files:
        filename = os.path.basename(filepath)
        
        # Skip test/debug files
        if filename in SKIP_FILES:
            continue
        
        # Generate SEO data
        if filename == 'index.html' and folder_name in INDEX_OVERRIDES:
            data = INDEX_OVERRIDES[folder_name].copy()
            data.setdefault("canonical", f"{BASE_URL}/{folder_name}")
            data.setdefault("og_image", f"{BASE_URL}/assets/tarot/QMTarot.png")
            if folder_name in ("kpop",):
                data["og_image"] = f"{BASE_URL}/kpop/kpop.jpg"
            elif folder_name in ("kosmickpop",):
                data["og_image"] = f"{BASE_URL}/kosmickpop/kpop.jpg"
            elif folder_name == "classic":
                data["og_image"] = f"{BASE_URL}/classic/RetroMerlin.jpg"
        else:
            data = get_seo_data_for_file(filepath, folder_name)
        
        changes = inject_seo(filepath, data)
        
        if changes and changes[0].startswith("SKIPPED"):
            continue
        
        if changes:
            total_changes += len(changes)
            files_changed += 1
            if len(changes) <= 3:
                print(f"    ✅ {filename} — {', '.join(changes)}")
            else:
                print(f"    ✅ {filename} — {len(changes)} tags added")
        # Don't print already-optimized to reduce noise
    
    return total_changes


def main():
    folders = [
        "soulblueprint",
        "lifestrategy",
        "ultimate",
        "qrcodes-science",
        "classic",
        "Expand",
        "kosmickpop",
        "kpop",
    ]
    
    grand_total = 0
    
    print("=" * 60)
    print("  Quantum Merlin SEO — Subfolder Apps")
    print("=" * 60)
    
    for folder in folders:
        print(f"\n  📁 {folder}/")
        changes = process_folder(folder)
        grand_total += changes
        if changes == 0:
            print(f"    ✔  All files already optimized")
        else:
            print(f"    → {changes} tags added")
    
    print("\n" + "=" * 60)
    print(f"  Grand Total: {grand_total} SEO tags added")
    print("=" * 60)


if __name__ == "__main__":
    main()
