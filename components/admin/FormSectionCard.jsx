import React from 'react';

/**
 * Reusable Section Card container for Admin form sections
 */
export default function FormSectionCard({
  icon = '📄',
  title = '',
  subtitle = '',
  children
}) {
  return (
    <div className="admin-section-card">
      <div className="section-card-header">
        <div className="section-icon">{icon}</div>
        <div>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="section-card-body">
        {children}
      </div>
    </div>
  );
}
