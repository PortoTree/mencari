const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldCode = `<div
                        className="w-5 h-5 bg-emerald-600 dark:bg-emerald-400 group-hover/visit:scale-110 transition-transform"
                        style={{
                          WebkitMask: \`url(/navigasi/visit.svg) center/contain no-repeat\`,
                          mask: \`url(/navigasi/visit.svg) center/contain no-repeat\`,
                        }}
                      />`;

const newCode = `<img
                        src="/visit.png"
                        alt="Visit"
                        className="w-5 h-5 object-contain group-hover/visit:scale-110 transition-transform"
                      />`;

const normalizedCode = code.replace(/\r\n/g, '\n');
const normalizedOld = oldCode.replace(/\r\n/g, '\n');

if (normalizedCode.includes(normalizedOld)) {
  code = normalizedCode.replace(normalizedOld, newCode);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully updated to visit.png');
} else {
  console.log('Could not find exact block, using regex...');
  const regex = /<div\s*className="w-5 h-5 bg-emerald-600 dark:bg-emerald-400 group-hover\/visit:scale-110 transition-transform"\s*style=\{\{[\s\S]*?\}\}\s*\/>/m;
  code = normalizedCode.replace(regex, newCode);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Regex update complete.');
}
