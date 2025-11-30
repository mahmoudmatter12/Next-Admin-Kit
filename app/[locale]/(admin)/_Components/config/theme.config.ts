import {
  LucideIcon,
  Sun,
  Moon,
  Settings,
  Palette,
  Sparkles,
  Rainbow,
} from "lucide-react";

/**
 * Theme Configuration
 * Define all available themes here
 */

export interface ThemeConfig {
  /**
   * Theme identifier (used by next-themes)
   * Must match the CSS class name (e.g., 'light', 'dark', 'green-theme')
   */
  id: string;

  /**
   * Display name for the theme
   */
  label: string;

  /**
   * Icon component for the theme
   */
  icon: LucideIcon;

  /**
   * Whether this theme is the system theme
   * Only one theme should have this set to true
   */
  isSystem?: boolean;
}

/**
 * Available themes configuration
 * Add new themes here by adding a new object to the array
 */
export const themes: ThemeConfig[] = [
  {
    id: "light",
    label: "Light",
    icon: Sun,
  },
  {
    id: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    id: "green-theme",
    label: "Green Theme",
    icon: Palette,
  },
  {
    id: "purple-theme", // Must match CSS class name
    label: "Purple Theme",
    icon: Sparkles, // Any Lucide icon
  },
  {
    id: "red-theme",
    label: "Red Theme",
    icon: Rainbow,
  },
  {
    id: "system",
    label: "System",
    icon: Settings,
    isSystem: true,
  },
];

/**
 * Get theme IDs array for next-themes configuration
 */
export function getThemeIds(): string[] {
  return themes.map((theme) => theme.id);
}

/**
 * Get theme by ID
 */
export function getThemeById(id: string): ThemeConfig | undefined {
  return themes.find((theme) => theme.id === id);
}

/**
 * Get default theme ID
 */
export function getDefaultThemeId(): string {
  return themes.find((theme) => theme.isSystem)?.id || "system";
}
