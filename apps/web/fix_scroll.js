const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
code = code.replace('className="flex items-center gap-2 overflow-x-auto pb-2"', 'className="flex items-center gap-2 overflow-x-auto pb-2 hide-scroll"');
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
