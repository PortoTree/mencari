const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

const regex = /t\("tabs\.search"\)/g;
let match;
while ((match = regex.exec(code)) !== null) {
  console.log('Match at', match.index);
  console.log(code.substring(match.index - 500, match.index + 200));
  console.log('---------------------------');
}
