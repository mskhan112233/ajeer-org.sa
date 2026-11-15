import React from 'react';

/**
 * Ultra-clean, modern segmented pill status selector
 */
export default function StatusToggle({ isValid, onChange }) {
  return (
    <div className="status-segment-wrapper">
      <span className="status-segment-label">حالة صلاحية التصريح (Permit Validity Status):</span>
      <div className="status-segment-control">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`status-segment-btn segment-valid ${isValid ? 'active' : ''}`}
        >
          <span className="dot-indicator dot-valid" />
          <span>ساري / فعال (Valid / Active)</span>
        </button>

        <button
          type="button"
          onClick={() => onChange(false)}
          className={`status-segment-btn segment-invalid ${!isValid ? 'active' : ''}`}
        >
          <span className="dot-indicator dot-invalid" />
          <span>منتهي / ملغي (Expired / Cancelled)</span>
        </button>
      </div>
    </div>
  );
}
