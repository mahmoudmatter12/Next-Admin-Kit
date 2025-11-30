import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://adminkit.vercel.app';

  // Base routes that exist in all locales
  const baseRoutes = [
    {
      url: '',
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: '/setup',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/docs',
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Generate sitemap entries for each locale
  const sitemapEntries: MetadataRoute.Sitemap = [];

  routing.locales.forEach(locale => {
    baseRoutes.forEach(route => {
      sitemapEntries.push({
        url: `${siteUrl}/${locale}${route.url}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map(loc => [loc, `${siteUrl}/${loc}${route.url}`])
          ),
        },
      });
    });
  });

  return sitemapEntries;
}
