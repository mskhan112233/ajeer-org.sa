import { NextResponse } from 'next/server';
import { getAssetsFromFirestore, DEFAULT_ASSETS } from '@/lib/firestoreAssets';

export async function GET() {
  try {
    const assets = await getAssetsFromFirestore();
    return NextResponse.json(
      { success: true, data: assets },
      {
        headers: {
          'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800'
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: true, data: DEFAULT_ASSETS },
      {
        headers: {
          'Cache-Control': 'public, max-age=86400, s-maxage=86400'
        }
      }
    );
  }
}
