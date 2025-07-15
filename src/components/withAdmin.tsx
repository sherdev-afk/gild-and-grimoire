'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function withAdmin(Component: any) {
  return function AdminProtectedPage(props: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
      supabase.auth.getUser().then(async ({ data }) => {
        const user = data.user;
        if (!user) {
          router.push('/login');
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('id, banned')
          .eq('id', user.id)
          .single();

        if (!profile || profile.banned) {
          router.push('/banned');
          return;
        }

        // You can add a role check here if needed
        setUser(user);
        setLoading(false);
      });
    }, []);

    if (loading) return <div className="p-8 text-white">Loading...</div>;
    if (!user) return null;

    return <Component {...props} user={user} />;
  };
}