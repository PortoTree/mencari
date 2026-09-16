const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Fix handleClickOutside
const handleOutsideStr = `if (chatMenuRef.current && !chatMenuRef.current.contains(event.target as Node)) {
        setActiveChatMenu(null);
      }`;
if (file.includes(handleOutsideStr) && !file.includes('langRef.current.contains')) {
  file = file.replace(handleOutsideStr, `${handleOutsideStr}
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }`);
  console.log('✅ Fixed handleClickOutside');
} else {
  console.log('⚠️ Could not find exact handleOutsideStr');
}

// 2. Fix Language Switcher button
const idSvg = `<svg className="w-5 h-5 rounded-[2px] shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#ED2939" d="M0 0h36v18H0z"/>
                  <path fill="#fff" d="M0 18h36v18H0z"/>
                </svg>`;

const enSvg = `<svg className="w-5 h-5 rounded-[2px] shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#0A3161" d="M0 0h36v36H0z"/>
                  <path fill="#B31942" d="M0 4.5h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z"/>
                  <path fill="#fff" d="M0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z"/>
                  <path fill="#0A3161" d="M0 0h18v18H0z"/>
                  <path fill="#fff" d="M3 3h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 7h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 11h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
                </svg>`;

const startSwitch = file.indexOf('{/* Language Switcher */}');
const endSwitch = file.indexOf('{/* MENU ICON - NO CIRCLE */}');
if (startSwitch !== -1 && endSwitch !== -1) {
  const switcherBlock = file.substring(startSwitch, endSwitch);
  
  const newSwitcher = `{/* Language Switcher */}
          <div className="relative group mx-1" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8D9DB] dark:hover:bg-[#4E4F50] transition-colors text-black dark:text-[#E4E6EB] text-[13px] font-semibold"
            >
              {locale === 'id' ? (
                ${idSvg}
              ) : (
                ${enSvg}
              )}
              {locale === 'id' ? 'ID' : 'EN'}
            </button>
            
            <div className={\`absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 \${!isLangOpen ? 'group-hover:opacity-100' : ''} transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]\`}>
              {t('common.language')}
            </div>

            {isLangOpen && (
              <div className="absolute top-12 right-0 w-[140px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-[#3E4042] p-2 z-[100]">
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
          </div>\n\n          `;
          
  file = file.replace(switcherBlock, newSwitcher);
  console.log('✅ Replaced Language Switcher');
} else {
  console.log('⚠️ Could not find Language Switcher block');
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
