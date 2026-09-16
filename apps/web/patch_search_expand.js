const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Inject state
file = file.replace(
  'const [isShortcutModalOpen, setIsShortcutModalOpen] = useState(false);',
  `const [isShortcutModalOpen, setIsShortcutModalOpen] = useState(false);\n  const [isSearchExpanded, setIsSearchExpanded] = useState(false);\n  const searchRef = useRef<HTMLDivElement>(null);`
);

// 2. Inject handleClickOutside
file = file.replace(
  'if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {',
  `if (searchRef.current && !searchRef.current.contains(event.target as Node)) {\n        setIsSearchExpanded(false);\n      }\n      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {`
);

// 3. Replace Search Box
const oldSearch = `{/* Google-style Search Box */}
              <div className="w-full bg-white dark:bg-[#242526] rounded-full shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:shadow-[0_1px_6px_rgba(32,33,36,0.4)] dark:shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-shadow duration-200 border border-transparent dark:border-[#3E4042] flex items-center px-4 py-3 min-h-[48px]">
                <svg className="w-5 h-5 text-gray-400 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text"
                  placeholder="Mencari apa?...."
                  className="w-full bg-transparent border-none outline-none ml-4 text-[16px] text-black dark:text-[#E4E6EB] placeholder-gray-500 dark:placeholder-[#B0B3B8]"
                  autoFocus
                />
                
              </div>`;

const newSearch = `{/* Google-style Search Box with Expand Behavior */}
              <div className="relative w-full z-[60] h-[48px]" ref={searchRef}>
                <div className={\`absolute top-0 left-0 w-full bg-white dark:bg-[#242526] \${isSearchExpanded ? 'rounded-[24px] shadow-[0_4px_12px_rgba(32,33,36,0.28)] pb-4' : 'rounded-full shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:shadow-[0_1px_6px_rgba(32,33,36,0.4)]'} dark:shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-all duration-200 border border-transparent dark:border-[#3E4042] flex flex-col\`}>
                  
                  {/* Input Row */}
                  <div className="flex items-center px-4 py-3 min-h-[48px] w-full">
                    <svg className="w-5 h-5 text-gray-400 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input 
                      type="text"
                      placeholder="Mencari apa?...."
                      className="w-full bg-transparent border-none outline-none ml-4 text-[16px] text-black dark:text-[#E4E6EB] placeholder-gray-500 dark:placeholder-[#B0B3B8]"
                      onFocus={() => setIsSearchExpanded(true)}
                    />
                  </div>

                  {/* Expanded Dropdown Content */}
                  {isSearchExpanded && (
                    <div className="w-full border-t border-gray-100 dark:border-[#3E4042] pt-2 mt-1 flex flex-col">
                      <div className="px-4 py-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer flex items-center gap-3 transition-colors">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-[15px] text-black dark:text-[#E4E6EB]">translate - Google Search</span>
                      </div>
                      <div className="px-4 py-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer flex items-center gap-3 transition-colors">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-[15px] text-black dark:text-[#E4E6EB]">compress foto</span>
                      </div>
                      <div className="px-4 py-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer flex items-center gap-3 transition-colors">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-[15px] text-black dark:text-[#E4E6EB]">png to svg</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>`;

file = file.split(oldSearch).join(newSearch);
file = file.split(oldSearch.replace(/\n/g, '\r\n')).join(newSearch.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added search expand logic');
