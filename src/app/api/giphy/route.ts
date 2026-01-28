import { searchGifs } from '@/services/server/giphy.service';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get('q') ?? undefined;
    const limit = Number(searchParams.get('limit') ?? 24);
    const offset = Number(searchParams.get('offset') ?? 0);

    const data = await searchGifs({ q, limit, offset });

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (e) {
    return NextResponse.json(
      { message: 'Failed to fetch gifs' },
      { status: 500 },
    );
  }
}
