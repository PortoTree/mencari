const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /<input\s+type="text"\s+placeholder="Pencarian\.\.\."[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/m;
const match = code.match(regex);
if (match) {
  console.log(match[0]);
} else {
  console.log('Not found');
}
