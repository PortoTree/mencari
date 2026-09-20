const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

code = code.replace(/className="([^"]*?overflow-y-auto[^"]*?)"/g, (match, classList) => {
  if (!classList.includes('overscroll-')) {
    return `className="${classList} overscroll-none"`;
  }
  return match;
});

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Added overscroll-none to all overflow-y-auto');
