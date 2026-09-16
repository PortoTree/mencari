const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace('h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-10 transition-transform', 'h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-24 transition-transform');

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added bottom padding');
