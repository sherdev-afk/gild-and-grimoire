'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface Profile {
  name: string;
  title: string;
  guild: string;
  bio: string;
  xp?: number;
  badges?: string[];
  avatar_url?: string;
}

interface Relic {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    title: '',
    guild: '',
    bio: '',
    xp: 0,
    badges: [],
  });

  const [relics, setRelics] = useState<Relic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', 'user-id')
        .single();

      const { data: relicData } = await supabase
        .from('relics')
        .select('*')
        .eq('user_id', 'user-id');

      if (profileData) setProfile(profileData);
      if (relicData) setRelics(relicData);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="p-8 text-gray-400">Loading your profile...</p>;

  return (
    <div className="p-8 text-white max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-amber-400">{profile.name}</h1>
      <p className="text-lg mb-1">🏷️ Title: {profile.title}</p>
      <p className="text-lg mb-1">🛡️ Guild: {profile.guild}</p>
      <p className="text-md text-gray-300 italic mb-4">“{profile.bio}”</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-amber-500 mb-2">📈 Progress</h2>
        <p>XP: {profile.xp}</p>
        <p>Level: {Math.floor((profile.xp ?? 0) / 100) + 1}</p>
      </div>

      {profile.badges && profile.badges.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-amber-500 mb-2">🏅 Badges</h2>
          <div className="flex flex-wrap gap-2">
            {profile.badges.map((badge, idx) => (
              <span
                key={idx}
                className="bg-amber-600 text-black px-3 py-1 rounded-full text-sm font-semibold"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold text-amber-500 mb-2">📦 Relics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {relics.map((relic) => (
            <div
              key={relic.id}
              className="bg-zinc-900 border border-amber-400 rounded p-4"
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
              <h3 className="font-bold text-lg mb-1">{relic.title}</h3>
              <p className="text-sm text-gray-300">{relic.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}