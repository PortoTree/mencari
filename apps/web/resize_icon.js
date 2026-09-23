const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const targetStr = 'className="w-[22px] h-[22px] object-contain"';
if (code.includes(targetStr)) {
  code = code.replace(targetStr, 'className="w-[26px] h-[26px] object-contain"');
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully resized icon to 26px');
} else {
  console.log('Could not find the exact string to resize. Searching manually...');
}
