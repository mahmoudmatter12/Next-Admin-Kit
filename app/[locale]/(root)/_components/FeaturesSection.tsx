"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Palette,
  Globe,
  Database,
  Sparkles,
  Type,
  Settings,
  Lock,
  Zap,
  Code,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    key: "authentication",
    icon: Shield,
  },
  {
    key: "rbac",
    icon: Users,
  },
  {
    key: "themes",
    icon: Palette,
  },
  {
    key: "i18n",
    icon: Globe,
  },
  {
    key: "database",
    icon: Database,
  },
  {
    key: "ui",
    icon: Sparkles,
  },
  {
    key: "typescript",
    icon: Type,
  },
  {
    key: "configurable",
    icon: Settings,
  },
];

export function FeaturesSection() {
  const t = useTranslations("landing.features");

  return (
    <section className="py-20 bg-setup-primary/50">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-setup-primary border border-setup-secondary/30 rounded-lg p-6 hover:border-setup-secondary/50 transition-all hover:shadow-lg group"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-setup-secondary/20 mb-4 group-hover:bg-setup-secondary/30 transition-colors">
                  <Icon className="h-7 w-7 text-setup-secondary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-setup-text mb-2 flex items-center gap-2">
                  {t(`${feature.key}.title`)}
                  <CheckCircle2 className="h-4 w-4 text-setup-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-setup-text/70 leading-relaxed">
                  {t(`${feature.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
