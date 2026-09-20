const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldBlock = `{/* Header */}
              <div className="h-[60px] bg-white dark:bg-[#242526] border-b border-gray-200 dark:border-[#3E4042] flex items-center px-4 gap-4 shrink-0">
                 <button onClick={() => {setIsCreatingGroup(false); setSelectedFriendsToAdd([]);}} className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center justify-center transition-colors text-gray-500 dark:text-[#B0B3B8]">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                 </button>
                 <h2 className="font-semibold text-[17px] text-black dark:text-[#E4E6EB]">{t('chat.createGroup')}</h2>
              </div>

              <div className="flex-1 overflow-y-auto sidebar-scrollbar p-6">
                <div className="max-w-2xl mx-auto space-y-6">`;

const newBlock = `<div className="flex-1 overflow-y-auto sidebar-scrollbar p-6">
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Inline Header */}
                  <div className="flex items-center gap-3">
                    <button onClick={() => {setIsCreatingGroup(false); setSelectedFriendsToAdd([]);}} className="w-9 h-9 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] flex items-center justify-center transition-colors text-gray-600 dark:text-[#B0B3B8] -ml-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h2 className="font-bold text-[24px] text-black dark:text-[#E4E6EB]">{t('chat.createGroup')}</h2>
                  </div>`;

// Replace handling standard and CRLF line endings
let replaced = false;
if (code.includes(oldBlock)) {
  code = code.replace(oldBlock, newBlock);
  replaced = true;
} else {
  // Normalize both code and oldBlock to ignore exact whitespace differences if needed
  // Alternatively, just construct regex.
  const regex = /\{\/\* Header \*\/\}[\s\S]*?className="h-\[60px\] bg-white dark:bg-\[\#242526\] border-b border-gray-200 dark:border-\[\#3E4042\] flex items-center px-4 gap-4 shrink-0"[\s\S]*?<\/div>\s*<div className="flex-1 overflow-y-auto sidebar-scrollbar p-6">\s*<div className="max-w-2xl mx-auto space-y-6">/;
  
  if (regex.test(code)) {
    code = code.replace(regex, newBlock);
    replaced = true;
  }
}

if (replaced) {
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Replaced header with body content!');
} else {
  console.log('Block not found');
}
