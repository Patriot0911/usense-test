'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import Input from '@/components/ui/Input';
import Skeleton from '@/components/gifs/Skeleton';
import { useGifSearch } from '@/hooks/useGifSearch';
import styles from './styles.module.scss';
import { BiSearch } from 'react-icons/bi';

const GifGrid = dynamic(() => import('../GifGrid'), {
  loading: () => <Skeleton />,
  ssr: false,
});

const GifSection = () => {
  const [query, setQuery] = useState('');
  const { data, isLoading, error, ...res } = useGifSearch(query);

  return (
    <section className={styles.section}>
      <div className={styles.searchWrapper}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={BiSearch({ size: 24, })}
          placeholder="Search GIF..."
        />
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <Suspense fallback={<Skeleton />}>
        {(isLoading && data.length === 0)
          ? <Skeleton />
          : (
            <GifGrid
              data={data}
              isLoading={isLoading}
              {...res}
            />
          )
        }
      </Suspense>
    </section>
  );
};

export default GifSection;
