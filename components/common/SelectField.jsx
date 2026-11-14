import React from 'react';

export default function SelectField({
  label,
  name,
  value = '',
  onChange,
  options = [],
  icon = null,
  helperText = '',
  required = false,
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
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
          className="form-input form-select"
        >
          {options.map((opt) => {
            const optVal = typeof opt === 'string' ? opt : opt.value;
            const optLabel = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>
      </div>
      {helperText && <p className="form-helper-text">{helperText}</p>}
    </div>
  );
}
