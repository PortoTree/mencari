const fs = require('fs');
let file = fs.readFileSync('src/app/layout.tsx', 'utf8');

const target = 'description: "Platform untuk mencari semua kebutuhanmu",';
if (file.includes(target)) {
  file = file.replace(target, target + '\n  other: {\n    google: "notranslate",\n  },');
  console.log('✅ Added google: notranslate');
}

fs.writeFileSync('src/app/layout.tsx', file);
