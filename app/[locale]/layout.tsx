import type { Metadata } from 'next';
import './globals.css';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/components/layout/providers';
import { generateMetadata as generateSEOMetadata, defaultSEO } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMetadata({
    ...defaultSEO,
    locale: locale,
    alternateLocales: routing.locales
      .filter(loc => loc !== locale)
      .map(loc => ({
        locale: loc,
        url: `/${loc}`,
      })),
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale}>
          <Providers>
            <Toaster
              position='top-right'
              expand={true}
              richColors={true}
              closeButton={true}
            />
            <main>{children}</main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
