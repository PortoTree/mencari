const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('{/* History Block (Moved from Right) */}')) {
    if (lines[i+1].includes('className="mt-4"')) {
      lines[i+1] = lines[i+1].replace('className="mt-4"', 'className="mt-4 hidden"');
      console.log('Modified History Block');
    }
  }
  
  if (lines[i].includes('activeTab === "mencari" && (')) {
    if (lines[i+1].includes('className="hidden lg:block fixed right-0')) {
      lines[i+1] = '          <div className="hidden">';
      console.log('Modified Ads Block');
    }
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
