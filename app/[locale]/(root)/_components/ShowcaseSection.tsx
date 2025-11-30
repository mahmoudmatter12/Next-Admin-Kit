"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Shield, Users, Palette, Lock } from "lucide-react";

const showcaseItems = [
  {
    category: "login",
    title: "Login & Sign Up Pages",
    description:
      "Beautiful, responsive authentication pages with full-screen design",
    images: [
      {
        src: "/login/loginpages/login-page.png",
        alt: "Login page with modern design",
        title: "Login Page",
      },
      {
        src: "/login/loginpages/sign-up-page.png",
        alt: "Sign up page with modern design",
        title: "Sign Up Page",
      },
    ],
    icon: Lock,
  },
  {
    category: "admin",
    title: "Admin Dashboard",
    description:
      "Complete admin panel with user management and role-based access",
    images: [
      {
        src: "/admin-dashboard/pages/adminpage.png",
        alt: "Admin dashboard main page",
        title: "Admin Dashboard",
      },
      {
        src: "/admin-dashboard/pages/userMangamentPage.png",
        alt: "User management page",
        title: "User Management",
      },
      {
        src: "/admin-dashboard/pages/applying-the-rbac-the-auth-gard.png",
        alt: "RBAC authentication guard",
        title: "RBAC Auth Guard",
      },
    ],
    icon: Shield,
  },
  {
    category: "themes",
    title: "Theme System",
    description:
      "Multiple themes with custom color picker and persistent preferences",
    images: [
      {
        src: "/admin-dashboard/pages-with-theme/admin-displaying-all-themes.png",
        alt: "All available themes",
        title: "Theme Selector",
      },
      {
        src: "/admin-dashboard/pages-with-theme/admin-dark-theme.png",
        alt: "Dark theme preview",
        title: "Dark Theme",
      },
      {
        src: "/admin-dashboard/pages-with-theme/admin-green-theme.png",
        alt: "Green theme preview",
        title: "Green Theme",
      },
    ],
    icon: Palette,
  },
];

export function ShowcaseSection() {
  const t = useTranslations("landing.showcase");

  return (
    <section className="py-20 bg-setup-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-setup-text mb-4">
            {t("title")}
          </h2>
          <p className="text-lg sm:text-xl text-setup-text/70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="space-y-16">
          {showcaseItems.map((item, categoryIndex) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                className="bg-setup-primary/50 border border-setup-secondary/30 rounded-lg p-8"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-setup-secondary/20">
                    <Icon className="h-6 w-6 text-setup-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-setup-text">
                      {item.title}
                    </h3>
                    <p className="text-setup-text/70">{item.description}</p>
                  </div>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {item.images.map((image, imageIndex) => (
                    <motion.div
                      key={image.src}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.2 + imageIndex * 0.1,
                      }}
                      className="group relative overflow-hidden rounded-lg border border-setup-secondary/30 hover:border-setup-secondary/50 transition-all"
                    >
                      <div className="relative aspect-video bg-setup-primary/50">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                          <h4 className="text-white font-semibold mb-1">
                            {image.title}
                          </h4>
                          <p className="text-white/80 text-sm">{image.alt}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
