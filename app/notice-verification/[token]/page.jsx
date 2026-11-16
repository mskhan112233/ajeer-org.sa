'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VerificationDocument from '@/components/verification/VerificationDocument';
import { useNoticeData } from '@/hooks/useNoticeData';
import { useMounted } from '@/hooks/useMounted';

export default function NoticeVerificationPage() {
  const params = useParams();
  const token = params?.token ? decodeURIComponent(params.token) : null;
  const { data } = useNoticeData(null, token);

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
