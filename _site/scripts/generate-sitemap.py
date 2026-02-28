"""
QMEcosystem Sitemap Generator
Crawls all HTML files and generates a comprehensive sitemap.xml

Usage: python scripts/generate-sitemap.py
"""

import os
import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).parent.parent
BASE_URL = "https://quantummerlin.com"
OUTPUT = ROOT / "sitemap.xml"

# Patterns to EXCLUDE from sitemap
EXCLUDE_PATTERNS = [
    r'backup',
    r'test-',
    r'debug-',
    r'-old-',
    r'old-backup',
    r'template\.html$',
    r'FULL-READING-TEMPLATE',
    r'node_modules',
    r'\.git[/\\]',
    r'Genesis\.QuantumMerlin',  # Duplicate of genesis/
    r'gravity7[/\\]',           # Duplicate of gravity/
    r'Expand[/\\]',             # Abandoned prototype
    r'etsy-delivery',           # Internal templates
    r'etsy-image-picker',       # Internal tool
    r'customer-welcome',        # Email templates
    r'clear\.html',             # Utility pages
    r'generate-icons',          # Dev tools
    r'soulcard-old',            # Old backup
    r'index-local-backup',
    r'index-old-chinesezodiac',
    r'compare\.ps1',
    r'offline\.html',           # PWA offline fallback
    r'animation\.html',         # Dev/test
    r'manifest\.html',          # Dev view
    r'reading-template\.html',  # Template, not content
    r'reading-generator\.html', # Generator tool
    r'genesis[/\\]genesis[/\\]', # Nested duplicate
    r'classic[/\\]genesis[/\\]', # Nested duplicate
    r'Widgets[/\\]',            # Flask app, separate deployment
    r'Reality codes[/\\]',      # Has spaces, likely dev
    r'quantum-merlin-hub[/\\]', # Hub pages (redirected)
    r'[/\\]s[/\\]',             # Short link pages (dynamic)
    r'[/\\]r[/\\]',             # Reading link pages (dynamic)
]

# Priority overrides (higher = more important)
HIGH_PRIORITY_PATTERNS = {
    r'^index\.html$': 1.0,
    r'^compatibility\.html$': 0.9,
    r'^soulcard\.html$': 0.9,
    r'^birth-sigil\.html$': 0.9,
    r'^forecasts\.html$': 0.9,
    r'^angel-number-calculator\.html$': 0.8,
    r'stranger[/\\]index\.html$': 0.9,
    r'soulblueprint[/\\]index\.html$': 0.9,
    r'amomentintime[/\\]index\.html$': 0.9,
    r'classic[/\\]': 0.7,
    r'kpop[/\\]': 0.7,
    r'kosmickpop[/\\]index\.html$': 0.8,
    r'genesis[/\\]index\.html$': 0.8,
    r'40hz[/\\]index\.html$': 0.8,
    r'stranger[/\\]': 0.7,
    r'soulblueprint[/\\]articles[/\\]': 0.6,
    r'hub\.html$': 0.8,
}

def should_exclude(rel_path: str) -> bool:
    """Check if a file should be excluded from the sitemap."""
    for pattern in EXCLUDE_PATTERNS:
        if re.search(pattern, rel_path, re.IGNORECASE):
            return True
    return False

def get_priority(rel_path: str) -> float:
    """Get the sitemap priority for a given path."""
    for pattern, priority in HIGH_PRIORITY_PATTERNS.items():
        if re.search(pattern, rel_path, re.IGNORECASE):
            return priority
    return 0.5

def get_changefreq(rel_path: str) -> str:
    """Estimate change frequency."""
    if 'forecast' in rel_path.lower():
        return 'daily'
    if 'index.html' in rel_path:
        return 'weekly'
    if 'articles/' in rel_path:
        return 'monthly'
    return 'weekly'

def path_to_url(rel_path: str) -> str:
    """Convert a relative file path to a URL."""
    # Normalize separators
    url_path = rel_path.replace('\\', '/')
    # Remove index.html for cleaner URLs (keep the slash)
    if url_path.endswith('/index.html'):
        url_path = url_path[:-10]  # Remove "index.html", keep trailing /
    elif url_path == 'index.html':
        url_path = ''
    return f"{BASE_URL}/{url_path}"

def generate_sitemap():
    """Generate the sitemap XML."""
    pages = []
    today = datetime.now().strftime('%Y-%m-%d')
    
    for html_file in ROOT.rglob('*.html'):
        rel_path = str(html_file.relative_to(ROOT))
        
        if should_exclude(rel_path):
            continue
        
        # Get file modification date
        try:
            mtime = datetime.fromtimestamp(html_file.stat().st_mtime)
            lastmod = mtime.strftime('%Y-%m-%d')
        except Exception:
            lastmod = today
        
        url = path_to_url(rel_path)
        priority = get_priority(rel_path)
        changefreq = get_changefreq(rel_path)
        
        pages.append({
            'url': url,
            'lastmod': lastmod,
            'changefreq': changefreq,
            'priority': priority,
        })
    
    # Sort by priority (desc) then URL (asc)
    pages.sort(key=lambda p: (-p['priority'], p['url']))
    
    # Generate XML
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    
    for page in pages:
        xml_lines.append('  <url>')
        xml_lines.append(f'    <loc>{page["url"]}</loc>')
        xml_lines.append(f'    <lastmod>{page["lastmod"]}</lastmod>')
        xml_lines.append(f'    <changefreq>{page["changefreq"]}</changefreq>')
        xml_lines.append(f'    <priority>{page["priority"]:.1f}</priority>')
        xml_lines.append('  </url>')
    
    xml_lines.append('</urlset>')
    xml_lines.append('')  # trailing newline
    
    # Write output
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        f.write('\n'.join(xml_lines))
    
    print(f"Sitemap generated: {OUTPUT}")
    print(f"Total URLs: {len(pages)}")
    print(f"High priority (>= 0.8): {sum(1 for p in pages if p['priority'] >= 0.8)}")
    print(f"Medium priority (0.5-0.7): {sum(1 for p in pages if 0.5 <= p['priority'] < 0.8)}")
    
    # Show top 20 entries
    print("\nTop 20 URLs:")
    for page in pages[:20]:
        print(f"  [{page['priority']:.1f}] {page['url']}")

if __name__ == '__main__':
    generate_sitemap()
