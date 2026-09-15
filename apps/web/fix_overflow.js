const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

file = file.replace(/rounded-full flex items-center justify-center shrink-0/g, 'rounded-full flex items-center justify-center overflow-hidden shrink-0');
file = file.replace(/rounded-full flex items-center justify-center text-white shrink-0/g, 'rounded-full flex items-center justify-center overflow-hidden text-white shrink-0');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed overflow missing');
