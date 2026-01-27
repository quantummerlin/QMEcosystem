import os

root = r"C:\Users\WIPED\QMEcosystem"
with_adsense = 0
without_adsense = 0
no_head = 0

for d, _, files in os.walk(root):
    if '.git' in d or 'node_modules' in d:
        continue
    for f in files:
        if f.endswith('.html'):
            try:
                content = open(os.path.join(d, f), encoding='utf-8', errors='ignore').read()
                if 'ca-pub-3480541530392777' in content:
                    with_adsense += 1
                elif '<head>' in content:
                    without_adsense += 1
                    print(f"Missing: {os.path.join(d, f)}")
                else:
                    no_head += 1
            except:
                pass

print(f"\nWith AdSense: {with_adsense}")
print(f"Missing AdSense: {without_adsense}")
print(f"No <head> tag: {no_head}")
