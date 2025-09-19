import {Inter} from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {AuthProvider} from '@/components/AuthProvider';
import './globals.css';

const inter = Inter({subsets: ['latin']});

const locales = ['en', 'fr', 'rw', 'ar', 'de', 'sw'];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Simplified layout - always use 'en' as default to avoid next-intl errors
  const safeLocale = locales.includes(locale) ? locale : 'en';

  return (
    <html lang={safeLocale} dir={safeLocale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
