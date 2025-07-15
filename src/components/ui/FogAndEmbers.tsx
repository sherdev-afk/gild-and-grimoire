'use client';
import { useEffect } from 'react';

export default function FogAndEmbers() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js';
    script.onload = () => {
      if (typeof window !== 'undefined' && 'particlesJS' in window) {
        (window as any).particlesJS('particles', {
          particles: {
            number: { value: 80 },
            color: { value: '#ffaa00' },
            shape: { type: 'circle' },
            opacity: { value: 0.2 },
            size: { value: 3 },
            move: { enable: true, speed: 0.6 },
          },
          interactivity: { events: { onhover: { enable: false } } },
          retina_detect: true,
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return <div id="particles" className="fixed inset-0 z-0" />;
}