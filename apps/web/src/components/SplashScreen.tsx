"use client";

import { useEffect, useState } from "react";
import { useLottie } from "lottie-react";
import openingAnimation from "../../public/opening-new.json";

function LottiePlayer({ onComplete }: { onComplete: () => void }) {
  const lottie = useLottie({
    src: openingAnimation,
    loop: false,
    autoplay: true,
    onComplete
  } as any);

  return <div ref={lottie.setDisplayRef} style={{ width: '100%', height: '100%' }} />;
}

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Kunci scroll mutlak dengan position fixed di body
    const originalStyle = window.getComputedStyle(document.body).position;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.bottom = '0';
    document.body.style.width = '100%';

    // Tahan splash screen maksimal 4 detik sebagai fallback
    const timer = setTimeout(() => {
      hideSplash();
    }, 4000);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = originalStyle === 'fixed' ? '' : originalStyle;
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.bottom = '';
      document.body.style.width = '';
    };
  }, []);

  const hideSplash = () => {
    setIsFading(true);
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.bottom = '';
    document.body.style.width = '';
    setTimeout(() => setShow(false), 500); // 500ms fade out transition
  };

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center bg-[#343434] transition-opacity duration-500 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ zIndex: 99999999 }}
    >
      <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
        <LottiePlayer onComplete={hideSplash} />
      </div>
    </div>
  );
}
