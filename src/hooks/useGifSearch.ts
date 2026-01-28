import type { IGifData } from '@/types/gifs/gif';
import { useEffect, useRef, useState } from 'react';
import { fetchGifsByQuery, } from '@/services/client/giphy.service';
import { CanceledError } from 'axios';

type ICacheEntry = {
  data: IGifData[];
  timestamp: number;
};

const CACHE_TTL = 60_000;
const TRENDING_KEY = '__TRENDING__';

export function useGifSearch(query: string) {
  const [data, setData] = useState<IGifData[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const offset = useRef(0);
  const cache = useRef<Map<string, ICacheEntry>>(new Map());
  const abort = useRef<AbortController | null>(null);

  const load = async (reset: boolean = false) => {
    const key = `${query}--${offset.current}` || `${TRENDING_KEY}--${offset.current}`;

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
      const { data: fetchedData, pagination } = await fetchGifsByQuery(query, reset ? 0 : offset.current, abort.current.signal);

      cache.current.set(key, {
        data: fetchedData,
        timestamp: Date.now(),
      });

      setData(prev =>
        reset ? fetchedData : [...prev, ...fetchedData]
      );
      offset.current += pagination.count;
      setHasMore(offset.current < pagination.total_count);
    } catch (e) {
      setError(resolveError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    offset.current = 0;
    setHasMore(true);
    load(true);
  }, [query]);

  return { data, isLoading, error, loadMore: () => load(), hasMore };
};

function resolveError(e: unknown): string {
  if (e instanceof CanceledError) return '';

  if (e instanceof Error) {
    if (e.message.includes('timeout')) return 'Request timeout';
    if (e.message.includes('Network')) return 'Network error';
    return e.message;
  }

  return 'Unknown error';
}

