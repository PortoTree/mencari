const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /(<button onClick=\{\(e\) => \{ e\.stopPropagation\(\); setIsChatListSettingsOpen\(false\); \}\} className=\"w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-\[\#3A3B3C\] flex items-center gap-3 text-\[14px\] font-semibold text-black dark:text-\[\#E4E6EB\] transition-colors\">\s*<svg className=\"w-5 h-5 text-gray-500 dark:text-\[\#B0B3B8\]\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\{2\} d=\"M10\.325[\s\S]*?\{t\('chat\.settings'\)\}\s*<\/button>\s*)(<button onClick=\{\(e\) => \{ e\.stopPropagation\(\); setChatListFilter\('requests'\); setIsChatListSettingsOpen\(false\); \}\} className=\"w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-\[\#3A3B3C\] flex items-center gap-3 text-\[14px\] font-semibold text-black dark:text-\[\#E4E6EB\] transition-colors\">\s*<svg className=\"w-5 h-5 text-gray-500 dark:text-\[\#B0B3B8\]\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M15 12c2\.21[\s\S]*?\{t\('chat\.messageRequests'\)\}\s*<\/button>\s*)/;

if (regex.test(code)) {
  code = code.replace(regex, `$2<div className="h-[1px] bg-gray-200 dark:bg-[#3E4042] my-1 mx-2"></div>\n                           $1`);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully swapped buttons and added divider');
} else {
  console.log('Regex did not match');
}
