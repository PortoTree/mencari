const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

const targetRegex = /\{activeTab === "mencari" && \(\s*<div className="w-full flex flex-col items-center pt-24 max-w-\[680px\]">/g;

code = code.replace(targetRegex, `{activeTab === "mencari" && (
            <div className="w-full flex flex-col items-center pt-8 max-w-[680px]">`);

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Reduced padding top for /mencari.');
