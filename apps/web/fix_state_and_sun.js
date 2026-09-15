const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// 1. Fix default state
file = file.replace(/const \[isDarkMode, setIsDarkMode\] = useState\(false\);/, 'const [isDarkMode, setIsDarkMode] = useState(true);');

// 2. Fix the sun icon
const messySun = '<svg className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 20 20">';
const cleanSun = '<svg className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18.75a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM6.166 18.894a.75.75 0 001.06 1.06l1.59-1.591a.75.75 0 10-1.06-1.061l-1.591 1.59zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM6.166 5.106a.75.75 0 00-1.06 1.06l1.591 1.59a.75.75 0 101.06-1.061l-1.59-1.59z" /></svg>';
// Note: replacing the whole line to avoid parsing inner tags with regex
const sunRegex = /<svg className="w-\[20px\] h-\[20px\] text-black dark:text-\[#E4E6EB\]" fill="currentColor" viewBox="0 0 20 20">\s*<path.*?\/>\s*<\/svg>/;
file = file.replace(sunRegex, cleanSun);

// 3. Fix the chat icon wrapper
const oldChatStr = '<div className="relative group flex items-center justify-center">\n              <button className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95 mr-1">\n                <img src="/logo-chat.png" alt="Chat" className="w-[32px] h-[32px] object-contain" />\n              </button>';
const newChatStr = '<div className="relative group">\n              <button className="w-10 h-10 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center text-black dark:text-[#E4E6EB] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A] transition-colors overflow-hidden">\n                <img src="/logo-chat.svg" alt="Chat" className="w-[22px] h-[22px] object-contain" />\n              </button>';
file = file.replace(oldChatStr, newChatStr);

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed state, sun, and chat');
