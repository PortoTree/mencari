with open('apps/web/src/app/[locale]/mydash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('function BuilderCollectionItem(')
end = content.find('function BuilderProductItem(')
snippet = content[start:end]

with open('scratch/builder_items.txt', 'w', encoding='utf-8') as f:
    f.write(snippet)
