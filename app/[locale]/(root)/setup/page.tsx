import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { LandingNav } from '../_components/LandingNav';
import { LandingFooter } from '../_components/LandingFooter';
import { PrerequisitesSection } from './_components/PrerequisitesSection';
import { InstallationSection } from './_components/InstallationSection';
import { EnvironmentSection } from './_components/EnvironmentSection';
import { DatabaseSection } from './_components/DatabaseSection';
import { FirstLoginSection } from './_components/FirstLoginSection';
import { CleanupSection } from './_components/CleanupSection';
import { generateStructuredData } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://next-admin-kit-nine.dev';

  return generateSEOMetadata({
    title: 'Setup Guide - next-admin-kit-nine',
    description:
      'Complete setup guide for next-admin-kit-nine. Learn how to install, configure, and deploy your admin panel with Next.js, Prisma, Clerk, and PostgreSQL.',
    keywords: [
      'admin panel setup',
      'next.js setup',
      'prisma setup',
      'clerk setup',
      'admin panel installation',
      'admin panel configuration',
      'postgresql setup',
    ],
    image: '/og-image.png',
    url: `/${locale}/setup`,
    type: 'article',
    locale: locale,
    alternateLocales: ['en', 'ar']
      .filter(loc => loc !== locale)
      .map(loc => ({
        locale: loc,
        url: `/${loc}/setup`,
      })),
    section: 'Documentation',
    tags: ['setup', 'installation', 'configuration', 'guide'],
  });
}

export default async function SetupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://next-admin-kit-nine.dev';

  const structuredData = generateStructuredData({
    type: 'Article',
    name: 'next-admin-kit-nine Setup Guide',
    description:
      'Complete setup guide for next-admin-kit-nine admin panel starter template',
    url: `${siteUrl}/${locale}/setup`,
    image: `${siteUrl}/og-image.png`,
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString(),
    author: {
      name: 'next-admin-kit-nine Team',
    },
    publisher: {
      name: 'next-admin-kit-nine',
      logo: `${siteUrl}/logo.png`,
    },
  });

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className='min-h-screen bg-setup-primary'>
        <LandingNav />
        <main className='pt-20'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='max-w-4xl mx-auto'>
              <h1 className='text-4xl font-bold text-setup-text mb-4'>
                Setup Guide
              </h1>
              <p className='text-xl text-setup-text/70 mb-8'>
                Follow these steps to get your next-admin-kit-nine admin panel up and
                running.
              </p>

              <div className='space-y-12'>
                <PrerequisitesSection />
                <InstallationSection />
                <EnvironmentSection />
                <DatabaseSection />
                <FirstLoginSection />
                <CleanupSection />
              </div>
            </div>
          </div>
        </main>
        <LandingFooter />
      </div>
    </>
  );
}
