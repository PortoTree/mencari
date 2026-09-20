const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Add isFloatingChatInfoOpen state
code = code.replace(
  '  const [isFloatingChatFilterOpen, setIsFloatingChatFilterOpen] = useState(false);',
  '  const [isFloatingChatFilterOpen, setIsFloatingChatFilterOpen] = useState(false);\n  const [isFloatingChatInfoOpen, setIsFloatingChatInfoOpen] = useState(false);'
);

// 2. Change the onClick of Floating Chat Header
code = code.replace(
  '      {/* Floating Chat Room Panel */}\n      <div\n        className={`hidden lg:flex fixed bottom-0 right-[396px] w-[380px] bg-white dark:bg-[#242526] rounded-t-xl shadow-[0_0_15px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] flex-col z-50 transition-all duration-300 ease-in-out transform origin-bottom ${activeFloatingChatIdx !== null ? "scale-y-100 opacity-100 h-[500px]" : "scale-y-0 opacity-0 h-0 pointer-events-none"}`}\n      >\n        {/* Header */}\n        <div className="h-[60px] bg-white dark:bg-[#242526] border-b border-gray-200 dark:border-[#3E4042] flex items-center justify-between px-4 shadow-sm shrink-0 rounded-t-xl hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors cursor-pointer" onClick={() => setActiveFloatingChatIdx(null)}>',
  '      {/* Floating Chat Room Panel */}\n      <div\n        className={`hidden lg:flex fixed bottom-0 right-[396px] w-[380px] bg-white dark:bg-[#242526] rounded-t-xl shadow-[0_0_15px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] flex-col z-50 transition-all duration-300 ease-in-out transform origin-bottom ${activeFloatingChatIdx !== null ? "scale-y-100 opacity-100 h-[500px]" : "scale-y-0 opacity-0 h-0 pointer-events-none"}`}\n      >\n        {/* Header */}\n        <div className="h-[60px] bg-white dark:bg-[#242526] border-b border-gray-200 dark:border-[#3E4042] flex items-center justify-between px-4 shadow-sm shrink-0 rounded-t-xl hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors cursor-pointer" onClick={() => setIsFloatingChatInfoOpen(true)}>'
);

// We must extract the profile info part to copy it!
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Done 1 and 2');
