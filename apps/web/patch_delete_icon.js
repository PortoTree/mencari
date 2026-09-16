const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldCode = `{["translate - Google Search", "portotree", "eraser bg", "png to svg", "compress foto", "compress video", "upscale image"].map((text, i) => (
                          <div key={i} className="px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer flex items-center gap-3 transition-colors shrink-0">
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-[15px] text-black dark:text-[#E4E6EB]">{text}</span>
                          </div>
                        ))}`;

const newCode = `{["translate - Google Search", "portotree", "eraser bg", "png to svg", "compress foto", "compress video", "upscale image"].map((text, i) => (
                          <div key={i} className="px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer flex items-center justify-between group transition-colors shrink-0">
                            <div className="flex items-center gap-3">
                              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              <span className="text-[15px] text-black dark:text-[#E4E6EB]">{text}</span>
                            </div>
                            <div 
                              className="hidden group-hover:flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-gray-400 hover:text-gray-600 dark:hover:text-[#E4E6EB] transition-colors"
                              onClick={(e) => { e.stopPropagation(); console.log('Hapus riwayat:', text); }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </div>
                          </div>
                        ))}`;

file = file.split(oldCode).join(newCode);
file = file.split(oldCode.replace(/\n/g, '\r\n')).join(newCode.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added hover delete icon to history items');
