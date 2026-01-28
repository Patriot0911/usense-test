import { NextResponse } from 'next/server';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    api_key: process.env.GIPHY_API_KEY,
    rating: 'g',
  },
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  // todo: to service layer
  const { data } = await axiosClient.get(q ? '/search' : '/trending',
    {
      params: {
        q,
        limit: 24,
      },
    },
  );

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
