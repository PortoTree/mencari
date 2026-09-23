const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

code = code.replace(/\/navigasi\/grub-aktif\.svg/g, '/navigasi/komunitas-aktif.svg');
code = code.replace(/\/navigasi\/grub\.svg/g, '/navigasi/komunitas.svg');
code = code.replace(/activeTab === "community" \|\| activeTab === "community"/g, 'activeTab === "community"');

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Icons and activeTab fixed.');
