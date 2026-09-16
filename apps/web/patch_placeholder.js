const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace(
  'placeholder="Cari di Mencari atau ketik URL..."',
  'placeholder="Mencari apa?...."'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated placeholder text');
