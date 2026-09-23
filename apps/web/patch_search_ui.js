const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Inject the states
const stateSearch = '  const [productFilter, setProductFilter] = useState("all");';
const stateReplace = `  const [productFilter, setProductFilter] = useState("all");
  const [isProductSortOpen, setIsProductSortOpen] = useState(false);
  const [productSort, setProductSort] = useState("popular");`;

if (code.includes(stateSearch)) {
  code = code.replace(stateSearch, stateReplace);
  console.log('Successfully injected sort states.');
} else {
  console.log('Failed to find state injection point.');
}

// Replace the UI
const uiSearchRegex = /\{\/\* Search & Filters \*\/\}\r?\n\s*<div className="mb-6 px-2 sm:px-0">(.|\n)*?<\/div>\r?\n\s*<\/div>/;

const newUI = `{/* Search & Sort */}
                <div className="mb-6 px-2 sm:px-0">
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      </div>
                      <input 
                        type="text" 
                        placeholder={t("product.search_placeholder")} 
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="w-full bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3E4042] rounded-full py-2.5 pl-10 pr-4 text-[14px] text-black dark:text-[#E4E6EB] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm"
                      />
                    </div>
                    
                    {/* Sort Dropdown */}
                    <div className="relative">
                      <button 
                        onClick={() => setIsProductSortOpen(!isProductSortOpen)}
                        className="flex items-center justify-center w-[42px] h-[42px] bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3E4042] rounded-full text-gray-600 dark:text-[#B0B3B8] hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors shadow-sm"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                      </button>
                      
                      {isProductSortOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setIsProductSortOpen(false)}></div>
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#242526] rounded-xl shadow-lg border border-gray-100 dark:border-[#3E4042] py-2 z-20 overflow-hidden">
                            <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 dark:text-[#B0B3B8] uppercase tracking-wider">
                              {t("product.sort_placeholder")}
                            </div>
                            {[
                              { id: "popular", label: t("product.sort_popular") },
                              { id: "lowest_price", label: t("product.sort_lowest_price") },
                              { id: "highest_price", label: t("product.sort_highest_price") },
                              { id: "highest_rating", label: t("product.sort_highest_rating") }
                            ].map((option) => (
                              <button
                                key={option.id}
                                onClick={() => { setProductSort(option.id); setIsProductSortOpen(false); }}
                                className={\`w-full text-left px-4 py-2 text-[13px] transition-colors \${
                                  productSort === option.id 
                                    ? "bg-emerald-50 text-emerald-600 dark:bg-[#203D2E] dark:text-emerald-400 font-medium" 
                                    : "text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-50 dark:hover:bg-[#3A3B3C]"
                                }\`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div className="h-px w-full bg-gray-200 dark:bg-[#3E4042]"></div>
                </div>`;

if (uiSearchRegex.test(code)) {
  code = code.replace(uiSearchRegex, newUI);
  console.log('Successfully updated the Search & Sort UI.');
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
} else {
  console.log('Regex did not match the UI block.');
}
