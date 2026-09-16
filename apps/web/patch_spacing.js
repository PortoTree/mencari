const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldClass = 'className="w-[400px] h-[250px] mb-8 flex items-center justify-center [&>div]:w-full [&>div]:h-full"';
const newClass = 'className="w-[400px] h-[140px] mb-4 flex items-center justify-center [&>div]:w-full [&>div]:h-full"';

file = file.replace(oldClass, newClass);
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated Lottie size to remove extra vertical space');
