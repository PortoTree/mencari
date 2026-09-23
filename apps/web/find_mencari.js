const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

let start = lines.findIndex((l, i) => i > 600 && (l.includes("setActiveTab('mencari')") || l.includes('setActiveTab("mencari")')));
if (start !== -1) {
  let divStart = start;
  while (!lines[divStart].includes('<div') && divStart > 0) divStart--;
  
  let divEnd = start;
  let bracketCount = 1;
  for (let i = divStart + 1; i < lines.length; i++) {
    if (lines[i].includes('<div')) bracketCount++;
    if (lines[i].includes('</div')) bracketCount--;
    if (bracketCount === 0) {
      divEnd = i;
      break;
    }
  }
  
  console.log('Mencari Tab goes from', divStart + 1, 'to', divEnd + 1);
} else {
  console.log('Could not find setActiveTab("mencari")');
}
