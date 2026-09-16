const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /if \(langRef\.current && !langRef\.current\.contains\(event\.target as Node\)\) \{\s*setIsLangOpen\(false\);\s*\}/;

const replacement = `if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (postMenuRef.current && !postMenuRef.current.contains(event.target as Node)) {
        setActivePostMenu(null);
      }`;

if (regex.test(file)) {
  file = file.replace(regex, replacement);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
  console.log('✅ Replaced');
} else {
  console.log('⚠️ Could not match regex');
}
