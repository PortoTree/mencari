import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update PostFeed onProfileClick instances
feed_old = '''              <PostFeed 
                currentUser={currentUser} 
                onProfileClick={(author: any) => {
                  setSelectedProfile({
                    id: author.id,
                    username: author.username,
                    name: author.displayName || author.username,
                    role: author.profile?.profession || "Member",
                    avatar: author.profile?.avatarUrl || "/default-avatar.svg",
                    cover: author.profile?.coverUrl || undefined
                  });
                  setIsProfileSidebarOpen(true);
                }}
              />'''

feed_new = '''              <PostFeed 
                currentUser={currentUser} 
                onProfileClick={(author: any) => {
                  setSelectedProfile({
                    id: author.id,
                    username: author.username,
                    name: author.displayName || author.username,
                    role: author.profile?.profession || "Member",
                    avatar: author.profile?.avatarUrl || "/default-avatar.svg",
                    cover: author.profile?.coverUrl || undefined,
                    bio: author.profile?.bio,
                    education: author.profile?.education,
                    stats: {
                      friends: "?",
                      followers: "?",
                      posts: "?"
                    }
                  });
                  setIsProfileSidebarOpen(true);
                  
                  import("@/app/actions/profile").then(({ getProfile }) => {
                    getProfile(author.id).then(res => {
                      if (res.success && res.profile) {
                        const p = res.profile;
                        const user = p.user;
                        
                        let relation = "none";
                        
                        const friendsCount = (user._count?.friendshipsAsUser || 0) + (user._count?.friendshipsAsFriend || 0);
                        
                        setSelectedProfile((prev: any) => ({
                          ...prev,
                          bio: p.bio || prev?.bio,
                          education: p.education || prev?.education,
                          role: p.profession || prev?.role,
                          avatar: p.avatarUrl || prev?.avatar,
                          cover: p.coverUrl || prev?.cover,
                          relation: relation,
                          stats: {
                            friends: friendsCount,
                            followers: user._count?.followers || 0,
                            posts: user._count?.posts || 0
                          }
                        }));
                      }
                    });
                  });
                }}
              />'''

content = content.replace(feed_old, feed_new)

# 2. Update Education
edu_old = '''                      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                      Universitas Brawijaya
                    </p>'''
edu_new = '''                      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                      {selectedProfile.education || (t("profile.noEducation") || "Belum ada pendidikan")}
                    </p>'''
content = content.replace(edu_old, edu_new)

# 3. Update Bio
bio_old = '''                {/* Bio */}
                <p className="text-[13px] text-gray-600 dark:text-[#A8A8A8] mt-3 leading-relaxed">
                  Ini adalah bio singkat dari {selectedProfile.name}. Selalu semangat ngoding dan belajar hal baru setiap hari! 🚀
                </p>'''
bio_new = '''                {/* Bio */}
                {selectedProfile.bio ? (
                  <p className="text-[13px] text-gray-600 dark:text-[#A8A8A8] mt-3 leading-relaxed">
                    {selectedProfile.bio}
                  </p>
                ) : (
                  <p className="text-[13px] text-gray-400 dark:text-[#666] mt-3 italic">
                    Belum ada bio.
                  </p>
                )}'''
content = content.replace(bio_old, bio_new)

# 4. Update Stats
stats_old = '''                  {[
                    { label: t("profileSidebar.friends"), value: "1.2K" },
                    { label: t("profile.followers") || "Pengikut", value: "4.8K" },
                    { label: "Postingan", value: "238" },
                  ].map((stat) => ('''
stats_new = '''                  {[
                    { label: t("profileSidebar.friends"), value: selectedProfile.stats?.friends ?? 0 },
                    { label: t("profile.followers") || "Pengikut", value: selectedProfile.stats?.followers ?? 0 },
                    { label: "Postingan", value: selectedProfile.stats?.posts ?? 0 },
                  ].map((stat) => ('''
content = content.replace(stats_old, stats_new)

# 5. Update Action Buttons
actions_old = '''              {/* ── Action Buttons ───────────────────────────────────────── */}
              <div className="px-4 pb-4 flex flex-col gap-2 border-b border-gray-100 dark:border-white/5">
                {selectedProfile.relation === "friend" ? ('''
actions_new = '''              {/* ── Action Buttons ───────────────────────────────────────── */}
              <div className="px-4 pb-4 flex flex-col gap-2 border-b border-gray-100 dark:border-white/5">
                {selectedProfile.id === currentUser?.id ? (
                  <div className="flex justify-center">
                    <button onClick={() => router.push(`/${locale}/p/${selectedProfile.username}/${selectedProfile.id}`)} className="w-[50%] flex items-center justify-center bg-gray-100 dark:bg-white/[0.07] hover:bg-gray-200 dark:hover:bg-white/[0.12] text-gray-800 dark:text-white font-semibold py-2.5 rounded-xl text-[13px] transition-all">
                      {t("profileSidebar.openProfile")}
                    </button>
                  </div>
                ) : selectedProfile.relation === "friend" ? ('''
content = content.replace(actions_old, actions_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Profile Sidebar to use database and caching")
