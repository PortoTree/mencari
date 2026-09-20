const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// Find hover:bg-gray-100 inside the notification menu/dropdown
for (let i = 6080; i < 6115; i++) {
  if (lines[i] && lines[i].includes('hover:bg-gray-100')) {
    lines[i] = lines[i].replace('hover:bg-gray-100', 'hover:bg-gray-200');
    console.log('Fixed line', i + 1);
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
