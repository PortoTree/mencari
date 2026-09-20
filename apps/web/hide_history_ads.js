const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Hide the History block
code = code.replace(
  '{/* History Block (Moved from Right) */}\n                <div className="mt-4">',
  '{/* History Block (Moved from Right) */}\n                {/* TODO: Remove hidden when state is ready */}\n                <div className="mt-4 hidden">'
);

// 2. Hide the Right Sidebar for "mencari" tab (containing the 3 ads)
code = code.replace(
  '{activeTab === "mencari" && (\n          <div className="hidden lg:block fixed right-0 top-[56px] w-[280px] xl:w-[320px] overscroll-contain pb-20 p-4 border-l border-gray-100 dark:border-[#3E4042]">',
  '{activeTab === "mencari" && (\n          <div className="hidden">'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Successfully hid History and Ads blocks');
