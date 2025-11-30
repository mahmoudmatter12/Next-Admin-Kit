"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  adminConfig,
  StatCardConfig,
} from "../../_Components/config/admin-config";
import { dashboardConfig } from "../../_Components/config/dashboard-config";
import { useCurrentUser } from "@/contexts/userContext";
import { cn } from "@/lib/utils";
// Skeleton component - simple loading placeholder
const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={cn("animate-pulse rounded-md bg-setup-secondary/20", className)}
  />
);

interface StatsCardsProps {
  columns?: 2 | 3 | 4;
}

function StatsCards({ columns = 4 }: StatsCardsProps) {
  const user = useCurrentUser();
  const roleToCheck = user?.role;
  const [stats, setStats] = useState<Record<string, string | number>>({});
  const [loading, setLoading] = useState(true);

  // Filter stats based on role
  const visibleStats = adminConfig.stats.cards.filter((stat) => {
    if (!stat.roles) return true;
    return stat.roles.includes(roleToCheck as "ADMIN" | "SUPERADMIN" | "OWNER");
  });

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      const statsData: Record<string, string | number> = {};

      for (const stat of visibleStats) {
        try {
          if (typeof stat.value === "function") {
            statsData[stat.id] = await stat.value();
          } else {
            statsData[stat.id] = stat.value;
          }
        } catch (error) {
          console.error(`Error loading stat ${stat.id}:`, error);
          statsData[stat.id] = "Error";
        }
      }

      setStats(statsData);
      setLoading(false);
    }

    if (visibleStats.length > 0) {
      loadStats();
    } else {
      setLoading(false);
    }
  }, [visibleStats.length]);

  if (!adminConfig.stats.enabled || visibleStats.length === 0) {
    return null;
  }

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const colorClasses = {
    default: "bg-setup-secondary/20 text-setup-text border-setup-secondary",
    primary:
      "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/50",
    success:
      "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/50",
    warning:
      "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/50",
    danger: "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/50",
  };

  const StatCard = ({ stat }: { stat: StatCardConfig }) => {
    const Icon = stat.icon;
    const value = stats[stat.id];
    const color = stat.color || "default";

    const cardContent = (
      <Card
        className={cn(
          "transition-all hover:shadow-md h-full",
          colorClasses[color],
          stat.href && "cursor-pointer hover:scale-[1.02]",
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          <Icon className="h-4 w-4 opacity-70" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-2xl font-bold">{value}</div>
          )}
          {stat.description && (
            <CardDescription className="mt-1 text-xs">
              {stat.description}
            </CardDescription>
          )}
        </CardContent>
      </Card>
    );

    if (stat.href) {
      return (
        <Link href={stat.href} key={stat.id}>
          {cardContent}
        </Link>
      );
    }

    return <div key={stat.id}>{cardContent}</div>;
  };

  return (
    <div className="space-y-4">
      {adminConfig.dashboard.showStatsRow && (
        <h2 className="text-2xl font-semibold text-setup-text">
          {dashboardConfig.sections.find((s) => s.id === "stats")?.title ||
            "Overview"}
        </h2>
      )}
      <div className={cn("grid gap-4", gridCols[columns])}>
        {visibleStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </div>
  );
}

export default StatsCards;
