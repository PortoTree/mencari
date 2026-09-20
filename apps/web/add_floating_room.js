const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const floatingChatRoom = `        {/* Floating Chat Room Panel */}
        <div
          className={\`hidden lg:flex fixed bottom-0 right-[396px] w-[300px] bg-white dark:bg-[#242526] rounded-t-xl shadow-[0_0_15px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] flex-col z-50 transition-all duration-300 ease-in-out transform origin-bottom \${activeChatIdx !== null ? "scale-y-100 opacity-100 h-[420px]" : "scale-y-0 opacity-0 h-0 pointer-events-none"}\`}
        >
          {/* Header */}
          <div className="px-3 py-2 flex items-center justify-between border-b border-gray-100 dark:border-[#3E4042] shrink-0 h-[48px] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] cursor-pointer rounded-t-xl transition-colors"
               onClick={() => setActiveChatIdx(null)}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                <img
                  src="/default-avatar.svg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-black dark:text-[#E4E6EB] text-[15px] truncate max-w-[150px]">
                {activeChatIdx !== null && dummyChats[activeChatIdx] ? dummyChats[activeChatIdx].name : "Obrolan"}
              </span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveChatIdx(null); }}
              className="p-1 hover:bg-gray-300 dark:hover:bg-[#4E4F50] rounded-full transition-colors text-gray-500 dark:text-[#B0B3B8]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-[#18191A] sidebar-scrollbar">
            {activeChatIdx !== null && dummyChats[activeChatIdx] && (
              <div className="flex flex-col gap-1">
                <div className="bg-white dark:bg-[#242526] p-2.5 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] self-start border border-gray-100 dark:border-[#3E4042]">
                  <p className="text-[14px] text-black dark:text-[#E4E6EB]">
                    {dummyChats[activeChatIdx].msg}
                  </p>
                  <span className="text-[11px] text-gray-400 mt-1 block">{dummyChats[activeChatIdx].date}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 dark:border-[#3E4042] bg-white dark:bg-[#242526]">
            <div className="flex items-center gap-2 bg-[#F0F2F5] dark:bg-[#3A3B3C] rounded-full px-4 py-2">
              <input 
                type="text" 
                placeholder={t("chat.typeMessage")} 
                className="flex-1 bg-transparent border-none focus:outline-none text-[14px] text-black dark:text-[#E4E6EB] placeholder-gray-500 dark:placeholder-[#B0B3B8]"
              />
              <button className="text-emerald-600 dark:text-emerald-400 shrink-0 hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>
        </div>`;

const lines = code.split('\n');
for (let i = 3450; i < 3500; i++) {
  if (lines[i] && lines[i].includes('{/* New Message Panel */}')) {
    lines.splice(i, 0, ...floatingChatRoom.split('\n'), '');
    break;
  }
}

code = lines.join('\n');

// Also update the right value for the new message panel to avoid overlap
code = code.replace(
  'className={`hidden lg:flex fixed bottom-0 right-[396px] w-[300px]',
  'style={{ right: activeChatIdx !== null ? "712px" : "396px" }}\n          className={`hidden lg:flex fixed bottom-0 w-[300px]'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Floating chat room panel injected correctly');
