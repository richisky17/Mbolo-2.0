"use client";

import Lottie from "lottie-react";
import mascotAnimation from "../../public/mascot-animation.json";

type LottieMascotProps = {
  width?: number;
  height?: number;
  className?: string;
};

const LottieMascot = ({ 
  width = 40, 
  height = 40,
  className = ""
}: LottieMascotProps) => {
  // Remove white background layer from animation
  const modifiedAnimation = {
    ...mascotAnimation,
    layers: mascotAnimation.layers.filter((layer: any) => 
      layer.nm !== "frame-bolt Bg"
    )
  };

  return (
    <div 
      className={className}
      style={{ 
        width: className ? undefined : `${width}px`, 
        height: className ? undefined : `${height}px`,
        background: "transparent"
      }}
    >
      <Lottie 
        animationData={modifiedAnimation}
        loop={true}
        autoplay={true}
        style={{ 
          width: "100%", 
          height: "100%"
        }}
      />
    </div>
  );
};

export default LottieMascot;

