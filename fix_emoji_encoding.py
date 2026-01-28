#!/usr/bin/env python3
"""Fix mojibake emoji encoding in HTML files"""
import os
import glob

# Map of mojibake to proper UTF-8 emoji
REPLACEMENTS = {
    '✨': '✨',  # sparkle emoji
    '—': '—',   # em dash
    ''': "'",   # right single quote
    '"': '"',   # left double quote
    '"': '"',    # right double quote (partial)
}

def fix_file(filepath):
    """Fix encoding issues in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        original = content
        for bad, good in REPLACEMENTS.items():
            content = content.replace(bad, good)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    """Fix all HTML files in the workspace"""
    root = r'C:\Users\WIPED\QMEcosystem'
    
    fixed_count = 0
    # Walk through directories
    for dirpath, dirnames, filenames in os.walk(root):
        # Skip git and node_modules
        dirnames[:] = [d for d in dirnames if d not in ['.git', 'node_modules', 'Expand']]
        
        for filename in filenames:
            if filename.endswith('.html') or filename.endswith('.py'):
                filepath = os.path.join(dirpath, filename)
                if fix_file(filepath):
                    print(f"Fixed: {filepath}")
                    fixed_count += 1
    
    print(f"\nFixed {fixed_count} files")

if __name__ == '__main__':
    main()
