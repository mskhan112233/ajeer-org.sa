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

    // Merge by token, giving Firestore priority or local fallback
    const mergedMap = new Map();
    localNotices.forEach((n) => {
      if (n && n.token) mergedMap.set(n.token, n);
    });
    firestoreNotices.forEach((n) => {
      if (n && n.token) mergedMap.set(n.token, n);
    });

    const notices = Array.from(mergedMap.values());
    return NextResponse.json({ success: true, data: notices });
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
