'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Relic {
  id: string;
  title: string;
  creator?: string;
  status?: string;
  created_at?: string;
}

export default function AdminOverview() {
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

  if (loading) return <p className="p-8 text-gray-400">Inspecting relic archives...</p>;

  return (
    <div className="p-8 text-white max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-amber-400">🧮 Admin Relic Overview</h1>
      <p className="text-gray-300 mb-6">
        Review relics submitted by creators. You may approve, reject, or enchant them further.
      </p>

      {relics.length === 0 ? (
        <p className="italic text-gray-500">No relics submitted yet.</p>
      ) : (
        <table className="w-full border border-gray-700 rounded">
          <thead className="bg-zinc-900 text-amber-500">
            <tr>
              <th className="text-left px-4 py-2">Relic</th>
              <th className="text-left px-4 py-2">Creator</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {relics.map((relic) => (
              <tr key={relic.id} className="border-t border-gray-800">
                <td className="px-4 py-2">{relic.title}</td>
                <td className="px-4 py-2">{relic.creator ?? 'Unknown'}</td>
                <td className="px-4 py-2">{relic.status ?? 'Pending'}</td>
                <td className="px-4 py-2">{relic.created_at?.split('T')[0] ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}