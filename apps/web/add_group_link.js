const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const grupBlockOld = `                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
                  <div
                    className="w-6 h-6 bg-current text-green-500"
                    style={{
                      WebkitMask:
                        "url(/navigasi/grub.svg) center/contain no-repeat",
                      mask: "url(/navigasi/grub.svg) center/contain no-repeat",
                    }}
                  />
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("tabs.groups")}
                  </span>
                </button>`;

const grupBlockNew = `                <button
                  onClick={() => {
                    setActiveTab("group");
                    window.history.pushState(null, "", \`/\${locale}/group\`);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"
                >
                  <div
                    className="w-6 h-6 bg-current text-green-500"
                    style={{
                      WebkitMask:
                        "url(/navigasi/grub.svg) center/contain no-repeat",
                      mask: "url(/navigasi/grub.svg) center/contain no-repeat",
                    }}
                  />
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("tabs.groups")}
                  </span>
                </button>`;

// Some CRLF vs LF stuff might occur, let's normalize
const normalizedCode = code.replace(/\r\n/g, '\n');

if (normalizedCode.includes(grupBlockOld)) {
  code = normalizedCode.replace(grupBlockOld, grupBlockNew);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully added onClick to Grup menu.');
} else {
  console.log('Block not found. Looking with regex...');
  const grupBlockRegex = /<button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-\[#3A3B3C\] transition-colors">\s*<div\s*className="w-6 h-6 bg-current text-green-500"\s*style=\{\{[\s\S]*?\}\}\s*\/>\s*<span className="font-semibold text-\[15px\] text-black dark:text-\[#E4E6EB\]">\s*\{t\("tabs.groups"\)\}\s*<\/span>\s*<\/button>/;
  
  if (grupBlockRegex.test(normalizedCode)) {
    code = normalizedCode.replace(grupBlockRegex, grupBlockNew);
    fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
    console.log('Successfully added onClick to Grup menu (regex fallback).');
  } else {
    console.log('Still not found.');
  }
}
