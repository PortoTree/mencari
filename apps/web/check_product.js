const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');
lines.forEach((l, i) => { if(l.includes('activeTab === "product"')) console.log(i, l) });
