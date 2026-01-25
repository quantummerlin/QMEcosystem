"""
Add K-Pop Progressive Journey tracking to all tool pages.
This script adds the progress tracking scripts to individual reading tools.
"""

import os
import glob
import re

KPOP_DIR = r"c:\Users\WIPED\QMEcosystem\kpop"

# Scripts to add (relative to kpop folder)
PROGRESS_SCRIPTS = '''
    <!-- K-Pop Progressive Journey Tracking -->
    <script src="kpop-progress.js?v=20260126"></script>
    <script src="kpop-tool-complete.js?v=20260126"></script>'''

# Pages to skip (not reading tools)
SKIP_FILES = [
    'tools_index.html',
    'index.html',
    'privacy.html',
    'terms.html',
    'disclaimer.html',
    'advertise.html',
    'welcome-flow.html',
    'reading-loading.html',
    'reading-result.html',
    'test-astronomy.html',
    'test-may3.html',
    'test-moon-calc.html',
    'debug-life-path.html'
]

def add_progress_tracking(html_file):
    """Add progress tracking scripts to an HTML file."""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already has progress tracking
    if 'kpop-progress.js' in content:
        print(f"  Skipped (already has progress): {os.path.basename(html_file)}")
        return False
    
    # Find the closing </body> tag and insert before it
    if '</body>' in content:
        # Insert before </body>
        new_content = content.replace(
            '</body>',
            f'{PROGRESS_SCRIPTS}\n</body>'
        )
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"  Added progress tracking: {os.path.basename(html_file)}")
        return True
    else:
        print(f"  Warning: No </body> found in {os.path.basename(html_file)}")
        return False

def main():
    print("=" * 60)
    print("K-Pop Progressive Journey - Adding tracking to tools")
    print("=" * 60)
    
    # Find all HTML files
    html_files = glob.glob(os.path.join(KPOP_DIR, "*.html"))
    
    updated = 0
    skipped = 0
    
    for html_file in sorted(html_files):
        filename = os.path.basename(html_file)
        
        # Skip non-tool pages
        if filename in SKIP_FILES:
            print(f"  Skipped (not a tool): {filename}")
            skipped += 1
            continue
        
        if add_progress_tracking(html_file):
            updated += 1
    
    print("=" * 60)
    print(f"Complete! Updated: {updated}, Skipped: {skipped}")
    print("=" * 60)

if __name__ == "__main__":
    main()
