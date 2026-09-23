const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
const lines = code.split('\n');
let inProduct = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('activeTab === "product" && (')) {
        inProduct = true;
    }
    if (inProduct) {
        if (lines[i].includes('rounded-full') && (lines[i+1]?.includes('alt="Store"') || lines[i+1]?.includes('default-avatar.svg') || lines[i+2]?.includes('alt="Store"'))) {
            console.log("Found store logo at line", i);
            console.log(lines[i-1]);
            console.log(lines[i]);
            console.log(lines[i+1]);
            console.log(lines[i+2]);
            console.log("----");
        }
        if (lines[i].includes('activeTab ===') && !lines[i].includes('product')) {
             inProduct = false;
        }
    }
}
