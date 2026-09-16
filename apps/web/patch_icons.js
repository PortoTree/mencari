const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const target = `<div className="flex items-center gap-3 shrink-0 mr-1">
                  <svg className="w-5 h-5 text-blue-500 cursor-pointer" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3zm5-3a1 1 0 0 1 2 0 7 7 0 0 1-14 0 1 1 0 0 1 2 0 5 5 0 0 0 10 0zm-6 8v3h2v-3h-2z"/></svg>
                  <svg className="w-5 h-5 text-gray-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>`;

file = file.split(target).join('');
file = file.split(target.replace(/\n/g, '\r\n')).join('');

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Removed microphone and camera icons from search bar');
