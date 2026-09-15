const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

file = file.replace(/hover:bg-gray-100/g, 'hover:bg-[#F2F2F2]');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed hover-gray-100');
