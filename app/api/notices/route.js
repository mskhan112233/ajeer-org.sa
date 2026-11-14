import { NextResponse } from 'next/server';
import { getSavedNotices, saveNotice } from '@/lib/storage';

export async function GET() {
  try {
    const notices = getSavedNotices();
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

    const res = saveNotice(body);
    if (!res.success) {
      return NextResponse.json({ success: false, error: res.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
