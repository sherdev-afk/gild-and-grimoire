'use client';

import Link from 'next/link';
import { Parallax } from 'react-scroll-parallax';

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero Section */}
      <Parallax speed={-10}>
        <section
          className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-center text-amber-100 px-6"
          style={{ backgroundImage: "url('/bg/background.jpg')" }}
        >
          <h1 className="text-6xl md:text-7xl font-serif drop-shadow-xl mb-6">📜 Gild & Grimoire</h1>
          <p className="text-lg max-w-2xl">
            Where creators forge relics and guilds shape the realm. Welcome, adventurer — your legend begins here.
          </p>
          <Link href="/forge">
            <button className="mt-8 bg-amber-700 hover:bg-amber-800 transition-all duration-300 text-white font-semibold py-3 px-6 rounded shadow-lg">
              Begin Your Quest
            </button>
          </Link>
        </section>
      </Parallax>

      {/* Chapter Section */}
      <Parallax speed={-5}>
        <section id="chapter-two" className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 py-24 px-8 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">🛡️ Chapter II: The Relics</h2>
          <p className="max-w-xl text-lg">
            Explore enchanted artifacts. Each relic is imbued with lore, power, and mystery — forged by the guilds and inscribed with your story.
          </p>
          <Link href="/relics">
            <span className="mt-6 underline hover:text-amber-500 transition cursor-pointer">Browse Relics</span>
          </Link>
        </section>
      </Parallax>

      {/* Footer */}
      <footer className="text-sm text-center py-6 text-gray-500 bg-black">
        <p>© 2025 Gild & Grimoire • Relics registered in the Great Vault</p>
      </footer>
    </main>
  );
}