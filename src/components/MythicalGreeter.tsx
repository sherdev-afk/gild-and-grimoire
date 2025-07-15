'use client';
import Image from 'next/image';

export default function MythicalGreeter() {
  return (
    <div className="animate-fade-in text-center mt-20">
      <Image
        src="/characters/greeter.png"
        alt="Mythical Greeter"
        width={200}
        height={200}
        className="mx-auto mb-4"
      />
      <h1 className="text-4xl font-bold text-amber-400">Welcome, Seeker of Relics</h1>
      <p className="text-lg text-gray-300 mt-2">The realm awaits your legend.</p>
    </div>
  );
}