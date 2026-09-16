const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const targetStart = `{/* Account Details */}`;
const targetEnd = `{/* Recent Posts */}`;

let startIndex = file.indexOf(targetStart);
let endIndex = file.indexOf(targetEnd);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `{/* Account Details / Lists */}
                <div className="p-4 border-b border-gray-100 dark:border-[#3E4042]">
                  
                  {/* Aktivitas Akun */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-[15px] text-black dark:text-[#E4E6EB]">{t('profileSidebar.activity')}</h4>
                      <a href="#" className="text-[13px] text-emerald-600 dark:text-emerald-400 hover:underline">Lihat Semua</a>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </div>
                        <div>
                          <p className="text-[13px] text-black dark:text-[#E4E6EB]">Membuat postingan di grup <span className="font-semibold">Web Dev Indonesia</span></p>
                          <p className="text-[11px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">2 jam lalu</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                        </div>
                        <div>
                          <p className="text-[13px] text-black dark:text-[#E4E6EB]">Bergabung dengan grup <span className="font-semibold">UI/UX Enthusiast</span></p>
                          <p className="text-[11px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">Kemarin</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pemilik Grup */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-[15px] text-black dark:text-[#E4E6EB]">{t('profileSidebar.ownedGroups')}</h4>
                      <a href="#" className="text-[13px] text-emerald-600 dark:text-emerald-400 hover:underline">Lihat Semua</a>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-[#3A3B3C] shrink-0 overflow-hidden">
                          <img src="/default-cover.jpg" alt="Group" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] leading-tight hover:underline cursor-pointer">Web Dev Indonesia</p>
                          <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">15.2K Member</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-[#3A3B3C] shrink-0 overflow-hidden">
                          <img src="/default-cover.jpg" alt="Group" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] leading-tight hover:underline cursor-pointer">Freelance Programmer ID</p>
                          <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">8.1K Member</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grup yang diikuti */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-[15px] text-black dark:text-[#E4E6EB]">{t('profileSidebar.joinedGroups')}</h4>
                      <a href="#" className="text-[13px] text-emerald-600 dark:text-emerald-400 hover:underline">Lihat Semua</a>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-[#3A3B3C] shrink-0 overflow-hidden">
                          <img src="/default-cover.jpg" alt="Group" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] leading-tight hover:underline cursor-pointer">Next.js Indonesia</p>
                          <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">30.5K Member</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-[#3A3B3C] shrink-0 overflow-hidden">
                          <img src="/default-cover.jpg" alt="Group" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] leading-tight hover:underline cursor-pointer">Tailwind CSS Community</p>
                          <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">25.3K Member</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                `;
  file = file.slice(0, startIndex) + replacement + file.slice(endIndex);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
  console.log('✅ Replaced list structures');
} else {
  console.log('⚠️ Target not found');
}
