"use client";

import { useEffect, useState } from 'react';

export function FallingStars() {
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 25 : 50;
    const newStars = Array.from({ length: starCount }).map((_, i) => (
      <div
        key={i}
        className="star"
        style={{
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 3 + 4}s`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ));
    setStars(newStars);
  }, []);

  return <>{stars}</>;
}
