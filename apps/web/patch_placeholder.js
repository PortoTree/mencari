const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace('placeholder="Mencari apa?...."', 'placeholder={t("nav.searchPlaceholder")}');

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated search placeholder');
