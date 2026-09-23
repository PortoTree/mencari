const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

// 1. Revert /mencari Website CTA color back to original
code = code.replace(
  'bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-xl shadow-sm border border-transparent overflow-hidden p-5 sm:p-6 text-white relative',
  'bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm border border-transparent overflow-hidden p-5 sm:p-6 text-white relative'
);

// 2. Remove the Community CTA from /mencari feed
const communityCtaInMencari = `              <div className="w-full max-w-[600px] mx-auto mt-4 bg-gradient-to-br from-blue-900 to-slate-950 rounded-xl shadow-sm border border-transparent overflow-hidden p-5 sm:p-6 text-white relative">
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
code = code.replace(communityCtaInMencari, '');
// Handle CRLF replacement just in case
code = code.replace(communityCtaInMencari.replace(/\n/g, '\r\n'), '');

// 3. Make sure the Sidebar Website CTA matches the original /mencari CTA color exactly
// Currently it's bg-gradient-to-br from-emerald-700 to-emerald-950 or something
// We will replace whatever it is with from-emerald-500 to-teal-600
// Let's use regex to find the right sidebar Website CTA background. It's the one with `p-4` instead of `p-5 sm:p-6`.
code = code.replace(
  /bg-gradient-to-br from-emerald-\d+ to-emerald-\d+ rounded-xl shadow-sm border border-transparent overflow-hidden p-4 text-white relative/g,
  'bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm border border-transparent overflow-hidden p-4 text-white relative'
);
// Also just in case it was still bg-emerald-800
code = code.replace(
  'bg-emerald-800 rounded-xl shadow-sm border border-transparent overflow-hidden p-4 text-white relative',
  'bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm border border-transparent overflow-hidden p-4 text-white relative'
);

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Fixed requested issues.');
