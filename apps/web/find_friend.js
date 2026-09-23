const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
const idx = code.indexOf('/friend`');
console.log(code.substring(idx - 500, idx + 1500));
