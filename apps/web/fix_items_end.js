const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Replace items-center with items-end for the outer wrapper of floating and main chat input areas.
// We can just use string replace on these exact lines.

code = code.replace(
  '<div className="p-3 bg-white dark:bg-[#242526] shrink-0 border-t border-gray-200 dark:border-[#3E4042]">\n            <div className="flex items-center gap-2">',
  '<div className="p-3 bg-white dark:bg-[#242526] shrink-0 border-t border-gray-200 dark:border-[#3E4042]">\n            <div className="flex items-end gap-2">'
);

code = code.replace(
  '<div className="p-4 bg-transparent shrink-0">\n              <div className="flex items-center gap-2">',
  '<div className="p-4 bg-transparent shrink-0">\n              <div className="flex items-end gap-2">'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed items-center to items-end');
