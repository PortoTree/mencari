const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Add floatingChatContainerRef
code = code.replace(
  'const chatContainerRef = useRef<HTMLDivElement>(null);',
  'const chatContainerRef = useRef<HTMLDivElement>(null);\n  const floatingChatContainerRef = useRef<HTMLDivElement>(null);'
);

// 2. Update scrollToBottom
code = code.replace(
  '      if (chatContainerRef.current) {\n        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;\n      }',
  '      if (chatContainerRef.current) {\n        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;\n      }\n      if (floatingChatContainerRef.current) {\n        floatingChatContainerRef.current.scrollTop = floatingChatContainerRef.current.scrollHeight;\n      }'
);

// 3. Update useEffect dependencies
code = code.replace(
  '  }, [activeChatIdx]);',
  '  }, [activeChatIdx, activeFloatingChatIdx]);'
);

// 4. Attach ref to the floating chat messages container
// The floating chat messages area looks like:
// <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-[#F0F2F5] dark:bg-[#18191A] sidebar-scrollbar overscroll-none">
code = code.replace(
  '<div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-[#F0F2F5] dark:bg-[#18191A] sidebar-scrollbar overscroll-none">',
  '<div ref={floatingChatContainerRef} className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-[#F0F2F5] dark:bg-[#18191A] sidebar-scrollbar overscroll-none">'
);

// 5. Update date badge styling
// Previous: className="bg-[#E5E5E5] dark:bg-[#242526] text-gray-600 dark:text-[#A8ABAF] px-2.5 py-1 rounded-lg text-[11px] font-medium shadow-sm"
code = code.replace(
  'text-gray-600 dark:text-[#A8ABAF] px-2.5 py-1 rounded-lg text-[11px]',
  'text-gray-600 dark:text-[#A8ABAF] px-3 py-1 rounded-lg text-[12.5px]'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Successfully updated refs and date badge style');
