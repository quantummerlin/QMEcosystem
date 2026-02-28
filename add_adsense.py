import os
import re

adsense_tag = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3480541530392777" crossorigin="anonymous"></script>'

root_dir = r"C:\Users\WIPED\QMEcosystem"
count = 0

for dirpath, dirnames, filenames in os.walk(root_dir):
    # Skip node_modules and .git folders
    dirnames[:] = [d for d in dirnames if d not in ['node_modules', '.git']]
    
    for filename in filenames:
        if filename.endswith('.html'):
            filepath = os.path.join(dirpath, filename)
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # Skip if already has AdSense
                if 'ca-pub-3480541530392777' in content:
                    continue
                
                # Add AdSense after <head>
                if '<head>' in content:
                    new_content = content.replace('<head>', f'<head>\n    {adsense_tag}', 1)
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    count += 1
                    print(f"Added to: {filename}")
            except Exception as e:
                print(f"Error with {filename}: {e}")

print(f"\nTotal files updated: {count}")
