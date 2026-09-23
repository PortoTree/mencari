const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
const searchMatch = code.indexOf('alt="Toko"');
console.log(code.substring(searchMatch - 300, searchMatch + 200));
