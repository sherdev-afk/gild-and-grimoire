'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface Listing {
  id: string;
  title: string;
  description?: string;
  price?: number;
  image_url?: string;
  seller?: string;
}

export default function SellerProfile() {
  const params = useParams() as Record<string, string> | null;
  const sellerParam = params?.seller ?? '';
  const sellerName = decodeURIComponent(sellerParam);

  const [relics, setRelics] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!sellerName) return;

    const fetchListings = async () => {
      const { data } = await supabase
        .from('relics')
        .select('*')
        .eq('seller', sellerName);

      if (data) setRelics(data);
      setLoading(false);
    };

    fetchListings();
  }, [sellerName]);

  return (
    <div className="p-8 text-white max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-amber-400">🛒 Seller: {sellerName}</h1>
      <p className="text-gray-300 mb-6">
        Artifacts forged and listed by <strong>{sellerName}</strong>. Browse their relics and support their crafting journey.
      </p>

      {loading ? (
        <p className="italic text-gray-500">Fetching relics from seller vault...</p>
      ) : relics.length === 0 ? (
        <p className="italic text-gray-500">This seller has not listed any relics.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relics.map((relic) => (
            <div key={relic.id} className="bg-zinc-900 border border-amber-500 rounded p-4">
              {relic.image_url && (
                <Image
                  src={relic.image_url}
                  alt={relic.title}
                  width={300}
                  height={200}
                  className="rounded mb-2"
                />
              )}
              <h3 className="text-lg font-bold mb-1">{relic.title}</h3>
              <p className="text-sm text-gray-300 mb-2">{relic.description}</p>
              <p className="text-sm text-green-400 font-semibold">💰 {relic.price ?? 'N/A'} coins</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}