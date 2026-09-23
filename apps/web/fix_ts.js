const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /useState<"home" \| "mencari" \| "friend" \| "group" \| "groups" \| "chat">/;
code = code.replace(regex, 'useState<"home" | "mencari" | "friend" | "group" | "groups" | "chat" | "product">');

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed TS Error');
