#!/usr/bin/env python3
"""Fix mojibake emoji encoding in HTML files"""
import os
import glob

# Map of mojibake to proper UTF-8 emoji
REPLACEMENTS = {
    'âœ¨': '✨',  # sparkle emoji
    'â€"': '—',   # em dash
    'â€™': "'",   # right single quote
    'â€œ': '"',   # left double quote
    'â€': '"',    # right double quote (partial)
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
    
    # Find all HTML files
    patterns = [
        os.path.join(root, '**', '*.html'),
    ]
    
    fixed_count = 0
    for pattern in patterns:
        for filepath in glob.glob(pattern, recursive=True):
            if fix_file(filepath):
                print(f"Fixed: {filepath}")
                fixed_count += 1
    
    print(f"\n✨ Fixed {fixed_count} files")

if __name__ == '__main__':
    main()
