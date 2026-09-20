const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');
lines[5145] = lines[5145].replace('" group-hover:underline', ' group-hover:underline"');
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Fixed quotes');
