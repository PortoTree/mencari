with open('scratch/update_page5.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
idx = content.find('function BuilderCollectionItem')
snippet = content[idx:idx+1500]
print('dark:bg' in snippet)
