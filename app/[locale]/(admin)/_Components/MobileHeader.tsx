"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RefreshCw, Sun } from "lucide-react";
import { useUser } from "@/contexts/userContext";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./sidebar/MobileSidebar";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTheme } from "next-themes";
import { themes } from "./config/theme.config";
import {
  applyAllCustomThemeColors,
  getCustomThemeColor,
} from "./config/theme-colors.config";
import { ThemeColorPicker } from "./ThemeColorPicker";
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

export function MobileHeader() {
  const { user, refetchUser } = useUser();
  const [isRechecking, setIsRechecking] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Apply custom theme colors on mount
    applyAllCustomThemeColors();
  }, []);

  // Apply custom secondary color when theme changes
  useEffect(() => {
    if (theme && mounted) {
      const customColor = getCustomThemeColor(theme);
      if (customColor) {
        const root = document.documentElement;
        root.style.setProperty("--setup-secondary", customColor);
      }
    }
  }, [theme, mounted]);

  const handleRecheckAccess = async () => {
    setIsRechecking(true);
    try {
      await refetchUser();
      toast.success("Access rechecked successfully", {
        description: "Your permissions have been refreshed.",
      });
    } catch (error) {
      toast.error("Failed to recheck access", {
        description: "An error occurred while refreshing your permissions.",
      });
    } finally {
      setIsRechecking(false);
    }
  };

  return (
    <header className="flex h-16 items-center gap-2 sm:gap-4 border-b border-setup-secondary bg-setup-primary px-3 sm:px-4 lg:hidden">
      <MobileSidebar />
      {/* Mobile header content - project name and essential controls */}
      <div className="flex items-center justify-between w-full ml-2">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <h1 className="text-sm font-bold text-setup-text truncate">
            {process.env.NEXT_PUBLIC_PROJECT_NAME || "Admin"}
          </h1>
        </div>
        <div className="flex items-center space-x-1">
          <LanguageSwitcher />
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-setup-text hover:text-setup-text hover:bg-setup-primary/20"
              >
                {mounted ? (
                  (() => {
                    const currentTheme = themes.find((t) => t.id === theme);
                    const ThemeIcon = currentTheme?.icon || Sun;
                    return <ThemeIcon className="h-4 w-4" />;
                  })()
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-setup-primary border-setup-secondary/30"
            >
              {themes.map((themeConfig) => {
                const ThemeIcon = themeConfig.icon;
                const isActive = theme === themeConfig.id;
                const showColorPicker = !themeConfig.isSystem;

                if (showColorPicker) {
                  return (
                    <DropdownMenuSub key={themeConfig.id}>
                      <DropdownMenuSubTrigger
                        onClick={() => setTheme(themeConfig.id)}
                        className={cn(
                          "text-setup-text hover:text-setup-text hover:bg-setup-secondary/20",
                          isActive && "bg-setup-secondary/10",
                        )}
                      >
                        <ThemeIcon className="mr-2 h-4 w-4" />
                        {themeConfig.label}
                        {isActive && (
                          <span className="ml-auto text-setup-secondary">
                            ✓
                          </span>
                        )}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="bg-setup-primary border-setup-secondary/30">
                          <DropdownMenuItem
                            onClick={() => setTheme(themeConfig.id)}
                            className="text-setup-text hover:text-setup-text hover:bg-setup-secondary/20"
                          >
                            <ThemeIcon className="mr-2 h-4 w-4" />
                            Apply {themeConfig.label}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-setup-secondary/30" />
                          <div
                            className="p-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ThemeColorPicker
                              themeId={themeConfig.id}
                              themeLabel={themeConfig.label}
                              className="w-full justify-start"
                            />
                          </div>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  );
                }

                return (
                  <DropdownMenuItem
                    key={themeConfig.id}
                    onClick={() => setTheme(themeConfig.id)}
                    className={cn(
                      "text-setup-text hover:text-setup-text hover:bg-setup-secondary/20",
                      isActive && "bg-setup-secondary/10",
                    )}
                  >
                    <ThemeIcon className="mr-2 h-4 w-4" />
                    {themeConfig.label}
                    {isActive && (
                      <span className="ml-auto text-setup-secondary">✓</span>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full p-0 text-setup-text hover:text-setup-text hover:bg-setup-secondary/20"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image} alt={user?.name} />
                  <AvatarFallback className="bg-setup-secondary text-setup-text text-xs">
                    {user?.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-setup-primary border-setup-secondary/30"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal text-setup-text">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-none text-setup-text/70 truncate">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-setup-secondary/30" />
              <DropdownMenuItem
                onClick={handleRecheckAccess}
                disabled={isRechecking}
                className="text-setup-text hover:text-setup-text hover:bg-setup-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={cn("mr-2 h-4 w-4", isRechecking && "animate-spin")}
                />
                {isRechecking ? "Rechecking..." : "Recheck Admin Access"}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-setup-secondary" />
              <SignOutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
