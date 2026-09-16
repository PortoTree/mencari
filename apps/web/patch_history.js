const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// The block to replace
const oldBlock = `<h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px]">Bookmarks</h3>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 p-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#E8F0FE] dark:bg-[#3C4043] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#1A73E8] dark:text-[#8AB4F8]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                </div>
                <span className="text-[14px] font-medium text-black dark:text-[#E4E6EB]">Google</span>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#FCE8E6] dark:bg-[#3C4043] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#D93025] dark:text-[#F28B82]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                </div>
                <span className="text-[14px] font-medium text-black dark:text-[#E4E6EB]">YouTube</span>
              </div>
            </div>`;

const newBlock = `<h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px]">{t('mencari.history')}</h3>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 p-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#3C4043] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-gray-600 dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-[14px] font-medium text-black dark:text-[#E4E6EB] truncate">https://github.com/mencari-online</span>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#3C4043] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-gray-600 dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-[14px] font-medium text-black dark:text-[#E4E6EB] truncate">Cara membuat website 2026</span>
              </div>
            </div>`;

file = file.split(oldBlock).join(newBlock);
file = file.split(oldBlock.replace(/\n/g, '\r\n')).join(newBlock.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Replaced Bookmarks with History panel');
