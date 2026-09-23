const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

const mencariTabStart = 616 - 1; // 0-indexed
const mencariTabEnd = 647 - 1;

// The new "Produk" tab code
const productTabCode = `          <div
            onClick={() => {
              setActiveTab("product");
              window.history.pushState(null, "", \`/\${locale}/product\`);
            }}
            className={\`flex flex-col items-center justify-center w-[110px] h-full cursor-pointer transition-colors \${activeTab === "product" ? "border-b-[3px] border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400 my-0 h-full rounded-none" : "border-b-[3px] border-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg my-1"}\`}
          >
            <div
              className="w-7 h-7 bg-current"
              style={{
                WebkitMask: \`url(\${activeTab === "product" ? "/navigasi/produk-aktif.svg" : "/navigasi/produk.svg"}) center/contain no-repeat\`,
                mask: \`url(\${activeTab === "product" ? "/navigasi/produk-aktif.svg" : "/navigasi/produk.svg"}) center/contain no-repeat\`,
              }}
            />
            <span className="text-[11px] font-semibold mt-0.5">
              {t("tabs.product")}
            </span>
          </div>`;

// Delete the old "Mencari" tab and insert "Produk" tab
lines.splice(mencariTabStart, mencariTabEnd - mencariTabStart + 1, productTabCode);

// Now find where notifBtnRef is, and insert the new Mencari icon button right before its container
let notifIdx = lines.findIndex(l => l.includes('ref={notifBtnRef}'));
let notifContainerStart = notifIdx;
while (!lines[notifContainerStart].includes('<div className="relative group">') && notifContainerStart > 0) {
  notifContainerStart--;
}

const rightNavMencariCode = `          <div className="relative group">
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

lines.splice(notifContainerStart, 0, rightNavMencariCode);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Successfully swapped Mencari and Product tabs');
