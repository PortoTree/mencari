const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldMencariLink = `              className={\`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors \${activeTab === 'mencari' ? 'bg-gray-100 dark:bg-[#3A3B3C]' : ''}\`}
            >
              {activeTab === 'mencari' ? (
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
              ) : (
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              )}`;

const newMencariLink = `              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"
            >
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`;

file = file.split(oldMencariLink).join(newMencariLink);
file = file.split(oldMencariLink.replace(/\n/g, '\r\n')).join(newMencariLink.replace(/\n/g, '\r\n'));

const oldFriendLink = `className={\`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors \${activeTab === 'friend' ? 'bg-gray-100 dark:bg-[#3A3B3C]' : ''}\`}`;
const newFriendLink = `className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"`;

file = file.split(oldFriendLink).join(newFriendLink);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed TS2367 errors');
