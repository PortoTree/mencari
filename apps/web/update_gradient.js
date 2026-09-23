const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

// The current class starts with bg-emerald-800
let oldClass = 'bg-emerald-800 rounded-xl shadow-sm border border-transparent overflow-hidden p-4 text-white relative';
let newClass = 'bg-gradient-to-br from-emerald-700 to-emerald-950 rounded-xl shadow-sm border border-transparent overflow-hidden p-4 text-white relative';

code = code.replace(oldClass, newClass);

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Updated to gradient');
