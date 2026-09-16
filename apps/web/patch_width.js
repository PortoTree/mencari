const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Center Feed Right Margin
file = file.replace('lg:mr-[280px] xl:mr-[320px]', 'lg:mr-[340px] xl:mr-[380px]');

// Profile Sidebar Width
file = file.replace('right-0 top-[56px] w-[280px] xl:w-[320px] h-[calc(100vh-56px)]', 'right-0 top-[56px] w-[340px] xl:w-[380px] h-[calc(100vh-56px)]');

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Adjusted Right Sidebar width');
