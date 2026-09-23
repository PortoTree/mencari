const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('activeTab === "home"')) {
        for(let j=i; j<=i+40; j++) console.log(j + ": " + lines[j]);
        break;
    }
}
