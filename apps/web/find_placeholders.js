const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('placeholder')) {
        console.log(i + ": " + lines[i].trim());
    }
}
