import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

bad_block = '''                  ]).then(([res, conn]) => {
                    if (res.success && res.profile) {
                      profileCache.set(author.id, res.profile);
                      connectionCache.set(author.id, conn);

                    if (res.success && res.profile) {
                      const p = res.profile;
                      const user = p.user;'''

good_block = '''                  ]).then(([res, conn]) => {
                    if (res.success && res.profile) {
                      profileCache.set(author.id, res.profile);
                      connectionCache.set(author.id, conn);
                      
                      const p = res.profile;
                      const user = p.user;'''

content = content.replace(bad_block, good_block)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all duplicate if blocks")
