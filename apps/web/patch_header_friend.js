const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldFriendsTab = `<div className="flex flex-col items-center justify-center w-[110px] h-full text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors my-1 border-b-[3px] border-transparent">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <span className="text-[11px] font-semibold mt-0.5">{t('tabs.friends')}</span>
          </div>`;

const newFriendsTab = `<div 
            onClick={() => { setActiveTab('friend'); window.history.pushState(null, '', \`/\${locale}/friend\`); }} 
            className={\`flex flex-col items-center justify-center w-[110px] h-full cursor-pointer transition-colors \${activeTab === 'friend' ? 'border-b-[3px] border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400 my-0 h-full rounded-none' : 'border-b-[3px] border-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg my-1'}\`}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <span className="text-[11px] font-semibold mt-0.5">{t('tabs.friends')}</span>
          </div>`;

file = file.split(oldFriendsTab).join(newFriendsTab);
file = file.split(oldFriendsTab.replace(/\n/g, '\r\n')).join(newFriendsTab.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated header Friends tab to use activeTab logic');
