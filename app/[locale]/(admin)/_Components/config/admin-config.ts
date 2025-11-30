/**
 * Admin Panel Configuration
 *
 * This file contains all configurable settings for the admin panel.
 * Customize these values to match your project's needs.
 *
 * EXAMPLES:
 * - See examples below for stats cards, quick actions, and welcome message
 * - Uncomment and modify examples to match your project
 */

import type React from 'react';
import {
  Users,
  FileText,
  Calendar,
  Mail,
  Shield,
  Database,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';

export interface AdminConfig {
  // Branding
  branding: {
    projectName: string;
    logo?: string;
    favicon?: string;
    welcomeMessage?: string;
    welcomeDescription?: string;
  };

  // Feature Flags
  features: {
    showQuickActions: boolean;
    showStatsCards: boolean;
    showWelcomeMessage: boolean;
    showRecentActivity: boolean;
    showSystemInfo: boolean;
  };

  // Dashboard Layout
  dashboard: {
    showStatsRow: boolean;
    showQuickActionsSection: boolean;
    showWelcomeSection: boolean;
    statsColumns: 2 | 3 | 4; // Number of columns for stats cards
    quickActionsColumns: 2 | 3 | 4; // Number of columns for quick actions
  };

  // Quick Actions Configuration
  quickActions: {
    enabled: boolean;
    title: string;
    maxItems?: number; // Limit number of quick actions shown
    orderBy?: 'default' | 'alphabetical' | 'custom'; // How to order items
    customOrder?: string[]; // Custom order if orderBy is 'custom'
    groupBy?: 'section' | 'none'; // Group items by section or not
  };

  // Stats Cards Configuration
  stats: {
    enabled: boolean;
    cards: StatCardConfig[];
  };

  // Welcome Message Configuration
  welcome: {
    enabled: boolean;
    title: string;
    description: string;
    showUserGreeting: boolean;
    customContent?: React.ReactNode;
  };
}

export interface StatCardConfig {
  id: string;
  title: string;
  value: string | number | (() => Promise<string | number>);
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string; // Optional link
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  roles?: ('ADMIN' | 'SUPERADMIN' | 'OWNER')[]; // Role-based visibility
}

// Default Configuration
export const adminConfig: AdminConfig = {
  branding: {
    // Set your project name here or use environment variable
    // For client-side access, use: typeof window !== 'undefined' ? window.location.hostname : 'Admin Panel'
    projectName: 'Admin Panel', // Change this to your project name
    welcomeMessage: 'Welcome to the Admin Panel',
    welcomeDescription: 'Manage your system efficiently from this dashboard',
  },

  features: {
    // ============================================
    // Feature Flags - Enable/Disable Features
    // ============================================

    // Show quick actions section on dashboard
    showQuickActions: true,

    // Show statistics cards on dashboard
    showStatsCards: true,

    // Show welcome message at top of dashboard
    showWelcomeMessage: true,

    // Show recent activity feed (implement when ready)
    showRecentActivity: false, // Set to true when implementing activity feed

    // Show system information widget (implement when ready)
    showSystemInfo: false, // Set to true when implementing system info

    // ============================================
    // EXAMPLE: Minimal Dashboard (Only Quick Actions)
    // ============================================
    // showQuickActions: true,
    // showStatsCards: false,
    // showWelcomeMessage: false,
    // showRecentActivity: false,
    // showSystemInfo: false,

    // ============================================
    // EXAMPLE: Full Featured Dashboard
    // ============================================
    // showQuickActions: true,
    // showStatsCards: true,
    // showWelcomeMessage: true,
    // showRecentActivity: true, // When implemented
    // showSystemInfo: true, // When implemented
  },

  dashboard: {
    // ============================================
    // EXAMPLE 1: 4-Column Layout (Default)
    // ============================================
    showStatsRow: true,
    showQuickActionsSection: true,
    showWelcomeSection: true,
    statsColumns: 4, // 4 stats cards per row on large screens
    quickActionsColumns: 4, // 4 quick actions per row on large screens

    // ============================================
    // EXAMPLE 2: 3-Column Layout
    // ============================================
    // statsColumns: 3, // 3 stats cards per row
    // quickActionsColumns: 3, // 3 quick actions per row

    // ============================================
    // EXAMPLE 3: 2-Column Layout (Compact)
    // ============================================
    // statsColumns: 2, // 2 stats cards per row
    // quickActionsColumns: 2, // 2 quick actions per row

    // ============================================
    // EXAMPLE 4: Hide Specific Sections
    // ============================================
    // showStatsRow: false, // Hide stats section
    // showQuickActionsSection: true,
    // showWelcomeSection: false, // Hide welcome section
  },

  quickActions: {
    enabled: true,
    title: 'Quick Actions',

    // ============================================
    // EXAMPLE 1: No Limits (Show All)
    // ============================================
    maxItems: undefined, // No limit - shows all quick access items

    // ============================================
    // EXAMPLE 2: Limit Number of Items
    // ============================================
    // maxItems: 6, // Only show first 6 quick actions

    // ============================================
    // EXAMPLE 3: Alphabetical Ordering
    // ============================================
    // orderBy: 'alphabetical', // Sort by title A-Z

    // ============================================
    // EXAMPLE 4: Custom Ordering
    // ============================================
    // orderBy: 'custom',
    // customOrder: [
    //     '/admin/users',        // First
    //     '/admin/forms',        // Second
    //     '/admin/settings',     // Third
    //     '/admin/students',     // Fourth
    //     // ... rest will appear after in default order
    // ],

    // ============================================
    // EXAMPLE 5: Default Order (Navigation Order)
    // ============================================
    orderBy: 'default', // Uses order from navigation.ts

    // ============================================
    // EXAMPLE 6: Group by Section
    // ============================================
    // groupBy: 'section', // Groups items by their navigation section

    // ============================================
    // Current Configuration
    // ============================================
    groupBy: 'none', // No grouping - flat list
  },

  stats: {
    enabled: true,
    cards: [
      // ============================================
      // EXAMPLE 1: Static Value Stat Card
      // ============================================
      // {
      //     id: 'total-users',
      //     title: 'Total Users',
      //     value: 1234, // Static number
      //     description: 'Active users in the system',
      //     icon: Users,
      //     href: '/admin/users', // Clickable - links to this page
      //     color: 'primary', // Blue theme
      //     roles: ['OWNER', 'SUPERADMIN', 'ADMIN'], // Visible to these roles
      // },
      // ============================================
      // EXAMPLE 2: Async Value Stat Card (API Call)
      // ============================================
      // {
      //     id: 'total-forms',
      //     title: 'Active Forms',
      //     value: async () => {
      //         // Fetch from your API endpoint
      //         try {
      //             const response = await fetch('/api/forms/count');
      //             const data = await response.json();
      //             return data.count || 0;
      //         } catch (error) {
      //             console.error('Error fetching forms count:', error);
      //             return 0;
      //         }
      //     },
      //     description: 'Forms currently active',
      //     icon: FileText,
      //     href: '/admin/forms',
      //     color: 'success', // Green theme
      // },
      // ============================================
      // EXAMPLE 3: Async Value with Database Query
      // ============================================
      // {
      //     id: 'pending-approvals',
      //     title: 'Pending Approvals',
      //     value: async () => {
      //         // Example: Direct database query (server-side)
      //         // Note: This would need to be in an API route
      //         // const { db } = await import('@/lib/db');
      //         // const count = await db.approval.count({
      //         //     where: { status: 'PENDING' }
      //         // });
      //         // return count;
      //         return 5; // Placeholder
      //     },
      //     description: 'Items awaiting approval',
      //     icon: Clock,
      //     href: '/admin/approvals',
      //     color: 'warning', // Yellow theme
      //     roles: ['OWNER', 'SUPERADMIN'], // Only owners and superadmins
      // },
      // ============================================
      // EXAMPLE 4: String Value Stat Card
      // ============================================
      // {
      //     id: 'system-status',
      //     title: 'System Status',
      //     value: 'Operational', // String value
      //     description: 'Current system health',
      //     icon: CheckCircle,
      //     color: 'success',
      //     // No href - not clickable
      // },
      // ============================================
      // EXAMPLE 5: Trend/Percentage Stat Card
      // ============================================
      // {
      //     id: 'growth-rate',
      //     title: 'Growth Rate',
      //     value: async () => {
      //         // Calculate growth percentage
      //         const current = 1500;
      //         const previous = 1200;
      //         const growth = ((current - previous) / previous) * 100;
      //         return `${growth.toFixed(1)}%`;
      //     },
      //     description: 'User growth this month',
      //     icon: TrendingUp,
      //     color: 'primary',
      // },
      // ============================================
      // EXAMPLE 6: Alert/Notification Stat Card
      // ============================================
      // {
      //     id: 'alerts',
      //     title: 'Active Alerts',
      //     value: async () => {
      //         // Fetch alerts count
      //         return 3;
      //     },
      //     description: 'Requires attention',
      //     icon: AlertCircle,
      //     href: '/admin/alerts',
      //     color: 'danger', // Red theme
      // },
      // ============================================
      // EXAMPLE 7: Multiple Stats for Different Roles
      // ============================================
      // Owner-only stat
      // {
      //     id: 'total-revenue',
      //     title: 'Total Revenue',
      //     value: async () => {
      //         return '$45,230';
      //     },
      //     description: 'Revenue this month',
      //     icon: Database,
      //     color: 'success',
      //     roles: ['OWNER'], // Only visible to owners
      // },
      // Admin and above stat
      // {
      //     id: 'emails-sent',
      //     title: 'Emails Sent',
      //     value: 1250,
      //     description: 'This month',
      //     icon: Mail,
      //     href: '/admin/emailservice',
      //     color: 'default',
      //     roles: ['OWNER', 'SUPERADMIN', 'ADMIN'],
      // },
      // ============================================
      // EXAMPLE 8: Calendar/Event Stat Card
      // ============================================
      // {
      //     id: 'upcoming-events',
      //     title: 'Upcoming Events',
      //     value: async () => {
      //         // Fetch from calendar API
      //         return 7;
      //     },
      //     description: 'Events this week',
      //     icon: Calendar,
      //     href: '/admin/calendar',
      //     color: 'primary',
      // },
      // ============================================
      // TIP: You can add as many stat cards as needed
      // They will automatically arrange in a grid based on statsColumns setting
      // ============================================
    ],
  },

  welcome: {
    enabled: true,

    // ============================================
    // EXAMPLE 1: Simple Welcome Message
    // ============================================
    title: 'Welcome back!',
    description: "Here's what's happening with your system today.",
    showUserGreeting: true, // Shows "Welcome back, [User Name]!"

    // ============================================
    // EXAMPLE 2: Custom Welcome with User Name
    // ============================================
    // title: 'Welcome back!',
    // description: 'Manage your system efficiently from this dashboard.',
    // showUserGreeting: true,

    // ============================================
    // EXAMPLE 3: Generic Welcome (No User Name)
    // ============================================
    // title: 'Welcome to the Admin Panel',
    // description: 'Get started by exploring the quick actions below.',
    // showUserGreeting: false,

    // ============================================
    // EXAMPLE 4: Custom Content in Welcome Message
    // ============================================
    // title: 'Welcome back!',
    // description: 'Here\'s what\'s happening with your system today.',
    // showUserGreeting: true,
    // customContent: (
    //     <div className="mt-4 space-y-2">
    //         <div className="flex items-center gap-2 text-sm text-setup-text/70">
    //             <CheckCircle className="h-4 w-4 text-green-500" />
    //             <span>System is running smoothly</span>
    //         </div>
    //         <div className="flex items-center gap-2 text-sm text-setup-text/70">
    //             <AlertCircle className="h-4 w-4 text-yellow-500" />
    //             <span>3 items need your attention</span>
    //         </div>
    //     </div>
    // ),

    // ============================================
    // EXAMPLE 5: Disable Welcome Message
    // ============================================
    // enabled: false, // Set to false to hide welcome section
  },
};
