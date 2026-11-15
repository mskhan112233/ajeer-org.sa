import { NextResponse } from 'next/server';
import { getAssetsFromFirestore, DEFAULT_ASSETS } from '@/lib/firestoreAssets';

export async function GET() {
  try {
    const assets = await getAssetsFromFirestore();
    return NextResponse.json({ success: true, data: assets });
  } catch (error) {
    return NextResponse.json({ success: true, data: DEFAULT_ASSETS });
  }
}
