import React from 'react';
import NoticeVerificationClient from '@/components/verification/NoticeVerificationClient';
import { getNoticeFromFirestore } from '@/lib/firestoreNotices';
import { findNotice } from '@/lib/storage';
import { parseNoticeToken } from '@/lib/token';
import { EMPTY_NOTICE_TEMPLATE } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default async function NoticeVerificationPage({ params }) {
  let token = null;
  if (params?.token) {
    try {
      token = decodeURIComponent(params.token);
    } catch {
      token = params.token;
    }
  }

  let resolvedNotice = null;
  let serverResolved = false;

  if (token) {
    // 1. Fetch live notice directly from Firebase Firestore on the server (eliminates wrong-data flash)
    try {
      const cloudNotice = await getNoticeFromFirestore(token);
      if (cloudNotice) {
        resolvedNotice = cloudNotice;
        serverResolved = true;
      }
    } catch (e) {
      console.warn('SSR Firestore fetch note:', e?.message);
    }

    // 2. Local storage / legacy embedded-token fallback if not found in Firestore
    if (!resolvedNotice) {
      const localMatch = findNotice(token);
      if (localMatch) {
        resolvedNotice = localMatch;
        serverResolved = Boolean(localMatch.workerName);
      }
    }

    // 3. JWT claims fallback (only noticeNumber, dates, status — zero hardcoded personal data)
    if (!resolvedNotice) {
      resolvedNotice = parseNoticeToken(token);
    }
  }

  const initialData = JSON.parse(
    JSON.stringify({
      ...EMPTY_NOTICE_TEMPLATE,
      ...(resolvedNotice || {})
    })
  );

  return (
    <NoticeVerificationClient
      initialData={initialData}
      token={token}
      serverResolved={serverResolved}
    />
  );
}
