const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace(
  'if (lottieRef.current) lottieRef.current.seek(0); lottieRef.current.play();',
  'if (lottieRef.current) { lottieRef.current.seek(0); lottieRef.current.play(); }'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed Lottie unmount bug');
