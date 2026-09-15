const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

file = file.replace(/text-gray-700/g, 'text-gray-700 dark:text-[#E4E6EB]');
// clean double darks if any
file = file.replace(/(dark:[^\s]+)\s+\1/g, '');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed text-gray-700');
