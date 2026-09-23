const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

console.log('Left Sidebar card:', code.includes('w-20 h-20 rounded-xl border-4'));
console.log('Left Sidebar img:', code.includes('src="/produk-placeholder.png" alt="Toko"'));

console.log('Right sidebar/Feed:', code.includes('w-5 h-5 rounded bg-gray-200'));
console.log('Right sidebar img:', code.includes('src="/produk-placeholder.png" alt="Store"'));

console.log('Any default-avatar left for Toko?:', code.includes('default-avatar.svg" alt="Toko"'));
console.log('Any default-avatar left for Store?:', code.includes('default-avatar.svg" alt="Store"'));
