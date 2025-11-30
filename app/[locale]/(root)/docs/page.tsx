import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { DocsPageClient } from "./DocsPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generateSEOMetadata({
    title: "Documentation - AdminKit",
    description:
      "Complete documentation for AdminKit. Learn about features, configuration, API, authentication, themes, and more.",
    keywords: [
      "admin panel documentation",
      "admin kit docs",
      "admin panel api",
      "admin panel guide",
      "next.js admin docs",
      "prisma admin docs",
      "clerk admin docs",
    ],
    image: "/og-image.png",
    url: `/${locale}/docs`,
    type: "article",
    locale: locale,
    alternateLocales: ["en", "ar"]
      .filter((loc) => loc !== locale)
      .map((loc) => ({
        locale: loc,
        url: `/${loc}/docs`,
      })),
    section: "Documentation",
    tags: ["documentation", "api", "guide", "reference"],
  });
}

export default function DocsPage() {
  return <DocsPageClient />;
}
