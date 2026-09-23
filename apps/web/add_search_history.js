const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldCode = `<input
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
                  </div>
                </div>
              </div>`;

const newCode = `<input
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
                  </div>

                  {/* Dummy Recent Searches */}
                  <div className="mt-4 px-1 pb-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-[15px] font-semibold text-black dark:text-[#E4E6EB]">
                        {t("search.recent") || "Pencarian Terakhir"}
                      </h4>
                      <button className="text-[14px] text-emerald-600 dark:text-emerald-400 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] px-2 py-1 rounded-md transition-colors">
                        {t("search.edit") || "Edit"}
                      </button>
                    </div>
                    <div className="flex flex-col">
                      {[
                        "Villa murah di Bali",
                        "Lowongan kerja Jakarta",
                        "Jasa desain grafis",
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 -mx-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer group transition-colors">
                          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-[#4E4F50] flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="flex-1 text-[15px] font-medium text-black dark:text-[#E4E6EB] truncate">
                            {item}
                          </span>
                          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-gray-500 opacity-0 group-hover:opacity-100 transition-all" title="Hapus">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>`;

const normalizedCode = code.replace(/\r\n/g, '\n');
const normalizedOld = oldCode.replace(/\r\n/g, '\n');

if (normalizedCode.includes(normalizedOld)) {
  code = normalizedCode.replace(normalizedOld, newCode);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully added dummy search history');
} else {
  console.log('Regex block matching failed!');
}
