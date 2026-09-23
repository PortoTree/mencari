const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

code = code.replace(
  '"home" | "mencari" | "friend" | "group" | "groups" | "chat"',
  '"home" | "mencari" | "friend" | "group" | "groups" | "chat" | "product"'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed TS type');
