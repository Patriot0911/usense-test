import type { IGifResponse } from '@/types/gifs/gif';
import axios from 'axios';

export async function fetchGifsByQuery(
  q: string,
  offset: number,
  signal?: AbortSignal
): Promise<IGifResponse> {
  const { data } = await axios.get('/api/giphy', {
    params: { q, offset },
    signal,
    timeout: 8000,
  });

  return data;
}
