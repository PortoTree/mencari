const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// Fix the broken ones first
file = file.replace(/<svg className="w-\[115%\] h-\[115%\] mt-\[15%\] text-gray-500><path/g, 
  '<svg className="w-[115%] h-[115%] mt-[15%] text-gray-500 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 20 20"><path');

file = file.replace(/<svg className="w-\[115%\] h-\[115%\] mt-\[15%\] text-blue-500><path/g, 
  '<svg className="w-[115%] h-[115%] mt-[15%] text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed broken avatars syntax');
