import React from 'react';
import VerificationTableSectionHeader from './VerificationTableSectionHeader';
import VerificationTableRow from './VerificationTableRow';

export default function FacilityDetailsSection({ data = {} }) {
  return (
    <table className="verification-table" dir="rtl">
      <tbody>
        <VerificationTableSectionHeader title={data.section3Title || "بيانات المنشأة"} />
        <VerificationTableRow
          label1={data.facilityNumberLabel || "رقم المنشأة"}
          value1={data.facilityNumber || ""}
          label2={data.facilityNameLabel || "اسم المنشأة"}
          value2={data.facilityName || ""}
        />
      </tbody>
    </table>
  );
}
