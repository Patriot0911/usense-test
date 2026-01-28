import type { IGifResponse } from '@/types/gifs/gif';
import axios from 'axios';

export async function fetchGifsByQuery(
  q: string,
  page: number = 1,
  pageSize: number = 24,
  signal?: AbortSignal
): Promise<IGifResponse> {
  const { data } = await axios.get('/api/giphy', {
    params: { q, page, pageSize },
    signal,
    timeout: 8000,
  });

  return data;
}
