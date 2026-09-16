const fs = require('fs');
const f = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const matches = f.match(/<h3.*?>.*?<\/h3>/g);
if (matches) console.log(matches.slice(0, 10));
