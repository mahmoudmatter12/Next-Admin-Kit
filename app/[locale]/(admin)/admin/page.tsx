"use client";

import React from "react";
import { useCurrentUser } from "@/contexts/userContext";
import {
  dashboardConfig,
  getEnabledSections,
} from "../_Components/config/dashboard-config";
import { adminConfig } from "../_Components/config/admin-config";
import QuickActions from "./components/quickActions";
import StatsCards from "./components/StatsCards";
import WelcomeMessage from "./components/WelcomeMessage";
import { cn } from "@/lib/utils";

function AdminPage() {
  const user = useCurrentUser();
  const enabledSections = getEnabledSections(user?.role);

  const spacingClasses = {
    compact: "space-y-4",
    normal: "space-y-6",
    spacious: "space-y-8",
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "welcome":
        return <WelcomeMessage key={sectionId} />;
      case "stats":
        return (
          <StatsCards
            key={sectionId}
            columns={adminConfig.dashboard.statsColumns}
          />
        );
      case "quickActions":
        return <QuickActions key={sectionId} />;
      default:
        return null;
    }
  };

  return (
    <main className={cn("p-6", spacingClasses[dashboardConfig.spacing])}>
      {enabledSections.map((section) => renderSection(section.id))}
    </main>
  );
}

export default AdminPage;
