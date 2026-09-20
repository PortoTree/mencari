const fs = require('fs');
const code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const hasHidden = code.includes("'hidden'}`}");
const count = (code.match(/group\/tooltip transition-opacity/g) || []).length;
console.log('hidden applied:', hasHidden, '| count:', count);
