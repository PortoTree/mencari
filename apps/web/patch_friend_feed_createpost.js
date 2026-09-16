const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const target = `{/* Post 1 */}
                <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-4 w-full">`;

const createPostBlock = `{/* Create Post Input */}
                <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-4 w-full">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-[#3E4042]">
                    <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                      <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <input 
                      type="text" 
                      placeholder={t('feed.createPost')} 
                      className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] hover:bg-[#E4E6EB] dark:hover:bg-[#4E4F50] transition-colors rounded-full px-4 py-2.5 focus:outline-none cursor-pointer text-gray-600 dark:text-[#B0B3B8] text-[17px]"
                      readOnly
                    />
                  </div>
                  <div className="flex justify-between items-center pt-3 px-1">
                    <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-2 rounded-lg flex-1 justify-center transition-colors">
                      <svg className="w-[24px] h-[24px] text-[#45BD62]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                      {t('feed.photo')}
                    </button>
                    <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-2 rounded-lg flex-1 justify-center transition-colors">
                      <svg className="w-[24px] h-[24px] text-[#1877F2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>
                      Link
                    </button>
                    <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-2 rounded-lg flex-1 justify-center transition-colors">
                      <svg className="w-[24px] h-[24px] text-[#F5C33B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                      {t('feed.events')}
                    </button>
                    <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-2 rounded-lg flex-1 justify-center transition-colors">
                      <svg className="w-[24px] h-[24px] text-[#F35369]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                      {t('feed.more')}
                    </button>
                  </div>
                </div>

                {/* Post 1 */}
                <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-4 w-full">`;

file = file.replace(target, createPostBlock);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added Create Post block to Friends feed');
