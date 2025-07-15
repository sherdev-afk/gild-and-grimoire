'use client';

import Link from 'next/link';

export default function CreateYourOwn() {
  return (
    <div className="p-8 text-white text-center max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4 text-amber-400">🧵 Forge Your Own Relic</h1>
      <p className="text-lg mb-6 text-gray-300">
        Channel your creativity and craft enchanted gear. Upload your design and place it on mugs, hoodies, t-shirts, and more — all powered by the Gild & Grimoire forge.
      </p>

      <a
        href="https://gildandgrimoire.printify.me"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-amber-500 text-black px-6 py-3 rounded text-lg font-bold hover:bg-amber-400 transition"
      >
        Begin Your Craft
      </a>

      <div className="mt-10 text-sm text-gray-400">
        <p>
          You’ll be redirected to our Printify forge where you can upload your design, preview it on products, and place your order.
        </p>
        <p className="mt-2 italic">All relics are conjured and shipped by our trusted artisans at Printify.</p>
      </div>

      <div className="mt-12">
        <Link href="/" className="text-amber-400 hover:underline">
          ← Return to the Guild Hall
        </Link>
      </div>
    </div>
  );
}