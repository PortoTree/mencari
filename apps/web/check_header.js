const fs = require('fs');
const code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /<div className="pt-4 px-4 border-b border-gray-200 dark:border-\[\#3E4042\]">[\s\S]{0,1000}/;
const match = code.match(regex);
if (match) console.log(match[0]);
