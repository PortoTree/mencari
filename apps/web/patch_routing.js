const fs = require('fs');
const pageCode = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');
const lines = pageCode.split('\n');
let modified = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('setActiveTab(') && lines[i+1] && lines[i+1].includes('window.history.pushState')) {
    // We found a block!
    const tabNameMatch = lines[i].match(/setActiveTab\("([^"]+)"\)/);
    if (tabNameMatch) {
      let route = tabNameMatch[1];
      if (route === 'home') route = 'beranda';
      if (route === 'chat') route = 'obrolan';
      
      lines[i-1] = `            onClick={() => router.push(\`/\${locale}/${route}\`)}`;
      lines[i] = '';
      lines[i+1] = '';
      lines[i+2] = '';
      modified = true;
    }
  }
}

// Check the search history items
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('setActiveTab("mencari")') && lines[i+1].includes('setIsSearchNavOpen(false)')) {
    lines[i-1] = `onClick={() => router.push(\`/\${locale}/beranda\`)}`;
    lines[i] = '';
    lines[i+1] = '';
    lines[i+2] = '';
    modified = true;
  }
}

if (modified) {
  fs.writeFileSync('src/app/[locale]/page/page.tsx', lines.join('\n'));
  console.log('Successfully patched routing');
} else {
  console.log('No matches found for routing patch');
}
