const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const target = `      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }`;

const replacement = `      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (postMenuRef.current && !postMenuRef.current.contains(event.target as Node)) {
        setActivePostMenu(null);
      }`;

file = file.replace(target, replacement);
file = file.replace(target.replace(/\n/g, '\r\n'), replacement.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added auto close logic');
