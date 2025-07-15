'use client';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/submit">Forge</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}