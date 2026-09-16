const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace(
  'mencari-online (Project Repository)',
  'Google'
);

file = file.replace(
  'github.com',
  'google.com'
);

file = file.replace(
  'Dashboard - Vercel',
  'Stack Overflow - Where Developers Learn, Share, & Build Careers'
);

file = file.replace(
  'vercel.com',
  'stackoverflow.com'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated dummy history items');
