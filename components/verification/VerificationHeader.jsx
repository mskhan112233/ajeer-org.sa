import React from 'react';
import VerificationResultBadge from './VerificationResultBadge';
import { useAppAssets } from '@/hooks/useAppAssets';

export default function VerificationHeader({ data = {} }) {
  const { assets } = useAppAssets();
  const isValid = data?.isValid !== false;
  const statusText = data?.statusText || (isValid ? "ساري / فعال" : "منتهي / ملغي");
  const ajeerAlt = data?.headerLogoAjeerAlt || "أجير";
  const mlsdAlt = data?.headerLogoMlsdAlt || "وزارة الموارد البشرية والتنمية الاجتماعية";
  const title = data?.headerTitle || "التحقق من تصريح أجير";

  return (
    <table className="verification-header" dir="rtl">
      <tbody>
        <tr>
          <td className="verification-header__logos">
            <img
              className="verification-logo verification-logo--ajeer"
              src={assets.ajeerLogo}
              alt={ajeerAlt}
            />
            <img
              className="verification-logo verification-logo--hrsd"
              src={assets.mlsdLogo}
              alt={mlsdAlt}
            />
          </td>
          <td className="verification-header__title">
            <h1 className="verification-title">{title}</h1>
          </td>
          <td className="verification-header__result">
            <VerificationResultBadge isValid={isValid} statusText={statusText} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
