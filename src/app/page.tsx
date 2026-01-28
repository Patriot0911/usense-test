'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import Input from '@/components/ui/Input';
import Skeleton from '@/components/gifs/Skeleton';
import { useGifSearch } from '@/hooks/useGifSearch';
import { BiSearch } from 'react-icons/bi';

const GifGrid = dynamic(() => import('@/components/gifs/GifGrid'), {
  loading: () => <Skeleton />,
  ssr: false,
});

const HomePage = () => {
  const [query, setQuery] = useState('');
  const { data, loading, error } = useGifSearch(query);

  return (
    <div className="max-w-6xl mx-auto p-6">

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        icon={BiSearch({ size: 24, color: 'var(--color-text-secondary-500)' })}
        placeholder={"Search GIF..."}
      />

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

      <Suspense fallback={<Skeleton />}>
        {loading ? <Skeleton /> : <GifGrid data={data} />}
      </Suspense>
    </div>
  );
}

export default HomePage;
