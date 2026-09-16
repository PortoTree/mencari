const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const chatPanel = fs.readFileSync('chat_panel.txt', 'utf8');

const bookmarksPanel = `{/* Right Sidebar: Bookmarks (Mencari) OR Chat (Home) */}
        {activeTab === 'mencari' ? (
          <div className="hidden lg:block fixed right-0 top-[56px] w-[280px] xl:w-[320px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[#4E4F50] [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="flex items-center justify-between mb-2 px-2">
              <h3 className="font-semibold text-gray-500 dark:text-[#B0B3B8] text-[15px]">Bookmarks</h3>
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
            </div>
          </div>
        ) : (
          <>
            ${chatPanel}
          </>
        )}

    `;

file = file.replace(chatPanel, bookmarksPanel);
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Replaced chat panel with ternary for Bookmarks/Chat');
