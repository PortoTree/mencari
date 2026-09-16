const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Update activeTab state
file = file.replace(
  "const [activeTab, setActiveTab] = useState<'home' | 'mencari'>(pathname.includes('/mencari') ? 'mencari' : 'home');",
  "const [activeTab, setActiveTab] = useState<'home' | 'mencari' | 'friend'>(pathname.includes('/mencari') ? 'mencari' : pathname.includes('/friend') ? 'friend' : 'home');"
);

// 2. Update sidebar "Mencari" active class if needed (optional, I'll skip to focus on Friends)
// Update sidebar Friends button onClick and active styling
const oldFriendsBtn = `<button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
              <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">{t('sidebar.friends')}</span>
            </button>`;

const newFriendsBtn = `<button 
              onClick={() => {
                setActiveTab('friend');
                window.history.pushState(null, '', \`/\${locale}/friend\`);
              }}
              className={\`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors \${activeTab === 'friend' ? 'bg-gray-100 dark:bg-[#3A3B3C]' : ''}\`}
            >
              <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">{t('sidebar.friends')}</span>
            </button>`;

file = file.split(oldFriendsBtn).join(newFriendsBtn);
file = file.split(oldFriendsBtn.replace(/\n/g, '\r\n')).join(newFriendsBtn.replace(/\n/g, '\r\n'));

// 3. Inject friend feed in the center
const homeFeedStart = `<div className={\`space-y-4 max-w-[590px] w-full px-4 \${activeTab === 'mencari' ? 'hidden' : ''}\`}>`;
const newHomeFeedStart = `{activeTab === 'friend' && (
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
          )}
          <div className={\`space-y-4 max-w-[590px] w-full px-4 \${activeTab !== 'home' ? 'hidden' : ''}\`}>`;

file = file.split(homeFeedStart).join(newHomeFeedStart);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated beranda with friend feed logic');
