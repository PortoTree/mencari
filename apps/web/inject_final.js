const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

let profileLines = [];
let startProfile = -1;
let endProfile = -1;

for (let i = 5000; i < lines.length; i++) {
  if (lines[i] && lines[i].includes('className="flex-1 overflow-y-auto sidebar-scrollbar p-4 flex flex-col items-center gap-4 overscroll-none"')) {
    startProfile = i;
  }
  if (startProfile !== -1 && lines[i] && lines[i].includes('840 KB')) {
    endProfile = i + 6;
    break;
  }
}

if (startProfile !== -1 && endProfile !== -1) {
  for (let i = startProfile; i <= endProfile; i++) {
    profileLines.push(lines[i].replace(/activeChatIdx/g, 'activeFloatingChatIdx').replace(/setIsChatInfoOpen/g, 'setIsFloatingChatInfoOpen'));
  }
}

let startFloatingChat = -1;
let endFloatingChat = -1;

for (let i = 3500; i < 3700; i++) {
  if (lines[i] && lines[i].includes('hidden lg:flex fixed bottom-0 right-[396px] w-[380px] bg-white dark:bg-[#242526]')) {
    startFloatingChat = i + 2; // skip the `>` line
    break;
  }
}

for (let i = startFloatingChat; i < 4000; i++) {
  if (lines[i] && lines[i].includes('{/* New Message Panel */}')) {
    endFloatingChat = i - 2;
    break;
  }
}

console.log('Start Profile:', startProfile);
console.log('End Profile:', endProfile);
console.log('Start Floating:', startFloatingChat);
console.log('End Floating:', endFloatingChat);

if (startFloatingChat !== -1 && endFloatingChat !== -1 && profileLines.length > 0) {
  lines.splice(endFloatingChat, 0, 
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
  
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('Success');
} else {
  console.log('Failed to find bounds');
}
