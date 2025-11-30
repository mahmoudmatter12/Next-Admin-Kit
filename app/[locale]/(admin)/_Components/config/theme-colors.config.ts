/**
 * Theme Colors Configuration
 * Manages custom theme colors stored in localStorage
 */

const STORAGE_KEY = "admin-custom-theme-colors";

export interface CustomThemeColors {
  [themeId: string]: {
    secondary: string;
  };
}

/**
 * Get all custom theme colors from localStorage
 */
export function getCustomThemeColors(): CustomThemeColors {
  if (typeof window === "undefined") return {};

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error reading custom theme colors:", error);
    return {};
  }
}

/**
 * Get custom secondary color for a specific theme
 */
export function getCustomThemeColor(themeId: string): string | null {
  const colors = getCustomThemeColors();
  return colors[themeId]?.secondary || null;
}

/**
 * Set custom secondary color for a theme
 */
export function setCustomThemeColor(themeId: string, color: string): void {
  if (typeof window === "undefined") return;

  try {
    const colors = getCustomThemeColors();
    colors[themeId] = { secondary: color };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));

    // Apply the color immediately
    applyCustomThemeColor(themeId, color);
  } catch (error) {
    console.error("Error saving custom theme color:", error);
  }
}

/**
 * Apply custom secondary color to CSS variables
 */
export function applyCustomThemeColor(themeId: string, color: string): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  // Apply to the current theme class if active
  if (root.classList.contains(themeId)) {
    root.style.setProperty("--setup-secondary", color);
  }

  // Also store in a data attribute for persistence
  root.setAttribute(`data-${themeId}-secondary`, color);
}

/**
 * Apply all custom theme colors on page load
 * Only applies secondary color - primary and text come from globals.css
 */
export function applyAllCustomThemeColors(): void {
  if (typeof document === "undefined") return;

  const colors = getCustomThemeColors();
  const root = document.documentElement;
  const currentTheme = root.classList.value
    .split(" ")
    .find((cls) => cls.includes("theme") || cls === "light" || cls === "dark");

  if (currentTheme && colors[currentTheme]?.secondary) {
    root.style.setProperty("--setup-secondary", colors[currentTheme].secondary);
  }
}

/**
 * Reset custom secondary color for a theme
 */
export function resetCustomThemeColor(themeId: string): void {
  if (typeof window === "undefined") return;

  try {
    const colors = getCustomThemeColors();
    if (colors[themeId]) {
      delete colors[themeId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
    }
  } catch (error) {
    console.error("Error resetting custom theme color:", error);
  }
}
