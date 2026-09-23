const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Find all occurrences of setIsSearchExpanded and setIsNotifOpen to locate the popups
const allOccurrences = [];
const regex = /z-\[(\d+)\]/g;
let m;
while ((m = regex.exec(code)) !== null) {
  const val = parseInt(m[1]);
  if (val > 50) {
    allOccurrences.push({ val, idx: m.index, ctx: code.substring(m.index - 80, m.index + 80).replace(/\r\n/g, ' ') });
  }
}
allOccurrences.forEach(o => console.log(`z-[${o.val}] at ${o.idx}: ...${o.ctx}...`));
