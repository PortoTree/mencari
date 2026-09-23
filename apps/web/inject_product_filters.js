const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Inject state variables
const stateInjectStr = `  const [activeTab, setActiveTab] = useState<`;
const newStates = `  const [productSearch, setProductSearch] = useState("");
  const [productFilter, setProductFilter] = useState("Semua");
`;
if (code.includes(stateInjectStr)) {
  code = code.replace(stateInjectStr, newStates + stateInjectStr);
  console.log('Successfully injected state variables');
} else {
  console.log('Failed to find state injection point');
}

// 2. Inject Searchbox and Filters
const uiInjectStr = `px-2 sm:px-0">Produk Digital</h2>`;
const uiNewBlock = `px-2 sm:px-0">Produk Digital</h2>
                
                {/* Search & Filters */}
                <div className="mb-6 px-2 sm:px-0">
                  <div className="relative mb-3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Cari produk digital..." 
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3E4042] rounded-full py-2.5 pl-10 pr-4 text-[14px] text-black dark:text-[#E4E6EB] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm"
                    />
                  </div>
                  
                  {/* Filters / Chips */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style dangerouslySetInnerHTML={{__html: \`
                      .hide-scroll::-webkit-scrollbar {
                        display: none;
                      }
                    \`}} />
                    {["Semua", "Ebook", "Template", "Prompt AI", "Course", "Design", "Software"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setProductFilter(filter)}
                        className={\`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors border \${
                          productFilter === filter 
                            ? "bg-emerald-500 text-white border-emerald-500 shadow-sm" 
                            : "bg-white dark:bg-[#242526] text-gray-600 dark:text-[#B0B3B8] border-gray-200 dark:border-[#3E4042] hover:bg-gray-50 dark:hover:bg-[#3A3B3C]"
                        }\`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>`;

if (code.includes(uiInjectStr)) {
  code = code.replace(uiInjectStr, uiNewBlock);
  console.log('Successfully injected UI block');
} else {
  console.log('Failed to find UI injection point');
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
