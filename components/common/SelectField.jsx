import React from 'react';

export default function SelectField({
  label,
  name,
  value = '',
  onChange,
  options = [],
  helperText = '',
  required = false,
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
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
          className="field-input field-select"
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
      {helperText && <p className="field-helper">{helperText}</p>}
    </div>
  );
}
