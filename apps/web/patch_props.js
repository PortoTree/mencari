const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const badProps = `<Lottie 
                  {...({
                    lottieRef: lottieRef,
                    animationData: animationData,
                    loop: false,
                    onComplete: handleAnimationComplete
                  } as any)}
                />`;

const goodProps = `<Lottie 
                  lottieRef={lottieRef}
                  src={animationData}
                  loop={false}
                  subscriptions={{ complete: handleAnimationComplete }}
                />`;

file = file.split(badProps).join(goodProps);
file = file.split(badProps.replace(/\n/g, '\r\n')).join(goodProps.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed Lottie props');
