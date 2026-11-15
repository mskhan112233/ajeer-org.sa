'use client';

import React, { useState } from 'react';
import '@/app/admin.css';
import AdminHeader from '@/components/admin/AdminHeader';
import NoticeForm from '@/components/admin/NoticeForm';
import NoticeHistory from '@/components/admin/NoticeHistory';
import GeneratedLinkModal from '@/components/admin/GeneratedLinkModal';
import { useAdminNotices } from '@/hooks/useAdminNotices';

export default function AdminPage() {
  const [activeView, setActiveView] = useState('create'); // 'create' | 'all'

  const {
    formData,
    history,
    loading,
    saving,
    createdNotice,
    showModal,
    setShowModal,
    error,
    isDirty,
    handleChange,
    handleStatusChange,
    handleSave,
    handleDelete,
    handleReset,
    handleEdit,
    fetchHistory
  } = useAdminNotices();

  const handleEditNotice = (record) => {
    handleEdit(record);
    setActiveView('create');
  };

  const handleNewNotice = () => {
    handleReset();
    setActiveView('create');
  };

  return (
    <div className="admin-page-clean" dir="rtl">
      {/* 1. Header with direct All Data button */}
      <AdminHeader
        onReset={handleNewNotice}
        activeView={activeView}
        setActiveView={setActiveView}
        historyCount={history.length}
      />

      <main className="admin-container-clean">
        {/* Error message if any */}
        {error && (
          <div className="admin-error-box">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* 2. Top View Navigation Tabs */}
        <div className="admin-view-nav">
          <button
            type="button"
            onClick={() => setActiveView('create')}
            className={`admin-view-tab ${activeView === 'create' ? 'active' : ''}`}
          >
            <span className="tab-icon">➕</span>
            <span>إنشاء وتعديل تصريح (Create & Edit Notice)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('all')}
            className={`admin-view-tab ${activeView === 'all' ? 'active' : ''}`}
          >
            <span className="tab-icon">📋</span>
            <span>جميع البيانات والروابط (All Data & Links)</span>
            <span className="tab-count-pill">{history.length}</span>
          </button>
        </div>

        {/* 3. Conditional Content based on activeView */}
        {activeView === 'create' ? (
          <div>
            <NoticeForm
              formData={formData}
              onChange={handleChange}
              onStatusChange={handleStatusChange}
              onSubmit={handleSave}
              saving={saving}
              onReset={handleReset}
              isDirty={isDirty}
            />

            {/* Quick banner to jump to All Data */}
            <div className="admin-all-data-banner">
              <div className="banner-text">
                <span className="banner-icon">📋</span>
                <div>
                  <strong>سجل الروابط والتصاريح المنشأة (Saved Notices & Links Record) ({history.length})</strong>
                  <p>يمكنك استعراض ونسخ وتعديل جميع الروابط والتصاريح في أي وقت (Browse, copy & edit all links anytime)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveView('all')}
                className="btn-banner-all-data"
              >
                <span>عرض جميع الروابط (View All Data & Links)</span>
                <span className="arrow-left">←</span>
              </button>
            </div>
          </div>
        ) : (
          /* All Data & Links View */
          <div className="all-data-view-wrapper">
            <NoticeHistory
              history={history}
              onEdit={handleEditNotice}
              onDelete={handleDelete}
              loading={loading}
              onNewNotice={handleNewNotice}
              onRefresh={fetchHistory}
            />
          </div>
        )}
      </main>

      {/* 4. Generated Link Modal */}
      {showModal && createdNotice && (
        <GeneratedLinkModal
          notice={createdNotice}
          onClose={() => setShowModal(false)}
          onViewAll={() => setActiveView('all')}
        />
      )}
    </div>
  );
}
