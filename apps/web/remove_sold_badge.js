const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const badgeStr = '<span className="text-[10px] sm:text-[11px] text-gray-400 dark:text-[#B0B3B8] bg-gray-50 dark:bg-[#18191A] px-1.5 py-0.5 rounded">{t("product.sold")} 12</span>';

if (code.includes(badgeStr)) {
  code = code.replace(badgeStr, '');
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully removed the [sold] badge');
} else {
  console.log('Badge string not found');
}
