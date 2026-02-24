"""Inject the email capture component into brand landing and key tool pages.

More selective than the explore/etsy injectors — targets index pages,
tool index pages, and high-traffic tools, not every single page.

Adds <script src="/shared/js/quantum-email-capture.js" defer></script>
before the closing </body> tag.
"""

import os
import re
import sys

SCRIPT_TAG = '<script src="/shared/js/quantum-email-capture.js" defer></script>'
MARKER = 'quantum-email-capture.js'

# Pages that should get email capture
# Pattern: brand index pages, tool indexes, forecast pages, and root tools
TARGET_FILENAMES = {
    'index.html', 'index-enhanced.html', 'tools_index.html',
    'forecasts.html', 'compatibility.html', 'compatabilty.html',
    'angel-number-calculator.html', 'angel-number-full-reading.html',
    'birth-sigil.html', 'soulcard.html', 'hub.html',
    'library.html', 'quantum-rose.html',
    'reading-generator.html', 'hidden-strengths-revealer.html',
}

# Directories that should have their index pages targeted
TARGET_DIRS = {
    '.', 'soulblueprint', 'amomentintime', 'stranger', 'kpop',
    'kosmickpop', 'genesis', '40hz', 'classic', 'ultimate',
    'gravity', 'lifestrategy', 'quantum-merlin-hub', 'Expand',
}

SKIP_DIRS = {'node_modules', '.git', '_site', 'gravity7', 'agents', 'scripts', 'shared', 'cloudflare', 'tools'}


def should_target(rel_path):
    """Check if this file should get the email capture."""
    parts = rel_path.replace('\\', '/').split('/')
    fname = parts[-1]
    
    # Skip if in excluded dirs
    for part in parts[:-1]:
        if part in SKIP_DIRS:
            return False
    
    # Skip backups/test/debug
    if any(x in fname.lower() for x in ['backup', 'test-', 'debug-', 'template', 'advertise']):
        return False
    
    # Target: known high-value filenames
    if fname in TARGET_FILENAMES:
        return True
    
    # Target: index pages in known brand directories
    parent = parts[-2] if len(parts) > 1 else '.'
    if parent in TARGET_DIRS and fname in ('index.html', 'tools_index.html', 'index-enhanced.html'):
        return True
    
    # Target: forecast pages in any brand
    if 'forecast' in fname.lower() and fname.endswith('.html'):
        return True
    
    return False


def inject_email(root_dir, dry_run=False):
    scanned = 0
    injected = 0
    skipped_already = 0
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        
        for fname in filenames:
            if not fname.endswith('.html'):
                continue
            
            fpath = os.path.join(dirpath, fname)
            rel = os.path.relpath(fpath, root_dir)
            scanned += 1
            
            if not should_target(rel):
                continue
            
            try:
                with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
            except Exception:
                continue
            
            if MARKER in content:
                skipped_already += 1
                continue
            
            if '</body>' not in content.lower():
                continue
            
            new_content = re.sub(
                r'(</body>)',
                f'\n{SCRIPT_TAG}\n\\1',
                content,
                count=1,
                flags=re.IGNORECASE
            )
            
            if new_content != content:
                injected += 1
                suffix = " (dry)" if dry_run else ""
                print(f"  INJECT{suffix}: {rel}")
                if not dry_run:
                    with open(fpath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
    
    return scanned, injected, skipped_already


if __name__ == '__main__':
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dry_run = '--dry-run' in sys.argv
    
    mode = "DRY RUN" if dry_run else "APPLYING"
    print(f"=== Email Capture Injection ({mode}) ===\n")
    
    scanned, injected, already = inject_email(root, dry_run)
    
    print(f"\nScanned:  {scanned}")
    print(f"Injected: {injected}")
    print(f"Already:  {already}")
