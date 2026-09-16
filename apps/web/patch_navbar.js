const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldSearchBar = `          <img src="/logo-horizontal2.png" alt="Mencari" className="h-[40px] w-auto object-contain hidden dark:block" />
          <div className="hidden md:flex items-center bg-[#F0F2F5] dark:bg-[#3A3B3C] rounded-full px-3 py-2 w-64 ml-1">
            <svg className="w-4 h-4 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder={t('nav.search')} 
              className="bg-transparent border-none focus:outline-none ml-2 w-full text-[15px] placeholder-gray-500 dark:placeholder-[#B0B3B8]" 
            />
          </div>
        </div>`;

const newSearchBar = `          <img src="/logo-horizontal2.png" alt="Mencari" className="h-[40px] w-auto object-contain hidden dark:block" />
        </div>`;

file = file.split(oldSearchBar).join(newSearchBar);
file = file.split(oldSearchBar.replace(/\n/g, '\r\n')).join(newSearchBar.replace(/\n/g, '\r\n'));


const oldTabs = `          <div className="flex flex-col items-center justify-center w-[110px] h-full border-b-[3px] border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400 cursor-pointer">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-[11px] font-semibold mt-0.5">{t('tabs.home')}</span>
          </div>`;

const newTabs = `          <div className="flex flex-col items-center justify-center w-[110px] h-full border-b-[3px] border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400 cursor-pointer">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-[11px] font-semibold mt-0.5">{t('tabs.home')}</span>
          </div>
          <div className="flex flex-col items-center justify-center w-[110px] h-full text-gray-500 dark:text-[#B0B3B8] hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors my-1 border-b-[3px] border-transparent">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="text-[11px] font-semibold mt-1">Mencari</span>
          </div>`;

file = file.split(oldTabs).join(newTabs);
file = file.split(oldTabs.replace(/\n/g, '\r\n')).join(newTabs.replace(/\n/g, '\r\n'));


fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Replaced search bar with tab');
