const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// The crude posts block starts at `{/* Post 1 */}` and ends before `</div>\n            </div>\n          )}`
const crudePostsStart = file.indexOf('{/* Post 1 */}');
// find the end of the crude posts, which is right before the closing divs for activeTab === 'friend'
const friendBlockEnd = file.indexOf('</div>\n            </div>\n          )}', crudePostsStart);
const crudePostsBlock = file.slice(crudePostsStart, friendBlockEnd);

const newPostsJSX = `{/* Post 1 */}
                <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-4">
                  <div className="flex items-center justify-between pb-2 relative">
                    <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => { setSelectedProfile({ name: 'Budi Santoso', role: 'Member', avatar: 'https://i.pravatar.cc/150?u=20' }); setIsProfileSidebarOpen(true); }}>
                      <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                          <img src="https://i.pravatar.cc/150?u=20" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                      <div>
                        <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">Budi Santoso</h3>
                        <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">{formatPostTime(Date.now() - 3 * 60000, t, locale)}</p>
                      </div>
                    </div>
                    <div className="relative" {...(activePostMenu === 'friendPost1' ? { ref: postMenuRef } : {})}>
                      <button 
                        onClick={() => setActivePostMenu(activePostMenu === 'friendPost1' ? null : 'friendPost1')}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                      </button>

                      {activePostMenu === 'friendPost1' && (
                        <div className="absolute right-0 mt-1 w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[100]">
                          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                            <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                            {t('postMenu.savePost')}
                          </button>
                          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                            <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            {t('postMenu.reportPost')}
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedProfile({ name: 'Budi Santoso', role: 'Member', avatar: 'https://i.pravatar.cc/150?u=20' });
                              setIsProfileSidebarOpen(true);
                              setActivePostMenu(null);
                            }}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                            <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            {t('postMenu.showProfile')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-black dark:text-[#E4E6EB] text-[15px] mb-3 px-4">Akhirnya selesai juga project e-commerce bulan ini! 🚀 Waktunya istirahat sejenak sebelum lanjut ke fase berikutnya.</p>
                  
                  <div className="px-4 pb-4">
                    <div className="flex items-center gap-1 pt-2 border-t border-gray-100 dark:border-[#3E4042]">
                      <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>
                        {t('feed.like')}
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                        {t('feed.comment')}
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
                        {t('feed.share')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Post 2 */}
                <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] pt-4 px-0">
                  <div className="flex items-center justify-between pb-2 px-4 relative">
                    <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => { setSelectedProfile({ name: 'Siti Aminah', role: 'Member', avatar: 'https://i.pravatar.cc/150?u=21' }); setIsProfileSidebarOpen(true); }}>
                      <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                          <img src="https://i.pravatar.cc/150?u=21" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                      <div>
                        <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">Siti Aminah</h3>
                        <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">{formatPostTime(Date.now() - 5 * 3600000, t, locale)}</p>
                      </div>
                    </div>
                    <div className="relative" {...(activePostMenu === 'friendPost2' ? { ref: postMenuRef } : {})}>
                      <button 
                        onClick={() => setActivePostMenu(activePostMenu === 'friendPost2' ? null : 'friendPost2')}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                      </button>

                      {activePostMenu === 'friendPost2' && (
                        <div className="absolute right-0 mt-1 w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[100]">
                          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                            <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                            {t('postMenu.savePost')}
                          </button>
                          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                            <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            {t('postMenu.reportPost')}
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedProfile({ name: 'Siti Aminah', role: 'Member', avatar: 'https://i.pravatar.cc/150?u=21' });
                              setIsProfileSidebarOpen(true);
                              setActivePostMenu(null);
                            }}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                            <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            {t('postMenu.showProfile')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-black dark:text-[#E4E6EB] text-[15px] mb-3 px-4">Ada yang tau tempat ngopi enak di sekitar Jakarta Selatan buat WFC? Butuh suasana baru nih. ☕💻</p>
                  
                  <div className="px-4 pb-4">
                    <div className="flex items-center gap-1 pt-2 border-t border-gray-100 dark:border-[#3E4042]">
                      <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>
                        {t('feed.like')}
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                        {t('feed.comment')}
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
                        {t('feed.share')}
                      </button>
                    </div>
                  </div>
                </div>\n`;

file = file.split(crudePostsBlock).join(newPostsJSX);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Replaced crude friend posts with fully featured home post component layouts');
