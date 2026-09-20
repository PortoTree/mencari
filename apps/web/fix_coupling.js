const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Add state activeFloatingChatIdx
code = code.replace(
  'const [activeChatIdx, setActiveChatIdx] = useState<number | null>(null);',
  'const [activeChatIdx, setActiveChatIdx] = useState<number | null>(null);\n  const [activeFloatingChatIdx, setActiveFloatingChatIdx] = useState<number | null>(null);'
);

const lines = code.split('\n');

let inFloatingWidget = false;
let inFloatingRoom = false;
let inNewMessagePanel = false;

for (let i = 0; i < lines.length; i++) {
  // 2. Change onClick in the floating widget chat list
  if (lines[i].includes('overscroll-contain flex-1 overflow-y-auto sidebar-scrollbar')) {
    inFloatingWidget = true;
  }
  if (inFloatingWidget && lines[i].includes('onClick={() => setActiveChatIdx(idx)}')) {
    lines[i] = lines[i].replace('setActiveChatIdx(idx)', 'setActiveFloatingChatIdx(idx)');
    inFloatingWidget = false; // We only need to replace the first one inside the floating widget
  }

  // 3 & 4. Fix Floating Chat Room
  if (lines[i].includes('{/* Floating Chat Room Panel */}')) {
    inFloatingRoom = true;
  }
  if (inFloatingRoom && lines[i].includes('style={{ right: activeChatIdx !== null ? "712px" : "396px" }}')) {
    lines[i] = ''; // Remove this line
  }
  if (inFloatingRoom && lines[i].includes('className={`hidden lg:flex fixed bottom-0 w-[300px]')) {
    lines[i] = lines[i].replace('bottom-0 w-[300px]', 'bottom-0 right-[396px] w-[300px]');
  }
  if (inFloatingRoom) {
    // Replace activeChatIdx with activeFloatingChatIdx
    lines[i] = lines[i].replace(/activeChatIdx/g, 'activeFloatingChatIdx');
    // Stop replacing when we hit the end of the panel (before New Message Panel)
    if (lines[i].includes('{/* New Message Panel */}')) {
      inFloatingRoom = false;
      inNewMessagePanel = true;
    }
  }

  // 5. Fix New Message Panel
  if (inNewMessagePanel && lines[i].includes('className={`hidden lg:flex fixed bottom-0 right-[396px] w-[300px]')) {
    lines.splice(i, 0, '          style={{ right: activeFloatingChatIdx !== null ? "712px" : "396px" }}');
    lines[i+1] = lines[i+1].replace('right-[396px] w-[300px]', 'w-[300px]');
    inNewMessagePanel = false; // Done
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Fixed state coupling and positioning');
