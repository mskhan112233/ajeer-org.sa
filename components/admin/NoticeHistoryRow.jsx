import React from 'react';
import CopyButton from '@/components/common/CopyButton';

/**
 * Reusable table row for saved notices in Admin panel
 */
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
    <tr className="history-table-row">
      {/* Notice Number */}
      <td className="font-mono font-bold text-slate-800">
        <div className="flex items-center gap-2">
          <span className="notice-badge-symbol">#</span>
          <span>{notice.noticeNumber || 'بدون رقم'}</span>
        </div>
      </td>

      {/* Worker Name */}
      <td className="font-medium text-slate-700">
        {notice.workerName || '-'}
      </td>

      {/* Facility Name */}
      <td className="text-slate-600 max-w-xs truncate" title={notice.facilityName}>
        {notice.facilityName || '-'}
      </td>

      {/* Validity Dates */}
      <td className="text-xs text-slate-500 font-mono">
        <div>{notice.startDate || '-'}</div>
        <div className="text-slate-400">إلى {notice.endDate || '-'}</div>
      </td>

      {/* Status Badge */}
      <td>
        <span
          className={`status-pill ${
            isNoticeValid ? 'status-pill-valid' : 'status-pill-invalid'
          }`}
        >
          {isNoticeValid ? 'ساري' : 'منتهي'}
        </span>
      </td>

      {/* Actions */}
      <td className="history-actions-col">
        <div className="history-actions-group">
          {/* 1-Click Copy Button */}
          <CopyButton
            text={directUrl}
            className="action-btn-clean action-btn-copy"
            defaultLabel="نسخ"
            copiedLabel="تم!"
            icon="🔗"
          />

          {/* View Link */}
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn-clean action-btn-view"
            title="معاينة الصفحة"
          >
            <span>👁️</span>
            <span>عرض</span>
          </a>

          {/* Edit Button */}
          <button
            type="button"
            onClick={() => onEdit(notice)}
            className="action-btn-clean action-btn-edit"
            title="تعديل هذا التصريح"
          >
            <span>✏️</span>
            <span>تعديل</span>
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => onDelete(token)}
            className="action-btn-clean action-btn-delete"
            title="حذف هذا التصريح"
          >
            <span>🗑️</span>
          </button>
        </div>
      </td>
    </tr>
  );
}
