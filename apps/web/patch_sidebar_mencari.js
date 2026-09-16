const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldSidebarTop = `          {/* Navigation Links */}
          <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-2 space-y-1">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
              <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">{t('sidebar.friends')}</span>
            </button>`;

const newSidebarTop = `          {/* Navigation Links */}
          <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-2 space-y-1">
            <button 
              onClick={() => {
                setActiveTab('mencari');
                window.history.pushState(null, '', \`/\${locale}/mencari\`);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"
            >
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">Mencari</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
              <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">{t('sidebar.friends')}</span>
            </button>`;

file = file.split(oldSidebarTop).join(newSidebarTop);
file = file.split(oldSidebarTop.replace(/\n/g, '\r\n')).join(newSidebarTop.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added Mencari to left sidebar');
