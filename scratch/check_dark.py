with open('apps/web/src/app/[locale]/mydash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('function BuilderCollectionItem')
end_idx = content.find('function BuilderCategoryItem', idx)
snippet = content[idx:end_idx]

# Check if there are any dark classes
has_dark = 'dark:' in snippet
print("Has dark classes:", has_dark)
