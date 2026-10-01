import os

file_path = r"c:\mencari-online\apps\web\src\components\PostCard.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

state_old = "  const [modalViewMode, setModalViewMode] = useState<\"GRID\" | \"CAROUSEL\">(\"GRID\");"
state_new = "  const [modalViewMode, setModalViewMode] = useState<\"GRID\" | \"CAROUSEL\">(\"GRID\");\n  const [isTagListModalOpen, setIsTagListModalOpen] = useState(false);"
content = content.replace(state_old, state_new)

tagged_preview_code = """
      {/* Tagged Users Preview */}
      {post.taggedUsers && post.taggedUsers.length > 0 && (
        <div className="px-4 mb-3">
          {post.taggedUsers.length === 1 ? (
            <div 
              onClick={() => {
                if (onProfileClick) onProfileClick(post.taggedUsers[0]);
                else router.push(`/${locale}/p/${post.taggedUsers[0].username}/${post.taggedUsers[0].id}`);
              }}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#4E4F50] transition-colors"
            >
              <img src={post.taggedUsers[0].profile?.avatarUrl || "/default-avatar.svg"} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex flex-col">
                <span className="font-semibold text-[15px] dark:text-[#E4E6EB]">{post.taggedUsers[0].profile?.displayName || post.taggedUsers[0].username}</span>
                <span className="text-[13px] text-gray-500">@{post.taggedUsers[0].username}</span>
              </div>
            </div>
          ) : post.taggedUsers.length === 2 ? (
            <div className="grid grid-cols-2 gap-2">
              {post.taggedUsers.map((user: any, idx: number) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    if (onProfileClick) onProfileClick(user);
                    else router.push(`/${locale}/p/${user.username}/${user.id}`);
                  }}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#4E4F50] transition-colors"
                >
                  <img src={user.profile?.avatarUrl || "/default-avatar.svg"} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-semibold text-[14px] dark:text-[#E4E6EB] truncate w-full block">{user.profile?.displayName || user.username}</span>
                    <span className="text-[12px] text-gray-500 truncate w-full block">@{user.username}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div 
              onClick={() => setIsTagListModalOpen(true)}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#4E4F50] transition-colors"
            >
              <div className="flex -space-x-2 overflow-hidden">
                {post.taggedUsers.slice(0, 3).map((user: any, idx: number) => (
                  <img key={idx} src={user.profile?.avatarUrl || "/default-avatar.svg"} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#3A3B3C] object-cover" />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[15px] dark:text-[#E4E6EB]">Orang yang ditandai</span>
                <span className="text-[13px] text-gray-500">{post.taggedUsers.length} orang</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Media (If any) */}
"""
content = content.replace("{/* Media (If any) */}", tagged_preview_code)

modal_code = """
      <CreatePostModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} currentUser={currentUser} initialPost={post} />
      
      {/* Submodal for Tagged Users List */}
      {isTagListModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 dark:bg-black/70 px-4">
          <div className="w-full max-w-[400px] bg-white dark:bg-[#242526] rounded-xl shadow-xl flex flex-col relative border border-gray-200 dark:border-[#3E4042] overflow-hidden max-h-[80vh]">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#3E4042]">
              <h2 className="text-[20px] font-bold text-black dark:text-[#E4E6EB]">
                Orang yang ditandai
              </h2>
              <button onClick={() => setIsTagListModalOpen(false)} className="w-9 h-9 bg-gray-200 dark:bg-[#3A3B3C] rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors text-gray-600 dark:text-[#B0B3B8]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-2">
              {post.taggedUsers?.map((user: any) => (
                <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] rounded-xl transition-colors">
                  <img src={user.profile?.avatarUrl || "/default-avatar.svg"} className="w-10 h-10 rounded-full object-cover cursor-pointer" onClick={() => {
                      setIsTagListModalOpen(false);
                      if (onProfileClick) onProfileClick(user);
                      else router.push(`/${locale}/p/${user.username}/${user.id}`);
                    }} />
                  <div className="flex flex-col flex-1 cursor-pointer" onClick={() => {
                      setIsTagListModalOpen(false);
                      if (onProfileClick) onProfileClick(user);
                      else router.push(`/${locale}/p/${user.username}/${user.id}`);
                    }}>
                    <span className="font-semibold text-[15px] dark:text-[#E4E6EB]">{user.profile?.displayName || user.username}</span>
                    <span className="text-[13px] text-gray-500">@{user.username}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsTagListModalOpen(false);
                      if (onProfileClick) onProfileClick(user);
                      else router.push(`/${locale}/p/${user.username}/${user.id}`);
                    }}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-[#4E4F50] hover:bg-gray-200 dark:hover:bg-[#5C5D5F] rounded-lg text-sm font-semibold text-black dark:text-[#E4E6EB] transition-colors"
                  >
                    Profil
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
"""
content = content.replace("<CreatePostModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} currentUser={currentUser} initialPost={post} />", modal_code)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
