const fs = require('fs');

// 1. Translations
const idFile = 'messages/id.json';
const enFile = 'messages/en.json';
let idTrans = JSON.parse(fs.readFileSync(idFile, 'utf8'));
let enTrans = JSON.parse(fs.readFileSync(enFile, 'utf8'));

idTrans.mencari.product_cta_title = "Punya produk digital?";
idTrans.mencari.product_cta_desc = "Pasarkan produk digital Anda dan jangkau lebih banyak pembeli di platform kami.";
idTrans.mencari.product_cta_button = "Mulai Jualan";

enTrans.mencari.product_cta_title = "Have digital products?";
enTrans.mencari.product_cta_desc = "Market your digital products and reach more buyers on our platform.";
enTrans.mencari.product_cta_button = "Start Selling";

fs.writeFileSync(idFile, JSON.stringify(idTrans, null, 2));
fs.writeFileSync(enFile, JSON.stringify(enTrans, null, 2));

// 2. Add the card in home/page.tsx
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

const targetStr = `                <button onClick={() => router.push(\`/\${locale}/community?create=true\`)} className="w-full sm:w-auto whitespace-nowrap bg-white text-indigo-600 hover:bg-indigo-700 hover:text-white font-bold text-[14px] py-2.5 px-6 rounded-lg transition-colors shadow-sm">
                      {t("mencari.community_cta_button")}
                    </button>
                  </div>
                </div>
              </div>`;

// Wait, the Community CTA in the *sidebar* doesn't have sm:w-auto, it's vertical!
// Let me look up the actual vertical Community CTA structure.
const verticalTarget = `                <button onClick={() => router.push(\`/\${locale}/community?create=true\`)} className="w-full mt-1 whitespace-nowrap bg-white text-indigo-600 hover:bg-indigo-700 hover:text-white font-bold text-[14px] py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                  {t("mencari.community_cta_button")}
                </button>
              </div>
            </div>`;

const newProductCta = `
            {/* Sell Product CTA Card */}
            <div className="bg-gradient-to-br from-orange-700 to-orange-900 rounded-xl overflow-hidden shadow-sm p-4 text-white relative mt-4">
              {/* Decorative circles */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
              <div className="absolute right-12 -top-2 w-8 h-8 bg-white opacity-10 rounded-full"></div>

              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[15px] leading-snug m-0">
                    {t("mencari.product_cta_title")}
                  </h3>
                </div>
                <p className="text-[13px] text-orange-50 leading-relaxed opacity-90 m-0">
                  {t("mencari.product_cta_desc")}
                </p>
                <button onClick={() => router.push(\`/\${locale}/product?create=true\`)} className="w-full mt-1 whitespace-nowrap bg-white text-orange-700 hover:bg-orange-800 hover:text-white font-bold text-[14px] py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                  {t("mencari.product_cta_button")}
                </button>
              </div>
            </div>`;

if (code.includes(verticalTarget)) {
    code = code.replace(verticalTarget, verticalTarget + newProductCta);
} else {
    // try removing crlf differences
    const normCode = code.replace(/\r\n/g, '\n');
    const normTarget = verticalTarget.replace(/\r\n/g, '\n');
    if (normCode.includes(normTarget)) {
        code = normCode.replace(normTarget, normTarget + newProductCta);
    } else {
        console.log("Could not find Community CTA target.");
    }
}

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Added product CTA.');
