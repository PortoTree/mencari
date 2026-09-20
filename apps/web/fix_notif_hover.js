const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Fix all notification item container hover states
// Unread items: remove weird blue bg, use clean hover
code = code.replace(
  /flex items-start gap-3 px-3 py-2\.5 bg-blue-50\/50 dark:bg-\[#1a2535\] hover:bg-blue-100\/60 dark:hover:bg-\[#1e2d40\] cursor-pointer transition-colors rounded-xl mx-1"/g,
  'flex items-start gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1"'
);

// Read items (with opacity-60): fix hover too
code = code.replace(
  /flex items-start gap-3 px-3 py-2\.5 hover:bg-gray-50 dark:hover:bg-\[#3A3B3C\] cursor-pointer transition-colors rounded-xl mx-1 opacity-60"/g,
  'flex items-start gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1 opacity-60"'
);

// Read items (without opacity): fix hover
code = code.replace(
  /flex items-start gap-3 px-3 py-2\.5 hover:bg-gray-50 dark:hover:bg-\[#3A3B3C\] cursor-pointer transition-colors rounded-xl mx-1"/g,
  'flex items-start gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1"'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Hover states fixed');
