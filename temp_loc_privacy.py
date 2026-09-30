import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update onProfileClick to include privacy logic for location
old_click = '''                      const friendsCount = (user._count?.friendshipsAsUser || 0) + (user._count?.friendshipsAsFriend || 0);
                      
                      setSelectedProfile((prev: any) => ({
                        ...prev,
                        name: p.displayName || user.username || prev?.name,
                        bio: p.bio || prev?.bio,
                        education: p.education || prev?.education,
                        role: p.profession || prev?.role,
                        avatar: p.avatarUrl || prev?.avatar,
                        cover: p.coverUrl || prev?.cover,'''

new_click = '''                      const friendsCount = (user._count?.friendshipsAsUser || 0) + (user._count?.friendshipsAsFriend || 0);
                      
                      const isVisible = (privacy?: string) => {
                        if (currentUser && user.id === currentUser.id) return true;
                        if (!privacy || privacy === "PUBLIC") return true;
                        if (privacy === "PRIVATE") return false;
                        if (privacy === "FRIENDS") return conn.friendshipStatus === "ACCEPTED";
                        return true;
                      };
                      
                      const showLoc = p.locationName && isVisible(user.profileSettings?.privacyLoc);
                      const showProf = p.profession && isVisible(user.profileSettings?.privacyProf);
                      
                      setSelectedProfile((prev: any) => ({
                        ...prev,
                        name: p.displayName || user.username || prev?.name,
                        bio: p.bio || prev?.bio,
                        location: showLoc ? p.locationName : null,
                        role: showProf ? p.profession : null,
                        avatar: p.avatarUrl || prev?.avatar,
                        cover: p.coverUrl || prev?.cover,'''
content = content.replace(old_click, new_click)

# 2. Update initial selectedProfile state in onProfileClick
old_initial = '''                    education: author.profile?.education,
                    stats: {'''
new_initial = '''                    location: author.profile?.locationName,
                    stats: {'''
content = content.replace(old_initial, new_initial)


# 3. Replace education with location in the popup
old_edu = '''                        <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 flex items-center gap-1">
                          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                          {selectedProfile.education || (t("profile.noEducation") || "Belum ada pendidikan")}
                        </p>'''

new_loc = '''                        <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 flex items-center gap-1">
                          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          {selectedProfile.location || (t("profile.noLocation") || "Belum ada lokasi")}
                        </p>'''
content = content.replace(old_edu, new_loc)


# 4. Hide profession if null (due to privacy or not set)
old_prof = '''                        <p className="text-[12px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          {selectedProfile.role}
                        </p>'''

new_prof = '''                        {selectedProfile.role && (
                          <p className="text-[12px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {selectedProfile.role}
                          </p>
                        )}'''
content = content.replace(old_prof, new_prof)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced education with location and added privacy checks")
