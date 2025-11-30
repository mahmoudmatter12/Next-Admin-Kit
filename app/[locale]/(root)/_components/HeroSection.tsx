"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  Github,
  BookOpen,
  Rocket,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("landing.hero");
  const router = useRouter();

  const scrollToSetup = () => {
    const setupSection = document.getElementById("setup-guide");
    if (setupSection) {
      setupSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-setup-primary">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <motion.div
          className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-setup-secondary/20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-[20%] -bottom-[20%] h-[60%] w-[60%] rounded-full bg-setup-secondary/20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-setup-secondary" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-setup-text">
                {t("title")}
              </h1>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl text-setup-text/80 mb-4">
              {t("subtitle")}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-setup-text/70 mb-8 max-w-2xl mx-auto">
              {t("description")}
            </p>

            {/* Quick highlights */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12 text-sm sm:text-base">
              <div className="flex items-center gap-2 text-setup-text/80">
                <CheckCircle2 className="h-5 w-5 text-setup-secondary" />
                <span>Ready to Use</span>
              </div>
              <div className="flex items-center gap-2 text-setup-text/80">
                <CheckCircle2 className="h-5 w-5 text-setup-secondary" />
                <span>Fully Documented</span>
              </div>
              <div className="flex items-center gap-2 text-setup-text/80">
                <CheckCircle2 className="h-5 w-5 text-setup-secondary" />
                <span>Production Ready</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => router.push("/setup")}
              size="lg"
              className="bg-setup-secondary hover:bg-setup-secondary/80 text-white px-8 py-6 text-lg"
            >
              <Rocket className="mr-2 h-5 w-5" />
              {t("get_started")}
            </Button>
            <Button
              onClick={() => {
                const githubUrl = process.env.NEXT_PUBLIC_DEVELOPER_URL || "#";
                window.open(githubUrl, "_blank");
              }}
              variant="outline"
              size="lg"
              className="border-setup-secondary/30 text-setup-text hover:bg-setup-secondary/20 px-8 py-6 text-lg"
            >
              <Github className="mr-2 h-5 w-5" />
              {t("github")}
            </Button>
            <Button
              onClick={() => router.push("/docs")}
              variant="outline"
              size="lg"
              className="text-setup-text hover:bg-setup-secondary/20 px-8 py-6 text-lg"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              {t("view_documentation")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
