const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Refactor History list
const oldHistoryBlock = `            <div className="space-y-1">
              {/* Item History Web 1 */}
              <div className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3E4042] flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="https://www.google.com/s2/favicons?domain=google.com&sz=64" alt="google.com" className="w-4 h-4 object-contain" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="text-[13.5px] font-medium text-black dark:text-[#E4E6EB] truncate">Google</span>
                  <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] truncate">google.com</span>
                </div>
              </div>
              
              {/* Item History Web 2 */}
              <div className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3E4042] flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="https://www.google.com/s2/favicons?domain=stackoverflow.com&sz=64" alt="stackoverflow.com" className="w-4 h-4 object-contain" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="text-[13.5px] font-medium text-black dark:text-[#E4E6EB] truncate">Stack Overflow - Where Developers Learn, Share, & Build Careers</span>
                  <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] truncate">stackoverflow.com</span>
                </div>
              </div>
            </div>`;

const newHistoryBlock = `            <div className="space-y-1">
              {[
                { title: "Google", url: "google.com" },
                { title: "Stack Overflow - Where Developers Learn, Share, & Build Careers", url: "stackoverflow.com" },
                { title: "GitHub: Let's build from here", url: "github.com" },
                { title: "Next.js by Vercel - The React Framework", url: "nextjs.org" },
                { title: "Tailwind CSS - Rapidly build modern websites", url: "tailwindcss.com" },
                { title: "MDN Web Docs", url: "developer.mozilla.org" },
                { title: "YouTube", url: "youtube.com" },
                { title: "Reddit - Dive into anything", url: "reddit.com" },
                { title: "Figma: The Collaborative Interface Design Tool", url: "figma.com" },
                { title: "Vercel: Develop. Preview. Ship.", url: "vercel.com" },
                { title: "React – A JavaScript library for building user interfaces", url: "reactjs.org" },
                { title: "OpenAI", url: "openai.com" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3E4042] flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={\`https://www.google.com/s2/favicons?domain=\${item.url}&sz=64\`} alt={item.url} className="w-4 h-4 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <span className="text-[13.5px] font-medium text-black dark:text-[#E4E6EB] truncate">{item.title}</span>
                    <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] truncate">{item.url}</span>
                  </div>
                </div>
              ))}
            </div>`;

file = file.split(oldHistoryBlock).join(newHistoryBlock);
file = file.split(oldHistoryBlock.replace(/\n/g, '\r\n')).join(newHistoryBlock.replace(/\n/g, '\r\n'));


// 2. Refactor Friend list
const oldFriendArray = `["Budi Santoso", "Siti Aminah", "Agus Pratama", "Dewi Lestari", "Rudi Hermawan", "Rina Marlina", "Andi Wijaya"]`;
const newFriendArray = `["Budi Santoso", "Siti Aminah", "Agus Pratama", "Dewi Lestari", "Rudi Hermawan", "Rina Marlina", "Andi Wijaya", "Bagas Pangestu", "Citra Kirana", "Dian Sastro", "Eko Patrio", "Fahri Hamzah", "Gita Gutawa", "Hasan Basri", "Intan Nuraini", "Joko Anwar", "Kaesang Pangarep", "Luna Maya"]`;

file = file.split(oldFriendArray).join(newFriendArray);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added more dummy items to both lists');
