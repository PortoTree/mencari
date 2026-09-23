const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

// 1. Change Halaman kamu to visit.png
const webpageBlockRegex = /<svg[\s\S]*?className=\"w-9 h-9 p-1\.5 rounded-full text-\[\#00B4D8\]\"[\s\S]*?<\/svg>(\s*<span className=\"font-semibold text-\[15px\] text-black dark:text-\[\#E4E6EB\]\">\s*\{t\(\"nav\.webpage\"\)\}\s*<\/span>)/;

const newWebpageIcon = '<img src="/visit.png" alt="Your Page" className="w-9 h-9 p-1.5 object-contain" />$1';

code = code.replace(webpageBlockRegex, newWebpageIcon);

// 2. Change mencari popup icon to icon-apk.png
// The context is near setActiveTab("mencari") inside the search nav popup.
const oldPopupImg = `<img
                          src="/visit.png"
                          alt="Visit"
                          className="w-7 h-7 object-contain group-hover/visit:scale-110 transition-transform"
                        />`;
const newPopupImg = `<img
                          src="/icon-apk.png"
                          alt="Mencari"
                          className="w-7 h-7 object-contain group-hover/visit:scale-110 transition-transform"
                        />`;

// handle both \n and \r\n
let currentCode = code;
code = code.replace(oldPopupImg, newPopupImg);
code = code.replace(oldPopupImg.replace(/\n/g, '\r\n'), newPopupImg);

if (code === currentCode) {
    console.log("Failed to replace popup image.");
} else {
    console.log("Popup image and sidebar icon replaced.");
}

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
