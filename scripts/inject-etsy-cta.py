#!/usr/bin/env python3
"""
Batch-inject the Etsy CTA script tag into HTML pages that don't already have it.

The script adds:
    <script src="<relative>/shared/js/quantum-etsy-cta.js" defer></script>

just before the closing </body> tag.

Usage:
    python scripts/inject-etsy-cta.py --dry-run   # preview changes
    python scripts/inject-etsy-cta.py              # apply changes
"""

import os
import re
import sys
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Files/dirs to skip
SKIP_DIRS = {
    'node_modules', '.git', 'backups', 'Expand', 'Genesis.QuantumMerlin',
    'gravity7', 'quantum-merlin-hub', 'shared', 'scripts', 'agents',
    '.github', 'venv', '__pycache__'
}

SKIP_FILES = {
    'FULL-READING-TEMPLATE.html', 'reading-template.html', 'offline.html',
    'generate-icons.html', 'animation.html', 'manifest.html',
    'etsy-delivery-template.html'
}

# Pages that already have Etsy links (soulblueprint has its own CTA placement)
SKIP_PATTERNS = [
    r'-backup',
    r'test-',
    r'debug-',
    r'index-old',
    r'index-local-backup',
    r'advertise\.html',
]

SCRIPT_MARKER = 'quantum-etsy-cta.js'

def should_skip(filepath):
    """Check if a file should be skipped."""
    basename = os.path.basename(filepath)
    relpath = os.path.relpath(filepath, ROOT).replace('\\', '/')

    # Skip specific files
    if basename in SKIP_FILES:
        return True

    # Skip directories
    parts = relpath.split('/')
    for part in parts:
        if part in SKIP_DIRS:
            return True

    # Skip patterns
    for pattern in SKIP_PATTERNS:
        if re.search(pattern, basename, re.IGNORECASE):
            return True

    # Skip soulblueprint (already has its own elaborate Etsy CTAs)
    if relpath.startswith('soulblueprint/'):
        return True

    # Skip etsy-tiles directories
    if 'etsy-tiles/' in relpath:
        return True

    return False


def get_relative_prefix(filepath):
    """Get the relative path prefix from file to root (where shared/ lives)."""
    relpath = os.path.relpath(filepath, ROOT).replace('\\', '/')
    depth = relpath.count('/')
    if depth == 0:
        return ''  # root-level file
    return '../' * depth


def inject_cta(filepath, dry_run=False):
    """Inject the Etsy CTA script tag into a single file. Returns True if modified."""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
    except Exception:
        return False

    # Already has CTA?
    if SCRIPT_MARKER in content:
        return False

    # Must have </body> to inject into
    if '</body>' not in content.lower():
        return False

    # Must have some interactive content (not just a template)
    if '<body' not in content.lower():
        return False

    prefix = get_relative_prefix(filepath)
    script_tag = f'    <script src="{prefix}shared/js/quantum-etsy-cta.js" defer></script>\n'

    # Insert just before </body>
    new_content = re.sub(
        r'([ \t]*</body>)',
        script_tag + r'\1',
        content,
        count=1,
        flags=re.IGNORECASE
    )

    if new_content == content:
        return False

    if not dry_run:
        with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
            f.write(new_content)

    return True


def main():
    dry_run = '--dry-run' in sys.argv
    if dry_run:
        print('[DRY RUN] No files will be modified.\n')

    # Collect all HTML files
    all_html = glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True)
    all_html += glob.glob(os.path.join(ROOT, '*.html'))  # root level

    # De-duplicate and sort
    all_html = sorted(set(os.path.normpath(f) for f in all_html))

    scanned = 0
    injected = 0
    skipped = 0

    for filepath in all_html:
        if should_skip(filepath):
            skipped += 1
            continue

        scanned += 1
        if inject_cta(filepath, dry_run):
            injected += 1
            rel = os.path.relpath(filepath, ROOT).replace('\\', '/')
            print(f'  {"[WOULD INJECT]" if dry_run else "[INJECTED]"} {rel}')

    print(f'\nScanned: {scanned} | Injected: {injected} | Skipped: {skipped}')
    if dry_run:
        print('Re-run without --dry-run to apply changes.')


if __name__ == '__main__':
    main()
