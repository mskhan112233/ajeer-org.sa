import React from 'react';

export default function Header({ data = {} }) {
  const d = data || {};
  return (
    <header className="mainHeader">
      <div className="mainHeader__top">
        <div className="container-fluid">
          <div className="mainHeader__logoContainer">
            <a href="/">
              <img src="/dist/img/ajeer-logo.png" alt={d.headerLogoAjeerAlt || "أجير"} />
            </a>
          </div>
          <div className="mainHeader__logoContainer mainHeader__logoContainer--right">
            <a href={d.footerMlsdUrl || "https://mlsd.gov.sa/"} target="_blank" rel="noopener noreferrer">
              <img src="/dist/img/mlsd-logo.png" alt={d.headerLogoMlsdAlt || "وزارة الموارد البشرية والتنمية الاجتماعية"} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
