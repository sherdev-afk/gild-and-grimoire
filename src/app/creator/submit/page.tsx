"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { Button } from "@/components/ui/button";

type FormState = {
  title: string;
  price: string;
  seller: string;
  sellerTitle: string;
  sellerBio: string;
  guild: string;
  image: string;
  description: string;
};

export default function SubmitRelic() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: "",
    price: "",
    seller: "",
    sellerTitle: "",
    sellerBio: "",
    guild: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // 🔐 Check for logged-in user
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/login");
      } else {
        setUserId(data.user.id);
      }
    };
    getUser();
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("relics").insert([
      {
        ...form,
        price: parseFloat(form.price),
        user_id: userId, // 🔐 Attach user ID
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error submitting relic: " + error.message);
    } else {
      alert("Relic submitted!");
      setForm({
        title: "",
        price: "",
        seller: "",
        sellerTitle: "",
        sellerBio: "",
        guild: "",
        image: "",
        description: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6 text-amber-400">Submit Your Relic</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <Input label="Relic Name" name="title" value={form.title} onChange={handleChange} />
        <Input label="Price (£)" name="price" type="number" value={form.price} onChange={handleChange} />
        <Input label="Seller Name" name="seller" value={form.seller} onChange={handleChange} />
        <Input label="Seller Title" name="sellerTitle" value={form.sellerTitle} onChange={handleChange} />
        <Textarea label="Seller Bio" name="sellerBio" value={form.sellerBio} onChange={handleChange} />
        <Select label="Guild Affiliation" name="guild" value={form.guild} onChange={handleChange} />
        <Input label="Image URL" name="image" value={form.image} onChange={handleChange} />
        <Textarea label="Description" name="description" value={form.description} onChange={handleChange} />
        <Button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-2">
          {loading ? "Submitting..." : "Submit Relic"}
        </Button>
      </form>
    </div>
  );
}
function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-300">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
        required
      />
    </div>
  );
}

function Textarea({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-300">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
        required
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-300">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
        required
      >
        <option value="">Select a guild</option>
        <option value="emberforge">The Emberforge</option>
        <option value="verdant">The Verdant Circle</option>
        <option value="obsidian">The Obsidian Veil</option>
        <option value="astral">The Astral Conclave</option>
      </select>
    </div>
  );
}