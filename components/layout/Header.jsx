import React from 'react';
import { useAppAssets } from '@/hooks/useAppAssets';

export default function Header({ data = {} }) {
  const d = data || {};
  const { assets } = useAppAssets();

  return (
    <header className="mainHeader">
      <div className="mainHeader__top">
        <div className="container-fluid">
          <div className="mainHeader__logoContainer">
            <a href="/">
              <img src={assets.ajeerLogo} alt={d.headerLogoAjeerAlt || "أجير"} />
            </a>
          </div>
          <div className="mainHeader__logoContainer mainHeader__logoContainer--right">
            <a href={d.footerMlsdUrl || "https://mlsd.gov.sa/"} target="_blank" rel="noopener noreferrer">
              <img src={assets.mlsdLogo} alt={d.headerLogoMlsdAlt || "وزارة الموارد البشرية والتنمية الاجتماعية"} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
