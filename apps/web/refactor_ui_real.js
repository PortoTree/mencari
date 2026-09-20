const fs = require('fs');
const code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// 1. Refactor the "To:" Sidebar input block
const startSidebar = lines.findIndex(l => l.includes('px-4 py-3 border-b border-gray-200 dark:border-[#3E4042] flex items-center gap-2 flex-wrap min-h-[60px]'));
const endSidebar = lines.findIndex((l, i) => i > startSidebar && l.includes('flex-1 overflow-y-auto sidebar-scrollbar mt-2 pb-10'));

if (startSidebar !== -1 && endSidebar !== -1) {
  const newSidebar = `                <div className="px-4 py-3 border-b border-gray-200 dark:border-[#3E4042] flex items-center gap-3 h-[60px]">
                  <span className="text-[15px] font-medium text-black dark:text-[#E4E6EB] shrink-0">{t('chat.to')}</span>
                  <input type="text" className="flex-1 bg-transparent outline-none text-[15px] text-black dark:text-[#E4E6EB] py-1" />
                </div>`;
  lines.splice(startSidebar, endSidebar - startSidebar, newSidebar);
} else {
  console.log('Sidebar block not found.', startSidebar, endSidebar);
}

// 2. Refactor Middle Column injection
const profileIdx = lines.findIndex(l => l.includes('profileViewIdx !== null ? ('));
if (profileIdx !== -1) {
  const newMiddleColumn = `          ) : selectedNewChatUsers.length > 0 ? (
            <div className="flex-1 bg-white dark:bg-[#242526] flex flex-col items-center justify-center relative p-8">
              <div className="w-full max-w-md bg-[#F0F2F5] dark:bg-[#18191A] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-[#3E4042] flex flex-col">
                 <div className="flex items-center justify-between mb-6">
                   <h3 className="text-xl font-bold text-black dark:text-[#E4E6EB]">
                     {t('chat.newChatTitle')}
                   </h3>
                   <span className="bg-[#E7F3FF] dark:bg-[#183966] text-[#1877F2] dark:text-[#2D88FF] px-2.5 py-1 rounded-full text-[13px] font-semibold">
                     {selectedNewChatUsers.length} {t('chat.selectedUsers')}
                   </span>
                 </div>
                 
                 <div className="flex-1 max-h-[300px] overflow-y-auto custom-scrollbar pr-2 space-y-2 mb-6">
                    {selectedNewChatUsers.map(idx => (
                      <div key={idx} className="flex items-center gap-3 bg-white dark:bg-[#242526] p-3 rounded-xl border border-gray-100 dark:border-[#3E4042]">
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                          <img src="/default-avatar.svg" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB] flex-1">{dummyChats[idx].name}</span>
                        <button onClick={() => setSelectedNewChatUsers(prev => prev.filter(id => id !== idx))} className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                 </div>
                 
                 <div className="pt-4 border-t border-gray-200 dark:border-[#3E4042] flex justify-end">
                    {selectedNewChatUsers.length === 1 ? (
                       <button onClick={() => { setActiveChatIdx(selectedNewChatUsers[0]); setSelectedNewChatUsers([]); setIsNewChatPanelOpen(false); setIsCreatingGroup(false); }} className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-[15px] py-2.5 px-6 rounded-xl transition-colors flex items-center gap-2">
                          <svg className="w-5 h-5 -translate-y-[1px] translate-x-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                          {t('chat.createChat')}
                       </button>
                    ) : (
                       <button onClick={() => setIsCreatingGroup(true)} className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-[15px] py-2.5 px-6 rounded-xl transition-colors flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                          {t('chat.createGroup')}
                       </button>
                    )}
                 </div>
              </div>
            </div>
          ) : profileViewIdx !== null ? (`;
          
  lines.splice(profileIdx - 1, 2, newMiddleColumn);
} else {
  console.log('Middle column block not found.', profileIdx);
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Done refactoring!');
