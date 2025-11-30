/**
 * Dashboard Configuration
 *
 * Configure dashboard widgets, layout, and sections.
 * This allows you to customize what appears on the admin dashboard.
 *
 * EXAMPLES:
 * - See examples below for different dashboard layouts
 * - Reorder sections by changing the 'order' property
 * - Enable/disable sections with the 'enabled' property
 * - Control role-based visibility with 'roles' array
 */

import { LucideIcon } from "lucide-react";

export interface DashboardSection {
  id: string;
  title: string;
  enabled: boolean;
  order: number; // Display order (lower numbers appear first)
  component: "quickActions" | "stats" | "welcome" | "custom";
  roles?: ("ADMIN" | "SUPERADMIN" | "OWNER")[]; // Role-based visibility
}

export interface DashboardLayout {
  sections: DashboardSection[];
  layout: "single-column" | "two-column" | "grid";
  spacing: "compact" | "normal" | "spacious";
}

// ============================================
// DEFAULT DASHBOARD CONFIGURATION
// ============================================
export const dashboardConfig: DashboardLayout = {
  sections: [
    {
      id: "welcome",
      title: "",
      enabled: true,
      order: 1, // Appears first
      component: "welcome",
      roles: ["OWNER", "SUPERADMIN", "ADMIN"],
    },
    {
      id: "stats",
      title: "Overview",
      enabled: true,
      order: 2, // Appears second
      component: "stats",
      roles: ["OWNER", "SUPERADMIN", "ADMIN"],
    },
    {
      id: "quickActions",
      title: "Quick Actions",
      enabled: true,
      order: 3, // Appears third
      component: "quickActions",
      roles: ["OWNER", "SUPERADMIN", "ADMIN"],
    },
  ],
  layout: "single-column", // All sections in one column
  spacing: "normal", // Normal spacing between sections
};

// ============================================
// EXAMPLE 1: Reorder Sections (Stats First)
// ============================================
// export const dashboardConfig: DashboardLayout = {
//     sections: [
//         {
//             id: 'stats',
//             title: 'Overview',
//             enabled: true,
//             order: 1, // Stats appear first
//             component: 'stats',
//         },
//         {
//             id: 'welcome',
//             title: '',
//             enabled: true,
//             order: 2, // Welcome appears second
//             component: 'welcome',
//         },
//         {
//             id: 'quickActions',
//             title: 'Quick Actions',
//             enabled: true,
//             order: 3,
//             component: 'quickActions',
//         },
//     ],
//     layout: 'single-column',
//     spacing: 'normal',
// };

// ============================================
// EXAMPLE 2: Hide Welcome Section
// ============================================
// export const dashboardConfig: DashboardLayout = {
//     sections: [
//         {
//             id: 'welcome',
//             title: '',
//             enabled: false, // Disabled - won't show
//             order: 1,
//             component: 'welcome',
//         },
//         {
//             id: 'stats',
//             title: 'Overview',
//             enabled: true,
//             order: 2,
//             component: 'stats',
//         },
//         {
//             id: 'quickActions',
//             title: 'Quick Actions',
//             enabled: true,
//             order: 3,
//             component: 'quickActions',
//         },
//     ],
//     layout: 'single-column',
//     spacing: 'normal',
// };

// ============================================
// EXAMPLE 3: Role-Based Sections (Owner Only Stats)
// ============================================
// export const dashboardConfig: DashboardLayout = {
//     sections: [
//         {
//             id: 'welcome',
//             title: '',
//             enabled: true,
//             order: 1,
//             component: 'welcome',
//             roles: ['OWNER', 'SUPERADMIN', 'ADMIN'], // All roles see welcome
//         },
//         {
//             id: 'stats',
//             title: 'Overview',
//             enabled: true,
//             order: 2,
//             component: 'stats',
//             roles: ['OWNER'], // Only owners see stats
//         },
//         {
//             id: 'quickActions',
//             title: 'Quick Actions',
//             enabled: true,
//             order: 3,
//             component: 'quickActions',
//             // No roles specified - all authenticated users see this
//         },
//     ],
//     layout: 'single-column',
//     spacing: 'normal',
// };

// ============================================
// EXAMPLE 4: Compact Spacing
// ============================================
// export const dashboardConfig: DashboardLayout = {
//     sections: [
//         {
//             id: 'welcome',
//             title: '',
//             enabled: true,
//             order: 1,
//             component: 'welcome',
//         },
//         {
//             id: 'stats',
//             title: 'Overview',
//             enabled: true,
//             order: 2,
//             component: 'stats',
//         },
//         {
//             id: 'quickActions',
//             title: 'Quick Actions',
//             enabled: true,
//             order: 3,
//             component: 'quickActions',
//         },
//     ],
//     layout: 'single-column',
//     spacing: 'compact', // Tighter spacing between sections
// };

// ============================================
// EXAMPLE 5: Spacious Layout
// ============================================
// export const dashboardConfig: DashboardLayout = {
//     sections: [
//         {
//             id: 'welcome',
//             title: '',
//             enabled: true,
//             order: 1,
//             component: 'welcome',
//         },
//         {
//             id: 'stats',
//             title: 'Overview',
//             enabled: true,
//             order: 2,
//             component: 'stats',
//         },
//         {
//             id: 'quickActions',
//             title: 'Quick Actions',
//             enabled: true,
//             order: 3,
//             component: 'quickActions',
//         },
//     ],
//     layout: 'single-column',
//     spacing: 'spacious', // More space between sections
// };

// ============================================
// EXAMPLE 6: Minimal Dashboard (Only Quick Actions)
// ============================================
// export const dashboardConfig: DashboardLayout = {
//     sections: [
//         {
//             id: 'quickActions',
//             title: 'Quick Actions',
//             enabled: true,
//             order: 1,
//             component: 'quickActions',
//         },
//     ],
//     layout: 'single-column',
//     spacing: 'normal',
// };

/**
 * Helper function to get enabled sections for a role
 */
export function getEnabledSections(role?: string): DashboardSection[] {
  return dashboardConfig.sections
    .filter((section) => {
      if (!section.enabled) return false;
      if (!section.roles) return true;
      return section.roles.includes(role as "ADMIN" | "SUPERADMIN" | "OWNER");
    })
    .sort((a, b) => a.order - b.order);
}
