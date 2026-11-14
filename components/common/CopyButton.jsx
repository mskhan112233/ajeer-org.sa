import React from 'react';
import { useClipboard } from '@/hooks/useClipboard';

export default function CopyButton({
  text = '',
  className = '',
  defaultLabel = 'نسخ الرابط',
  copiedLabel = 'تم النسخ بنجاح! ✓',
  icon = '📋',
  copiedIcon = '✓',
  onCopied = null
}) {
  const { copied, copy } = useClipboard();

  const handleCopy = (e) => {
    e.stopPropagation();
    copy(text);
    if (onCopied) onCopied();
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`copy-btn-reusable ${copied ? 'copy-btn-success' : ''} ${className}`}
      title={copied ? 'تم النسخ!' : 'نسخ إلى الحافظة'}
    >
      <span className="copy-btn-icon">{copied ? copiedIcon : icon}</span>
      <span className="copy-btn-text">{copied ? copiedLabel : defaultLabel}</span>
    </button>
  );
}
