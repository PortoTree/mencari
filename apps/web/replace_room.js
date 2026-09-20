const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

let startIdx = -1;
let endIdx = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('{/* Floating Chat Room Panel */}')) {
    startIdx = i;
  }
  if (startIdx !== -1 && lines[i].includes('{/* New Message Panel */}')) {
    endIdx = i;
    break;
  }
}

if (startIdx !== -1 && endIdx !== -1) {
  const newPanel = `        {/* Floating Chat Room Panel */}
        <div
          className={\`hidden lg:flex fixed bottom-0 right-[396px] w-[320px] bg-white dark:bg-[#242526] rounded-t-xl shadow-[0_0_15px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] flex-col z-50 transition-all duration-300 ease-in-out transform origin-bottom \${activeFloatingChatIdx !== null ? "scale-y-100 opacity-100 h-[450px]" : "scale-y-0 opacity-0 h-0 pointer-events-none"}\`}
        >
          {/* Header */}
          <div className="h-[52px] bg-white dark:bg-[#242526] border-b border-gray-200 dark:border-[#3E4042] flex items-center justify-between px-3 shadow-sm shrink-0 rounded-t-xl hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors cursor-pointer" onClick={() => setActiveFloatingChatIdx(null)}>
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative w-8 h-8 shrink-0">
                <img
                  src="/default-avatar.svg"
                  className="w-full h-full rounded-full object-cover border border-emerald-600 dark:border-emerald-400"
                />
                {activeFloatingChatIdx !== null && dummyChats[activeFloatingChatIdx]?.isOnline && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#31A24C] rounded-full border-[1.5px] border-white dark:border-[#242526]"></div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] leading-tight truncate max-w-[120px]">
                  {activeFloatingChatIdx !== null && dummyChats[activeFloatingChatIdx] ? dummyChats[activeFloatingChatIdx].name : "Obrolan"}
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-[#B0B3B8] leading-tight truncate">
                  {activeFloatingChatIdx !== null && dummyChats[activeFloatingChatIdx]?.isOnline ? t("chat.activeNow") : t("chat.offline", { defaultMessage: "Offline" })}
                </p>
              </div>
            </div>
            
            <div className="ml-auto flex items-center gap-1 shrink-0">
              {/* Optional Phone/Video Call icons could go here if there was space, but it's very cramped in 320px */}
              <button
                onClick={(e) => { e.stopPropagation(); setActiveFloatingChatIdx(null); }}
                className="w-7 h-7 hover:bg-gray-200 dark:hover:bg-[#4E4F50] rounded-full transition-colors flex items-center justify-center text-gray-500 dark:text-[#B0B3B8]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-[#F0F2F5] dark:bg-[#18191A] sidebar-scrollbar">
            {activeFloatingChatIdx !== null && dummyChats[activeFloatingChatIdx] && (
              <>
                <div className="flex flex-col items-center justify-center pt-4 pb-6">
                  <div className="w-[80px] h-[80px] mb-2 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                    <img src="/default-avatar.svg" className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-[16px] font-semibold text-black dark:text-[#E4E6EB] mb-1">{dummyChats[activeFloatingChatIdx].name}</h2>
                  <p className="text-gray-500 dark:text-[#B0B3B8] text-[12px] mb-3 text-center leading-relaxed max-w-[200px]">
                    <svg className="w-3 h-3 inline-block mr-1 align-baseline text-gray-400 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    {t("chat.e2eEncryptionText")}
                  </p>
                </div>
                
                <div className="flex items-start gap-2 max-w-[90%] group">
                  <img src="/default-avatar.svg" className="w-7 h-7 rounded-full border border-gray-300 shrink-0 mt-1" />
                  <div className="flex flex-col gap-1 w-full">
                    <div className="bg-white dark:bg-[#3A3B3C] px-3 py-2 rounded-2xl rounded-tl-none shadow-sm flex flex-col">
                      <p className="text-[13.5px] text-black dark:text-[#E4E6EB]">
                        {dummyChats[activeFloatingChatIdx].msg}
                      </p>
                    </div>
                    <span className="text-[10.5px] text-gray-500 dark:text-[#B0B3B8] mt-0.5 self-start">
                      {new Date(dummyChats[activeFloatingChatIdx].ts).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Input Area */}
          <div className="p-2 border-t border-gray-200 dark:border-[#3E4042] bg-white dark:bg-[#242526] shrink-0">
            <div className="flex items-center gap-1">
              <button className="text-gray-500 dark:text-[#A8ABAF] hover:text-[#00B47A] transition-colors p-1.5 shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="flex-1 flex items-center bg-[#F0F2F5] dark:bg-[#3A3B3C] border border-gray-300 dark:border-[#4E4F50] rounded-full px-3 py-1.5 min-w-0">
                <input 
                  type="text" 
                  placeholder={t("chat.typeMessage")} 
                  className="flex-1 bg-transparent border-none outline-none text-[13px] text-black dark:text-[#E4E6EB] placeholder-gray-500 dark:placeholder-[#B0B3B8] min-w-0"
                />
                <button className="bg-[#00B47A] text-white p-1 rounded-full hover:bg-[#009E6B] ml-1 transition-colors shrink-0 flex items-center justify-center w-6 h-6">
                  <svg className="w-3.5 h-3.5 translate-x-[1px] -translate-y-[1px]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
              
              <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full transition-colors font-bold text-[11px] shadow-sm shrink-0">
                PING
              </button>
            </div>
          </div>
        </div>
`;
  lines.splice(startIdx, endIdx - startIdx, ...newPanel.split('\n'));
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('Successfully replaced floating room panel');
} else {
  console.log('Failed to find start or end block');
}
