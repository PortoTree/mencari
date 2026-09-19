const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

for(let i=0; i<5; i++) {
  const startStr = '<button className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-full transition-all shrink-0">';
  const endStr = '</button>';
  
  const startIdx = code.indexOf(startStr);
  if (startIdx === -1) break;
  const endIdx = code.indexOf(endStr, startIdx) + endStr.length;
  
  const original = code.substring(startIdx, endIdx);
  const isIncoming = i === 0;
  const replacement = \<div className="relative">
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
  code = code.replace(original, replacement);
  console.log('Replaced', i);
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
