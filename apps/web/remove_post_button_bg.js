const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// Replace bg-[#F2F2F2] at the end of the action buttons
file = file.replace(/transition-colors bg-\[#F2F2F2\]"/g, 'transition-colors bg-transparent"');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Removed hardcoded background from Like/Comment/Share buttons');
