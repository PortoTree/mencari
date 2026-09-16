const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace(
    "{activeTab === 'home' && (\n{/* Navigation Links */}",
    "{/* Navigation Links */}\n{activeTab === 'home' && ("
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed JSX comment issue');
