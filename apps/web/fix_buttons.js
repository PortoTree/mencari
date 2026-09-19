const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /<button className="opacity-0 group-hover:opacity-100 p-1\.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-\[#3A3B3C\] rounded-full transition-all shrink-0">[\s\n]*<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v\.01M12 12v\.01M12 19v\.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" \/><\/svg>[\s\n]*<\/button>/g;

let count = 0;
code = code.replace(regex, (match) => {
  const i = count++;
  const isIncoming = i === 0;
  return \<div className="relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveMessageDropdown(\); }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-full transition-all shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                    </button>
                    {activeMessageDropdown === \ && (
                      <div ref={messageDropdownRef} className="absolute \ top-full mt-1 z-50">
                        <MessageDropdownMenu isIncoming={\} t={t} />
                      </div>
                    )}
                  </div>\;
});

console.log('Replaced', count, 'buttons');
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
