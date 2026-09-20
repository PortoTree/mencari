const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

const replacementLines = `                     {isChatFilterOpen && (
                       <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#242526] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-[#3E4042] py-2 z-50">
                         <button onClick={(e) => { e.stopPropagation(); setChatListFilter('favorite'); setIsChatFilterOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-[15px] font-bold text-black dark:text-[#E4E6EB] transition-colors">
                           {t('filter.favorite')}
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); setChatListFilter('group'); setIsChatFilterOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-[15px] font-bold text-black dark:text-[#E4E6EB] transition-colors">
                           {t('filter.groupChat')}
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); setChatListFilter('all'); setIsChatFilterOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-[15px] font-bold text-black dark:text-[#E4E6EB] transition-colors">
                           {t('filter.chatList')}
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); setChatListFilter('archive'); setIsChatFilterOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-[15px] font-bold text-black dark:text-[#E4E6EB] transition-colors">
                           {t('filter.archived')}
                         </button>
                       </div>
                     )}`.split('\n');

lines.splice(4113, 12, ...replacementLines); // 4113 is index for line 4114

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Filter dropdown updated');
