const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
console.log('Hook updated:', code.includes('const cat = url.searchParams.get("category");'));
console.log('Button updated:', code.includes('url.searchParams.set("category", cat.id);'));
console.log('Parent updated:', code.includes('p-2 flex flex-col gap-0.5'));
