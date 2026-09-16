const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const target = `                {/* Gallery Grid */}
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
                </div>`;

const replacement = `                {/* Account Details */}
                <div className="p-4 border-b border-gray-100 dark:border-[#3E4042]">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F0F2F5] dark:bg-[#3A3B3C] flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB]">{t('profileSidebar.activity')}</p>
                        <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8]">Aktif 5 jam yang lalu</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F0F2F5] dark:bg-[#3A3B3C] flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB]">{t('profileSidebar.ownedGroups')}</p>
                        <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8]">Web Dev Indonesia</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F0F2F5] dark:bg-[#3A3B3C] flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB]">{t('profileSidebar.joinedGroups')}</p>
                        <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8]">5 Grup</p>
                      </div>
                    </div>
                  </div>
                </div>`;

let parts = file.split(target);
if (parts.length === 1) {
  parts = file.split(target.replace(/\n/g, '\r\n'));
}

if (parts.length > 1) {
  file = parts.join(replacement.replace(/\n/g, parts[0].includes('\r\n') ? '\r\n' : '\n'));
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
  console.log('✅ Replaced gallery with account details');
} else {
  console.log('⚠️ Could not find target');
}
