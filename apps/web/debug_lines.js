const fs = require('fs');
const lines = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8').split('\n');
console.log(lines.slice(533, 548).map((l, i) => `${533+i}: ${l}`).join('\n'));
