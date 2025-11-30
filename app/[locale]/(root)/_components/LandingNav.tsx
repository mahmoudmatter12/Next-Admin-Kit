"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/app/[locale]/(admin)/_Components/LanguageSwitcher";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { themes } from "@/app/[locale]/(admin)/_Components/config/theme.config";
import { ThemeColorPicker } from "@/app/[locale]/(admin)/_Components/ThemeColorPicker";
import { cn } from "@/lib/utils";
import { useRouter } from "@/i18n/navigation";

export function LandingNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const t = useTranslations("landing.cta");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-setup-primary/80 backdrop-blur-md border-b border-setup-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-setup-text">
              {process.env.NEXT_PUBLIC_PROJECT_NAME || "Full Admin V1"}
            </h1>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Switcher */}
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
                  // Don't show color picker for system theme
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

            {/* CTA Button */}
            <Button
              onClick={() => router.push("/setup")}
              size="sm"
              className="bg-setup-secondary hover:bg-setup-secondary/80 text-white hidden sm:flex"
            >
              {t("get_started")}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
