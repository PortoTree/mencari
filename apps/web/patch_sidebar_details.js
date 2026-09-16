const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldDrawer = `            {/* Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#3E4042]">
              <h2 className="font-bold text-lg text-black dark:text-[#E4E6EB]">{t('profileSidebar.title')}</h2>
              <button onClick={() => setIsProfileSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            {/* Profile Details */}
            {selectedProfile && (
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500 mb-3 shadow-sm">
                    <img src={selectedProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-xl text-black dark:text-[#E4E6EB]">{selectedProfile.name}</h3>
                  <p className="text-[15px] text-gray-500 dark:text-[#B0B3B8] mt-1">{selectedProfile.role}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[#F0F2F5] dark:bg-[#3A3B3C] p-4 rounded-xl border border-gray-100 dark:border-[#4E4F50]">
                    <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] font-semibold mb-1">{t('profileSidebar.email')}</p>
                    <p className="text-[15px] text-black dark:text-[#E4E6EB]">{selectedProfile.name.toLowerCase().replace(/\\s/g, '')}@example.com</p>
                  </div>
                  <div className="bg-[#F0F2F5] dark:bg-[#3A3B3C] p-4 rounded-xl border border-gray-100 dark:border-[#4E4F50]">
                    <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] font-semibold mb-1">{t('profileSidebar.joined')}</p>
                    <p className="text-[15px] text-black dark:text-[#E4E6EB]">2026</p>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl transition-colors shadow-sm">
                  {t('profileSidebar.message')}
                </button>
              </div>
            )}`;

const newDrawer = `            {selectedProfile && (
              <>
                {/* Header (Cover Photo & Avatar) */}
                <div className="relative">
                  {/* Close Button on top of cover */}
                  <button onClick={() => setIsProfileSidebarOpen(false)} className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white z-10 transition-colors backdrop-blur-sm shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>

                  {/* Cover Photo */}
                  <div className="h-[110px] w-full bg-gray-300 dark:bg-[#3A3B3C]">
                    <img src="/default-cover.jpg" alt="Cover" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add('bg-gradient-to-r', 'from-emerald-500', 'to-teal-600') }} />
                  </div>
                  
                  {/* Avatar */}
                  <div className="absolute -bottom-8 left-4 w-[80px] h-[80px] rounded-full border-4 border-white dark:border-[#242526] bg-white dark:bg-[#242526] overflow-hidden shadow-sm">
                    <img src={selectedProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="pt-10 px-4 pb-4 border-b border-gray-100 dark:border-[#3E4042]">
                  <h3 className="font-bold text-[18px] text-black dark:text-[#E4E6EB] leading-tight">{selectedProfile.name}</h3>
                  <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] mb-3">{selectedProfile.role}</p>
                  
                  {/* Bio */}
                  <p className="text-[14px] text-black dark:text-[#E4E6EB] mb-4">
                    Ini adalah bio singkat dari {selectedProfile.name}. Selalu semangat ngoding dan belajar hal baru setiap hari! 🚀
                  </p>

                  {/* Friends Count */}
                  <div className="flex items-center gap-1.5 text-[14px] text-gray-500 dark:text-[#B0B3B8] mb-4 hover:underline cursor-pointer w-max">
                    <span className="font-bold text-black dark:text-[#E4E6EB]">1.2K</span>
                    <span>{t('profileSidebar.friends')}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button className="flex-[1.5] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                      <span className="text-[14px]">{t('profileSidebar.addFriend')}</span>
                    </button>
                    <button className="flex-1 bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center">
                      <span className="text-[14px]">{t('profileSidebar.openProfile')}</span>
                    </button>
                  </div>
                </div>

                {/* Gallery Grid */}
                <div className="p-4 border-b border-gray-100 dark:border-[#3E4042]">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-[15px] text-black dark:text-[#E4E6EB]">{t('profileSidebar.gallery')}</h4>
                    <a href="#" className="text-[13px] text-emerald-600 dark:text-emerald-400 hover:underline">Lihat Semua</a>
                  </div>
                  <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
                    <div className="aspect-square bg-gray-200 dark:bg-[#3A3B3C] flex items-center justify-center text-xs text-gray-400">1</div>
                    <div className="aspect-square bg-gray-200 dark:bg-[#3A3B3C] flex items-center justify-center text-xs text-gray-400">2</div>
                    <div className="aspect-square bg-gray-200 dark:bg-[#3A3B3C] flex items-center justify-center text-xs text-gray-400">3</div>
                    <div className="aspect-square bg-gray-200 dark:bg-[#3A3B3C] flex items-center justify-center text-xs text-gray-400">4</div>
                    <div className="aspect-square bg-gray-200 dark:bg-[#3A3B3C] flex items-center justify-center text-xs text-gray-400">5</div>
                    <div className="aspect-square bg-gray-200 dark:bg-[#3A3B3C] flex items-center justify-center text-xs text-gray-400">6</div>
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-[15px] text-black dark:text-[#E4E6EB]">{t('profileSidebar.recentPosts')}</h4>
                  </div>
                  
                  {/* Dummy Post 1 */}
                  <div className="mb-3 bg-white dark:bg-[#242526] p-3 rounded-xl border border-gray-200 dark:border-[#4E4F50] shadow-sm">
                     <div className="flex items-center gap-2 mb-2">
                       <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-gray-100 dark:border-[#3A3B3C]">
                         <img src={selectedProfile.avatar} alt="" className="w-full h-full object-cover" />
                       </div>
                       <div className="flex flex-col">
                         <span className="font-semibold text-[13px] text-black dark:text-[#E4E6EB] leading-none">{selectedProfile.name}</span>
                         <span className="text-[11px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">2 jam lalu</span>
                       </div>
                     </div>
                     <p className="text-[13px] text-black dark:text-[#E4E6EB] line-clamp-3">Wah seru banget hari ini nyobain bikin Sidebar UI! Semangat terus buat semua teman-teman developer 🔥🚀</p>
                  </div>

                  {/* Dummy Post 2 */}
                  <div className="bg-white dark:bg-[#242526] p-3 rounded-xl border border-gray-200 dark:border-[#4E4F50] shadow-sm">
                     <div className="flex items-center gap-2 mb-2">
                       <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-gray-100 dark:border-[#3A3B3C]">
                         <img src={selectedProfile.avatar} alt="" className="w-full h-full object-cover" />
                       </div>
                       <div className="flex flex-col">
                         <span className="font-semibold text-[13px] text-black dark:text-[#E4E6EB] leading-none">{selectedProfile.name}</span>
                         <span className="text-[11px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">Kemarin</span>
                       </div>
                     </div>
                     <p className="text-[13px] text-black dark:text-[#E4E6EB] line-clamp-3">Ada yang punya rekomendasi tutorial framework JS yang lagi ngetrend? Kasih saran dong! 🤔</p>
                  </div>
                </div>
              </>
            )}`;

file = file.split(oldDrawer).join(newDrawer);
file = file.split(oldDrawer.replace(/\n/g, '\r\n')).join(newDrawer.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated Profile Sidebar with detailed elements');
