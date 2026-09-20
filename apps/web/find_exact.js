const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Find exact string
const idx = code.indexOf('group/tooltip transition-opacity');
const snippet = code.substring(idx - 15, idx + 130);
console.log('Snippet:', JSON.stringify(snippet));
