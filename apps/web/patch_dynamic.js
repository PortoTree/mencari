const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
file = file.replace(
  'const Lottie = dynamic(() => import("lottie-react").then((mod) => mod.Lottie || mod.default || mod), { ssr: false });',
  'const Lottie = dynamic(() => import("lottie-react").then((mod) => ({ default: mod.Lottie || mod.default })), { ssr: false });'
);
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed dynamic import syntax');
