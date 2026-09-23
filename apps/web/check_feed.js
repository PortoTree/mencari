const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
const lines = code.split('\n');
for(let j=2165; j<=2200; j++) console.log(j + ": " + lines[j]);
