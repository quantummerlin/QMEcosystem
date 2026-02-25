"""Fix guides link injection in stranger and soulblueprint subpages."""
import os, re

ROOT = r'c:\Users\WIPED\QMEcosystem'
files = [
    'stranger/about.html','stranger/privacy.html','stranger/terms.html','stranger/disclaimer.html','stranger/view.html',
    'soulblueprint/about.html','soulblueprint/privacy.html','soulblueprint/terms.html','soulblueprint/disclaimer.html','soulblueprint/view.html'
]
for f in files:
    fp = os.path.join(ROOT, f)
    with open(fp, 'r', encoding='utf-8') as fh:
        c = fh.read()
    # Remove any malformed previous injection attempts
    c = re.sub(r'(Disclaimer</a>)\s*[^\n<]*`n\s*<a href="/guides/">Guides</a>', r'\1', c)
    c = re.sub(r'(Disclaimer</a>)\s*\u2022\s*\n\s*<a href="/guides/">Guides</a>', r'\1', c)
    # Now inject properly
    for brand in ['stranger', 'soulblueprint']:
        old = '<a href="/{}/disclaimer.html">Disclaimer</a>'.format(brand)
        new = '<a href="/{}/disclaimer.html">Disclaimer</a> \u2022\n            <a href="/guides/">Guides</a>'.format(brand)
        if old in c and '/guides/' not in c:
            c = c.replace(old, new)
    with open(fp, 'w', encoding='utf-8') as fh:
        fh.write(c)
    has = '/guides/' in c
    print(f'{"OK" if has else "MISS"}: {f}')
print('Done')
