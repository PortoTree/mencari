with open('apps/web/src/app/[locale]/mydash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("BuilderCollectionItem has dark:", 'dark:' in content[content.find('function BuilderCollectionItem'):])
print("PhonePreviewMockup has dark:", 'dark:' in content[content.find('function PhonePreviewMockup'):content.find('function BuilderCollectionItem')])
