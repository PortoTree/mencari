const fs = require('fs');
const code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

const startIndex = lines.findIndex(l => l.includes('          ) : selectedNewChatUsers.length > 0 ? ('));
const endIndex = lines.findIndex((l, i) => i > startIndex && l.includes('          ) : profileViewIdx !== null ? ('));

if (startIndex !== -1 && endIndex !== -1) {
  const newUI = `          ) : selectedNewChatUsers.length > 0 ? (
            <div className="flex-1 bg-[#F0F2F5] dark:bg-[#18191A] flex flex-col items-center justify-center relative p-4 sm:p-8">
              <div className="w-full max-w-lg bg-white dark:bg-[#242526] rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-[#3E4042] flex flex-col">
                 <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                   <h3 className="text-[22px] font-bold text-black dark:text-[#E4E6EB] leading-tight">
                     {t('chat.newChatTitle')}
                   </h3>
                   <span className="bg-[#E7F3FF] dark:bg-[#183966] text-[#1877F2] dark:text-[#2D88FF] px-3.5 py-1.5 rounded-full text-[13px] font-semibold shrink-0 whitespace-nowrap self-start sm:self-auto">
                     {selectedNewChatUsers.length} {t('chat.selectedUsers')}
                   </span>
                 </div>
                 
                 <div className="flex-1 max-h-[400px] overflow-y-auto custom-scrollbar pr-2 space-y-2.5 mb-8">
                    {selectedNewChatUsers.map(idx => (
                      <div key={idx} className="flex items-center gap-3.5 bg-gray-50 dark:bg-[#18191A] p-3 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-[#3E4042] transition-colors group">
                        <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 shadow-sm bg-gray-200 dark:bg-[#3A3B3C]">
                          <img src="/default-avatar.svg" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-semibold text-[15.5px] text-black dark:text-[#E4E6EB] flex-1">{dummyChats[idx].name}</span>
                        <button onClick={() => setSelectedNewChatUsers(prev => prev.filter(id => id !== idx))} className="w-8 h-8 rounded-full bg-white dark:bg-[#242526] shadow-sm border border-gray-200 dark:border-[#3E4042] hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-200 dark:hover:border-red-800 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                 </div>
                 
                 <div className="pt-5 border-t border-gray-100 dark:border-[#3E4042] flex justify-end">
                    {selectedNewChatUsers.length === 1 ? (
                       <button onClick={() => { setActiveChatIdx(selectedNewChatUsers[0]); setSelectedNewChatUsers([]); setIsNewChatPanelOpen(false); setIsCreatingGroup(false); }} className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-[15px] py-2.5 px-7 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 w-full sm:w-auto justify-center">
                          <svg className="w-5 h-5 -translate-y-[1px] translate-x-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                          {t('chat.createChat')}
                       </button>
                    ) : (
                       <button onClick={() => setIsCreatingGroup(true)} className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-[15px] py-2.5 px-7 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 w-full sm:w-auto justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                          {t('chat.createGroup')}
                       </button>
                    )}
                 </div>
              </div>
            </div>`;
            
  lines.splice(startIndex, endIndex - startIndex, newUI);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('UI optimized successfully.');
} else {
  console.log('Block not found.', startIndex, endIndex);
}
