import React from 'react';
import CopyButton from '@/components/common/CopyButton';

export default function NoticeHistoryRow({
  notice,
  origin = '',
  onEdit,
  onDelete
}) {
  const token = notice.token || '';
  const directUrl = notice.url || (origin ? `${origin}/notice-verification/${token}` : `/notice-verification/${token}`);
  const isNoticeValid = notice.isValid !== false;

  return (
    <tr className="history-row">
      {/* Notice Number */}
      <td className="cell-notice-num">
        <span className="code-tag">{notice.noticeNumber || 'بدون رقم'}</span>
      </td>

      {/* Worker Name & Iqama */}
      <td className="cell-worker">
        <div className="worker-name">{notice.workerName || '-'}</div>
        <div className="worker-id">{notice.iqamaNumber || ''}</div>
      </td>

      {/* Facility Name */}
      <td className="cell-facility" title={notice.facilityName}>
        {notice.facilityName || '-'}
      </td>

      {/* Validity Dates */}
      <td className="cell-dates">
        <span>{notice.startDate || '-'}</span>
        <span className="date-arrow">←</span>
        <span>{notice.endDate || '-'}</span>
      </td>

      {/* Status Badge */}
      <td className="cell-status">
        <span className={`status-tag ${isNoticeValid ? 'tag-valid' : 'tag-invalid'}`}>
          <span className="tag-dot" />
          <span>{isNoticeValid ? 'ساري (Valid)' : 'منتهي (Expired)'}</span>
        </span>
      </td>

      {/* Generated Link & Actions */}
      <td className="cell-actions">
        <div className="actions-wrapper">
          <CopyButton
            text={directUrl}
            className="row-action-btn btn-copy"
            defaultLabel="نسخ (Copy)"
            copiedLabel="تم ✓ (Copied)"
            icon="🔗"
          />

          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="row-action-btn btn-view"
            title="فتح صفحة التحقق المعتمدة (Open Verification Page)"
          >
            فتح ↗ (Open)
          </a>

          <button
            type="button"
            onClick={() => onEdit(notice)}
            className="row-action-btn btn-edit"
            title="تعديل هذا التصريح (Edit Notice)"
          >
            تعديل (Edit)
          </button>

          <button
            type="button"
            onClick={() => onDelete(token)}
            className="row-action-btn btn-delete"
            title="حذف هذا التصريح (Delete Notice)"
          >
            ✕ حذف (Delete)
          </button>
        </div>
        {/* URL Path snippet (Clickable directly to open page) */}
        <div className="row-url-preview" title="اضغط لفتح صفحة التحقق (Click to open verification page)">
          <a href={directUrl} target="_blank" rel="noopener noreferrer" className="row-direct-link">
            <code>{directUrl.length > 50 ? `${directUrl.slice(0, 48)}...` : directUrl}</code>
          </a>
        </div>
      </td>
    </tr>
  );
}
