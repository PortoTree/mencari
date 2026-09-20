const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i] && lines[i].includes('bg-[#E5E5E5]') && lines[i].includes('text-[12.5px]')) {
    // These are our date spans
    lines[i] = lines[i].replace('font-medium', 'font-semibold tracking-wide');
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Updated font styles for dates');
