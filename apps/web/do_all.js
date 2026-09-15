const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// 1. isDarkMode default to true
file = file.replace(/const \[isDarkMode, setIsDarkMode\] = useState\(false\);/, 'const [isDarkMode, setIsDarkMode] = useState(true);');

// 2. Sun icon
file = file.replace(/<svg className="w-\[20px\] h-\[20px\] text-black dark:text-\[#E4E6EB\]" fill="currentColor" viewBox="0 0 20 20">\s*<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-\.464 4\.95l\.707\.707a1 1 0 001\.414-1\.414l-\.707-\.707a1 1 0 00-1\.414 1\.414zm2\.12-10\.607a1 1 0 010 1\.414l-\.706\.707a1 1 0 11-1\.414-1\.414l\.707-\.707a1 1 0 011\.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5\.05 6\.464A1 1 0 106\.465 5\.05l-\.708-\.707a1 1 0 00-1\.414 1\.414l\.707\.707zm1\.414 8\.486l-\.707\.707a1 1 0 01-1\.414-1\.414l\.707-\.707a1 1 0 011\.414 1\.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" \/>\s*<\/svg>/,
'<svg className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18.75a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM6.166 18.894a.75.75 0 001.06 1.06l1.59-1.591a.75.75 0 10-1.06-1.061l-1.591 1.59zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM6.166 5.106a.75.75 0 00-1.06 1.06l1.591 1.59a.75.75 0 101.06-1.061l-1.59-1.59z" /></svg>');

// 3. Right Block
const oldRightBlockRegex = /\{\/\* Right: Icons & Avatar \*\/\}\s*<div className="flex items-center gap-2 relative">[\s\S]*?(?=<div className="relative ml-1" ref=\{dropdownRef\}>)/;
const newRightBlock = `{/* Right: Icons & Avatar */}
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

          {/* MENU ICON - NO CIRCLE */}
          <div className="relative group flex items-center justify-center mr-2 ml-1">
            <button className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
              <img src="/menu.svg" alt="Menu" className="w-[24px] h-[24px] object-contain" />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              Menu
            </div>
          </div>
          
          `;
file = file.replace(oldRightBlockRegex, newRightBlock);

file = file.replace(/border-\[#0866FF\] text-\[#0866FF\]/g, 'border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400');
file = file.replace(/bg-\[#0866FF\]/g, 'bg-emerald-500');
file = file.replace(/bg-blue-100/g, 'bg-emerald-500');
file = file.replace(/text-blue-500/g, 'text-white');
file = file.replace(/text-blue-600 dark:text-blue-400/g, 'text-emerald-600 dark:text-emerald-400');
file = file.replace(/border-blue-600 dark:border-blue-400/g, 'border-emerald-600 dark:border-emerald-400');

// 4. Avatars (SVG to IMG)
const newSvg = '<img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />';

// 4.1 Header Dropdown Trigger Avatar
file = file.replace(/<div className="w-10 h-10 bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-300 dark:border-\[#3E4042\]">\s*<svg className="w-full h-full pt-1.5 text-gray-500 dark:text-\[#B0B3B8\]"[^>]*>.*?<\/svg>\s*<\/div>/g,
`<button className="w-10 h-10 rounded-full hover:brightness-95 transition-all flex items-center justify-center overflow-hidden border border-emerald-600 dark:border-emerald-400 shrink-0">\n  ${newSvg}\n</button>`);

// 4.2 Dropdown Inner Avatar (w-40 h-40 bg-[#E4E6EB])
file = file.replace(/<div className="w-\[40px\] h-\[40px\] bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-300 dark:border-\[#3E4042\]">\s*<svg className="w-full h-full pt-1.5 text-gray-500 dark:text-\[#B0B3B8\]"[^>]*>.*?<\/svg>\s*<\/div>/g,
`<div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n</div>`);

// 4.3 Sidebar Avatar (w-72 h-72 inside bg-white)
file = file.replace(/<div className="w-full h-full bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden">\s*<svg className="w-full h-full pt-1.5 text-gray-500 dark:text-\[#B0B3B8\]"[^>]*>.*?<\/svg>\s*<\/div>/g,
`<div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n</div>`);

// 4.4 Modals Avatars (bg-gray-200)
file = file.replace(/<div className="w-\[40px\] h-\[40px\] bg-gray-200 dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden shrink-0">\s*<svg className="w-full h-full pt-1.5 text-gray-500 dark:text-\[#B0B3B8\]"[^>]*>.*?<\/svg>\s*<\/div>/g,
`<div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n</div>`);

// 4.5 Pam Faiz
file = file.replace(/<div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-\[#3A3B3C\] flex items-center justify-center overflow-hidden shrink-0">\s*<svg className="w-full h-full pt-1.5 text-gray-500 dark:text-\[#B0B3B8\]"[^>]*>.*?<\/svg>\s*<\/div>/g,
`<div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n</div>`);

// 4.6 Input Avatar w-8 h-8
file = file.replace(/<div className="w-8 h-8 rounded-full bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] flex items-center justify-center text-gray-500 dark:text-\[#B0B3B8\] shrink-0 overflow-hidden">\s*<svg className="w-full h-full pt-1.5"[^>]*>.*?<\/svg>\s*<\/div>/g,
`<div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n</div>`);

// 4.7 Chat Items
file = file.replace(/<div className="w-12 h-12 bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center text-black dark:text-\[#E4E6EB\] font-bold text-\[18px\] shrink-0 overflow-hidden">\s*in\s*<\/div>/g,
`<div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n</div>`);

file = file.replace(/<div className="w-12 h-12 bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center text-black dark:text-\[#E4E6EB\] font-bold text-\[18px\] shrink-0 relative overflow-hidden">\s*S\s*<div className="absolute bottom-0 right-0 w-3 h-3 bg-\[#31A24C\] rounded-full border-2 border-white dark:border-\[#242526\]"><\/div>\s*<\/div>/g,
`<div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>\n</div>`);

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Success applying all changes');
