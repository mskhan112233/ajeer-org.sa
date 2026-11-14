import React from 'react';

export default function InputField({
  label,
  name,
  value = '',
  onChange,
  placeholder = '',
  type = 'text',
  icon = null,
  helperText = '',
  required = false,
  dir = 'rtl',
  className = ''
}) {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {icon && <span className="label-icon">{icon}</span>}
          <span>{label}</span>
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <div className="input-container">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          required={required}
          dir={dir}
          className="form-input"
        />
      </div>
      {helperText && <p className="form-helper-text">{helperText}</p>}
    </div>
  );
}
