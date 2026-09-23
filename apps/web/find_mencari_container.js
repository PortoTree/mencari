const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('activeTab === "mencari" && (')) {
        for (let j = Math.max(0, i - 2); j <= Math.min(lines.length - 1, i + 10); j++) {
            console.log(lines[j]);
        }
        break;
    }
}
