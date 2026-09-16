const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Replace emoji flags with SVG flags
const idEmoji = '<span className="text-[16px]">🇮🇩</span>';
const enEmoji = '<span className="text-[16px]">🇺🇸</span>';

const idSvg = `<svg className="w-[18px] h-[18px] rounded-sm shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ED2939" d="M0 0h36v18H0z"/>
                    <path fill="#fff" d="M0 18h36v18H0z"/>
                  </svg>`;

const enSvg = `<svg className="w-[18px] h-[18px] rounded-sm shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.2)]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#0A3161" d="M0 0h36v36H0z"/>
                    <path fill="#B31942" d="M0 4.5h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z"/>
                    <path fill="#fff" d="M0 9h36v4.5H0zm0 9h36v4.5H0zm0 9h36v4.5H0z"/>
                    <path fill="#0A3161" d="M0 0h18v18H0z"/>
                    <path fill="#fff" d="M3 3h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 7h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM3 11h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
                  </svg>`;

if (file.includes(idEmoji)) {
  file = file.replace(idEmoji, idSvg);
  console.log('✅ Replaced ID emoji with SVG');
}
if (file.includes(enEmoji)) {
  file = file.replace(enEmoji, enSvg);
  console.log('✅ Replaced EN emoji with SVG');
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Done replacing flags');
