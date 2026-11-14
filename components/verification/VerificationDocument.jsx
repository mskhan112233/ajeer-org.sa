import React from 'react';
import VerificationHeader from './VerificationHeader';
import NoticeDetailsSection from './NoticeDetailsSection';
import WorkerDetailsSection from './WorkerDetailsSection';
import FacilityDetailsSection from './FacilityDetailsSection';

export default function VerificationDocument({ data = {} }) {
  const verificationMessage = data?.verificationMessage || "تم التحقق من التصريح بنجاح";

  return (
    <div className="verification-document" id="verification-content" dir="rtl">
      <VerificationHeader data={data} />
      
      <div className="verification-copy">
        <p>{verificationMessage}</p>
      </div>

      <NoticeDetailsSection data={data} />
      <WorkerDetailsSection data={data} />
      <FacilityDetailsSection data={data} />
    </div>
  );
}
