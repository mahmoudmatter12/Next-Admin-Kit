"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarContent } from "./SidebarContent";
import { useParams } from "next/navigation";

interface DesktopSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function DesktopSidebar({
  collapsed,
  setCollapsed,
}: DesktopSidebarProps) {
  const params = useParams();
  const locale = params?.locale as string;
  const isRTL = locale === "ar";

  return (
    <div
      className={cn(
        "relative hidden border-setup-secondary bg-setup-primary transition-all duration-300 lg:block",
        isRTL ? "border-l" : "border-r",
        collapsed ? "w-16" : "w-[300px]!",
      )}
    >
      <SidebarContent collapsed={collapsed} />

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "absolute top-6 z-10 h-6 w-6 rounded-full border border-setup-secondary bg-setup-primary p-0 shadow-md text-setup-text hover:text-setup-text hover:bg-setup-secondary",
          isRTL ? "-left-3" : "-right-3",
        )}
        onClick={() => setCollapsed(!collapsed)}
      >
        {isRTL ? (
          collapsed ? (
            <ChevronLeft className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )
        ) : collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
        <span className="sr-only">Toggle sidebar</span>
      </Button>
    </div>
  );
}
