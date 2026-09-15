const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// Replace the navbar profile button
file = file.replace(/bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] flex items-center justify-center overflow-hidden border border-gray-300 dark:border-\[#3E4042\]">\s*<svg className="w-full h-full pt-1\.5 text-gray-500 dark:text-\[#B0B3B8\]"/g, 
  'bg-emerald-500 flex items-center justify-center overflow-hidden border border-emerald-600 dark:border-emerald-400">\n                  <svg className="w-full h-full pt-1.5 text-white"');

// Replace the dropdown panel profile button
file = file.replace(/bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-300 dark:border-\[#3E4042\]">\s*<svg className="w-full h-full pt-1\.5 text-gray-500 dark:text-\[#B0B3B8\]"/g, 
  'bg-emerald-500 rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-emerald-600 dark:border-emerald-400">\n                      <svg className="w-full h-full pt-1.5 text-white"');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed header and dropdown avatars correctly');
