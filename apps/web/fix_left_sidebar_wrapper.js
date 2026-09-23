const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

const oldWrapper = '<div className="absolute -bottom-8 left-4 w-[72px] h-[72px] bg-white dark:bg-[#242526] rounded-full p-1 shadow-sm">';
const newWrapper = '<div className="absolute -bottom-8 left-4 w-[72px] h-[72px] bg-white dark:bg-[#242526] rounded-xl p-1 shadow-sm">';

code = code.replace(oldWrapper, newWrapper);

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Fixed left sidebar wrapper rounded-full -> rounded-xl');
