import React from 'react';

export default function StatusToggle({ isValid, onChange }) {
  return (
    <div className="status-toggle-card">
      <div className="status-toggle-header">
        <span className="status-toggle-title">🛡️ حالة صلاحية التصريح</span>
        <span className="status-toggle-subtitle">حدد حالة التصريح (سوف تظهر للعميل بلونها المعتمد)</span>
      </div>
      <div className="status-toggle-buttons">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`status-btn valid-btn ${isValid ? 'active' : ''}`}
        >
          <span className="status-indicator">🟢</span>
          <div className="status-text-wrap">
            <strong className="status-main-label">ساري / فعال</strong>
            <span className="status-sub-label">(مقبول ومعتمد رسمياً)</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange(false)}
          className={`status-btn invalid-btn ${!isValid ? 'active' : ''}`}
        >
          <span className="status-indicator">🔴</span>
          <div className="status-text-wrap">
            <strong className="status-main-label">منتهي / ملغي</strong>
            <span className="status-sub-label">(غير صالح أو منتهي الصلاحية)</span>
          </div>
        </button>
      </div>
    </div>
  );
}
