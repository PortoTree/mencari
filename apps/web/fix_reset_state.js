const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

code = code.replace(
  'onClick={() => setActiveFloatingChatIdx(idx)}',
  'onClick={() => { setActiveFloatingChatIdx(idx); setIsFloatingChatInfoOpen(false); }}'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed reset state on new chat');
