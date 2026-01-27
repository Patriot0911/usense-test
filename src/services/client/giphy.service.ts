import axios from 'axios';
import { IGif } from '@/types/gif';

export async function searchGifs(q: string): Promise<IGif[]> {
  const { data } = await axios.get('/api/giphy', {
    params: { q },
  });

  return data.data;
}
