import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update onProfileClick cache path
old_cache_set = '''                        relation: relation,
                        isFollowing: conn.isFollowing,'''
new_cache_set = '''                        relation: relation,
                        isFollowing: conn.isFollowing,
                        requestedBy: conn.friendshipRequestedBy,'''
content = content.replace(old_cache_set, new_cache_set)

# 2. Update onProfileClick fetch path
old_fetch_set = '''                        relation: relation,
                        isFollowing: conn.isFollowing,'''
# (Since the old_cache_set and old_fetch_set are identical, the replace above might do both if we use re.sub, let's use string replace which replaces all occurrences)

# Wait, let's just use string replace. It's safer.

# 3. Update CTA button onClick handler
old_onclick = '''                           if (conn.friendshipStatus === "ACCEPTED") relation = "friend";
                           else if (conn.friendshipStatus === "PENDING") relation = "request";
                           setSelectedProfile((prev: any) => ({ ...prev, relation, isFollowing: conn.isFollowing }));
                        }'''
new_onclick = '''                           if (conn.friendshipStatus === "ACCEPTED") relation = "friend";
                           else if (conn.friendshipStatus === "PENDING") relation = "request";
                           setSelectedProfile((prev: any) => ({ ...prev, relation, isFollowing: conn.isFollowing, requestedBy: conn.friendshipRequestedBy }));
                           connectionCache.set(selectedProfile.id, conn); // update cache so next open is fresh
                        }'''
content = content.replace(old_onclick, new_onclick)

# 4. Update CTA button className
old_btn_class = '''                      className={`flex-[1.5] flex items-center justify-center gap-1.5 font-semibold py-2.5 rounded-xl text-[13px] transition-all shadow-sm active:scale-[0.98] ${
                        selectedProfile.relation === "friend" || selectedProfile.relation === "request" || selectedProfile.isFollowing
                        ? "bg-gray-100 dark:bg-white/[0.07] hover:bg-gray-200 dark:hover:bg-white/[0.12] text-gray-800 dark:text-white"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
                      }`}'''

new_btn_class = '''                      className={`flex-[1.5] flex items-center justify-center gap-1.5 font-semibold py-2.5 rounded-xl text-[13px] transition-all shadow-sm active:scale-[0.98] ${
                        selectedProfile.relation === "friend"
                        ? "bg-gray-100 dark:bg-white/[0.07] hover:bg-gray-200 dark:hover:bg-white/[0.12] text-gray-800 dark:text-white"
                        : selectedProfile.relation === "request" && selectedProfile.requestedBy !== currentUser?.id
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : (selectedProfile.relation === "request" || selectedProfile.isFollowing)
                        ? "bg-transparent border border-gray-300 dark:border-[#4E4F50] text-black dark:text-[#E4E6EB] hover:bg-red-50 hover:border-red-500 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:border-red-500 dark:hover:text-red-400"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
                      }`}'''
content = content.replace(old_btn_class, new_btn_class)

# 5. Update CTA button text and svg condition
old_btn_content = '''                      {!(selectedProfile.relation === "friend" || selectedProfile.relation === "request" || selectedProfile.isFollowing) && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                      )}
                      {selectedProfile.relation === "friend" 
                        ? (t("friend.alreadyFriend") || "Friends") 
                        : selectedProfile.relation === "request"
                        ? (t("friend.following") || "Mengikuti")
                        : selectedProfile.isFollowing
                        ? (t("friend.following") || "Mengikuti")
                        : "Follow"}'''

new_btn_content = '''                      {!(selectedProfile.relation === "friend" || selectedProfile.relation === "request" || selectedProfile.isFollowing) && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                      )}
                      {selectedProfile.relation === "friend" 
                        ? (t("friend.alreadyFriend") || "Friends") 
                        : selectedProfile.relation === "request" && selectedProfile.requestedBy !== currentUser?.id
                        ? (t("profile.acceptRequestBtn") || "Terima Permintaan")
                        : (selectedProfile.relation === "request" || selectedProfile.isFollowing)
                        ? (t("friend.following") || "Mengikuti")
                        : "Follow"}'''
content = content.replace(old_btn_content, new_btn_content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated profile sidebar CTA buttons and logic")
