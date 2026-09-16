const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/layout.tsx', 'utf8');

const target = 'description: "Platform untuk mencari semua kebutuhanmu",';
if (file.includes(target) && !file.includes('google: "notranslate"')) {
  file = file.replace(target, target + '\n  other: {\n    google: "notranslate",\n  },');
  fs.writeFileSync('src/app/[locale]/layout.tsx', file);
  console.log('✅ Added google: notranslate to locale layout');
}
