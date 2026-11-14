import React from 'react';
import VerificationTableSectionHeader from './VerificationTableSectionHeader';
import VerificationTableRow from './VerificationTableRow';

export default function WorkerDetailsSection({ data = {} }) {
  return (
    <table className="verification-table" dir="rtl">
      <tbody>
        <VerificationTableSectionHeader title={data.section2Title || "بيانات العامل"} />
        <VerificationTableRow
          label1={data.workerNameLabel || "اسم العامل"}
          value1={data.workerName || ""}
          label2={data.iqamaNumberLabel || "رقم الهوية / الإقامة"}
          value2={data.iqamaNumber || ""}
        />
        <VerificationTableRow
          label1={data.nationalityLabel || "الجنسية"}
          value1={data.nationality || ""}
          label2={data.occupationLabel || "المهنة"}
          value2={data.occupation || ""}
        />
        <VerificationTableRow
          label1={data.genderLabel || "الجنس"}
          value1={data.gender || "ذكر"}
          label2={data.birthDateLabel || "تاريخ الميلاد"}
          value2={data.birthDate || "-"}
        />
      </tbody>
    </table>
  );
}
