export const FOOTER_NAV_COLUMNS = [
  {
    key: 'col1',
    titleKey: 'footerCol1Title',
    defaultTitle: 'أجير',
    links: [
      { textKey: 'footerLink1Text', urlKey: 'footerLink1Url', defaultText: 'عن أجير', defaultUrl: '/about' },
      { textKey: 'footerLink2Text', urlKey: 'footerLink2Url', defaultText: 'خدمات أجير', defaultUrl: '/about_notices' }
    ]
  },
  {
    key: 'col2',
    titleKey: 'footerCol2Title',
    defaultTitle: 'الدعم',
    links: [
      { textKey: 'footerLink3Text', urlKey: 'footerLink3Url', defaultText: 'الدعم و المساعدة', defaultUrl: '/support' },
      { textKey: 'footerLink4Text', urlKey: 'footerLink4Url', defaultText: 'الأسئلة الشائعة', defaultUrl: '/faq' }
    ]
  },
  {
    key: 'col3',
    titleKey: 'footerCol3Title',
    defaultTitle: 'الشروط و الخصوصية',
    links: [
      { textKey: 'footerLink5Text', urlKey: 'footerLink5Url', defaultText: 'الشروط والأحكام', defaultUrl: '/terms' },
      { textKey: 'footerLink6Text', urlKey: 'footerLink6Url', defaultText: 'سياسة الخصوصية', defaultUrl: '/privacy_policy' }
    ]
  }
];

export const PARTNER_LOGOS = [
  {
    name: 'MLSD',
    alt: 'وزارة الموارد البشرية والتنمية الاجتماعية',
    urlKey: 'footerMlsdUrl',
    defaultUrl: 'https://mlsd.gov.sa/',
    src: '/dist/img/mlsd-logo.png',
    height: 50
  },
  {
    name: 'Takamol',
    alt: 'تكامل القابضة',
    urlKey: 'footerTakamolUrl',
    defaultUrl: 'https://takamolholding.com/',
    src: '/dist/img/takamol-logo.png',
    height: 50
  },
  {
    name: 'Tamkeen',
    alt: 'تمكين للتقنيات',
    urlKey: 'footerTamkeenUrl',
    defaultUrl: 'https://tamkeentech.sa/',
    src: '/dist/img/tamkeen-logo-1.svg',
    height: 50
  },
  {
    name: 'DigitalStamp',
    alt: 'الختم الرقمي الحكومي',
    urlKey: 'footerDigitalStampUrl',
    defaultUrl: 'https://raqmi.dga.gov.sa/platforms/DigitalStamp/ShowCertificate/441',
    src: '/dist/img/digital-govt-auth-logo.svg',
    className: 'footer-stamp-logo'
  }
];
