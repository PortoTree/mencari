const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');
console.log('Simpan old:', code.includes('strokeWidth={2}\n                      d="M5 5a2 2'));
console.log('Simpan new:', code.includes('M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />'));
console.log('Acara new:', code.includes('M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75'));
