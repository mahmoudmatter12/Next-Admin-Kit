"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";

const steps = [
  { key: "step1", number: 1 },
  { key: "step2", number: 2 },
  { key: "step3", number: 3 },
  { key: "step4", number: 4 },
];

export function FirstLoginSection() {
  const t = useTranslations("landing.setup_guide.first_login");
  const router = useRouter();

  return (
    <section className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-setup-text mb-6">
        {t("title")}
      </h2>
      <div className="space-y-4 mb-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.key}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-start space-x-4 bg-setup-primary border border-setup-secondary/30 rounded-lg p-6"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-setup-secondary/20 text-setup-secondary font-bold flex-shrink-0">
              {step.number}
            </div>
            <div className="flex-1">
              <p className="text-setup-text">{t(step.key)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-setup-text mb-2">
          Important: Setting Admin Role
        </h3>
        <p className="text-setup-text/70 mb-4">
          After signing up, you need to update your role in the database to
          access the admin panel:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-setup-text/70 mb-4">
          <li>
            Open Prisma Studio:{" "}
            <code className="bg-black/20 px-2 py-1 rounded">
              npm run db:studio
            </code>
          </li>
          <li>Find your user in the database</li>
          <li>
            Change the{" "}
            <code className="bg-black/20 px-2 py-1 rounded">role</code> field to{" "}
            <code className="bg-black/20 px-2 py-1 rounded">ADMIN</code> or{" "}
            <code className="bg-black/20 px-2 py-1 rounded">OWNER</code>
          </li>
          <li>Save the changes</li>
        </ol>
        <Button
          onClick={() => router.push("/login")}
          className="bg-setup-secondary hover:bg-setup-secondary/80 text-white"
        >
          Go to Login
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
