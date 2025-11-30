'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Header } from './header';
import { DesktopSidebar } from './sidebar';
import { MobileHeader } from './MobileHeader';
import { applyAllCustomThemeColors } from './config/theme-colors.config';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Apply custom theme colors on mount
  useEffect(() => {
    applyAllCustomThemeColors();
  }, []);

  return (
    <div className='flex h-screen bg-setup-primary overflow-hidden'>
      {/* Desktop Sidebar */}
      <DesktopSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div className='flex flex-1 flex-col overflow-hidden bg-setup-primary min-w-0'>
        {/* Desktop Header - Hidden on mobile */}
        <div className='hidden lg:block'>
          <Header />
        </div>

        {/* Mobile Header - Only visible on mobile */}
        <MobileHeader />

        {/* Page Content */}
        <main className='flex-1 overflow-y-auto  p-3 sm:p-4 bg-setup-primary! text-setup-text! md:p-6 w-full min-w-0'>
          {children}
        </main>
      </div>
    </div>
  );
}
