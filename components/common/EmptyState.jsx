import React from 'react';

export default function EmptyState({
  icon = '📭',
  title = 'لا توجد بيانات حالياً',
  description = '',
  action = null
}) {
  return (
    <div className="empty-state-reusable">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      {description && <p className="empty-state-desc">{description}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}
