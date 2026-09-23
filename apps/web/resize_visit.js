const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const targetStr = 'className="w-5 h-5 object-contain group-hover/visit:scale-110 transition-transform"';
const newStr = 'className="w-7 h-7 object-contain group-hover/visit:scale-110 transition-transform"';

if (code.includes(targetStr)) {
  code = code.replace(targetStr, newStr);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully resized visit.png to w-7 h-7');
} else {
  console.log('Target string not found.');
}
