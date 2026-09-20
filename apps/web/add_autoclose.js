const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const hookToInsert = `
  useEffect(() => {
    if (activeTab === "chat") {
      setActiveFloatingChatIdx(null);
    }
  }, [activeTab]);
`;

// Insert after activeFloatingChatIdx declaration
const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const [activeFloatingChatIdx, setActiveFloatingChatIdx]')) {
    lines.splice(i + 1, 0, hookToInsert);
    break;
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Added useEffect to auto-close floating room when activeTab becomes chat');
