const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

file = file.replace(/bg-emerald-100 dark:bg-emerald-900\/40/g, 'bg-emerald-500');
file = file.replace(/text-emerald-500 dark:text-emerald-400/g, 'text-white');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed sidebar avatar');
