const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /\) : null\}(?=\r?\n\r?\n\s*\{\/\* Friend List \(Friend Tab\) \*\/\})/g;
const newLeftBlock = `) : activeTab === "product" ? (
              <div className="space-y-4">
                {/* Store Profile Card */}
                <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">
                  <div className="h-20 bg-emerald-500 dark:bg-emerald-600 w-full relative">
                    <div className="absolute -bottom-8 left-4 w-[72px] h-[72px] bg-white dark:bg-[#242526] rounded-full p-1 shadow-sm">
                      <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-[#3A3B3C]">
                        <img src="/default-avatar.svg" alt="Toko" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      </div>
                    </div>
                  </div>
                  <div className="pt-10 pb-4 px-4 text-left">
                    <h3 className="font-bold text-[17px] text-black dark:text-[#E4E6EB]">
                      Toko Digital Kreatif
                    </h3>
                    <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] mt-1 line-clamp-2">
                      Menyediakan berbagai macam template, UI kit, dan produk digital premium.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-gray-500 dark:text-[#B0B3B8] text-[13px]">
                      <svg className="w-[16px] h-[16px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="truncate">Malang, Jawa Timur</span>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-2 space-y-1">
                  <h4 className="font-bold text-[13px] text-gray-500 dark:text-[#B0B3B8] px-2 pt-2 pb-1">Kategori Produk</h4>
                  {["all", "Ebook", "Template", "Prompt AI", "Course", "Design", "Software"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setProductFilter(filter)}
                      className={\`w-full text-left px-3 py-2 rounded-lg text-[14px] transition-colors flex items-center gap-2 \${
                        productFilter === filter
                          ? "bg-emerald-50 text-emerald-600 dark:bg-[#203D2E] dark:text-emerald-400 font-semibold"
                          : "text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C]"
                      }\`}
                    >
                      {filter === "all" ? t("product.filter_all") : filter}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}`;

code = code.replace(regex, newLeftBlock);

const filterBlockRegex = /\{\/\* Filters \/ Chips \*\/\}(.|\n)*?<\/div>\r?\n\s*<\/div>/g;
code = code.replace(filterBlockRegex, '');

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Successfully injected left filters and removed center chips');
