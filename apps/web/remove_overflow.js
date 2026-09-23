const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const searchStr = 'className="absolute top-[52px] right-0 w-[300px] sm:w-[360px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-[#3E4042] overflow-hidden z-[100]"';
const newStr = 'className="absolute top-[52px] right-0 w-[300px] sm:w-[360px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-[#3E4042] z-[100]"';

if (code.includes(searchStr)) {
  code = code.replace(searchStr, newStr);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Removed overflow-hidden successfully.');
} else {
  console.log('String not found.');
}
