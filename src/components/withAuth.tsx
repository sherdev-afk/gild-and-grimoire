'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function withAuth(Component: any) {
  return function ProtectedPage(props: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
      supabase.auth.getUser().then(({ data }) => {
        if (!data.user) {
          router.push('/login'); // Redirect to login if not authenticated
        } else {
          setUser(data.user);
        }
        setLoading(false);
      });
    }, []);

    if (loading) return <div className="p-8 text-white">Loading...</div>;
    if (!user) return null;

    return <Component {...props} user={user} />;
  };
}