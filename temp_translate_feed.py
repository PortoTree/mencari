import json

# Update en.json
en_path = 'c:/mencari-online/apps/web/messages/en.json'
with open(en_path, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

if "feed" not in en_data:
    en_data["feed"] = {}
en_data["feed"]["noPosts"] = "No posts yet"
en_data["feed"]["noPostsDesc"] = "There are no posts to show right now."
en_data["feed"]["loadError"] = "Failed to load posts:"
en_data["feed"]["tryAgain"] = "Try Again"

with open(en_path, 'w', encoding='utf-8') as f:
    json.dump(en_data, f, indent=2, ensure_ascii=False)

# Update id.json
id_path = 'c:/mencari-online/apps/web/messages/id.json'
with open(id_path, 'r', encoding='utf-8') as f:
    id_data = json.load(f)

if "feed" not in id_data:
    id_data["feed"] = {}
id_data["feed"]["noPosts"] = "Belum ada postingan"
id_data["feed"]["noPostsDesc"] = "Belum ada postingan untuk ditampilkan saat ini."
id_data["feed"]["loadError"] = "Gagal memuat postingan:"
id_data["feed"]["tryAgain"] = "Coba Lagi"

with open(id_path, 'w', encoding='utf-8') as f:
    json.dump(id_data, f, indent=2, ensure_ascii=False)

# Update PostFeed.tsx
file_path = 'c:/mencari-online/apps/web/src/components/PostFeed.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_error = '''      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-red-100 dark:border-red-900/30 py-8 flex flex-col items-center justify-center text-center">
        <p className="text-[14px] text-red-500">Gagal memuat postingan: {error}</p>
        <button onClick={fetchPosts} className="mt-2 text-blue-500 hover:underline text-[14px]">Coba Lagi</button>
      </div>'''
new_error = '''      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-red-100 dark:border-red-900/30 py-8 flex flex-col items-center justify-center text-center">
        <p className="text-[14px] text-red-500">{t("feed.loadError")} {error}</p>
        <button onClick={fetchPosts} className="mt-2 text-blue-500 hover:underline text-[14px]">{t("feed.tryAgain")}</button>
      </div>'''
content = content.replace(old_error, new_error)

old_empty = '''        <p className="text-[16px] font-bold text-gray-700 dark:text-[#E4E6EB]">Belum ada postingan</p>
        <p className="text-[14px] text-gray-500 dark:text-[#B0B3B8] mt-1">Belum ada postingan untuk ditampilkan saat ini.</p>'''
new_empty = '''        <p className="text-[16px] font-bold text-gray-700 dark:text-[#E4E6EB]">{t("feed.noPosts")}</p>
        <p className="text-[14px] text-gray-500 dark:text-[#B0B3B8] mt-1">{t("feed.noPostsDesc")}</p>'''
content = content.replace(old_empty, new_empty)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added missing translations for feed")
