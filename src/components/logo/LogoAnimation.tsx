import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export const AnimatedLogo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Image
        src="/pro-logo.png"
        alt="Pro Logo"
        width={150}
        height={150}
        className="animate-pulse"
      />
    </div>
  );
};