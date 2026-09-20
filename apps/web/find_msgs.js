const fs = require('fs');
const code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /<div[^>]*className="[^"]*flex-1 overflow-y-auto[^"]*"[^>]*>[\s\S]{0,200}/g;
const matches = code.match(regex);
if (matches) {
  matches.forEach((m, i) => {
    console.log(`\n--- Match ${i} ---`);
    console.log(m.substring(0, 150));
  });
} else {
  console.log('Not found');
}
