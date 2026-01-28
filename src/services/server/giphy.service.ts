import type { IGiphySearchParams } from '@/types/gifs/gif';
import { giphyClient } from './giphy.client';

export async function searchGifs(params: IGiphySearchParams) {
  const { q, limit = 24, offset = 0 } = params;

  const endpoint = q ? '/search' : '/trending';

  const { data } = await giphyClient.get(endpoint, {
    params: {
      q,
      limit,
      offset,
    },
  });

  return data;
}
