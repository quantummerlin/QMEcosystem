import os

count = 0
for dp, _, fns in os.walk('.'):
    for fn in fns:
        if fn.endswith('.html'):
            filepath = os.path.join(dp, fn)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                if 'storage-fix.js?v=20260123' in content and 'storage-fix.js?v=20260123b' not in content:
                    new_content = content.replace('storage-fix.js?v=20260123', 'storage-fix.js?v=20260123b')
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    count += 1
                    print(f'Updated: {filepath}')
            except Exception as e:
                print(f'Error with {filepath}: {e}')

print(f'\nTotal files updated: {count}')
