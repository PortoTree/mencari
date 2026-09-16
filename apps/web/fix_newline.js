const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// The file has literal "\n" strings in it near setActiveChatMenu(null);
const badString = 'setActiveChatMenu(null);\\n      }\\n      if (langRef.current && !langRef.current.contains(event.target as Node)) {\\n        setIsLangOpen(false);';
const goodString = 'setActiveChatMenu(null);\n      }\n      if (langRef.current && !langRef.current.contains(event.target as Node)) {\n        setIsLangOpen(false);';

if (file.includes(badString)) {
  file = file.replace(badString, goodString);
  console.log('✅ Fixed literal \\n');
} else {
  console.log('⚠️ Could not find the bad string');
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
