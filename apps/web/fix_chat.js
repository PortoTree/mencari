const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// Fix Tab 1
file = file.replace(/text-blue-600 border-b-2/g, 'text-blue-600 dark:text-blue-400 border-b-2');
file = file.replace(/border-blue-600/g, 'border-blue-600 dark:border-blue-400');

// Fix Tab 2 (Belum dibaca hover)
file = file.replace(/hover:text-gray-800 transition-colors/g, 'hover:text-gray-800 dark:hover:text-[#E4E6EB] transition-colors');

// Fix New Message Close button hover text 
file = file.replace(/hover:text-gray-700 dark:text-\[#E4E6EB\]/g, 'hover:text-gray-700 dark:hover:text-[#E4E6EB]');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed chat contrasts');
