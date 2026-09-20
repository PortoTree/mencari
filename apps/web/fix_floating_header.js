const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

for (let i = 3575; i < 3600; i++) {
  // Fix the online indicator dot
  if (lines[i] && lines[i].includes('w-2.5 h-2.5') && lines[i].includes('bg-[#31A24C]')) {
    lines[i] = lines[i].replace('w-2.5 h-2.5', 'w-3 h-3').replace('border-[1.5px]', 'border-2');
  }
  
  // Fix the status text size
  if (lines[i] && lines[i].includes('text-[11px] text-gray-500')) {
    lines[i] = lines[i].replace('text-[11px]', 'text-[12px]');
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Fixed remaining floating chat header styles');
