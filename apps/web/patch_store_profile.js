const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /<p className="text-\[13px\] text-gray-500 dark:text-\[\#B0B3B8\] mt-1 line-clamp-2">(.|\n)*?<span className="truncate">Malang, Jawa Timur<\/span>\r?\n\s*<\/div>/m;

const newHTML = `<div className="mt-1 flex items-center gap-1.5 text-gray-500 dark:text-[#B0B3B8] hover:text-emerald-500 transition-colors cursor-pointer group w-fit">
                      <span className="text-[13px] truncate">mencari.online/toko</span>
                      <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </div>
                    <button className="mt-3.5 w-full py-1.5 bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-black dark:text-[#E4E6EB] font-semibold text-[13.5px] rounded-lg transition-colors">
                      {t("product.manage")}
                    </button>`;

if (regex.test(code)) {
  code = code.replace(regex, newHTML);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully updated store profile card layout');
} else {
  console.log('Failed to match the regex for store profile card text');
}
