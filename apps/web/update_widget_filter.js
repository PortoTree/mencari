const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const replacement = `                  {/* Filter Dropdown */}
                  {isChatFilterOpen && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#242526] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-[#3E4042] py-1.5 z-50">
                        <button onClick={(e) => { e.stopPropagation(); setChatListFilter('group'); setIsChatFilterOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                          <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                          {t('chat.filterGroup')}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); setChatListFilter('archive'); setIsChatFilterOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                          <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12.14l.84 1H5.12z" /></svg>
                          {t('chat.filterArchive')}
                        </button>
                      </div>
                  )}`;

const lines = code.split('\n');
lines.splice(3307, 30, ...replacement.split('\n')); 

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Done');
