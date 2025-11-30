"use client";

import { motion } from "framer-motion";
import { Mail, Shield, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FooterInfo() {
  return (
    <motion.div
      className="mt-6 sm:mt-8 text-center space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      {/* Sign Up Link */}
      <div className="pt-2">
        <p className="text-xs sm:text-sm text-setup-text/60 mb-3">
          Don't have an account?
        </p>
        <Link href="/sign-up">
          <Button
            variant="outline"
            className="w-full sm:w-auto bg-setup-secondary/10 hover:bg-setup-secondary/20 border-setup-secondary/40 text-setup-text hover:text-setup-text transition-all duration-200"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Create New Account
          </Button>
        </Link>
      </div>

      {/* Contact Section */}
      <div className="space-y-2">
        <p className="text-xs sm:text-sm text-setup-text/70">
          Need administrator access?
        </p>
        <a
          href="mailto:devteamhnu@gmail.com?subject=Admin Access Request"
          className="inline-flex items-center space-x-2 text-setup-secondary hover:text-setup-text transition-colors text-xs sm:text-sm font-medium"
        >
          <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Contact the development team</span>
        </a>
      </div>

      {/* Security Notice */}
      <div className="flex items-center justify-center space-x-2 text-setup-text/60 text-xs sm:text-sm pt-2 border-t border-setup-secondary/20">
        <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
        <span>
          This is a restricted website for authorized administrators only
        </span>
      </div>
    </motion.div>
  );
}
