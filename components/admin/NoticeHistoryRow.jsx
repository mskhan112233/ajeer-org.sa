import React from 'react';
import CopyButton from '@/components/common/CopyButton';
import { sanitizeVerificationUrl } from '@/lib/token';

export default function NoticeHistoryRow({
  notice,
  origin = '',
  onEdit,
  onDelete
}) {
  const token = notice.token || '';
  const directUrl = sanitizeVerificationUrl(notice.url, token);
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
            defaultLabel="نسخ"
            copiedLabel="تم ✓"
            icon="🔗"
          />

          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="row-action-btn btn-view"
            title="عرض صفحة التحقق المعتمدة (View / Open Notice Page)"
          >
            عرض ↗
          </a>

          <button
            type="button"
            onClick={() => onEdit && onEdit(notice)}
            className="row-action-btn btn-edit"
            title="تعديل هذا التصريح في فايربيس (Edit Notice in Firebase)"
          >
            ✏️ تعديل
          </button>

          <button
            type="button"
            onClick={() => onDelete && onDelete(token, notice.noticeNumber)}
            className="row-action-btn btn-delete"
            title="حذف هذا التصريح نهائياً من فايربيس (Delete Notice from Firebase)"
          >
            ✕
          </button>
        </div>
      </td>
    </tr>
  );
}
