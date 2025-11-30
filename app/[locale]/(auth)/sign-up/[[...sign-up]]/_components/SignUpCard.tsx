"use client";

import { motion } from "framer-motion";
import { SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export function SignUpCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-setup-primary/90 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border border-setup-secondary/30 shadow-2xl w-full"
    >
      <SignUp
        redirectUrl="/admin"
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "bg-transparent shadow-none w-full",
            headerTitle: "text-xl sm:text-2xl font-bold text-setup-text",
            headerSubtitle: "text-setup-text/70 text-sm sm:text-base",
            socialButtonsBlockButton:
              "bg-setup-secondary/20 hover:bg-setup-secondary/30 border border-setup-secondary/40 text-setup-text transition-colors",
            socialButtonsBlockButtonText: "text-setup-text/90",
            dividerLine: "bg-setup-secondary/30",
            dividerText: "text-setup-text/60 text-xs sm:text-sm",
            formFieldLabel: "text-setup-text/80 mb-1 text-sm sm:text-base",
            formFieldInput:
              "bg-setup-primary/50 border-setup-secondary/40 focus:border-setup-secondary focus:ring-2 focus:ring-setup-secondary/30 text-setup-text placeholder:text-setup-text/50",
            formButtonPrimary:
              "bg-setup-secondary hover:bg-setup-secondary/80 text-white shadow-lg transition-all duration-200 font-semibold",
            footerActionText: "text-setup-text/60 text-xs sm:text-sm",
            footerActionLink:
              "text-setup-secondary hover:text-setup-text transition-colors",
            formFieldAction:
              "text-setup-secondary hover:text-setup-text transition-colors",
            formHeaderTitle: "text-setup-text",
            formHeaderSubtitle: "text-setup-text/70",
            identityPreviewText: "text-setup-text",
            identityPreviewEditButton:
              "text-setup-secondary hover:text-setup-text",
            formResendCodeLink: "text-setup-secondary hover:text-setup-text",
            otpCodeFieldInput:
              "bg-setup-primary/50 border-setup-secondary/40 text-setup-text",
            alertText: "text-setup-text/80",
            alertTextDanger: "text-red-400",
          },
          layout: {
            logoPlacement: "inside",
            logoImageUrl: "/logo.png",
          },
          variables: {
            colorPrimary: "var(--setup-secondary)",
            colorText: "var(--setup-text)",
            colorTextSecondary: "var(--setup-text)",
            colorBackground: "var(--setup-primary)",
            colorInputBackground: "var(--setup-primary)",
            colorInputText: "var(--setup-text)",
            colorDanger: "#ef4444",
          },
        }}
        fallback={
          <div className="flex items-center justify-center h-48 sm:h-64">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-setup-secondary" />
          </div>
        }
      />
    </motion.div>
  );
}
