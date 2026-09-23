const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

const navWebpageIdx = code.indexOf('{t("nav.webpage")}');
const startSvg = code.lastIndexOf('<svg', navWebpageIdx);
const endSvg = code.indexOf('</svg>', startSvg) + 6;

if (startSvg !== -1 && endSvg !== -1 && startSvg < navWebpageIdx) {
    const svgCode = code.substring(startSvg, endSvg);
    const newIcon = '<img src="/visit.png" alt="Your Page" className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-200 dark:border-gray-700" />';
    code = code.substring(0, startSvg) + newIcon + code.substring(endSvg);
    fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
    console.log('Replaced nav.webpage icon.');
} else {
    console.log('Could not find SVG for nav.webpage.');
}
