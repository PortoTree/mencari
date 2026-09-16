const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const target1 = `<button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {t('postMenu.showProfile')}
                    </button>`;

const newShowProfileBtn1 = `<button 
                      onClick={() => {
                        setSelectedProfile({ name: 'Pengguna', role: 'Member', avatar: '/default-avatar.svg' });
                        setIsProfileSidebarOpen(true);
                        setActivePostMenu(null);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {t('postMenu.showProfile')}
                    </button>`;

const newShowProfileBtn2 = `<button 
                      onClick={() => {
                        setSelectedProfile({ name: 'Naufal faiz', role: 'Web Development', avatar: '/default-avatar.svg' });
                        setIsProfileSidebarOpen(true);
                        setActivePostMenu(null);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                      <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {t('postMenu.showProfile')}
                    </button>`;

// manual index replacement
let parts = file.split(target1);
if (parts.length === 1) {
  parts = file.split(target1.replace(/\n/g, '\r\n'));
}

if (parts.length === 3) {
  file = parts[0] + newShowProfileBtn1 + parts[1] + newShowProfileBtn2 + parts[2];
} else if (parts.length === 2) {
  file = parts[0] + newShowProfileBtn1 + parts[1];
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added onClick to showProfile');
