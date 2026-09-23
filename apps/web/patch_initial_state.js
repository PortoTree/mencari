const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const searchStr = 'if (pathname.includes("/group")) return "group";';
const replaceStr = 'if (pathname.includes("/product")) return "product";\n      if (pathname.includes("/group")) return "group";';

if (code.includes(searchStr)) {
  code = code.replace(searchStr, replaceStr);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully patched initial state');
} else {
  console.log('Failed to find state patch string');
}
