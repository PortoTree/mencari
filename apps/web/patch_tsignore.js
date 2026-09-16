const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
file = file.replace('<Lottie \n                  lottieRef={lottieRef}', '{/* @ts-ignore */}\n                <Lottie \n                  lottieRef={lottieRef}');
file = file.replace('<Lottie \r\n                  lottieRef={lottieRef}', '{/* @ts-ignore */}\r\n                <Lottie \r\n                  lottieRef={lottieRef}');
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added ts-ignore to Lottie');
