const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace(
  'flex-1 flex justify-center lg:ml-[280px] xl:ml-[320px] lg:mr-[340px] xl:mr-[380px]',
  'flex-1 flex justify-center lg:ml-[340px] xl:ml-[380px] lg:mr-[340px] xl:mr-[380px]'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Centered feed by matching margins');
