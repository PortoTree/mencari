const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const originalBlock = `{Array.from({ length: 11 }).map((_, i) => (
                  <div key={i} className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col group">
                    <div className="aspect-square bg-gray-100 dark:bg-[#3A3B3C] w-full flex items-center justify-center relative overflow-hidden">
                      <svg className="w-10 h-10 text-gray-300 dark:text-[#4E4F50] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{t("product.badge_new")}</div>
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className="font-semibold text-[13px] sm:text-[14px] text-black dark:text-[#E4E6EB] line-clamp-2 leading-tight flex-1">Template Website Profesional {i + 1}</h3>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold text-emerald-500 text-[13px] sm:text-[14px]">Rp 150.000</span>
                        
                      </div>
                    </div>
                  </div>
                ))}`;

const newBlock = `{Array.from({ length: 11 }).map((_, i) => (
                  <div key={i} className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col group">
                    <div className="aspect-square bg-gray-100 dark:bg-[#3A3B3C] w-full flex items-center justify-center relative overflow-hidden">
                      <svg className="w-10 h-10 text-gray-300 dark:text-[#4E4F50] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-[#4E4F50] overflow-hidden shrink-0 flex items-center justify-center">
                           <img src="/default-avatar.svg" alt="Store" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        </div>
                        <span className="text-[12px] font-medium text-gray-500 dark:text-[#B0B3B8] truncate">Toko Digital Kreatif {i + 1}</span>
                      </div>
                      <h3 className="font-semibold text-[13px] sm:text-[14px] text-black dark:text-[#E4E6EB] line-clamp-2 leading-tight flex-1">Template Website Profesional {i + 1}</h3>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold text-emerald-500 text-[13px] sm:text-[14px]">Rp 150.000</span>
                      </div>
                    </div>
                  </div>
                ))}`;

if (code.includes(originalBlock)) {
  code = code.replace(originalBlock, newBlock);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully updated dummy card with replace!');
} else {
  console.log('Could not find exact original block');
}
