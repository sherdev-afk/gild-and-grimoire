'use client';

import { ParallaxProvider } from 'react-scroll-parallax';

interface ParallaxLayoutProps {
  children: React.ReactNode;
}

export default function ParallaxLayout({ children }: ParallaxLayoutProps) {
  return (
    <ParallaxProvider>
      {children}
    </ParallaxProvider>
  );
}