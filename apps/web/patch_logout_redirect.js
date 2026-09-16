const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

if (file.includes('window.location.href = `/${locale}/login`;')) {
  file = file.replace('window.location.href = `/${locale}/login`;', 'window.location.href = `/login`;');
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
  console.log('✅ Fixed logout redirect to point to root /login');
}
