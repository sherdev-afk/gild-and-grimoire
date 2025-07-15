'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface Relic {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  created_at?: string;
}

export default function MyRelicsPage() {
  const [relics, setRelics] = useState<Relic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRelics = async () => {
      const { data } = await supabase
        .from('relics')
        .select('*')
        .eq('user_id', 'user-id');
      if (data) setRelics(data);
      setLoading(false);
    };

    fetchRelics();
  }, []);

  if (loading) return <p className="p-8 text-gray-400">Loading your relics...</p>;

  return (
    <div className="p-8 text-white max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-amber-400">📦 My Relics</h1>
      <p className="text-gray-300 mb-6">
        These are your crafted items. You may edit, enchant, or offer them to the guild vault.
      </p>

      {relics.length === 0 ? (
        <p className="italic text-gray-500">You haven&apos;t forged any relics yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relics.map((relic) => (
            <div
              key={relic.id}
              className="bg-zinc-900 border border-amber-500 rounded p-4 hover:shadow-md transition-shadow"
            >
              {relic.image_url && (
                <Image
                  src={relic.image_url}
                  alt={relic.title}
                  width={300}
                  height={200}
                  className="rounded mb-2"
                />
              )}
              <h3 className="text-lg font-semibold mb-1">{relic.title}</h3>
              <p className="text-sm text-gray-300">{relic.description}</p>
              <p className="text-xs text-gray-500 mt-2">📅 Created: {relic.created_at?.split('T')[0]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}