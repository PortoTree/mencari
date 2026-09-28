import re

with open('apps/web/src/app/[locale]/mydash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# find BuilderCollectionItem, BuilderCategoryItem, BuilderProductItem
components = ['function BuilderCollectionItem', 'function BuilderCategoryItem', 'function BuilderProductItem']
for comp in components:
    idx = content.find(comp)
    if idx != -1:
        end = content.find('function', idx + 10)
        if end == -1:
            end = len(content)
        print(f"--- {comp} ---")
        # Print a snippet to see the classes for title and stuff
        lines = content[idx:end].split('\n')
        for i, line in enumerate(lines):
            if 'className=' in line and 'text-' in line:
                print(f"{i}: {line.strip()}")

