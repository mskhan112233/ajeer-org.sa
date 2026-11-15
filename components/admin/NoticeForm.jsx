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
  onReset,
  isDirty = false
}) {
  const isEditing = Boolean(formData?.token);

  return (
    <form onSubmit={onSubmit} className="admin-form-panel" dir="rtl">
      {/* Edit Mode Notification Banner */}
      {isEditing && (
        <div className="form-edit-banner">
          <div className="edit-banner-info">
            <span className="edit-badge">وضع التعديل (Edit Mode) ✏️</span>
            <span>جاري تعديل بيانات التصريح (Editing Notice): <strong>#{formData.noticeNumber || ''}</strong></span>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="btn-cancel-edit"
            title="إلغاء التعديل والبدء بتصريح جديد (Cancel Edit & Start New)"
          >
            ✕ إلغاء التعديل (Cancel Edit)
          </button>
        </div>
      )}

      {/* Top Bar: Status Selector */}
      <div className="form-panel-header">
        <StatusToggle
          isValid={formData.isValid}
          onChange={onStatusChange}
        />
      </div>

      <div className="form-panel-body">
        {/* Section 1: بيانات التصريح (Notice Details) */}
        <div className="form-section">
          <div className="form-section-title">بيانات التصريح (Notice Details)</div>
          <div className="form-grid-2">
            <InputField
              label="رقم التصريح (Notice Number)"
              name="noticeNumber"
              value={formData.noticeNumber}
              onChange={onChange}
              placeholder="مثال (e.g.): TQ6258541"
              required
            />
            <InputField
              label="نوع التصريح (Notice Type)"
              name="noticeType"
              value={formData.noticeType}
              onChange={onChange}
              placeholder="مثال (e.g.): تصريح إعارة أجير"
              required
            />
            <InputField
              label="تاريخ بداية التصريح (Start Date)"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={onChange}
              required
            />
            <InputField
              label="تاريخ نهاية التصريح (End Date)"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="form-divider" />

        {/* Section 2: بيانات العامل (Worker Details) */}
        <div className="form-section">
          <div className="form-section-title">بيانات العامل (Worker Details)</div>
          <div className="form-grid-2">
            <InputField
              label="اسم العامل بالكامل (Worker Full Name)"
              name="workerName"
              value={formData.workerName}
              onChange={onChange}
              placeholder="الاسم الكامل كما في الإقامة (Full Name as in Iqama)"
              required
            />
            <InputField
              label="رقم الهوية / الإقامة (National ID / Iqama Number)"
              name="iqamaNumber"
              value={formData.iqamaNumber}
              onChange={onChange}
              placeholder="10 أرقام (10 Digits - e.g. 2585244649)"
              required
            />
            <InputField
              label="الجنسية (Nationality)"
              name="nationality"
              value={formData.nationality}
              onChange={onChange}
              placeholder="مثال (e.g.): باكستاني / مصري / هندي"
              required
            />
            <InputField
              label="المهنة (Occupation)"
              name="occupation"
              value={formData.occupation}
              onChange={onChange}
              placeholder="مثال (e.g.): عامل تحميل وتنزيل / محاسب"
              required
            />
            <SelectField
              label="الجنس (Gender)"
              name="gender"
              value={formData.gender || "ذكر"}
              onChange={onChange}
              options={[
                { value: "ذكر", label: "ذكر (Male)" },
                { value: "أنثى", label: "أنثى (Female)" }
              ]}
            />
            <InputField
              label="تاريخ الميلاد (Birth Date)"
              name="birthDate"
              value={formData.birthDate || "-"}
              onChange={onChange}
              placeholder="مثال (e.g.): 1990-05-15 أو -"
            />
          </div>
        </div>

        <div className="form-divider" />

        {/* Section 3: بيانات المنشأة (Facility Details) */}
        <div className="form-section">
          <div className="form-section-title">بيانات المنشأة (Facility Details)</div>
          <div className="form-grid-2">
            <InputField
              label="رقم المنشأة (Facility Number)"
              name="facilityNumber"
              value={formData.facilityNumber}
              onChange={onChange}
              placeholder="مثال (e.g.): 14-4006197"
              required
            />
            <InputField
              label="اسم المنشأة (Facility Name)"
              name="facilityName"
              value={formData.facilityName}
              onChange={onChange}
              placeholder="اسم المنشأة أو الشركة (Facility / Company Name)"
              required
            />
          </div>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className={`form-panel-footer ${isDirty ? 'has-unsaved-changes' : ''}`}>
        {isDirty && (
          <div className="unsaved-alert-pill">
            <span className="unsaved-dot" />
            <span>لديك تعديلات غير محفوظة (You have unsaved changes)</span>
          </div>
        )}

        <div className="footer-buttons-group">
          <button
            type="submit"
            disabled={saving}
            className={`submit-btn ${isDirty ? 'pulse-save' : ''}`}
          >
            {saving ? (
              <span>جاري الحفظ في فايربيس... (Saving to Firebase...)</span>
            ) : isEditing ? (
              <span>💾 حفظ التعديلات في فايربيس (Save Changes to Firebase)</span>
            ) : (
              <span>✓ حفظ التصريح وإنشاء الرابط (Save Notice & Generate Link) 🔗</span>
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="reset-btn"
            title="تفريغ الحقول (Reset Fields)"
          >
            إفراغ الحقول (Reset Fields)
          </button>
        </div>
      </div>
    </form>
  );
}
