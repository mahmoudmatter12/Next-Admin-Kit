'use client';

import {
  HelpCircle,
  ChevronDown,
  RefreshCw,
  Moon,
  Sun,
  Settings,
  Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/userContext';
import { useParams } from 'next/navigation';
import { SignOutButton } from '@/components/auth/SignOutButton';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { LanguageSwitcher } from './LanguageSwitcher';
import { themes } from './config/theme.config';
import { ThemeColorPicker } from './ThemeColorPicker';

interface HeaderProps {
  // notifications?: {
  //   id: string;
  //   title: string;
  //   description: string;
  //   time: string;
  //   read: boolean;
  // }[];
  // onNotificationClick?: (id: string) => void;
  // onMarkAllAsRead?: () => void;
  searchPlaceholder?: string;
  className?: string;
}

export function Header({
  // notifications = [],
  // onNotificationClick,
  // onMarkAllAsRead,
  searchPlaceholder = 'Search...',
  className,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [isSearchFocused, setIsSearchFocused] = useState(false);
  // const unreadNotifications = notifications.filter(n => !n.read).length;
  const params = useParams();
  const locale = params?.locale as string;

  useEffect(() => {
    setMounted(true);
  }, []);

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Implement search functionality
  //   console.log('Searching for:', searchQuery);
  // };

  const { user, refetchUser } = useUser();
  const queryClient = useQueryClient();
  const [isRechecking, setIsRechecking] = useState(false);

  const handleRecheckAccess = async () => {
    setIsRechecking(true);
    try {
      await refetchUser();
      toast.success('Access rechecked successfully', {
        description: 'Your permissions have been refreshed.',
      });
    } catch (error) {
      toast.error('Failed to recheck access', {
        description: 'An error occurred while refreshing your permissions.',
      });
    } finally {
      setIsRechecking(false);
    }
  };

  return (
    <header
      className={cn(
        'flex h-16 items-center justify-between border-b border-setup-secondary bg-setup-primary backdrop-blur supports-backdrop-filter:bg-setup-primary px-4 sm:px-6',
        className
      )}
    >
      {/* Search Bar */}
      {/* <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
        <div className={cn(
          "relative transition-all duration-200",
          isSearchFocused ? "w-full" : "w-full sm:w-80"
        )}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600 focus:ring-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white"
              onClick={() => setSearchQuery('')}
            >
              <span className="sr-only">Clear search</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
          )}
        </div>
      </form> */}

      {/* TODO: ADD LOGO */}

      {/* project name and version */}
      <div className='flex items-center space-x-1 sm:space-x-2 min-w-0 flex-1'>
        <h1 className='text-xs sm:text-sm md:text-2xl font-bold text-setup-text truncate'>
          <span className='hidden sm:inline'>
            {process.env.NEXT_PUBLIC_PROJECT_NAME || 'Admin'}
          </span>
          <span className='sm:hidden'>Admin</span>
        </h1>
        {/* badge for version */}
        <Badge
          variant='outline'
          className='text-xs bg-setup-secondary/70 text-setup-text shrink-0 hidden sm:flex'
        >
          {process.env.NEXT_PUBLIC_VERSION || '1.0.0'}
        </Badge>
      </div>

      <div className='flex items-center space-x-2 sm:space-x-4'>
        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='hidden sm:flex text-setup-text hover:text-setup-text hover:bg-setup-primary/20'
            >
              {mounted ? (
                (() => {
                  const currentTheme = themes.find(t => t.id === theme);
                  const ThemeIcon = currentTheme?.icon || Sun;
                  return <ThemeIcon className='h-4 w-4' />;
                })()
              ) : (
                <Sun className='h-4 w-4' />
              )}
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='bg-setup-primary border-setup-secondary/30'
          >
            {themes.map(themeConfig => {
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
                        'text-setup-text hover:text-setup-text hover:bg-setup-secondary/20',
                        isActive && 'bg-setup-secondary/10'
                      )}
                    >
                      <ThemeIcon className='mr-2 h-4 w-4' />
                      {themeConfig.label}
                      {isActive && (
                        <span className='ml-auto text-setup-secondary'>✓</span>
                      )}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className='bg-setup-primary border-setup-secondary/30'>
                        <DropdownMenuItem
                          onClick={() => setTheme(themeConfig.id)}
                          className='text-setup-text hover:text-setup-text hover:bg-setup-secondary/20'
                        >
                          <ThemeIcon className='mr-2 h-4 w-4' />
                          Apply {themeConfig.label}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className='bg-setup-secondary/30' />
                        <div className='p-2' onClick={e => e.stopPropagation()}>
                          <ThemeColorPicker
                            themeId={themeConfig.id}
                            themeLabel={themeConfig.label}
                            className='w-full justify-start'
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
                    'text-setup-text hover:text-setup-text hover:bg-setup-secondary/20',
                    isActive && 'bg-setup-secondary/10'
                  )}
                >
                  <ThemeIcon className='mr-2 h-4 w-4' />
                  {themeConfig.label}
                  {isActive && (
                    <span className='ml-auto text-setup-secondary'>✓</span>
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Recheck Admin Access */}
        <Button
          variant='ghost'
          size='sm'
          className='hidden sm:flex text-setup-text hover:text-setup-text hover:bg-setup-secondary/20'
          onClick={handleRecheckAccess}
          disabled={isRechecking}
          title='Recheck Admin Access'
        >
          <RefreshCw
            className={`h-4 w-4 ${isRechecking ? 'animate-spin' : ''}`}
          />
          <span className='sr-only'>Recheck Admin Access</span>
        </Button>

        {/* Help Center */}
        {/* TODO: GO TO DOCUMENTATION */}
        <Button
          variant='ghost'
          size='sm'
          className='hidden sm:flex text-setup-text hover:text-setup-text hover:bg-setup-secondary/20'
        >
          <HelpCircle className='h-4 w-4' />
          <span className='sr-only'>Help</span>
        </Button>

        {/* Message Notifications */}
        {/* <MessageNotifications /> */}

        {/* System Notifications */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='relative text-gray-300 hover:text-white hover:bg-gray-900'
            >
              <Bell className='h-5 w-5' />
              {unreadNotifications > 0 && (
                <Badge
                  variant='destructive'
                  className='absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs'
                >
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='w-80 sm:w-96 bg-gray-900 border-gray-700'
          >
            <DropdownMenuLabel className='flex justify-between items-center text-white'>
              <span>System Notifications</span>
              {unreadNotifications > 0 && (
                <Button
                  variant='link'
                  size='sm'
                  className='h-6 text-xs text-blue-400 hover:text-blue-300'
                  // onClick={onMarkAllAsRead}
                >
                  Mark all as read
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-gray-700' />
            <div className='space-y-1 max-h-96 overflow-y-auto'>
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      'flex flex-col items-start p-3 rounded-lg cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800',
                      !notification.read && 'bg-gray-800/50'
                    )}
                    onClick={() => onNotificationClick?.(notification.id)}
                  >
                    <div className='flex justify-between w-full'>
                      <p className='text-sm font-medium'>
                        {notification.title}
                      </p>
                      <time className='text-xs text-gray-400'>
                        {notification.time}
                      </time>
                    </div>
                    <p className='text-xs text-gray-400 mt-1'>
                      {notification.description}
                    </p>
                    {!notification.read && (
                      <div className='absolute left-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-400' />
                    )}
                  </DropdownMenuItem>
                ))
              ) : (
                <div className='p-4 text-center text-sm text-gray-400'>
                  No system notifications
                </div>
              )}
            </div>
            <DropdownMenuSeparator className='bg-gray-700' />
            <DropdownMenuItem className='justify-center text-sm text-blue-400 hover:text-blue-300'>
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='relative h-10 w-auto rounded-full pl-2 pr-3 space-x-2 text-setup-text hover:text-setup-text hover:bg-setup-secondary/20'
            >
              <Avatar className='h-8 w-8'>
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback className='bg-setup-secondary text-setup-text'>
                  {user?.name
                    ?.split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='hidden sm:flex sm:items-center'>
                <div className='text-left'>
                  <p className='text-sm font-medium truncate max-w-[120px]'>
                    {user?.name}
                  </p>
                  <p className='text-xs text-setup-text/70 capitalize'>
                    {user?.role}
                  </p>
                </div>
                <ChevronDown className='ml-1 h-4 w-4 text-setup-text/70' />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-56 bg-setup-primary border-setup-secondary/30'
            align='end'
            forceMount
          >
            <DropdownMenuLabel className='font-normal text-setup-text'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>{user?.name}</p>
                <p className='text-xs leading-none text-setup-text/70 truncate'>
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-setup-secondary/30' />
            <DropdownMenuItem
              onClick={handleRecheckAccess}
              disabled={isRechecking}
              className='text-setup-text hover:text-setup-text hover:bg-setup-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isRechecking ? 'animate-spin' : ''}`}
              />
              {isRechecking ? 'Rechecking...' : 'Recheck Admin Access'}
            </DropdownMenuItem>
            {/* <DropdownMenuItem className='text-gray-300 hover:text-white hover:bg-gray-800'>
              <User className='mr-2 h-4 w-4' />
              <Link href={`/${locale}/admin/profile`}>Profile</Link>
            </DropdownMenuItem> */}
            {/* <DropdownMenuSub>
              <DropdownMenuSubTrigger className='text-gray-300 hover:text-white hover:bg-gray-800'>
                <Sun className='mr-2 h-4 w-4' />
                <span>Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className='bg-gray-900 border-gray-700'>
                  <DropdownMenuItem
                    onClick={() => setTheme('light')}
                    className='text-gray-300 hover:text-white hover:bg-gray-800'
                  >
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme('dark')}
                    className='text-gray-300 hover:text-white hover:bg-gray-800'
                  >
                    Dark
                  </DropdownMenuItem>
                  TODO: ADD THEME TOGGLE
                  <DropdownMenuItem
                    onClick={() => setTheme('system')}
                    className='text-gray-300 hover:text-white hover:bg-gray-800'
                  >
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub> */}
            <DropdownMenuSeparator className='bg-setup-secondary' />
            <SignOutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
