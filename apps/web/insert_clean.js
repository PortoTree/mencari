const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Insert state
code = code.replace(
  'const [isNewChatPanelOpen, setIsNewChatPanelOpen] = useState(false);',
  'const [isNewChatPanelOpen, setIsNewChatPanelOpen] = useState(false);\n  const [selectedNewChatUsers, setSelectedNewChatUsers] = useState<number[]>([]);'
);

const lines = code.split('\n');

const insertContent = `               <div className="px-4 py-3 border-b border-gray-200 dark:border-[#3E4042] flex items-center gap-2 flex-wrap min-h-[60px]">
                  <span className="text-[15px] text-black dark:text-[#E4E6EB] shrink-0">{t('chat.to')}</span>
                  {selectedNewChatUsers.map((userIdx) => (
                    <div key={userIdx} className="flex items-center gap-1.5 bg-[#E7F3FF] dark:bg-[#183966] text-[#1877F2] dark:text-[#2D88FF] px-2.5 py-1.5 rounded-xl">
                      <span className="text-[14px] font-medium whitespace-nowrap">{dummyChats[userIdx].name}</span>
                      <button 
                        onClick={() => setSelectedNewChatUsers(prev => prev.filter(id => id !== userIdx))}
                        className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                  <input type="text" className="flex-1 min-w-[120px] bg-transparent outline-none text-[15px] text-black dark:text-[#E4E6EB] py-1" />
                  {selectedNewChatUsers.length > 0 && (
                    <button 
                      onClick={() => {
                        setActiveChatIdx(selectedNewChatUsers[0]);
                        setIsNewChatPanelOpen(false);
                        setSelectedNewChatUsers([]);
                      }}
                      className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center transition-colors text-white hover:bg-blue-600 shrink-0 ml-auto"
                    >
                      <svg className="w-4 h-4 -translate-y-[1px] translate-x-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </button>
                  )}
                </div>
                <div className="flex-1 overflow-y-auto sidebar-scrollbar mt-2 pb-10">
                  {dummyChats.map((chat, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => {
                        if (selectedNewChatUsers.includes(idx)) {
                          setSelectedNewChatUsers(prev => prev.filter(id => id !== idx));
                        } else {
                          setSelectedNewChatUsers(prev => [...prev, idx]);
                        }
                      }} 
                      className={\`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors \${selectedNewChatUsers.includes(idx) ? 'bg-gray-50 dark:bg-[#3A3B3C]/50' : 'hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'}\`}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-transparent dark:border-[#4E4F50]">
                        <img src="/default-avatar.svg" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB] flex-1">{chat.name}</span>
                      {selectedNewChatUsers.includes(idx) && (
                        <div className="w-5 h-5 rounded-full bg-[#00B47A] flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>`;

lines.splice(4059, 14, ...insertContent.split('\n'));
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Done replacement');
