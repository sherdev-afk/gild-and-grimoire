'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Spell {
  id: string;
  title: string;
  incantation: string;
  description?: string;
}

export default function GrimoirePage() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSpells = async () => {
      const { data } = await supabase.from('spells').select('*');
      if (data) setSpells(data);
      setLoading(false);
    };

    fetchSpells();
  }, []);

  return (
    <div className="p-8 text-white max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-amber-400">📖 The Grimoire</h1>
      <p className="text-gray-300 mb-6">
        Here lie the guild&apos;s arcane artifacts — spells, rituals, and incantations crafted by creators across the realm.
      </p>

      {loading ? (
        <p className="text-gray-500 italic">Dusting off parchment and unlocking glyphs...</p>
      ) : spells.length === 0 ? (
        <p className="text-gray-500 italic">No spells inscribed yet. Perhaps you&apos;ll write the first.</p>
      ) : (
        <div className="space-y-6">
          {spells.map((spell) => (
            <div
              key={spell.id}
              className="bg-zinc-900 border border-amber-500 rounded p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold text-amber-300 mb-2">{spell.title}</h2>
              <p className="italic text-green-300 mb-4">💬 {spell.incantation}</p>
              <p className="text-gray-400">{spell.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}