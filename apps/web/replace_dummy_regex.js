const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /<div className="absolute top-2 right-2 bg-emerald-500 text-white text-\[10px\] font-bold px-2 py-0\.5 rounded-full shadow-sm">\{t\("product\.badge_new"\)\}<\/div>/g;
code = code.replace(regex, '');

const regex2 = /<h3 className="font-semibold text-\[13px\] sm:text-\[14px\] text-black dark:text-\[\#E4E6EB\] line-clamp-2 leading-tight flex-1">Template Website Profesional \{i \+ 1\}<\/h3>/g;
code = code.replace(regex2, `                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-[#4E4F50] overflow-hidden shrink-0 flex items-center justify-center">
                           <img src="/default-avatar.svg" alt="Store" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        </div>
                        <span className="text-[12px] font-medium text-gray-500 dark:text-[#B0B3B8] truncate">Toko Digital Kreatif {i + 1}</span>
                      </div>
                      <h3 className="font-semibold text-[13px] sm:text-[14px] text-black dark:text-[#E4E6EB] line-clamp-2 leading-tight flex-1">Template Website Profesional {i + 1}</h3>`);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Successfully updated dummy card with regex!');
