"use client";

import React from "react";
import Link from "next/link";
import { useCurrentUser } from "@/contexts/userContext";
import { navigationSections } from "../../_Components/config/navigation";
import { adminConfig } from "../../_Components/config/admin-config";
import { NavItem } from "../../_Components/types/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function QuickActions() {
  const user = useCurrentUser();
  const roleToCheck = user?.role;

  // Collect all navigation items with quickAccess: true
  const quickAccessItems: NavItem[] = [];

  navigationSections.forEach((section) => {
    section.items.forEach((item) => {
      // Check if item has quickAccess and user has permission
      if (
        item.quickAccess &&
        (!item.roles ||
          item.roles.includes(roleToCheck as "ADMIN" | "SUPERADMIN" | "OWNER"))
      ) {
        quickAccessItems.push(item);
      }

      // Also check subItems for quickAccess
      if (item.subItems) {
        item.subItems.forEach((subItem) => {
          if (
            subItem.quickAccess &&
            (!subItem.roles ||
              subItem.roles.includes(
                roleToCheck as "ADMIN" | "SUPERADMIN" | "OWNER",
              ))
          ) {
            // Convert SubItem to NavItem-like structure for display
            quickAccessItems.push({
              title: subItem.title,
              href: subItem.href,
              icon: subItem.icon,
              description: item.description,
              roles: subItem.roles,
              quickAccess: true,
            });
          }
        });
      }
    });
  });

  if (quickAccessItems.length === 0) {
    return null;
  }

  // Apply configuration
  const config = adminConfig.quickActions;
  if (!config.enabled) {
    return null;
  }

  // Apply maxItems limit if set
  const limitedItems = config.maxItems
    ? quickAccessItems.slice(0, config.maxItems)
    : quickAccessItems;

  // Apply ordering
  let orderedItems = [...limitedItems];
  if (config.orderBy === "alphabetical") {
    orderedItems.sort((a, b) => a.title.localeCompare(b.title));
  } else if (config.orderBy === "custom" && config.customOrder) {
    orderedItems.sort((a, b) => {
      const indexA = config.customOrder!.indexOf(a.href);
      const indexB = config.customOrder!.indexOf(b.href);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-setup-text">{config.title}</h2>
      <div
        className={cn(
          "grid gap-4",
          gridCols[
            adminConfig.dashboard.quickActionsColumns as keyof typeof gridCols
          ],
        )}
      >
        {orderedItems.map((item) => {
          const Icon = item.icon;
          const isDisabled =
            item.badge === "Soon" || item.badge === "Phase two";
          const isPhaseTwo = item.badge === "Phase two";
          const isSoon = item.badge === "Soon";

          const cardContent = (
            <Card
              className={cn(
                "transition-all h-full",
                isDisabled
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:shadow-md hover:scale-[1.02] cursor-pointer",
                "bg-setup-primary",
                !isDisabled && "hover:border-setup-text",
                // Use a gentle orange border for "Phase two" (pending/attention), and a soft neutral gray for "Soon" (coming/not yet active)
                isPhaseTwo && "border-orange-400!",
                isSoon && "border-gray-300!",
                "border-setup-secondary",
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg text-setup-text shrink-0",
                        isDisabled
                          ? "bg-setup-secondary/50"
                          : "bg-setup-secondary",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle
                      className={cn(
                        "text-setup-text",
                        isDisabled && "text-setup-text/60",
                      )}
                    >
                      {item.title}
                    </CardTitle>
                  </div>
                  {item.badge && (
                    <Badge variant="outline" className="text-xs shrink-0">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              {item.description && (
                <CardContent>
                  <CardDescription
                    className={cn(
                      "text-setup-text/70",
                      isDisabled && "text-setup-text/50",
                    )}
                  >
                    {item.description}
                  </CardDescription>
                </CardContent>
              )}
            </Card>
          );

          if (isDisabled) {
            return (
              <div key={item.href} className="relative">
                {cardContent}
              </div>
            );
          }

          return (
            <Link key={item.href} href={item.href}>
              {cardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;
