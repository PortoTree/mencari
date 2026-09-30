import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Import getConnectionStatus
import_profile = 'import { getProfile } from "@/app/actions/profile";'
if import_profile not in content:
    # Not using top-level import, so we import it dynamically in the handler.
    pass

# 2. Update PostFeed onProfileClick to fetch connection status
old_feed = '''                  import("@/app/actions/profile").then(({ getProfile }) => {
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
                  });'''

new_feed = '''                  Promise.all([
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

content = content.replace(old_feed, new_feed)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated connection fetching")
