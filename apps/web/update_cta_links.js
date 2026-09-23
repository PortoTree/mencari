const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Replace button 1
const btn1Old = `<button className="w-full sm:w-auto whitespace-nowrap bg-white text-emerald-600 hover:bg-emerald-700 hover:text-white font-bold text-[14px] py-2.5 px-6 rounded-lg transition-colors shadow-sm">
                      {t("mencari.cta_button")}
                    </button>`;
const btn1New = `<button onClick={() => router.push(\`/\${locale}/page\`)} className="w-full sm:w-auto whitespace-nowrap bg-white text-emerald-600 hover:bg-emerald-700 hover:text-white font-bold text-[14px] py-2.5 px-6 rounded-lg transition-colors shadow-sm">
                      {t("mencari.cta_button")}
                    </button>`;

// Replace button 2
const btn2Old = `<button className="w-full mt-1 whitespace-nowrap bg-white text-emerald-600 hover:bg-emerald-700 hover:text-white font-bold text-[14px] py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                  {t("mencari.cta_button")}
                </button>`;
const btn2New = `<button onClick={() => router.push(\`/\${locale}/page\`)} className="w-full mt-1 whitespace-nowrap bg-white text-emerald-600 hover:bg-emerald-700 hover:text-white font-bold text-[14px] py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                  {t("mencari.cta_button")}
                </button>`;

let normalizedCode = code.replace(/\r\n/g, '\n');
normalizedCode = normalizedCode.replace(btn1Old.replace(/\r\n/g, '\n'), btn1New);
normalizedCode = normalizedCode.replace(btn2Old.replace(/\r\n/g, '\n'), btn2New);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', normalizedCode);
console.log('Successfully updated CTA buttons in beranda/page.tsx');
