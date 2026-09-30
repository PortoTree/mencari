import re

file_path = 'c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the entire action buttons block
old_actions = '''              {/* ── Action Buttons ───────────────────────────────────────── */}
              <div className="px-4 pb-4 flex flex-col gap-2 border-b border-gray-100 dark:border-white/5">
                {selectedProfile.id === currentUser?.id ? (
                  <div className="flex justify-center">
                    <button onClick={() => router.push(`/${locale}/p/${selectedProfile.username}/${selectedProfile.id}`)} className="w-[50%] flex items-center justify-center bg-gray-100 dark:bg-white/[0.07] hover:bg-gray-200 dark:hover:bg-white/[0.12] text-gray-800 dark:text-white font-semibold py-2.5 rounded-xl text-[13px] transition-all">
                      {t("profileSidebar.openProfile")}
                    </button>
                  </div>
                ) : selectedProfile.relation === "friend" ? (
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 dark:bg-white/[0.07] hover:bg-gray-200 dark:hover:bg-white/[0.12] text-gray-800 dark:text-white font-semibold py-2 rounded-xl text-[13px] transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {t("friend.alreadyFriend")}
                    </button>
                    <button onClick={() => router.push(`/${locale}/p/${selectedProfile.name}/${selectedProfile.id || "1"}`)} className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 dark:bg-white/[0.07] hover:bg-gray-200 dark:hover:bg-white/[0.12] text-gray-800 dark:text-white font-semibold py-2 rounded-xl text-[13px] transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {t("profileSidebar.openProfile")}
                    </button>
                  </div>
                ) : selectedProfile.relation === "request" ? (
                  <div className="flex gap-2">
                    <button className="flex-[1.5] flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl text-[13px] transition-all shadow-sm shadow-emerald-500/20 active:scale-[0.98]">
                      {t("friend.accept")}
                    </button>
                    <button onClick={() => router.push(`/${locale}/p/${selectedProfile.name}/${selectedProfile.id || "1"}`)} className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-white/[0.07] hover:bg-gray-200 dark:hover:bg-white/[0.12] text-gray-800 dark:text-white font-semibold py-2.5 rounded-xl text-[13px] transition-all">
                      {t("profileSidebar.openProfile")}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button className="flex-[1.5] flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl text-[13px] transition-all shadow-sm shadow-emerald-500/20 active:scale-[0.98]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                      {t("profileSidebar.addFriend")}
                    </button>
                    <button onClick={() => router.push(`/${locale}/p/${selectedProfile.name}/${selectedProfile.id || "1"}`)} className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-white/[0.07] hover:bg-gray-200 dark:hover:bg-white/[0.12] text-gray-800 dark:text-white font-semibold py-2.5 rounded-xl text-[13px] transition-all">
                      {t("profileSidebar.openProfile")}
                    </button>
                  </div>
                )}
              </div>'''

new_actions = '''              {/* ── Action Buttons ───────────────────────────────────────── */}
              <div className="px-4 pb-4 flex flex-col gap-2 border-b border-gray-100 dark:border-white/5">
                {selectedProfile.id === currentUser?.id ? (
                  <div className="flex justify-center">
                    <button onClick={() => router.push(`/${locale}/p/${selectedProfile.username}/${selectedProfile.id}`)} className="w-[50%] flex items-center justify-center bg-gray-100 dark:bg-white/[0.07] hover:bg-gray-200 dark:hover:bg-white/[0.12] text-gray-800 dark:text-white font-semibold py-2.5 rounded-xl text-[13px] transition-all">
                      {t("profileSidebar.openProfile") || "Open Profile"}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button 
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
                    </button>
                    <button onClick={() => router.push(`/${locale}/p/${selectedProfile.username}/${selectedProfile.id}`)} className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-white/[0.07] hover:bg-gray-200 dark:hover:bg-white/[0.12] text-gray-800 dark:text-white font-semibold py-2.5 rounded-xl text-[13px] transition-all">
                      {t("profileSidebar.openProfile") || "Open Profile"}
                    </button>
                  </div>
                )}
              </div>'''

content = content.replace(old_actions, new_actions)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated interactive follow button in sidebar")
