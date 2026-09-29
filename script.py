import sys

target = '''              {!isProfileInaccessible ? (
                <>
                  <div className="w-full max-w-[590px] mx-auto mt-4 mb-2 min-h-[480px] max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
                    {activeStatTab ? ('''

with open('apps/web/src/app/[locale]/p/[username]/[id]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find(target)
if start_idx == -1:
    print('Target not found')
    sys.exit(1)

end_str = '''                </div>
              </div>
            )}
          </div>'''
end_idx = content.find(end_str, start_idx) + len(end_str)

block_to_replace = content[start_idx:end_idx]

replacement = '''              {!isProfileInaccessible ? (
                <>
                  <div className="w-full max-w-[590px] mx-auto mt-4 mb-2">
                    {activeStatTab ? (
                      <div>
                        <div className="flex items-center justify-between mb-4 px-1 sticky top-0 bg-[#F3F2EF] dark:bg-[#18191A] z-10 py-1">
                          <div className="relative flex-1 max-w-[240px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input type="text" placeholder={t("search") || "Cari..."} className="w-full pl-9 pr-4 py-1.5 bg-white dark:bg-[#242526] border border-gray-200 dark:border-gray-700 rounded-full text-[13px] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" />
                          </div>
                          <button onClick={() => { setActiveStatTab(null); setStatPage(1); }} className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-gray-500 transition-colors ml-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {dummyStatsUsers.slice((statPage - 1) * 8, statPage * 8).map((user, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/40 dark:bg-[#242526]/40 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-[#2A2B2C] hover:shadow-sm transition-all cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
                                <div className="flex flex-col">
                                  <span className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight">{user.name}</span>
                                  <span className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">@{user.username}</span>
                                </div>
                              </div>
                              <button className="flex items-center justify-center px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 font-semibold text-[13px] transition-colors">
                                {isOwnProfile || user.isFriend ? (t("see") || "Lihat") : (t("followBtn") || "+ Follow")}
                              </button>
                            </div>
                          ))}
                        </div>
                        {dummyStatsUsers.length > 8 && (
                          <div className="flex justify-between items-center mt-6 px-2">
                            <button 
                              disabled={statPage === 1}
                              onClick={() => setStatPage(p => p - 1)}
                              className="px-4 py-2 rounded-full bg-gray-200 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Kembali
                            </button>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Halaman {statPage}</span>
                            <button 
                              disabled={statPage * 8 >= dummyStatsUsers.length}
                              onClick={() => setStatPage(p => p + 1)}
                              className="px-4 py-2 rounded-full bg-gray-200 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Lanjut
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-6">
                  
                        {/* 1. Grup yang kamu buat */}
                        {(!expandedGroupTab || expandedGroupTab === 'managed') && (
                          <div>
                            <div className="flex items-center justify-between mb-3 px-1">
                              <h3 className="text-[15px] font-bold text-black dark:text-white flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                {t("managedGroups")}
                              </h3>
                              {expandedGroupTab === 'managed' ? (
                                <button onClick={() => { setExpandedGroupTab(null); setGroupPage(1); }} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-gray-500 transition-colors">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                              ) : (
                                dummyManagedGroups.length > 3 && (
                                  <button onClick={() => { setExpandedGroupTab('managed'); setGroupPage(1); }} className="text-[13px] font-bold text-[#10B981] hover:text-emerald-700 transition-colors">{t("seeAll") || "Lihat Semua"}</button>
                                )
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              {dummyManagedGroups.slice(expandedGroupTab === 'managed' ? (groupPage - 1) * 6 : 0, expandedGroupTab === 'managed' ? groupPage * 6 : 3).map((group, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/40 dark:bg-[#242526]/40 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-[#2A2B2C] hover:shadow-sm transition-all cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform`}>
                                      {group.initial}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <p className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight">{group.name}</p>
                                        {group.role === 'Owner' ? (
                                          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-sm">
                                            <img src="/owner.svg" alt="Owner" className="w-3 h-3 invert dark:invert-0" style={{ filter: "brightness(0) invert(1)" }} />
                                            <span className="text-[10px] font-bold uppercase">{group.role}</span>
                                          </div>
                                        ) : (
                                          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-sm">
                                            <img src="/admin.svg" alt="Admin" className="w-3 h-3 invert dark:invert-0" style={{ filter: "brightness(0) invert(1)" }} />
                                            <span className="text-[10px] font-bold uppercase">{group.role}</span>
                                          </div>
                                        )}
                                      </div>
                                      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">{group.members} Member</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 font-semibold text-[13px] transition-colors">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                                      {t("joinGroup")}
                                    </button>
                                    <div className="relative flex items-center justify-center">
                                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors peer focus:outline-none">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                      </button>
                                      <div className="absolute right-0 top-6 mt-1 w-48 bg-white dark:bg-[#242526] rounded-xl shadow-lg border border-gray-100 dark:border-white/10 opacity-0 invisible peer-focus:opacity-100 peer-focus:visible hover:opacity-100 hover:visible transition-all z-50 overflow-hidden">
                                        <button className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-2 transition-colors border-b border-gray-100 dark:border-white/5">
                                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                          {t("viewGroup")}
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-2 transition-colors">
                                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                          {t("reportCommunity")}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {expandedGroupTab === 'managed' && dummyManagedGroups.length > 6 && (
                              <div className="flex justify-between items-center mt-6 px-2">
                                <button 
                                  disabled={groupPage === 1}
                                  onClick={() => setGroupPage(p => p - 1)}
                                  className="px-4 py-2 rounded-full bg-gray-200 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Kembali
                                </button>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Halaman {groupPage}</span>
                                <button 
                                  disabled={groupPage * 6 >= dummyManagedGroups.length}
                                  onClick={() => setGroupPage(p => p + 1)}
                                  className="px-4 py-2 rounded-full bg-gray-200 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Lanjut
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* 2. Komunitas yang diikuti */}
                        {(!expandedGroupTab || expandedGroupTab === 'joined') && (
                          <div className={expandedGroupTab ? "" : "mt-2"}>
                            <div className="flex items-center justify-between mb-3 px-1">
                              <h3 className="text-[15px] font-bold text-black dark:text-white flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                {t("joinedGroups")}
                              </h3>
                              {expandedGroupTab === 'joined' ? (
                                <button onClick={() => { setExpandedGroupTab(null); setGroupPage(1); }} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-gray-500 transition-colors">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                              ) : (
                                dummyJoinedGroups.length > 3 && (
                                  <button onClick={() => { setExpandedGroupTab('joined'); setGroupPage(1); }} className="text-[13px] font-bold text-[#10B981] hover:text-emerald-700 transition-colors">{t("seeAll") || "Lihat Semua"}</button>
                                )
                              )}
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              {dummyJoinedGroups.slice(expandedGroupTab === 'joined' ? (groupPage - 1) * 6 : 0, expandedGroupTab === 'joined' ? groupPage * 6 : 3).map((group, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/40 dark:bg-[#242526]/40 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-[#2A2B2C] hover:shadow-sm transition-all cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform`}>
                                      {group.initial}
                                    </div>
                                    <div>
                                      <p className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight">{group.name}</p>
                                      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">{group.members} Member</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 font-semibold text-[13px] transition-colors">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                      {t("visit")}
                                    </button>
                                    
                                    <div className="relative flex items-center justify-center">
                                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors peer focus:outline-none">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                      </button>
                                      <div className="absolute right-0 top-6 mt-1 w-48 bg-white dark:bg-[#242526] rounded-xl shadow-lg border border-gray-100 dark:border-white/10 opacity-0 invisible peer-focus:opacity-100 peer-focus:visible hover:opacity-100 hover:visible transition-all z-50 overflow-hidden">
                                        <button className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-2 transition-colors border-b border-gray-100 dark:border-white/5">
                                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                                          {t("joinOnly") || "Gabung"}
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-2 transition-colors">
                                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                          {t("reportCommunity")}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {expandedGroupTab === 'joined' && dummyJoinedGroups.length > 6 && (
                              <div className="flex justify-between items-center mt-6 px-2">
                                <button 
                                  disabled={groupPage === 1}
                                  onClick={() => setGroupPage(p => p - 1)}
                                  className="px-4 py-2 rounded-full bg-gray-200 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Kembali
                                </button>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Halaman {groupPage}</span>
                                <button 
                                  disabled={groupPage * 6 >= dummyJoinedGroups.length}
                                  onClick={() => setGroupPage(p => p + 1)}
                                  className="px-4 py-2 rounded-full bg-gray-200 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Lanjut
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : null}
