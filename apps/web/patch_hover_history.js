const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Replace hover:bg-[#F2F2F2] with hover:bg-gray-200 for History items
// Wait, to be safe, I'll just globally replace it where it makes sense or target the specific blocks.
file = file.replace(
  '<div className="flex items-center gap-3 p-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">',
  '<div className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">'
);

// Second item
file = file.replace(
  '<div className="flex items-center gap-3 p-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">',
  '<div className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">'
);

// Also let's fix the dropdown ones just in case
file = file.split('hover:bg-[#F2F2F2]').join('hover:bg-gray-200');

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated hover background for better contrast in light mode');
