import React, { useState, useMemo } from 'react';
import NoticeHistoryRow from './NoticeHistoryRow';
import EmptyState from '@/components/common/EmptyState';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function NoticeHistory({
  history = [],
  onEdit,
  onDelete,
  loading = false,
  onNewNotice,
  onRefresh
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

  const validCount = useMemo(() => history.filter(h => h.isValid !== false).length, [history]);
  const invalidCount = useMemo(() => history.filter(h => h.isValid === false).length, [history]);

  return (
    <div className="admin-history-panel" dir="rtl">
      {/* Top Stats Chips */}
      <div className="history-stats-bar">
        <div className="stat-chip stat-chip-all">
          <span className="stat-chip-label">إجمالي الروابط والتصاريح:</span>
          <span className="stat-chip-val">{history.length}</span>
        </div>
        <div className="stat-chip stat-chip-valid">
          <span className="stat-chip-dot dot-valid" />
          <span className="stat-chip-label">تصاريح سارية:</span>
          <span className="stat-chip-val">{validCount}</span>
        </div>
        <div className="stat-chip stat-chip-invalid">
          <span className="stat-chip-dot dot-invalid" />
          <span className="stat-chip-label">تصاريح منتهية:</span>
          <span className="stat-chip-val">{invalidCount}</span>
        </div>
      </div>

      {/* Header with Search and Actions */}
      <div className="history-panel-header">
        <div className="history-title-box">
          <h2 className="history-title">سجل جميع البيانات والروابط</h2>
          <span className="history-count">({history.length})</span>
        </div>

        <div className="history-header-actions">
          <div className="history-search-wrapper">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث برقم التصريح، اسم العامل، أو الإقامة..."
              className="history-search-input"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="search-clear-btn"
                title="مسح البحث"
              >
                ✕
              </button>
            )}
          </div>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="btn-history-refresh"
              title="تحديث البيانات من السحابة"
            >
              🔄 تحديث
            </button>
          )}

          {onNewNotice && (
            <button
              type="button"
              onClick={onNewNotice}
              className="btn-history-add"
              title="إنشاء تصريح جديد"
            >
              + تصريح جديد
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="history-table-wrapper">
        {loading ? (
          <div className="history-loading">
            <LoadingSpinner text="جاري تحميل السجل..." />
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state-wrapper">
            <EmptyState
              icon="📭"
              title={search ? 'لا توجد نتائج مطابقة' : 'لا توجد تصاريح أو روابط محفوظة'}
              description={search ? 'جرّب البحث بكلمات أخرى أو مسح حقل البحث' : 'لم يتم إنشاء أي تصاريح بعد. اضغط على الزر أدناه لإنشاء أول تصريح ورابط'}
            />
            {!search && onNewNotice && (
              <div className="empty-action-box">
                <button
                  type="button"
                  onClick={onNewNotice}
                  className="nav-btn nav-btn-primary"
                >
                  + إنشاء تصريح جديد الآن
                </button>
              </div>
            )}
          </div>
        ) : (
          <table className="clean-table">
            <thead>
              <tr>
                <th>رقم التصريح</th>
                <th>العامل</th>
                <th>المنشأة</th>
                <th>فترة الصلاحية</th>
                <th>الحالة</th>
                <th className="text-center">الرابط المعتمد والإجراءات</th>
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
