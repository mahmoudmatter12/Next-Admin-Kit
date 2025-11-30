"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Lock } from "lucide-react";

export function AccessRestrictionNotice() {
  return (
    <motion.div
      className="mt-6 sm:mt-8 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      {/* Admin Only Badge */}
      <div className="flex items-center justify-center lg:justify-start space-x-2 text-setup-secondary text-sm sm:text-base font-semibold">
        <Lock className="h-5 w-5 sm:h-6 sm:w-6" />
        <span>Admin Access Only</span>
      </div>

      {/* Warning Notice */}
      <div className="flex items-start space-x-3 text-yellow-400/90 text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 bg-yellow-400/10 rounded-lg border border-yellow-400/20 max-w-xl mx-auto lg:mx-0">
        <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 mt-0.5" />
        <span>
          Access restricted to authorized administrators only. Unauthorized
          access is prohibited and may result in legal action.
        </span>
      </div>
    </motion.div>
  );
}
