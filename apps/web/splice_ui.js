const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

const idx = lines.findIndex(l => l.includes('{/* TENGAH & KANAN */}'));

if (idx !== -1 && !code.includes('isCreatingGroup ? (')) {
const uiNew = `          {isCreatingGroup ? (
            <div className="flex-1 bg-[#F0F2F5] dark:bg-[#18191A] flex flex-col relative h-full">
              {/* Header */}
              <div className="h-[60px] bg-white dark:bg-[#242526] border-b border-gray-200 dark:border-[#3E4042] flex items-center px-4 gap-4 shrink-0">
                 <button onClick={() => {setIsCreatingGroup(false); setSelectedNewChatUsers([]);}} className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center justify-center transition-colors text-gray-500 dark:text-[#B0B3B8]">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                 </button>
                 <h2 className="font-semibold text-[17px] text-black dark:text-[#E4E6EB]">{t('chat.createGroup')}</h2>
              </div>

              <div className="flex-1 overflow-y-auto sidebar-scrollbar p-6">
                <div className="max-w-2xl mx-auto space-y-6">
                  
                  {/* Group Icon & Name */}
                  <div className="bg-white dark:bg-[#242526] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-[#3E4042] flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <button className="w-20 h-20 shrink-0 rounded-xl bg-gray-100 dark:bg-[#3A3B3C] flex flex-col items-center justify-center gap-1 hover:bg-gray-200 dark:hover:bg-[#4E4F50] transition-colors text-gray-500 dark:text-[#B0B3B8] border border-transparent dark:border-[#4E4F50]">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="text-[10px] font-medium uppercase tracking-wider">{t('chat.groupIcon')}</span>
                    </button>
                    <div className="flex-1 w-full">
                      <input 
                        type="text" 
                        placeholder={t('chat.groupName')} 
                        className="w-full bg-transparent border-b-2 border-gray-200 dark:border-[#3E4042] focus:border-[#1877F2] dark:focus:border-[#2D88FF] pb-2 outline-none text-[16px] text-black dark:text-[#E4E6EB] transition-colors font-medium placeholder-gray-400 dark:placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* Settings */}
                  <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">
                    
                    {/* Temp Messages */}
                    <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-[#3E4042]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-[#183966] flex items-center justify-center text-[#1877F2] dark:text-[#2D88FF]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                          <p className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">{t('chat.tempMessages')}</p>
                          <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8]">{isTempMessageOn ? t('chat.on') : t('chat.off')}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsTempMessageOn(!isTempMessageOn)}
                        className={\`w-11 h-6 rounded-full transition-colors relative \${isTempMessageOn ? 'bg-[#1877F2]' : 'bg-gray-300 dark:bg-[#4E4F50]'}\`}
                      >
                        <div className={\`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform \${isTempMessageOn ? 'translate-x-[22px]' : 'translate-x-[2px]'}\`}></div>
                      </button>
                    </div>

                    {/* Permissions */}
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3A3B3C]/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <div>
                          <p className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">{t('chat.groupPermissions')}</p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </div>

                  {/* Member List Preview */}
                  <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden p-4">
                     <p className="font-semibold text-[14px] text-gray-500 dark:text-[#B0B3B8] mb-3">{t('chat.groupMembers')} ({selectedNewChatUsers.length})</p>
                     <div className="flex flex-wrap gap-2">
                        {selectedNewChatUsers.map((userIdx) => (
                          <div key={userIdx} className="flex items-center gap-2 bg-gray-100 dark:bg-[#3A3B3C] px-3 py-1.5 rounded-full border border-gray-200 dark:border-[#4E4F50]">
                            <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
                               <img src="/default-avatar.svg" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[13px] font-medium text-black dark:text-[#E4E6EB]">{dummyChats[userIdx].name}</span>
                          </div>
                        ))}
                     </div>
                  </div>

                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-white dark:bg-[#242526] border-t border-gray-200 dark:border-[#3E4042] flex justify-center shrink-0">
                 <button onClick={() => {
                   setIsCreatingGroup(false);
                   setSelectedNewChatUsers([]);
                   setActiveChatIdx(0); 
                 }} className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-[15px] py-2.5 px-8 rounded-xl transition-colors shadow-sm flex items-center gap-2">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                   {t('chat.createGroupBtn')}
                 </button>
              </div>
            </div>
          ) : `;

  lines.splice(idx + 1, 0, uiNew);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('Spliced!');
} else {
  console.log('Not spliced', idx);
}
