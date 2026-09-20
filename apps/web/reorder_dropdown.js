const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// I will just use standard substring replacing by splitting on exact string boundaries since regex can be finicky here.
const manageBtn = `                          <button onClick={(e) => { e.stopPropagation(); setIsChatListSettingsOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                            <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            {t('chat.manage')}
                          </button>\n`;

const reqsBtn = `                          <button onClick={(e) => { e.stopPropagation(); setChatListFilter('requests'); setIsChatListSettingsOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                             <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 24 24"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                             {t('chat.messageRequests')}
                           </button>\n`;
                           
const divider = `                         <div className="h-[1px] bg-gray-200 dark:bg-[#3E4042] my-1 mx-2"></div>\n`;

const blockRegex = /(<div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-\[\#242526\] rounded-lg shadow-\[0_0_15px_rgba\(0,0,0,0\.1\)\] border border-gray-100 dark:border-\[\#3E4042\] py-1\.5 z-50\">\n)[\s\S]*?(                           <button onClick=\{\(e\) => \{ e\.stopPropagation\(\); setIsChatListSettingsOpen\(false\); \}\} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-\[\#3A3B3C\] flex items-center gap-3 text-\[14px\] font-semibold text-black dark:text-\[\#E4E6EB\] transition-colors\">\n                             <svg className="w-5 h-5 text-gray-500 dark:text-\[\#B0B3B8\]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=\{2\} d="M10\.325[\s\S]*?\{t\('chat\.settings'\)\}\n                           <\/button>\n                         <\/div>)/;

if (blockRegex.test(code)) {
  code = code.replace(blockRegex, `$1${reqsBtn}${divider}${manageBtn}$2`);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully reordered dropdown');
} else {
  console.log('Regex did not match');
}
