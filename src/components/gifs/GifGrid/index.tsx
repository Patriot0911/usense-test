'use client';

import type { IGifGridProps } from '@/types/gifs/gif-gird';
import type { IGifData } from '@/types/gifs/gif';
import { useEffect, useRef, useState } from 'react';
import SkeletonCard from '../Skeleton/components/SkeletonCard';
import GifCard from '../GifCard';
import GifModal from '../GifModal';

import styles from './styles.module.scss';

const GifGrid = ({ data, hasMore, isLoading, loadMore }: IGifGridProps) => {
  const [active, setActive] = useState<IGifData | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bottomRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!hasMore || isLoading || !entry.isIntersecting) return;
        loadMore();
      },
      { rootMargin: '200px' }
    );

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <>
      <div className={styles.grid}>
        {data.map(gif => (
          <GifCard
            key={gif.id}
            gif={gif}
            onClick={() => setActive(gif)}
          />
        ))}
        {isLoading && (
          Array.from({ length: 24 }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))
        )}
      </div>

      <div ref={bottomRef} className={styles.sentinel} />

      {isLoading && (
        <div className={styles.loading}>Loading more...</div>
      )}

      {!hasMore && (
        <div className={styles.end}>That’s all! No more GIFs</div>
      )}

      {active && (
        <GifModal gif={active} onClose={() => setActive(null)} />
      )}
    </>
  );
}

export default GifGrid;
