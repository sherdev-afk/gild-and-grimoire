'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Metrics {
  totalRelics: number;
  activeGuilds: number;
  totalCreators: number;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics>({
    totalRelics: 0,
    activeGuilds: 0,
    totalCreators: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [relicsRes, guildsRes, creatorsRes] = await Promise.all([
        supabase.from('relics').select(),
        supabase.from('guilds').select(),
        supabase.from('profiles').select(),
      ]);

      setMetrics({
        totalRelics: relicsRes.data?.length ?? 0,
        activeGuilds: guildsRes.data?.length ?? 0,
        totalCreators: creatorsRes.data?.length ?? 0,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8 text-white max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-amber-400">📊 Guild Dashboard</h1>
      <p className="text-gray-300 mb-6">
        Here lies a snapshot of guild activity. These metrics reflect your realm&apos;s living magic and contributions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-zinc-900 p-6 rounded border border-amber-500">
          <h2 className="text-xl font-bold mb-2">🔮 Relics</h2>
          <p className="text-3xl font-bold text-amber-400">{metrics.totalRelics}</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded border border-amber-500">
          <h2 className="text-xl font-bold mb-2">🏰 Guilds</h2>
          <p className="text-3xl font-bold text-amber-400">{metrics.activeGuilds}</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded border border-amber-500">
          <h2 className="text-xl font-bold mb-2">🧙 Creators</h2>
          <p className="text-3xl font-bold text-amber-400">{metrics.totalCreators}</p>
        </div>
      </div>
    </div>
  );
}