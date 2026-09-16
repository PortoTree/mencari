const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const badLottie = `{/* @ts-ignore */}
                <Lottie 
                  lottieRef={lottieRef}
                  animationData={animationData}
                  loop={false}
                  onComplete={handleAnimationComplete}
                />`;
const goodLottie = `<Lottie 
                  {...({
                    lottieRef: lottieRef,
                    animationData: animationData,
                    loop: false,
                    onComplete: handleAnimationComplete
                  } as any)}
                />`;

file = file.split(badLottie).join(goodLottie);
file = file.split(badLottie.replace(/\n/g, '\r\n')).join(goodLottie.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Replaced Lottie props with any cast');
