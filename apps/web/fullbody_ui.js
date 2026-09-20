const fs = require('fs');
const code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

const startIndex = lines.findIndex(l => l.includes("          ) : selectedNewChatUsers.length > 0 ? ("));
const endIndex = lines.findIndex((l, i) => i > startIndex && l.includes("          ) : profileViewIdx !== null ? ("));

if (startIndex !== -1 && endIndex !== -1) {
  const newUI = `          ) : selectedNewChatUsers.length > 0 ? (
            <div className="flex-1 bg-white dark:bg-[#242526] flex flex-col h-full">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-[#3E4042] flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-[18px] font-bold text-black dark:text-[#E4E6EB]">{t('chat.newChatTitle')}</h2>
                  <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">
                    {selectedNewChatUsers.length} {t('chat.selectedUsers')}
                  </p>
                </div>
                <span className="bg-[#E7F3FF] dark:bg-[#183966] text-[#1877F2] dark:text-[#2D88FF] px-3 py-1.5 rounded-full text-[13px] font-semibold shrink-0">
                  {selectedNewChatUsers.length}
                </span>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto sidebar-scrollbar">
                {selectedNewChatUsers.map(idx => (
                  <div key={idx} className="flex items-center gap-3 px-6 py-3.5 border-b border-gray-100 dark:border-[#3E4042] hover:bg-gray-50 dark:hover:bg-[#3A3B3C]/40 transition-colors group">
                    <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-gray-200 dark:bg-[#3A3B3C]">
                      <img src="/default-avatar.svg" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB] flex-1">{dummyChats[idx].name}</span>
                    <button
                      onClick={() => setSelectedNewChatUsers(prev => prev.filter(id => id !== idx))}
                      className="w-8 h-8 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer Action */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-[#3E4042] flex justify-end shrink-0">
                {selectedNewChatUsers.length === 1 ? (
                  <button
                    onClick={() => { setActiveChatIdx(selectedNewChatUsers[0]); setSelectedNewChatUsers([]); setIsNewChatPanelOpen(false); setIsCreatingGroup(false); }}
                    className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-[15px] py-2.5 px-7 rounded-xl transition-all flex items-center gap-2"
                  >
                    <svg className="w-5 h-5 -translate-y-[1px] translate-x-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    {t('chat.createChat')}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsCreatingGroup(true)}
                    className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-[15px] py-2.5 px-7 rounded-xl transition-all flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    {t('chat.createGroup')}
                  </button>
                )}
              </div>
            </div>`;

  lines.splice(startIndex, endIndex - startIndex, newUI);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('Done! Full-body layout applied.');
} else {
  console.log('Block not found.', startIndex, endIndex);
}
