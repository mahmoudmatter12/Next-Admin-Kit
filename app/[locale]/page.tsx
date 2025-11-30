import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { HeroSection } from "./(root)/_components/HeroSection";
import { FeaturesSection } from "./(root)/_components/FeaturesSection";
import { ShowcaseSection } from "./(root)/_components/ShowcaseSection";
import { QuickStartSection } from "./(root)/_components/QuickStartSection";
import { TechStackSection } from "./(root)/_components/TechStackSection";
import { LandingFooter } from "./(root)/_components/LandingFooter";
import { LandingNav } from "./(root)/_components/LandingNav";
import { generateStructuredData } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adminkit.dev";

  return generateSEOMetadata({
    title: "AdminKit - Full-Stack Admin Panel Starter",
    description:
      "Build production-ready admin panels with Next.js 16, Prisma, Clerk, RBAC, Themes & i18n. Complete starter template with authentication, role-based access control, and modern UI.",
    keywords: [
      "admin panel",
      "admin dashboard",
      "next.js admin",
      "prisma admin",
      "clerk authentication",
      "rbac",
      "role based access control",
      "admin template",
      "admin starter",
      "typescript admin",
      "react admin",
      "full stack admin",
    ],
    image: "/og-image.png",
    url: `/${locale}`,
    type: "website",
    locale: locale,
    alternateLocales: ["en", "ar"]
      .filter((loc) => loc !== locale)
      .map((loc) => ({
        locale: loc,
        url: `/${loc}`,
      })),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adminkit.dev";

  const structuredData = generateStructuredData({
    type: "SoftwareApplication",
    name: "AdminKit",
    description:
      "Full-stack admin panel starter with Next.js, Prisma, Clerk, RBAC, Themes & i18n",
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}/og-image.png`,
    logo: `${siteUrl}/logo.png`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-setup-primary">
        <LandingNav />
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <QuickStartSection />
        <TechStackSection />
        <LandingFooter />
      </div>
    </>
  );
}
