import { NextResponse } from 'next/server';
import { getSavedNotices, saveNotice } from '@/lib/storage';
import { getAllNoticesFromFirestore, saveNoticeToFirestore } from '@/lib/firestoreNotices';

export async function GET() {
  try {
    // Try fetching from Firestore first
    let firestoreNotices = [];
    try {
      firestoreNotices = await getAllNoticesFromFirestore();
    } catch (e) {
      console.warn('Firestore fetch fallback:', e.message);
    }

    // Local fallback
    const localNotices = getSavedNotices() || [];

    // Merge by token or noticeNumber, giving Firestore priority
    const mergedMap = new Map();
    localNotices.forEach((n) => {
      const key = n?.token || n?.noticeNumber;
      if (key) mergedMap.set(key, n);
    });
    firestoreNotices.forEach((n) => {
      const key = n?.token || n?.noticeNumber;
      if (key) mergedMap.set(key, n);
    });

    const notices = Array.from(mergedMap.values());
    notices.sort((a, b) => {
      const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    });
    return NextResponse.json(
      { success: true, data: notices },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=60'
        }
      }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || !body.noticeNumber) {
      return NextResponse.json(
        { success: false, error: 'رقم التصريح مطلوب' },
        { status: 400 }
      );
    }

    // 1. Save locally for fallback
    const res = saveNotice(body);
    if (!res.success) {
      return NextResponse.json({ success: false, error: res.error }, { status: 500 });
    }

    // 2. Ensure saved to Cloud Firestore
    try {
      const cloudRes = await saveNoticeToFirestore(body);
      console.log('Notice saved to Firestore:', body.noticeNumber, cloudRes);
    } catch (err) {
      console.error('Firestore save error:', err);
    }

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
