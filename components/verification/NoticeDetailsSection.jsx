import React from 'react';
import VerificationTableSectionHeader from './VerificationTableSectionHeader';
import VerificationTableRow from './VerificationTableRow';

export default function NoticeDetailsSection({ data = {} }) {
  return (
    <table className="verification-table" dir="rtl">
      <tbody>
        <VerificationTableSectionHeader title={data.section1Title || "بيانات التصريح"} />
        <VerificationTableRow
          label1={data.noticeNumberLabel || "رقم التصريح"}
          value1={data.noticeNumber || ""}
          label2={data.noticeTypeLabel || "نوع التصريح"}
          value2={data.noticeType || "تصريح إعارة أجير"}
        />
        <VerificationTableRow
          label1={data.startDateLabel || "تاريخ بداية التصريح"}
          value1={data.startDate || ""}
          label2={data.endDateLabel || "تاريخ نهاية التصريح"}
          value2={data.endDate || ""}
        />
      </tbody>
    </table>
  );
}
