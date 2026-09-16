const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldMencariBtn = `className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"
            >
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">Mencari</span>
            </button>`;

const newMencariBtn = `className={\`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors \${activeTab === 'mencari' ? 'bg-gray-100 dark:bg-[#3A3B3C]' : ''}\`}
            >
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">Mencari</span>
            </button>`;

file = file.split(oldMencariBtn).join(newMencariBtn);
file = file.split(oldMencariBtn.replace(/\n/g, '\r\n')).join(newMencariBtn.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added active tab styling to sidebar Mencari button');
