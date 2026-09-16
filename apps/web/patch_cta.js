const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldBookmarksBlock = `              <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden p-2 space-y-1">
                <div className="px-2 py-2 mb-1">
                  <h3 className="font-bold text-[16px] text-black dark:text-[#E4E6EB]">Bookmarks</h3>
                </div>
                {[
                  { title: "React Docs", url: "reactjs.org" },
                  { title: "Next.js", url: "nextjs.org" },
                  { title: "Tailwind", url: "tailwindcss.com" },
                  { title: "GitHub", url: "github.com" },
                  { title: "Vercel", url: "vercel.com" },
                  { title: "Figma", url: "figma.com" },
                  { title: "MDN Web Docs", url: "developer.mozilla.org" },
                  { title: "Stack Overflow", url: "stackoverflow.com" },
                  { title: "NPM", url: "npmjs.com" },
                  { title: "TypeScript", url: "typescriptlang.org" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">
                    <div className="w-6 h-6 rounded bg-gray-100 dark:bg-[#3A3B3C] flex items-center justify-center shrink-0 overflow-hidden">
                      <img src={\`https://www.google.com/s2/favicons?domain=\${item.url}&sz=64\`} alt={item.title} className="w-4 h-4 object-contain" />
                    </div>
                    <span className="text-[14px] font-medium text-black dark:text-[#E4E6EB] flex-1 truncate">{item.title}</span>
                  </div>
                ))}
              </div>`;

const newCtaBlock = `              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm border border-transparent overflow-hidden p-5 text-white relative">
                {/* Decorative circles */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                <div className="absolute right-12 -top-2 w-8 h-8 bg-white opacity-10 rounded-full"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  </div>
                  <h3 className="font-bold text-[17px] mb-2 leading-snug">Website kamu belum ada di pencarian kami?</h3>
                  <p className="text-[13px] text-emerald-50 mb-4 leading-relaxed opacity-90">
                    Jadikan website, portofolio, atau tokomu mudah ditemukan oleh ribuan pengguna seperti di mesin pencari Google.
                  </p>
                  <button className="w-full bg-white text-emerald-600 hover:bg-gray-50 font-bold text-[14px] py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                    Daftarkan Situs Web
                  </button>
                </div>
              </div>`;

file = file.split(oldBookmarksBlock).join(newCtaBlock);
file = file.split(oldBookmarksBlock.replace(/\n/g, '\r\n')).join(newCtaBlock.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Replaced Bookmarks with CTA');
