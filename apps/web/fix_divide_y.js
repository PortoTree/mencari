const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /<div className="bg-white dark:bg-\[\#242526\] rounded-xl shadow-sm border border-gray-100 dark:border-\[\#3E4042\] p-2 space-y-1">\r?\n\s*<h4 className="font-bold text-\[13px\] text-gray-500 dark:text-\[\#B0B3B8\] px-2 pt-2 pb-1">Kategori<\/h4>/;

const newContainer = `<div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-2 flex flex-col divide-y divide-gray-100 dark:divide-[#3E4042]">
                  <h4 className="font-bold text-[14px] text-black dark:text-[#E4E6EB] px-3 pt-3 pb-3">Kategori</h4>`;
                  
code = code.replace(regex, newContainer);

// Also remove rounded-lg and ensure correct py-3 padding for the button
const btnRegex = /className=\{`w-full text-left px-3 py-2\.5 rounded-lg text-\[13\.5px\] font-medium transition-colors flex items-center gap-3 border-b border-transparent hover:border-gray-100 dark:hover:border-\[\#3E4042\] \$\{/g;

code = code.replace(btnRegex, `className={\`w-full text-left px-3 py-3 text-[13.5px] font-medium transition-colors flex items-center gap-3 \${`);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Successfully fixed container divide-y styling');
