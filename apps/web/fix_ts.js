const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

code = code.replace(
  '{dummyChats[activeFloatingChatIdx]?.name || "Budi Santoso"}',
  '{activeFloatingChatIdx !== null ? dummyChats[activeFloatingChatIdx]?.name : "Budi Santoso"}'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed TS error');
