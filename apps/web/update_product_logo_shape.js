const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

const oldLine = '<div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-[#4E4F50] overflow-hidden shrink-0 flex items-center justify-center">';
const newLine = '<div className="w-5 h-5 rounded bg-gray-200 dark:bg-[#4E4F50] overflow-hidden shrink-0 flex items-center justify-center">';

code = code.replace(oldLine, newLine);

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Changed product store logo from rounded-full to rounded.');
