const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldCode = `{/* Expanded Dropdown Content */}
                  {isSearchExpanded && (
                    <div className="w-full border-t border-gray-100 dark:border-[#3E4042] pt-2 mt-1 flex flex-col">
                      <div className="px-4 py-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer flex items-center gap-3 transition-colors">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-[15px] text-black dark:text-[#E4E6EB]">translate - Google Search</span>
                      </div>
                      <div className="px-4 py-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer flex items-center gap-3 transition-colors">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-[15px] text-black dark:text-[#E4E6EB]">compress foto</span>
                      </div>
                      <div className="px-4 py-2 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer flex items-center gap-3 transition-colors">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-[15px] text-black dark:text-[#E4E6EB]">png to svg</span>
                      </div>
                    </div>
                  )}`;

const newCode = `{/* Expanded Dropdown Content */}
                  {isSearchExpanded && (
                    <div className="w-full border-t border-gray-100 dark:border-[#3E4042] pt-2 mt-1">
                      <div className="flex flex-col w-full max-h-[195px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[#4E4F50] [&::-webkit-scrollbar-thumb]:rounded-full">
                        {["translate - Google Search", "portotree", "eraser bg", "png to svg", "compress foto", "compress video", "upscale image"].map((text, i) => (
                          <div key={i} className="px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer flex items-center gap-3 transition-colors shrink-0">
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-[15px] text-black dark:text-[#E4E6EB]">{text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}`;

file = file.split(oldCode).join(newCode);
file = file.split(oldCode.replace(/\n/g, '\r\n')).join(newCode.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated dropdown to map 7 items and scroll');
