const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const targetStr = "className={`relative group/tooltip transition-opacity ${showAddIcons ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}";
const replaceStr = "className={`relative group/tooltip transition-opacity ${showAddIcons ? 'opacity-100' : 'hidden'}`}";

code = code.replaceAll(targetStr, replaceStr);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Replaced + icon visibility to be hidden when not in add mode!');
