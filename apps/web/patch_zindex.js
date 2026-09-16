const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace(
  'className="relative w-full z-[60] h-[48px]" ref={searchRef}',
  'className="relative w-full z-40 h-[48px]" ref={searchRef}'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Reduced search bar z-index to 40');
