const fs = require('fs');
const code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

const startBroken = lines.findIndex(l => l.includes("t('chat.activeFriends')"));
const endBroken = lines.findIndex((l, i) => i > startBroken && l.includes("t('chat.offlineFriends')"));

// Replace lines startBroken..endBroken-1 with correct online map block
const newOnlineBlock = `                  {t('chat.activeFriends')} ({dummyChats.filter(c => c.isOnline).length})
                </div>
                {dummyChats.filter(c => c.isOnline).map((chat, idx) => {
                  const realIdx = dummyChats.indexOf(chat);
                  const isAdded = selectedFriendsToAdd.includes(realIdx);
                  return (
                    <div
                      key={'online-'+idx}
                      className={\`relative group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors mb-1 \${isAdded ? 'bg-green-50 dark:bg-[#00B47A]/10 hover:bg-green-100 dark:hover:bg-[#00B47A]/20' : 'hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'}\`}
                    >
                      <div className="relative w-14 h-14 shrink-0">
                        <img
                          src="/default-avatar.svg"
                          className={\`w-full h-full rounded-full object-cover transition-all \${isAdded ? 'border-2 border-[#00B47A]' : 'border border-emerald-600 dark:border-emerald-400'}\`}
                        />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>
                        {isAdded && (
                          <div className="absolute -top-0.5 -left-0.5 w-5 h-5 bg-[#00B47A] rounded-full border-2 border-white dark:border-[#242526] flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className={\`font-semibold text-[15px] truncate \${isAdded ? 'text-[#00B47A]' : 'text-black dark:text-[#E4E6EB]'}\`}>
                          {chat.name}
                        </h4>
                      </div>
                      {/* Hover Action Icons */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        {/* Icon Profil */}
                        <div className="relative group/tooltip">
                          <button
                            onClick={() => { setProfileViewIdx(realIdx); setActiveChatIdx(null); setIsCreatingGroup(false); }}
                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#3A3B3C] hover:bg-[#E7F3FF] dark:hover:bg-[#183966] flex items-center justify-center text-gray-500 dark:text-[#B0B3B8] hover:text-[#1877F2] dark:hover:text-[#2D88FF] transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          </button>
                          <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-gray-800 dark:bg-[#E4E6EB] text-white dark:text-black text-[12px] font-medium px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity z-50">
                            {t('chat.profileInfo')}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-[#E4E6EB]"></div>
                          </div>
                        </div>
                        {/* Icon + Tambahkan */}
                        <div className="relative group/tooltip">
                          <button
                            onClick={() => setSelectedFriendsToAdd(prev => isAdded ? prev.filter(i => i !== realIdx) : [...prev, realIdx])}
                            className={\`w-8 h-8 rounded-full flex items-center justify-center transition-colors \${isAdded ? 'bg-[#00B47A] text-white' : 'bg-gray-200 dark:bg-[#3A3B3C] hover:bg-[#E7F3FF] dark:hover:bg-[#183966] text-gray-500 dark:text-[#B0B3B8] hover:text-[#1877F2] dark:hover:text-[#2D88FF]'}\`}
                          >
                            {isAdded
                              ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                              : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            }
                          </button>
                          <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-gray-800 dark:bg-[#E4E6EB] text-white dark:text-black text-[12px] font-medium px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity z-50">
                            {isAdded ? t('chat.selectedUsers') : t('chat.addFriend')}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-[#E4E6EB]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}`;

lines.splice(startBroken, endBroken - startBroken, newOnlineBlock);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Fixed! Online block replaced. Lines removed:', endBroken - startBroken, '-> 1 new block');
