const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace(
  'h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-10',
  'h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-24'
);

file = file.replace(
  'h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-10',
  'h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-24'
);

// Just to be safe, replace all occurrences in case there are more
file = file.replaceAll(
  'h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-10',
  'h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-24'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Increased padding-bottom to pb-24 in sidebars');
