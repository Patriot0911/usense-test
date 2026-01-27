'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import SearchInput from '@/components/gifs/SearchInput';
import Skeleton from '@/components/gifs/Skeleton';
import { useGifSearch } from '@/hooks/useGifSearch';

const GifGrid = dynamic(() => import('@/components/gifs/GifGrid'), {
  loading: () => <Skeleton />,
  ssr: false,
});

const HomePage = () => {
  const [query, setQuery] = useState('');
  const { data, loading, error } = useGifSearch(query);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4"> GIF Search</h1>

      <SearchInput value={query} onChange={setQuery} />

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
