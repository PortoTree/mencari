const fs = require('fs');

// 1. Translations
const idFile = 'messages/id.json';
const enFile = 'messages/en.json';
let idTrans = JSON.parse(fs.readFileSync(idFile, 'utf8'));
let enTrans = JSON.parse(fs.readFileSync(enFile, 'utf8'));

idTrans.mencari.community_cta_title = "Ingin membangun komunitas Anda sendiri?";
idTrans.mencari.community_cta_desc = "Buat grup sekarang dan kumpulkan orang-orang dengan minat yang sama untuk saling berbagi.";
idTrans.mencari.community_cta_button = "Buat komunitas";

enTrans.mencari.community_cta_title = "Want to build your own community?";
enTrans.mencari.community_cta_desc = "Create a group now and gather people with similar interests to share and connect.";
enTrans.mencari.community_cta_button = "Create community";

fs.writeFileSync(idFile, JSON.stringify(idTrans, null, 2));
fs.writeFileSync(enFile, JSON.stringify(enTrans, null, 2));

// 2. Add the card
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const targetStr = `                <button onClick={() => router.push(\`/\${locale}/page\`)} className="w-full mt-1 whitespace-nowrap bg-white text-emerald-600 hover:bg-emerald-700 hover:text-white font-bold text-[14px] py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                  {t("mencari.cta_button")}
                </button>
              </div>
            </div>`;

const newCardStr = `
            {/* Create Community CTA Card */}
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl overflow-hidden shadow-sm p-4 text-white relative mt-4">
              {/* Decorative circles */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
              <div className="absolute right-12 -top-2 w-8 h-8 bg-white opacity-10 rounded-full"></div>

              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <h3 className="font-bold text-[15px] leading-snug m-0">
                    {t("mencari.community_cta_title")}
                  </h3>
                </div>
                <p className="text-[13px] text-indigo-50 leading-relaxed opacity-90 m-0">
                  {t("mencari.community_cta_desc")}
                </p>
                <button onClick={() => router.push(\`/\${locale}/group?create=true\`)} className="w-full mt-1 whitespace-nowrap bg-white text-indigo-600 hover:bg-indigo-700 hover:text-white font-bold text-[14px] py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                  {t("mencari.community_cta_button")}
                </button>
              </div>
            </div>`;

code = code.replace(targetStr, targetStr + newCardStr);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Added community CTA card.');
