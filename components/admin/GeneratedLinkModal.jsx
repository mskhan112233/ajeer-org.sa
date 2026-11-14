import React from 'react';
import { useClipboard } from '@/hooks/useClipboard';

export default function GeneratedLinkModal({ notice, onClose }) {
  const { copied, copy } = useClipboard();

  if (!notice) return null;

  const url = notice.url || (typeof window !== 'undefined' ? `${window.location.origin}/notice-verification/${notice.token}` : '');
  const isValid = notice.isValid !== false;

  return (
    <div className="modal-backdrop" onClick={onClose} dir="rtl">
      <div className="modal-box-clean" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-clean">
          <div className="modal-check-icon">✓</div>
          <div>
            <h3 className="modal-heading">تم حفظ التصريح وإنشاء الرابط بنجاح!</h3>
            <p className="modal-desc">
              يمكنك نسخ الرابط المباشر ومشاركته مع العميل لعرض التصريح المعتمد
            </p>
          </div>
          <button type="button" className="modal-btn-close" onClick={onClose} aria-label="إغلاق">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body-clean">
          {/* Summary Pills */}
          <div className="modal-info-summary">
            <div className="info-item">
              <span className="info-label">رقم التصريح:</span>
              <strong className="info-val">#{notice.noticeNumber || "—"}</strong>
            </div>
            <div className="info-item">
              <span className="info-label">اسم العامل:</span>
              <strong className="info-val">{notice.workerName || "—"}</strong>
            </div>
            <div className="info-item">
              <span className="info-label">الحالة:</span>
              <span className={`clean-badge ${isValid ? 'badge-active' : 'badge-expired'}`}>
                {isValid ? "🟢 ساري / فعال" : "🔴 منتهي / ملغي"}
              </span>
            </div>
          </div>

          {/* Generated URL Box */}
          <div className="modal-url-section">
            <label className="url-label">رابط التحقق المباشر من التصريح:</label>
            <div className="url-input-group">
              <input
                type="text"
                readOnly
                value={url}
                className="url-field"
                onClick={(e) => e.target.select()}
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => copy(url)}
                className={`btn-copy-main ${copied ? 'copied' : ''}`}
              >
                {copied ? '✓ تم النسخ!' : '📋 نسخ الرابط'}
              </button>
            </div>
            {copied && (
              <p className="copy-hint-msg">
                ✓ تم نسخ الرابط بنجاح إلى الحافظة! يمكنك لصقه وإرساله الآن.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer-clean">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modal-preview"
          >
            <span>معاينة الرابط في صفحة جديدة ↗</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="btn-modal-close"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
