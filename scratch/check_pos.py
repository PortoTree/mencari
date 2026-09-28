with open('apps/web/src/app/[locale]/mydash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("PhonePreviewMockup:", content.find('function PhonePreviewMockup'))
print("BuilderCollectionItem:", content.find('function BuilderCollectionItem'))
print("BuilderCategoryItem:", content.find('function BuilderCategoryItem'))
print("BuilderProductItem:", content.find('function BuilderProductItem'))
