import type { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  locale?: string;
  alternateLocales?: { locale: string; url: string }[];
  noindex?: boolean;
  nofollow?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * Generate comprehensive metadata for SEO
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image,
    url,
    type = "website",
    locale = "en",
    alternateLocales = [],
    noindex = false,
    nofollow = false,
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = [],
  } = config;

  const siteName = process.env.NEXT_PUBLIC_PROJECT_NAME || "AdminKit";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adminkit.dev";
  const defaultImage = `${siteUrl}/og-image.png`;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : defaultImage;

  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    authors: author ? [{ name: author }] : undefined,
    creator: author,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: fullUrl,
      languages: {
        ...Object.fromEntries(
          alternateLocales.map(({ locale, url }) => [
            locale,
            `${siteUrl}${url}`,
          ]),
        ),
        "x-default": fullUrl,
      },
    },
    openGraph: {
      type: type === "article" ? "article" : "website",
      locale: locale,
      url: fullUrl,
      title: title,
      description: description,
      siteName: siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [fullImage],
      creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
      site: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
    },
  };

  return metadata;
}

/**
 * Generate structured data (JSON-LD) for better SEO
 */
export function generateStructuredData(config: {
  type:
    | "WebSite"
    | "WebPage"
    | "Article"
    | "SoftwareApplication"
    | "Organization";
  name: string;
  description: string;
  url: string;
  image?: string;
  logo?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    logo?: string;
  };
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adminkit.dev";
  const defaultImage = `${siteUrl}/og-image.png`;
  const defaultLogo = `${siteUrl}/logo.png`;

  const baseData = {
    "@context": "https://schema.org",
    "@type": config.type,
    name: config.name,
    description: config.description,
    url: config.url.startsWith("http") ? config.url : `${siteUrl}${config.url}`,
    ...(config.image && {
      image: config.image.startsWith("http")
        ? config.image
        : `${siteUrl}${config.image}`,
    }),
    ...(config.logo && {
      logo: config.logo.startsWith("http")
        ? config.logo
        : `${siteUrl}${config.logo}`,
    }),
    ...(config.datePublished && { datePublished: config.datePublished }),
    ...(config.dateModified && { dateModified: config.dateModified }),
  };

  if (config.type === "WebSite") {
    return {
      ...baseData,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };
  }

  if (config.type === "SoftwareApplication") {
    return {
      ...baseData,
      applicationCategory: config.applicationCategory || "DeveloperApplication",
      operatingSystem: config.operatingSystem || "Web",
      ...(config.offers && { offers: { "@type": "Offer", ...config.offers } }),
      ...(config.aggregateRating && {
        aggregateRating: {
          "@type": "AggregateRating",
          ...config.aggregateRating,
        },
      }),
    };
  }

  if (config.type === "Article") {
    return {
      ...baseData,
      ...(config.author && {
        author: {
          "@type": "Person",
          name: config.author.name,
          ...(config.author.url && { url: config.author.url }),
        },
      }),
      ...(config.publisher && {
        publisher: {
          "@type": "Organization",
          name: config.publisher.name,
          ...(config.publisher.logo && {
            logo: {
              "@type": "ImageObject",
              url: config.publisher.logo.startsWith("http")
                ? config.publisher.logo
                : `${siteUrl}${config.publisher.logo}`,
            },
          }),
        },
      }),
    };
  }

  return baseData;
}

/**
 * Default SEO configuration
 */
export const defaultSEO: SEOConfig = {
  title: process.env.NEXT_PUBLIC_PROJECT_NAME || "AdminKit",
  description:
    process.env.NEXT_PUBLIC_PROJECT_DESCRIPTION ||
    "Full-stack admin panel starter with Next.js, Prisma, Clerk, RBAC, Themes & i18n",
  keywords: [
    "admin panel",
    "admin dashboard",
    "next.js",
    "prisma",
    "clerk",
    "rbac",
    "typescript",
    "tailwind css",
    "react",
    "full stack",
    "starter template",
    "boilerplate",
  ],
  image: "/og-image.png",
  type: "website",
};
