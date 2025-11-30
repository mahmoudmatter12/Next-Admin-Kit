"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Terminal,
  FileText,
  Database,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";

const steps = [
  { key: "step1", number: 1, icon: Terminal },
  { key: "step2", number: 2, icon: FileText },
  { key: "step3", number: 3, icon: Database },
  { key: "step4", number: 4, icon: Play },
];

export function QuickStartSection() {
  const t = useTranslations("landing.quick_start");
  const router = useRouter();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-setup-primary border border-setup-secondary/30 rounded-lg p-6 relative hover:border-setup-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-setup-secondary/20 text-setup-secondary font-bold text-xl group-hover:bg-setup-secondary/30 transition-colors">
                  {step.number}
                </div>
                {step.icon && (
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-setup-secondary/10">
                    <step.icon className="h-5 w-5 text-setup-secondary" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-setup-text mb-2">
                {t(`${step.key}.title`)}
              </h3>
              <p className="text-setup-text/70 mb-4 leading-relaxed">
                {t(`${step.key}.description`)}
              </p>
              <div className="flex items-center text-setup-secondary">
                <CheckCircle2 className="h-5 w-5" />
                <span className="ml-2 text-sm">Ready</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            onClick={() => router.push("/setup")}
            size="lg"
            className="bg-setup-secondary hover:bg-setup-secondary/80 text-white px-8 py-6 text-lg"
          >
            {t("view_full_guide")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
