const fs = require('fs');
const f = fs.readFileSync('src/app/[locale]/beranda/page.tsx','utf8');
const start = f.lastIndexOf("activeTab === 'mencari'");
console.log(f.slice(start - 200, start + 3000));
