#!/usr/bin/env python3
"""
Add K-Pop Cosmos Slay Effects to all reading pages
Adds sparkle cursor, floating particles, and visual polish
"""

import os
import re
from pathlib import Path

SKIP_FILES = {
    'tools_index.html',  # Already has effects inline
    'welcome-flow.html',
    'advertise.html',
    'index.html',
}

def add_slay_effects(filepath):
    """Add slay effects CSS and JS to a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return False
    
    # Skip if already has slay effects
    if 'slay-effects.css' in content:
        return False
    
    original = content
    
    # Add CSS link after quantum-merlin-styles.css
    css_pattern = r'(<link rel="stylesheet" href="quantum-merlin-styles\.css"[^>]*>)'
    css_replacement = r'\1\n    <link rel="stylesheet" href="slay-effects.css">'
    content = re.sub(css_pattern, css_replacement, content)
    
    # Add JS before closing body tag
    js_insert = '''
    <!-- K-Pop Cosmos Slay Effects -->
    <script src="slay-effects.js"></script>
</body>'''
    content = content.replace('</body>', js_insert)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    """Process all HTML files"""
    kpop_dir = Path(__file__).parent
    
    processed = 0
    modified = 0
    
    for filepath in kpop_dir.glob('*.html'):
        filename = filepath.name
        
        if filename in SKIP_FILES:
            continue
        
        # Only process reading/calculator pages
        if not any(x in filename for x in ['calculator', 'reading', 'forecast', 'fortune', 'test', 'progress', 'countdown', 'oracle', 'crystal', 'moon-phase', 'lucky', 'zodiac']):
            continue
        
        processed += 1
        if add_slay_effects(filepath):
            modified += 1
            print(f"✨ Added effects: {filename}")
        else:
            print(f"⏭️  Skipped: {filename}")
    
    print(f"\n💜 Slay Effects Applied!")
    print(f"📁 Files processed: {processed}")
    print(f"✨ Files modified: {modified}")

if __name__ == '__main__':
    main()
