import React from 'react';

/**
 * Reusable verification status badge with authentic Ajeer styling
 */
export default function VerificationResultBadge({ isValid = true, statusText = null }) {
  const displayStatus = statusText || (isValid ? 'ساري / فعال' : 'منتهي / ملغي');
  const statusClass = isValid ? 'verification-result--valid' : 'verification-result--invalid';

  return (
    <strong className={`verification-result ${statusClass}`}>
      {displayStatus}
    </strong>
  );
}
