import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace the first setSelectedProfile inside onProfileClick
# It looks like:
#                   setSelectedProfile({
#                     id: author.id,
#                     username: author.username,
#                     name: author.profile?.displayName || author.username,
#                     role: author.profile?.profession || "Member",
# ...
#                     }
#                   });
#                   setIsProfileSidebarOpen(true);

# Regex pattern to match the block
pattern = r'setSelectedProfile\(\{\s*id: author\.id,[\s\S]*?\}\);\s*setIsProfileSidebarOpen\(true\);'

new_state = '''setSelectedProfile({
                    id: author.id,
                    username: author.username,
                    name: author.profile?.displayName || author.username,
                    role: null, // skeleton/privacy
                    avatar: author.profile?.avatarUrl || "/default-avatar.svg",
                    cover: author.profile?.coverUrl || undefined,
                    bio: null, // skeleton/privacy
                    location: null, // skeleton/privacy
                    stats: null // skeleton
                  });
                  setIsProfileSidebarOpen(true);'''

content = re.sub(pattern, new_state, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated initial setSelectedProfile states")
