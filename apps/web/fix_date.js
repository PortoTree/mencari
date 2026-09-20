const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
code = code.replace(
  '{new Date(dummyChats[activeChatIdx].ts).toLocaleTimeString([], {hour: \\\'2-digit\\\', minute:\\\'2-digit\\\'})}',
  '{new Date(dummyChats[activeChatIdx].ts).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}'
);
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
