const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Add state for notif dropdown menu
code = code.replace(
  '  const [isNotifPanelOpen, setIsNotifPanelOpen] = useState(false);',
  '  const [isNotifPanelOpen, setIsNotifPanelOpen] = useState(false);\n  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);'
);

// 2. Replace the X button + header div with 3-dot menu + dropdown
const oldHeader = `        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0">
          <h2 className="text-[20px] font-bold text-black dark:text-[#E4E6EB]">{t("notif.title")}</h2>
          <button
            onClick={() => setIsNotifPanelOpen(false)}
            className="w-9 h-9 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] flex items-center justify-center transition-colors text-gray-500 dark:text-[#B0B3B8]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>`;

const newHeader = `        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0">
          <h2 className="text-[20px] font-bold text-black dark:text-[#E4E6EB]">{t("notif.title")}</h2>
          {/* 3-dot menu */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setIsNotifMenuOpen(!isNotifMenuOpen); }}
              className={\`w-9 h-9 rounded-full flex items-center justify-center transition-colors text-gray-500 dark:text-[#B0B3B8] \${isNotifMenuOpen ? "bg-gray-200 dark:bg-[#3A3B3C]" : "hover:bg-gray-200 dark:hover:bg-[#3A3B3C]"}\`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            {/* Dropdown */}
            {isNotifMenuOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-11 w-[240px] bg-white dark:bg-[#3A3B3C] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-[#4E4F50] overflow-hidden z-10"
              >
                <button
                  onClick={() => setIsNotifMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-[#4E4F50] transition-colors text-left text-[14px] text-black dark:text-[#E4E6EB]"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#4E4F50] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">{t("notif.markAllRead")}</span>
                </button>
                <button
                  onClick={() => setIsNotifMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-[#4E4F50] transition-colors text-left text-[14px] text-black dark:text-[#E4E6EB]"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#4E4F50] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">{t("notif.settings")}</span>
                </button>
              </div>
            )}
          </div>
        </div>`;

code = code.replace(oldHeader, newHeader);
require('fs').writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Header replaced with 3-dot menu');
