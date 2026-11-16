import React from 'react';
import { useClipboard } from '@/hooks/useClipboard';
import { sanitizeVerificationUrl } from '@/lib/token';

export default function GeneratedLinkModal({ notice, onClose, onViewAll }) {
  const { copied, copy } = useClipboard();

  if (!notice) return null;

  const url = sanitizeVerificationUrl(notice.url, notice.token);
  const isValid = notice.isValid !== false;

  return (
    <div className="modal-backdrop" onClick={onClose} dir="rtl">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-top">
          <div className="modal-icon-circle">✓</div>
          <div className="modal-header-text">
            <h3 className="modal-title">تم حفظ التصريح في فايربيس (Notice Saved to Firebase)</h3>
            <p className="modal-subtitle">انسخ الرابط وشاركه لعرض صفحة التحقق فوراً (Copy & share link to view page)</p>
          </div>
          <button type="button" className="modal-close-icon" onClick={onClose} aria-label="إغلاق (Close)">
            ✕
          </button>
        </div>

        {/* Quick summary badges */}
        <div className="modal-summary-row">
          <div className="summary-pill">
            <span className="pill-muted">رقم التصريح (Notice #):</span>
            <strong>#{notice.noticeNumber || '—'}</strong>
          </div>
          <div className="summary-pill">
            <span className="pill-muted">العامل (Worker):</span>
            <strong>{notice.workerName || '—'}</strong>
          </div>
          <div className="summary-pill">
            <span className={`status-tag ${isValid ? 'tag-valid' : 'tag-invalid'}`}>
              <span className="tag-dot" />
              <span>{isValid ? 'ساري (Valid)' : 'منتهي (Expired)'}</span>
            </span>
          </div>
        </div>

        {/* URL Box with 1-Click Copy */}
        <div className="modal-url-box">
          <label className="url-box-label">رابط التحقق المباشر (Direct Verification Link):</label>
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
              {copied ? 'تم النسخ ✓ (Copied)' : 'نسخ الرابط (Copy Link)'}
            </button>
          </div>
          {copied && (
            <p className="copy-feedback-msg">✓ تم نسخ الرابط إلى الحافظة بنجاح! (Link copied successfully!)</p>
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
            فتح الرابط ومعاينته ↗ (Open & View Link)
          </a>

          {onViewAll && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onViewAll();
              }}
              className="modal-btn-view-all"
            >
              📋 عرض في سجل الروابط (View in All Data)
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="modal-btn-dismiss"
          >
            إغلاق (Close)
          </button>
        </div>
      </div>
    </div>
  );
}
