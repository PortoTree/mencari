const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file
    .replace(
        '<a href="https://portotree.com" target="_blank" rel="noopener noreferrer" className="block shadow-sm hover:shadow-md transition-shadow cursor-pointer">\n                <img src="/ads/portotree-cv.png"',
        '<a href="https://resume.portotree.com" target="_blank" rel="noopener noreferrer" className="block shadow-sm hover:shadow-md transition-shadow cursor-pointer">\n                <img src="/ads/portotree-cv.png"'
    )
    .replace(
        '<a href="https://portotree.com" target="_blank" rel="noopener noreferrer" className="block shadow-sm hover:shadow-md transition-shadow cursor-pointer">\n                <img src="/ads/portotree-surat.png"',
        '<a href="https://surat.portotree.com" target="_blank" rel="noopener noreferrer" className="block shadow-sm hover:shadow-md transition-shadow cursor-pointer">\n                <img src="/ads/portotree-surat.png"'
    )
    .replace(
        '<a href="https://portotree.com" target="_blank" rel="noopener noreferrer" className="block shadow-sm hover:shadow-md transition-shadow cursor-pointer">\n                <img src="/ads/portotree-portofolio.png"',
        '<a href="https://portofolio.portotree.com" target="_blank" rel="noopener noreferrer" className="block shadow-sm hover:shadow-md transition-shadow cursor-pointer">\n                <img src="/ads/portotree-portofolio.png"'
    );

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated ads links');
