import React from 'react';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import StatusToggle from '../common/StatusToggle';
import ActionButton from '../common/ActionButton';
import FormSectionCard from './FormSectionCard';

export default function NoticeForm({
  formData,
  onChange,
  onStatusChange,
  onSubmit,
  saving,
  onReset
}) {
  return (
    <form onSubmit={onSubmit} className="admin-form-clean" dir="rtl">
      {/* 1. Status Selection */}
      <StatusToggle
        isValid={formData.isValid}
        onChange={onStatusChange}
      />

      {/* 2. Notice Details */}
      <FormSectionCard
        icon="📋"
        title="بيانات التصريح (Notice Details)"
        subtitle="الرقم المرجعي للتصريح، نوعه، وفترة سريانه"
      >
        <div className="form-grid-2">
          <InputField
            label="رقم التصريح"
            name="noticeNumber"
            value={formData.noticeNumber}
            onChange={onChange}
            placeholder="مثال: TQ6258541"
            icon="#"
            required
          />
          <InputField
            label="نوع التصريح"
            name="noticeType"
            value={formData.noticeType}
            onChange={onChange}
            placeholder="مثال: تصريح إعارة أجير"
            icon="📜"
            required
          />
          <InputField
            label="تاريخ بداية التصريح"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={onChange}
            icon="📅"
            required
          />
          <InputField
            label="تاريخ نهاية التصريح"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={onChange}
            icon="📅"
            required
          />
        </div>
      </FormSectionCard>

      {/* 3. Worker Details */}
      <FormSectionCard
        icon="👤"
        title="بيانات العامل (Worker Details)"
        subtitle="بيانات العامل كما هي مسجلة في وثيقة الإقامة الرسمية"
      >
        <div className="form-grid-2">
          <InputField
            label="اسم العامل بالكامل"
            name="workerName"
            value={formData.workerName}
            onChange={onChange}
            placeholder="الاسم الكامل كما في الإقامة أو الجواز"
            icon="👤"
            required
          />
          <InputField
            label="رقم الهوية / الإقامة"
            name="iqamaNumber"
            value={formData.iqamaNumber}
            onChange={onChange}
            placeholder="10 أرقام (مثال: 2585244649)"
            icon="🪪"
            required
          />
          <InputField
            label="الجنسية"
            name="nationality"
            value={formData.nationality}
            onChange={onChange}
            placeholder="مثال: باكستاني / هندي / مصري"
            icon="🌍"
            required
          />
          <InputField
            label="المهنة"
            name="occupation"
            value={formData.occupation}
            onChange={onChange}
            placeholder="مثال: عامل تحميل وتنزيل / محاسب / مهندس"
            icon="💼"
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
            icon="⚥"
          />
          <InputField
            label="تاريخ الميلاد"
            name="birthDate"
            value={formData.birthDate || "-"}
            onChange={onChange}
            placeholder="مثال: 1990-05-15 أو -"
            icon="🎂"
          />
        </div>
      </FormSectionCard>

      {/* 4. Facility Details */}
      <FormSectionCard
        icon="🏢"
        title="بيانات المنشأة (Facility Details)"
        subtitle="بيانات المنشأة المصدرة للتصريح"
      >
        <div className="form-grid-2">
          <InputField
            label="رقم المنشأة"
            name="facilityNumber"
            value={formData.facilityNumber}
            onChange={onChange}
            placeholder="مثال: 14-4006197"
            icon="🏢"
            required
          />
          <InputField
            label="اسم المنشأة"
            name="facilityName"
            value={formData.facilityName}
            onChange={onChange}
            placeholder="اسم الشركة أو المؤسسة"
            icon="🏷️"
            required
          />
        </div>
      </FormSectionCard>

      {/* Submit Action Bar */}
      <div className="admin-action-bar">
        <ActionButton
          type="submit"
          loading={saving}
          variant="primary"
          icon="⚡"
          className="btn-submit-notice"
        >
          حفظ التصريح وإنشاء رابط جديد ⚡
        </ActionButton>

        <button
          type="button"
          onClick={onReset}
          className="btn-reset-notice"
          title="تفريغ الحقول"
        >
          إعادة تعيين الحقول
        </button>
      </div>
    </form>
  );
}
