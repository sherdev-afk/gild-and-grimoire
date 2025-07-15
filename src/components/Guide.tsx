"use client";

import { useEffect, useState } from "react";

export default function Guide({ hasUploaded }: { hasUploaded: boolean }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (hasUploaded && step === 0) {
      setStep(1);
    }
  }, [hasUploaded]);

  const messages = [
    "Welcome, Seeker. I am the Curator of Relics. Upload your sigil to begin.",
    "Marvelous. Now choose your vessel—hoodie, mug, or tunic—and place your mark.",
    "When you're ready, summon your relic to bind it to this realm.",
  ];

  return (
    <div className="fixed bottom-6 left-6 bg-black/80 text-yellow-300 border border-yellow-500 rounded-lg p-4 max-w-xs shadow-lg z-50">
      <p className="text-sm italic">{messages[step]}</p>
      {step < messages.length - 1 && (
        <button
          onClick={() => setStep(step + 1)}
          className="mt-2 text-xs text-yellow-400 hover:underline"
        >
          Next
        </button>
      )}
    </div>
  );
}