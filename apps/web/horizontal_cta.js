const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const match = code.match(/\{\/\* Moved CTA Block \*\/\}\s*<div className=\"w-full max-w-\[320px\] mx-auto mt-6 bg-gradient-to-br from-emerald-500[\s\S]*?<\/button>\s*<\/div>\s*<\/div>/);

if (match) {
  let ctaContent = match[0];
  
  // Transform to horizontal layout
  const newCtaContent = `              {/* Moved CTA Block */}
              <div className="w-full max-w-[600px] mx-auto mt-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm border border-transparent overflow-hidden p-5 sm:p-6 text-white relative">
                {/* Decorative circles */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                <div className="absolute right-12 -top-2 w-8 h-8 bg-white opacity-10 rounded-full"></div>

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <h3 className="font-bold text-[17px] mb-1 leading-snug">
                        {t("mencari.cta_title")}
                      </h3>
                      <p className="text-[13px] text-emerald-50 leading-relaxed opacity-90 m-0">
                        {t("mencari.cta_desc")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                    <button className="w-full sm:w-auto whitespace-nowrap bg-white text-emerald-600 hover:bg-emerald-700 hover:text-white font-bold text-[14px] py-2.5 px-6 rounded-lg transition-colors shadow-sm">
                      {t("mencari.cta_button")}
                    </button>
                  </div>
                </div>
              </div>`;

  code = code.replace(ctaContent, newCtaContent);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully updated CTA to horizontal layout');
} else {
  console.log('CTA block not found');
}
