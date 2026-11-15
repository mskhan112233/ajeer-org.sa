import React from 'react';
import { useAppAssets } from '@/hooks/useAppAssets';

export default function AdminHeader({
  onReset,
  activeView = 'create',
  setActiveView,
  historyCount = 0
}) {
  const { assets } = useAppAssets();

  return (
    <header className="admin-navbar" dir="rtl">
      <div className="admin-navbar-container">
        {/* Brand & Title */}
        <div className="admin-brand">
          <img src={assets.ajeerLogo} alt="أجير (Ajeer)" className="admin-brand-logo" />
          <div className="admin-brand-divider" />
          <div className="admin-brand-text">
            <h1 className="admin-brand-title">إدارة تصاريح أجير (Ajeer Notice Management)</h1>
            <p className="admin-brand-desc">تعديل البيانات وتوليد روابط التحقق المعتمدة (Edit Data & Generate Verified Links)</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-nav-actions">
          {/* All Data Button */}
          <button
            type="button"
            onClick={() => setActiveView && setActiveView('all')}
            className={`nav-btn btn-all-data ${activeView === 'all' ? 'active-view' : 'nav-btn-outline'}`}
            title="عرض جميع البيانات والروابط التي تم إنشاؤها (View All Data & Links)"
          >
            <span className="btn-icon">📋</span>
            <span>جميع البيانات والروابط (All Data & Links)</span>
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
            title="تفريغ الحقول لإنشاء تصريح جديد (Create New Notice)"
          >
            <span>+ تصريح جديد (+ New Notice)</span>
          </button>

          {/* Home Page Link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-btn nav-btn-outline"
            title="معاينة الصفحة الرئيسية (View Home Page)"
          >
            <span>الصفحة الرئيسية (Home Page)</span>
            <span className="arrow-icon">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
