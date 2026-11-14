import React, { useState, useMemo } from 'react';
import NoticeHistoryRow from './NoticeHistoryRow';
import EmptyState from '@/components/common/EmptyState';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function NoticeHistory({
  history = [],
  onEdit,
  onDelete,
  loading = false
}) {
  const [search, setSearch] = useState('');
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const filtered = useMemo(() => {
    if (!search.trim()) return history;
    const q = search.toLowerCase();
    return history.filter(item =>
      (item.noticeNumber && item.noticeNumber.toLowerCase().includes(q)) ||
      (item.workerName && item.workerName.toLowerCase().includes(q)) ||
      (item.iqamaNumber && item.iqamaNumber.toLowerCase().includes(q)) ||
      (item.facilityName && item.facilityName.toLowerCase().includes(q))
    );
  }, [history, search]);

  return (
    <div className="admin-history-panel" dir="rtl">
      {/* Header with Search */}
      <div className="history-panel-header">
        <div className="history-title-box">
          <h2 className="history-title">التصاريح المحفوظة سابقاً</h2>
          <span className="history-count">({history.length})</span>
        </div>

        <div className="history-search-wrapper">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث برقم التصريح، اسم العامل، أو الإقامة..."
            className="history-search-input"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="history-table-wrapper">
        {loading ? (
          <div className="history-loading">
            <LoadingSpinner text="جاري تحميل السجل..." />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="📭"
            title={search ? 'لا توجد نتائج مطابقة' : 'لا توجد تصاريح محفوظة'}
            description={search ? 'جرّب البحث بكلمات أخرى' : 'قم بتعبئة النموذج أعلاه والضغط على حفظ لإنشاء أول تصريح ورابط'}
          />
        ) : (
          <table className="clean-table">
            <thead>
              <tr>
                <th>رقم التصريح</th>
                <th>العامل</th>
                <th>المنشأة</th>
                <th>فترة الصلاحية</th>
                <th>الحالة</th>
                <th className="text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <NoticeHistoryRow
                  key={item.token || item.id || index}
                  notice={item}
                  origin={origin}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
