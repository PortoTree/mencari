const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

file = file.replace(/className="([^"]*rounded-full[^"]*flex items-center justify-center[^"]*)"/g, (match, classes) => {
  if (!classes.includes('overflow-hidden') && classes.includes('w-') && classes.includes('h-')) {
    if (classes.includes('w-8') || classes.includes('w-10') || classes.includes('w-12') || classes.includes('w-[40px]') || classes.includes('w-9')) {
       return 'className="' + classes + ' overflow-hidden"';
    }
  }
  return match;
});

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed all overflows correctly');
