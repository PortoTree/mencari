const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

// 1. Replace Mencari icon
const mencariButtonBlock = `                <button
                  onClick={() => {
                    setActiveTab("mencari");
                    window.history.pushState(null, "", \`/\${locale}/mencari\`);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    Mencari
                  </span>
                </button>`;

const newMencariButtonBlock = `                <button
                  onClick={() => {
                    setActiveTab("mencari");
                    window.history.pushState(null, "", \`/\${locale}/mencari\`);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"
                >
                  <img src="/logo.png" alt="Mencari" className="w-6 h-6 object-contain" />
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    Mencari
                  </span>
                </button>`;

code = code.replace(mencariButtonBlock, newMencariButtonBlock);
code = code.replace(mencariButtonBlock.replace(/\n/g, '\r\n'), newMencariButtonBlock);

// 2. Add Produk button below Your Page
const yourPageButton = `                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
                  <img src="/visit.png" alt="Your Page" className="w-6 h-6 object-contain" />
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("nav.webpage")}
                  </span>
                </button>`;

const produkButton = `
                <button
                  onClick={() => {
                    setActiveTab("product");
                    window.history.pushState(null, "", \`/\${locale}/product\`);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"
                >
                  <img src="/navigasi/produk.svg" alt="Produk" className="w-6 h-6 object-contain dark:brightness-200" />
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("tabs.product")}
                  </span>
                </button>`;

code = code.replace(yourPageButton, yourPageButton + produkButton);
code = code.replace(yourPageButton.replace(/\n/g, '\r\n'), yourPageButton.replace(/\n/g, '\r\n') + produkButton);

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Updated Mencari icon and added Produk navigation.');
