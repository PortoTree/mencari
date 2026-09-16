const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Remove the dynamic Lottie import completely
file = file.replace(
  '// const Lottie = dynamic(() => import("lottie-react").then((mod) => ({ default: mod.Lottie || (mod as any).default })), { ssr: false });',
  ''
);

// 2. Import useLottie from lottie-react
file = file.replace(
  'import animationData from "../../../../public/search-bar.json";',
  'import { useLottie } from "lottie-react";\nimport animationData from "../../../../public/search-bar.json";'
);

// 3. Inside the Beranda component, add useLottie
const lottieHook = `const lottieRef = useRef<any>(null);
  const handleAnimationComplete = () => {
    setTimeout(() => {
      if (lottieRef.current) lottieRef.current.goToAndPlay(0, true);
    }, 5000);
  };`;

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

file = file.split(lottieHook).join(newLottieHook);
file = file.split(lottieHook.replace(/\n/g, '\r\n')).join(newLottieHook.replace(/\n/g, '\r\n'));

// 4. Replace the Lottie JSX component with {LottieView}
const lottieJsx = `<Lottie 
                  {...({
                    lottieRef: lottieRef,
                    animationData: animationData,
                    loop: false,
                    onComplete: handleAnimationComplete
                  } as any)}
                />`;
const newLottieJsx = `{LottieView}`;

file = file.split(lottieJsx).join(newLottieJsx);
file = file.split(lottieJsx.replace(/\n/g, '\r\n')).join(newLottieJsx.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated to use useLottie hook');
