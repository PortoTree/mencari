const fs = require('fs');
const lines = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8').split(/\r?\n/);
for (let i = 80; i <= 100; i++) {
  console.log(`Line ${i + 1}:`, lines[i]);
}
