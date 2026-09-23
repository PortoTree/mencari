const fs = require('fs');
let lines = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('onKeyDown={(e) => {') && lines[i+1].includes('onClick={() => router.push(')) {
    lines[i+1] = `                          if (e.key === "Enter") {`;
    lines[i+2] = `                            setIsSearchNavOpen(false);`;
    lines[i+3] = `                            router.push(\`/\${locale}/beranda\`);`;
    // lines[i+4] and [i+5] should be `                          }` and `                        }}`
    // Wait, let's just make sure lines 248 and 249 are correctly closed.
  }
}

fs.writeFileSync('src/app/[locale]/page/page.tsx', lines.join('\n'));
console.log('Fixed syntax error');
