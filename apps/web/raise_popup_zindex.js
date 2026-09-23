const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// The search portal renders via createPortal. Find the wrapper div for the search dropdown.
// It was previously z-[10001]. We need to make sure it's ABOVE the navbar z-[10100].
// Similarly all header dropdowns (notif is already z-[10003], raise to z-[10200]+)

// Search dropdown panel: was z-[10001], raise to z-[10200]
code = code.replaceAll(
  'shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-[#3E4042] z-[10001]"',
  'shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-[#3E4042] z-[10200]"'
);

// All header dropdowns that were raised to z-[10001] → z-[10200]
code = code.replaceAll(
  'shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-100 dark:border-[#3E4042] p-2 z-[10001]"',
  'shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-100 dark:border-[#3E4042] p-2 z-[10200]"'
);
code = code.replaceAll(
  'shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[10001]"',
  'shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[10200]"'
);
code = code.replaceAll(
  'shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-4 z-[10001]"',
  'shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-4 z-[10200]"'
);

// Notif overlay z-[10002] → z-[10200]
code = code.replace('className="fixed inset-0 z-[10002]"', 'className="fixed inset-0 z-[10200]"');
// Notif panel z-[10003] → z-[10201]
code = code.replace(
  'shadow-[0_8px_32px_rgba(0,0,0,0.25)] z-[10003] flex flex-col overflow-hidden',
  'shadow-[0_8px_32px_rgba(0,0,0,0.25)] z-[10201] flex flex-col overflow-hidden'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('All popup z-indexes updated above navbar z-[10100]');
