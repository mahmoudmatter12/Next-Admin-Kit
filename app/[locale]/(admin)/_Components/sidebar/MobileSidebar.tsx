'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarContent } from './SidebarContent';
import { useParams } from 'next/navigation';

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const locale = params?.locale as string;
  const isRTL = locale === 'ar';

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='lg:hidden text-setup-text hover:text-setup-text hover:bg-setup-secondary/20'
        >
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isRTL ? 'right' : 'left'}
        className='w-64 p-0 bg-setup-primary border-setup-secondary/30'
      >
        <SidebarContent collapsed={false} onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
