with open('apps/web/src/app/[locale]/mydash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('function BuilderCollectionItem')
snippet = content[idx:idx+1500]
print(snippet)
