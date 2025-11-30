import {
  Home,
  BarChart3,
  FolderOpen,
  Building2,
  Users,
  File,
  Book,
  ClipboardList,
  Shield,
  Database,
  Settings,
  FileText,
  User,
  Mail,
  QrCode,
  Calendar,
  FileChartColumn,
  MailCheck,
  DollarSign,
} from 'lucide-react';
import { NavSection } from '../types/navigation';

// Navigation configuration with role-based access
export const navigationSections: NavSection[] = [
  {
    title: 'Home',
    items: [
      {
        title: 'Main Site',
        href: '/',
        icon: Home,
        description: 'Return to the university website',
        roles: ['OWNER', 'SUPERADMIN', 'ADMIN'],
      },
      {
        title: 'Admin Dashboard',
        href: '/admin',
        icon: BarChart3,
        description: 'Access the admin dashboard',
        roles: ['OWNER', 'SUPERADMIN', 'ADMIN'],
      },
    ],
  },
  {
    title: 'System',
    items: [
      {
        title: 'User Management',
        href: '/admin/users',
        icon: Shield,
        description: 'Manage system users and roles',
        roles: ['OWNER'],
        quickAccess: true,
        // Example: Add subitems to make it collapsible
        subItems: [
          {
            title: 'All Users',
            href: '/admin/users',
            icon: Users,
            roles: ['OWNER'],
            logoUrl: '/images/logo.png',
          },
        ],
      },
      {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings,
        description: 'Manage system settings',
        roles: ['OWNER'],
        quickAccess: true,
        // Example: Add subitems to make it collapsible
        // subItems: [
        //   {
        //     title: 'General Settings',
        //     href: '/admin/settings/general',
        //     icon: Settings,
        //     roles: ['OWNER'],
        //   },
        //   {
        //     title: 'Security',
        //     href: '/admin/settings/security',
        //     icon: Shield,
        //     roles: ['OWNER'],
        //   },
        // ],
      },
    ],
  },

  {
    title: 'Contributions',
    items: [
      {
        title: 'Contributions',
        href: `${process.env.NEXT_PUBLIC_DEVELOPER_URL}`,
        icon: DollarSign,
        description:
          'Thank to Mahmoud Matter the main developer of the project',
        roles: ['OWNER', 'SUPERADMIN', 'ADMIN'],
        quickAccess: false,
      },
    ],
  },
];
