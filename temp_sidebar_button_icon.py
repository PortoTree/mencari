import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_button = '''                    <button 
                      onClick={async () => {
                        const token = localStorage.getItem("token");
                        if (!token) return;
                        const { handlePrimaryConnectionAction, getConnectionStatus } = await import("@/app/actions/connections");
                        const res = await handlePrimaryConnectionAction(token, currentUser.id, selectedProfile.id);
                        if (res.success) {
                           const conn = await getConnectionStatus(currentUser.id, selectedProfile.id);
                           let relation = "none";
                           if (conn.friendshipStatus === "ACCEPTED") relation = "friend";
                           else if (conn.friendshipStatus === "PENDING") relation = "request";
                           setSelectedProfile((prev: any) => ({ ...prev, relation, isFollowing: conn.isFollowing }));
                        }
                      }}
                      className={`flex-[1.5] flex items-center justify-center gap-1.5 font-semibold py-2.5 rounded-xl text-[13px] transition-all shadow-sm active:scale-[0.98] ${
                        selectedProfile.relation === "friend" || selectedProfile.relation === "request" || selectedProfile.isFollowing
                        ? "bg-gray-100 dark:bg-white/[0.07] hover:bg-gray-200 dark:hover:bg-white/[0.12] text-gray-800 dark:text-white"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                      {selectedProfile.relation === "friend" 
                        ? (t("friend.alreadyFriend") || "Berteman") 
                        : selectedProfile.relation === "request"
                        ? (t("friend.pending") || "Diminta")
                        : selectedProfile.isFollowing
                        ? (t("friend.following") || "Mengikuti")
                        : "Follow"}
                    </button>'''

new_button = '''                    <button 
                      onClick={async () => {
                        const token = localStorage.getItem("token");
                        if (!token) return;
                        const { handlePrimaryConnectionAction, getConnectionStatus } = await import("@/app/actions/connections");
                        const res = await handlePrimaryConnectionAction(token, currentUser.id, selectedProfile.id);
                        if (res.success) {
                           const conn = await getConnectionStatus(currentUser.id, selectedProfile.id);
                           let relation = "none";
                           if (conn.friendshipStatus === "ACCEPTED") relation = "friend";
                           else if (conn.friendshipStatus === "PENDING") relation = "request";
                           setSelectedProfile((prev: any) => ({ ...prev, relation, isFollowing: conn.isFollowing }));
                        }
                      }}
                      className={`flex-[1.5] flex items-center justify-center gap-1.5 font-semibold py-2.5 rounded-xl text-[13px] transition-all shadow-sm active:scale-[0.98] ${
                        selectedProfile.relation === "friend" || selectedProfile.relation === "request" || selectedProfile.isFollowing
                        ? "bg-gray-100 dark:bg-white/[0.07] hover:bg-gray-200 dark:hover:bg-white/[0.12] text-gray-800 dark:text-white"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
                      }`}
                    >
                      {!(selectedProfile.relation === "friend" || selectedProfile.relation === "request" || selectedProfile.isFollowing) && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                      )}
                      {selectedProfile.relation === "friend" 
                        ? (t("friend.alreadyFriend") || "Friends") 
                        : selectedProfile.relation === "request"
                        ? (t("friend.following") || "Mengikuti")
                        : selectedProfile.isFollowing
                        ? (t("friend.following") || "Mengikuti")
                        : "Follow"}
                    </button>'''

content = content.replace(old_button, new_button)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated button icon and text in page.tsx")
