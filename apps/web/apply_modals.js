const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

const targetRegex = /<div className="w-\[40px\] h-\[40px\] bg-gray-200 dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden shrink-0">\s*<svg className="w-full h-full pt-1\.5 text-white" fill="currentColor" viewBox="2 0 16 18"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" \/><\/svg>\s*<\/div>/g;

const replacement = '<div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">\n                  <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />\n                </div>';

file = file.replace(targetRegex, replacement);

fs.writeFileSync('src/app/beranda/page.tsx', file);
