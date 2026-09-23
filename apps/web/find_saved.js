const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
const lines = code.split('\n');
lines.forEach((l, i) => {
    if (l.includes('nav.saved') || l.includes('nav.events')) {
        console.log("---- MATCH AT LINE", i, "----");
        for(let j = Math.max(0, i - 15); j <= Math.min(lines.length - 1, i + 15); j++) {
            console.log(lines[j]);
        }
    }
});
