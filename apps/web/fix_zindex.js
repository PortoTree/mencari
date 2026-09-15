const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// Nav z-index
file = file.replace('sticky top-0 z-50', 'sticky top-0 z-[100]');

// Dropdown Profile Panel z-index
file = file.replace(/border-gray-200 dark:border-\[#3E4042\] p-4 z-50/g, 'border-gray-200 dark:border-[#3E4042] p-4 z-[100]');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed z-index');
