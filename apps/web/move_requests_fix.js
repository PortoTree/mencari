const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Remove it from the wrong place (around line 3200).
// Let's find it via regex and remove it.
const wrongPlaceRegex = /<button\s*onClick=\{\(e\) => \{ e\.stopPropagation\(\); setChatListFilter\('requests'\); setIsChatListSettingsOpen\(false\); \}\}\s*className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-\[\#3A3B3C\] flex items-center gap-3 text-\[14px\] font-semibold text-gray-700 dark:text-\[\#E4E6EB\] transition-colors"\s*>[\s\S]*?\{t\('chat\.messageRequests'\)\}\s*<\/button>/;

if (wrongPlaceRegex.test(code)) {
  code = code.replace(wrongPlaceRegex, '');
  console.log('Removed from wrong place');
} else {
  console.log('Wrong place not found');
}

// 2. Insert into the correct place (line 4106).
const correctPlaceRegex = /(<button onClick=\{\(e\) => \{ e\.stopPropagation\(\); setIsChatListSettingsOpen\(false\); \}\} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-\[\#3A3B3C\] flex items-center gap-3 text-\[14px\] font-semibold text-black dark:text-\[\#E4E6EB\] transition-colors">\s*<svg className="w-5 h-5 text-gray-500 dark:text-\[\#B0B3B8\]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=\{2\} d="M10\.325[\s\S]*?\{t\('chat\.settings'\)\}\s*<\/button>\s*)(<\/div>)/;

const newOption = `<button onClick={(e) => { e.stopPropagation(); setChatListFilter('requests'); setIsChatListSettingsOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                             <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 24 24"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                             {t('chat.messageRequests')}
                           </button>
                         `;

if (correctPlaceRegex.test(code)) {
  code = code.replace(correctPlaceRegex, `$1${newOption}$2`);
  console.log('Added to correct place');
} else {
  console.log('Correct place regex failed');
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
