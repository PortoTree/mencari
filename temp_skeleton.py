import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add isProfileSidebarLoading state
if 'const [isProfileSidebarLoading, setIsProfileSidebarLoading] = useState(false);' not in content:
    content = content.replace(
        'const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);',
        'const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);\n  const [isProfileSidebarLoading, setIsProfileSidebarLoading] = useState(false);'
    )

# 2. Update onProfileClick to use loading state and fetch display name properly
old_click = '''                  Promise.all([
                    import("@/app/actions/profile").then(m => m.getProfile(author.id)),
                    import("@/app/actions/connections").then(m => m.getConnectionStatus(currentUser?.id, author.id))
                  ]).then(([res, conn]) => {
                    if (res.success && res.profile) {
                      const p = res.profile;
                      const user = p.user;
                      
                      let relation = "none";
                      if (conn.friendshipStatus === "ACCEPTED") {
                        relation = "friend";
                      } else if (conn.friendshipStatus === "PENDING") {
                        relation = "request";
                      }
                      
                      const friendsCount = (user._count?.friendshipsAsUser || 0) + (user._count?.friendshipsAsFriend || 0);
                      
                      setSelectedProfile((prev: any) => ({
                        ...prev,
                        bio: p.bio || prev?.bio,
                        education: p.education || prev?.education,
                        role: p.profession || prev?.role,
                        avatar: p.avatarUrl || prev?.avatar,
                        cover: p.coverUrl || prev?.cover,
                        relation: relation,
                        isFollowing: conn.isFollowing,
                        stats: {
                          friends: friendsCount,
                          followers: user._count?.followers || 0,
                          posts: user._count?.posts || 0
                        }
                      }));
                    }
                  });'''

new_click = '''                  setIsProfileSidebarLoading(true);
                  Promise.all([
                    import("@/app/actions/profile").then(m => m.getProfile(author.id)),
                    import("@/app/actions/connections").then(m => m.getConnectionStatus(currentUser?.id, author.id))
                  ]).then(([res, conn]) => {
                    if (res.success && res.profile) {
                      const p = res.profile;
                      const user = p.user;
                      
                      let relation = "none";
                      if (conn.friendshipStatus === "ACCEPTED") {
                        relation = "friend";
                      } else if (conn.friendshipStatus === "PENDING") {
                        relation = "request";
                      }
                      
                      const friendsCount = (user._count?.friendshipsAsUser || 0) + (user._count?.friendshipsAsFriend || 0);
                      
                      setSelectedProfile((prev: any) => ({
                        ...prev,
                        name: user.displayName || user.username || prev?.name,
                        bio: p.bio || prev?.bio,
                        education: p.education || prev?.education,
                        role: p.profession || prev?.role,
                        avatar: p.avatarUrl || prev?.avatar,
                        cover: p.coverUrl || prev?.cover,
                        relation: relation,
                        isFollowing: conn.isFollowing,
                        stats: {
                          friends: friendsCount,
                          followers: user._count?.followers || 0,
                          posts: user._count?.posts || 0
                        }
                      }));
                    }
                  }).finally(() => {
                    setIsProfileSidebarLoading(false);
                  });'''

content = content.replace(old_click, new_click)


# 3. Add skeletons to the sidebar body
old_body = '''              {/* ── Content Details ────────────────────────────────────── */}
              <div className="p-4 flex flex-col gap-4">
                {/* Name + badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-[17px] text-gray-900 dark:text-white leading-tight">
                      {selectedProfile.name}
                    </h3>
                    <p className="text-[12px] text-gray-400 dark:text-[#888] font-medium mt-0.5">@{selectedProfile.username || selectedProfile.name?.toLowerCase().replace(/\s+/g, "")}</p>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                      {selectedProfile.education || (t("profile.noEducation") || "Belum ada pendidikan")}
                    </p>
                    <p className="text-[12px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      {selectedProfile.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                {selectedProfile.bio ? (
                  <p className="text-[13px] text-gray-600 dark:text-[#A8A8A8] mt-3 leading-relaxed">
                    {selectedProfile.bio}
                  </p>
                ) : (
                  <p className="text-[13px] text-gray-400 dark:text-[#666] mt-3 italic">
                    Belum ada bio.
                  </p>
                )}

                {/* Stats row */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: t("profileSidebar.friends"), value: selectedProfile.stats?.friends ?? 0 },
                    { label: t("profile.followers") || "Pengikut", value: selectedProfile.stats?.followers ?? 0 },
                    { label: "Postingan", value: selectedProfile.stats?.posts ?? 0 },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center justify-center py-2.5 bg-gray-50 dark:bg-white/[0.03] rounded-xl border border-gray-100 dark:border-white/5 transition-colors hover:bg-gray-100 dark:hover:bg-white/[0.06]">
                      <span className="font-bold text-[15px] text-gray-900 dark:text-white leading-none">
                        {stat.value}
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-1.5">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>'''

new_body = '''              {/* ── Content Details ────────────────────────────────────── */}
              <div className="p-4 flex flex-col gap-4">
                {isProfileSidebarLoading ? (
                  <div className="animate-pulse">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-full">
                        <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/4 mb-1"></div>
                        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/2 mb-1"></div>
                        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-2/5"></div>
                      </div>
                    </div>
                    <div className="mt-4 h-4 bg-gray-200 dark:bg-white/10 rounded w-full mb-1.5"></div>
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-5/6"></div>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <div className="h-[60px] bg-gray-200 dark:bg-white/10 rounded-xl"></div>
                      <div className="h-[60px] bg-gray-200 dark:bg-white/10 rounded-xl"></div>
                      <div className="h-[60px] bg-gray-200 dark:bg-white/10 rounded-xl"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Name + badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-[17px] text-gray-900 dark:text-white leading-tight">
                          {selectedProfile.name}
                        </h3>
                        <p className="text-[12px] text-gray-400 dark:text-[#888] font-medium mt-0.5">@{selectedProfile.username || selectedProfile.name?.toLowerCase().replace(/\s+/g, "")}</p>
                        <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 flex items-center gap-1">
                          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                          {selectedProfile.education || (t("profile.noEducation") || "Belum ada pendidikan")}
                        </p>
                        <p className="text-[12px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          {selectedProfile.role}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    {selectedProfile.bio ? (
                      <p className="text-[13px] text-gray-600 dark:text-[#A8A8A8] mt-3 leading-relaxed">
                        {selectedProfile.bio}
                      </p>
                    ) : (
                      <p className="text-[13px] text-gray-400 dark:text-[#666] mt-3 italic">
                        Belum ada bio.
                      </p>
                    )}

                    {/* Stats row */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[
                        { label: t("profileSidebar.friends"), value: selectedProfile.stats?.friends ?? 0 },
                        { label: t("profile.followers") || "Pengikut", value: selectedProfile.stats?.followers ?? 0 },
                        { label: "Postingan", value: selectedProfile.stats?.posts ?? 0 },
                      ].map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center justify-center py-2.5 bg-gray-50 dark:bg-white/[0.03] rounded-xl border border-gray-100 dark:border-white/5 transition-colors hover:bg-gray-100 dark:hover:bg-white/[0.06]">
                          <span className="font-bold text-[15px] text-gray-900 dark:text-white leading-none">
                            {stat.value}
                          </span>
                          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-1.5">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>'''

content = content.replace(old_body, new_body)

# 4. Hide buttons while loading
old_buttons = '''              {/* ── Action Buttons ───────────────────────────────────────── */}
              <div className="px-4 pb-4 flex flex-col gap-2 border-b border-gray-100 dark:border-white/5">
                {selectedProfile.id === currentUser?.id ? ('''

new_buttons = '''              {/* ── Action Buttons ───────────────────────────────────────── */}
              <div className="px-4 pb-4 flex flex-col gap-2 border-b border-gray-100 dark:border-white/5">
                {isProfileSidebarLoading ? (
                  <div className="flex gap-2 animate-pulse">
                    <div className="h-10 bg-gray-200 dark:bg-white/10 rounded-xl flex-[1.5]"></div>
                    <div className="h-10 bg-gray-200 dark:bg-white/10 rounded-xl flex-1"></div>
                  </div>
                ) : selectedProfile.id === currentUser?.id ? ('''

content = content.replace(old_buttons, new_buttons)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added skeleton loading for profile popup and fixed display name")
