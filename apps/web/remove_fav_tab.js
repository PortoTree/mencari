const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

const startIndex = 4100; // 4101 in 1-index
const count = 6;
lines.splice(startIndex, count); // Remove the favorite tab

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Removed Favorite tab from main horizontal list');
