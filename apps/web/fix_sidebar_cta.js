const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const badCode = `              <div className="relative z-10 flex flex-col 2xl:flex-row items-start 2xl:items-center gap-4 justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className="font-bold text-[15px] mb-1 leading-snug">
                      {t("mencari.cta_title")}
                    </h3>
                    <p className="text-[12px] text-emerald-50 leading-relaxed opacity-90 m-0">
                      {t("mencari.cta_desc")}
                    </p>
                  </div>
                </div>
                
                <div className="w-full 2xl:w-auto shrink-0 mt-2 2xl:mt-0">
                  <button className="w-full 2xl:w-auto whitespace-nowrap bg-white text-emerald-600 hover:bg-emerald-700 hover:text-white font-bold text-[13px] py-2 px-4 rounded-lg transition-colors shadow-sm">
                    {t("mencari.cta_button")}
                  </button>
                </div>
              </div>`;

const goodCode = `              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  </div>
                  <h3 className="font-bold text-[15px] leading-snug m-0">
                    {t("mencari.cta_title")}
                  </h3>
                </div>
                <p className="text-[13px] text-emerald-50 leading-relaxed opacity-90 m-0">
                  {t("mencari.cta_desc")}
                </p>
                <button className="w-full mt-1 whitespace-nowrap bg-white text-emerald-600 hover:bg-emerald-700 hover:text-white font-bold text-[14px] py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                  {t("mencari.cta_button")}
                </button>
              </div>`;

if (code.includes(badCode)) {
  code = code.replace(badCode, goodCode);
} else {
  // Try line by line or fallback
  const normalizedCode = code.replace(/\r\n/g, '\n');
  const normalizedBad = badCode.replace(/\r\n/g, '\n');
  if (normalizedCode.includes(normalizedBad)) {
    code = normalizedCode.replace(normalizedBad, goodCode);
  } else {
    console.log('Failed to match exactly, attempting regex replace...');
    const regex = /<div className="relative z-10 flex flex-col 2xl:flex-row[\s\S]*?<\/button>\s*<\/div>\s*<\/div>/;
    code = code.replace(regex, goodCode);
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Successfully fixed squished sidebar CTA layout');
