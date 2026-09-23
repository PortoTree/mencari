const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
const lines = code.split('\n');
for (let i = 230; i < 250; i++) {
    console.log(i + ": " + lines[i].trim());
}
