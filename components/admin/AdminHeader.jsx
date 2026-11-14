import React from 'react';

export default function AdminHeader({ onReset }) {
  return (
    <header className="admin-navbar" dir="rtl">
      <div className="admin-navbar-container">
        {/* Brand & Title */}
        <div className="admin-brand">
          <img src="/dist/img/ajeer-logo.png" alt="أجير" className="admin-brand-logo" />
          <div className="admin-brand-divider" />
          <div className="admin-brand-text">
            <h1 className="admin-brand-title">إدارة تصاريح أجير</h1>
            <p className="admin-brand-desc">تعديل البيانات وتوليد روابط التحقق المعتمدة</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-nav-actions">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-btn nav-btn-outline"
            title="معاينة الصفحة الرئيسية"
          >
            <span>عرض الصفحة الرئيسية</span>
            <span className="arrow-icon">↗</span>
          </a>

          <button
            type="button"
            onClick={onReset}
            className="nav-btn nav-btn-primary"
            title="تفريغ الحقول لإنشاء تصريح جديد"
          >
            <span>+ تصريح جديد</span>
          </button>
        </div>
      </div>
    </header>
  );
}
