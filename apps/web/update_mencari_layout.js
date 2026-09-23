const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

const oldBlockStart = `              {/* Moved CTA Block */}
              <div className="w-full max-w-[600px] mx-auto mt-6 bg-gradient-to-br from-green-800 to-green-950 rounded-xl shadow-sm border border-transparent overflow-hidden p-5 sm:p-6 text-white relative">
                {/* Decorative circles */}`;

const oldBlockRegex = /\{\/\* Moved CTA Block \*\/\}[\s\S]*?<button onClick=\{\(\) => router\.push\(`\/\$\{locale\}\/page`\)\} className="w-full sm:w-auto whitespace-nowrap bg-white text-emerald-600 hover:bg-emerald-700 hover:text-white font-bold text-\[14px\] py-2\.5 px-6 rounded-lg transition-colors shadow-sm">\s*\{t\("mencari\.cta_button"\)\}\s*<\/button>\s*<\/div>\s*<\/div>\s*<\/div>/;

const newBlock = `{/* Moved CTA Block */}
              <div className="w-full max-w-[600px] mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Website CTA */}
                <div className="bg-gradient-to-br from-green-800 to-green-950 rounded-xl shadow-sm border border-transparent overflow-hidden p-4 text-white relative h-full flex flex-col justify-between">
                  {/* Decorative circles */}
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                  <div className="absolute right-12 -top-2 w-8 h-8 bg-white opacity-10 rounded-full"></div>

                  <div className="relative z-10 flex flex-col gap-3 h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                        <img src="/visit.png" alt="Website" className="w-6 h-6 object-contain" />
                      </div>
                      <h3 className="font-bold text-[15px] leading-snug m-0">
                        {t("mencari.cta_title")}
                      </h3>
                    </div>
                    <p className="text-[13px] text-emerald-50 leading-relaxed opacity-90 m-0 mb-2 flex-grow">
                      {t("mencari.cta_desc")}
                    </p>
                    <button onClick={() => router.push(\`/\${locale}/page\`)} className="w-full mt-auto whitespace-nowrap bg-white text-emerald-600 hover:bg-emerald-700 hover:text-white font-bold text-[14px] py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                      {t("mencari.cta_button")}
                    </button>
                  </div>
                </div>

                {/* Product CTA */}
                <div className="bg-gradient-to-br from-orange-700 to-orange-900 rounded-xl overflow-hidden shadow-sm p-4 text-white relative h-full flex flex-col justify-between">
                  {/* Decorative circles */}
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                  <div className="absolute right-12 -top-2 w-8 h-8 bg-white opacity-10 rounded-full"></div>

                  <div className="relative z-10 flex flex-col gap-3 h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                        <img src="/navigasi/produk-aktif.svg" alt="Product" className="w-6 h-6 object-contain brightness-0 invert" />
                      </div>
                      <h3 className="font-bold text-[15px] leading-snug m-0">
                        {t("mencari.product_cta_title")}
                      </h3>
                    </div>
                    <p className="text-[13px] text-orange-50 leading-relaxed opacity-90 m-0 mb-2 flex-grow">
                      {t("mencari.product_cta_desc")}
                    </p>
                    <button onClick={() => router.push(\`/\${locale}/product?create=true\`)} className="w-full mt-auto whitespace-nowrap bg-white text-orange-700 hover:bg-orange-800 hover:text-white font-bold text-[14px] py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                      {t("mencari.product_cta_button")}
                    </button>
                  </div>
                </div>
              </div>`;

code = code.replace(oldBlockRegex, newBlock);

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Updated /mencari CTA layout.');
