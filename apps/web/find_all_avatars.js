const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('/default-avatar.svg') || (lines[i].includes('alt="Store"') && lines[i].includes('img'))) {
        console.log(`--- MATCH AT LINE ${i} ---`);
        for (let j = Math.max(0, i - 4); j <= Math.min(lines.length - 1, i + 4); j++) {
            console.log(lines[j]);
        }
    }
}
