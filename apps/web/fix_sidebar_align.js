const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

code = code.replace(
  '<img src="/visit.png" alt="Your Page" className="w-9 h-9 p-1.5 object-contain" />',
  '<img src="/visit.png" alt="Your Page" className="w-6 h-6 object-contain" />'
);

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Fixed icon alignment in sidebar');
