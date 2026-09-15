const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

file = file.replace(/<div className="w-\[40px\] h-\[40px\] bg-gray-200 dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden shrink-0">\s*<svg className="w-full h-full pt-1.5 text-white"[^>]*>.*?<\/svg>\s*<\/div>/gs, 
\<div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
  <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
</div>\);

fs.writeFileSync('src/app/beranda/page.tsx', file);
