const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// Fix sidebar items and navbar items
// 'dark:hover:bg-[#3A3B3C] dark:bg-[#3A3B3C]' -> 'dark:hover:bg-[#3A3B3C]'
file = file.split('dark:hover:bg-[#3A3B3C] dark:bg-[#3A3B3C]').join('dark:hover:bg-[#3A3B3C]');
file = file.split('dark:hover:bg-[#4E4F50] dark:bg-[#3A3B3C] dark:hover:bg-[#3A3B3C]').join('dark:hover:bg-[#3A3B3C]');
file = file.split('hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] dark:bg-[#3A3B3C]').join('hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C]');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Cleaned up multiple hover/bg combinations');
