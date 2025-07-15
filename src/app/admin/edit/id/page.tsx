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
  status?: string;
}

export default function EditRelicPage() {
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

  const handleStatusChange = async (newStatus: string) => {
    if (!relic) return;

    await supabase.from('relics').update({ status: newStatus }).eq('id', relic.id);
    setRelic({ ...relic, status: newStatus });
  };

  if (loading) return <p className="p-8 text-gray-400">Retrieving relic details...</p>;
  if (!relic) return <p className="p-8 text-red-500">Relic not found.</p>;

  return (
    <div className="p-8 text-white max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-amber-400">🛠 Edit Relic</h1>

      {relic.image_url && (
        <Image
          src={relic.image_url}
          alt={relic.title}
          width={400}
          height={300}
          className="rounded mb-4"
        />
      )}

      <h2 className="text-xl font-semibold">{relic.title}</h2>
      <p className="text-sm text-gray-300 mb-4">{relic.description}</p>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Status:</label>
        <select
          value={relic.status ?? 'pending'}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="p-2 bg-black border border-gray-600 rounded text-white"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <p className="text-sm text-gray-500 italic">
        Changes sync automatically with the guild vault&apos;s ledger.
      </p>
    </div>
  );
}