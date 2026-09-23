const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
console.log('Includes product tab:', code.includes('activeTab === "product"'));
