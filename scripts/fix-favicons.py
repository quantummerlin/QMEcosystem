"""Fix favicon mismatches in soulblueprint and 40hz brands.

soulblueprint: uses Amomentintime.jpg → should use favicon.svg
40hz: uses Genesis.png for favicon → should use favicon.svg

Only fixes <link rel="icon"> and <link rel="apple-touch-icon"> tags.
OG images are left alone (they need raster images, not SVGs).
"""

import os
import re
import sys

FIXES = {
    'soulblueprint': {
        'old_favicon': 'Amomentintime.jpg',
        'new_favicon': 'favicon.svg',
        'new_type': 'image/svg+xml',
    },
    '40hz': {
        'old_favicon': 'Genesis.png',
        'new_favicon': 'favicon.svg',
        'new_type': 'image/svg+xml',
    },
}

SKIP_DIRS = {'node_modules', '.git', '_site', 'gravity7'}

def fix_favicons(root_dir, dry_run=False):
    total_fixed = 0
    
    for brand, config in FIXES.items():
        brand_dir = os.path.join(root_dir, brand)
        if not os.path.isdir(brand_dir):
            print(f"  SKIP: {brand}/ not found")
            continue
        
        old = config['old_favicon']
        new = config['new_favicon']
        new_type = config['new_type']
        
        for dirpath, dirnames, filenames in os.walk(brand_dir):
            dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
            
            for fname in filenames:
                if not fname.endswith('.html'):
                    continue
                
                fpath = os.path.join(dirpath, fname)
                rel = os.path.relpath(fpath, root_dir)
                
                try:
                    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                except Exception:
                    continue
                
                original = content
                changes = []
                
                # Fix <link rel="icon" ...href="OLD_FAVICON...">
                # Match with or without version params like ?v=1
                pattern_icon = re.compile(
                    r'(<link\s+rel="(?:icon|shortcut icon)"[^>]*?)type="[^"]*"([^>]*?)href="[^"]*?' + re.escape(old) + r'[^"]*"',
                    re.IGNORECASE
                )
                for m in pattern_icon.finditer(content):
                    changes.append(f'  icon link: {old} → {new}')
                
                # Simple replacement approach - replace the old filename in icon/apple-touch-icon link tags
                # Pattern: <link rel="icon" ... href="...Amomentintime.jpg...">
                def replace_icon_href(match):
                    tag = match.group(0)
                    # Replace old favicon name (with any path prefix and version suffix)
                    tag = re.sub(
                        r'href="([^"]*?)' + re.escape(old) + r'[^"]*"',
                        f'href="\\1{new}"',
                        tag
                    )
                    # Replace type if present
                    tag = re.sub(
                        r'type="[^"]*"',
                        f'type="{new_type}"',
                        tag
                    )
                    # Remove sizes (SVG is scalable)
                    tag = re.sub(r'\s+sizes="[^"]*"', '', tag)
                    return tag
                
                # Fix <link rel="icon" ...>
                content = re.sub(
                    r'<link\s+rel="(?:icon|shortcut icon)"[^>]*?' + re.escape(old) + r'[^>]*>',
                    replace_icon_href,
                    content,
                    flags=re.IGNORECASE
                )
                
                # Fix <link rel="apple-touch-icon" ...>
                content = re.sub(
                    r'<link\s+rel="apple-touch-icon"[^>]*?' + re.escape(old) + r'[^>]*>',
                    lambda m: re.sub(
                        r'href="([^"]*?)' + re.escape(old) + r'[^"]*"',
                        f'href="\\1{new}"',
                        re.sub(r'\s+sizes="[^"]*"', '', m.group(0))
                    ),
                    content,
                    flags=re.IGNORECASE
                )
                
                if content != original:
                    total_fixed += 1
                    print(f"  FIX: {rel}")
                    if not dry_run:
                        with open(fpath, 'w', encoding='utf-8') as f:
                            f.write(content)
    
    return total_fixed

if __name__ == '__main__':
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dry_run = '--dry-run' in sys.argv
    
    mode = "DRY RUN" if dry_run else "APPLYING"
    print(f"=== Favicon Fix ({mode}) ===\n")
    
    count = fix_favicons(root, dry_run)
    print(f"\nTotal files fixed: {count}")
