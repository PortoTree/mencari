import re
with open('apps/web/src/app/[locale]/mydash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('function BuilderCollectionItem')
end_idx = content.find('function BuilderCategoryItem', idx)
snippet = content[idx:end_idx]

for line in snippet.split('\n'):
    if 'text-' in line and 'className' in line:
        print(line.strip())
