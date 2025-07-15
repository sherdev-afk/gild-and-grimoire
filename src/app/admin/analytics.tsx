'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AnalyticsPage() {
  const [stats, setStats] = useState({ relics: 0, users: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from('relics').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
    ]).then(([relics, users]) => {
      setStats({
        relics: relics.count || 0,
        users: users.count || 0,
      });
    });
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">📊 Realm Analytics</h1>
      <p>Total Relics: {stats.relics}</p>
      <p>Total Users: {stats.users}</p>
    </div>
  );
}