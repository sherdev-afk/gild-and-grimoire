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

export default function EditMyRelicPage() {
  const params = useParams() as { id?: string };
  const relicId = params?.id;
  const [relic, setRelic] = useState<Relic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!relicId) return;

    const fetchRelic = async () => {
      const { data } = await supabase.from('relics').select('*').eq('id', relicId).single();
      if (data) setRelic(data);
      setLoading(false);
    };

    fetchRelic();
  }, [relicId]);

  const updateRelicField = async (field: keyof Relic, value: string) => {
    if (!relic || !relicId) return;

    await supabase
      .from('relics')
      .update({ [field]: value })
      .eq('id', relicId);

    setRelic({ ...relic, [field]: value });
  };

  if (loading) return <p className="p-8 text-gray-400">Loading your relic...</p>;
  if (!relic) return <p className="p-8 text-red-500">Relic not found.</p>;

  return (
    <div className="p-8 text-white max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-amber-400">✏️ Edit Relic</h1>

      {relic.image_url && (
        <Image
          src={relic.image_url}
          alt={relic.title}
          width={400}
          height={300}
          className="rounded mb-4"
        />
      )}

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={relic.title}
            onChange={(e) => updateRelicField('title', e.target.value)}
            className="w-full p-2 bg-black border border-gray-600 rounded text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={relic.description ?? ''}
            onChange={(e) => updateRelicField('description', e.target.value)}
            className="w-full p-2 bg-black border border-gray-600 rounded text-white"
            rows={4}
          />
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-6 italic">
        Your changes will be saved and synced with the guild ledger automatically.
      </p>
    </div>
  );
}