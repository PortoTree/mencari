const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

// Replace ALL instances of the website CTA background (which is currently the emerald-500 to teal-600 gradient)
// with a definitively DARK GREEN gradient (from-green-800 to-green-950).
let oldClass = 'bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm border border-transparent overflow-hidden';
let newClass = 'bg-gradient-to-br from-green-800 to-green-950 rounded-xl shadow-sm border border-transparent overflow-hidden';

code = code.replaceAll(oldClass, newClass);

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Updated all Website CTAs to dark green gradient.');
