const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
file = file.replace('className="space-y-4 max-w-[590px] w-full px-4 pt-6 lg:pt-0"', 'className="space-y-4 max-w-[590px] w-full px-4"');
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('Fixed wrapper');
