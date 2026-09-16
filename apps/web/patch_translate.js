const fs = require('fs');
let file = fs.readFileSync('src/app/layout.tsx', 'utf8');

if (file.includes('<html')) {
  file = file.replace('lang="en"', 'lang="en" translate="no"');
  fs.writeFileSync('src/app/layout.tsx', file);
  console.log('✅ Added translate="no" to root layout');
} else {
  console.log('⚠️ Could not find <html tag');
}
