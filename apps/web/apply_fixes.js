const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// 1. isDarkMode state
file = file.replace(/const \[isDarkMode, setIsDarkMode\] = useState\(false\);/, 'const [isDarkMode, setIsDarkMode] = useState(true);');

// 2. The sun icon
const sunRegex = /<svg className="w-\[20px\] h-\[20px\] text-black dark:text-\[#E4E6EB\]" fill="currentColor" viewBox="0 0 20 20">\s*<path[^\>]*\/>\s*<\/svg>/;
const cleanSun = '<svg className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18.75a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM6.166 18.894a.75.75 0 001.06 1.06l1.59-1.591a.75.75 0 10-1.06-1.061l-1.591 1.59zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM6.166 5.106a.75.75 0 00-1.06 1.06l1.591 1.59a.75.75 0 101.06-1.061l-1.59-1.59z" /></svg>';
file = file.replace(sunRegex, cleanSun);

// 3. Avatar viewBox
file = file.replace(/className="w-\[115%\] h-\[115%\] mt-\[15%\]([^"]*)" fill="currentColor" viewBox="0 0 20 20"/g, "className=\"w-full h-full pt-1.5\" fill=\"currentColor\" viewBox=\"2 0 16 18\"");
file = file.replace(/className="w-\[115%\] h-\[115%\] mt-\[15%\]" fill="currentColor" viewBox="0 0 20 20"/g, "className=\"w-full h-full pt-1.5\" fill=\"currentColor\" viewBox=\"2 0 16 18\"");

// 4. Emerald replacements (Navbar tab, Semua tab, Chat avatars, etc)
file = file.replace(/border-\[#0866FF\] text-\[#0866FF\]/g, 'border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400');
file = file.replace(/bg-\[#0866FF\]/g, 'bg-emerald-500');
file = file.replace(/bg-blue-100/g, 'bg-emerald-500');
file = file.replace(/text-blue-500/g, 'text-white');
file = file.replace(/text-blue-600 dark:text-blue-400/g, 'text-emerald-600 dark:text-emerald-400');
file = file.replace(/border-blue-600 dark:border-blue-400/g, 'border-emerald-600 dark:border-emerald-400');

// 5. Header and Profile Dropdown Avatars -> emerald and white icon
// We need to be careful. The header avatar originally has: bg-[#E4E6EB] dark:bg-[#3A3B3C] ... border-gray-300 dark:border-[#3E4042]
file = file.replace(/bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] flex items-center justify-center overflow-hidden border border-gray-300 dark:border-\[#3E4042\]/g, 'bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors flex items-center justify-center overflow-hidden border border-emerald-600 dark:border-emerald-400');
// and the inner SVG text-gray-500:
file = file.replace(/<svg className="w-full h-full pt-1\.5 text-gray-500 dark:text-\[#B0B3B8\]" fill="currentColor" viewBox="2 0 16 18">/g, '<svg className="w-full h-full pt-1.5 text-white" fill="currentColor" viewBox="2 0 16 18">');

// 6. Navigation icons (Chat, Pemberitahuan, Menu)
// We will replace the entire "Right: Icons & Avatar" section.
const oldRightBlock = /\{\/\* Right: Icons & Avatar \*\/\}\s*<div className="flex items-center gap-2 relative">[\s\S]*?(?=<div className="relative ml-1" ref=\{dropdownRef\}>)/;
const newRightBlock = \{/* Right: Icons & Avatar */}
        <div className="flex items-center gap-2 relative">
          
          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center text-black dark:text-[#E4E6EB] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A] transition-colors overflow-hidden">
              <img src="/logo-chat.svg" alt="Chat" className="w-[22px] h-[22px] object-contain" />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              Chat
            </div>
          </div>

          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center text-black dark:text-[#E4E6EB] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A] transition-colors overflow-hidden">
              <img src="/pemberitahuan.svg" alt="Pemberitahuan" className="w-[22px] h-[22px] object-contain" />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              Pemberitahuan
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="w-[1px] h-6 bg-gray-300 mx-1"></div>

          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center text-black dark:text-[#E4E6EB] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A] transition-colors overflow-hidden">
              <img src="/menu.svg" alt="Menu" className="w-[22px] h-[22px] object-contain" />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              Menu
            </div>
          </div>
          
          \;
file = file.replace(oldRightBlock, newRightBlock);

// 7. Profile Dropdown inner avatar background
// It was: bg-[#E4E6EB] dark:bg-[#3A3B3C] rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-300 dark:border-[#3E4042]
file = file.replace(/bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-300 dark:border-\[#3E4042\]/g, 'bg-emerald-500 rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-emerald-600 dark:border-emerald-400');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Applied ALL fixes correctly');
