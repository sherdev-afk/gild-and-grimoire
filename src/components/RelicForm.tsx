import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RelicForm({ userId }: { userId: string }) {
  const [form, setForm] = useState({ title: '', price: '', image: '', description: '' });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.from('relics').insert([{ ...form, user_id: userId }]);
    if (error) alert(error.message);
    else alert('Relic submitted!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Price" type="number" onChange={e => setForm({ ...form, price: e.target.value })} />
      <input placeholder="Image URL" onChange={e => setForm({ ...form, image: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
      <button type="submit">Submit Relic</button>
    </form>
  );
}