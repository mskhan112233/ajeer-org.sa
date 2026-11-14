import React from 'react';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import StatusToggle from '../common/StatusToggle';

export default function NoticeForm({
  formData,
  onChange,
  onStatusChange,
  onSubmit,
  saving,
  onReset
}) {
  return (
    <form onSubmit={onSubmit} className="admin-form-panel" dir="rtl">
      {/* Top Bar: Status Selector */}
      <div className="form-panel-header">
        <StatusToggle
          isValid={formData.isValid}
          onChange={onStatusChange}
        />
      </div>

      <div className="form-panel-body">
        {/* Section 1: بيانات التصريح */}
        <div className="form-section">
          <div className="form-section-title">بيانات التصريح</div>
          <div className="form-grid-2">
            <InputField
              label="رقم التصريح"
              name="noticeNumber"
              value={formData.noticeNumber}
              onChange={onChange}
              placeholder="مثال: TQ6258541"
              required
            />
            <InputField
              label="نوع التصريح"
              name="noticeType"
              value={formData.noticeType}
              onChange={onChange}
              placeholder="مثال: تصريح إعارة أجير"
              required
            />
            <InputField
              label="تاريخ بداية التصريح"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={onChange}
              required
            />
            <InputField
              label="تاريخ نهاية التصريح"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="form-divider" />

        {/* Section 2: بيانات العامل */}
        <div className="form-section">
          <div className="form-section-title">بيانات العامل</div>
          <div className="form-grid-2">
            <InputField
              label="اسم العامل بالكامل"
              name="workerName"
              value={formData.workerName}
              onChange={onChange}
              placeholder="الاسم الكامل كما في وثيقة الإقامة"
              required
            />
            <InputField
              label="رقم الهوية / الإقامة"
              name="iqamaNumber"
              value={formData.iqamaNumber}
              onChange={onChange}
              placeholder="10 أرقام (مثال: 2585244649)"
              required
            />
            <InputField
              label="الجنسية"
              name="nationality"
              value={formData.nationality}
              onChange={onChange}
              placeholder="مثال: باكستاني / هندي / مصري"
              required
            />
            <InputField
              label="المهنة"
              name="occupation"
              value={formData.occupation}
              onChange={onChange}
              placeholder="مثال: عامل تحميل وتنزيل / محاسب"
              required
            />
            <SelectField
              label="الجنس"
              name="gender"
              value={formData.gender || "ذكر"}
              onChange={onChange}
              options={[
                { value: "ذكر", label: "ذكر" },
                { value: "أنثى", label: "أنثى" }
              ]}
            />
            <InputField
              label="تاريخ الميلاد"
              name="birthDate"
              value={formData.birthDate || "-"}
              onChange={onChange}
              placeholder="مثال: 1990-05-15 أو -"
            />
          </div>
        </div>

        <div className="form-divider" />

        {/* Section 3: بيانات المنشأة */}
        <div className="form-section">
          <div className="form-section-title">بيانات المنشأة</div>
          <div className="form-grid-2">
            <InputField
              label="رقم المنشأة"
              name="facilityNumber"
              value={formData.facilityNumber}
              onChange={onChange}
              placeholder="مثال: 14-4006197"
              required
            />
            <InputField
              label="اسم المنشأة"
              name="facilityName"
              value={formData.facilityName}
              onChange={onChange}
              placeholder="اسم المنشأة أو الشركة"
              required
            />
          </div>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="form-panel-footer">
        <button
          type="submit"
          disabled={saving}
          className="submit-btn"
        >
          {saving ? (
            <span>جاري الحفظ والإنشاء...</span>
          ) : (
            <span>حفظ التصريح وإنشاء الرابط المباشر 🔗</span>
          )}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="reset-btn"
          title="تفريغ الحقول"
        >
          إفراغ الحقول
        </button>
      </div>
    </form>
  );
}
