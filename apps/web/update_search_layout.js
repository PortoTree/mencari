const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldCode = `<div className="flex items-center gap-2 bg-gray-100 dark:bg-[#3A3B3C] rounded-full px-4 py-2 border border-gray-200 dark:border-[#4E4F50] focus-within:border-emerald-500 transition-colors">
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
                  </div>`;

const newCode = `<div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setActiveTab("mencari");
                        setIsSearchNavOpen(false);
                        window.history.pushState(null, "", \`/\${locale}/mencari\`);
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#3A3B3C] hover:bg-emerald-50 dark:hover:bg-[#203D2E] transition-colors shrink-0 group/visit border border-gray-200 dark:border-[#4E4F50]"
                      title="Kunjungi halaman mencari"
                    >
                      <div
                        className="w-5 h-5 bg-emerald-600 dark:bg-emerald-400 group-hover/visit:scale-110 transition-transform"
                        style={{
                          WebkitMask: \`url(/navigasi/visit.svg) center/contain no-repeat\`,
                          mask: \`url(/navigasi/visit.svg) center/contain no-repeat\`,
                        }}
                      />
                    </button>
                    <div className="flex-1 flex items-center gap-2 bg-gray-100 dark:bg-[#3A3B3C] rounded-full px-4 py-2 border border-gray-200 dark:border-[#4E4F50] focus-within:border-emerald-500 transition-colors">
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
                    </div>
                  </div>`;

// Fallback logic for replace since whitespace might not perfectly match
const normalizedCode = code.replace(/\r\n/g, '\n');
const normalizedOld = oldCode.replace(/\r\n/g, '\n');

if (normalizedCode.includes(normalizedOld)) {
  code = normalizedCode.replace(normalizedOld, newCode);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully updated searchbox layout');
} else {
  console.log("Could not find exact old code. Replacing via regex...");
  const oldRegex = /<div className="flex items-center gap-2 bg-gray-100 dark:bg-\[#3A3B3C\] rounded-full px-4 py-2 border border-gray-200 dark:border-\[#4E4F50\] focus-within:border-emerald-500 transition-colors">[\s\S]*?<\/button>\s*<\/div>/m;
  code = normalizedCode.replace(oldRegex, newCode);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Regex update complete.');
}
