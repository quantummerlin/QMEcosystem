"""Inject the cross-brand Explore component into all HTML pages.

Adds <script src="/shared/js/quantum-explore.js" defer></script>
before the closing </body> tag, similar to the Etsy CTA injector.

Skips pages that already have it, and skips certain directories.
"""

import os
import re
import sys

SCRIPT_TAG = '<script src="/shared/js/quantum-explore.js" defer></script>'
MARKER = 'quantum-explore.js'

SKIP_DIRS = {
    'node_modules', '.git', '_site', 'gravity7', 
    'agents', 'scripts', 'shared', 'cloudflare',
    'tools',  # embeddable widgets — no explore bar needed
}

SKIP_FILES = {
    'manifest.html', 'generate-icons.html', 'FULL-READING-TEMPLATE.html',
    'reading-template.html', 'offline.html', 'sw.js',
}


def should_skip(rel_path):
    """Check if file should be skipped."""
    parts = rel_path.replace('\\', '/').split('/')
    # Skip if any directory component is in SKIP_DIRS
    for part in parts[:-1]:
        if part in SKIP_DIRS:
            return True
    fname = parts[-1]
    if fname in SKIP_FILES:
        return True
    # Skip backup/test/template files
    if any(x in fname.lower() for x in ['backup', 'test-', 'debug-', 'template', 'advertise']):
        return True
    return False


def inject_explore(root_dir, dry_run=False):
    scanned = 0
    injected = 0
    skipped_already = 0
    skipped_dir = 0
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        
        for fname in filenames:
            if not fname.endswith('.html'):
                continue
            
            fpath = os.path.join(dirpath, fname)
            rel = os.path.relpath(fpath, root_dir)
            scanned += 1
            
            if should_skip(rel):
                skipped_dir += 1
                continue
            
            try:
                with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
            except Exception:
                continue
            
            # Already has explore component
            if MARKER in content:
                skipped_already += 1
                continue
            
            # Must have a </body> to inject before
            if '</body>' not in content.lower():
                continue
            
            # Inject before </body>
            new_content = re.sub(
                r'(</body>)',
                f'\n{SCRIPT_TAG}\n\\1',
                content,
                count=1,
                flags=re.IGNORECASE
            )
            
            if new_content != content:
                injected += 1
                if not dry_run:
                    with open(fpath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
    
    return scanned, injected, skipped_already, skipped_dir


if __name__ == '__main__':
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dry_run = '--dry-run' in sys.argv
    
    mode = "DRY RUN" if dry_run else "APPLYING"
    print(f"=== Explore Component Injection ({mode}) ===\n")
    
    scanned, injected, already, skipped = inject_explore(root, dry_run)
    
    print(f"\nScanned:  {scanned}")
    print(f"Injected: {injected}")
    print(f"Already:  {already}")
    print(f"Skipped:  {skipped}")
