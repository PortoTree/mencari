const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

for (let i = 350; i < 400; i++) {
  if (lines[i] && lines[i].includes('setIsChatFilterOpen(false);')) {
    const toInsert = `      }
      if (
        floatingChatFilterRef.current &&
        !floatingChatFilterRef.current.contains(event.target as Node)
      ) {
        setIsFloatingChatFilterOpen(false);`;
    lines.splice(i + 1, 0, toInsert);
    fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
    console.log('Inserted logic successfully');
    break;
  }
}
