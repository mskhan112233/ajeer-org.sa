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
    <div className="admin-history-card" dir="rtl">
      {/* Header with Search */}
      <div className="history-card-header">
        <div className="flex items-center gap-3">
          <div className="section-icon">🗂️</div>
          <div>
            <h2 className="section-title">سجل التصاريح المحفوظة</h2>
            <p className="section-subtitle">
              إجمالي {history.length} تصريح تم إنشاؤه مسبقاً
            </p>
          </div>
        </div>

        <div className="history-search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث برقم التصريح، اسم العامل، أو الإقامة..."
            className="search-input"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="history-table-container">
        {loading ? (
          <div className="p-8 text-center">
            <LoadingSpinner text="جاري تحميل سجل التصاريح..." />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={search ? '🔍' : '📭'}
            title={search ? 'لا توجد نتائج مطابقة لبحثك' : 'لا توجد تصاريح محفوظة حتى الآن'}
            description={search ? 'جرّب البحث بكلمات أخرى أو تحقق من رقم الإقامة أو رقم التصريح' : 'قم بتعبئة النموذج أعلاه والضغط على حفظ لإنشاء أول تصريح ورابط'}
          />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>رقم التصريح</th>
                <th>اسم العامل</th>
                <th>المنشأة</th>
                <th>الصلاحية</th>
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
