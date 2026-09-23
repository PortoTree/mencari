const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

const startTag = '<div className="space-y-5">';
const endTag = '              <div className="pt-2">';

const startIdx = code.indexOf(startTag);
const endIdx = code.indexOf(endTag);

if (startIdx !== -1 && endIdx !== -1) {
  const newFormBlock = `<div className="space-y-5">
              {type === "website" && (
                <div>
                  <label className="block text-[14px] font-bold text-gray-700 dark:text-[#E4E6EB] mb-1.5">
                    {t("register.url_label")} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://toko-anda.com" 
                    className="w-full bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-[#4E4F50] rounded-lg px-4 py-2.5 text-[15px] text-black dark:text-[#E4E6EB] focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>
              )}

              <div>
                <label className="flex items-center gap-1.5 text-[14px] font-bold text-gray-700 dark:text-[#E4E6EB] mb-1.5">
                  {t("register.name_label")} <span className="text-red-500">*</span>
                  <div className="relative group/info flex items-center">
                    <svg className="w-4 h-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[220px] bg-black/80 text-white text-[12px] p-2 rounded-lg opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-10 text-center font-normal leading-relaxed">
                      {t("register.name_tooltip")}
                    </div>
                  </div>
                </label>
                <input 
                  type="text" 
                  placeholder={t("register.name_placeholder")} 
                  className="w-full bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-[#4E4F50] rounded-lg px-4 py-2.5 text-[15px] text-black dark:text-[#E4E6EB] focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              {type === "profile" && (
                <>
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 dark:text-[#E4E6EB] mb-1.5">
                      {t("register.slug_label")} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-200 dark:border-[#4E4F50] bg-gray-100 dark:bg-[#242526] text-gray-500 dark:text-[#B0B3B8] text-[15px] font-medium">
                        mencari.online/
                      </span>
                      <input 
                        type="text" 
                        value={slug}
                        onChange={handleSlugChange}
                        placeholder="tokobudi" 
                        className="flex-1 min-w-0 bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-[#4E4F50] rounded-r-lg px-4 py-2.5 text-[15px] text-black dark:text-[#E4E6EB] focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      />
                    </div>
                    <p className="mt-1.5 text-[12px] text-gray-500 dark:text-[#B0B3B8]">
                      {t("register.slug_desc")}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 dark:text-[#E4E6EB] mb-1.5">
                      {t("register.desc_label")}
                    </label>
                    <textarea 
                      rows={3}
                      placeholder={t("register.desc_placeholder")} 
                      className="w-full bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-[#4E4F50] rounded-lg px-4 py-2.5 text-[15px] text-black dark:text-[#E4E6EB] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[14px] font-bold text-gray-700 dark:text-[#E4E6EB] mb-1.5">
                    {t("register.logo_label")}
                  </label>
                  <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-[#4E4F50] flex flex-col items-center justify-center text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-50 dark:hover:bg-[#3A3B3C] hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer relative overflow-hidden group">
                     <svg className="w-7 h-7 mb-1 text-gray-400 dark:text-gray-500 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                     <span className="text-[11px] font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Upload</span>
                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-bold text-gray-700 dark:text-[#E4E6EB] mb-1.5">
                    {t("register.media_url_label")}
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://..." 
                    className="w-full bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-[#4E4F50] rounded-lg px-4 py-2.5 text-[15px] text-black dark:text-[#E4E6EB] focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>
              </div>\n\n`;

  const newCode = code.substring(0, startIdx) + newFormBlock + code.substring(endIdx);
  fs.writeFileSync('src/app/[locale]/page/page.tsx', newCode);
  console.log('Successfully updated form structure');
} else {
  console.log('Could not find start/end tags');
}
