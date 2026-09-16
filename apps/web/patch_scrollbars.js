const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const targetStr1 = '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]';
const replacement1 = '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[#4E4F50] [&::-webkit-scrollbar-thumb]:rounded-full';

file = file.split(targetStr1).join(replacement1);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Replaced hidden scrollbars with styled scrollbars');
