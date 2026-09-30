import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/p/[username]/[id]/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import if missing
if 'import PostFeed' not in content:
    content = re.sub(
        r'(import Navbar from "@/components/Navbar";)',
        r'\1\nimport PostFeed from "@/components/PostFeed";',
        content
    )

# Replace the "Belum ada postingan" dummy UI with PostFeed
pattern = r'\{\s*activeTab === \'posts\' \? \(\s*<div className="bg-white dark:bg-\[\#242526\] rounded-xl shadow-sm border border-gray-100 dark:border-\[\#3E4042\] py-12 flex flex-col items-center justify-center text-center">\s*<svg.*?</svg>\s*<p.*?>Belum ada postingan</p>\s*<p.*?>Pengguna ini belum membuat postingan apa pun.</p>\s*</div>\s*\)\s*:\s*null\s*\}'

new_content = re.sub(pattern, "{activeTab === 'posts' ? (\n                  <PostFeed currentUser={currentUser} />\n                ) : null}", content, flags=re.DOTALL)

if content != new_content:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated profile page")
else:
    print("Regex not found or identical")
