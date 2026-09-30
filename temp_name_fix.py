import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_str = "name: user.displayName || user.username || prev?.name,"
new_str = "name: p.displayName || user.username || prev?.name,"
content = content.replace(old_str, new_str)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed displayName bug")
