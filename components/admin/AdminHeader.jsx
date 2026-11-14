import React from 'react';

export default function AdminHeader({ onReset }) {
  return (
    <header className="admin-header-clean" dir="rtl">
      <div className="admin-header-inner">
        <div className="admin-brand-section">
          <div className="admin-logo-box">
            <img src="/dist/img/ajeer-logo.png" alt="أجير" className="admin-logo-img" />
          </div>
          <div>
            <h1 className="admin-heading">لوحة التحكم | إدارة تصاريح أجير</h1>
            <p className="admin-subheading">
              تعديل بيانات التصريح وتوليد روابط التحقق المباشرة للعملاء
            </p>
          </div>
        </div>

        <div className="admin-header-actions">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-header-view"
            title="معاينة الصفحة الرئيسية"
          >
            <span>معاينة الموقع</span>
            <span className="arrow">↗</span>
          </a>

          <button
            type="button"
            onClick={onReset}
            className="btn-header-new"
            title="تفريغ الحقول لإنشاء تصريح جديد"
          >
            <span>نموذج جديد ＋</span>
          </button>
        </div>
      </div>
    </header>
  );
}
