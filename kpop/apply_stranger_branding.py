#!/usr/bin/env python3
"""
Apply Stranger Patterns branding to all HTML files.
Updates colors, names, and styling from Quantum Merlin to Stranger Things theme.
"""

import os
import re
from pathlib import Path

# Files to skip (already updated)
SKIP_FILES = ['index.html', 'tools_index.html', 'apply_stranger_branding.py']

# Replacements to make
REPLACEMENTS = [
    # Meta theme colors
    (r'content="#bf5af2"', 'content="#FF4500"'),
    (r'content="#BF5AF2"', 'content="#FF4500"'),
    
    # App names
    ('content="Quantum Merlin"', 'content="Stranger Patterns"'),
    ('name="Quantum Merlin"', 'name="Stranger Patterns"'),
    
    # Apple touch icon
    ('href="RetroMerlin.jpg"', 'href="stranger.png"'),
    ('src="RetroMerlin.jpg"', 'src="stranger.png"'),
    
    # Canonical URLs
    ('/classic/', '/stranger/'),
    
    # Background colors in inline styles
    ('background: #0a0a0f', 'background: #0a0508'),
    ('background:#0a0a0f', 'background:#0a0508'),
    ('#0a0a14', '#0a0508'),
    ('#1a1a2e', '#1a0a0f'),
    
    # Old purple/cyan colors to red/orange
    ('rgba(139, 92, 246,', 'rgba(220, 20, 60,'),  # Purple to crimson
    ('rgba(6, 182, 212,', 'rgba(255, 69, 0,'),    # Cyan to orange-red
    ('rgba(191, 90, 242,', 'rgba(220, 20, 60,'),  # Magenta to crimson
    ('rgba(0, 245, 255,', 'rgba(255, 69, 0,'),    # Tron cyan to orange
    ('rgba(255, 0, 255,', 'rgba(220, 20, 60,'),   # Magenta to crimson
    ('rgba(0, 255, 255,', 'rgba(255, 69, 0,'),    # Cyan to orange
    
    # Solid colors
    ('#bf5af2', '#DC143C'),  # Purple to crimson
    ('#BF5AF2', '#DC143C'),
    ('#06b6d4', '#FF4500'),  # Cyan to orange-red
    ('#06B6D4', '#FF4500'),
    ('#00f5ff', '#FF4500'),  # Tron cyan to orange
    ('#00F5FF', '#FF4500'),
    ('#ff00ff', '#DC143C'),  # Magenta to crimson
    ('#FF00FF', '#DC143C'),
    ('#00ffff', '#FF4500'),  # Cyan to orange
    ('#00FFFF', '#FF4500'),
    ('#fbbf24', '#FF6B35'),  # Gold to stranger orange
    ('#ec4899', '#8B0000'),  # Pink to dark red
    ('#8b5cf6', '#8B0000'),  # Violet to dark red
    
    # Text descriptions
    ('Quantum Merlin', 'Stranger Patterns'),
    
    # Gradient colors in inline styles
    ('#fbbf24 0%, #06b6d4 50%, #ec4899 100%', '#FF4500 0%, #DC143C 50%, #8B0000 100%'),
    ('linear-gradient(135deg, #fbbf24', 'linear-gradient(135deg, #FF6B35'),
    
    # Footer text
    ('© 2026 Quantum Merlin', '© 2026 Stranger Patterns'),
    
    # Descriptions
    ('Ancient Patterns. Modern Interfaces.', 'The Upside Down Oracle'),
    ('ancient pattern wisdom', 'strange hidden forces'),
    ('cosmic destiny', 'strange destiny'),
    
    # Back button text (optional - keeping mystical feel)
    ('← Back to All Tools', '← Return to Portal'),
]

def apply_branding(file_path):
    """Apply all branding replacements to a file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        for old, new in REPLACEMENTS:
            content = content.replace(old, new)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    stranger_dir = Path(__file__).parent
    
    html_files = list(stranger_dir.glob('*.html'))
    
    updated_count = 0
    skipped_count = 0
    
    for html_file in html_files:
        if html_file.name in SKIP_FILES:
            skipped_count += 1
            print(f"Skipping: {html_file.name}")
            continue
        
        if apply_branding(html_file):
            updated_count += 1
            print(f"Updated: {html_file.name}")
        else:
            print(f"No changes: {html_file.name}")
    
    print(f"\n=== Summary ===")
    print(f"Updated: {updated_count} files")
    print(f"Skipped: {skipped_count} files")
    print(f"Total HTML files: {len(html_files)}")

if __name__ == '__main__':
    main()
