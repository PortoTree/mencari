const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// 1. Insert State Variables
for (let i = 290; i < 330; i++) {
  if (lines[i] && lines[i].includes('const floatingChatContainerRef = useRef<HTMLDivElement>(null);')) {
    const states = [
      '  const [showMainStickyDate, setShowMainStickyDate] = useState(false);',
      '  const [showFloatingStickyDate, setShowFloatingStickyDate] = useState(false);',
      '  const mainStickyDateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);',
      '  const floatingStickyDateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);',
      '',
      '  const handleMainChatScroll = (e: React.UIEvent<HTMLDivElement>) => {',
      '    if (e.currentTarget.scrollTop > 60) {',
      '      setShowMainStickyDate(true);',
      '      if (mainStickyDateTimeout.current) clearTimeout(mainStickyDateTimeout.current);',
      '      mainStickyDateTimeout.current = setTimeout(() => setShowMainStickyDate(false), 5000);',
      '    } else {',
      '      setShowMainStickyDate(false);',
      '    }',
      '  };',
      '',
      '  const handleFloatingChatScroll = (e: React.UIEvent<HTMLDivElement>) => {',
      '    if (e.currentTarget.scrollTop > 60) {',
      '      setShowFloatingStickyDate(true);',
      '      if (floatingStickyDateTimeout.current) clearTimeout(floatingStickyDateTimeout.current);',
      '      floatingStickyDateTimeout.current = setTimeout(() => setShowFloatingStickyDate(false), 5000);',
      '    } else {',
      '      setShowFloatingStickyDate(false);',
      '    }',
      '  };'
    ];
    lines.splice(i + 1, 0, ...states);
    break;
  }
}

// 2. Add sticky date to Main Chat and attach onScroll
for (let i = 4000; i < 5500; i++) {
  if (lines[i] && lines[i].includes('className="flex-1 overflow-y-auto chat-scrollbar p-4 flex flex-col gap-2 overscroll-none"')) {
    // Add onScroll
    lines[i] = lines[i].replace('<div ref={chatContainerRef}', '<div ref={chatContainerRef} onScroll={handleMainChatScroll}');
    
    // Insert sticky date wrapper above it
    const stickyDateMain = [
      '            {/* Main Chat Sticky Date */}',
      '            <div className={`absolute top-[70px] left-1/2 transform -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-300 ${showMainStickyDate ? "opacity-100" : "opacity-0"}`}>',
      '              <span className="bg-[#E5E5E5] dark:bg-[#242526] text-gray-600 dark:text-[#A8ABAF] px-3 py-1 rounded-lg text-[12.5px] font-medium shadow-md">',
      '                9/9/2026',
      '              </span>',
      '            </div>'
    ];
    lines.splice(i, 0, ...stickyDateMain);
    break;
  }
}

// 3. Add sticky date to Floating Chat and attach onScroll
for (let i = 3500; i < 3700; i++) {
  if (lines[i] && lines[i].includes('className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-[#F0F2F5] dark:bg-[#18191A] sidebar-scrollbar overscroll-none"')) {
    // Add onScroll
    lines[i] = lines[i].replace('<div ref={floatingChatContainerRef}', '<div ref={floatingChatContainerRef} onScroll={handleFloatingChatScroll}');
    
    // Insert sticky date wrapper above it
    const stickyDateFloating = [
      '          {/* Floating Chat Sticky Date */}',
      '          <div className={`absolute top-[60px] left-1/2 transform -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-300 ${showFloatingStickyDate ? "opacity-100" : "opacity-0"}`}>',
      '            <span className="bg-[#E5E5E5] dark:bg-[#242526] text-gray-600 dark:text-[#A8ABAF] px-3 py-1 rounded-lg text-[12.5px] font-medium shadow-md">',
      '              9/9/2026',
      '            </span>',
      '          </div>'
    ];
    lines.splice(i, 0, ...stickyDateFloating);
    break;
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Successfully injected sticky dates');
