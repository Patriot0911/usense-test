import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ data: [] });
  }

  const { data } = await axios.get(
    'https://api.giphy.com/v1/gifs/search',
    {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        q,
        limit: 24,
        rating: 'g',
      },
    },
  );

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
