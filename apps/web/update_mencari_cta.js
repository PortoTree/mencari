const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

// 1. Sidebar Website CTA Background
code = code.replace(
  'bg-gradient-to-br from-emerald-700 to-emerald-950 rounded-xl shadow-sm border border-transparent overflow-hidden p-4 text-white relative',
  'bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-xl shadow-sm border border-transparent overflow-hidden p-4 text-white relative'
);

// 2. Sidebar Community CTA Background
code = code.replace(
  'bg-gradient-to-br from-blue-800 to-blue-950 rounded-xl overflow-hidden shadow-sm p-4 text-white relative mt-4',
  'bg-gradient-to-br from-blue-900 to-slate-950 rounded-xl overflow-hidden shadow-sm p-4 text-white relative mt-4'
);

// 3. /mencari tab Website CTA
const oldMencariClass = 'bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm border border-transparent overflow-hidden p-5 sm:p-6 text-white relative';
const newMencariClass = 'bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-xl shadow-sm border border-transparent overflow-hidden p-5 sm:p-6 text-white relative';
code = code.replace(oldMencariClass, newMencariClass);

// 4. /mencari tab Website CTA Icon
let iconBlockSearch = `<div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
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
                    </div>`;
let iconBlockReplace = `<div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                      <img src="/visit.png" alt="Website" className="w-7 h-7 object-contain" />
                    </div>`;

// Replace normal and CRLF
code = code.replace(iconBlockSearch, iconBlockReplace);
code = code.replace(iconBlockSearch.replace(/\n/g, '\r\n'), iconBlockReplace);

// 5. Add Community CTA to /mencari feed
const targetStr = `                  <div className="w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                    <button onClick={() => router.push(\`/\${locale}/page\`)} className="w-full sm:w-auto whitespace-nowrap bg-white text-emerald-600 hover:bg-emerald-700 hover:text-white font-bold text-[14px] py-2.5 px-6 rounded-lg transition-colors shadow-sm">
                      {t("mencari.cta_button")}
                    </button>
                  </div>
                </div>
              </div>`;

const newCtaHtml = `
              <div className="w-full max-w-[600px] mx-auto mt-4 bg-gradient-to-br from-blue-900 to-slate-950 rounded-xl shadow-sm border border-transparent overflow-hidden p-5 sm:p-6 text-white relative">
                {/* Decorative circles */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                <div className="absolute right-12 -top-2 w-8 h-8 bg-white opacity-10 rounded-full"></div>

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                      <img src="/navigasi/komunitas-aktif.svg" alt="Community" className="w-7 h-7 object-contain brightness-0 invert" />
                    </div>
                    <div className="flex flex-col text-left">
                      <h3 className="font-bold text-[17px] mb-1 leading-snug">
                        {t("mencari.community_cta_title")}
                      </h3>
                      <p className="text-[13px] text-indigo-50 leading-relaxed opacity-90 m-0">
                        {t("mencari.community_cta_desc")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                    <button onClick={() => router.push(\`/\${locale}/community?create=true\`)} className="w-full sm:w-auto whitespace-nowrap bg-white text-indigo-600 hover:bg-indigo-700 hover:text-white font-bold text-[14px] py-2.5 px-6 rounded-lg transition-colors shadow-sm">
                      {t("mencari.community_cta_button")}
                    </button>
                  </div>
                </div>
              </div>`;

code = code.replace(targetStr, targetStr + newCtaHtml);

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('/mencari CTAs updated successfully.');
