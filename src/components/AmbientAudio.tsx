'use client';
import { useEffect, useState } from 'react';

export default function AmbientAudio() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const audio = new Audio('/audio/ambient.mp3');
    audio.loop = true;
    if (enabled) audio.play();
    else audio.pause();
    return () => audio.pause();
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="fixed bottom-4 right-4 bg-black/70 px-4 py-2 rounded text-white z-50"
    >
      {enabled ? '🔊 Ambient On' : '🔇 Ambient Off'}
    </button>
  );
}