'use client';
import { useEffect, useState } from 'react';

const backgrounds = [
  '/bg/forge.png',
  '/bg/forest.png',
  '/bg/tome.png',
];

export default function BackgroundCycle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgrounds.length);
    }, 10000); // rotate every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
      style={{ backgroundImage: `url(${backgrounds[index]})` }}
    />
  );
}