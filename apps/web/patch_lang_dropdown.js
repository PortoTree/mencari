const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Tambah state isLangOpen dan langRef
const stateAnchor = "const chatFilterRef = useRef<HTMLDivElement>(null);";
const newStates = `${stateAnchor}\n  const [isLangOpen, setIsLangOpen] = useState(false);\n  const langRef = useRef<HTMLDivElement>(null);`;
file = file.replace(stateAnchor, newStates);

// 2. Tambah logic close dropdown di handleClickOutside
const clickAnchor = `if (chatMenuRef.current && !chatMenuRef.current.contains(event.target as Node)) {
        setActiveChatMenu(null);
      }`;
const newClick = `${clickAnchor}\n      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }`;
file = file.replace(clickAnchor, newClick);

// 3. Update Language Switcher UI
const oldSwitcher = `{/* Language Switcher */}
          <div className="relative group">
            <button
              onClick={() => {
                const newLocale = locale === 'id' ? 'en' : 'id';
                const currentPath = window.location.pathname;
                const pathWithoutLocale = currentPath.replace(/^\\/(id|en)/, '');
                window.location.href = '/' + newLocale + (pathWithoutLocale || '/beranda');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8D9DB] dark:hover:bg-[#4E4F50] transition-colors text-black dark:text-[#E4E6EB] text-[13px] font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
              {locale === 'id' ? 'ID' : 'EN'}
            </button>
          </div>`;

const newSwitcher = `{/* Language Switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8D9DB] dark:hover:bg-[#4E4F50] transition-colors text-black dark:text-[#E4E6EB] text-[13px] font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
              {locale === 'id' ? 'ID' : 'EN'}
            </button>

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
                  <span className="text-[16px]">🇮🇩</span>
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
                  <span className="text-[16px]">🇺🇸</span>
                  <span className="font-semibold text-[14px] text-black dark:text-[#E4E6EB]">English</span>
                </button>
              </div>
            )}
          </div>`;

if (file.includes('onClick={() => {') && file.includes('newLocale = locale ===')) {
  // Gunakan split/join untuk replace blok switcher
  const startIdx = file.indexOf('{/* Language Switcher */}');
  const endIdx = file.indexOf('{/* Vertical Separator */}');
  if (startIdx !== -1 && endIdx !== -1) {
    const oldBlock = file.substring(startIdx, endIdx);
    file = file.replace(oldBlock, newSwitcher + '\n\n          ');
    console.log('✅ Replaced language switcher block');
  } else {
    console.log('⚠️ Could not find exact boundaries for language switcher');
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Update finished');
