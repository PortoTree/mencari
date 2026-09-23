const fs = require('fs');
const code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

let navStart = lines.findIndex(l => l.includes('<nav className="bg-white dark:bg-[#242526]'));
let navEnd = -1;
let openCount = 0;

for (let i = navStart; i < lines.length; i++) {
  if (lines[i].includes('<nav')) openCount++;
  if (lines[i].includes('</nav>')) openCount--;
  
  if (openCount === 0 && lines[i].includes('</nav>')) {
    navEnd = i;
    break;
  }
}

const navCode = lines.slice(navStart, navEnd + 1).join('\n');
fs.writeFileSync('nav_dump.txt', navCode);
console.log('Nav dumped. Lines:', navEnd - navStart + 1);
