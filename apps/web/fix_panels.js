const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

file = file.replace('bg-white  rounded-t-xl', 'bg-white dark:bg-[#242526] rounded-t-xl');
file = file.replace('bg-white  rounded-t-xl', 'bg-white dark:bg-[#242526] rounded-t-xl');

file = file.replace('border-gray-200  flex', 'border-gray-200 dark:border-[#3E4042] flex');
file = file.replace('border-gray-200  flex', 'border-gray-200 dark:border-[#3E4042] flex');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed panels');
