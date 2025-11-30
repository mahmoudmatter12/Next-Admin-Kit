'use client';
import type React from 'react';
import { AdminAuthGuard } from './_Components/AdminAuthGuard';
import { AdminLayout } from './_Components/admin-layout';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '../../../components/layout/providers';

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
}

export default function AdminLayoutWrapper({
  children,
}: AdminLayoutWrapperProps) {
  return (
    <div className='relative admin-layout-wrapper min-h-screen overflow-x-hidden'>
      <Providers>
        <AdminAuthGuard requireAdmin={true} skipAnimations={true}>
          <AdminLayout>
            <div className='relative min-h-screen overflow-hidden'>
              {/* Main content container */}
              <div className='relative z-10 min-h-screen w-full'>
                <div className='min-h-screen w-full text-setup-text!'>
                  {children}
                </div>
              </div>
            </div>
          </AdminLayout>
          <Toaster
            position='top-right'
            expand={true}
            richColors={true}
            closeButton={true}
          />
        </AdminAuthGuard>
      </Providers>
    </div>
  );
}
