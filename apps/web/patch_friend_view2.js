const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Replace Center Feed
const oldCenterFeed = `{activeTab === 'friend' && (
            <div className="w-full flex flex-col items-center pt-8 max-w-[680px]">
              <div className="w-full max-w-[590px] px-4 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-black dark:text-[#E4E6EB]">{t('sidebar.friends')}</h2>
                </div>
                {/* Empty State / Placeholder for Friends */}
                <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-[#3A3B3C] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <h3 className="text-[17px] font-semibold text-black dark:text-[#E4E6EB] mb-2">Belum ada teman</h3>
                  <p className="text-[15px] text-gray-500 dark:text-[#B0B3B8]">Cari dan tambahkan teman untuk melihat pembaruan mereka di sini.</p>
                </div>
              </div>
            </div>
          )}`;

const newCenterFeed = `{activeTab === 'friend' && (
            <div className="w-full flex flex-col items-center pt-6 max-w-[680px]">
              <div className="w-full max-w-[590px] px-4 space-y-4">
                
                {/* Post 1 */}
                <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-4 w-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-[#3A3B3C]">
                      <img src="https://i.pravatar.cc/150?u=20" alt="Budi Santoso" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[15px] text-black dark:text-[#E4E6EB]">Budi Santoso</h4>
                      <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">2 jam yang lalu</p>
                    </div>
                  </div>
                  <p className="text-[15px] text-black dark:text-[#E4E6EB] mb-3">
                    Akhirnya selesai juga project e-commerce bulan ini! 🚀 Waktunya istirahat sejenak sebelum lanjut ke fase berikutnya.
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#3E4042]">
                    <button className="flex-1 flex items-center justify-center gap-2 text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] px-4 py-1.5 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                      <span className="text-[13px] font-medium">Suka</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] px-4 py-1.5 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      <span className="text-[13px] font-medium">Komentar</span>
                    </button>
                  </div>
                </div>

                {/* Post 2 */}
                <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-4 w-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-[#3A3B3C]">
                      <img src="https://i.pravatar.cc/150?u=21" alt="Siti Aminah" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[15px] text-black dark:text-[#E4E6EB]">Siti Aminah</h4>
                      <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">5 jam yang lalu</p>
                    </div>
                  </div>
                  <p className="text-[15px] text-black dark:text-[#E4E6EB] mb-3">
                    Ada yang tau tempat ngopi enak di sekitar Jakarta Selatan buat WFC? Butuh suasana baru nih. ☕💻
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#3E4042]">
                    <button className="flex-1 flex items-center justify-center gap-2 text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] px-4 py-1.5 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                      <span className="text-[13px] font-medium">Suka</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] px-4 py-1.5 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      <span className="text-[13px] font-medium">Komentar</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}`;

file = file.split(oldCenterFeed).join(newCenterFeed);
file = file.split(oldCenterFeed.replace(/\n/g, '\r\n')).join(newCenterFeed.replace(/\n/g, '\r\n'));

// 2. Add Right Sidebar Friend List
const rightSidebarTarget = `{/* Right Sidebar (Chat Panel) */}`;
const newRightSidebarFriendList = `{/* Right Sidebar: Friend List (Friend Tab) */}
        {activeTab === 'friend' && (
          <div className="hidden lg:block fixed right-0 top-[56px] w-[280px] xl:w-[320px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[#4E4F50] [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="flex items-center justify-between mb-2 px-2">
              <h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px]">{t('profileSidebar.friends') || 'Daftar Teman'}</h3>
            </div>
            <div className="space-y-1">
              {["Budi Santoso", "Siti Aminah", "Agus Pratama", "Dewi Lestari", "Rudi Hermawan", "Rina Marlina", "Andi Wijaya"].map((name, i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors relative group">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-[#4E4F50] overflow-hidden shrink-0">
                      <img src={\`https://i.pravatar.cc/150?u=\${i + 20}\`} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#242526] rounded-full"></div>
                  </div>
                  <span className="text-[14px] font-medium text-black dark:text-[#E4E6EB] flex-1 truncate">{name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right Sidebar (Chat Panel) */}`;

file = file.replace(rightSidebarTarget, newRightSidebarFriendList);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added Friend List to Right Sidebar and Dummy Posts to Center Feed');
