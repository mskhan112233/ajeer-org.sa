import React from 'react';

export default function InputField({
  label,
  name,
  value = '',
  onChange,
  placeholder = '',
  type = 'text',
  helperText = '',
  required = false,
  dir = 'rtl',
  className = ''
}) {
  return (
    <div className={`form-field-group ${className}`}>
      {label && (
        <label className="field-label" htmlFor={name}>
          <span>{label}</span>
          {required && <span className="field-required">*</span>}
        </label>
      )}
      <div className="field-input-box">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          required={required}
          dir={dir}
          className="field-input"
        />
      </div>
      {helperText && <p className="field-helper">{helperText}</p>}
    </div>
  );
}
