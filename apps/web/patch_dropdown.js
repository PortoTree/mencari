const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Update state type
code = code.replace(
  /"all" \| "unread" \| "favorite" \| "group" \| "archive"/g,
  '"all" | "unread" | "favorite" | "group" | "archive" | "requests"'
);

const dropdownStart = /<div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-\[\#242526\] rounded-lg shadow-\[0_0_15px_rgba\(0,0,0,0\.1\)\] border border-gray-100 dark:border-\[\#3E4042\] py-1\.5 z-50\">\s*<button/;

const newOption = `<div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#242526] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-[#3E4042] py-1.5 z-50">
                        <button onClick={(e) => { e.stopPropagation(); setChatListFilter('requests'); setIsChatFilterOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                          <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 24 24"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                          {t('chat.messageRequests')}
                        </button>
                        <button`;

if (dropdownStart.test(code)) {
  code = code.replace(dropdownStart, newOption);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Dropdown updated');
} else {
  console.log('Regex failed');
}
