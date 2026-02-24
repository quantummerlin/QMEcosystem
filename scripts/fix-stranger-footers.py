"""Fix Stranger footer and back-links that incorrectly point to /soulblueprint/.

All internal links in stranger/ pages should point to /stranger/ paths,
not /soulblueprint/ paths. The four legal pages exist in stranger/:
  about.html, privacy.html, terms.html, disclaimer.html

Also fixes back-links that say "Back to A Moment in Time" or "Back to Soul Blueprint"
and changes them to "Back to Stranger Patterns".
"""

import os
import re
import sys

REPLACEMENTS = [
    # Footer and inline links
    (r'/soulblueprint/about\.html', '/stranger/about.html'),
    (r'/soulblueprint/privacy\.html', '/stranger/privacy.html'),
    (r'/soulblueprint/terms\.html', '/stranger/terms.html'),
    (r'/soulblueprint/disclaimer\.html', '/stranger/disclaimer.html'),
    # Back links to brand root
    (r'href="/soulblueprint/"', 'href="/stranger/"'),
    (r'href="/soulblueprint"', 'href="/stranger/"'),
    # Fix text labels
    (r'Back to A Moment in Time', 'Back to Stranger Patterns'),
    (r'Back to Soul Blueprint', 'Back to Stranger Patterns'),
]

SKIP_DIRS = {'node_modules', '.git', '_site'}


def fix_stranger_links(root_dir, dry_run=False):
    stranger_dir = os.path.join(root_dir, 'stranger')
    if not os.path.isdir(stranger_dir):
        print("ERROR: stranger/ directory not found")
        return 0
    
    total_fixed = 0
    
    for dirpath, dirnames, filenames in os.walk(stranger_dir):
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
            
            for pattern, replacement in REPLACEMENTS:
                content = re.sub(pattern, replacement, content)
            
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
    print(f"=== Stranger Footer Fix ({mode}) ===\n")
    
    count = fix_stranger_links(root, dry_run)
    print(f"\nTotal files fixed: {count}")
