import React from 'react';
import { useAppAssets } from '@/hooks/useAppAssets';

/**
 * Reusable footer social and contact icon links (Twitter/X, Telegram, Phone)
 */
export default function FooterSocials({ data = {} }) {
  const { assets } = useAppAssets();
  const twitterUrl = data.footerTwitterUrl || "https://twitter.com/AjeerSA";
  
  const telegramUrl = data.footerTelegramUrl || (
    data.footerSupportEmail
      ? data.footerSupportEmail.startsWith("mailto:") || data.footerSupportEmail.startsWith("http")
        ? data.footerSupportEmail
        : `mailto:${data.footerSupportEmail}`
      : "#"
  );

  const phoneUrl = data.footerPhoneUrl || (
    data.footerSupportPhone
      ? data.footerSupportPhone.startsWith("tel:") || data.footerSupportPhone.startsWith("http")
        ? data.footerSupportPhone
        : `tel:${data.footerSupportPhone}`
      : "#"
  );

  return (
    <div className="col-md-3">
      <div className="mainFooter__topNavTitle mt-5 mt-sm-5 mt-md-0 mt-lg-0 mt-xl-0">
        {data.footerCol4Title || "تواصل معنا"}
      </div>
      <p>
        {/* Twitter / X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mainFooter__socialsLink d-inline-block px-2"
          title="Twitter / X"
        >
          <img src={assets.xTwitterLogo} alt="X" className="footer-x-icon" />
        </a>

        {/* Telegram / Email */}
        <a
          href={telegramUrl}
          aria-label="تواصل معنا"
          target={telegramUrl.startsWith("http") ? "_blank" : undefined}
          rel={telegramUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          className="mainFooter__socialsLink d-inline-block px-2"
          title="Telegram / Send"
        >
          <i className="icon-send footer-send-icon" />
        </a>

        {/* Phone */}
        <a
          href={phoneUrl}
          aria-label={`تواصل معنا عبر الهاتف ${data.footerSupportPhone || ""}`}
          target={phoneUrl.startsWith("http") ? "_blank" : undefined}
          rel={phoneUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          className="mainFooter__socialsLink d-inline-block px-2"
          title="اتصال هاتفي"
        >
          <i className="icon-phone footer-phone-icon" />
        </a>
      </p>
    </div>
  );
}
