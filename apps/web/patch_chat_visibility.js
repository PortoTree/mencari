const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldCode = `{/* Right Sidebar: Bookmarks (Mencari) OR Chat (Home) */}
        {activeTab === 'mencari' ? (
          <div className="hidden lg:block fixed right-0 top-[56px] w-[280px] xl:w-[320px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[#4E4F50] [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="flex items-center justify-between mb-2 px-2">
              <h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px]">{t('mencari.history')}</h3>
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
            </div>
          </div>
        ) : (
          <>
            {/* Right Sidebar (Chat Panel) */}`;

const newCode = `{/* Right Sidebar: History (Mencari) */}
        {activeTab === 'mencari' && (
          <div className="hidden lg:block fixed right-0 top-[56px] w-[280px] xl:w-[320px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[#4E4F50] [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="flex items-center justify-between mb-2 px-2">
              <h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px]">{t('mencari.history')}</h3>
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
            </div>
          </div>
        )}

        {/* Chat Bubbles (Always Rendered) */}
        <>
          {/* Right Sidebar (Chat Panel) */}`;

file = file.split(oldCode).join(newCode);
file = file.split(oldCode.replace(/\n/g, '\r\n')).join(newCode.replace(/\n/g, '\r\n'));

// Need to remove the closing tag of the ternary logic!
// Let's find where the ternary closes. It should be right before Profile Right Sidebar.
const oldEnd = `                  </div>
                </div>
             </div>
          </>
        )}

    
        {/* Profile Right Sidebar */}`;

const newEnd = `                  </div>
                </div>
             </div>
          </>

    
        {/* Profile Right Sidebar */}`;

file = file.split(oldEnd).join(newEnd);
file = file.split(oldEnd.replace(/\n/g, '\r\n')).join(newEnd.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Unwrapped chat panel from ternary');
