import React from 'react';
import { useClipboard } from '@/hooks/useClipboard';

export default function GeneratedLinkModal({ notice, onClose }) {
  const { copied, copy } = useClipboard();

  if (!notice) return null;

  const url = notice.url || (typeof window !== 'undefined' ? `${window.location.origin}/notice-verification/${notice.token}` : '');
  const isValid = notice.isValid !== false;

  return (
    <div className="modal-backdrop" onClick={onClose} dir="rtl">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-top">
          <div className="modal-icon-circle">✓</div>
          <div className="modal-header-text">
            <h3 className="modal-title">تم حفظ التصريح وإنشاء الرابط</h3>
            <p className="modal-subtitle">انسخ الرابط وشاركه لعرض صفحة التحقق المعتمدة فوراً</p>
          </div>
          <button type="button" className="modal-close-icon" onClick={onClose} aria-label="إغلاق">
            ✕
          </button>
        </div>

        {/* Quick summary badges */}
        <div className="modal-summary-row">
          <div className="summary-pill">
            <span className="pill-muted">رقم التصريح:</span>
            <strong>#{notice.noticeNumber || '—'}</strong>
          </div>
          <div className="summary-pill">
            <span className="pill-muted">العامل:</span>
            <strong>{notice.workerName || '—'}</strong>
          </div>
          <div className="summary-pill">
            <span className={`status-tag ${isValid ? 'tag-valid' : 'tag-invalid'}`}>
              <span className="tag-dot" />
              <span>{isValid ? 'ساري' : 'منتهي'}</span>
            </span>
          </div>
        </div>

        {/* URL Box with 1-Click Copy */}
        <div className="modal-url-box">
          <label className="url-box-label">رابط التحقق المباشر:</label>
          <div className="url-copy-row">
            <input
              type="text"
              readOnly
              value={url}
              className="url-input"
              onClick={(e) => e.target.select()}
              dir="ltr"
            />
            <button
              type="button"
              onClick={() => copy(url)}
              className={`url-copy-btn ${copied ? 'copied' : ''}`}
            >
              {copied ? 'تم النسخ ✓' : 'نسخ الرابط'}
            </button>
          </div>
          {copied && (
            <p className="copy-feedback-msg">✓ تم نسخ الرابط إلى الحافظة بنجاح!</p>
          )}
        </div>

        {/* Footer actions */}
        <div className="modal-bottom">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-btn-preview"
          >
            فتح الرابط ومعاينته ↗
          </a>
          <button
            type="button"
            onClick={onClose}
            className="modal-btn-dismiss"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
