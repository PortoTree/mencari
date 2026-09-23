const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

// 1. Update Website CTA
let targetClass = 'bg-emerald-500 rounded-xl shadow-sm border border-transparent overflow-hidden p-4 text-white relative';
let newClass = 'bg-emerald-800 rounded-xl shadow-sm border border-transparent overflow-hidden p-4 text-white relative';

code = code.replace(targetClass, newClass);

// Replace icon
let oldIcon = `<div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  </div>`;
let newIcon = `<div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                    <img src="/visit.png" alt="Website" className="w-6 h-6 object-contain" />
                  </div>`;
code = code.replace(oldIcon, newIcon);
// Handle Windows CRLF just in case
let oldIconCRLF = oldIcon.replace(/\n/g, '\r\n');
code = code.replace(oldIconCRLF, newIcon);

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Website CTA updated successfully.');
