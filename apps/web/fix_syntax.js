const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

code = code.replaceAll(') profileViewIdx !== null ? (', ') : profileViewIdx !== null ? (');

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed ternary syntax');
