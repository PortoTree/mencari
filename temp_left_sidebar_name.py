import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The left sidebar profile card name is at line 1007: {currentUser.username}
old_name_tag = '''                    <h3 className="font-bold text-[17px] text-black dark:text-[#E4E6EB]">
                      {currentUser.username}
                    </h3>'''

new_name_tag = '''                    <h3 className="font-bold text-[17px] text-black dark:text-[#E4E6EB]">
                      {currentUser.profile?.displayName || currentUser.username}
                    </h3>'''

content = content.replace(old_name_tag, new_name_tag)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated left sidebar profile card name to use displayName")
