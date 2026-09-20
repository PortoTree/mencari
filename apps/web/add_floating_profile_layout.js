const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// 1. Get the profile layout
let profileLines = [];
for (let i = 5541; i <= 5658; i++) {
  profileLines.push(lines[i].replace(/activeChatIdx/g, 'activeFloatingChatIdx'));
}

// 2. Wrap the floating chat content
let startFloatingChat = -1;
let endFloatingChat = -1;

// Find the Floating Chat container
for (let i = 3500; i < 4000; i++) {
  if (lines[i] && lines[i].includes('className={`hidden lg:flex fixed bottom-0 right-[396px] w-[380px] bg-white dark:bg-[#242526] rounded-t-xl shadow-[0_0_15px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] flex-col z-50 transition-all duration-300 ease-in-out transform origin-bottom')) {
    startFloatingChat = i + 2; // skip the `>` line which is at i+1
    break;
  }
}

// Find where Floating Chat ends (before the next main comment)
for (let i = startFloatingChat; i < startFloatingChat + 500; i++) {
  if (lines[i] && lines[i].includes('{/* Mobile Bottom Nav */}')) {
    // The floating chat div closes right before this
    endFloatingChat = i - 2;
    break;
  }
}

if (startFloatingChat !== -1 && endFloatingChat !== -1) {
  // We need to wrap lines from startFloatingChat to endFloatingChat
  lines.splice(endFloatingChat + 1, 0, 
    '          </>',
    '        ) : (',
    '          <div className="flex-1 overflow-y-auto bg-white dark:bg-[#242526] relative rounded-t-xl flex flex-col">',
    '            <div className="h-[60px] border-b border-gray-200 dark:border-[#3E4042] flex items-center px-4 shrink-0 shadow-sm">',
    '              <button onClick={(e) => { e.stopPropagation(); setIsFloatingChatInfoOpen(false); }} className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center justify-center transition-colors text-gray-500 dark:text-[#B0B3B8]">',
    '                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>',
    '              </button>',
    '              <span className="ml-3 font-semibold text-black dark:text-[#E4E6EB] text-[15px]">Info Profil</span>',
    '            </div>',
    ...profileLines,
    '          </div>',
    '        )}'
  );
  
  lines.splice(startFloatingChat, 0, 
    '        {!isFloatingChatInfoOpen ? (',
    '          <>'
  );
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Successfully wrapped floating chat and added profile info');
