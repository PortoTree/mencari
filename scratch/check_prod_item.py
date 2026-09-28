with open('scratch/update_page5.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('function BuilderProductItem')
if idx != -1:
    snippet = content[idx:idx+1500]
    print('dark:' in snippet)
else:
    print("Not found")
