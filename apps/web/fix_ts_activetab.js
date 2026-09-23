const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

code = code.replace('if (activeTab !== "beranda") {', 'if (activeTab !== "home") {');

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed TS error activeTab !== "home"');
