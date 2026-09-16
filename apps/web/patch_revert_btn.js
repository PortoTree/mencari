const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const translateSvg = `<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>`;

// We will find the entire block from Language Switcher up to the vertical separator
// and the MENU ICON. Then we will re-order them.

const startSwitch = file.indexOf('{/* Language Switcher */}');
const endSwitch = file.indexOf('{/* MENU ICON - NO CIRCLE */}');

if (startSwitch !== -1 && endSwitch !== -1) {
  // Replace the Language Switcher entirely and move it below the vertical separator.
  // Wait, let's just remove the current Language Switcher, and insert the new one after Vertical Separator.
  
  const switcherBlock = file.substring(startSwitch, file.indexOf('{/* Vertical Separator */}'));
  
  // Remove it from current position
  file = file.replace(switcherBlock, '');
  
  // Create new switcher block
  const newSwitcher = `{/* Language Switcher */}
          <div className="relative group mx-1" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8D9DB] dark:hover:bg-[#4E4F50] transition-colors text-black dark:text-[#E4E6EB] text-[13px] font-semibold"
            >
              ${translateSvg}
              {locale === 'id' ? 'ID' : 'EN'}
            </button>
            
            {isLangOpen && (
              <div className="absolute top-10 right-0 w-[140px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[100]">
                <button
                  onClick={() => {
                    const currentPath = window.location.pathname;
                    const pathWithoutLocale = currentPath.replace(/^\\/(id|en)/, '');
                    window.location.href = '/id' + (pathWithoutLocale || '/beranda');
                  }}
                  className={\`w-full flex items-center gap-3 p-2 rounded-lg transition-colors \${locale === 'id' ? 'bg-[#E4E6EB] dark:bg-[#3A3B3C]' : 'hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C]'}\`}
                >
                  <svg className="w-[18px] h-[18px] rounded-sm shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ED2939" d="M0 0h36v18H0z"/>
                    <path fill="#fff" d="M0 18h36v18H0z"/>
                  </svg>
                  <span className="font-semibold text-[14px] text-black dark:text-[#E4E6EB]">Indonesia</span>
                </button>
                <button
                  onClick={() => {
                    const currentPath = window.location.pathname;
                    const pathWithoutLocale = currentPath.replace(/^\\/(id|en)/, '');
                    window.location.href = '/en' + (pathWithoutLocale || '/beranda');
                  }}
                  className={\`w-full flex items-center gap-3 p-2 rounded-lg transition-colors mt-1 \${locale === 'en' ? 'bg-[#E4E6EB] dark:bg-[#3A3B3C]' : 'hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C]'}\`}
                >
                  <svg className="w-[18px] h-[18px] rounded-sm shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#0A3161" d="M0 0h36v36H0z"/>
                    <path fill="#B31942" d="M0 4.5h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z"/>
                    <path fill="#fff" d="M0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z"/>
                    <path fill="#0A3161" d="M0 0h18v18H0z"/>
                    <path fill="#fff" d="M3 3h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 7h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 11h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
                  </svg>
                  <span className="font-semibold text-[14px] text-black dark:text-[#E4E6EB]">English</span>
                </button>
              </div>
            )}
          </div>
`;

  // Insert after vertical separator
  const separatorEnd = file.indexOf('</div>', file.indexOf('{/* Vertical Separator */}')) + 6;
  file = file.substring(0, separatorEnd) + '\n\n          ' + newSwitcher + file.substring(separatorEnd);
  
  console.log('✅ Moved and reverted Language Switcher button');
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
} else {
  console.log('⚠️ Could not find blocks');
}
