const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace(
  '<img src="https://www.google.com/s2/favicons?domain=github.com&sz=64" alt="github.com"',
  '<img src="https://www.google.com/s2/favicons?domain=google.com&sz=64" alt="google.com"'
);

file = file.replace(
  '<img src="https://www.google.com/s2/favicons?domain=vercel.com&sz=64" alt="vercel.com"',
  '<img src="https://www.google.com/s2/favicons?domain=stackoverflow.com&sz=64" alt="stackoverflow.com"'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed API favicon domains');
