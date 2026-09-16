const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldProfileBlock = `{/* Profile Card */}
            <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">
            <div className="h-20 bg-gray-200 dark:bg-[#3A3B3C] w-full relative">
              {/* Profile image overlapping */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[72px] h-[72px] bg-white dark:bg-[#242526] rounded-full p-1 shadow-sm">
                <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                  <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="pt-10 pb-5 text-center">
              <h3 className="font-bold text-[17px] text-black dark:text-[#E4E6EB]">{currentUser.username}</h3>
              <p className="text-[15px] text-gray-500 dark:text-[#B0B3B8] mt-1 hover:underline cursor-pointer">{t('sidebar.viewProfile')}</p>
            </div>
          </div>`;

const newProfileBlock = `{/* Profile Card / Bookmarks Area */}
            {activeTab === 'mencari' ? (
              <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden p-2 space-y-1">
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
              </div>
            ) : (
              <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">
                <div className="h-20 bg-gray-200 dark:bg-[#3A3B3C] w-full relative">
                  {/* Profile image overlapping */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[72px] h-[72px] bg-white dark:bg-[#242526] rounded-full p-1 shadow-sm">
                    <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                      <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="pt-10 pb-5 text-center">
                  <h3 className="font-bold text-[17px] text-black dark:text-[#E4E6EB]">{currentUser.username}</h3>
                  <p className="text-[15px] text-gray-500 dark:text-[#B0B3B8] mt-1 hover:underline cursor-pointer">{t('sidebar.viewProfile')}</p>
                </div>
              </div>
            )}`;

file = file.split(oldProfileBlock).join(newProfileBlock);
file = file.split(oldProfileBlock.replace(/\n/g, '\r\n')).join(newProfileBlock.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated left sidebar profile/bookmarks logic');
