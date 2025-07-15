'use client';
import { Parallax } from 'react-scroll-parallax';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-white">
      <Parallax speed={-10}>
        <section className="h-screen bg-[url('/bg/parchment-scroll.jpg')] bg-cover bg-center flex items-center justify-center">
          <h1 className="text-5xl font-serif">📜 Chapter I: The World</h1>
        </section>
      </Parallax>

      <Parallax speed={5}>
        <section className="min-h-screen bg-black/70 p-12 text-center space-y-6">
          <h2 className="text-4xl font-serif">🔮 Chapter II: The Relics</h2>
          <Link href="/grimoire" className="bg-amber-600 px-6 py-2 rounded hover:bg-amber-700">
            Enter the Grimoire
          </Link>
        </section>
      </Parallax>

      <Parallax speed={-5}>
        <section className="min-h-screen bg-black/80 p-12 text-center space-y-6">
          <h2 className="text-4xl font-serif">⚔️ Chapter III: Join the Guild</h2>
          <Link href="/forge" className="bg-emerald-600 px-6 py-2 rounded hover:bg-emerald-700">
            Forge a Relic
          </Link>
        </section>
      </Parallax>
    </div>
  );
}