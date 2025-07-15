'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import RelicForm from '@/components/RelicForm';

export default function Submit() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data?.user?.id ?? null);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!userId) return <p>You must be logged in to forge a relic.</p>;

  return (
    <>
      <Navbar />
      <h1>Forge a New Relic</h1>
      <RelicForm userId={userId} />
    </>
  );
}