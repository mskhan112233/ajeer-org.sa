import React from 'react';

/**
 * Reusable footer navigation column with authentic Ajeer styling
 */
export default function FooterNavCol({ title, links = [] }) {
  return (
    <div className="col-md-3">
      <div className="mainFooter__topNavTitle mt-5 mt-sm-5 mt-md-0 mt-lg-0 mt-xl-0">
        {title}
      </div>
      {links.map((link, idx) => (
        <p key={idx}>
          <a
            href={link.url || '#'}
            className="mainFooter__topNavLink"
            target={link.url?.startsWith('http') ? '_blank' : undefined}
            rel={link.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {link.text}
          </a>
        </p>
      ))}
    </div>
  );
}
