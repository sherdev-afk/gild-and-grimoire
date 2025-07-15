'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface Relic {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
}

export default function GuildViewPage() {
  const params = useParams() as { guildId?: string };
  const guildId = params?.guildId;
  const [relics, setRelics] = useState<Relic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!guildId) return;

    const fetchRelics = async () => {
      const { data } = await supabase
        .from('relics')
        .select('*')
        .eq('guild', guildId);

      if (data) setRelics(data);
      setLoading(false);
    };

    fetchRelics();
  }, [guildId]);

  return (
    <div className="p-8 text-white max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-amber-400">🏰 Guild: {guildId}</h1>
      <p className="text-gray-300 mb-6">
        Behold the relics forged under the banner of <strong>{guildId}</strong>. Only those loyal to this guild may wield them.
      </p>

      {loading ? (
        <p className="text-gray-400">Summoning guild inventory...</p>
      ) : relics.length === 0 ? (
        <p className="italic text-gray-500">No relics found for this guild.</p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}