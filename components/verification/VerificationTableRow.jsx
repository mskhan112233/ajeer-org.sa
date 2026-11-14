import React from 'react';

/**
 * Reusable table row for verification tables (supports 2-column or 4-column key-value pairs)
 */
export default function VerificationTableRow({
  label1,
  value1,
  label2 = null,
  value2 = null
}) {
  return (
    <tr>
      <th className="verification-table__label">{label1}</th>
      <td className="verification-table__value">{value1 ?? ''}</td>
      {label2 !== null && (
        <>
          <th className="verification-table__label">{label2}</th>
          <td className="verification-table__value">{value2 ?? ''}</td>
        </>
      )}
    </tr>
  );
}
