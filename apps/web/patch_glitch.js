const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace(
  'dark:shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-all duration-200 border border-transparent dark:border-[#3E4042] flex flex-col',
  'dark:shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-shadow duration-200 border border-transparent dark:border-[#3E4042] flex flex-col'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Removed transition-all to fix glitch');
