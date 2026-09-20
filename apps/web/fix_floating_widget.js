const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Add states and ref
code = code.replace(
  'const chatFilterRef = useRef<HTMLDivElement>(null);',
  'const chatFilterRef = useRef<HTMLDivElement>(null);\n  const floatingChatFilterRef = useRef<HTMLDivElement>(null);\n  const [isFloatingChatFilterOpen, setIsFloatingChatFilterOpen] = useState(false);'
);

// 2. Add to handleClickOutside
code = code.replace(
  '        setIsChatFilterOpen(false);\n      }',
  '        setIsChatFilterOpen(false);\n      }\n      if (\n        floatingChatFilterRef.current &&\n        !floatingChatFilterRef.current.contains(event.target as Node)\n      ) {\n        setIsFloatingChatFilterOpen(false);\n      }'
);

const lines = code.split('\n');

let inFloatingWidgetHeader = false;
let inFloatingWidgetList = false;
let skipCount = 0;

for (let i = 0; i < lines.length; i++) {
  if (skipCount > 0) {
    lines[i] = ''; // blank out lines we want to remove
    skipCount--;
    continue;
  }

  if (lines[i].includes('Chat Bubble Fixed bottom right')) {
    inFloatingWidgetHeader = true;
  }
  
  if (inFloatingWidgetHeader && lines[i].includes('overscroll-contain flex-1 overflow-y-auto sidebar-scrollbar')) {
    inFloatingWidgetHeader = false;
    inFloatingWidgetList = true;
  }
  
  if (inFloatingWidgetList && lines[i].includes('Floating Chat Room Panel')) {
    inFloatingWidgetList = false;
  }

  // --- Modifying Header (Filter state) ---
  if (inFloatingWidgetHeader) {
    if (lines[i].includes('ref={chatFilterRef}')) {
      lines[i] = lines[i].replace('ref={chatFilterRef}', 'ref={floatingChatFilterRef}');
    }
    if (lines[i].includes('setIsChatFilterOpen(!isChatFilterOpen)')) {
      lines[i] = lines[i].replace('setIsChatFilterOpen(!isChatFilterOpen)', 'setIsFloatingChatFilterOpen(!isFloatingChatFilterOpen)');
    }
    if (lines[i].includes('{isChatFilterOpen && (')) {
      lines[i] = lines[i].replace('{isChatFilterOpen && (', '{isFloatingChatFilterOpen && (');
    }
    if (lines[i].includes('setIsChatFilterOpen(false)')) {
      lines[i] = lines[i].replace(/setIsChatFilterOpen\(false\)/g, 'setIsFloatingChatFilterOpen(false)');
    }
  }

  // --- Modifying List (Remove 3 dots & fix date opacity) ---
  if (inFloatingWidgetList) {
    if (lines[i].includes('className={') && lines[i+1] && lines[i+1].includes('"text-[12px] text-gray-500 dark:text-[#B0B3B8] shrink-0 " +')) {
      // Replace multi-line span className
      lines[i] = '                          className="text-[12px] text-gray-500 dark:text-[#B0B3B8] shrink-0"';
      lines[i+1] = '';
      lines[i+2] = '';
      lines[i+3] = '';
    }
    
    if (lines[i].includes('<button') && lines[i+1] && lines[i+1].includes('onClick={(e) => {') && lines[i+4] && lines[i+4].includes('setActiveChatMenu')) {
      // Found the 3-dots button start! It usually spans many lines (button tag + svg inside)
      // Let's count how many lines to skip.
      let buttonEndIdx = -1;
      for (let j = i; j < i + 35; j++) {
        if (lines[j] && lines[j].includes('</button>')) {
          buttonEndIdx = j;
          break;
        }
      }
      if (buttonEndIdx !== -1) {
        skipCount = buttonEndIdx - i;
        lines[i] = ''; // clear current line, loop handles the rest
      }
    }
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Successfully updated filter ref and removed 3-dots button');
