import { useEffect, useRef, useState } from 'react';
import { searchGifs } from '@/services/client/giphy.service';

export function useGifSearch(query: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cache = useRef<Map<string, any[]>>(new Map());
  const abort = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!query) return;

    if (cache.current.has(query)) {
      setData(cache.current.get(query)!);
      return;
    }

    abort.current?.abort();
    abort.current = new AbortController();

    setLoading(true);
    setError(null);

    const id = setTimeout(async () => {
      try {
        const res = await searchGifs(query);
        cache.current.set(query, res);
        setData(res);
      } catch (e) {
        setError('Не вдалося отримати GIF');
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(id);
  }, [query]);

  return { data, loading, error };
}
