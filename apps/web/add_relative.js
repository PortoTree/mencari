const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

code = code.replace(
  'className="flex-1 overflow-y-auto chat-scrollbar p-4 flex flex-col gap-2 overscroll-none"',
  'className="flex-1 overflow-y-auto relative chat-scrollbar p-4 flex flex-col gap-2 overscroll-none"'
);

code = code.replace(
  'className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-[#F0F2F5] dark:bg-[#18191A] sidebar-scrollbar overscroll-none"',
  'className="flex-1 overflow-y-auto relative p-3 flex flex-col gap-2 bg-[#F0F2F5] dark:bg-[#18191A] sidebar-scrollbar overscroll-none"'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Added relative to scroll containers');
