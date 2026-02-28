"""
Move AdSense <script> tag below <meta charset> on all pages.

The AdSense auto-ad script currently loads before charset is declared on 370+ pages,
which causes the browser to parse the script before knowing the character encoding.

Usage: python scripts/fix-adsense-order.py
       python scripts/fix-adsense-order.py --dry-run
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
ADSENSE_TAG = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3480541530392777" crossorigin="anonymous"></script>'

def fix_file(filepath: Path, dry_run: bool = False) -> bool:
    """Move AdSense script below charset if it appears before it. Returns True if fixed."""
    try:
        content = filepath.read_text(encoding='utf-8', errors='ignore')
    except Exception:
        return False
    
    # Only fix if AdSense appears before charset
    adsense_pos = content.find('adsbygoogle')
    charset_pos = content.find('<meta charset')
    
    if adsense_pos == -1 or charset_pos == -1:
        return False
    
    if adsense_pos > charset_pos:
        return False  # Already in correct order
    
    # Pattern: AdSense line appears right after <head> and before charset
    # We need to remove it from its current position and add it after viewport
    
    # Find the full AdSense line
    adsense_pattern = r'[ \t]*<script async src="https://pagead2\.googlesyndication\.com/pagead/js/adsbygoogle\.js\?client=ca-pub-3480541530392777"[^>]*></script>\s*\n?'
    match = re.search(adsense_pattern, content)
    if not match:
        return False
    
    adsense_line = match.group(0)
    
    # Remove AdSense from current position
    new_content = content[:match.start()] + content[match.end():]
    
    # Find where to insert it (after viewport meta, or after charset if no viewport)
    viewport_match = re.search(r'(<meta name="viewport"[^>]*>)\s*\n', new_content)
    charset_match = re.search(r'(<meta charset="[^"]*">)\s*\n', new_content)
    
    if viewport_match:
        insert_pos = viewport_match.end()
    elif charset_match:
        insert_pos = charset_match.end()
    else:
        return False
    
    # Determine indentation from context
    indent = "    "
    
    new_content = (
        new_content[:insert_pos] +
        f"\n{indent}<!-- Google AdSense -->\n{indent}{ADSENSE_TAG}\n" +
        new_content[insert_pos:]
    )
    
    if not dry_run:
        filepath.write_text(new_content, encoding='utf-8')
    
    return True

def main():
    dry_run = '--dry-run' in sys.argv
    
    if dry_run:
        print("=== DRY RUN ===\n")
    
    fixed = 0
    scanned = 0
    
    for html_file in sorted(ROOT.rglob('*.html')):
        rel = str(html_file.relative_to(ROOT))
        if '.git' in rel or 'node_modules' in rel:
            continue
        scanned += 1
        if fix_file(html_file, dry_run):
            fixed += 1
            print(f"  [FIXED] {rel}")
    
    print(f"\nScanned: {scanned} | Fixed: {fixed}")

if __name__ == '__main__':
    main()
