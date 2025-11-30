'use client';

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = params?.locale as string;
  const currentLocale = (locale as 'en' | 'ar') || 'en';

  const handleLocaleChange = (newLocale: 'en' | 'ar') => {
    if (newLocale === currentLocale) return;

    // Get current pathname from browser
    const currentPath = window.location.pathname;

    // Split by current locale to get the path without locale
    // e.g., "/en/admin/users" -> ["", "admin/users"]
    const pathParts = currentPath.split(`/${currentLocale}`);
    const pathWithoutLocale =
      pathParts.length > 1
        ? pathParts[1] || '/'
        : currentPath.startsWith('/')
          ? currentPath.slice(1)
          : currentPath;

    // Ensure the path starts with / and normalize it
    const normalizedPath = pathWithoutLocale.startsWith('/')
      ? pathWithoutLocale
      : `/${pathWithoutLocale}`;

    // Construct the new path with the new locale
    const newPath =
      normalizedPath === '/'
        ? `/${newLocale}`
        : `/${newLocale}${normalizedPath}`;

    // Preserve query parameters and hash if any
    const searchParams = window.location.search;
    const hash = window.location.hash;
    const newUrl = `${newPath}${searchParams}${hash}`;

    // Navigate to the new locale path using window.location for reliability
    window.location.href = newUrl;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='text-setup-text hover:text-setup-text hover:bg-setup-primary/20'
          title='Change Language'
        >
          <Globe className='h-4 w-4' />
          <span className='ml-2 text-xs uppercase'>{currentLocale}</span>
          <span className='sr-only'>Change Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='bg-setup-primary border-setup-secondary/30'
      >
        <DropdownMenuItem
          onClick={() => handleLocaleChange('en')}
          className={cn(
            'text-setup-text hover:text-setup-text hover:bg-setup-secondary/20',
            currentLocale === 'en' && 'bg-setup-secondary/10'
          )}
        >
          <span className='mr-2'>🇬🇧</span>
          English
          {currentLocale === 'en' && (
            <span className='ml-auto text-setup-secondary'>✓</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLocaleChange('ar')}
          className={cn(
            'text-setup-text hover:text-setup-text hover:bg-setup-secondary/20',
            currentLocale === 'ar' && 'bg-setup-secondary/10'
          )}
        >
          <span className='mr-2'>🇸🇦</span>
          العربية
          {currentLocale === 'ar' && (
            <span className='ml-auto text-setup-secondary'>✓</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
