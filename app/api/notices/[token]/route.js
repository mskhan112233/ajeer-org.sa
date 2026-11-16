import { NextResponse } from 'next/server';
import { findNotice, deleteSavedNotice } from '@/lib/storage';
import { getNoticeFromFirestore, deleteNoticeFromFirestore } from '@/lib/firestoreNotices';

export async function GET(request, { params }) {
  try {
    const token = params?.token ? decodeURIComponent(params.token) : null;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Token missing' }, { status: 400 });
    }

    // Try Firestore first
    let notice = null;
    try {
      notice = await getNoticeFromFirestore(token);
    } catch (e) {
      console.warn('Firestore fetch notice fallback:', e.message);
    }

    // Local fallback if not in Firestore
    if (!notice) {
      notice = findNotice(token);
    }

    return NextResponse.json(
      { success: true, data: notice },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const token = params?.token ? decodeURIComponent(params.token) : null;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Token missing' }, { status: 400 });
    }

    // Delete from Firestore
    try {
      await deleteNoticeFromFirestore(token);
    } catch (e) {
      console.warn('Firestore delete warning:', e.message);
    }

    // Delete from local storage
    const res = deleteSavedNotice(token);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
