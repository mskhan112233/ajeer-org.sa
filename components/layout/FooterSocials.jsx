import React from 'react';

/**
 * Reusable footer social and contact icon links (Twitter/X, Telegram, Phone)
 * Perfectly aligned in a single straight line with clean vector SVGs (no background, no font box)
 */
export default function FooterSocials({ data = {} }) {
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
      <div className="footer-socials-row">
        {/* Twitter / X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-link"
          title="Twitter / X"
          aria-label="Twitter / X"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="footer-social-svg"
          >
            <path
              d="M14.8735 18.7581H17.5833L5.11544 1.30005L10.1894 8.40909L10.9802 9.51569L17.5833 18.7581H14.8735ZM17.5833 0L11.1185 7.35254L5.95604 0H0L7.80865 11.1188L0 20H1.76414L8.59118 12.2348L14.044 20H20L11.9024 8.46861L19.3474 0H17.5833Z"
              fill="#1F2548"
            />
          </svg>
        </a>

        {/* Telegram / Send */}
        <a
          href={telegramUrl}
          aria-label="تواصل معنا"
          target={telegramUrl.startsWith("http") ? "_blank" : undefined}
          rel={telegramUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          className="footer-social-link"
          title="Telegram / Send"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="footer-social-svg"
          >
            <circle cx="12" cy="12" r="12" fill="#1F2548" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.4 6.8c.2.8-.5 4.6-1.1 7.2-.3 1.1-.7 1.5-1.1 1.5-.9.1-1.5-.6-2.4-1.2-1.3-.9-2.1-1.4-3.3-2.3-1.4-1-.5-1.6.3-2.5.2-.2 3.8-3.5 3.9-3.8 0-.1-.1-.3-.2-.3s-.3 0-.4.1c-.2.1-2.2 1.4-6.3 4.2-.6.4-1.1.6-1.6.6-.5 0-1.5-.3-2.3-.6-.9-.3-1.6-.5-1.6-1 0-.3.4-.5 1.1-.8 4.3-1.9 7.2-3.1 8.6-3.7 4.1-1.7 5-2 5.5-2 .1 0 .4 0 .6.2.2.1.2.3.2.5z"
              fill="#FFFFFF"
            />
          </svg>
        </a>

        {/* Phone */}
        <a
          href={phoneUrl}
          aria-label={`تواصل معنا عبر الهاتف ${data.footerSupportPhone || ""}`}
          target={phoneUrl.startsWith("http") ? "_blank" : undefined}
          rel={phoneUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          className="footer-social-link"
          title="اتصال هاتفي"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="#1F2548"
            xmlns="http://www.w3.org/2000/svg"
            className="footer-social-svg"
          >
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
