const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Import both animation JSONs
const oldImport = 'import animationData from "../../../../public/search-bar.json";';
const newImport = 'import animationDataLight from "../../../../public/search-bar.json";\nimport animationDataDark from "../../../../public/search-bar-putih.json";';

file = file.replace(oldImport, newImport);

// 2. Change Lottie props
const oldLottie = `<Lottie 
                  lottieRef={lottieRef}
                  src={animationData}
                  loop={false}
                  autoplay={true}
                  subscriptions={{ complete: handleAnimationComplete }}
                />`;
const newLottie = `<Lottie 
                  lottieRef={lottieRef}
                  src={isDarkMode ? animationDataDark : animationDataLight}
                  loop={false}
                  autoplay={true}
                  subscriptions={{ complete: handleAnimationComplete }}
                />`;

file = file.replace(oldLottie, newLottie);

// 3. Change size of the Lottie container
const oldSize = 'className="w-72 h-40 mb-8 flex items-center justify-center [&>div]:w-full [&>div]:h-full"';
const newSize = 'className="w-[400px] h-[250px] mb-8 flex items-center justify-center [&>div]:w-full [&>div]:h-full"';

file = file.replace(oldSize, newSize);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated Lottie size and theme support');
