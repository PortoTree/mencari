const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldItem1 = `              {/* Item History Web 1 */}
              <div className="flex items-center gap-3 p-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3E4042] flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="https://www.google.com/s2/favicons?domain=google.com&sz=64" alt="github.com" className="w-4 h-4 object-contain" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="text-[13.5px] font-medium text-black dark:text-[#E4E6EB] truncate">Google</span>
                  <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] truncate">github.com</span>
                </div>
              </div>`;

const newItem1 = `              {/* Item History Web 1 */}
              <div className="flex items-center gap-3 p-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3E4042] flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="https://www.google.com/s2/favicons?domain=google.com&sz=64" alt="google.com" className="w-4 h-4 object-contain" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="text-[13.5px] font-medium text-black dark:text-[#E4E6EB] truncate">Google</span>
                  <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] truncate">google.com</span>
                </div>
              </div>`;

const oldItem2 = `              {/* Item History Web 2 */}
              <div className="flex items-center gap-3 p-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3E4042] flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="https://www.google.com/s2/favicons?domain=stackoverflow.com&sz=64" alt="vercel.com" className="w-4 h-4 object-contain" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="text-[13.5px] font-medium text-black dark:text-[#E4E6EB] truncate">Stack Overflow - Where Developers Learn, Share, & Build Careers</span>
                  <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] truncate">vercel.com</span>
                </div>
              </div>`;

const newItem2 = `              {/* Item History Web 2 */}
              <div className="flex items-center gap-3 p-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3E4042] flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="https://www.google.com/s2/favicons?domain=stackoverflow.com&sz=64" alt="stackoverflow.com" className="w-4 h-4 object-contain" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="text-[13.5px] font-medium text-black dark:text-[#E4E6EB] truncate">Stack Overflow - Where Developers Learn, Share, & Build Careers</span>
                  <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] truncate">stackoverflow.com</span>
                </div>
              </div>`;

file = file.split(oldItem1).join(newItem1);
file = file.split(oldItem1.replace(/\n/g, '\r\n')).join(newItem1.replace(/\n/g, '\r\n'));

file = file.split(oldItem2).join(newItem2);
file = file.split(oldItem2.replace(/\n/g, '\r\n')).join(newItem2.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed ALL text domains');
