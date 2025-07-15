'use client';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="p-8 text-white min-h-screen flex flex-col justify-center items-center bg-black">
      <h1 className="text-5xl font-bold mb-4 text-amber-400">🔍 Page Not Found</h1>
      <p className="text-lg text-gray-300 mb-6">
        The relic you seek might be missing from the vault or cloaked in magic. Try a different path...
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-amber-600 text-black rounded font-semibold hover:bg-amber-500 transition"
      >
        Return to Guild Hall
      </Link>
    </div>
  );
}