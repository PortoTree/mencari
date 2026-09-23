const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const filterRegex = /\{\/\* Filters \/ Chips \*\/\}\r?\n\s*<div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scroll"(.|\r|\n)*?\}\)\}\r?\n\s*<\/div>/;

if (filterRegex.test(code)) {
  code = code.replace(filterRegex, '');
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully removed the center filter chips.');
} else {
  console.log('Failed to match the center filter chips regex.');
}
