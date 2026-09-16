const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Revert useLottie back to Lottie
const useLottieImport = 'import { useLottie } from "lottie-react";\nimport animationData from "../../../../public/search-bar.json";';
const staticLottieImport = 'import { Lottie } from "lottie-react";\nimport animationData from "../../../../public/search-bar.json";';

file = file.split(useLottieImport).join(staticLottieImport);
file = file.split(useLottieImport.replace(/\n/g, '\r\n')).join(staticLottieImport.replace(/\n/g, '\r\n'));

// 2. Revert hook logic
const newLottieHook = `const lottieRef = useRef<any>(null);
  const handleAnimationComplete = () => {
    setTimeout(() => {
      if (lottieRef.current) lottieRef.current.goToAndPlay(0, true);
    }, 5000);
  };
  
  const options = {
    animationData: animationData,
    loop: false,
    onComplete: handleAnimationComplete,
    lottieRef: lottieRef
  };
  const { View: LottieView } = useLottie(options);`;

const originalLottieHook = `const lottieRef = useRef<any>(null);
  const handleAnimationComplete = () => {
    setTimeout(() => {
      if (lottieRef.current) lottieRef.current.goToAndPlay(0, true);
    }, 5000);
  };`;

file = file.split(newLottieHook).join(originalLottieHook);
file = file.split(newLottieHook.replace(/\n/g, '\r\n')).join(originalLottieHook.replace(/\n/g, '\r\n'));

// 3. Revert JSX
const lottieJsx = `{LottieView}`;
const originalLottieJsx = `<Lottie 
                  {...({
                    lottieRef: lottieRef,
                    animationData: animationData,
                    loop: false,
                    onComplete: handleAnimationComplete
                  } as any)}
                />`;

file = file.replace(lottieJsx, originalLottieJsx); // only replace first occurrence

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated to static named import Lottie');
