const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

const regex = /{ id: "all", label: t\("product.filter_all"\), emoji: "💠" }/g;
code = code.replace(regex, '{ id: "all", label: t("product.filter_all"), emoji: "🗂️" }');

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Changed emoji for All category.');
