import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Cover Photo in Sidebar
cover_old = '''                <div className="h-[130px] w-full overflow-hidden relative">
                  <img
                    src="/default-cover.jpg"
                    alt="Cover"'''
cover_new = '''                <div className="h-[130px] w-full overflow-hidden relative">
                  <img
                    src={selectedProfile.cover || "/default-cover.jpg"}
                    alt="Cover"'''
content = content.replace(cover_old, cover_new)

# 2. Update Username in Sidebar
username_old = '''                    <h3 className="font-bold text-[17px] text-gray-900 dark:text-white leading-tight">
                      {selectedProfile.name}
                    </h3>
                    <p className="text-[12px] text-gray-400 dark:text-[#888] font-medium mt-0.5">@{selectedProfile.name?.toLowerCase().replace(/\s+/g, "")}</p>'''

username_new = '''                    <h3 className="font-bold text-[17px] text-gray-900 dark:text-white leading-tight">
                      {selectedProfile.name}
                    </h3>
                    <p className="text-[12px] text-gray-400 dark:text-[#888] font-medium mt-0.5">@{selectedProfile.username || selectedProfile.name?.toLowerCase().replace(/\s+/g, "")}</p>'''
content = content.replace(username_old, username_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Profile Sidebar UI")
