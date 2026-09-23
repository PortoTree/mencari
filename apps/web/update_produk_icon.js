const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

const oldImg = '<img src="/navigasi/produk.svg" alt="Produk" className="w-6 h-6 object-contain dark:brightness-200" />';
const newMask = `<div
                    className="w-6 h-6 bg-current text-[#8B4513] dark:text-[#CD853F]"
                    style={{
                      WebkitMask: "url(/navigasi/produk-aktif.svg) center/contain no-repeat",
                      mask: "url(/navigasi/produk-aktif.svg) center/contain no-repeat",
                    }}
                  />`;

if (code.includes(oldImg)) {
    code = code.replace(oldImg, newMask);
} else {
    // try fallback with regex for anything matching nav.webpage block
    const fallbackRegex = /<img src="\/navigasi\/produk\.svg"[^>]*>/;
    code = code.replace(fallbackRegex, newMask);
}

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Updated Produk icon to produk-aktif.svg with brown color.');
