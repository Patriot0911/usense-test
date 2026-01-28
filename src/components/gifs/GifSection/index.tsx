'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import Input from '@/components/ui/Input';
import Skeleton from '@/components/gifs/Skeleton';
import { useGifSearch } from '@/hooks/useGifSearch';
import styles from './styles.module.scss';

const GifGrid = dynamic(() => import('../GifGrid'), {
  loading: () => <Skeleton />,
  ssr: false,
});

const GifSection = () => {
  const [query, setQuery] = useState('');
  const { data, isLoading, error, nextPage, prevPage, totalCount, pageSize } = useGifSearch(query);

  return (
    <section className={styles.section}>

      <div className={styles.searchWrapper}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GIF..."
        />
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <Suspense fallback={<Skeleton />}>
        {isLoading
          ? <Skeleton />
          : <GifGrid data={data} />}
      </Suspense>

    </section>
  );
};

export default GifSection;
