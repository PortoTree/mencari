const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldButtonCode = `<button
                      onClick={() => {
                        setActiveTab("mencari");
                        setIsSearchNavOpen(false);
                        window.history.pushState(null, "", \`/\${locale}/mencari\`);
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#3A3B3C] hover:bg-emerald-50 dark:hover:bg-[#203D2E] transition-colors shrink-0 group/visit border border-gray-200 dark:border-[#4E4F50]"
                      title="Kunjungi halaman mencari"
                    >
                      <img
                        src="/visit.png"
                        alt="Visit"
                        className="w-7 h-7 object-contain group-hover/visit:scale-110 transition-transform"
                      />
                    </button>`;

const newButtonCode = `<div className="relative group/visit">
                      <button
                        onClick={() => {
                          setActiveTab("mencari");
                          setIsSearchNavOpen(false);
                          window.history.pushState(null, "", \`/\${locale}/mencari\`);
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#3A3B3C] hover:bg-emerald-50 dark:hover:bg-[#203D2E] transition-colors shrink-0 border border-gray-200 dark:border-[#4E4F50]"
                      >
                        <img
                          src="/visit.png"
                          alt="Visit"
                          className="w-7 h-7 object-contain group-hover/visit:scale-110 transition-transform"
                        />
                      </button>
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover/visit:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
                        {t("search.visit")}
                      </div>
                    </div>`;

const normalizedCode = code.replace(/\r\n/g, '\n');
const normalizedOld = oldButtonCode.replace(/\r\n/g, '\n');

if (normalizedCode.includes(normalizedOld)) {
  code = normalizedCode.replace(normalizedOld, newButtonCode);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully replaced default tooltip with custom tooltip');
} else {
  console.log('Regex match fallback...');
  const regex = /<button[\s\S]*?className="[^"]*group\/visit[^"]*"[\s\S]*?title="Kunjungi halaman mencari"[\s\S]*?>[\s\S]*?<\/button>/m;
  const match = normalizedCode.match(regex);
  if (match) {
    const replacement = `<div className="relative group/visit">
                      ${match[0].replace('title="Kunjungi halaman mencari"', '').replace('group/visit ', '')}
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover/visit:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
                        {t("search.visit") || "Kunjungi halaman mencari"}
                      </div>
                    </div>`;
    code = normalizedCode.replace(regex, replacement);
    fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
    console.log('Regex replacement successful');
  } else {
    console.log('Could not find button code.');
  }
}
