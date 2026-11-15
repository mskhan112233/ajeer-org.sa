import React from 'react';

export default function AdminHeader({
  onReset,
  activeView = 'create',
  setActiveView,
  historyCount = 0
}) {
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
          {/* All Data Button */}
          <button
            type="button"
            onClick={() => setActiveView && setActiveView('all')}
            className={`nav-btn btn-all-data ${activeView === 'all' ? 'active-view' : 'nav-btn-outline'}`}
            title="عرض جميع البيانات والروابط التي تم إنشاؤها"
          >
            <span className="btn-icon">📋</span>
            <span>جميع البيانات (All Data)</span>
            <span className="nav-badge-pill">{historyCount}</span>
          </button>

          {/* New Permit Button */}
          <button
            type="button"
            onClick={() => {
              if (onReset) onReset();
              if (setActiveView) setActiveView('create');
            }}
            className={`nav-btn ${activeView === 'create' ? 'nav-btn-primary' : 'nav-btn-outline'}`}
            title="تفريغ الحقول لإنشاء تصريح جديد"
          >
            <span>+ تصريح جديد</span>
          </button>

          {/* Home Page Link */}
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
        </div>
      </div>
    </header>
  );
}
