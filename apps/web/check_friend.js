const fs = require('fs');
let lines = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8').split('\n');
lines.forEach((l, i) => { if(l.includes('activeTab === "friend"')) console.log(i, l.trim()) });
