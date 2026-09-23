const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

const lines = code.split('\n');
let inProduct = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('activeTab === "product" && (')) {
        inProduct = true;
    }
    if (inProduct) {
        if (lines[i].includes('rounded-full')) {
            console.log("Found rounded-full at line", i);
            console.log(lines[i]);
            // just look at the first few
            if (i > 0 && lines[i-1].includes('img') || lines[i+1].includes('img')) {
                console.log("It's near an image!");
                console.log(lines[i-1]);
                console.log(lines[i]);
                console.log(lines[i+1]);
            }
        }
        if (lines[i].includes('activeTab ===') && !lines[i].includes('product')) {
             inProduct = false;
        }
    }
}
