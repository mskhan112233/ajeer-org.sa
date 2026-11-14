import React from 'react';

/**
 * Reusable table section header row for Ajeer verification tables
 */
export default function VerificationTableSectionHeader({ title, colSpan = 4 }) {
  return (
    <tr className="verification-table__section">
      <th colSpan={colSpan}>{title}</th>
    </tr>
  );
}
