import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update initial state in onProfileClick so it doesn't leak private fields before fetch
# Note: we have multiple tabs, so we need to replace all occurrences!
old_initial_state = '''                  setSelectedProfile({
                    id: author.id,
                    username: author.username,
                    name: author.profile?.displayName || author.username,
                    avatar: author.profile?.avatarUrl,
                    cover: author.profile?.coverUrl,
                    bio: author.profile?.bio,
                    location: author.profile?.locationName,
                    role: author.profile?.profession,
                    relation: "none",
                    isFollowing: false,
                    stats: {
                      friends: 0,
                      followers: 0,
                      posts: 0
                    }
                  });'''
new_initial_state = '''                  setSelectedProfile({
                    id: author.id,
                    username: author.username,
                    name: author.profile?.displayName || author.username,
                    avatar: author.profile?.avatarUrl,
                    cover: author.profile?.coverUrl,
                    bio: null, // load from fetch for privacy/skeleton
                    location: null, // load from fetch for privacy/skeleton
                    role: null, // load from fetch for privacy/skeleton
                    relation: "none",
                    isFollowing: false,
                    stats: null // load from fetch for skeleton
                  });'''
content = content.replace(old_initial_state, new_initial_state)

# 2. Add skeleton to the popup content
# The popup info section starts around line 3640
old_info_block = '''                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-[17px] text-gray-900 dark:text-white leading-tight">
                      {selectedProfile.name}
                    </h3>
                    <p className="text-[12px] text-gray-400 dark:text-[#888] font-medium mt-0.5">@{selectedProfile.username || selectedProfile.name?.toLowerCase().replace(/\s+/g, "")}</p>
                        {selectedProfile.location && (
                          <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 flex items-center gap-1">
                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {selectedProfile.location}
                          </p>
                        )}
                        {selectedProfile.role && (
                          <p className="text-[12px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {selectedProfile.role}
                          </p>
                        )}
                  </div>

                </div>

                {/* Bio */}
                {selectedProfile.bio ? (
                  <p className="text-[13px] text-gray-600 dark:text-[#A8A8A8] mt-3 leading-relaxed">
                    {selectedProfile.bio}
                  </p>
                ) : (
                  <p className="text-[13px] text-gray-400 dark:text-gray-500 mt-3 italic">
                    {t("profile.noBio") || "Belum ada bio"}
                  </p>
                )}'''

new_info_block = '''                <div className="flex items-start justify-between gap-2">
                  <div className="w-full">
                    {isProfileSidebarLoading ? (
                       <div className="animate-pulse space-y-2 w-full">
                         <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-1/2"></div>
                         <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/3"></div>
                         <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-2/5 mt-2"></div>
                         <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/4"></div>
                       </div>
                    ) : (
                      <>
                        <h3 className="font-bold text-[17px] text-gray-900 dark:text-white leading-tight">
                          {selectedProfile.name}
                        </h3>
                        <p className="text-[12px] text-gray-400 dark:text-[#888] font-medium mt-0.5">@{selectedProfile.username || selectedProfile.name?.toLowerCase().replace(/\s+/g, "")}</p>
                        {selectedProfile.location && (
                          <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 flex items-center gap-1">
                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {selectedProfile.location}
                          </p>
                        )}
                        {selectedProfile.role && (
                          <p className="text-[12px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {selectedProfile.role}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {isProfileSidebarLoading ? (
                   <div className="animate-pulse mt-3 space-y-1.5 w-full">
                     <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-full"></div>
                     <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-5/6"></div>
                   </div>
                ) : selectedProfile.bio ? (
                  <p className="text-[13px] text-gray-600 dark:text-[#A8A8A8] mt-3 leading-relaxed">
                    {selectedProfile.bio}
                  </p>
                ) : (
                  <p className="text-[13px] text-gray-400 dark:text-gray-500 mt-3 italic">
                    {t("profile.noBio") || "Belum ada bio"}
                  </p>
                )}'''
content = content.replace(old_info_block, new_info_block)

# 3. Add skeleton to the stats section
old_stats_block = '''              {/* Stats */}
              <div className="px-4 py-3 bg-gray-50/50 dark:bg-white/[0.02] border-y border-gray-100 dark:border-white/5 flex items-center justify-between">
                <div className="text-center flex-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 py-2 rounded-xl transition-colors">
                  <div className="font-bold text-[16px] text-gray-900 dark:text-white leading-none">{selectedProfile.stats?.friends || 0}</div>
                  <div className="text-[11px] text-gray-500 dark:text-[#888] font-medium mt-1 uppercase tracking-wide">Teman</div>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-white/10"></div>
                <div className="text-center flex-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 py-2 rounded-xl transition-colors">
                  <div className="font-bold text-[16px] text-gray-900 dark:text-white leading-none">{selectedProfile.stats?.followers || 0}</div>
                  <div className="text-[11px] text-gray-500 dark:text-[#888] font-medium mt-1 uppercase tracking-wide">Pengikut</div>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-white/10"></div>
                <div className="text-center flex-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 py-2 rounded-xl transition-colors">
                  <div className="font-bold text-[16px] text-gray-900 dark:text-white leading-none">{selectedProfile.stats?.posts || 0}</div>
                  <div className="text-[11px] text-gray-500 dark:text-[#888] font-medium mt-1 uppercase tracking-wide">Postingan</div>
                </div>
              </div>'''

new_stats_block = '''              {/* Stats */}
              <div className="px-4 py-3 bg-gray-50/50 dark:bg-white/[0.02] border-y border-gray-100 dark:border-white/5 flex items-center justify-between">
                {isProfileSidebarLoading ? (
                  <div className="flex w-full justify-between items-center px-4 animate-pulse">
                    <div className="flex flex-col items-center gap-2"><div className="h-4 bg-gray-200 dark:bg-white/10 w-6 rounded"></div><div className="h-2 bg-gray-200 dark:bg-white/10 w-10 rounded"></div></div>
                    <div className="w-px h-8 bg-gray-200 dark:bg-white/10"></div>
                    <div className="flex flex-col items-center gap-2"><div className="h-4 bg-gray-200 dark:bg-white/10 w-6 rounded"></div><div className="h-2 bg-gray-200 dark:bg-white/10 w-12 rounded"></div></div>
                    <div className="w-px h-8 bg-gray-200 dark:bg-white/10"></div>
                    <div className="flex flex-col items-center gap-2"><div className="h-4 bg-gray-200 dark:bg-white/10 w-6 rounded"></div><div className="h-2 bg-gray-200 dark:bg-white/10 w-12 rounded"></div></div>
                  </div>
                ) : (
                  <>
                    <div className="text-center flex-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 py-2 rounded-xl transition-colors">
                      <div className="font-bold text-[16px] text-gray-900 dark:text-white leading-none">{selectedProfile.stats?.friends || 0}</div>
                      <div className="text-[11px] text-gray-500 dark:text-[#888] font-medium mt-1 uppercase tracking-wide">Teman</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200 dark:bg-white/10"></div>
                    <div className="text-center flex-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 py-2 rounded-xl transition-colors">
                      <div className="font-bold text-[16px] text-gray-900 dark:text-white leading-none">{selectedProfile.stats?.followers || 0}</div>
                      <div className="text-[11px] text-gray-500 dark:text-[#888] font-medium mt-1 uppercase tracking-wide">Pengikut</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200 dark:bg-white/10"></div>
                    <div className="text-center flex-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 py-2 rounded-xl transition-colors">
                      <div className="font-bold text-[16px] text-gray-900 dark:text-white leading-none">{selectedProfile.stats?.posts || 0}</div>
                      <div className="text-[11px] text-gray-500 dark:text-[#888] font-medium mt-1 uppercase tracking-wide">Postingan</div>
                    </div>
                  </>
                )}
              </div>'''
content = content.replace(old_stats_block, new_stats_block)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied full skeleton and prevented initial privacy leak")
