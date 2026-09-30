import re

# Update Profile Page
file_path_profile = 'c:/mencari-online/apps/web/src/app/[locale]/p/[username]/[id]/page.tsx'
with open(file_path_profile, 'r', encoding='utf-8') as f:
    content_profile = f.read()

old_cache_decl = '''// In-memory cache to prevent excessive loading states when navigating
const profileCache = new Map<string, any>();
const connectionCache = new Map<string, any>();'''
new_cache_decl = '''import { profileCache, connectionCache } from "@/utils/profileCache";'''

if old_cache_decl in content_profile:
    content_profile = content_profile.replace(old_cache_decl, new_cache_decl)
    with open(file_path_profile, 'w', encoding='utf-8') as f:
        f.write(content_profile)
    print("Updated profileCache in profile page")

# Update Home Page
file_path_home = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path_home, 'r', encoding='utf-8') as f:
    content_home = f.read()

import_stmt = 'import { profileCache, connectionCache } from "@/utils/profileCache";\n'
if import_stmt not in content_home:
    # insert at the top of the file after the first few imports
    content_home = content_home.replace('import { useTranslations } from "next-intl";\n', 'import { useTranslations } from "next-intl";\n' + import_stmt)

old_fetch = '''                  setIsProfileSidebarLoading(true);
                  Promise.all([
                    import("@/app/actions/profile").then(m => m.getProfile(author.id)),
                    import("@/app/actions/connections").then(m => m.getConnectionStatus(currentUser?.id, author.id))
                  ]).then(([res, conn]) => {'''

new_fetch = '''                  const cachedProf = profileCache.get(author.id);
                  const cachedConn = connectionCache.get(author.id);
                  
                  if (cachedProf && cachedConn) {
                      const p = cachedProf;
                      const user = p.user;
                      const conn = cachedConn;
                      
                      let relation = "none";
                      if (conn.friendshipStatus === "ACCEPTED") relation = "friend";
                      else if (conn.friendshipStatus === "PENDING") relation = "request";
                      
                      const friendsCount = (user._count?.friendshipsAsUser || 0) + (user._count?.friendshipsAsFriend || 0);
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
                        cover: p.coverUrl || prev?.cover,
                        relation: relation,
                        isFollowing: conn.isFollowing,
                        stats: {
                          friends: friendsCount,
                          followers: user._count?.followers || 0,
                          posts: user._count?.posts || 0
                        }
                      }));
                      return; // Skip fetching if we have cache
                  }
                  
                  setIsProfileSidebarLoading(true);
                  Promise.all([
                    import("@/app/actions/profile").then(m => m.getProfile(author.id)),
                    import("@/app/actions/connections").then(m => m.getConnectionStatus(currentUser?.id, author.id))
                  ]).then(([res, conn]) => {
                    if (res.success && res.profile) {
                      profileCache.set(author.id, res.profile);
                      connectionCache.set(author.id, conn);
'''

content_home = content_home.replace(old_fetch, new_fetch)

with open(file_path_home, 'w', encoding='utf-8') as f:
    f.write(content_home)
print("Updated home page to use global profileCache")
