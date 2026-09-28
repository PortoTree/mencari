with open('apps/web/src/app/[locale]/mydash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('function BuilderCollectionItem')
end_idx = content.find('function PhonePreviewMockup', idx)
if end_idx == -1: end_idx = len(content)
snippet = content[idx:end_idx]

# Find where it renders the items
for line in snippet.split('\n'):
    if 'bg-' in line and 'rounded' in line and 'shadow' in line:
        print(line.strip())
