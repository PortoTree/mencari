const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /<svg className=\"w-5 h-5 text-gray-500 dark:text-\[\#B0B3B8\]\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\{2\} d=\"M8 12h\.01M12 12h\.01M16 12h\.01M21 12c0 4\.418-4\.03 8-9 8a9\.863 9\.863 0 01-4\.255-\.949L3 20l1\.395-3\.72C3\.512 15\.042 3 13\.574 3 12c0-4\.418 4\.03-8 9-8s9 3\.582 9 8z\" \/><\/svg>(\s*\{t\('chat\.manage'\)\})/g;

const newSVG = `<svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h.01M4 12h.01M4 18h.01M8 6h12M8 12h12M8 18h12" /></svg>`;

if (regex.test(code)) {
  code = code.replace(regex, newSVG + '$1');
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Icon replaced successfully');
} else {
  console.log('Target SVG next to chat.manage not found');
}
