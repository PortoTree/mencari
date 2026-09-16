const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const idSvg = `<svg className="w-4 h-4 rounded-sm shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ED2939" d="M0 0h36v18H0z"/>
                    <path fill="#fff" d="M0 18h36v18H0z"/>
                  </svg>`;

const enSvg = `<svg className="w-4 h-4 rounded-sm shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#0A3161" d="M0 0h36v36H0z"/>
                    <path fill="#B31942" d="M0 4.5h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z"/>
                    <path fill="#fff" d="M0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z"/>
                    <path fill="#0A3161" d="M0 0h18v18H0z"/>
                    <path fill="#fff" d="M3 3h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 7h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 11h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
                  </svg>`;

const dynamicSvg = `{locale === 'id' ? (
                ${idSvg}
              ) : (
                ${enSvg}
              )}`;

const oldSvg = '<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>';

if (file.includes(oldSvg)) {
  file = file.replace(oldSvg, dynamicSvg);
  console.log('✅ Replaced icon with dynamic flag');
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
} else {
  console.log('⚠️ oldSvg not found');
}
