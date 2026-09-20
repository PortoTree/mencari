const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// gray-100 (#F3F4F6) too light → upgrade to gray-200 (#E5E7EB) for light mode
code = code.replaceAll(
  'hover:bg-gray-100 dark:hover:bg-[#3A3B3C]',
  'hover:bg-gray-200 dark:hover:bg-[#3A3B3C]'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Hover upgraded to gray-200');
