const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

const regex = /<button[^>]*onClick=\{\(\) => router\.back\(\)\}[^>]*>[\s\S]*?Kembali<\/span>[\s\S]*?<\/button>/;

if (regex.test(code)) {
  code = code.replace(regex, '');
  fs.writeFileSync('src/app/[locale]/page/page.tsx', code);
  console.log('Button removed successfully');
} else {
  console.log('Button not found');
}
