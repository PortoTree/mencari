"use client";

import { useState } from "react";
import { Lottie } from "lottie-react";
import openingAnimation from "../../public/opening.json";

export default function SplashAnimation() {
  const [show, setShow] = useState(true);

  const handleComplete = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white">
      <div className="w-64 h-64 sm:w-96 sm:h-96">
        <Lottie 
          src={openingAnimation} 
          loop={false} 
          autoplay={true} 
          subscriptions={{ complete: handleComplete }} 
        />
      </div>
    </div>
  );
}
