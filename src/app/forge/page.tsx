'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { evaluateBadges } from '@/lib/badges';

export default function ForgePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: null as File | null,
  });

  const handleSubmit = async () => {
    if (!form.image) return alert('Please upload an image.');

    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;
    if (!user) return alert('You must be logged in.');

    const file = form.image;
    const { data: imageData, error: imageError } = await supabase.storage
      .from('relics')
      .upload(`public/${Date.now()}-${file.name}`, file);

    if (imageError) return alert('Image upload failed.');

    const imageUrl = supabase.storage.from('relics').getPublicUrl(imageData?.path || '').data.publicUrl;

    const { error } = await supabase.from('relics').insert([
      {
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        image_url: imageUrl,
        user_id: user.id,
        approved: false,
      },
    ]);

    if (!error) {
      await supabase.rpc('add_xp', { user_id: user.id, amount: 10 });
      await evaluateBadges(user.id);
      router.push('/grimoire');
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Forge a New Relic</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 bg-black border border-gray-600"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 bg-black border border-gray-600"
        />
        <input
          type="number"
          placeholder="Price in gold"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full p-2 bg-black border border-gray-600"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
          className="w-full p-2 bg-black border border-gray-600"
        />
        <button onClick={handleSubmit} className="bg-amber-600 px-4 py-2 rounded">
          Submit Relic
        </button>
      </div>
    </div>
  );
}