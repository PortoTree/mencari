import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_onclick = '''                       onClick={async () => {
                        const token = localStorage.getItem("token");
                        if (!token) return;
                        const { handlePrimaryConnectionAction, getConnectionStatus } = await import("@/app/actions/connections");
                        const res = await handlePrimaryConnectionAction(token, currentUser.id, selectedProfile.id);
                        if (res.success) {
                           const conn = await getConnectionStatus(currentUser.id, selectedProfile.id);
                           let relation = "none";
                           if (conn.friendshipStatus === "ACCEPTED") relation = "friend";
                           else if (conn.friendshipStatus === "PENDING") relation = "request";
                           setSelectedProfile((prev: any) => ({ ...prev, relation, isFollowing: conn.isFollowing, requestedBy: conn.friendshipRequestedBy }));
                           connectionCache.set(selectedProfile.id, conn); // update cache so next open is fresh
                        }
                      }}'''

new_onclick = '''                       onClick={async () => {
                        const token = localStorage.getItem("token");
                        if (!token) return;
                        const { handlePrimaryConnectionAction, getConnectionStatus } = await import("@/app/actions/connections");
                        const res = await handlePrimaryConnectionAction(token, currentUser.id, selectedProfile.id);
                        if (res.success) {
                           const conn = await getConnectionStatus(currentUser.id, selectedProfile.id);
                           let relation = "none";
                           if (conn.friendshipStatus === "ACCEPTED") relation = "friend";
                           else if (conn.friendshipStatus === "PENDING") relation = "request";
                           
                           setSelectedProfile((prev: any) => {
                             let newFriends = prev.stats?.friends || 0;
                             let newFollowers = prev.stats?.followers || 0;
                             
                             if (typeof newFriends === 'number' && typeof newFollowers === 'number') {
                               if (prev.relation === "friend" && relation !== "friend") {
                                 newFriends = Math.max(0, newFriends - 1);
                               } else if (prev.relation !== "friend" && relation === "friend") {
                                 newFriends += 1;
                               }
                               
                               if (prev.isFollowing && !conn.isFollowing) {
                                 newFollowers = Math.max(0, newFollowers - 1);
                               } else if (!prev.isFollowing && conn.isFollowing) {
                                 newFollowers += 1;
                               }
                             }
                             
                             return { 
                               ...prev, 
                               relation, 
                               isFollowing: conn.isFollowing, 
                               requestedBy: conn.friendshipRequestedBy,
                               stats: { ...prev.stats, friends: newFriends, followers: newFollowers }
                             };
                           });
                           connectionCache.set(selectedProfile.id, conn); // update cache so next open is fresh
                           
                           // Also trigger custom event so other components (like feed) can update if necessary
                           window.dispatchEvent(new CustomEvent("friend-accepted", { 
                             detail: { senderId: selectedProfile.id, currentUserId: currentUser.id }
                           }));
                        }
                      }}'''

content = content.replace(old_onclick, new_onclick)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated onClick to instantly update stats")
