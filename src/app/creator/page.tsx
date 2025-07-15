'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface Relic {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  status?: string;
}

export default function CreatorDashboard() {
  const [relics, setRelics] = useState<Relic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRelics = async () => {
      const { data } = await supabase.from('relics').select('*');
      if (data) setRelics(data);
      setLoading(false);
    };

    fetchRelics();
  }, []);

  return (
    <div className="p-8 text-white max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-amber-400">🛠 Creator Forge</h1>
      <p className="text-gray-300 mb-6">
        Welcome to your relic workshop. Upload enchanted items, manage submissions, and track your creations.
      </p>

      {loading ? (
        <p className="text-gray-400">Loading relics from the forge...</p>
      ) : relics.length === 0 ? (
        <p className="italic text-gray-500">You haven&apos;t crafted any relics yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relics.map((relic) => (
            <div key={relic.id} className="bg-zinc-900 border border-amber-500 rounded p-4">
              {relic.image_url && (
                <Image
                  src={relic.image_url}
                  alt={relic.title}
                  width={300}
                  height={200}
                  className="rounded mb-2"
                />
              )}
              <h3 className="text-xl font-semibold text-white">{relic.title}</h3>
              <p className="text-sm text-gray-300 mb-2">{relic.description}</p>
              <span className="text-xs px-2 py-1 rounded bg-amber-700 text-black font-semibold">
                Status: {relic.status ?? 'pending'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}