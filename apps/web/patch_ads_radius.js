const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Remove rounded-xl overflow-hidden from the <a> tags wrapping the ads
file = file.replace(
    /className="block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"/g,
    'className="block shadow-sm hover:shadow-md transition-shadow cursor-pointer"'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Removed border radius from ads');
