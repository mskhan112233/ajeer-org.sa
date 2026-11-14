import './globals.css';

export const metadata = {
  title: 'أجير | التحقق من تصريح أجير',
  description: 'بوابة تهدف إلى تنظيم العمل المؤقت و تيسير الوصول إلى القوى العاملة المتواجدة في المملكة',
  icons: {
    icon: '/dist/img/ajeer-logo.png',
  },
  openGraph: {
    title: 'أجير | التحقق من تصريح أجير',
    description: 'بوابة تهدف إلى تنظيم العمل المؤقت و تيسير الوصول إلى القوى العاملة المتواجدة في المملكة',
    url: 'https://ajeer.com.sa',
    siteName: 'Ajeer',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AjeerSA',
    title: 'أجير | التحقق من تصريح أجير',
    description: 'بوابة تهدف إلى تنظيم العمل المؤقت و تيسير الوصول إلى القوى العاملة المتواجدة في المملكة'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
