'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    setMessage(error ? 'Something went wrong.' : 'Check your email for the magic link!');
  };

  return (
    <div className="max-w-md mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Enter the Realm</h1>
      <input
        type="email"
        placeholder="you@realm.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-700 bg-black mb-4"
      />
      <button onClick={handleLogin} className="bg-amber-600 px-4 py-2 w-full">
        Send Magic Link
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}