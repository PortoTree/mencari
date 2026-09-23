const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

const regex = /<div className="absolute -bottom-8 left-4 w-\[72px\] h-\[72px\] bg-white dark:bg-\[\#242526\] rounded-full p-1 shadow-sm">/g;

code = code.replace(regex, '<div className="absolute -bottom-8 left-4 w-[72px] h-[72px] bg-white dark:bg-[#242526] rounded-xl p-1 shadow-sm">');

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Fixed outer wrapper rounded-full.');
