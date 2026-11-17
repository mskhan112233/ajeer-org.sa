'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VerificationDocument from '@/components/verification/VerificationDocument';
import { useNoticeData } from '@/hooks/useNoticeData';

export default function NoticeVerificationClient({
  initialData = null,
  token = null,
  serverResolved = false
}) {
  const { data } = useNoticeData(initialData, token, { serverResolved });

  return (
    <div className="qiwa-ajeer-app" suppressHydrationWarning>
      <Header data={data} />

      <div className="appBody">
        <div className="content" id="content">
          <div>
            <main className="verification-page">
              <VerificationDocument data={data} />
            </main>
          </div>
        </div>
      </div>

      <Footer data={data} />
    </div>
  );
}
