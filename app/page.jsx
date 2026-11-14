'use client';

import React, { useState, useEffect } from 'react';
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VerificationDocument from '@/components/verification/VerificationDocument';
import { useNoticeData } from '@/hooks/useNoticeData';
import { DEFAULT_NOTICE_DATA } from '@/lib/constants';
import { useMounted } from '@/hooks/useMounted';
import { DEFAULT_NOTICE_DATA } from '@/static-data';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const isMounted = useMounted();
  const { data } = useNoticeData(DEFAULT_NOTICE_DATA);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className="qiwa-ajeer-app"
        style={{ minHeight: '100vh', background: '#f5f7f9' }}
        suppressHydrationWarning
      />
    );
  }

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
