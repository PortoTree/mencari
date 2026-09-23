const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Add state and ref
if (!code.includes('isSearchNavOpen')) {
  code = code.replace(
    'const [isNotifPanelOpen, setIsNotifPanelOpen] = useState(false);',
    'const [isSearchNavOpen, setIsSearchNavOpen] = useState(false);\n  const searchNavRef = useRef<HTMLDivElement>(null);\n  const [isNotifPanelOpen, setIsNotifPanelOpen] = useState(false);'
  );
}

// 2. Add to handleClickOutside
if (!code.includes('searchNavRef.current.contains')) {
  code = code.replace(
    'if (\n        searchRef.current &&',
    'if (\n        searchNavRef.current &&\n        !searchNavRef.current.contains(event.target as Node)\n      ) {\n        setIsSearchNavOpen(false);\n      }\n      if (\n        searchRef.current &&'
  );
}

// 3. Replace the Right Nav Mencari code
const oldMencariCode = `<div className="relative group">
            <button
              onClick={() => {
                setActiveTab("mencari");
                window.history.pushState(null, "", \`/\${locale}/mencari\`);
              }}
              className={\`w-10 h-10 rounded-full flex items-center justify-center transition-colors overflow-hidden \${activeTab === "mencari" ? "bg-[#D8F0E2] dark:bg-[#203D2E] text-emerald-600 dark:text-emerald-400" : "bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A] text-black dark:text-[#E4E6EB]"}\`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              {t("tabs.search")}
            </div>
          </div>`;

const newMencariCode = `<div className="relative group" ref={searchNavRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSearchNavOpen(!isSearchNavOpen);
              }}
              className={\`w-10 h-10 rounded-full flex items-center justify-center transition-colors overflow-hidden \${isSearchNavOpen || activeTab === "mencari" ? "bg-[#D8F0E2] dark:bg-[#203D2E] text-emerald-600 dark:text-emerald-400" : "bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A] text-black dark:text-[#E4E6EB]"}\`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Tooltip */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              Mencari
            </div>

            {/* Search Dropdown */}
            {isSearchNavOpen && (
              <div
                className="absolute top-[52px] right-0 w-[300px] sm:w-[360px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-[#3E4042] overflow-hidden z-[100]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-3">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#3A3B3C] rounded-full px-4 py-2 border border-gray-200 dark:border-[#4E4F50] focus-within:border-emerald-500 transition-colors">
                    <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Pencarian..."
                      className="w-full bg-transparent border-none outline-none text-[15px] text-black dark:text-[#E4E6EB] placeholder-gray-500 min-w-0"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setActiveTab("mencari");
                          setIsSearchNavOpen(false);
                          window.history.pushState(null, "", \`/\${locale}/mencari\`);
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        setActiveTab("mencari");
                        setIsSearchNavOpen(false);
                        window.history.pushState(null, "", \`/\${locale}/mencari\`);
                      }}
                      className="p-1.5 -mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-emerald-600 dark:text-emerald-400 transition-colors shrink-0"
                      title="Kunjungi halaman mencari"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>`;

// Fallback logic for replace since whitespace might not perfectly match
const normalizedCode = code.replace(/\r\n/g, '\n');
const normalizedOld = oldMencariCode.replace(/\r\n/g, '\n');

if (normalizedCode.includes(normalizedOld)) {
  code = normalizedCode.replace(normalizedOld, newMencariCode);
} else {
  console.log("Could not find exact old code. Replacing via regex...");
  const oldRegex = /<div className="relative group">\s*<button\s*onClick={\(\) => \{\s*setActiveTab\("mencari"\);\s*window\.history\.pushState\(null, "", `\/\$\{locale\}\/mencari`\);\s*\}\}[\s\S]*?\{t\("tabs\.search"\)\}\s*<\/div>\s*<\/div>/m;
  code = normalizedCode.replace(oldRegex, newMencariCode);
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Successfully updated Mencari Search Dropdown behavior');
