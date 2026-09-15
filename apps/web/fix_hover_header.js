const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// Replace hover:bg-gray-300
file = file.replace(/hover:bg-gray-300/g, 'hover:bg-[#F3F2EF] dark:hover:bg-[#18191A]');

// Add hover to header avatar
file = file.replace(/bg-emerald-500 flex items-center justify-center overflow-hidden border border-emerald-600 dark:border-emerald-400/g, 'bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors flex items-center justify-center overflow-hidden border border-emerald-600 dark:border-emerald-400');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed hovers on header');
