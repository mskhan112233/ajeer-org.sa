'use client';

import React from 'react';
import '@/app/admin.css';
import AdminHeader from '@/components/admin/AdminHeader';
import NoticeForm from '@/components/admin/NoticeForm';
import NoticeHistory from '@/components/admin/NoticeHistory';
import GeneratedLinkModal from '@/components/admin/GeneratedLinkModal';
import { useAdminNotices } from '@/hooks/useAdminNotices';

export default function AdminPage() {
  const {
    formData,
    history,
    loading,
    saving,
    createdNotice,
    showModal,
    setShowModal,
    error,
    handleChange,
    handleStatusChange,
    handleSave,
    handleDelete,
    handleReset,
    handleEdit
  } = useAdminNotices();

  return (
    <div className="admin-page-clean" dir="rtl">
      {/* 1. Header */}
      <AdminHeader onReset={handleReset} />

      <main className="admin-container-clean">
        {/* Error message if any */}
        {error && (
          <div className="admin-error-box">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* 2. Notice Input Form */}
        <NoticeForm
          formData={formData}
          onChange={handleChange}
          onStatusChange={handleStatusChange}
          onSubmit={handleSave}
          saving={saving}
          onReset={handleReset}
        />

        {/* 3. Generated Notices History Table */}
        <div className="mt-4">
          <NoticeHistory
            history={history}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </main>

      {/* 4. Generated Link Modal */}
      {showModal && createdNotice && (
        <GeneratedLinkModal
          notice={createdNotice}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
