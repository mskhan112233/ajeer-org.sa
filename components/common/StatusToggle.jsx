import React from 'react';

/**
 * Ultra-clean, modern segmented pill status selector
 */
export default function StatusToggle({ isValid, onChange }) {
  return (
    <div className="status-segment-wrapper">
      <span className="status-segment-label">حالة صلاحية التصريح:</span>
      <div className="status-segment-control">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`status-segment-btn segment-valid ${isValid ? 'active' : ''}`}
        >
          <span className="dot-indicator dot-valid" />
          <span>ساري / فعال</span>
        </button>

        <button
          type="button"
          onClick={() => onChange(false)}
          className={`status-segment-btn segment-invalid ${!isValid ? 'active' : ''}`}
        >
          <span className="dot-indicator dot-invalid" />
          <span>منتهي / ملغي</span>
        </button>
      </div>
    </div>
  );
}
