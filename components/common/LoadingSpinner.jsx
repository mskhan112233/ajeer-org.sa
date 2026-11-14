import React from 'react';

export default function LoadingSpinner({ text = 'جاري التحميل...', size = 'medium' }) {
  return (
    <div className={`loading-spinner-wrapper loading-spinner-${size}`}>
      <div className="loading-spinner-ring" />
      {text && <span className="loading-spinner-text">{text}</span>}
    </div>
  );
}
