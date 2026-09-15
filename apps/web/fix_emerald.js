const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// 1. Active Navbar Tab
file = file.replace(/border-\[#0866FF\] text-\[#0866FF\]/g, 'border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400');

// 2. All bg-[#0866FF] avatars
file = file.replace(/bg-\[#0866FF\]/g, 'bg-emerald-500');

// 3. The light blue avatar background and text
file = file.replace(/bg-blue-100/g, 'bg-emerald-100 dark:bg-emerald-900/40');
file = file.replace(/text-blue-500/g, 'text-emerald-500 dark:text-emerald-400');

// 4. "Semua" active chat tab (blue-600/400)
file = file.replace(/text-blue-600 dark:text-blue-400/g, 'text-emerald-600 dark:text-emerald-400');
file = file.replace(/border-blue-600 dark:border-blue-400/g, 'border-emerald-600 dark:border-emerald-400');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed emerald');
