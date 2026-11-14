import { NextResponse } from 'next/server';
import { findNotice, deleteSavedNotice } from '@/lib/storage';

export async function GET(request, { params }) {
  try {
    const token = params?.token ? decodeURIComponent(params.token) : null;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Token missing' }, { status: 400 });
    }

    const notice = findNotice(token);
    return NextResponse.json({ success: true, data: notice });
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

    const res = deleteSavedNotice(token);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
