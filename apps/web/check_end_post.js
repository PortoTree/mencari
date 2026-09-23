const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
const lines = code.split('\n');
for(let j=2195; j<=2250; j++) console.log(j + ": " + lines[j]);
