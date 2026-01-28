import { useEffect, useRef, useState } from 'react';
import { fetchGifsByQuery, } from '@/services/client/giphy.service';
import type { IGifData } from '@/types/gifs/gif';

type ICacheEntry = {
  data: IGifData[];
  timestamp: number;
};

const CACHE_TTL = 60_000;
const TRENDING_KEY = '__TRENDING__';

export function useGifSearch(query: string) {
  const [data, setData] = useState<IGifData[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cache = useRef<Map<string, ICacheEntry>>(new Map());
  const abort = useRef<AbortController | null>(null);

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, Math.ceil(totalCount / pageSize)));
  };

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    const run = async () => {
      const key = `${query}--${page}` || `${TRENDING_KEY}--${page}`;

      const cached = cache.current.get(key);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        setData(cached.data);
        return;
      }

      abort.current?.abort();
      abort.current = new AbortController();

      setLoading(true);
      setError(null);

      try {
        const { data: fetchedData, pagination } = await fetchGifsByQuery(query, page, pageSize, abort.current.signal);

        cache.current.set(key, {
          data: fetchedData,
          timestamp: Date.now(),
        });

        setData(fetchedData);
        setTotalCount(pagination.total_count);
      } catch (e: any) {
        setError(resolveError(e));
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => abort.current?.abort();
  }, [query, page, pageSize]);

  return { data, isLoading, error, page, pageSize, totalCount, nextPage, prevPage };
}

function resolveError(e: unknown): string {
  if (e instanceof DOMException && (e.name === 'CanceledError' || e.name === 'canceled')) {
    return '';
  }

  if (e instanceof Error) {
    if (e.message.includes('timeout')) return 'Request timeout';
    if (e.message.includes('Network')) return 'Network error';
    return e.message;
  }

  return 'Unknown error';
}

