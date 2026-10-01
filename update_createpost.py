import os

file_path = r"c:\mencari-online\apps\web\src\components\CreatePostModal.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add states
state_code = """
  const [taggedUsers, setTaggedUsers] = useState<any[]>(initialPost?.taggedUsers || []);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [searchTagQuery, setSearchTagQuery] = useState("");
  const [searchTagResults, setSearchTagResults] = useState<any[]>([]);
  const [isSearchingTags, setIsSearchingTags] = useState(false);
"""
content = content.replace(
    "const [isFetchingLink, setIsFetchingLink] = useState(false);",
    "const [isFetchingLink, setIsFetchingLink] = useState(false);\n" + state_code
)

# 2. Add useEffect for search
effect_code = """
  useEffect(() => {
    if (!searchTagQuery.trim()) {
      setSearchTagResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      setIsSearchingTags(true);
      try {
        const res = await fetch(`/api/users/search?q=${encodeURIComponent(searchTagQuery)}`);
        if (res.ok) {
          const data = await res.json();
          const filtered = data.users.filter((u: any) => !taggedUsers.some((tu: any) => tu.id === u.id));
          setSearchTagResults(filtered);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearchingTags(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTagQuery, taggedUsers]);
"""
content = content.replace(
    "  const handleContentChange =",
    effect_code + "\n  const handleContentChange ="
)

# 3. Add to createPost payload
payload_old = """          mediaUrls: finalMediaUrls,
          mediaLayout: mediaLayout,
          linkMetadata: linkPreviewData,"""
payload_new = """          mediaUrls: finalMediaUrls,
          mediaLayout: mediaLayout,
          linkMetadata: linkPreviewData,
          taggedUserIds: taggedUsers.map((u: any) => u.id),"""
content = content.replace(payload_old, payload_new)

# 4. Tag button
tag_btn_old = """              <button className="group relative p-1.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-full transition-colors opacity-50 cursor-not-allowed">
                <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {t("feed.comingSoon")}
                </span>
              </button>"""
tag_btn_new = """              <button onClick={() => setIsTagModalOpen(true)} className="group relative p-1.5 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-full transition-colors">
                <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {t("feed.tagPeople")}
                </span>
              </button>"""
content = content.replace(tag_btn_old, tag_btn_new)

# 5. Tagged users preview
preview_code = """
            {/* Tagged Users Preview */}
            {taggedUsers.length > 0 && (
              <div className="mb-4 bg-gray-50 dark:bg-[#242526] border border-gray-200 dark:border-gray-700 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                  <span className="text-[13px] font-semibold text-gray-600 dark:text-gray-300">
                    Bersama {taggedUsers.length} orang
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {taggedUsers.map((user, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 rounded-full pl-1 pr-3 py-1">
                      <img src={user.profile?.avatarUrl || "/default-avatar.svg"} className="w-6 h-6 rounded-full object-cover" />
                      <div className="flex flex-col">
                        <span className="text-[12px] font-semibold leading-tight dark:text-[#E4E6EB]">{user.profile?.displayName || user.username}</span>
                      </div>
                      <button onClick={() => setTaggedUsers(taggedUsers.filter((u: any) => u.id !== user.id))} className="ml-1 text-gray-400 hover:text-red-500 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Link Preview Card */}
"""
content = content.replace("{/* Link Preview Card */}", preview_code)

# 6. Tag Modal body
modal_code = """
        {/* Submodal for Tagging Users */}
        {isTagModalOpen && (
          <div className="absolute inset-0 bg-white dark:bg-[#242526] z-50 flex flex-col rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#3E4042]">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsTagModalOpen(false)} className="w-9 h-9 bg-gray-100 dark:bg-[#3A3B3C] rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#4E4F50] transition-colors text-gray-600 dark:text-[#B0B3B8]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h2 className="text-[20px] font-bold text-black dark:text-[#E4E6EB]">{t("feed.tagPeople")}</h2>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-200 dark:border-[#3E4042]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari teman..."
                  value={searchTagQuery}
                  onChange={(e) => setSearchTagQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-[#3A3B3C] border-none rounded-full text-[15px] text-black dark:text-[#E4E6EB] focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                />
                <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              {isSearchingTags ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#1877F2] border-t-transparent"></div>
                </div>
              ) : searchTagResults.length > 0 ? (
                searchTagResults.map((user: any) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      setTaggedUsers([...taggedUsers, user]);
                      setSearchTagQuery("");
                      setIsTagModalOpen(false);
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-xl transition-colors w-full text-left"
                  >
                    <img src={user.profile?.avatarUrl || "/default-avatar.svg"} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-[15px] dark:text-[#E4E6EB]">{user.profile?.displayName || user.username}</span>
                      <span className="text-[13px] text-gray-500">@{user.username}</span>
                    </div>
                  </button>
                ))
              ) : searchTagQuery.trim() ? (
                <div className="text-center text-gray-500 dark:text-[#B0B3B8] py-8">
                  Tidak ada pengguna ditemukan.
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-[#B0B3B8] py-8">
                  Ketik nama untuk mencari.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
"""
content = content.replace("      </div>\n    </div>", modal_code)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
