const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

file = file.replace(/border-emerald-500 text-white dark:border-emerald-400/g, 'border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed beranda text');
